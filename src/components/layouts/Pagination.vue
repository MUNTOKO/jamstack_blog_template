<template lang="pug">
.pagination
  span(:class="page === 1 ? 'disabled' : ''", :style="page === 1 ? 'opacity: 0.5;' : 'opacity: 1;'", href='#', @click='prev(page)')
    | «
  span.page_number(v-for="n of max" :class="page === n ? 'disabled' : ''", href='#', @click='goPage(n)')
    | {{n}}
  span(:class="page === max ? 'disabled' : ''", href='#', @click='next(page)')
    | »

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Pagination extends Vue {
  @Prop() page!: number
  @Prop() max!: number

  disabled: boolean = true

  prev(newVal: number) {
    if (this.page !== 1) {
      this.$emit('page-data', newVal - 1)
    }
  }

  next(newVal: number) {
    if (this.page !== this.max) {
      this.$emit('page-data', newVal + 1)
    }
  }
  goPage(newVal: number) {
    this.$emit('page-data', newVal)
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: inline-block;
  font-size: 0.875rem;
  @include flex(center, center);
  span {
    margin: 0 1rem;
    color: #000;
    font-family: $family-serif;
    cursor: pointer;
    &.page_number {
      font-family: $family-sans;
      border-bottom: 2px solid transparent;
      &.disabled {
        border-bottom: 2px solid #323231;
      }
    }
  }
}

.disabled {
  pointer-events: none;
}
@media screen and (max-width: 1023px) {
  .pagination {
    display: inline-block;
    font-size: 10px;
    @include flex(center, center);
    span {
      margin: 0 0.5rem;
    }
  }
}
</style>
