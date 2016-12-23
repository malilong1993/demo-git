(function(){
	addevent();
})();//闭包调用函数

function addevent(){
	$("#register").on("click",function(){
		var user=getuser();
		if(vaildata(user)){
			usersubmit(user);
		}
	})
}//添加事件

function getuser(){
	var user={
		userName:document.getElementById("userName").value,
		password1:document.getElementById("password1").value,
		password2:document.getElementById("password2").value
	}
	return user
}//获取数据
	
function vaildata(user){
	var state = false;
//				console.log(user)
	if(user.userName==""||user.userName==" "||!(/^1[34578]\d{9}$/.test(user.userName))){
			alert("请输入正确的手机号")
	}else if(!(/^[a-zA-Z]\w{5,17}$/.test(user.password1))||!(/^[a-zA-Z]\w{5,17}$/.test(user.password2))||(user.password1
	!=user.password2)){
		alert("请输入合法密码");
	}else{
		state=true;
	}
	return state
}//用户验证

function usersubmit(user){
	$.ajax({
		
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{
			status:"register",
			userID:user.userName,
			password:user.password1
		},
		success:function(data){
			if(data==1){
				
				alert("注册成功");
			}else if(data==0){
				alert("重名");
			}
		}
	});
}//提交
//闭包的应用
//getuser()();
//function getuser(){
//	var i=0;
//	return function(){
//		i++;
//	}
//}
