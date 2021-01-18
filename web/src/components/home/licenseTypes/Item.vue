<template>
  <div
    class="license-type-item"
    :class="currType === type.value ? 'active' : ''"
    @click="changeLicenseType(type.value)"
  >
    {{ type.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { ILicenseType } from '../../../typings';

export default defineComponent({
  name: 'LicenseTypeItem',

  props: {
    type: {
      type: Object as PropType<ILicenseType>,
      required: true
    },

    currType: {
      type: String,
      required: true
    }
  },

  setup () {
    const changeLicenseType = inject<(value: string) => void>('changeLicenseType');

    return {
      changeLicenseType
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.license-type-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: .6rem;
  height: .6rem;
  margin: .2rem .2rem 0 0;
  font-size: .18rem;
  color: $primaryText;
  border-radius: .1rem;
  border: 1px solid $secondaryText;

  &.active {
    background-color: $brandColor;
    color: #fff;
    border-color: $brandColor;
  }
}
</style>
