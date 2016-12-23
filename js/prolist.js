//var globalPr={
//	userID:;
//};
;(function(){
	getNav()
})();//闭包
var myscroll;
$(".home").on("click",function(){
	window.location="home.html"
})
$(".gwc").on("click",function(){
					window.location="gwc.html"
				})	
function getNav(){
		getCar({
				
				userID:localStorage.getItem("name"),	
				callback:function(data){
				$("#carSum").html(data.length);
				}
			})
		
		console.log()	
		myscroll= new IScroll("#wrapper",{
			click:true
		})
	$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
	
		if(data){
			var thisdata=JSON.parse(data);
			createNav(thisdata)
		}
	});//获取导航
	function createNav(data){
		var $navBox=$("#navbox");//获取页面nav标签
		$navBox.html("");//navy标签清空
		$.each(data, function(i,r) {//循环遍历
			var $btn=$("<span class='nav_span'><i class='iconfont'>"+r.icon+"</i><em class='iconfont'>"+r.className+"</em></span>")//页面中添加标签
			$navBox.append($btn);//添加点击事件
			$btn.bind("click",function(){
				
				
				
				getProductList(r.classID,"#productBox");//传入对应的id和盒子名
				
				$(".iconfont").css({color:"#313131"});
				$(".nav_name").css({color:"#313131"});//之前的颜色
				$(this).children().css({color:"#fff"});//点击后的颜色
			})//点击事件
		});
	}//将导航添加在页面中
}
function getProductList(classID,targetEL){
	var $box=$(targetEL);//定义商品容器
	
	$box.html("");//清空容器
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{//callback=?代表为jsonp
		classID:classID
	},function(data){
		createproduct(data);
		
	})//获取商品

function createproduct(data){
	$.each(data,function(i,r){//循环遍历创建商品容器
			var $product=$("<div class='product'><img src='"+r.goodsListImg+"'></div>");//定义接收图片
			$box.append($product);//图片放在容器中
			myscroll.refresh()
			$product.bind("click",function(){
				
				window.location="views.html?goodsID="+r.goodsID;
//				shoppingAni({
//					staEL:$(this).children(".inBox"),
//					target:$("#carSum"),
//					callback:function(){
//						
//					}
//				})
//				updateCar({
//					userID:localStorage.getItem("name"),
//					goodsID:r.goodsID,
//					number:1,
//					sumBox:$("#carSum"),
//					updataCallBack:function(data){
//						if(data){
////							alert("以添加至购物车，请去购物车中查看！");
//						}else{
////							alert("添加失败！");
//						}
//						
//					}
//				})
			})
		});
	
	}
}
//购物车更新方法，参数({
//	userID:"用户ID",
//	goodsID:"商品ID",
//	number:购买数量,
//	sumBox:购物车总数显示的容器,
//	updataCallBack:更新成功回调
//})
function updateCar(opt){
	var config={
		userID:"",
		goodsID:"",
		number:1,
		sumBox:null,
		updataCallBack:function(){
			
		}
	};
	$.extend(config,opt);
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
		userID:config.userID,
		goodsID:config.goodsID,
		number:config.number
	},function(data){
		if(typeof config.updataCallBack =="function"){
			config.updataCallBack(data);
		}
		if(data==1){
			getCar({
				userID:config.userID,
				callback:function(data){
				config.sumBox.html(data.length);
				}
			})
		}
	})	
}
function getCar(opt){
	var config={
		userID:"",
		callback:function(){
			
		}
	}
	
	$.extend(config, opt);
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{
		userID:config.userID
	},function(data){
		if(typeof config.callback=="function"){
			config.callback(data);
		}
	})
}

//function shoppingAni(config,opt){
//	var config={
//		staEL:null,
//		target:null,
//		callback:function(){
//			
//		}
//	}
//	$.extend(config,opt);
////	var staELPos=config.staEL.Offset();
////	console.log(staELPos)
//	var targetPos=config.target.offset();
//	var AniEl=config.staEL.clone();
//	AniEl.css({
//		position:'absolute',
//		top:staELPos.top,
//		left:staELPos.left,
//		width:100,
//		height:100
//		})
//	$("body").append(AniEl)
//	AniEl.animate({
//		top:targetPos.top,
//		left:targetPos.left,
//		width:0,
//		height:0
//	},300,function(){
//		AniEl.remove();
//		
//		config.callback();
//	});
//
//}


















