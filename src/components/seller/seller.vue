<template>
	<div class="seller" ref="seller">
		<div class="seller-wrapper">
			<div class="overview">
				<h1 class="title">{{ seller.name }}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{ seller.minPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{ seller.deliveryPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h2>配送平均时间</h2>
						<div class="content">
							<span class="stress">{{ seller.deliveryTime }}</span>分钟
						</div>
					</li>
				</div>
				<!-- 收藏 -->
				<div class="favorite" @click="favoriteClick($event)">
					<p class="icon" :class="{'active':favorite}"></p>
					<p class="text">{{ favoriteText }}</p>
				</div>
			</div>
			<splite></splite>
			<div class="newsactive">
				<h1 class="title">公告与活动</h1>
				<p class="text">{{ seller.bulletin }}</p>
				<ul class="supports">
					<li v-for="support in seller.supports"><span class="icon" :class="classMap[support.type]"></span>{{support.description}}</li>
				</ul>
			</div>
			<splite></splite>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrappr">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics"><img :src="pic" width="120" height="90"></li>
					</ul>
				</div>
			</div>
			<splite></splite>
			<div class="newsactive">
				<h1 class="title" style="margin-bottom: 12px">商家信息</h1>
				<ul class="supports">
					<li v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>	
</template>

/*eslint eol-last: ["error", "always"]*/
<script type="text/ecmascript-6">
	import star from '../star/star';
	import splite from '../splite/splite';
	import BScroll from 'better-scroll';
	import {saveToLocal, saveFromLocal} from '../../common/js/store';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				favorite: (() => {
					return saveFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		created () {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		watch: {
			// 观察数据是否变动
			'seller' (val, oldVal) {
				// 当dom更新完成后初始化
				this.$nextTick(function () {
					this._initScroll();
					this._initPic();
				});
			}
		},
		mounted () {
			// 当dom更新完成后初始化
			this._initScroll();
			// 商家实景图片横向滚动
			this._initPic();
		},
		computed: {
			favoriteText () {
				return this.favorite?'已收藏':'未收藏';
			}
		},
		methods: {
			_initScroll () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_initPic () {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth+margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						this.picScroll = new BScroll(this.$refs.picWrappr, {
							scrollX: true,
							// 横向滚动时忽略纵向滚动
							eventPassthrough: 'vertical'
						});
					});
				}
			},
			favoriteClick (event) {
				if ( !event._constructed ) {
					return;
				};
				this.favorite = !this.favorite;
				// 开始缓存
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			}
		},
		components: {
			star,
			splite
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin";

	.seller
		position: absolute
		top: 180px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.overview
			padding:18px
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				color: rgb(7,17,27)
			.desc
				padding-bottom: 18px
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.star
					display: inline-block
					vertical-align: top;
				.text
					margin-left: 8px
					font-size: 10px
					line-height: 18px
					color: rgb(77,85,93)
			.remark
				margin-top: 18px
				display: flex
				.block
					flex: 1
					text-align: center
					border-right: 1px solid rgba(7,17,27,0.1)
					&:last-child
						border:none
					h2
						line-height: 20px
						font-size: 10px
						color: rgb(147,153,159)
						margin-bottom: 4px
					.content
						padding: 5px
						.stress
							line-height: 24px
							font-size: 24px
							color: rgb(7,17,27)
			.favorite
				position:absolute
				right:18px
				top:18px
				text-align:center
				font-size:0
				.icon
					display:inline-block
					width:18px
					height:18px
					background:url(heart_a_2.png) center center no-repeat
					background-size:18px
					margin-bottom:4px
					&.active
						background:url(heart_a_1.png) center center no-repeat
						background-size:18px
				.text
					line-height:10px
					font-size:10px
					color:rgb(77,85,93)
		.newsactive
			padding: 18px
			.title
				margin-bottom: 8px
			    line-height: 14px
			    font-size: 14px
			    color: #07111b
			.text
				padding: 0 12px 16px
				line-height: 2
				font-size: 12px
				color: rgb(240,20,20)
				font-weight: 200
				
			.supports
				border-top: 1px solid rgba(7,17,27,0.1)
				li
					padding: 16px 12px
					font-size: 12px
					line-height: 16px
					color: rgb(7,17,27)
					font-weight: 200
					border-bottom: 1px solid rgba(7,17,27,0.1)
					.icon
						display:inline-block
						vertical-align: top
						width:16px
						height:16px
						margin-right:6px
						background-size:16px 16px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
		.pics
			padding: 18px
			.title
				margin-bottom: 12px
			    line-height: 14px
			    font-size: 14px
			    color: #07111b
			.pic-wrapper
				width:100%
				overflow: hidden
				white-space: nowrap
				.pic-list
					font-size:0
					.pic-item
						display:inline-block
						margin-right:6px
						width:120px
						height:90px
						&:last-child
							margin:0
</style>
