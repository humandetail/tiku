<template>
  <header class="page-header">
    <h1 class="title">
      细节驾校题库
    </h1>
    <div
      class="btn-user"
      @click="goProfile"
    >
      <span class="icon iconfont icon-user"></span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeHeader',

  setup () {
    const router = useRouter();

    const goProfile = () => {
      router.push({
        name: 'Profile'
      });
    };

    return {
      goProfile
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .5rem;
  background-color: $brandColor;

  .title {
    flex: 1;
    min-width: 0;
    padding: 0 .1rem;
    line-height: .5rem;
    color: #fff;
    font-size: .18rem;
    text-align: center;
    @include ellipsis;
  }

  .btn-user {
    width: .5rem;
    height: .5rem;
    line-height: .5rem;
    text-align: center;

    .icon {
      font-size: .2rem;
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>
