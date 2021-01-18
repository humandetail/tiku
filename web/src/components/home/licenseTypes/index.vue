<template>
  <section class="license-types-wrapper">
    <header class="header">
      <h2 class="title">请选择驾照类型</h2>
    </header>

    <div class="license-types">
      <LicenseTypeItem
        v-for="(type) of types"
        :key="type.name"
        :type="type"
        :curr-type="currType"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ILicenseType } from '../../../typings';

import LicenseTypeItem from './Item.vue';

export default defineComponent({
  name: 'HomeLicenseTypes',

  components: {
    LicenseTypeItem
  },

  props: {
    types: {
      type: Array as PropType<ILicenseType[]>,
      requried: true
    },

    currType: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.license-types-wrapper {
  margin-top: .4rem;
}

.header {
  .title {
    font-size: .18rem;
    font-weight: 700;
  }
}

.license-types {
  display: flex;
  flex-wrap: wrap;
}
</style>
