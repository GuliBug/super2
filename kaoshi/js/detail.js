var smallObj = document.getElementById('small');
   var moveObj = document.getElementById('move');
   var bigObj  = document.getElementById('big');
   var girlObj  =  document.getElementById('look_girl');
   // 2 给sall绑定鼠标移动事件
   smallObj.onmousemove = function(eve){
       var e = eve || window.event;   
       // 3 获取鼠标的实时位置
       var mouseX = e.clientX;
       var mouseY = e.clientY;
      // 4计算move的left和top
       var moveLeft = mouseX-smallObj.offsetLeft-moveObj.offsetWidth/2;
       var moveTop = mouseY - smallObj.offsetTop-moveObj.offsetHeight/2;
         //5 设置move的移动边界
         //设置左边距
        if(moveLeft<0) moveLeft=0;
        // 设置右边
        var endLeft = smallObj.offsetWidth-moveObj.offsetWidth
        if(moveLeft>endLeft) moveLeft = endLeft;
        if(moveTop<0) moveTop=0;
        // 设置最大下边距
         var endTop = smallObj.offsetHeight-moveObj.offsetHeight;
         if(moveTop>endTop) moveTop=endTop;
       // 设置move的实时的位置
       moveObj.style.left = moveLeft+'px';
       moveObj.style.top = moveTop+'px';
       //让滑块显示出来
       moveObj.style.display = 'block';
      
      /*********让大图显示出来*********/
      bigObj.style.display = 'block';
      // 1 设置大图的left top位置
      bigObj.style.left = smallObj.offsetLeft+smallObj.offsetWidth+'px';
      bigObj.style.top = smallObj.offsetTop+'px';

      //       距离左边left    图片宽度           盒子宽度          距离左边left    图片宽度           盒子宽度
      //  big_x/(look_girl.offsetWidth-big.offsetWidth) = move_left/(small.offsetWidth-move.offsetWidth);
       var girlLeft = moveLeft/(smallObj.offsetWidth-moveObj.offsetWidth)*(bigObj.offsetWidth-girlObj.offsetWidth);
       var girlTop = moveTop/(smallObj.offsetHeight-moveObj.offsetHeight)*(bigObj.offsetHeight-girlObj.offsetHeight);
          //  console.log(girlLeft,girlTop);
        //2 给图片设置位置
        girlObj.style.top = girlTop+'px';
        girlObj.style.left = girlLeft+'px';

     
       
  }

    /*********a鼠标移走之后,让大图和滑块消失*********/ 
    // smallObj.onmouseout = function(){
    //      moveObj.style.display = 'none';
    //      bigObj.style.display = 'none';
    // }

    smallObj.onmouseleave = function(){
         moveObj.style.display = 'none';
         bigObj.style.display = 'none';
    }
