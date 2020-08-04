/** 
	封装uni的api为promise形式
 */
export const getSetting=()=>{
	return new Promise((resolve,reject)=>{
		uni.getSetting({
			success:(result)=>{
				resolve(result)
			},
			fail:(err)=>{
				reject(err)
			}
		});
	})
}

export const chooseAddress=()=>{
	return new Promise((resolve,reject)=>{
		uni.chooseAddress({
			success:(result)=>{
				resolve(result)
			},
			fail:(err)=>{
				reject(err)
			}
		});
	})
}

export const openSetting=()=>{
	return new Promise((resolve,reject)=>{
		uni.openSetting({
			success:(result)=>{
				resolve(result)
			},
			fail:(err)=>{
				reject(err)
			}
		});
	})
}

export const showModal= ({content})=>{
	return new Promise((resolve,reject)=>{
		uni.showModal({
		    title: '提示',
		    content: content,
		    success:  (res)=> {
					resolve(res);
		    },
				fail:(err)=>{
					reject(err);
				}
		});
	})
}

export const showToast= ({title})=>{
	return new Promise((resolve,reject)=>{
		uni.showToast({
			title: title,
			icon:"none",
			mask:true,
			success:  (res)=> {
				resolve(res);
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}

export const login= ()=>{
	return new Promise((resolve,reject)=>{
		uni.login({
			timeout:10000,
			success: (result) => {
				resolve(result);
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}

export const payment= (pay)=>{
	return new Promise((resolve,reject)=>{
		uni.requestPayment({
			provider:"wxpay",
			...pay,	
			success: (result) => {
				resolve(result);
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}