<template>
	<view>
		<button type="primary" plain open-type="getUserInfo" @getuserinfo="handleGetUserInfo">获取授权</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			//获取用户信息
			async handleGetUserInfo(e){
				try{
					console.log(e)
					//1.获取用户信息
					const {encryptedData,rawData,iv,signature} = e.detail;
					//2获取小程序登录成功后返回的code
					let {code} = await this.$myUniApi.login();
					let loginParams = {encryptedData,rawData,iv,signature,code}
					//3.发送请求，获取用户token(需要企业微信)
					let {token} = await this.$myRequest({url:"/users/wxlogin",data:JSON.stringify(loginParams),method:"POST"});
					//4.将token存入缓存中
					uni.setStorageSync("token",token)
					//跳回上一个页面
					uni.navigateBack({
						delta:1
					});
				}catch(err){
					console.log("获取token错误",err)
				}
				
			}
		}
	}
</script>

<style lang="less">
	button{
		margin-top: 50rpx;
		width: 70%;
	}
</style>
