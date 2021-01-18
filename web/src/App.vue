<template>
  <div class="page-container">
    <div class="container">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <PageFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageFooter from './components/footer/index.vue';

export default defineComponent({
  name: 'App',

  components: {
    PageFooter
  }
});
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container {
    flex: 1;
    min-height: 0;
    overflow-y: scroll;
  }
}
</style>
