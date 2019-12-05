<template lang="pug">
  .post(v-if="post")
    .post-detail(v-html="$md.render(post.fields.body)")

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  // eslint-disable-next-line require-await
  // async mounted() {
  //   ;(this as any).$microlinkjs('.link-preview')
  // }
})
export default class Detail extends Vue {
  @Prop() post?: object
}
</script>

<style lang="scss" scoped>
.post-detail {
  /deep/ {
    p {
      margin-top: 3.5rem;
      img {
      }
    }
    h1,
    h2,
    h3 {
      text-align: left;
    }
  }
}
</style>
