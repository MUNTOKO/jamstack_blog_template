<template lang="pug">
  .top
    .card(v-for='(post, index) in posts')
      template(v-if='index < count')
        nuxt-link(:to="{ name: 'posts-slug', params: { slug: post.fields.slug }}")
          .hero-image
            img(:src='post.fields.headerImage.fields.file.url', :alt='post.fields.title', decoding='async')
          .category(v-for='(category) in post.fields.category')
            div {{ category.fields.name}}


          .title
            | {{ post.fields.title }}
          .description
            p
              | {{ post.fields.description }}
          .date
            | {{ getDate(post.fields.publishDate) }}
        hr
    .pager
      pagination(:page='page', :max='pagesTotal', @page-data='applyPage')

    //- client-only
    //-   infinite-loading(spinner='spiral', @infinite='infiniteHandler')
    //-     span(slot='no-more')

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
const Pagination = () => import('~/components/layouts/Pagination.vue')

@Component({
  components: { Pagination }
})
export default class Top extends Vue {
  async applyPage(value: number) {
    await this.$store.commit('product/setPage', value)
    await this.$store.dispatch('product/initPosts', {
      slug: '',
      date: ''
    })
  }

  get posts() {
    return this.$store.state.product.posts
  }

  get page() {
    return this.$store.state.product.page
  }

  get pagesTotal() {
    return this.$store.state.product.pagesTotal
  }

  getCategory(category: string) {
    switch (category) {
      case 'Front':
        return 'フロントエンド'
      case 'Server':
        return 'サーバーサイド'
      default:
        return '未分類'
    }
  }

  getDate(date: Date) {
    return dayjs(date).format('MM月 DD日')
  }

  infiniteHandler($state: any) {
    setTimeout(() => {
      if (this.count < this.posts.length) {
        this.count += 9
        $state.loaded()
      } else {
        $state.complete()
      }
    }, 1000)
  }

  count: number = 9
  currentPage: number = 1
}
</script>

<style scoped>
.top {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: calc(33.3% - 24px);
  margin: 8px;
  position: relative;
}

.card .date {
  font-size: 14px;
  text-align: right;
}

.card .category {
  /* position: absolute;
  top: 0;
  right: 0; */
}

.card .title {
  font-size: 2.4vmin;
  height: 3.6em;
  line-height: 1.2;
  text-align: center;
}

.card .description {
  font-size: 1.8vmin;
}

.card .description p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card hr {
  color: #808080;
}

.hero-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Pagination */
.pager {
  margin: 0 auto;
}

/* Infinite Loading */
infinite-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 680px;
  margin: 100px 0;
}

@media (max-width: 500px) {
  .card {
    width: calc(100% - 10px);
    margin: 5px;
  }

  .card .title {
    font-size: 2.4vmax;
  }

  .card .description {
    font-size: 1.8vmax;
  }
}
</style>
