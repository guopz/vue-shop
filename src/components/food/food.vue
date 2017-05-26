<template>
	<transition name="maskFood">
		<div v-show="showFlag" class="food" ref="food">
			<!-- <button >你好</button> -->
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
				</div>
				<div class="back" @click="hide()">›</div>
				<div class="content">
					<h1 class="title">{{ food.name }}</h1>
					<div class="detail">
						<span class="sell-count">月售 {{ food.sellCount }}</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">						
						<div class="buy" v-show="!food.count || food.count===0" @click="addFirst($event)">
							加入购物车
						</div>
					</transition>
				</div>
				<splite v-show="food.info"></splite>
				<div class="info" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="text">{{ food.info }}</p>
				</div>
				<splite></splite>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"  @child-info="get" @content-info="getContent"></ratingselect>
					
					<div class="rating-wrapper">
						<ul v-show='food.ratings && food.ratings.length'>
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<p class="user">
									<span class="name">{{ rating.username }}</span>
									<img src="avatar" width="12" height="12" :src="rating.avatar">
								</p>
								<div class="time">{{ rating.rateTime | formatDate }}</div>
								<p class="text">
									<span :class="{'icon-up':rating.rateType===0,'icon-down':rating.rateType===1}"></span>{{ rating.text }}
								</p>
							</li>
						</ul>
						<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">
							暂无评价
						</div>
					</div>
				</div>
			</div>
		</div>	
	</transition>
</template>
/*eslint eol-last: ["error", "always"]*/
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import {formatDate} from '../../common/js/date';
	import cartcontrol from '../cartcontrol/cartcontrol';
	import ratingselect from '../ratingselect/ratingselect';
	import splite from '../splite/splite';
	
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show () {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide () {
				this.showFlag = false;
			},
			addFirst (event) {
				if (!event._constructed) {
					return;
				}
				Vue.set(this.food, 'count', 1);
			},
			needShow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			get (msg) {
				console.log(msg);
				this.selectType = msg;
			},
			getContent (msg) {
				console.log('food.vue - ' + msg);
				this.onlyContent = msg;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}

		},
		computed: {
			time (val) {
				return new Date(val).toUTCString();
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date);
			}
		},
		components: {
			cartcontrol,
			splite,
			ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.maskFood-enter-active,.maskFood-leave-active
		transform: translateX(100%)
	.food
		position:fixed
		bottom:48px
		left:0
		top:0
		z-index:30
		width:100%
		background:#fff
		transition: all .3s ease
		.food-content
			.image-header
				position:relative
				width:100%
				height:0
				padding-top:100%
				img
					position:absolute
					top:0
					left:0
					width:100%
					height:100%
			.back
				position:absolute
				top:10px 
				left:0
				padding:10px 20px
				font-size:30px
				color:#fff
			.content
				position:relative
				padding:18px
				border-top:1px solid #eee
				.title
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
					line-height:28px
				.detail
					font-size:0
					padding-top:8px
					.sell-count,.rating
						font-size:10px
						color:rgb(147,156,159)
						lin-height:10px
					.rating
						margin-left:8px
				.price
					padding-top:18px
					.now,.old
						line-height:24px
						font-size:14px
						color:rgb(240,20,20)
						font-weight:700
					.old
						font-size:10px
						color:rgb(147,153,159)
						text-decoration: line-through;
				.buy
					position:absolute
					right:18px
					bottom:18px
					width:74px
					height:24px
					line-height:24px
					text-align:center
					font-size:10px
					color:#fff
					background-color:rgb(0,160,220)
					border-radius:12px
					
				.cartcontrol-wrapper
					position:absolute
					right:18px
					bottom:18px
				.fade-enter-active,.fade-leave-active
					transition: all .3s ease
				.fade-enter,.fade-leave	
					opacity:0
			.info
				padding:18px
				.title
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
					line-height:28px
				.text
					font-size:12px
					font-weight:200
					color:rgb(77,85,93)
					line-height:24px
			.rating
				.title
					padding:18px
					padding-bottom:0
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
					line-height:28px
				.rating-wrapper
					padding:0 18px
					.rating-item
						position:relative
						padding:16px 0
						border-bottom:1px solid rgba(7,17,27,0.1)
						.user
							position:absolute
							top:16px
							right:0
							.name
								line-height:12px
								font-size:10px
								color:rgb(147,153,159)
							img
								border-radius:50%
						.time
							line-height:12px
							font-size:10px
							color:rgb(147,153,159)
							margin-bottom:6px
						.text
							line-height:16px
							font-size:12px
							color:rgb(7,17,27)
							.icon-up
								padding:10px
								background:url('ratings_b_2.png') left center no-repeat;
								background-size:12px
							.icon-down
								padding:10px
								background:url('ratings_b_1.png') left center no-repeat;
								background-size:12px
					.no-ratings
						padding:16px 0
						font-size:12px
						color:rgb(147,153,159)

</style>
