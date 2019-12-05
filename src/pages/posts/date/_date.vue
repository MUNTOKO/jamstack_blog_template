<template lang="pug">
  main-template
    .main
      sidebar
      posts-list
        div

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PostsList from '~/components/post/PostsList.vue'
import Sidebar from '~/components/layouts/Sidebar.vue'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')

@Component({
  async asyncData({ store, params }) {
    await store.dispatch('product/initPosts', {
      slug: '',
      date: params.date
    })
    // await store.dispatch('product/initPostsDate')
  },
  components: {
    MainTemplate,
    PostsList,
    Sidebar
  }
})
export default class Index extends Vue {}
</script>

<style>
.main {
  margin: 24px 10% 8px;
  padding-top: 36px;
}
</style>
