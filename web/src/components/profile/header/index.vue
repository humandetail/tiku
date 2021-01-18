<template>
  <section class="profile-header">
    <div class="header-container">
      <header class="header">
        <div
          class="btn btn-home"
          @click="goHome"
        >
          <span class="icon iconfont icon-home"></span>
        </div>

        <h1 class="title">我的</h1>
      </header>

      <UserInfo />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import UserInfo from './user/index.vue';

export default defineComponent({
  name: 'ProfileHeader',

  components: {
    UserInfo
  },

  setup () {
    const router = useRouter();

    const goHome = () => {
      router.push({
        name: 'Home'
      });
    };

    return {
      goHome
    };
  }
});
</script>

<style lang="scss" scoped>
.profile-header {
  position: relative;
  height: 0%;
  padding-bottom: 61.5%;

  .header-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(/profile-bg.jpeg) no-repeat 0 0/100% 100%;
    border-bottom-left-radius: 50% 10%;
    border-bottom-right-radius: 50% 10%;
  }

  .header {
    display: flex;
    align-items: center;
    height: .5rem;

    .btn-home {
      width: .5rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;

      .icon {
        font-size: .24rem;
        color: #fff;
        font-weight: 700;
      }
    }

    .title {
      flex: 1;
      padding: 0 .15rem;
      font-size: .2rem;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
