<template>
  <section class="subject-wrapper">
    <header class="header">
      <h2 class="title">请选择科目</h2>
    </header>

    <div class="subjects">
      <SubjectItem
        v-for="(subject) of subjects"
        :key="subject.name"
        :subject="subject"
        :curr-subject="currSubject"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISubjectItem } from '../../../typings';

import SubjectItem from './Item.vue';

export default defineComponent({
  name: 'HomeSubjects',

  components: {
    SubjectItem
  },

  props: {
    subjects: {
      type: Array as PropType<ISubjectItem[]>,
      required: true
    },

    currSubject: {
      type: Number,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  .title {
    font-size: .18rem;
    font-weight: 700;
  }
}

.subjects {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .2rem;
}
</style>
