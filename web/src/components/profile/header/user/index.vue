<template>
  <section class="user-info">
    <div class="nickname-area">
      <span class="icon">
        <span class="iconfont icon-user"></span>
      </span>
      <span class="nickname">
        {{ nickname }}
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Store, useStore } from 'vuex';
import { IGlobalState } from '../../../../typings';

export default defineComponent({
  name: 'UserInfo',

  setup () {
    const store: Store<IGlobalState> = useStore();

    const nickname = computed(() => {
      return store.state.user.nickname;
    });

    return {
      nickname
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.user-info {
  padding: .15rem;

  .nickname-area {
    float: right;
    display: flex;
    align-items: center;

    .icon {
      width: .4rem;
      height: .4rem;
      margin-right: .1rem;
      line-height: .4rem;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      font-weight: 700;

      .iconfont {
        font-size: .24rem;
        color: $brandColor;
      }
    }

    .nickname {
      font-size: .2rem;
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>
