<template>
	<view class="content">
		<view class="rpx">rpx</view>
		<view class="vw">vw</view>
		<view class="sass">sass</view>
	</view>
</template>

<script>
	export default {
	
	}
</script>

<style lang="scss" >
	.rpx{
		/* rpx 小程序中的单位 750rpx  =  屏幕的宽度 */
		width: 750rpx;
		height: 100px;
		background-color: aqua;
	}
	.vw{
		/* vw  h5单位 100vw = 屏幕的宽度  100vh = 屏幕的高度  */
		width: 50vw;
		height: 100px;
		background-color: tan;
	}

	.content{
		.sass{
			background-color: red;
			color: $uni-color-primary;
		}
	}
</style>
