<template>
  <section class="the-explanation">
    <div class="explains" v-html="explains"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheExplanation',

  props: {
    explains: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.the-explanation {
  margin-top: .2rem;

  .explains {
    color: $warningColor;

    b {
      font-size: .18rem;
    }
  }
}
</style>
