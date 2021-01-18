<template>
  <header class="testing-header">
    <div
      class="btn-submit"
      @click="onSubmit"
    >
      <template v-if="!isEnd">
        我要交卷
      </template>
      <template v-else>
        退出测试
      </template>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="duration">
      <span class="icon iconfont icon-clock"></span>
      {{ duration }}
    </div>
    <div
      class="btn-more"
      @click="onBtnMoreClick"
    >
      <span class="icon iconfont icon-more"></span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, inject, ComputedRef, ref } from 'vue';
import { Store, useStore } from 'vuex';
import { useTestingDuration, useTestingtitle } from '../../../compositions';

export default defineComponent({
  name: 'TestingHeader',

  setup (props, { emit }) {
    const store: Store<any> = useStore();

    // 获取当前正在测试的题型
    const title = useTestingtitle(store);
    // 获取测试剩余时间
    const duration = useTestingDuration(store);

    const isEnd = inject<ComputedRef<boolean>>('isEnd') || ref(false);

    // 交卷按钮点击事件
    const onSubmit = () => {
      if (!isEnd.value) {
        emit('submit');
      } else {
        emit('quit');
      }
    };

    // 更多按钮点击事件
    const onBtnMoreClick = () => {
      emit('btn-more-click');
    };

    return {
      isEnd,
      title,
      duration,
      onSubmit,
      onBtnMoreClick
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.testing-header {
  display: flex;
  height: .5rem;
  background-color: $brandColor;
  color: #fff;

  .title {
    flex: 1;
    padding: 0 .1rem;
    line-height: .5rem;
  }

  .icon {
    color: #fff;
  }

  .btn-submit {
    padding: 0 .15rem;
    line-height: .5rem;
  }

  .duration {
    line-height: .5rem;
  }

  .btn-more {
    padding: 0 .1rem;
    width: .3rem;
    text-align: center;
    line-height: .5rem;
  }
}
</style>
