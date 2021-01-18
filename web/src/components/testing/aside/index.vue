<template>
  <transition
    name="slide"
    duration="5000"
  >
    <aside
      v-show="show"
      class="testing-aside"
    >
      <TheInfo />

      <TestingResult
        v-if="isEnd"
      />

      <QuestionNumbers
        @switch-question="handleSwitchQuestion"
      />

      <TestingActions
        @submit="onSubmit"
        @quit="onQuit"
      />
    </aside>
  </transition>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import TheInfo from './Info.vue';
import TestingResult from './Result.vue';
import QuestionNumbers from './QuestionNumbers.vue';
import TestingActions from './Actions.vue';

export default defineComponent({
  name: 'TestingAside',

  components: {
    TheInfo,
    TestingResult,
    QuestionNumbers,
    TestingActions
  },

  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  setup (props, { emit }) {
    const handleSwitchQuestion = (index: number) => {
      emit('switch-question', index);
    };

    const onSubmit = () => {
      emit('submit');
    };

    const onQuit = () => {
      emit('quit');
    };

    const isEnd = inject('isEnd');

    return {
      isEnd,
      handleSwitchQuestion,
      onSubmit,
      onQuit
    }
  }
});
</script>

<style lang="scss" scoped>
.testing-aside {
  position: fixed;
  left: 0;
  top: .5rem;
  width: 100%;
  height: calc(100% - .5rem);
  padding: .15rem;
  z-index: 100;
  background-color: #fff;
  transform: translateX(0);
  box-sizing: border-box;
  overflow-y: auto;

  &.slide-enter-active,
  &.slide-leave-active {
    transition: transform .3s ease-in-out;
  }

  &.slide-leave-to,
  &.slide-enter {
    transform: translateX(100%);
  }
}
</style>
