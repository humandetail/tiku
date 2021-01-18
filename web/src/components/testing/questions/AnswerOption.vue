<template>
  <div
    class="answer-option"
    :class="{
      'user-option': option.userOption === option.label,
      'is-end': isEnd,
      'is-right': isEnd && option.userOptionIsRight,
      'is-answer': isEnd && option.isRightAnswer
    }"
    @click="onOptionClick"
  >
    <div
      v-if="option.showLabel"
      class="label"
    >
      {{ option.label }}、
    </div>
    <div class="option">
      {{ option.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject, PropType } from 'vue';
import { IAnswerOption } from '../../../typings';

export default defineComponent({
  name: 'AnserOption',

  props: {
    option: {
      type: Object as PropType<IAnswerOption>,
      required: true
    }
  },

  setup (props, { emit }) {
    const onOptionClick = () => {
      const label = props.option.label;
      emit('select', label);
    };

    const isEnd = inject<ComputedRef<boolean>>('isEnd');

    return {
      onOptionClick,
      isEnd
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.answer-option {
  display: flex;
  align-items: flex-start;
  padding: .1rem;
  border-radius: .02rem;
  border: 1px solid #eee;

  .label {
    width: .3rem;
  }

  & + .answer-option {
    margin-top: .1rem;
  }

  &.user-option {
    border-color: $brandColor;
  }

  &.is-end {
    &.user-option {
      border-color: $warningColor;
    }

    &.is-right,
    &.is-answer {
      border-color: $successColor;
    }
  }
}
</style>
