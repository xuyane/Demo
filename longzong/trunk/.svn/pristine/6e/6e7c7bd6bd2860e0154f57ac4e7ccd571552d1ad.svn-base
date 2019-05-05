import { getProductTreeList } from '../axios/productCenter'

export const breedMap = (data, list) => {
  let dataList = data.map(item => {
    if (item.type === 1) {
      return {
        checked: false,
        nodeId: item.nodeId,
        nodeCode: item.nodeCode,
        title: item.nodeName,
        type: item.type,
        loading: false,
        children: [],
        route: item.nodeName,
        breedName: item.nodeName,
        percent: 0
      }
    } else {
      let getSingle = true
      for (let i = 0; i < list.length; i++) {
        if (list[i].breedId === item.nodeId) {
          getSingle = false
        }
      }
      if (getSingle) {
        return {
          checked: false,
          breedId: item.nodeId,
          nodeCode: item.nodeCode,
          type: item.type,
          title: item.nodeName,
          route: item.nodeName,
          breedName: item.nodeName,
          percent: 0
        }
      } else {
        return {
          checked: true,
          breedId: item.nodeId,
          nodeCode: item.nodeCode,
          type: item.type,
          title: item.nodeName,
          route: item.nodeName,
          breedName: item.nodeName,
          percent: 0
        }
      }
    }
  })
  return dataList
}
export const loadBreedData = (item, callback, list) => {
  let form = {
    breedCode: item.nodeCode
  }
  getProductTreeList(form).then(res => {
    let breedData = breedMap(res.response, list)
    callback(breedData)
  })
}
// 品种数组去重
export const arrQC = (arr) => {
  let temp = []
  let l = arr.length
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (arr[i].breedId === arr[j].breedId) {
        i++
        j = i
      }
    }
    temp.push(arr[i])
  }
  return temp
}
export const columnQC = (arr) => {
  let temp = []
  let l = arr.length
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (arr[i].id === arr[j].id) {
        i++
        j = i
      }
    }
    temp.push(arr[i])
  }
  return temp
}
