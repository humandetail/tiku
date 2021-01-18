<template>
  <div class="page-profile">
    <ProfileHeader />

    <TestCount />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProfileHeader from '../components/profile/header/index.vue';
import TestCount from '../components/profile/testCount/index.vue';

export default defineComponent({
  name: 'ProfilePage',

  components: {
    ProfileHeader,
    TestCount
  }
});
</script>

<style lang="scss" scoped>
.page-profile {
  background-color: #f1f1f1;
  min-height: 100%;
}
</style>
