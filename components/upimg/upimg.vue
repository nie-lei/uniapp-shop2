<template>
	<view class="up_img_wrap">
		<image  :src="src"  mode="widthFix" ></image>
		<icon @click="deleteImg(index)"  type="clear" size="20" color="red"></icon>
	</view>
</template>

<script>
	export default {
		props:{
			src:{
				type:String,
				value : ""
			},
			index:{
				type:Number,
				value:-1
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			deleteImg(index){
				this.$emit("deleteImg",index);
			}
		}
	}
</script>

<style lang="less">
	.up_img_wrap{
		width: 90rpx;
		height: 90rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
			
			border-radius: 15rpx;
		}
		icon{
			position:absolute;
			right: -15rpx;
			top: -15rpx;
		}
	}
</style>
