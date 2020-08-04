<template>
	<view>
		<!-- tabs组件 -->
		<tabs :tabs="tabs" @tabsItemChange="checkItem">
			订单内容
		</tabs>
	</view>
</template>

<script>
	/* 
	 1页面被打开的时候onShow
		0). onShow 不同于onLoad无法在形参上接收options参 数
			1获取当前的小程序的页面栈-数组长度最大是10页面
			2数组中索引最大的页面就是当前页面
		1)获取url上的参数type
		2)根据type去发送请求获取订单数据
		3)渲染页面
	 2点击不同的标题重新发送请求来获取和渲染数据
	 */
	import tabs from "../../components/tabs/tabs.vue"
	export default{
		components:{
			tabs
		},
		data(){
			return{
				tabs:[
					{
						isActive:true,
						value:"全部订单"
					},
					{
						isActive:false,
						value:"待付款"
					},
					{
						isActive:false,
						value:"待收货"
					},
					{
						isActive:false,
						value:"退款/退货"
					}
				]
			}
		},
		/* onLoad(options) {
			let index = options.type-1
			this.tabs.forEach((v,i)=>{
				if(i===index){
					v.isActive=true
				}else{
					v.isActive=false
				}
			})
		}, */
		onShow() {
			/* 
				1获取当前的小程序的页面栈-数组长度最大是10页面
				2数组中索引最大的页面就是当前页面 
			*/
		 let pages = getCurrentPages();
		 console.log(pages)
		 let options = pages[pages.length-1].options;
		 console.log(options)
		 let index = options.type-1
		 this.tabs.forEach((v,i)=>{
		 	if(i===index){
		 		v.isActive=true
		 	}else{
		 		v.isActive=false
		 	}
		 })
		},
		methods:{
			checkItem(index){
				console.log(index)
				this.tabs.forEach((v,i)=>{
					if(i===index){
						v.isActive=true
					}else{
						v.isActive=false
					}
				})
			}
		}
	}
</script>

<style>
	
</style>
