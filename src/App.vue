<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
</template>

<script>
// import Vue from 'vue';
import {urlParse} from './common/js/utils';
import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
    data () {
      return {
        seller: {
          id: (() => {
             let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      // 添加 id 进行缓存处理
      // this.seller.id = (() => {
      //    let queryParam = urlParse();
      //   return queryParam.id;
      // })();
      // Vue.set(this.seller, 'id', this.seller.id);
      this.$http.get('/api/seller?id='+this.seller.id).then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          // this.seller = res.data;
          this.seller = Object.assign({}, this.seller, res.data);
          console.log('seller-id '+this.seller.id);
        }
      });
    },
    components: {
      'v-header': header
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-bottom:1px solid #DDD
    border-top:1px solid #DDD
    .tab-item
      flex:1
      text-align:center
      & > a
       display:block
       font-size:14px
       color:rgb(77,85,93)
       &.active
        color:rgb(240,20,20)
</style>
