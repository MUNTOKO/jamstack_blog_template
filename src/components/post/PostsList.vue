<template lang="pug">
  .top
    .postList
      .card(v-for='(post, index) in posts')
        template(v-if='index < count')
          nuxt-link(:to="{ name: 'posts-slug', params: { slug: post.fields.slug }}")
            .image_block
              div
                img(:src='post.fields.headerImage.fields.file.url', :alt='post.fields.title', decoding='async')
            .title
              v-clamp(autoresize='', :max-lines='2') {{ post.fields.title }}
            .date
              | {{ getDate(post.fields.publishDate) }}
            .category(v-for='(category) in post.fields.category')
              div {{ category.fields.name}}
    .pager
      pagination(:page='page', :max='pagesTotal', @page-data='applyPage')

    //- client-only
    //-   infinite-loading(spinner='spiral', @infinite='infiniteHandler')
    //-     span(slot='no-more')

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import VClamp from 'vue-clamp'
const Pagination = () => import('~/components/layouts/Pagination.vue')

@Component({
  components: { Pagination, VClamp }
})
export default class DateList extends Vue {
  async applyPage(value: number) {
    await this.$store.commit('product/setPage', value)
    await this.$store.dispatch('product/initPosts', {
      slug: '',
      date:
        this.$nuxt.$route.params.date === void 0
          ? ''
          : this.$nuxt.$route.params.date,
      category:
        this.$nuxt.$route.params.category === void 0
          ? ''
          : this.$nuxt.$route.params.category
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
    return dayjs(date).format('YYYY.MM.DD')
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

<style scoped lang="scss">
.postList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.card {
  width: calc((100% - (2% * 2)) / 3);
  margin-right: 2%;
  position: relative;
  box-shadow: none;
  text-align: left;
  cursor: pointer;
  background-color: transparent;
  .date {
    font-size: 14px;
  }
  .title {
    font-size: 1.5rem;
    height: auto;
    line-height: 1.2;
    padding: 0;
    margin-top: 1.3rem;
  }
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
.image_block {
  position: relative;
  width: 100%;
  &:before {
    content: '';
    display: block;
    padding-top: 75%; /* 高さを幅の75%に固定 */
  }
  > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
.image_block img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Pagination */
.pager {
  margin: 5.4rem auto 0;
  @include flex(center, center);
}

/* Infinite Loading */
infinite-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 680px;
  margin: 100px 0;
}
.date,
.category {
  font-size: 0.75rem;
  font-family: $family-sans;
}
@media screen and (min-width: 1024px) {
  .card {
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(n + 4) {
      margin-top: 5rem;
    }
  }
}
@media screen and (max-width: 1023px) {
  .card {
    width: calc((100% - (2% * 1)) / 2);
    &:nth-child(2n) {
      margin-right: 0;
    }
    &:nth-child(n + 3) {
      margin-top: 3rem;
    }
    .title {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
    a {
      display: block;
      line-height: 0.8rem;
    }
    .date,
    .category {
      font-size: 10px;
      transform: scale(0.6);
      transform-origin: left top;
      line-height: normal;
    }
    .date {
      margin-top: -4%;
    }
    .category {
      margin-top: -4%;
    }
  }
  .pager {
    margin-top: 3rem;
  }
}
</style>
