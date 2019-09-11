;(function(){
    "use strict"
    class Car{
        constructor(){
           this.url = "http://localhost/kaoshi/data/goods.json"   
           this.tbody = document.querySelector(".tb"); 

           this.load();
           this.setList();
           
        }
        load(){
            var that = this;
            $.ajax({
                url:this.url,
                success:function(res){
                    that.res = res
                    // console.log(that.res)
                   
                    that.setLocal();
                   
                },
                async:false
            });
        }
        setLocal(){
             this.goods  =   localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")):[];  

             this.display();  
        }
        display(){
            var str = "";
            // var str2 = "";
          for(var i = 0;i<this.res.length;i++){
                 for(var j = 0;j<this.goods.length;j++){
                  //  console.log(this.res[i],this.goods[i].num)
                  if(this.res[i].goodsId == this.goods[j].id){
                  str += `
               
                  <tr class="center" abc ="${this.res[i].goodsId}"> 
                  <td class="p1">
                      <div class="l1">
                         <img src="${this.res[i].url}">
                      </div>
                  </td>
                  <td class="p2">
                      <p><a href="#" alt="${this.res[i].name}${this.res[i].price}"> 
                      ${this.res[i].name} ${this.res[i].korea}
                         </a>
                      </p>
                      <a href="#">收藏</a>
                      <b>|</b>
                      <a  class="delete">删除</a>
                  </td>
                  <td class="p3">￥${this.res[i].price}</td>
                  <td class="p4">
                  <input type="number" value="${this.goods[j].num}" min="1" class="num">
                  </td>
                  <td class="p5">0</td>
                  <td class="p6">￥${this.goods[j].num*this.res[i].price}</td>
                </tr>
                
                
                   `
               
                 }
               }
             }
             this.tbody.innerHTML = str;
                   
        }
        setList(){
           this.total = document.querySelector(".sumAll")
            this.sumAll = document.querySelectorAll(".p6")
            // console.log(this.total,this.sumAll)
            let arr  = [];//总价
            this.sumu  = 0;

       for(var i =0 ;i<this.sumAll.length;i++){
        //    console.log(this.sumAll[i].innerHTML);
           this.c  = this.sumAll[i].innerHTML
           this.suma = parseInt(this.c.slice(1,this.c.length))
           arr.push(this.suma);
           this.sumu += arr[i];
       }
           //  console.log(sum)
           this.total.innerHTML = this.sumu;

         
              
           var that = this;
           this.tbody.addEventListener("click",function(eve){
               var e = eve || window.event;
               var target = e.target || e.srcElement;
               if(target.className =="delete"){
                  that.id = target.parentNode.parentNode.getAttribute("abc");
            //   console.log(target.parentNode.parentNode.parentNode)
                target.parentNode.parentNode.remove();

                  that.set((i)=>{
                      //删除索引为i的 那个 数组元素
                      that.goods.splice(i,1);
                  });
                  
               }
           });
           
           this.tbody.addEventListener("input",function(eve){
              var e = eve || window.event;
              var target = e.target || e.srcElement;
              if(target.className == "num"){
                  // 8.保存点击删除的商品的数量和id
                
                  that.sum = target.parentNode.parentNode.lastElementChild


                 that.bprice =target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML
                //  console.log(target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML)
                //   that.bprice = target.parentNode.parentNode.previousElementSibling.lastElementChild.innerHTML
                  
                  that.eprice = that.bprice.slice(1,that.bprice.length)
            

                  that.val = target.value;
                  that.id = target.parentNode.parentNode.getAttribute("abc");
                  // 9.从localstorage中找到对应的商品数据
                  that.set(function(i){
                      // 修改
                    //   console.log( parseInt (that.goods[i].num)+1 )
                      that.goods[i].num = that.val;

                    //拿到当前点击的兄弟价格元素，然后把乘好的价格 添加到页面上
                  
                    for(var j = 0;j<that.goods.length;j++){
                            // that.sum.innerHTML =  (parseInt (that.goods[i].num)) * (parseInt (that.eprice));   
                             that.sum.innerHTML   = (parseInt(that.goods[i].num)) * parseInt(that.eprice)
                             
                            //  console.log( (parseInt(that.goods[i].num))*parseInt(that.eprice) )
                             console.log( parseInt(that.eprice))
                            //  console.log(that.sumAll[i].innerHTML)
                            // console.log(that.sumAll[j].innerHTML)
                             
                        }
                    

                  })
              }
          })

        }
        

         //删的准备
         set(fn){
        
              for(var i = 0;i<this.goods.length;i++){
                  if(this.goods[i].id == this.id){
                      //获取到对应的i 然后把这个i返回给前面的回调函数    splice那个
                      fn(i);
                  }
              }
              //把删好的值设置回去
              localStorage.setItem("goods",JSON.stringify(this.goods))
         }
    }

    new  Car();

    var objcart = document.querySelector(".tiaozhuan");
    var objcart2 = document.querySelector(".tiaozhuan2");
       
    objcart.onclick = function(){
     
         window.location.href = "http://localhost/kaoshi/index.html";
            
      
    }
    objcart2.onclick = function(){
     
        window.location.href = "http://localhost/kaoshi/list.html";
           
     
   }
})();