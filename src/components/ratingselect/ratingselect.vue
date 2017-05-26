<template>	
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{ desc.all }} <span class="count">{{ ratings.length }}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{ desc.positive }} <span class="count">{{ positives.length }}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{ desc.negative }} <span class="count">{{ negatives.length }}</span></span>
		</div>
		<div class="switch" @click=toggleContent($event) :class="{'active':isActiveContent}">
			<span class="icon"></span>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>
/*eslint eol-last: ["error", "always"]*/
<script type="text/ecmascript-6">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			ratings: {
				type: Array,
				default () {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '不满意',
						negative: '满意'
					};
				}
			}
		},
		data () {
			return {
				isActive: this.selectType,
				isActiveContent: this.onlyContent
			};
		},
		mounted () {
	        // this.isActive = this.selectType;
	    },
	    computed: {
	    	positives () {
	    		return this.ratings.filter( (rating) => {
	    			return rating.rateType === POSITIVE;
	    		});
	    	},
	    	negatives () {
	    		return this.ratings.filter( (rating) => {
	    			return rating.rateType === NEGATIVE;
	    		});
	    	}
	    },
		methods: {
			select (type, event) {
				if (!event._constructed) {
					return;
				}
				this.isActive = type;
				this.$emit('child-info', type);
			},
			toggleContent (event) {
				if (!event._constructed) {
					return;
				}
				console.log('toggleContent', this.isActiveContent);
				this.isActiveContent = !this.isActiveContent;
				this.$emit('content-info', this.isActiveContent);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-bottom:1px solid rgba(7,17,27,0.1)
			font-size:0
			.block
				display:inline-block;
				line-height:16px
				padding:8px 12px
				margin-right:8px
				border-radius:1px
				color:rgb(77,85,92)
				font-size:12px
				&.active
					color:#fff
				.count
					font-size:8px
					line-height:16px
					margin-left:2px
				&.positive
					background:rgba(0,160,220,0.2)
					&.active
						background:rgb(0,160,220)
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
		.switch
			padding:12px 18px
			line-height:24px;
			border-bottom:1px solid rgba(7,17,27,0.1)
			color:rgb(147,153,159)
			.icon
				background:url(ratings_a_1.png) left top no-repeat;
				background-size:18px
				margin-top:5px
				float:left
				width:30px
				height:20px
				font-size:0
			&.active
				.icon
					background:url(ratings_a_2.png) left top no-repeat;
					background-size:18px
					
			.text
				font-size:12px

</style>
