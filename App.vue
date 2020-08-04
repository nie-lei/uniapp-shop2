<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
@import "./static/css/iconfont.css";
	/*
	这里可以定义全局样式，page==body，view==div,text==span
	*/
	page,view text,swiper,swiper-item,image,navigator{
	  padding: 0;
	  margin: 0;
	  box-sizing: border-box;
		height: 100%;
		--themeColor:#eb4450;/* 主题颜色背景 */
		font-size: 28rpx; /* 统一字体大小 */
	}
	// .container {
	//   height: 100%;
	//   display: flex;
	//   flex-direction: column;
	//   align-items: center;
	//   justify-content: space-between;
	//   padding: 200rpx 0;
	//   box-sizing: border-box;
	// } 
	image{
		width: 100%;
	}
	// 隐藏 scroll-view 组件的滚动条
	::-webkit-scrollbar {  
			display: none;  
			width: 0 !important;  
			height: 0 !important;  
			-webkit-appearance: none;  
			background: transparent;  
	}
</style>
