<template>
	<view>
		<!-- 收货地址 -->
		<view class="revice_address_row">
			<!-- 当缓存中不存在地址信息时，按钮显示 对象和空对象的bool类型为true -->
			<view v-if="!address.userName" class="address_btn">
				<button @click="handleChooseAddress2" type="primary" plain>获取收获地址</button>
			</view>
			<!-- 当缓存中存在地址信息时，地址信息显示 -->
			<view v-else class="user_info_row">
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
				<block v-if="cart.length==0">
					 <text style="display: flex;justify-content: center;align-items: center;" >还没添加商品</text>
					 <image mode="widthFix"
						src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595753022218&di=cf09fb986cd03506ba99c2dc3fbb90ab&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658"></image>
				</block>
				<block v-else>
					<view class="cart_item"
						v-for="(item,index) of cart" :key="goods_id">
						<!-- 复选框 -->
						<view class="cart_chk_wrap">
							<checkbox-group @change="handleItemChange"
							 :data-id="item.goods_id">
								<checkbox :checked="item.checked"></checkbox>
							</checkbox-group>
						</view>
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
									<view class="num_edit" @click="handleItemNumEdit(-1,$event)"  :data-id="item.goods_id">-</view>
									<view class="goods_num">{{item.num}}</view>
									<view class="num_edit" @click="handleItemNumEdit(1,$event)"  :data-id="item.goods_id">+</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 底部工具栏 -->
		<view class="footer_tool">
			<!-- 全选 -->
			<view class="all_chk_wrap">
				<checkbox-group @change="handleItemAllCheck">
					<checkbox :checked="allChecked">全选</checkbox>
				</checkbox-group>
			</view>
			<!-- 共价格 -->
			<view class="total_price_wrap">
				<view class="total_price">
					合计：<text class="total_price_text">￥{{totalPrice}}</text>
				</view>
				<view>包含运费</view>
			</view>
			<!-- 结算 -->
			<view class="order_pay_wrap" @click="handlePay">
				结算({{totalNum}})
			</view>
		</view>
	</view>	
</template>

<script>
	export default{
		/**
		1获取用户的收货地址
			1绑定点击事件
			2调用小程序内置 api 获取用户的收货地址
			3获取用户对小程序所授予获取地址的 权限状态 scope
				1假设用户点击获取收货地址的提示框确定 authSetting scope.address 
					scope值true 可以直接调用获取收货地址
				2假设用户从来没有调用过收货地址的api
					scope undefined 可以直接调用获取收货地址
				3假设用户点击获取收货地址的提示框取消
					scope值false
					1）诱导用户自己打开授权设置页面当用户重新给与获取地址权限的时候
					2）获取收货地址
				4把获取到的收货地址存入到本地存储中
		2页面加载完毕
			1获取本地存储中的地址数据
			2把数据设置给data中的一个变量
		3 onShow
			0回到了商品详情页面第一次添加商品的时候手动添加了属性
				1 num=1 ;
				2 checked=true;
			1获取缓存中的购物车数组
			2把购物车数据填充到data中 	
		4全选的实现数据的展示
			1 onShow 获取缓存中的购物车数组
			2根据购物车中的商品数据所有的商品都被选中checked=true 全选就被选中
		5总价格和总数量
			1都需要商品被选中我们才拿它来计算
			2获取购物车数组
			3遍历
			4判断商品是否被选中
			5总价格+=商品的单价*商品的数量
			5总数量+=商品的数量
			6把计算后的价格和数量设置回data中即可	
		6商品的选中
			1绑定change事件
			2获取到被修改的商品对象
			3商品对象的选中状态取反
			4重新填充回data中和缓存中
			5重新计算全选。总价格总数量。。
		7全选和反选
			1全选复选框绑定事件change
			2获取data中的全选变量allChecked
			3直接取反allChecked= ! allChecked
			4遍历购物车数组让里面商品选中状态跟随 allChecked改变而改变
			5把购物车数组和allChecked 重新设置回data 把购物车重新设置回缓存中
		8商品数量的编辑
			1  “+”,"-"按钮绑定同一个点击事件区分的关键自定义属性
				1 “+”  "+1"
				2  "-" "-1”
			2传递被点击的商品id goods_id
			3获取data中的购物车数组来获取需要被修改的商品对象
			4.1当购物车的数量=1同时用户点击"-" 弹窗提示(showModeal)询问用户是否要删除
				1确定直接执行删除 
				2取消
				什么都不做
			4.2直接修改商品对象的数量 num 
			5把cart数组重新设置回缓存中和data中 this.setCart
		9点击结算
			1判断有没有收货地址信息
			2判断用户有没有选购商品
			3经过以上的验证跳转到支付页面!
		 */
		data(){
			return{
				address:{},
				cart:[],
				allChecked:false,
				totalPrice: 0,
				totalNum:0
			}
		},
		onShow() {
			/* 
			 2页面加载完毕
			 	1获取本地存储中的地址数据
			 	2把数据设置给data中的一个变量
			 */
			this.address = uni.getStorageSync("address");
			//获取缓存中的购物车数据
			this.cart = uni.getStorageSync("cart")||[];
			
			this.setCart();
			
		},
		methods:{
			
			handleChooseAddress(){
				//1
				// const  test = await this.$myUniApi.getSetting()
				// console.log(test.authSetting["scope.address"]);
				/* try{
					this.$myUniApi.getSetting().then((res)=>{
						const aa = res.authSetting["scope.address"];
						return (aa===true || aa === undefined);
					}).then((res)=>{
						console.log("nihao 判断是否有权限，灭有权限诱导用户打开权限",res)
						if(!res){
							return this.$myUniApi.openSetting();
						}else{
							return;
						}
					}).then((res)=>{
						console.log("你不好 获取收货地址选中 ",res)
						return this.$myUniApi.chooseAddress();
					}).then(res=>{
						console.log("你好不好 保存收货地址",res)
					})
				}catch(err){
					console.log(err)
				} */
				// if(scopeAddress===false){
				// 	console.log("判断",scopeAddress)
				// }
				//1.获取用户设置，是否开启收货地址权限
				uni.getSetting({
					success: (res) => {
						//2.获取权限状态 只要发现一些属性名很怪异的时候，使用['xxx.yyy'] 形式来获取属性值
						const scopeAddress = res.authSetting["scope.address"];
						if(scopeAddress===true||scopeAddress===undefined){
							uni.chooseAddress({
								success: (res1) => {
									res1.all = address.provinceName + address.cityName+address.countyName + address.detailInfo;
									//将地址信息存入缓存
									uni.setStorageSync("address",res1)
								}
							})
						}else{
							//没有权限 诱导用户打开设置
							// this.$myUniApi.openSetting().then((res)=>{
							// 	this.$myUniApi.chooseAddress()
							// })
							uni.openSetting({
								success: (res2) => {
									uni.chooseAddress({
										success: (res3) => {
											res3.all = address.provinceName + address.cityName+address.countyName + address.detailInfo;
											//将地址信息存入缓存
											uni.setStorageSync("address",res3)
										}
									})
								}
							})
						}
					}
				})
			},
			//获取地址信息（优化）
			async handleChooseAddress2(){
				try{
					//1.获取权限状态
					const res1 = await this.$myUniApi.getSetting();
					const scopeAddress = res1.authSetting["scope.address"];
					//2.判断权限状态
					if(scopeAddress ===false){
						//3.诱导用户打开设置
						await this.$myUniApi.openSetting();
					}
					//4.调用获取收获地址的api
					let address = await this.$myUniApi.chooseAddress();
					address.all = address.provinceName + address.cityName+address.countyName + address.detailInfo;
					//5.将地址信息存入缓存中
					uni.setStorageSync("address",address)
				}catch(err){
					console.log(err)
				}
			},
			//商品选中事件
			handleItemChange(e){
				//1.获取被修改的商品id
				const goodsId = e.currentTarget.dataset.id;
				//2.获取购物车数组
				let cart = this.cart;
				//3.找到被修改的商品对象
				let index = cart.findIndex(v=>v.goods_id===goodsId);
				//4选中状态取反
				cart[index].checked = !cart[index].checked;
				//5 6 把购物车数据重新设置回去
				uni.setStorageSync("cart",cart)
				this.setCart();
				
			},
			//全选按钮事件
			handleItemAllCheck(){
				//修改值
				this.allChecked  = ! this.allChecked;
				this.cart.forEach(v=>v.checked = this.allChecked)
				//将修改后的值填充回缓存中
				uni.setStorageSync("cart",this.cart)
				this.setCart();
			},
			//商品数量加减事件
			handleItemNumEdit(num,e){
				
				console.log(num,e)
				//1.获取id
				const id = e.currentTarget.dataset.id;
				//找到需要修改的商品的索引
				const index = this.cart.findIndex(v=>v.goods_id===id);
				//判断是否要删除商品
				/* if(this.cart[index].num===1 && num===-1){
					uni.showModal({
					    title: '提示',
					    content: '是否要删除商品',
					    success:  (res)=> {
					        if (res.confirm) {
										console.log('用户点击确定');
										//删除当前选中的商品
										this.cart.splice(index,1)
										//将修改后的值填充回缓存中
										uni.setStorageSync("cart",this.cart)
										this.setCart();
					        } else if (res.cancel) {
										console.log('用户点击取消');
					        }
					    }
					});
				}else{
					this.cart[index].num += num;
					//将修改后的值填充回缓存中
					uni.setStorageSync("cart",this.cart)
					this.setCart();
				} */
				
				//优化
				//判断是否要删除商品
				if(this.cart[index].num===1 && num===-1){
					this.$myUniApi.showModal({content:"是否要删除商品"})
					.then((res)=>{
						if (res.confirm) {
							console.log('用户点击确定');
							//删除当前选中的商品
							this.cart.splice(index,1)
							//将修改后的值填充回缓存中
							uni.setStorageSync("cart",this.cart)
							this.setCart();
						}
					},
					(err)=>{console.log(err)})
				}else{
					this.cart[index].num += num;
					//将修改后的值填充回缓存中
					uni.setStorageSync("cart",this.cart)
					this.setCart();
				}
				
			},
			//设置购物车状态时,重新计算购物车相关属性
			setCart(){
				//1计算全选
				// every数组方法会遍历会接收一个回调函数那么每一个回调函数都返回true 那么every方法的返回值为true
				//只要有一个回调函数返回了false那么不再循环执行，直接返回false
				//空数组调用every返回结果为true
				// this.allChecked = this.cart.length? this.cart.every(v=>v.checked):false;
				
				//计算总价格和总数量
				this.totalPrice = 0;
				this.totalNum = 0;
				this.allChecked = true;
				//计算总价格和总数量
				this.cart.forEach(v=>{
					if(v.checked){
						this.totalPrice += v.num*v.goods_price;
						this.totalNum += v.num;
					}else{
						this.allChecked = false;
					}
				})
				//判断数组是否为空
				this.allChecked = this.cart.length!=0?this.allChecked:false;
			},
			
			//结算按钮事件
			handlePay(){
				console.log("结算")
				const totalNum = this.totalNum;
				if(totalNum<=0){
					this.$myUniApi.showToast({title:"您还没有选购商品！"}).then();
					return;
				}
				const address = this.address;
				if(!address.userName){
					this.$myUniApi.showToast({title:"您还没有添加收货地址！"}).then();
					return;
				}
				uni.navigateTo({
					url:"/pages/pay/index"
				})
				
			}
		}
	}
</script>

<style lang="less">
	page{padding-bottom: 90rpx;}
	/* 地址信息 */
	.revice_address_row{
		.address_btn{
			padding: 20rpx;
			button{
				width: 60%;
			}
		}
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
				.cart_chk_wrap{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
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
							.num_edit{
								width: 55rpx;
								height: 55rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border: 1rpx solid #ccc;
							}
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
		.all_chk_wrap{
			flex:2;
			display: flex;
			justify-content: center;
			align-items: center;
		}
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
