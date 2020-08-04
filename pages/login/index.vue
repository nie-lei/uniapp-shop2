<template>
	<button type="primary" plain open-type="getUserInfo" @getuserinfo="handleGetUserInfo">登录</button>
</template>

<script>
	export default{ 
		data(){
			return{
				
			}
		},
		methods:{
			handleGetUserInfo(e){
				console.log(e)
				const {userInfo} =  e.detail;
				uni.setStorageSync("userInfo", userInfo);
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	button{
		margin-top: 40rpx;
		width: 70%;
	}
</style>
