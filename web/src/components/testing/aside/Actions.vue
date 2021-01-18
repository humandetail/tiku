<template>
  <section class="testing-actions">
    <button
      v-if="!isEnd"
      class="btn btn-submit"
      @click="onSubmit"
    >
      我要交卷
    </button>
    <button
      v-else
      class="btn btn-quit"
      @click="onQuit"
    >
      退出测试
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Store, useStore } from 'vuex';
import { useIsEnd } from '../../../compositions';

export default defineComponent({
  name: 'TestingActions',

  setup (props, { emit }) {
    const store: Store<any> = useStore();

    const isEnd = useIsEnd(store);

    const onSubmit = () => {
      emit('submit');
    };

    const onQuit = () => {
      emit('quit');
    };

    return {
      isEnd,
      onSubmit,
      onQuit
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.testing-actions {
  margin-top: .3rem;

  .btn {
    width: 100%;
    padding: .1rem 0;
    text-align: center;
    color: #fff;
    font-size: .16rem;
    border: none;
    border-radius: .06rem;
    background-color: transparent;

    &.btn-submit {
      background-color: $brandColor;
    }

    &.btn-quit {
      background-color: #f1f1f1;
      color: $primaryText;
    }
  }
}
</style>
