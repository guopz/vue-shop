<template>
	<div class="root">
		<div class="goods">
			<div class="menu-wrapper" ref="menu">
				<ul>
					<li v-for="(item,key) in goods" class="menu-item" :class="{'current': currentIndex === key}" @click="selectMenu(key,$event)">
						<span class="text border-1px">
							<span v-show='item.type>0' class="icon" :class="classMap[item.type]"></span>{{ item.name }}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foods">
				<ul>
					<li v-for="item in goods" class="food-list food-list-js">
						<h1 class="title">{{ item.name }}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item"  @click="selectFood(food,$event)">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{ food.name }}</h2>
									<p class="desc">{{ food.description }}</p>
									<div class="extra">
										<span>月售{{ food.sellCount }}份</span>
										<span>好评率{{ food.rating }}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
									</div>
									<!-- 添加购物车 -->
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		</div>
		<!-- 商品详情 -->
		<food ref="food" :food="selectedFood"></food>
	</div>	
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart';
	import cartcontrol from '../cartcontrol/cartcontrol';
	import food from '../food/food';

	const ERR_OK = 0;
	
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				lineHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.lineHeight.length; i++) {
					let height1 = this.lineHeight[i];
					let height2 = this.lineHeight[i+1];
					if (!height2 || ( this.scrollY >= height1 && this.scrollY < height2 )) {
						return i;
					}
				}
				return 0;
			},
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				console.log(foods);
				return foods;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
			this.$http.get('/api/goods').then((res) => {
				res = res.body;
				if (res.errno === ERR_OK) {
					this.goods = res.data;
					console.log(this.goods);
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
			// 'cart.add' (target) {
			//	 this._drop(target);
			// }
		},
		methods: {
			selectMenu (index, event) {
				if ( !event._constructed ) {
					return;
				};

				let foodList = this.$refs.foods.getElementsByClassName('food-list-js');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			selectFood (food, event) {
				if ( !event._constructed ) {
					return;
				};
				this.selectedFood = food;
				this.$refs.food.show();
			},
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menu, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foods, {
					click: true,
					probeType: 3
				});

				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight () {
				let foodList = this.$refs.foods.getElementsByClassName('food-list-js');
				let height = 0;
				this.lineHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.lineHeight.push(height);
				}
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin";
	.goods
		display:flex
		position:absolute
		top:180px
		bottom:64px
		width:100%
		.menu-wrapper	
			flex:0 0 80px
			width:80px
			background-color:#f3f5f7
			overflow:hidden
			.menu-item
				display:table
				width:56px
				height:54px
				line-height:14px
				padding: 0 12px
				&.current
					position: relative
					z-index:10
					margin-top:-1px
					background:#fff
					.text
						font-weight:700
						border-none()
				.icon
					display:inline-block
					vertical-align: bottom
					width:12px
					height:12px
					margin-right:2px
					background-size:12px 12px
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
				.text
					display:table-cell
					width:56px
					font-size:12px
					vertical-align:middle
					border-1px(rgba(7,17,27,0.2))
		.foods-wrapper
			background-color:#fff
			flex:1
			overflow:hidden
			.title
				padding-left:14px
				height:26px
				line-height:26px
				border-left:2px solid #d9dde1
				font-size:12px
				background:#f3f5f7
				color:rgb(147,153,159)
			.food-item
				display:flex
				margin:18px
				border-1px(rgba(7,17,27,0.2))
				padding-bottom:18px
				&:last-child
					border-none()
					margin-bottom:0
					padding:0
				.icon
					flex:0 0 57px
					margin-right:10px
				.content
					flex:1
					.name
						margin:2px 0 8px 0
						height:14px
						line-height:14px
						font-size:14px
						color:rgb(7,17,27)
					.desc,.extra
						margin-bottom:8px
						line-height:10px
						font-size:10px
						color:rgb(147,153,159)
						&>span:nth-child(2)
							margin-left:5px
					.extra
						margin-bottom:2px
					.price
						font-weight:700
						line-height:24px
						.now
							margin-right:8px
							font-size:14px
							color:rgb(240,20,20)
						.old
							text-decoration:line-through
							font-size:10px
							color:rgb(147,153,159)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:12px
</style>
