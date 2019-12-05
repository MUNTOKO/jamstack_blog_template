<template lang="pug">
  .sidebar
    .category_list
      div.list_title CATEGORY
      ul.archive_list.archive_date(v-if="postsCategory")
        li( v-for='(cat,c) in postsCategory')
          a(:href="'/posts/category/'+cat.slug") {{cat.name}}
    .archives
      div.list_title ARCHIVES
      ul.archive_list.archive_date(v-if="postsDate")
        li(v-for='(date,k) in postsDate')
          a(:href="'/posts/date/'+date.date") {{ getDate(date.date)}}({{date.count}})
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'

@Component({})
export default class Sidebar extends Vue {
  get postsDate() {
    return this.$store.state.product.postsDate
  }
  get postsCategory() {
    return this.$store.state.product.categories
  }
  getDate(date: Date) {
    return dayjs(date).format('YYYY.MM')
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  width: 100%;
  padding: 12px;
  top: 0;
  left: 0;
  line-height: 1.2;
  font-size: 3vmin;
  z-index: 24;
  text-align: center;
}
.archives {
  margin-top: 3.5rem;
  .archive_list {
    margin-top: 1.5rem;
  }
}
</style>
