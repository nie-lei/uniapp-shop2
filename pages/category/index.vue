<template>
	<view class="cates">
		<!-- 搜索框 -->
		<search-input></search-input>
		<view class="cates_container">
			<!-- 左侧菜单 -->
			<scroll-view class="left_menu" 
						enable-flex = "true"
						scroll-y="true" >
				<view v-for="(item,index) in leftMenuList" 
						:key="index" 
						:scroll-into-view="'top'+index"
						:id="'top'+index"
						class="menu_item "
						:class="index===currentIndex?'active':''"
						@click="taggleMenu(index)">
					{{item.name}}
				</view>
			</scroll-view>
			<!-- 右侧数据 -->
			<scroll-view class="right_content" scroll-y="true" :scroll-top="sTop" @scroll="scroll">
				<view v-for="(item,index) in rightContents" class="goods_group" :key="item.cat_id">
					<view class="goods_title">
						<text class="delimiter">/</text>
						<text class="title">{{item.cat_name}}</text>
						<text class="delimiter">/</text>
					</view>
					<view class="goods_list">
						<navigator v-for="item1 in item.children" 
							:key="item1.cat_id"
							:url="'/pages/goods_list/index?cid='+item1.cat_id">
							<image mode="widthFix" :src="item1.cat_icon"></image>
							<view class="goods_name">{{item1.cat_name}}</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import searchInput from "../../components/searchInput/searchInput.vue"
	export default{
		///categories
		data(){
			return {
				
				leftMenuList:[],//左侧菜单
				rightContents:[],//右侧内容
				currentIndex:0,//被选中的菜单索引
				sTop:0,//scroll滚动条距离顶部的距离
				old: {sTop: 0 }
			}
		},
		Cates:[],
		
		methods:{
			scroll: function(e) {
				this.old.sTop = e.detail.scrollTop
			},
			//切换菜单
			taggleMenu(index){
				//1.切换选中
				this.currentIndex = index;
				//商品重新置顶
				this.sTop = this.old.sTop;
				this.$nextTick(()=>{
					this.sTop = 0;
				});
				// 修改右侧数据
				this.rightContents = this.Cates[index].children
			},
			//获取数据
			getCategories(){
				this.$myRequest({
					url:"/categories"
				}).then((data)=>{
					//获取所有数据
					this.Cates = data.data.message;
					//将数据存储到本地存储中
					uni.setStorageSync("cates",{time:Date.now(),data:this.Cates})
					//构造左侧菜单数据
					this.leftMenuList = this.Cates.map((res)=>{
						return {"id":res.cat_id,"name":res.cat_name}
					})
					//构造右侧内容数据
					this.rightContents = this.Cates[0].children
				})
			}
		},
		onLoad() {
			/* 缓存数据，
				1.获取缓存中的数据{time:Date.now(),data:[...]} 
				2.判断是否有数据，和是否过期，没过期直接使用
				3.没有数据获取请求
			*/
		 const cates = uni.getStorageSync("cates");
		 if(!cates){//没有缓存
			 this.getCategories();
		 }else{//有缓存
			 //判断是否过期
			 if(Date.now()-cates.time>1000*10){//过期，重新获取
				this.getCategories();
			 }else{
				 //构造左侧菜单数据
				 this.leftMenuList = cates.data.map((res)=>{
				 	return {"id":res.cat_id,"name":res.cat_name}
				 })
				 //构造右侧内容数据
				 this.rightContents = cates.data[0].children
			 }
		 }
		},
		
		components:{
			searchInput
		}
	}
</script>

<style lang="less"> 
/* page{
	height: 100%;
} */
template{
	height: 100%;
}
.cates{
	height: 100%;
	.cates_container{
		height: calc(100vh - 110rpx);
		display: flex;
	
		.left_menu{
			flex: 2;
			border-right: 1px solid #eee;
			.menu_item{
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}
			.active{
				background-color: var(--themeColor);
				font-weight: 700;
				color: white;
			}
		}
		.right_content{
			flex: 5;
			.goods_group{
				.goods_title{
					height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 25rpx;
					.delimiter{
						color: #ccc;
						padding: 0 10rpx;
					}
					.title{
						color: #2C405A;
					}
				}
				.goods_list{
					display: flex;
					flex-wrap: wrap;
					navigator{
						width: 33.33%;
						text-align: center;
						image{
							width: 50%;
						}
						.goods_name{
							
						}
					}
				}
			}
		}
	}
	
	
}
	
</style>
