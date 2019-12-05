<template lang="pug">
  footer
    .row
      .logo
        img(src="~assets/images/logo.png")
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
import Vue from 'vue'
import dayjs from 'dayjs'

export default class Footer extends Vue {
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
footer {
  margin-top: 2.5rem;
  min-height: 300px;
  padding: 4rem 0 0;
  background-color: transparent;
  color: #000;
  max-width: 100%;
  border-top: $border-color solid 2px;
  @include flex(center, flex-start);
  .row {
    display: flex;
    align-items: flex-start;
    width: 100%;
    > div {
      width: (100 / 3) * 1%;
    }
  }
  .logo {
    padding-right: 10rem;
  }
}
.footer-text {
  padding: 24px 0 12px;
  margin: auto;
}

.menu {
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
}

.menu a {
  color: #fff;
  margin-right: 1em;
  padding-right: 16px;
  /* background: url(../static/external_link.png) no-repeat right center; */
}

.menu a:last-child {
  margin-right: 0;
}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8vmin;
}

@media screen and (max-width: 1023px) {
  footer {
    min-height: unset;
    padding-bottom: 6rem;
    .row {
      > .logo {
        text-align: center;
        margin-bottom: 1.5rem;
        width: 100%;
        margin: auto;
        padding: 0 20%;
      }
      > .category_list,
      > .archives {
        width: 24%;
        .list_title {
          font-size: 0.9rem;
        }
        > ul {
          margin-top: 1rem;
          line-height: 1.5rem;
        }
      }
      > .archives {
        margin-left: 1rem;
      }
    }
  }
}
</style>
