<template lang="pug">
  main-template(v-if='currentPost')
    .main
      .main_content
        sidebar.is-hidden-touch
        .article-wrap
          .post-meta
            .date
              | {{ getDate(currentPost.fields.publishDate) }}
            .title
              | {{ currentPost.fields.title }}
          .cover
            img(:src='currentPost.fields.headerImage.fields.file.url', :alt='currentPost.fields.title', decoding='async')
          .article
            detail(:post='currentPost')
              social-menu(:slug-text='currentPost.fields.slug', :title='currentPost.fields.title', :is-vertical='!isVertical')
                div
                  new(:blog-title='currentPost.fields.title')
                //- .late-article
              //-   latest-list
    .related-posts-list-container
      .title
        | RELATED POST
      related-posts-list
      .related-posts-btn
        nuxt-link(:to="{name:'posts-category-category',params: { category:$store.state.product.currentPost.fields.category[0].fields.slug }}")
          | {{$store.state.product.currentPost.fields.category[0].fields.name}}記事一覧

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import Sidebar from '~/components/layouts/Sidebar.vue'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const Detail = () => import('~/components/post/Detail.vue')
const SocialMenu = () => import('~/components/layouts/SocialMenu.vue')
const LatestList = () => import('~/components/post/LatestList.vue')
const RelatedPostsList = () => import('~/components/post/RelatedPostsList.vue')

// const New = () => import('~/components/contact/New.vue')
// const GoogleAdsense = () => import('~/components/layouts/GoogleAdsense.vue')

@Component({
  async asyncData({ store, params }) {
    await store.dispatch('product/initPosts', {
      slug: params.slug
    })
    // this.currentPost.fields.category[0].fields.slug

    await store.dispatch('product/getRelatedPostData', {
      category: store.state.product.currentPost.fields.category[0].fields.slug
    })
  },
  components: {
    MainTemplate,
    Detail,
    SocialMenu,
    LatestList,
    Sidebar,
    RelatedPostsList
  },
  head(this: Slug) {
    return {
      title: this.currentPost.fields.title || '',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.currentPost.fields.title || ''
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.currentPost.fields.description || ''
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            `https:${this.currentPost.fields.headerImage.fields.file.url}` || ''
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.currentPost.fields.title || ''
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.currentPost.fields.description || ''
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content:
            `https:${this.currentPost.fields.headerImage.fields.file.url}` || ''
        }
      ]
    }
  }
})
export default class Slug extends Vue {
  isVertical: boolean = true
  get currentPost() {
    return this.$store.state.product.currentPost
  }
  getDate(date: Date) {
    return dayjs(date).format('YYYY.MM.DD')
  }
}
</script>

<style scoped lang="scss">
.main_content {
  padding-bottom: 5rem;
  @include flex(space-between, flex-start);
}
.cover {
  position: relative;
  margin-top: 3rem;

  img {
    width: 100%;
    height: 50vh;
    object-fit: cover;
    vertical-align: middle;
    background-position: center;
    background-size: cover;
    filter: brightness(60%);
  }
}
.article {
  width: 100%;
  overflow: hidden;
  margin-top: 2rem;
  line-height: 28px;
}

.article p {
  text-align: left;
  font-size: 16px;
  color: #35495e;
  padding-right: 16px;
}

.late-article {
  margin-left: auto;
  margin-right: auto;
}
.article-wrap {
  width: 680px;
}
.post-meta {
  .title {
    padding: 0;
    color: #000;
    line-height: 3rem;
    margin-top: 1rem;
  }

  .date {
    font-weight: 700;
    font-family: $family-sans;
  }
}
.post-detail {
  p {
    margin-top: 3.5rem;
    img {
      margin-top: 3.5rem;
    }
  }
}
.related-posts-list-container {
  padding-top: 0.8rem;
  border-top: $border-color solid 2px;
  .title {
    font-family: $family-sans;
    text-align: center;
    letter-spacing: 4px;
    font-weight: 700;
    margin-bottom: 1rem;
  }
}
.related-posts-btn {
  margin-top: 5.7rem;
  text-align: center;
  a {
    border: 2px solid #000;
    padding: 0.7rem 5rem;
  }
}
footer {
  margin-top: 6rem;
}
@media screen and (max-width: 1023px) {
  .cover .title {
    font-size: 24px;
    line-height: 24px;
  }
  .article {
    width: 100%;
    text-align: left;
    overflow: hidden;
  }
  .post-meta {
    .title {
      font-size: 1.272727273rem;
      line-height: 2rem;
      margin-top: 0.5rem;
    }
  }
  .related-posts-list-container {
    padding-top: 1.2rem;
    margin-bottom: 1.5rem;
    .title {
      font-family: $family-sans;
      text-align: center;
      letter-spacing: 4px;
      font-weight: 700;
      margin-bottom: 1rem;
      font-size: 1.272727273rem;
    }
  }
}
</style>
