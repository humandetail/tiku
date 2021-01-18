<template>
  <section class="btn-wrapper">
    <button
      class="btn-exam"
      @click="onBtnClick"
    >
      前往测试
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheExaminationButton',

  setup (props, { emit }) {
    const onBtnClick = () => {
      emit('btn-click');
    };

    return {
      onBtnClick
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: .4rem;

  .btn-exam {
    flex: 1;
    height: .5rem;
    font-size: .18rem;
    color: #fff;
    border-radius: .1rem;
    border: none;
    outline: none;
    background-color: $successColor;
  }
}
</style>
