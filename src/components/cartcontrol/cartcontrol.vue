<template>	
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)"></div>
		</transition >
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop="addCart($event)"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';

	export default {
		props: {
			food: {
				type: Object
			}
		},
		created () {
			// console.log(this.food);
		},
		methods: {
			addCart (event) {
				if ( !event._constructed ) {
					return;
				};
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				console.log('click');
				this.$emit('cart.add', event.target);
			},
			decreaseCart (event) {
				if ( !event._constructed ) {
					return;
				};
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size:0
		.cart-decrease,.cart-add
			display:inline-block
			padding:15px
			vertical-align:top
		.cart-decrease
			background:url("cart-add.png") center center no-repeat
			background-size:15px
			
		.cart-count
			display:inline-block
			font-size:14px
			line-height:30px
			padding: 0 8px
			color:rgb(147,153,159)
		.cart-add
			background:url(cart-dec.png) center center no-repeat
			background-size:15px
		
		.move-enter-active
			transition: all .3s linear;
		.move-leave-active
			transition: all .3s linear;
		.move-enter,.move-leave-active
			opacity:0
			transform: translate3D(24px,0,0)
			/*transform: rotate(180deg)
		*/
		
		/*.move-enter
			opacity:0
			transform: translate3D(24px,0,0)*/
		/*.fade-leave-to
			opacity:0
			transform: translate3D(24px,0,0)*/

</style>
