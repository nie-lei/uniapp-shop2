## 目录结构

components ： 存放组件
static/img  ： 图标
lib ： 存放第三方库
pages ： 页面
styles ： 存放公共样式
utils ： 自己的帮助库
## pages目录结构
  "pages/index/index", ：首页
  "pages/category/index",  ：分类页面
  "pages/goods_list/index",  ：商品列表页面
  "pages/goods_detail/index",  ：商品详情页面
  "pages/cart/index",  ： 购物车页面
  "pages/collect/index",  ：收藏页面
  "pages/order/index",  ：订单页面
  "pages/search/index",  ：搜索页面
  "pages/user/index",  ：个人中心页面
  "pages/feedback/index",  ：意见反馈页面
  "pages/login/index",  ：登录页面
  "pages/auth/index",  ：授权页面
  "pages/pay/index"  ：结算页面
  
## 后台接口请求文档
https://www.showdoc.cc/128719739414963?page_id=2513235043485226

## vscode插件
  微信小程序开发助手
  Easy Less
    加入以下配置将less转换为.wxss
      "less.compile":{
        "outExt": ".wxss"
      }

### nodejs 下载
https://nodejs.org/en/
选择LTS 版本
直接按照提示安装即可


### 查看是否安装成功
```
node -v 
```

### 安装镜像
```
npm install -g cnpm --registry=https://registry.npm.taobao.org 
```

```

### 下载依赖
```
cnpm install 
```

### 运行项目
```
cnpm run serve
```

### 说明
