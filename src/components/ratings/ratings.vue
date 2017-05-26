<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<p class="title">综合评分</p>
					<p class="rank">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star class="star" :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star class="star" :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wraprer">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<splite></splite>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"  @child-info="get" @content-info="getContent"></ratingselect>
			<div class="ratings-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text">{{rating.text}}</div>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span :class="{'icon-up':rating.rateType === 0}">1</span>
								<span class="text" v-for="item in rating.recommend">{{item}}</span>
							</div>
						</div>
						<div class="time">{{rating.rateTime | formatDate }}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>  
</template>
/*eslint eol-last: ["error", "always"]*/
<script type="text/ecmascript-6">
	import star from '../star/star.vue';
	import splite from '../splite/splite';
	import ratingselect from '../ratingselect/ratingselect';
	import BScroll from 'better-scroll';
	import {formatDate} from '../../common/js/date';
	
	const ALL = 2;
	const ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		created () {
			this.$http.get('/api/ratings').then((res) => {
				res = res.body;
				if (res.errno === ERR_OK) {
					this.ratings = res.data;
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.ratings, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				};
			});
		},
		methods: {
			get (msg) {
				this.selectType = msg;
			},
			getContent (msg) {
				this.onlyContent = msg;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
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
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date);
			}
		},
		components: {
			star,
			splite,
			ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratings
		position:absolute
		top:180px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex:0 0 130px
				padding:6px
				width:130px
				border-right:1px solid rgba(7,17,27,0.1)
				text-align:center
				@media only screen and (max-width: 320px)
					flex:0 0 120px
					width:120px
				.score
					margin-bottom:6px
					line-height:28px
					font-size:24px
					color:rgb(255,153,0)
				.title
					margin-bottom:6px
					line-height:12px
					font-size:12px
					color:rgb(7,17,27)
				.rank
					line-height:10px
					font-size:10px
					color:rgb(147,153,159)
			.overview-right
				flex:1
				padding:6px 0 6px 15px
				@media only screen and (max-width: 320px)
					padding-left: 4px
				.score-wrapper
					margin-bottom:8px
					font-size:0
					.title
						display:inline-block
						line-height:18px
						vertical-align:top
						font-size:12px
						color:rgb(7,17,27)
					.star
						display:inline-block
						margin:0 12px
						line-height:18px
						vertical-align:top
						@media only screen and (max-width: 320px)
							margin:0 5px
					.score
						display:inline-block
						line-height:18px
						vertical-align:top
						font-size:12px
						color:rgb(255,153,0)
				.delivery-wraprer
					.title
						display:inline-block
						line-height:18px
						vertical-align:top
						font-size:10px
						color:rgb(7,17,27)
					.delivery
						margin-left:8px
						line-height:18px
						font-size:12px
						color:rgb(147,153,159)
		.ratings-wrapper
			.rating-item
				position: relative
				display: flex
				margin: 18px
				padding-bottom: 18px
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.avatar
					flex:0 0 28px;
					margin-right: 12px
					img
						border-radius: 50%
				.content
					flex:0 0 1;
					font-size: 0
					.name
						margin-bottom: 4px
						line-height: 12px
						font-size:10px;
						color:rgb(7,17,27)
					.star
						display: inline-block
						margin-right: 6px
					.delivery
						line-height: 12px
						font-size: 10px
						font-weight: 200
						color:rgb(147,153,159)
					.text
						margin-top: 6px
						line-height: 18px
						font-size: 12px
						color:rgb(7,17,27)
					.recommend
						padding: 8px 0
						.text
							display: inline-block
							line-height: 16px
							padding: 0 6px
							font-size: 9px
							color: rgb(147,153,159)
							border: 1px solid rgba(7,17,27,0.1)
							margin-left: 8px
						.icon-up
							display: inline-block
							vertical-align: top
							margin-top: 10px;
							padding:0px 5px 10px
							font-size: 0
							background:url('ratings_b_2.png') left center no-repeat;
							background-size:12px
				.time
					position: absolute
					top: 0
					right: 0
					font-size: 10px
					line-height: 12px
					color: rgb(147,153,159)
					font-weight: 200

						

</style>	
