// 封装promise，公共请求方法
let ajaxTimes=0;//设置同时请求的数量，
export const myRequest = (options)=>{
	ajaxTimes++;
	const BASE_URL = "https://api-hmugo-web.itheima.net/api/public/v1";
	//显示加载效果
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			...options,
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:"请求失败"
				})
				reject(err)
			},
			complete: () => {
				//防止同时发送多次请求，前面成功的请求会关闭提示框，后面还在请求
				ajaxTimes--;
				if(ajaxTimes<=0){
					uni.hideLoading()
				}
			}
		})
	})
}