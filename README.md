
#### 开发目录
>1. src
  - assets `删除`
  - components `组件`
  - common `添加文件夹`
     - js
     - fonts
     - stylus
    
#### mock 数据
> 根文件添加 `data.json`

#### build
> dev-server.js 入口文件 添加数据访问接口
> res.json() 方法 返回 json数据 ，当传递对象或数组时 与 res.send() 方法一样；


谷歌 json 格式化插件`jsonview`

#### 遇到的问题
>1. Module build failed: Error: Cannot find module 'stylus'
> `解决：`npm install stylus --save-dev
> 2. 不可以使用和 h5 同名的标签
> 3. 添加空格

#### 重新开始
> .vue文件分三个部分
> 1. `<template>`
> 2. `<script>`
> 3. `<style>`

#### .vue 模板
```
<template>	
</template>

<script type="text/ecmascript-6">
</script>
/*eslint eol-last: ["error", "always"]*/
<style lang="stylus" rel="stylesheet/stylus">
</style>

```
#### vue-router
[官网链接](https://router.vuejs.org/zh-cn/essentials/getting-started.html) 

显示默认路由,采用重定向的方式
```
{
   path: '/',
   redirect: '/goods'
}
```

#### CSS
> 页面布局 比如 position display 现在最上面 ，其次是 width height 等 最后是颜色

#### Css Sticky footers
> 底部固定一个按钮，当页面内容在一屏 时固定在最底部，超出一屏跟随内容固定在最底部
> 浮动页面

css3 一些兼容 webpack 会使用 postcss 自动补全 
>backdrop-filter:blur(10px) ios 背景模糊

---

####  Router 构造配置
1. linkActiveClass

#### vue-resource
> 官网地址 - [时光机](https://github.com/pagekit/vue-resource)
>  类型jq封装的ajax，数据访问模块   
>  "vue-resource": "^1.3.1"

路由跳转后保存相应状态
```
<keep-alive></keep-alive>
```

#### es6
对象字面量被增强了，写法更加简洁与灵活，同时在定义对象的时候能够做的事情更多了。具体表现在：
可以在对象字面量里面定义原型
定义方法可以不用function关键字
直接调用父类方法
这样一来，对象字面量与前面提到的类概念更加吻合，在编写面向对象的JavaScript时更加轻松方便了。
```
//通过对象字面量创建对象
var human = {
    breathe() {
        console.log('breathing...');
    }
};
var worker = {
    __proto__: human, //设置此对象的原型为human,相当于继承human
    company: 'freelancer',
    work() {
        console.log('working...');
    }
};
human.breathe();//输出 ‘breathing...’
//调用继承来的breathe方法
worker.breathe();//输出 ‘breathing...’;
```
#### 注意
> webpack 文件修改，需要重启服务 
![Alt text](./1494401676571.png)

---
#### 添加过渡动画  - [时光机](https://cn.vuejs.org/v2/guide/transitions.html)

```
<transition name="fade">
	....
</transition>

css
&.fade-enter,&.fade-leave-active 
transform: translateX(100%)
```

#### 插件
https://www.npmjs.com/package/better-scroll
手机端滑动插件

使用  better-scroll 在pc 端 2次点击问题：插件派发和浏览器派发

派发事件根据 _constructed 属性 进行判断

#### VUE 2.0

##### `ref="menu"`
获取 类似 js 的 bom 元素
vue2.0废除了v-el指令，所有的节点指令修改为ref，然后通过ref来获取元素节点，如
```
<div ref="testHook">test</div> 
...js code this.$ref.testHook
```

##### `v-for`
```
 v-for = "(item, key) in items"
```

##### `$nextTick()`
关于 DOM的操作 尽量在方法内  进行操作

##### `computed`
计算属性

##### `transition`

```
hHTML
<transition name="move"></transition>

stylus
.mask-enter-active,.mask-leave-active
	transition: all .3s ease
.mask-enter,.mask-leave	
	opacity:0
```
##### `components`

1. 引用组件
```
import shopcart from '../shopcart/shopcart';
```
2. 注册组件
```
components: {
	shopcart
}
```
3. 传输数据
```
<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.inPrice"></shopcart>
```
4, 接收数据
```
props: {
	deliveryPrice: {
		type: Number,
		default: 0
	},
	inPrice: {
		type: Number,
		default: 0
	}
}
```
子组件的数据改变会影响父组件的数据，从而映射到另一个组件

事件派发
子组件向父组件派发一个事件，父组件接收到后，进行事件派发，然后在组件进行方法的实现，再返回子组件

2.0 移除了 `events` 和 `$dispathch()`，以及  `template` 下只能有一个根元素，否则会报错

父组件可以调用子组件的方法，子组件不可以调用父组件，关于组件的命名，在当前组件使用的我称之为私有方法，eg：`_show(){}`,可以被父组件调用的方法，eg：`show(){}`

简单起见， `v-el` 和 `v-ref` 合并为一个 `ref` 属性了，可以在组件实例中通过 `$refs` 来调用,eg：
```
添加
<food ref="foods"></food>
接收
this.$refs.foods.show();
```
vuejs2.0中，任何试图在组件内修改通过props传入的父组件数据都被认为是anti-pattern的，报以下错误：
> Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders

`filter`
```
使用
{{ rating.rateTime | formatDate }}

函数
filters: {
	formatDate (time) {
		let date = new Date(time);
		return formatDate(date, 'yyyy-MM-dd hh:mm');
	}
},
```
子组件向父组件传递数据
```
发送
this.$emit('child-info', type);

父组件接收
<ratingselect @child-info="get"></ratingselect>
methods: {
	get (msg) {
		console.log(msg);
	}
}
```
钩子函数
>created () {}
2.0   ready () {}  替换 为 `mounted () {}`


商家组件不能滚动问题
better-scroll 在使用时需要在数据加载完成后进行初始化，否则会失效。

解决办法 通过watch 观察数据的变化进行初始化
```
// 观察数据是否变动
'seller' (val, oldVal) {
	// 当dom更新完成后初始化
	this.$nextTick(function () {
		this._initScroll();
	});
},
// 当实例挂载时
mounted () {
	// 当dom更新完成后初始化
	this._initScroll();
}
```

data 内的数据进行函数处理
```
data () {
	return {
		favorite: (() => {
			return saveFromLocal(this.seller.id, 'favorite', false);
		})()
	};
	}
```

vue data 属性扩展
```
this.seller = Object.assign({}, this.seller, res.data);
```
打包生成
文件根目录会出现一个dist文件夹为生成的静态文件，需要我们启动一个服务区来查看效果，使用express启动一个服务，并添加数据访问api