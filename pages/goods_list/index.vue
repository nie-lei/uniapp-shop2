<template>
	<view>
		<search-input></search-input>
		<tabs :tabs="tabs" @tabsItemChange="tabsChange">
			<block v-if="tabs[0].isActive">
				<view class="first_tab">
					<navigator v-for="(item,index) of goodsList" :key="goods_id" 
						class="goods_item"
						:url="'/pages/goods_detail/index?goods_id='+item.goods_id"
						>
						<!-- 左侧 图片容器 -->
						<view class="goods_img_wrap">
							<!-- <image mode="widthFix" src="https://cdn.it120.cc/apifactory/2019/06/25/a0edbee6-44c2-453f-9398-01edfb355323.jpg" ></image> -->
							<image mode="widthFix" 
								:src="item.goods_small_logo?item.goods_small_logo:'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2g1m.jpg'" ></image>
						</view>
						<!-- 右侧 商品描述 -->
						<view class="goods_info_wrap">
							<view class="goods_name">{{item.goods_name}}</view>
							<view class="goods_price">￥{{item.goods_price}}</view>
						</view>
					</navigator>
					<view v-if="isnoe">到底了</view>
				</view>
			</block>
			<block v-if="tabs[1].isActive">销量</block>
			<block v-if="tabs[2].isActive">价格</block>
		</tabs>
	</view>
</template>

<script>
	import searchInput from "../../components/searchInput/searchInput.vue"
	import tabs from "../../components/tabs/tabs.vue"
	export default{
		data(){
			return{
				tabs:[
					{
						id:0,
						value:"综合",
						isActive:true
					},
					{
						id:1,
						value:"销量",
						isActive:false
					},
					{
						id:2,
						value:"价格",
						isActive:false
					}
				],
				//请求参数
				queryParams:{
					query:"",//关键字
					cid:"",//商品分类id
					pagenum:0,//第几页
					pagesize:10//每页条数
				},
				goodsList:[],
				totalPage:0,
				isnoe:false
			}
		},
		methods:{
			tabsChange(index){
				this.tabs.forEach(res=>{
					if(res.id===index){
						res.isActive=true
					}else{
						res.isActive=false
					}
				})
			},
			//     /goods/search
			getGoodsList(){
				uni.showLoading({
					title:"加载中"
				})
				this.queryParams.pagenum +=1 ;
				this.$myRequest({url:"/goods/search",data:this.queryParams})
				.then((res)=>{
					// this.goodsList = res.data.message.goods;
					this.goodsList.push(...res.data.message.goods)
					this.totalPage = Math.ceil(res.data.message.total/this.queryParams.pagesize);
					console.log(res)
				})
				uni.hideLoading();
				uni.stopPullDownRefresh();//关闭下拉刷新提示
			}
		},
		onLoad(options) {
			this.queryParams.cid = options.cid||"";
			this.queryParams.query = options.query||"";
			this.getGoodsList();
		},
		//页面触底监听
		onReachBottom(){
			/*
				上拉到底刷新请求下一页数据
				1.判断是否有下一页
					1）获取总页数 = Math.ceil(总条数 / 每页数量)
					2）获取当前页码
					3）判断当前页码是否大于等于总页数
				2.没有下一页数据给予提示
				3.有下一条数据，加载
			*/
		 if(this.totalPage<=this.queryParams.pagenum){
			 uni.showToast({
			 	 title:"没有新的数据了"
			 })
			 this.isnoe=true
		 }else{
			 this.getGoodsList()
			/* uni.showLoading({
			 	title:"加载中"
			 })
			 this.queryParams.pagenum +=1 ;
			 this.$myRequest({url:"/goods/search",data:this.queryParams})
			 .then((res)=>{
			 	this.goodsList.goods.push(...res.data.message.goods);
			 	console.log(res)
				uni.hideLoading();
			 }) */
		 }
		},
		//下拉刷新监听
		onPullDownRefresh(){
			console.log("下拉刷新")
			/* 
				1.页面重置
				2.清空数组 重新获取请求
			 */
			//1
			this.isnoe=false
			this.queryParams.pagenum = 0
			this.goodsList = []
			this.getGoodsList();
		},	
		components:{
			searchInput,
			tabs
		}
	}
</script>

<style lang="less">
	.first_tab{
		text-align: center;
		.goods_item{
			display: flex;
			border-bottom: 1rpx solid #ccc;
			.goods_img_wrap{
				flex: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 70%;
				}
			}
			.goods_info_wrap{
				flex: 3;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.goods_name{
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp:2;
				}
				.goods_price{
					font-size: 30rpx;
					color: var(--themeColor);
				}
			}
		}
	}
</style>
