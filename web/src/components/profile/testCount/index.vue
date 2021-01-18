<template>
  <section class="test-count">
    <header class="header border-bottom">
      <h2 class="title">
        测试统计
      </h2>
    </header>

    <div
      v-if="!testCount"
      class="empty"
    >
      你还没有进行过测试哦，
      <router-link
        :to="{ name: 'Home' }"
        class="link"
      >
        前往测试
      </router-link>
    </div>

    <div
      v-else
      class="count"
    >
      <TestCountItem
        v-for="(item, key) in testCount"
        :key="key"
        :label="key"
        :count-array="item"
      />
    </div>

    <div
      v-if="testCount"
      class="action-wrapper border-top"
    >
      <button
        @click="checkPrevTest"
        class="btn-prev-test"
      >
        查看上一次测试
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { ComputedRef, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Store, useStore } from 'vuex';
import { useGetTestCount } from '../../../compositions';
import actionTypes from '../../../store/tiku/actionTypes';
import { ITestCountItem } from '../../../typings';

import TestCountItem from './Item.vue';

export default defineComponent({
  name: 'TestCount',

  components: {
    TestCountItem
  },

  setup () {
    const store: Store<any> = useStore();
    const router = useRouter();

    const testCount: ComputedRef<{ [key: string]: ITestCountItem[] } | null> = useGetTestCount();

    const checkPrevTest = () => {
      store.dispatch(`tiku/${actionTypes.CHECK_PREVIOUS_TEST}`)
        .then(() => {
          router.replace({
            name: 'Testing'
          });
        })
        .catch(() => {
          alert('出错了，未能获取到上一次测试的数据。');
        });
    };

    return {
      testCount,
      checkPrevTest
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.test-count {
  margin: .15rem;
  padding: 0 .1rem;
  background-color: #fff;
  border-radius: .1rem;

  .header {
    .title {
      font-size: .16rem;
      line-height: .5rem;
    }
  }

  .empty {
    padding: .15rem 0;
    text-align: center;
    color: $secondaryText;

    .link {
      color: $brandColor;
    }
  }

  .count {
    padding: .15rem 0;
  }

  .action-wrapper {
    padding: .15rem 0;
    text-align: center;

    .btn-prev-test {
      border: none;
      color: $brandColor;
      background-color: transparent;
      font-size: .16rem;
    }
  }
}
</style>
