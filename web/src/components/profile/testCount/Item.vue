<template>
  <div class="test-count-item">
    <div class="label">
      {{ countLabel }}：
    </div>
    <div class="value">
      共进行了<span class="highlight">{{ total }}</span>次测试；
      平均成绩为：<span class="highlight">{{ score }}</span>分；
      平均用时为：<span class="highlight">{{ time }}</span>。
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ITestCountItem } from '../../../typings';

export default defineComponent({
  name: 'TestCountItem',

  props: {
    label: {
      type: String,
      required: true
    },

    countArray: {
      type: Array as PropType<ITestCountItem[]>,
      required: true
    }
  },

  setup (props) {
    const countLabel = ref(props.label.replace('subject-', '科目').replace('model-', ''));
    const total = ref(props.countArray.length);
    const score = ref<number>(0);
    const duration = ref<number>(0);
    const time = ref<string>(''); // 格式化平均时间

    props.countArray.forEach((item) => {
      score.value += item.score;
      duration.value += item.duration;
    });

    // 获取平均分
    score.value = parseFloat((score.value / total.value).toFixed(1));

    // 平均用时
    duration.value = Math.floor(score.value / total.value);

    const minutes = Math.floor(duration.value / 60);
    const seconds = duration.value % 60;

    time.value = `${minutes ? minutes + '分' : ''}${seconds}秒`;

    return {
      countLabel,
      total,
      score,
      time
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.test-count-item {
  display: flex;
  align-items: flex-start;
  margin-top: .1rem;
  line-height: .24rem;

  .label {
    position: relative;
    padding-left: .24rem;
    white-space: nowrap;

    &::before {
      content: '';
      position: absolute;
      left: .09rem;
      top: .09rem;
      width: .06rem;
      height: .06rem;
      border-radius: .03rem;
      background-color: $primaryText;
    }
  }

  .value {
    flex: 1;

    .highlight {
      color: $brandColor;
    }
  }
}
</style>
