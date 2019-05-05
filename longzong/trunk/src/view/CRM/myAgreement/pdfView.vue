<style>
#example1{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 800;
}
</style>
<template>
    <Row>
        <Col span="24">
            <div id="example1"></div>
        </Col>
    </Row>    
</template>
<script>
import axios from "axios";
 export default {
     data(){
        return{
           contractCode:""     
        } 
     },
     created(){
         this.$Spin.show();
         let hash=location.hash;
         let hashs=location.hash.indexOf("code=");
         this.contractCode=hash.slice(hashs+5);
        //    let oScript=document.createElement("script");
        // oScript.src="https://pdfobject.com/js/pdfobject.min.js";
        // document.body.appendChild(oScript);
     },
     mounted(){
    //pdf预览需要加载的js  start

     let hTag=document.querySelector(".top-header");
     hTag.style.display="none";
      let hTags=document.querySelector(".left-menu");
     hTags.style.display="none";
   
     //PDF预览需要加载的 js   end 
        this.pdf();
     },
     methods:{
         pdf(){
          axios.get("/crm/contract-info/preview/" + this.contractCode).then((resp)=>{
             let hTag=document.querySelector(".top-header");
                hTag.style.display="none";
            PDFObject.embed(resp.data.message,"#example1");
             this.$Spin.hide();  
          })
         }
     }
 } 
</script>