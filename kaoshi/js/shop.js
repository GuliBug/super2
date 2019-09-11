;(function(){
    class shopList{
        constructor(){
            this.url = "./data/goods.json";
            this.box = document.querySelector(".pingjie");

            this.load();
            this.addEvent();
        } //请求ajax 接收数据
          load(){
            var that = this;
            ajax({
                url:this.url,
                type:"get",
                success:function(res){      
                 that.res = JSON.parse(res);
                
                 that.display();
                 
                }

            });
        
        }
        //渲染页面 
        display(){
         
           var that  = this;
           var str = "";
           for(var i = 0;i<this.res.length;i++){
               str += `
               <li abc="${this.res[i].goodsId}>
               <div class="img">
                 <img src=${this.res[i].url}>
               </div>
               <div class="entry over">
                   <a href="#" class="over">${this.res[i].name}</a>
                   <a href="#" class="over">${this.res[i].price}</a>
                   <span class="jiage">￥<b>${this.res[i].price}</b></span>
                   <span class="delde">￥<del>${this.res[i].country}</del></span>
                   <div class="score"></div>
                   <button style="width:100px;height:25px;
                    display: block;color:#5f83d7;margin-top:30px;" class="btn">加入购物车</button>
               </div>
                     </li>
  
           ` 
          //  console.log(this.res[i].goodsId)
           }
           this.box.innerHTML = str;
           
        }
       // 插入点击事件，
         addEvent(){
           var that = this;
           this.box.addEventListener("click",function(even){
              
               var e = even || window.event;
               var target  = e.target || e.srcElement;
        
                if(target.className == "btn"){
                   
                that.id  = target.parentNode.parentNode.getAttribute("abc");
                // console.log(that.id) 娶不到id值
                // console.log(target.parentNode.parentNode.parentNode)  因为当前点击的父元素  是另外一个

                that.Localstorage();           
                }
             
           })

         }
         Localstorage(){
           this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) :[];
           //通过长度判断是否是第一次存
      
           if(this.goods.length < 1){
               this.goods.push({
                 id:this.id,
                 num :1
               });
           }else{
               //判断是否重复加入购物车
               var onoff = true;
               for(var i =0;i<this.goods.length;i++){
                   if(this.goods[i].id === this.id){
                    this.goods[i].num++;
                    onoff = false;
               } 
             }
              if(onoff){
               this.goods.push({
                 id:this.id,
                 num :1
                })
                }

           }
           
            localStorage.setItem("goods",JSON.stringify(this.goods));

         } 

    }


     new shopList();

     
})();