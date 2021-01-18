<template>
  <section
    ref="wrapperRef"
    class="testing-questions"
  >
    <div
      class="wrapper"
    >
      <QuestionItem
        v-for="(question, index) of tikuList"
        :key="question.id"
        :index="index"
        :question="question"
        class="slide-page"
        @user-select="onUserSelect"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue';
import { Store, useStore } from 'vuex';
import actionTypes from '../../../store/tiku/actionTypes';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import { useSlide, PluginAPI } from '../../../compositions';
import { ITikuItem, IUserSelectOption } from '../../../typings';

import QuestionItem from './Item.vue';

export default defineComponent({
  name: 'TestingQuestions',

  components: {
    QuestionItem
  },

  props: {
    currIndex: {
      type: Number,
      required: true
    },

    tikuList: {
      type: Array as PropType<ITikuItem[]>,
      required: true
    }
  },

  setup (props) {
    const store: Store<any> = useStore();

    const wrapperRef = ref<HTMLElement | null>(null);
    // scroller
    let scroller: BScrollConstructor<{}> & PluginAPI;

    onMounted(async () => {
      await nextTick();
      scroller = useSlide(wrapperRef.value as HTMLElement);
      scroller.goToPage(props.currIndex, 0);
    });

    const onUserSelect = async (options: IUserSelectOption) => {
      await store.dispatch(`tiku/${actionTypes.SET_USER_OPTION}`, options);
      scroller && scroller.next();
    };

    watch(() => {
      return props.currIndex;
    }, () => {
      scroller && scroller.goToPage(props.currIndex, 0);
    });

    return {
      wrapperRef,
      onUserSelect
    };
  }
});
</script>

<style lang="scss" scoped>
.testing-questions {
  flex: 1;
  overflow: hidden;

  .wrapper {
    height: 100%;
    white-space: nowrap;

    .slide-page {
      float: left;
      display: block;
      height: 100%;
      overflow-y: auto;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
  }
}
</style>
