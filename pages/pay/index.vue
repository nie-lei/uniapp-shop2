<template>
	<view>
		<!-- 收货地址 -->
		<view class="revice_address_row">
			<!-- 当缓存中存在地址信息时，地址信息显示 -->
			<view class="user_info_row">
				<view class="user_info">
					<view>{{address.userName}}</view>
					<view>{{address.all}}</view>
				</view>
				<view class="user_phone">{{address.telNumber}}</view>
			</view>
		</view>
		<!-- 购物车内容 -->
		<view class="cart_content">
			<view class="cart_title">购物车</view>
			<view class="cart_main">
					<view class="cart_item"
						v-for="(item,index) of cart" :key="goods_id">
						<!-- 商品图片 -->
						<navigator class="cart_img_wrap" :url="'../goods_detail/index?goods_id='+item.goods_id">
							<image mode="widthFix" :src="item.goods_small_logo"></image>
						</navigator>
						<!-- 商品信息 -->
						<view class="cart_info_wrap">
							<view class="goods_name">{{item.goods_name}}</view>
							<view class="good_price_wrap">
								<view class="goods_price">￥{{item.goods_price}}</view>
								<view class="cart_num_tool">
									<view class="goods_num">X{{item.num}}</view>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		<!-- 底部工具栏 -->
		<view class="footer_tool">
			<!-- 共价格 -->
			<view class="total_price_wrap">
				<view class="total_price">
					合计：<text class="total_price_text">￥{{totalPrice}}</text>
				</view>
				<view>包含运费</view>
			</view>
			<!-- 支付 -->
			<view class="order_pay_wrap" @click="handleOrderPay">
				支付({{totalNum}})
			</view>
		</view>
	</view>	
</template>

<script>
	/* 
	1页面加载的时候
		1从缓存中获取购物车数据渲染到页面中
		 这些数据 checked=true 
	2微信支付
		1哪些人哪些帐号可以实现微信支付
			1企业帐号
			2企业帐号的小程序后台中必须给开发者添加上白名单
				1一个appid可以同时绑定多个开发者
				2这些开发者就可以公用这个appid 和它的开发权限
	3支付按钮
		1先判断缓存中有没有token
		2没有跳转到授权页面进行获取token
		3有token...
		4.创建订单，获取订单编号
		5已经完成了微信支付
		6手动删除缓存中已经被选中了的商品
		7删除后的购物车数据填充回缓存
		8再跳转页面
	 */
	export default{
		data(){
			return{
				address:{},
				cart:[],
				totalPrice: 0,
				totalNum:0
			}
		},
		onShow() {
			/* 
			1页面加载完毕
			 	1获取本地存储中的地址数据
			 	2把数据设置给data中的一个变量
			 */
			this.address = uni.getStorageSync("address");
			//获取缓存中的购物车数据
			this.cart = uni.getStorageSync("cart")||[];
			//过滤购物车数组
			this.cart = this.cart.filter(v=>v.checked)
			//计算总价格和总数量
			this.cart.forEach(v=>{
				this.totalPrice += v.num*v.goods_price;
				this.totalNum += v.num;
			})
			
		},
		methods:{
			//点击支付事件
			async handleOrderPay(){
				try{
					console.log("点击支付")
					//判断缓存中是否有token
					const token = uni.getStorageSync("token");
					if(!token){
						uni.navigateTo({
							url:"/pages/auth/index"
						})
					}
					//创建订单
					//封装请求头参数
					const header = {Authorization:token};
					//封装请求体参数
					const order_price = this.totalPrice;
					const consignee_addr = this.address.all;
					const cart = this.cart;
					let goods = [];
					cart.forEach(v=>goods.push({
						goods_id:v.goods_id,
						goods_number:v.num,
						goods_price:v.goods_price
					}))
					const orderParams = {order_price,goods,consignee_addr}
					//发送创建订单请求，返回订单号
					const {order_number} = await this.$myRequest({url:"/my/orders/create",method:"post",data:orderParams,header})
					//发送预支付请求 返回微信支付参数
					const {pay} = await this.$myRequest({url:"/my/orders/req_unifiedorder",method:"post",data:{order_number},header})
					//发起支付请求
					await this.$myUniApi.payment(pay);
					//发送查询订单请求 查看订单状态
					const res = await this.$myRequest({url:"/my/orders/chkOrder",method:"post",data:{order_number},header})
					this.$myUniApi.showToast({title:res});
					//删除缓存中已支付的订单
					let newCart = uni.getStorageSync("cart");
					newCart = newCart.filter(v=>!v.checked)
					uni.setStorageSync("cart",newCart);
					
					//支付成功跳转到订单页面
					uni.navigateTo({
						url:"/pages/order/index"
					})
					
				}catch(err){
					this.$myUniApi.showToast({title:"支付失败"})
					console.log(err)
				}
				
			}
		}
	}
</script>

<style lang="less">
	page{padding-bottom: 90rpx;}
	/* 地址信息 */
	.revice_address_row{
		.user_info_row{
			display: flex;
			padding: 20rpx;
			.user_info{
				flex: 5;
			}
			.user_phone{
				flex: 3;
				text-align: right;
			}
		}
	}
	/* 购物车内容 */
	.cart_content{
		.cart_title{
			padding: 20rpx;
			font-size: 36rpx;
			font-weight: 600;
			/* color: var(--themeColor); */
			border-top: 1rpx solid var(--themeColor);
			border-bottom: 1rpx solid var(--themeColor);
		}
		.cart_main{
			.cart_item{
				display: flex;
				padding: 10rpx;
				border-bottom: 1rpx solid #ccc;	
				.cart_img_wrap{
					flex: 2;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 80%;
					}
				}
				.cart_info_wrap{
					flex: 4;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.goods_name{
						display: -webkit-box;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp:2;
						color: #666;
					}
					.good_price_wrap{
						display: flex;
						justify-content: space-between;
						.goods_price{
							color: var(--themeColor);
							font-size: 34rpx;
						}
						.cart_num_tool{
							display: flex;
							.goods_num{
								width: 55rpx;
								height: 55rpx;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
					}
				}
			}
		}
	
	}
	
	/* 底部工具栏 */
	.footer_tool{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		display: flex;
		border-top: 1rpx solid #ccc;
		.total_price_wrap{
			flex: 4;
			padding-right: 15rpx;
			text-align: right;
			.total_price{
				.total_price_text{
					color: var(--themeColor);
					font-size: 32rpx;
					font-weight: 700;
				}
			}
		}
		.order_pay_wrap{
			flex: 3;
			background-color: var(--themeColor);
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
		
</style>
