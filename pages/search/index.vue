<template>
	<view>
		<view class="search_row">
			<input v-model="inputValue" @input="handleInput" placeholder="请输入您要搜索的商品"/>
			<button @click="hendleCancel" v-show="isShow">取消</button>
		</view>
		<view class="search_content">
			<navigator class="search_item" 
				v-for="item of goods" 
				:key="goods_id"
				:url="'/pages/goods_detail/index?goods_id='+item.goods_id"
			>
				{{item.goods_name}}
			</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				goods:[],
				timeId:-1,
				isShow:false,
				inputValue:""
			}
		},
		methods:{
			handleInput(e){
				console.log(e.target.value)
				const {value} = e.detail;
				if(!value.trim()){
					this.hendleCancel();
					return;
				}
				this.isShow=true
				//防止输入框输入时一直搜索，使用防抖技术（防止抖动）用定时器实现
				/* 防抖(防止抖动) 定时器节流
						0防抖一般输入框中防止重复输入重复发送请求
						1节流一般是用在页面下拉和上拉 
				*/
				clearTimeout(this.timeId)
				//输入稳定1秒后发送请求
				this.timeId = setTimeout(()=>{
					this.qsearch(value);
				},1000)
			},
			//发送请求获取搜索数据
			async qsearch(query){
				let res = await this.$myRequest({url:"/goods/qsearch",data:{query}})
				console.log(res)
				this.goods = res.data.message;
			},
			hendleCancel(){
				this.isShow = false;
				this.goods = [];
				this.inputValue = "";
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #dedede;
		padding: 20rpx;
	}
	.search_row{
		height: 60rpx;
		display: flex;
		input{
			flex: 1;
			background-color: #FFFFFF;
			height: 100%;
			padding-left: 30rpx;
		}
		button{
			width: 110rpx;
			height: 100%;
			padding: 0;
			margin: 0 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
		}
	}
	.search_content{
		margin-top: 30rpx;
		.search_item{
			background-color: #FFFFFF;
			font-size: 30rpx;
			padding: 15rpx 10rpx;
			border-bottom: 1rpx solid #ccc;
			margin: 5rpx 0;
			/* 文字显示一行，多余的用...修饰 */
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
