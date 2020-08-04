<template>
	<view>
		<!-- 轮播图 -->
		<view class="detail_swiper">
			<swiper indicator-dots="true" autoplay="true" circular="true">
				<swiper-item v-for="(item,index) of goodsObj.pics" :key="pics_id">
					<image @click="handlePrevewImage(index)" mode="widthFix" :src="item.pics_mid"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品价格 -->
		<view class="goods_price">￥{{goodsObj.goods_price}}</view>
		<!-- 商品描述 -->
		<view class="goods_name_row">
			<view class="goods_name">{{goodsObj.goods_name}}</view>
			<view class="goods_collect">
				<text class="iconfont icon-shoucang"></text>
				<view class="collect_text">收藏</view>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="goods_info">
			<view class="goods_info_title">图文详情</view>
			<view class="goods_info_content">
				<!-- 使用富文本 -->
				<rich-text :nodes="goodsObj.goods_introduce"></rich-text>
			</view>
		</view>
		<!-- 底部工具栏 -->
		<view class="btm_tool">
			<view class="tool_item">
				<view class="iconfont icon-kefu"></view>
				<view>客服</view>
				<button open-type="contact"></button>
			</view>
			<view class="tool_item">
				<view class="iconfont icon-share"></view>
				<view>分享</view>
				<button open-type="share"></button>
			</view>
			<navigator open-type="switchTab" url="/pages/cart/index" class="tool_item">
				<view class="iconfont icon-cart"></view>
				<view>购物车</view>
			</navigator>
			<view class="tool_item btn_cart" @click="handleCartAdd">
				加入购物车
			</view>
			<view class="tool_item btn_buy">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//请求参数
				queryParams:{
					goods_id:0
				},
				goodsObj:{}
			}
		},
		onLoad(options) {
			this.queryParams.goods_id = options.goods_id;
			this.getGoodsDetail()
		},
		methods:{
			getGoodsDetail(){
				//商品详情路径 /goods/detail
				this.$myRequest({url:"/goods/detail",data:this.queryParams})
				.then((res)=>{
					const data = res.data.message;
					//优化数据，减少不必要的数据存储
					this.goodsObj = {
						goods_name:data.goods_name,
						goods_price:data.goods_price,
						// iPhone部分手机不识别webp图片格式 富文本中
						//将webp替换为jpg格式
						// goods_introduce:data.goods_introduce,
						goods_introduce:data.goods_introduce.replace(/\.webp/g,'.jpg'),
						pics:data.pics,
						num:data.num||1,
						goods_small_logo:data.goods_small_logo,
						checked:true,
						goods_id:data.goods_id
						
					}
					console.log(res)
				})
			},
			//轮播图预览
			handlePrevewImage(index){
				uni.previewImage({
					urls:this.goodsObj.pics.map((data)=>{
						return data.pics_mid;
					}),
					loop:true,
					current:index
				})
			},
			//加入购物车
			/* 
			 点击加入购物车
					1先绑定点击事件
					2获取缓存中的购物车数据数组格式
					3先判断当前的商品是否已经存在于购物车
					4已经存在修改商品数据
						执行购物车数量++重新把购物车数组填充回缓存中
					5不存在于购物车的数组中直接给购物车数组添加一个新元素新元素带上购买数量属性num
						重新把购物车数组填充回缓存中
					6弹出提示
			 */
			handleCartAdd(){
				//1获取缓存中的购物车 数组
				let cart = uni.getStorageSync("cart")||[];
				//2 判断购物车数组中是否存在该商品对象
				let index = cart.findIndex(v=>v.goods_id===this.goodsObj.goods_id);
				if(index===-1){
					//商品不存在，第一次添加
					console.log("第一次添加")
					cart.push(this.goodsObj)
				}else{
					//已经存在在购物车数组中，num++
					console.log("重复添加",cart[index])
					cart[index].num++;
				}
				//将购物车重新添加到缓存
				uni.setStorageSync("cart",cart);
				//弹出提示框
				uni.showToast({
					title:"添加成功",
					mask:true
				})
			}
				
		}
	}
</script>

<style lang="less">
	page{
		padding-bottom: 110rpx;
	}
	.detail_swiper{
		swiper{
			height: 65vw;
			/* background-color: #DD524D; */
			text-align: center;
			image{
				width: 60%;
			}
		}
	}
	.goods_price{
		padding: 15rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: var(--themeColor);
		
	}
	.goods_name_row{
		border-bottom: 5rpx solid #dedede;
		border-top: 5rpx solid #dedede;
		padding: 10rpx 0;
		display: flex;
		.goods_name{
			flex: 5;
			color: #000;
			font-size: 30rpx;
			padding: 0 10rpx;
			/* 让多余的文字显示... */
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:2;
		}
		.goods_collect{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1rpx solid #000;
			.iconfont{}
			.collect_text{}
		}
	}
	.goods_info{
		.goods_info_title{
			font-size: 32rpx;
			color: var(--themeColor);
			font-weight: 800;
			padding: 20rpx;
		}
		.goods_info_content{}
	}
	.btm_tool{
		border-top: 1rpx solid #ccc;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		background-color: white;
		display: flex;
		.tool_item{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			position: relative;
			button{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				/* background-color: #DD524D; */
				opacity: 0;
			}
		}
		.btn_cart{
			flex: 2;
			background-color: #ffa500;
			color: #fff;
			font-size: 30rpx;
			font-weight: 700;
			
		}
		.btn_buy{
			flex: 2;
			/* background-color: #DD524D; */
			background-color: #eb4450;
			color: #fff;
			font-size: 30rpx;
			font-weight: 700;
		}
	}
</style>
