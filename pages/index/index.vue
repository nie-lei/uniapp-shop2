<template>
	<view>
		<!-- 搜索框开始 -->
		<search-input></search-input>
		<!-- 搜索框结束 -->
		 <!-- 轮播图开始 -->
		<view class="index_swiper">
		<!-- 
		  1.swiper标签默认的宽高： 100%*150px
		  2.image标签默认的宽高：320px * 240px
		
		  图片标签mode属性 渲染模式
		    widthFix 让图片宽高等比例缩放
		 -->
		  <swiper 
		    autoplay 
		    circular 
		    indicator-dots 
		    display-multiple-items="1">
		    <swiper-item v-for="item of swiperList" :key="goods_id">
		      <navigator :url="'/pages/goods_detail/index?goods_id='+item.goods_id">
		        <image mode="widthFix" :src="item.image_src"></image>
		      </navigator>
		    </swiper-item>
		  </swiper>
		</view>
		<!-- 轮播图结束 -->
		<!-- 导航菜单开始 -->
		<view class="index_cate">
		  <navigator 
		    v-for="item of catesList"
		    :key="name"
				:url="item.navigator_url"
				open-type="reLaunch">
		  <image :src="item.image_src" mode="widthFix"/>
		  </navigator>
		</view>
		<!-- 导航菜单结束 -->
		<!-- 楼层显示开始 -->
		<view class="index_floor">
		  <view class="floor_group"
		    v-for="(item1,index1) of floorList"
		    :key="floor_title"
		  >
		    <!-- title -->
		    <view class="floor_title">
		      <image :src="item1.floor_title.image_src" mode="widthFix"></image>
		    </view>
		    <!-- content -->
		    <view class="floor_list"> 
		      <navigator
		        v-for="(item2,index2) of item1.product_list"
		        :key="name"
						:url="item2.navigator_url"
		      >
		      <!-- mode:判断是否为第一个元素，是：根据宽等比例缩放，否：等于标签宽高 -->
		      <image :src="item2.image_src" :mode="index2===0?'widthFix':'scaleToFill'"></image>
		      </navigator>
		      
		    </view>
		  </view>
		</view>
		<!-- 楼层显示结束 -->
	</view>
</template>

<script>
	import searchInput from "../../components/searchInput/searchInput.vue"
	import {myRequest} from "../../util/api.js"
	export default {
		components:{
			searchInput
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				//轮播图
				swiperList:[],
				//页面导航
				catesList:[],
				//楼层数据
				floorList:[]
			}
		},
		methods: {
			//获取轮播图数据
			  getSwiperList(){
					myRequest({url:'/home/swiperdata'}).then(
					data=>{
						console.log("获取轮播图",data)
						this.swiperList = data.data.message;
					})
			  },
			  //获取导航菜单
			  getCateList(){
			  //   uni.request({
					// url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
					// success:(data)=>{
					// 	this.catesList = data.data.message;
					// },
					// })
					this.$myRequest({url:'/home/catitems'}).then(
					data=>{
						this.catesList = data.data.message;
						this.catesList.filter(v=>{
							v.navigator_url = v.navigator_url?v.navigator_url.replace("/main","/index"):""
						})
					})
			  },
			  //获取楼层数据
			  getFloorList(){
			    uni.request({
						url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
						success: (data) => {
							this.floorList=data.data.message
							this.floorList.forEach((list)=>{
								// console.log(list)
								list.product_list.forEach((v)=>{
									let navigator_url = v.navigator_url
									v.navigator_url = navigator_url?
										navigator_url.slice(0,navigator_url.indexOf("?"))
										+"/index"
										+navigator_url.slice(navigator_url.indexOf("?"))
										:""
									// console.log(navigator_url);
								})
							})
						}
				})
			  }
		},
		created(){
			//1 发送异步请求获取轮播图数据
			this.getSwiperList();
			//获取导航菜单
			this.getCateList();
			//获取楼层数据
			this.getFloorList();
		}
	}
</script>

<style lang="less">

	
	.index_swiper{
		image{
			width: 100%;
		}
		swiper{
		  width: 750upx;
		  height: 340upx;
		}
	}
	/* .index_swiper image{
	  width: 100%;
	}
	.index_swiper swiper{
	  width: 750upx;
	  height: 340upx;
	} */
	.index_cate{
	  display: flex;
		navigator{
		  flex: 1;
		}
		image{
		  width:100%;
		  padding: 20upx;
		}
	}
	/* .index_cate navigator{
	  flex: 1;
	}
	.index_cate image{
	  width:100%;
	  padding: 20upx;
	} */
	.index_floor {
	
	}
	.index_floor .floor_group .floor_title image{
	  width: 100%;
	}
	.index_floor .floor_group .floor_list{
	  /* 清除浮动 */
	  overflow: hidden;
	}
	.index_floor .floor_group .floor_list navigator{
	  float: left;
	  width: 33.33%;
	} 
	/* 后四张的高 */
	.index_floor .floor_group .floor_list navigator:nth-last-child(-n+4){
	  /* height: 33.33vw*386/232/2; */
	  height: 27.72vw;
	  border-left: 10upx solid #fff;
	} 
	.index_floor .floor_group .floor_list navigator:nth-child(2),
	.index_floor .floor_group .floor_list navigator:nth-child(3){
	  border-bottom: 10upx solid #fff;
	} 
	.index_floor .floor_group .floor_list navigator image{
	  width: 100%;
	  height: 100%;
	  
	} 
</style>
