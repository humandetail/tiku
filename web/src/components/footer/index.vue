<template>
  <footer class="page-footer border-top">
    <section class="copyright">
      &copy;
      <a
        class="copy-site"
        href="https://www.humandetail.com"
        target="_blank"
      >
        细节个人博客
      </a>
    </section>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageFooter'
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.page-footer {
  padding: .15rem;

  .copyright {
    text-align: center;
    font-size: .14rem;

    .copy-site {
      color: $regularText;
    }
  }
}
</style>
