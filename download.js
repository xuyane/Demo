    /**
     *  获取选中产品的列表
     * @returns {*}
     */
    function getProductList() {
        var userId = null;
        <#if userId??>
        userId = '${userId}';
        </#if>
        if(!userId){
            return null;
        }
        var data = {};
        var dataKey = 'datacenter-carlist_'+ userId;
        var localStorageData =  localStorage[dataKey] ? JSON.parse(localStorage[dataKey]) : null;
        var cookieData =getCookie(dataKey) ? JSON.parse(getCookie(dataKey)) : null;
        if (!cookieData||JSON.stringify(cookieData) == '{}'|| !localStorageData|| JSON.stringify(localStorageData) == '{}'){
            return data;
        }
        var idList = cookieData.data;
        var dataList = localStorageData.data;
        if(idList.length <= 0 || dataList.length <= 0) {
            return data;
        }
        data.timeType = cookieData.timeType;
        data.data = [];
        idList.forEach(function(idTypeItem, index, arr) {
            var idTypeArr = idTypeItem.split('_');
            var businessType = idTypeArr[0];
            var id = idTypeArr[1];
            dataList.forEach(function(dataItem, index, arr) {
                if (businessType ==dataItem.businessType && id == dataItem.id) {
                    data.data.push(dataItem);
                }
            });
        });
        return data;
    }


    /**
     *  下载数据
     * **/
    function  downloadData() {
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        if(startTime.length==0||endTime.length==0){
            toast("请输入时间。")
            return;
        }
        var datacenterCarlist = getProductList(),
                data =  (datacenterCarlist && datacenterCarlist.data)||[];
        if(!datacenterCarlist|| !data || data.length ===0){
            toast("未选择产品，请重新选择。");
            return;
        }
        var  timeType =datacenterCarlist.timeType;
        // 所有产品权限都一一致
        var getFirstData = data[0];
        var pStartTimeDay = parseInt( getFirstData.startTime||0);
        var pEndTimeDay =  parseInt( getFirstData.endTime ||0);

        var _selectStartTime =  new Date(startTime.replace(new RegExp('-', 'g'),'/')).getTime();
        var _selectEndTime =  new Date(endTime.replace(new RegExp('-', 'g'),'/')).getTime();
        var privateDate = formatChineseDate(new Date(pStartTimeDay))
        // var mainMessage  =`您订阅数据的起始日期为${r'${privateDate}'}，起始日期之前的数据将不支持查看/下载。`;
        var mainMessage  ='您订阅数据的起始日期为'+privateDate+'，起始日期之前的数据将不支持查看/下载。';
        var subMessage = '订阅更长时间的数据浏览权限，请致电您的专属客服：${private_phone}（${adminName}）。';
        // 限制一次下载只能下载一年的数据
        if (timeType == 0) {
        	var preYearNum = ${downLoadMaxYears};
        	if (preYearNum > 0) {
        		// 添加年限验证, 时间是从缓存中获取
                var lastYearToday = getLastYeartoday(new Date(endTime.replace(new RegExp('-','g'),'/')), preYearNum);
                if ((startTime.replace(/-/g,"") < lastYearToday)) {
                    toast("单次数据下载时间范围不可超过" + ${downLoadMaxYears} + "年，请重新选择。")
                    return;
                }
        	}
        }
        // 所选日期不在权限范围内
        if( _selectEndTime < pStartTimeDay || _selectStartTime> pEndTimeDay){
            toast('没有这个时间段的权限，不允许下载。 您的数据权限日期：'+ formatDate(new Date(pStartTimeDay)) + '至' + formatDate(new Date(pEndTimeDay)));
            return;
        }
        // 有交集 S->A->E->B
        else if( _selectStartTime > pStartTimeDay && _selectStartTime < pEndTimeDay && _selectEndTime > pEndTimeDay){
            toastAlert(mainMessage,subMessage,function () {
                downloadZip(startTime,endTime,datacenterCarlist);
            });
            return;
        }
        // 有交集 A->S->B->E
        else if(  _selectStartTime < pStartTimeDay && _selectEndTime > pStartTimeDay &&_selectEndTime < pEndTimeDay){
            toastAlert(mainMessage,subMessage,function () {
                downloadZip(startTime,endTime,datacenterCarlist);
            });
            return;
        }
        // 有交集 A->S->E->B
        else if( _selectStartTime < pStartTimeDay && _selectEndTime > pEndTimeDay &&  _selectStartTime < pEndTimeDay){
            toastAlert(mainMessage,subMessage,function () {
                downloadZip(startTime,endTime,datacenterCarlist);
            });
            return;
        }
        downloadZip(startTime,endTime,datacenterCarlist);
    }

    function  downloadZip(startTime,endTime,datacenterCarlist) {
        var queryStartDate = startTime.replaceAll("-", "");
        // 批量下载
        var queryEndDate = endTime.replaceAll("-", "");
        var params = {},
                businessInformation = [];

        // 按照 businessType 和 varietiesId分组
        datacenterCarlist.data.forEach(function (ele) {
            if (!params[ele.businessType]) {
                //先看看有没有业务分类
                params[ele.businessType] = {};
                params[ele.businessType][ele.varietiesId] = [ele.id];
            } else {
                if (!params[ele.businessType][ele.varietiesId]) {
                    //如果有业务分类 再看看有没有这个品种
                    params[ele.businessType][ele.varietiesId] = [ele.id]
                } else {
                    //如果业务和品种都有了 就直接把这个的id放入
                    params[ele.businessType][ele.varietiesId].push(ele.id)
                }
            }
        })

        // 遍历params 把他按照参数样式组织
        for (var key in params) {
            for (var p in params[key]) {
                businessInformation.push({
                    businessType: key,
                    varietiesId: p,
                    businessIdList: params[key][p]
                })
            }
        }
        var businessInfoJson = JSON.stringify(businessInformation);
        
     	// 根据参数去生成文件名
        var fileName = getDownLoadFileName(params);
        // 跨产品批量下载地址
        var downloadURL = "/price_search/doExportZip.htm?startDate="+queryStartDate+"&endDate="+queryEndDate+"&indexType="
        		+datacenterCarlist.timeType+"&businessInformation="+encodeURIComponent(businessInfoJson)
        		+"&fileName="+encodeURIComponent(fileName);
        downfile(downloadURL, fileName);
    }

    // 下载文件
    function downfile(downloadURL, filename)
    {
    	// 为防止重复点击,当转圈时不允许点击
    	var loadingDisplay = $('#downloadDataId .layui-icon-loading').css("display");
    	if (checkDataNotNull(loadingDisplay) && loadingDisplay.indexOf("block") != -1) {
    		return;
    	}
    	// 显示转圈
    	$('#downloadDataId .layui-icon-loading').css({
            display: 'inline-block'
        });
        var that = this;
        var req;
        if (window.XMLHttpRequest)
        {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            req = new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5 浏览器执行代码
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        req.open("get", downloadURL, true);
        req.responseType = "blob";
        req.onreadystatechange = function ()
        {
            if (req.readyState === 4 && req.status === 200)
            {
                if (typeof window.chrome !== 'undefined')
                {
                    // Chrome version
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(req.response);
                    link.download = filename;
                    link.click();
                }
                else if (typeof window.navigator.msSaveBlob !== 'undefined')
                {
                    // IE version
                    var blob = new Blob([req.response],
                        {
                            type: 'application/force-download'
                        }
                        );
                    window.navigator.msSaveBlob(blob, filename);
                }
                else
                {
                    // Firefox version
                    var file = new File([req.response], filename,
                        {
                            type: 'application/force-download'
                        }
                        );
                    window.open(URL.createObjectURL(file));
                }
            }
        };
        req.onloadend = function (event)
        {
        	$('#ownloadDataId .layui-icon-loading').css({
                display: 'none'
            });
        }
        req.send();
    }

    // 生成下载文件名,参数为: 业务类型, 文件数量
    function getDownLoadFileName(downLoadParams)
    {
        var fileName = new Date();
        if (!checkDataNotNull(downLoadParams))
        {
            return fileName;
        }
        // 当品种只有一种的时候,文件名是: xxxx.xlsx, 当大于一种时,文件名是: xxxx.zip
        var varietiessize;
        for (var k in downLoadParams) {
        	varietiessize = Object.keys(downLoadParams[k]).length;
        }
        var fileNum = Object.keys(downLoadParams).length;
        if (fileNum > 1 || varietiessize > 1)
        {
            return dateFormat("yyyyMMddhhmmss", new Date()) + ".zip";
        }
        else
        {
            var businessType;
            for (var key in downLoadParams)
            {
                businessType = parseInt(key);
            }
            // 精确到秒的时间作为文件名,防止同一天多次下载文件导致文件名重复,使用随机数结尾,避免程序执行过快产生重名问题
            var downLoadTime = dateFormat("yyyyMMddhhmmss", new Date()) + randomNum(100, 999);
            switch (businessType)
            {
            case 1:
                fileName = "国际原油" + downLoadTime + ".xlsx";
                break;
            case 2:
                fileName = "企业出厂价" + downLoadTime + ".xlsx";
                break;
            case 3:
                fileName = "国内市场价" + downLoadTime + ".xlsx";
                break;
            case 4:
                fileName = "国际市场价" + downLoadTime + ".xlsx";
                break;
            case 5:
                fileName = "主营批发价" + downLoadTime + ".xlsx";
                break;
            case 6:
                fileName = "主营零售价" + downLoadTime + ".xlsx";
                break;
            case 7:
                fileName = "基准价" + downLoadTime + ".xlsx";
                break;
            default:
                break;
            }
            return fileName;
        }
    }

    /**
     * 时间格式转换
     */
    function dateFormat(formater, dt)
    { 
        if (dt)
        {
            if ((typeof dt) == "string")
            {
                dt = dt.replace(/-/g, "/"); //将-替换成/，避免ie和safari下报错
            }
            var date = new Date(dt);
            var o =
            {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(formater))
            {
                formater = formater.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(formater))
                {
                    formater = formater.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return formater;
        }
        return "";
    }

    //生成从minNum到maxNum的随机数
    function randomNum(minNum, maxNum)
    {
        switch (arguments.length)
        {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
            break;
        default:
            return 899;
            break;
        }
    }