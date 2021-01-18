<template>
  <section class="the-question">
    <h3 class="question">
      <span v-if="number" class="number">
        {{ number }}、
      </span>
      <span
        v-if="isTrueOrFalseQuestion"
        class="type"
      >
        【判断题】
      </span>
      <span class="q">
        {{ question }}
      </span>
    </h3>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheQuestion',

  props: {
    isTrueOrFalseQuestion: {
      type: Boolean,
      required: true
    },

    question: {
      type: String,
      required: true
    },

    number: {
      type: Number
    }
  }
});
</script>

<style lang="scss" scoped>
.question {
  margin-bottom: .2rem;
  font-size: .2rem;
  line-height: 1.8;
}
</style>
