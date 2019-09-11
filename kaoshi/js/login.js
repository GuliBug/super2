;(function(){
    if(window.localStorage.userArr){//判断是否存在
		var array = JSON.parse(window.localStorage.userArr);
	}else{
		array = [];//创建一个新数组
	}


    var odeng = document.querySelector(".dl")
        console.log(array)

     odeng.onclick = function(){
        var ouser = document.querySelector("#user").value;
        var opass = document.querySelector("#pass").value;
		var isHad = false;//定义一个开关变量
		var index = 0 ; //定义一个下标确定用户
		//遍历数组进行匹配
		for(var i =0;i<array.length;i++){
			if(ouser==array[i].useval){//有这个账号
				isHad=true;
				index=i;
 
			}
		}
		if(isHad){//如果存在
			if(opass==array[index].passval){
				alert("登录成功");
                setCookie("s2","bb")
                setCookie("usename",ouser)
                
                window.location.href = "http://localhost/kaoshi/index.html";
			}else{
				alert("密码错误");
			}
		}else{//账号不存在或输入错误
			alert('账号不存在或输入错误');
		}
	}
})();