$(function(){
	$(".backspace").on("click",function(){
		window.history.back()
		
	})
	getroduct()
})

function getroduct(){
	getUrlParameter(goodsID)
	var goodsID=getUrlParameter(goodsID)?getUrlParameter(goodsID):null;
	console.log(getUrlParameter(goodsID))
	if(goodsID){
		$.ajax({
			
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			dataType:"jsonp",
			data:{
					goodsID:goodsID
				},
			success:function(data){
				var shop= data[0].imgsUrl
				var arr = eval(shop)
				var str = ""
				console.log(data)
				for(var i in arr){
						str +='<div class="swiper-slide"><img src="'+arr[i]+'"></div>'
						str1 ='<h3>'+data[0].goodsName+'</h3><span>¥'+data[0].price+'<a>折扣:'+data[0].discount+'折</a></span><p>购买人数:'+data[0].buynumber+'</p>'
					}
				$(".swiper-wrapper").append(str)
				$(".con").append(str1)
				new Swiper ('.swiper-container', {
				    direction: 'horizontal',
				    loop:true,
				    pagination: '.swiper-pagination',
				    autoplay : 2000,
				    autoplayDisableOnInteraction : false,
				}) 
			}
		});
		$(".goodCart").on("click",function(){
			
//			window.location.href = "shopCart.html"
		})
	}
}
function getUrlParameter(name){
//	var parameterText = window.location.search.substr(1);
//	var parameterArr1=parameterText.split("&");
//	var parameterArr2=[];
//	for(var i=0; i<parameterArr1.length;i++){
//		var arr=parameterArr1[i].split("=");
//		parameterArr2[i]=arr;
//		console.log(parameterArr2[i])
//		if(parameterArr2[i][0]==name){
//			return parameterArr2[i][1];
//		}
//	}
//	
	var Text = window.location.search
//		console.log(window.location.search)
//		console.log(Text)
		var Text1 = Text.split("=")
		console.log(Text1)
		var o = Text1[1]
		console.log(o)
		//console.log(o)
		return o
}//接收参数

function updateCar(opt){
	var config={
		userID:"",
		goodsID:"",
		number:1,
		updataCallBack:function(){
			
		}
	}
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{},function(data){
		
	})
}
