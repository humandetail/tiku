<template>
  <div class="page-testing">
    <TestingHeader
      @submit="onSubmit"
      @quit="onQuit"
      @btn-more-click="onBtnMoreClick"
    />

    <TestingQuestions
      :curr-index="currQuestionIndex"
      :tikuList="tikuList"
    />

    <TestingAside
      :show="showAside"
      @switch-question="handleSwitchQuestion"
      @submit="onSubmit"
      @quit="onQuit"
    />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, provide, ref } from 'vue';
import { Store, useStore } from 'vuex';
import actionTypes from '../store/tiku/actionTypes';
import { useConfirm, useAlert } from '../plugins/notice';

import { ITikuItem } from '../typings';

import TestingHeader from '../components/testing/header/index.vue';
import TestingQuestions from '../components/testing/questions/index.vue';
import TestingAside from '../components/testing/aside/index.vue';
import { Router, useRouter } from 'vue-router';

export default defineComponent({
  name: 'TestingPage',

  components: {
    TestingHeader,
    TestingQuestions,
    TestingAside
  },

  setup () {
    const store: Store<any> = useStore();
    const router: Router = useRouter();

    // 是否显示更多的侧边栏
    const showAside = ref(false);
    // 当前正在浏览的题目
    const currQuestionIndex = ref(0);

    const tikuList: ComputedRef<ITikuItem[]> = computed(() => {
      return store.state.tiku.tikuList;
    });
    const duration: ComputedRef<number> = computed(() => {
      return store.state.tiku.duration;
    });

    // 测试是否已经结束
    const isEnd = computed<boolean>(() => store.state.tiku.isEnd);

    provide('isEnd', isEnd);

    // 计数器
    let timer: number | null = null;
    const _clearInterval = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const _startInterval = () => {
      if (isEnd.value) {
        return;
      }
      timer = setInterval(() => {
        if (duration.value <= 0) {
          // 测试时间结束
          _clearInterval();
          // alert('测试时间已经结束了。');
          useAlert({
            message: '考试时间结束'
          }).then(() => {
            store.dispatch(`tiku/${actionTypes.SET_IS_END}`, true);
          })
          return;
        }
        store.dispatch(`tiku/${actionTypes.SET_DURATION}`, duration.value - 1);
      }, 1000);
    };

    onMounted(() => {
      _startInterval(); // 启动计时器
    });

    // 交卷按钮点击
    const onSubmit = () => {
      _clearInterval();
      useConfirm({
        message: '确定要交卷吗？'
      })
        .then(() => {
          _startInterval();
          return store.dispatch(`tiku/${actionTypes.SET_IS_END}`, true);
        })
        .then(() => {
          _clearInterval();
          showAside.value = true;
        });
    };

    // 退出考试操作
    const onQuit = () => {
      store.dispatch(`tiku/${actionTypes.TEST_QUIT}`)
        .then(() => {
          router.push({
            name: 'Profile'
          });
        });
    };

    // 更多按钮点击
    const onBtnMoreClick = () => {
      showAside.value = !showAside.value;
    };

    // 切换当前题目索引
    const handleSwitchQuestion = (index: number) => {
      showAside.value = false; // 关闭掉aside
      currQuestionIndex.value = index;
    };

    return {
      duration,
      tikuList,
      showAside,
      currQuestionIndex,
      onSubmit,
      onBtnMoreClick,
      handleSwitchQuestion,
      onQuit
    };
  }
});
</script>

<style lang="scss" scoped>
.page-testing {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
