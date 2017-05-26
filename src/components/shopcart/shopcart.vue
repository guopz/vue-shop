<template>	
	<div>
		<div class="shopcart">
			<div class="content" @click="toggList()" >
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'heighligh': totalCount>0}">
							<span class="icon-shopping_cart"></span>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'heighligh': totalPrice>0}">{{totalPrice}}元</div>
					<div class="desc">配送费￥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="payClass" @click.stop="pay">
						{{payDesc}}
					</div>
				</div>
			</div>
			<!-- 添加购物车动画 -->
			<!-- <div class="ball-container">
				<transition name="drop">
					<div v-for="ball in balls" v-show="ball.show" class="ball">
						<div class="inner"></div>
					</div>
				</transition>
			</div> -->
			<!-- 已添加购物列表 -->
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span >￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food='food'></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<!-- 遮罩动画 -->
		<transition name="mask">
			<div class="list-mask" @click="hideList" v-show="listShow"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import cartcontrol from '../cartcontrol/cartcontrol';
	import BScroll from 'better-scroll';

	export default {
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [{
						price: 0,
						count: 0
					}];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				fold: true
			};
		},
		computed: {
			totalPrice () {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc () {
				if (this.totalPrice === 0) {
					return `￥ ${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥ ${diff}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass () {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			},
			listShow () {
				if (!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			// drop (el) {
			//	console.log(el);
			// }
			toggList () {
				if (!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			hideList () {
				this.fold = true;
			},
			pay () {
				if (this.totalPrice < this.minPrice) {
					return;
				}
				window.alert(`支付${this.totalPrice}元`);
			}
		},
		components: {
			cartcontrol
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	/*@import "../../common/stylus/icon";*/
	.shopcart
		position:fixed
		bottom:0
		left:0
		z-index:50
		width:100%
		height:48px
		background:#ccc
		.content
			display:flex
			background:#141d27
			font-size:0
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					position:relative
					top: -10px
					margin:0 12px
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					vertical-align:top
					border-radius:50%
					background:#141d27
					.logo
						height:100%
						width:100%
						border-radius:50%
						background:#2b343c url(shopcart.png) center center no-repeat;
						background-size:50%
						&.heighligh
							background:rgb(0,160,220) url(shopcart_1.png) center center no-repeat;
							background-size:50%
					.num
						position:absolute
						top:0
						right:0
						width:24px
						height:16px
						line-height:16px
						text-align:center
						border-radius:16px
						font-size:12px
						font-weight:700
						color:#fff
						background:rgb(240,20,20)
						box-shadow:0 4px 8px rgba(0,0,0,0.4)
				.price
					display:inline-block
					vertical-align:top
					margin-top:12px
					line-height:24px
					padding-right:12px
					box-sizing:border-box
					border-right:1px solid rgba(255,255,255,0.1)
					font-size:16px
					font-weight:700
					color:rgba(255,255,255,0.4)
					&.heighligh
						color:#fff
				.desc
					display:inline-block
					vertical-align:top
					margin:12px 12px 0 12px
					line-height:24px
					color:rgba(255,255,255,0.4)
					font-size:10px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height:48px
					line-height:48px
					text-align:center
					font-size:12px
					color:rgba(255,255,255,0.4)
					font-weight:700
					background:#2b333b
					&.not-enough
						background:#2b333b
					&.enough
						background:#00b43c
						color:#fff
		.ball-container
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:200
				&.drop-transition
					transition:all 0.4s
					.inner
						width:16px
						height:16px
						border-radius:50%
						background:rgb(0,160,220)
						transition:all 0.4s
		.shopcart-list
			position:absolute
			left:0
			top:0
			z-index:-1
			width:100%
			transform: translate3d(0,-100%,0)
			.list-header
				height:40px
				line-height:40px
				padding: 0 18px
				background:#f3f5f7
				border-bottom:2px solid rgba(7,17,27,0.1)
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				overflow:auto
				max-height:217px
				background:#fff
				.food
					position:relative
					padding:12px 0
					font-size:10px
					color:rgb(7,17,27)
					border-bottom:1px solid rgba(7,17,27,0.1)
					.price
						position:absolute
						right:90px
						bottom:10px
						font-size:10px
						font-weight:700
						color:rgb(240,20,20)
					.cartcontrol-wrapper
						position:absolute
						right:0px
						bottom:2px
		.fold-enter-active,.fold-leave-active
			transition: all .3s ease
		.fold-enter,.fold-leave-active	
			transform: translate3d(0,0,0) 
	.list-mask
		position:fixed
		top:0
		left:0
		width:100%
		height:100%
		z-index:40
		opacity:1
		background:rgba(7,17,27,0.6)
		backdrop-filter:blur(10px)
	.mask-enter-active,.mask-leave-active
		transition: all .3s ease
	.mask-enter,.mask-leave-active	
		opacity:0
</style>
