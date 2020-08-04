<template>
	<view class="user_info_wrap">
		<!-- 用户头像，用户名展示 -->
		<view class="user_image_wrap" v-if="userInfo.avatarUrl">
			<image class="user_bg" :src="userInfo.avatarUrl" ></image>
			<view class="user_info">
				<image class="user_icon" :src="userInfo.avatarUrl" mode="widthFix"></image>
				<view class="user_name">{{userInfo.nickName}}</view>
			</view>
		</view>
		<!-- 未登录，显示提示用户登录按钮 -->
		<view class="user_btn_wrap" v-else>
			<view class="user_btn">
				<navigator url="../login/index">登录</navigator>
			</view>
		</view>
		
		<!-- 用户操作导向内容 -->
		<view class="user_content">
			<view class="user_main">
				<!-- 历史足迹 -->
				<view class="history_wrap">
					<navigator>
						<view class="his_num">0</view>
						<view class="his_name">收藏的店铺</view>
					</navigator>
					
					<navigator>
						<view class="his_num">0</view>
						<view class="his_name">收藏的商品</view>
					</navigator>
					
					<navigator>
						<view class="his_num">0</view>
						<view class="his_name">关注的商品</view>
					</navigator>
					
					<navigator>
						<view class="his_num">0</view>
						<view class="his_name">我的足迹</view>
					</navigator>
				</view>
				<!-- 我的订单 -->
				<view class="orders_wrap">
					<view class="orders_title">我的订单</view>
					<view class="orders_content">
						<navigator url="/pages/order/index?type=1">
							<view class="iconfont icon-quanbudingdan"></view>
							<view class="order_name">全部订单</view>
						</navigator>
						
						<navigator url="/pages/order/index?type=2">
							<view class="iconfont icon-daifukuan01"></view>
							<view class="order_name">待付款</view>
						</navigator>
						
						<navigator url="/pages/order/index?type=3">
							<view class="iconfont icon-daishouhuo"></view>
							<view class="order_name">待收货</view>
						</navigator>
						
						<navigator url="/pages/order/index?type=4">
							<view class="iconfont icon-tuihuo"></view>
							<view class="order_name">退款/退货</view>
						</navigator>
					</view>
				</view>
				<!-- 收货地址管理 -->
				<view class="adress_wrap">
					收货地址管理
				</view>
				<!-- 应用信息相关 -->
				<view class="app_info_warp">
					<view class="app_info_item app_info_contact">
						<text>联系客服</text>
						<text>400-618-4000</text>
					</view>
					<navigator url="/pages/feedback/index" class="app_info_item">意见反馈</navigator>
					<view class="app_info_item">关于我们</view>
				</view>
				<!-- 推荐 -->
				<view class="recommend_warp">推荐此应用给其他人</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo: {}
			}
		},
		onShow() {
			const user = uni.getStorageSync("userInfo")
			this.userInfo = user;
			
		}
	}
</script>

<style lang="less">
	page{
		background-color: #edece8;
	}
	.user_info_wrap{
		height: 45vh;
		background-color: var(--themeColor);
		position: relative;
		.user_image_wrap{
			background-color: var(--themeColor);
			.user_bg{
					height: 45vh;
					filter: blur(10rpx);
			}
			.user_info{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 25%;
				text-align: center;
				.user_icon{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}
				.user_name{
					color: #fff;
					margin-top: 40rpx;
					font-size: 35rpx;
				}
			}
		}
		.user_btn_wrap{
			height: 45vh;
			.user_btn{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 40%;
				border: 1rpx solid greenyellow;
				color: greenyellow;
				font-size: 80rpx;
				padding: 40rpx;
				border-radius: 10rpx;
				
			}
		}
		
			
		
		.user_content{
			position: relative;
			background-color: #fff;
			.user_main{
				padding-bottom: 100rpx;
				color: #666;
				position: absolute;
				width: 90%;
				left: 50%;
				transform: translateX(-50%);
				top: -40rpx;
				
				.history_wrap{
					background-color: #fff;
					display: flex;
					navigator{
						flex: 1;
						text-align: center;
						padding: 10rpx 0;
						.his_num{
							color: var(--themeColor);
						}
						.his_name{
							
						}
					}
				}
				.orders_wrap{
					background-color: #fff;
					margin-top: 30rpx;
					font-size: 35rpx;
					.orders_title{
						padding: 15rpx;
						border-bottom: 1rpx solid #ccc;
					}
					.orders_content{
						display: flex;
						navigator{
							padding: 15rpx 0;
							flex: 1;
							text-align: center;
							.iconfont{
								color: var(--themeColor);
								
							}
							.order_name{
								margin-top: 10rpx;
							}
						}
					}
				}
				.adress_wrap{
					margin-top: 30rpx;
					background-color: #fff;
					padding: 20rpx;
				}
				.app_info_warp{
					margin-top: 30rpx;
					background-color: #fff;
					.app_info_item{
						padding: 20rpx;
						border-bottom: 1rpx solid #ccc;
					}
					.app_info_contact{
						display: flex;
						justify-content: space-between;
					}
				}
				.recommend_warp{
					margin-top: 30rpx;
					background-color: #fff;
					padding: 20rpx;
				}
			}
		}
	
	}
</style>
