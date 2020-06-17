<template lang="pug">
  .wrap
    header-block
    nuxt.main_container
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
// import TopList from '~/components/post/TopList.vue'
const HeaderBlock = () => import('~/components/layouts/Header.vue');

@Component({
  async asyncData({ store }) {
    await store.dispatch('product/initPosts', {
      slug: '',
      date: '',
    });
    // await store.dispatch('product/initPostsDate')
    // await store.dispatch('product/initPostCategory')
  },
  components: {
    HeaderBlock,
  },
})
export default class Index extends Vue {}
</script>
<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.main_container {
  padding-top: 4rem;
}
@media screen and (max-width: 1024px) {
  .main_container {
    padding-top: 3rem;
  }
}
</style>
