<template>
  <section class="question-pic">
    <img
      v-if="isImg"
      :src="url"
    />
    <div
      v-else
      class="tips">
      很抱歉，无法为您播放
      <a class="link" :href="url" target="_blank">Flash视频</a>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'TheQuestionPic',

  props: {
    url: {
      type: String,
      required: true
    }
  },

  setup (props) {
    // 判断 url 是一个图片类型 还是一个 flash 类型的文件
    const isImg = computed(() => {
      const url = props.url;

      if (!url) {
        return false;
      }

      const reg = /(jpe?g|png|gif|svg)$/i;

      return reg.test(url);
    });

    return {
      isImg
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.question-pic {
  .tips {
    font-size: .14rem;
    color: #5c5c5c;

    .link {
      color: $brandColor;
    }
  }
}
</style>
