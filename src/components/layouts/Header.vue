<template lang="pug">
  header.header
    nuxt-link(:to="{name:'index'}").logo
      img(src="~assets/images/logo.png")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 4rem 0;
  top: 0;
  left: 0;
  line-height: 1.2;
  font-size: 3vmin;
  z-index: 24;
  text-align: center;
  border-bottom: $border-color solid 2px;
}
.logo {
  display: block;
  width: 500px;
  margin: auto;
}
@media screen and (max-width: 1023px) {
  .logo {
    width: 100%;
  }
}
</style>
