<template>
	<view class="tabs">
		<view class="tabs_title ">
			<view class="title_item" 
				v-for="(item,index) of tabs" :key="value"
				:class="item.isActive?'active':''" 
				@click="handleItemTap(index)">
				{{item.value}}
			</view>
		</view>
		<view class="tabs_content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tabs:{
				type:Array,
				value:[]
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			handleItemTap(index){
				//触发父组件中的事件
				this.$emit('tabsItemChange',index)
			}
		}
	}
</script>

<style lang="less">
	.tabs{
		.tabs_title{
			background-color: #f8f8f8;
			display: flex;
			padding: 15rpx;
			justify-content: center;
			align-items: center;
			.title_item{
				flex: 1;
				text-align: center;
			}
			.active{
				color: var(--themeColor);
				border-bottom: 5rpx solid currentColor;
			}
		}
	}
</style>
