<template>
  <section class="testing-result">
    <header class="header">
      <h3 class="title">
        测试结果
      </h3>
    </header>

    <div class="result">
      <div
        class="score-area"
      >
        <span>
          你本次测试的成绩为
          <span class="score">
            {{ result.score }}
          </span>
          分；
        </span>
        <span
          v-if="result.isPassed"
          class="passed"
        >
          恭喜，通过测试。
        </span>
        <span v-else>
          很遗憾，未能通过测试。
        </span>
      </div>

      <div class="duration-area">
        <span>
          共花费
        </span>
        <span class="duration">
          {{ result.duration }}
        </span>
        <span>
          时间
        </span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Store, useStore } from 'vuex';
import { useTestingResult } from '../../../compositions';

export default defineComponent({
  name: 'TestingResult',

  setup () {
    const store: Store<any> = useStore();

    const result = useTestingResult(store);

    return {
      result
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.testing-result {
  margin-top: .3rem;

  .title {
    font-size: .18rem;
  }

  .result {
    padding: .1rem 0;
    font-size: .16rem;
    line-height: 1.8;

    .score {
      color: $warningColor;
    }

    .passed {
      color: $successColor;
    }

    .duration {
      color: $brandColor;
    }
  }
}
</style>
