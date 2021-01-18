<template>
  <section class="testing-info">
    <div class="title">
      正在测试：
      {{ title }}
    </div>

    <div class="duration">
      剩余时间：
      {{ duration }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Store, useStore } from 'vuex';

import { useTestingtitle, useTestingDuration } from '../../../compositions';

export default defineComponent({
  name: 'TestingInfo',

  setup () {
    const store: Store<any> = useStore();

    const title = useTestingtitle(store);
    const duration = useTestingDuration(store);

    return {
      title,
      duration
    };
  }
});
</script>
