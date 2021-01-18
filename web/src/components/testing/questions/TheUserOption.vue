<template>
  <section class="user-option">
    <span
      v-if="!option"
      class="no-option"
    >
      你并没有选择答案
    </span>

    <span
      v-else
      class="option"
    >
      你选择的答案是：{{ option }}
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheUserOption',

  props: {
    option: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.user-option {
  margin-top: .2rem;
  color: $brandColor;
  font-size: .14rem;
}
</style>
