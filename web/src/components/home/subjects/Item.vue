<template>
  <div
    class="subject-item"
    :class="currSubject === subject.value ? 'active' : ''"
    @click="changeSubject(subject.value)"
  >
    {{ subject.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { ISubjectItem } from '../../../typings';

export default defineComponent({
  name: 'SubjectItem',

  props: {
    subject: {
      type: Object as PropType<ISubjectItem>,
      required: true
    },

    currSubject: {
      type: Number,
      required: true
    }
  },

  setup () {
    const changeSubject = inject<(value: number) => void>('changeSubject');

    return {
      changeSubject
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.subject-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.4rem;
  height: .6rem;
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
