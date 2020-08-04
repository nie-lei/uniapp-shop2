<template>
	<view>
		<tabs :tabs="tabs" @tabsItemChange="checkTabs">
			<view class="fb_main">
				<view class="fb_title">问题的种类</view>
				<view class="fb_tips">
					<text>功能建议</text>
					<text>购买遇到问题</text>
					<text>性能问题</text>
					<text>其他</text>
				</view>
				<view class="fb_content">
					<textarea v-model="textVal" value="" placeholder="请描述一下您遇到的问题" />
					<view class="fb_tool">
						<button @click="handleChoosseImg">+</button>
						<view class="up_img_item" v-for="(item,index) in upimg">
							<upimg :src="item" :index="index" @deleteImg="deleteImg"></upimg>
						</view>
						
					</view>
				</view>
				<view class="form_btn_wrap">
					<button type="warn" @click="handleFormSubmit">√ 提交</button>
				</view>
			</view>
		</tabs>
	</view>
</template>

<script>
	import tabs from "../../components/tabs/tabs.vue"
	import upimg from "../../components/upimg/upimg.vue"
	export default{
		components:{
			tabs,
			upimg
		},
		data(){
			return{
				tabs:[
					{
						isActive:true,
						value:"体验问题"
					},
					{
						isActive:false,
						value:"商品/商家投诉"
					}
				],
				upimg:[],
				textVal:"",
				uploadImgs:[]
			}
		},
		methods:{
			checkTabs(index){
				this.tabs.forEach((t,i)=>i===index?t.isActive=true:t.isActive=false)
			},
			handleChoosseImg(){
				uni.chooseImage({
					success: (e) => {
						// this.upimg.push(e.tempFilePaths)
						this.upimg = [...this.upimg,...e.tempFilePaths];
					}
				})
			},
			deleteImg(index){
				this.upimg.splice(index,1)
			},
			handleFormSubmit(){
				const {textVal} = this;
				if(!textVal.trim()){
					this.$myUniApi.showToast({
						title:"输入不合法"
					})
				}
				
				uni.showLoading({
					title:"正在上传中",
					mask:true
				})
				
				// 准备上传图片到专门的图片服务器
				// 上传文件的api 不支持多个文件同时上传遍历数组 挨个上传
				this.upimg.forEach((v,i)=>{
					uni.uploadFile({
						url:"https://images.ac.cn/Home/Index/UploadAction/",
						filePath:v,
						name:"file",
						success: (res) => {
							console.log(res)
							let url = JSON.parse(res.data).url;
							this.uploadImgs.push(url)
							////所有的图片都上传完毕了才触发
							if(i===upimg.length-1){
								uni.hideLoading()
								//1提交到后台
								console.log("提交到后台")
								//2.重置页面数据
								this.upimg = [];
								this.textVal = "";
								this.uploadImgs = [];
								//返回上一个页面
								uni.navigateBack({
									delta:1
								})
							}
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #d8d8d8;
	}
	tabs{
		background-color: #FFFFFF;
	}
	.fb_main{
		padding: 20rpx;
		color: #666;
		.fb_title{}
		.fb_tips{
			display: flex;
			flex-flow: row wrap;
			text{
				background-color: #f0f0f0;
				padding: 10rpx;
				margin: 20rpx 10rpx;
				width: 30%;
				/* margin: 15rpx;
				width: 27vw; */
				text-align: center;
			}
		}
		.fb_content{
			background-color: #FFFFFF;
			margin-top: 20rpx;
			textarea{
				width: 100%;
				/* border: 1rpx solid #777777; */
				
				padding: 20rpx;
			}
			.fb_tool{
				display: flex;
				flex-wrap:wrap;
				padding-bottom: 20rpx;
				/* width: 100%;
				height: 90rpx;
				padding: 20prx; */
				/* position: relative; */
				button{
					margin: 0;
					width: 90rpx;
					height: 90rpx;
					margin-top: 20rpx;
					margin-left: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #CCCCCC;
					font-weight: 700;
					font-size: 40rpx;
					/* position: absolute;
					left: 10rpx; */
				}
				.up_img_item{
					margin-top: 20rpx;
					margin-left: 20rpx;
				}
			}
		}
		.form_btn_wrap{
			margin: 20rpx 0;
			position: relative;
			
			button{
				width:240rpx;
				color: #F1F1F1;
				font-weight: 550;
				position: absolute;
				right: 20rpx;
			}
		}
	}
	
</style>
