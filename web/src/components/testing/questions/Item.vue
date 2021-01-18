<template>
  <div class="question-item">
    <TheQuestion
      :is-true-or-false-question="isTrueOrFalseQuestion"
      :number="index + 1"
      :question="question.question"
    />
    <TheQuestionPic
      v-if="question.url"
      :url="question.url"
    />
    <div class="answer-options">
      <AnswerOption
        v-for="(option) of answerOptions"
        :key="option.label"
        :option="option"
        @select="onUserSelect"
      />
    </div>

    <TheUserOption
      v-if="isEnd"
      :option="question.userOption ? question.userOption : ''"
      :is-true-or-false-question="isTrueOrFalseQuestion"
    />

    <TheExplanation
      v-if="isEnd"
      :explains="question.explains"
    />
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject, PropType } from 'vue';
import { ITikuItem, IAnswerOption, IUserSelectOption } from '../../../typings';
import {
  useIsTrueOrFalseQuestion,
  useAnswerOptions
} from '../../../compositions';

import TheQuestion from './TheQuestion.vue';
import TheQuestionPic from './TheQuestionPic.vue';
import AnswerOption from './AnswerOption.vue';
import TheUserOption from './TheUserOption.vue';
import TheExplanation from './TheExplanation.vue';

export default defineComponent({
  name: 'QuestionItem',

  components: {
    TheQuestion,
    TheQuestionPic,
    AnswerOption,
    TheUserOption,
    TheExplanation
  },

  props: {
    question: {
      type: Object as PropType<ITikuItem>,
      required: true
    },

    index: {
      type: Number,
      default: 0
    }
  },

  setup (props, { emit }) {
    // 判断当前题目是否为判断题
    // 当 item3 与 item4 值为空时，为判断题
    const isTrueOrFalseQuestion: ComputedRef<boolean> = useIsTrueOrFalseQuestion(props.question);

    // 生成 options 列表
    const answerOptions: ComputedRef<IAnswerOption[]> = useAnswerOptions(props.question);

    // 用户选择答案
    const onUserSelect = (label: string) => {
      emit('user-select', {
        // 当前题目的id
        id: props.question.id,
        // 用户选中的答案
        label
      } as IUserSelectOption);
    };

    const isEnd = inject('isEnd');

    return {
      isTrueOrFalseQuestion,
      answerOptions,
      onUserSelect,
      isEnd
    }
  }
});
</script>

<style lang="scss" scoped>
.question-item {
  height: 100%;
  padding: .15rem;
  white-space: normal;
  box-sizing: border-box;

  .answer-options {
    margin-top: .2rem;
  }
}
</style>
