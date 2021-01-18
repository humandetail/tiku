<template>
  <section class="question-numbers">
    <header class="header">
      <h3 class="title">
        测试题目
      </h3>
    </header>

    <ul class="numbers">
      <li
        v-for="(item) of questionNumbers"
        :key="item.number"
        class="number"
        :class="{
          'no-select': !item.userOption,
          'is-right': isEnd && item.isRight,
          'is-false': isEnd && !item.isRight
        }"
        @click="onItemClick(item.number)"
      >
        {{ item.number + 1 }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Store, useStore } from 'vuex';

import { useIsEnd, useQuestionNumbers } from '../../../compositions';

export default defineComponent({
  name: 'QuestionNumbers',

  setup (props, { emit }) {
    const store: Store<any> = useStore();

    const questionNumbers = useQuestionNumbers(store);
    const isEnd = useIsEnd(store);

    const onItemClick = (index: number) => {
      emit('switch-question', index);
    }

    return {
      questionNumbers,
      isEnd,
      onItemClick
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.question-numbers {
  margin-top: .2rem;

  .title {
    font-size: .18rem;
  }

  .numbers {
    display: flex;
    flex-wrap: wrap;
    margin-top: .2rem;

    .number {
      width: .28rem;
      height: .28rem;
      margin: 0 .08rem .08rem 0;
      line-height: .28rem;
      font-size: .14rem;
      text-align: center;
      border: 1px solid #2c2c2c;
      border-radius: .04rem;
      box-sizing: border-box;

      &.no-select {
        border-color: #d1d1d1;
        color: #d1d1d1;
      }

      &.is-right {
        border-color: $successColor;
        background-color: $successColor;
        color: #fff;
      }

      &.is-false {
        border-color: $warningColor;
        background-color: $warningColor;
        color: #fff;
      }
    }
  }
}
</style>
