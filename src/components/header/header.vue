<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟达</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{ seller.supports.length }}个 ></span>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }} ></span> <span class="bulletin-more">></span>
		</div>
		<!-- 背景图 -->
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<!-- 浮动窗口 -->
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{ seller.name }}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,key) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[key].type]"></span>
								<span class="text">{{ seller.supports[key].description }}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{ seller.bulletin }}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">×</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '../star/star.vue';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail () {
				this.detailShow = true;
			},
			hideDetail () {
				this.detailShow = false;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		components: {
			star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin";
	@import "../../common/stylus/base";
	.header
		position:relative
		background-color:rgba(0,0,0,.3)
		color:#fff
		overflow:hidden
		.content-wrapper
			position:relative
			padding:24px 12px 18px 24px
			.avatar
				display:inline-block
				vertical-align:top
				img
					border-radius:2px
			.content
				display:inline-block
				margin-left:16px
				.title
					margin:2px 0 8px 0
					.brand
						display:inline-block
						vertical-align:top
						width:30px
						height:18px
						bg-image('brand')
						background-size:30px 18px
					.name
						margin-left:6px
						font-size:16px
						line-height:18px
						font-weight:bloc
				.description
					margin-bottom:10px
					font-size:12px
					line-height:12px
				.support
					.icon
						display:inline-block
						vertical-align: bottom
						width:12px
						height:12px
						/*margin-right:4px*/
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						font-size:10px
						line-height:12px
			.support-count
				position:absolute
				right:12px
				bottom:18px
				padding:0 8px
				height:22px
				line-height:22px
				border-radius:24px
				background:rgba(0,0,0,.2)
				text-align:center 
				font-size:0
				.count
					font-size:10px
		.bulletin-wrapper
			/*height:28px*/
			line-height:28px
			padding: 0 22px 0 12px
			white-space:nowrap
			overflow:hidden
			text-overflow:ellipsis
			background:rgba(0,0,0,.4)
			position:relative
			.bulletin-title
				display:inline-block
				vertical-align:top
				margin-top:10px
				width:22px
				height:12px
				bg-image('bulletin')
				background-size:22px 12px
				backfround-repear:no-repeat
			.bulletin-text
				margin:0 4px
				font-size:10px
			.bulletin-more
				position:absolute
				right:10px
				botom:10px
		.background
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
			z-index:-1
			filter:blur(10px)
		.detail
			position:fixed
			z-index:100
			top:0
			left:0
			width:100%
			height:100%
			overflow:auto
			transition: all 0.5s;
			background:rgba(7,17,27,0.8)
			backdrop-filter:blur(10px)
			&.fade-enter,&.fade-leave-active 
				 transform: translateX(100%)

			.detail-wrapper
				min-height:100%
				width:100%
				.detail-main
					margin-top:40px
					padding-bottom:64px
					.name
						line-height:16px
						text-align:center
						font-size:16px
						font-weight:blod
					.star-wrapper
						margin-top:18px
						padding:2px 0
						text-align:center
					.title
						display:flex
						width:80%
						margin:28px auto 24px auto
						.line
							flex:1
							position:relative
							top:-6px
							border-bottom:1px solid rgba(255,255,255,0.2)
						.text
							padding:0 12px
							font-size:14px
							font-weight:700
					.supports
						width:80%
						margin:0 auto
						.support-item
							padding:0 12px
							margin-bottom:12px
							font-size:0
							&:last-child
								margin-bottom:0
							.icon
								display:inline-block
								width:16px
								height:16px
								vertical-align:top
								margin-right:6px
								background-repeat:no-repeat
								background-size:16px 16px
								&.decrease
									bg-image('decrease_1')
								&.discount
									bg-image('discount_1')
								&.guarantee
									bg-image('guarantee_1')
								&.invoice
									bg-image('invoice_1')
								&.special
									bg-image('special_1')
							.text
								font-size:10px
								line-height:16px
					.bulletin
						width:80%
						margin:0 auto
						.content
							padding:0 12px
							line-height:2
							font-size:14px
			.detail-close
				position:relative
				width:32px
				height:32px
				line-height:32px
				margin:-64px auto 0 auto;
				clear:both
				text-align:center
				font-size:20px
				border-radius:50%
				border:1px solid #fff
</style>
