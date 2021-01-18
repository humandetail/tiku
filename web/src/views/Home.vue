<template>
  <div class="page-home">
    <HomeHeader />

    <div class="home-container">
      <HomeSubjects
        :subjects="subjects"
        :curr-subject="currSubject"
      />

      <HomeLicenseTypes
        :types="licenseTypes"
        :curr-type="currType"
      />

      <TheExaminationButton
        @btn-click="onExaminationButtonClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive, ref } from 'vue';
import { Store, useStore } from 'vuex';
import { Router, useRouter } from 'vue-router';
import actionTypes from '../store/tiku/actionTypes';
import { ILicenseType, ISubjectItem } from '../typings';

import HomeHeader from '../components/home/header/index.vue';
import HomeSubjects from '../components/home/subjects/index.vue';
import HomeLicenseTypes from '../components/home/licenseTypes/index.vue';
import TheExaminationButton from '../components/home/TheExaminationButton.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    HomeHeader,
    HomeSubjects,
    HomeLicenseTypes,
    TheExaminationButton
  },

  setup () {
    const store: Store<any> = useStore();
    const router: Router = useRouter();

    const subjects = reactive<ISubjectItem[]>([
      {
        name: '科目1',
        value: 1
      },
      {
        name: '科目4',
        value: 4
      }
    ]);
    const licenseTypes = reactive<ILicenseType[]>([
      {
        name: 'A1',
        value: 'a1'
      },
      {
        name: 'A2',
        value: 'a2'
      },
      {
        name: 'B1',
        value: 'b1'
      },
      {
        name: 'B2',
        value: 'b2'
      },
      {
        name: 'C1',
        value: 'c1'
      },
      {
        name: 'C2',
        value: 'c2'
      }
    ]);
    const currSubject = ref<number>(1);
    const currType = ref<string>('c1');

    // 提供修改当前科目的方法给子孙组件
    provide('changeSubject', (value: number): void => {
      currSubject.value = value;
    });
    // 提供修改当前驾照类型的方法给子孙组件
    provide('changeLicenseType', (value: string): void => {
      currType.value = value;
    });

    // “前往测试”按钮点击事件处理
    const onExaminationButtonClick = () => {
      store.dispatch(`tiku/${actionTypes.SET_TIKU_LIST}`, {
        subject: currSubject.value,
        model: currType.value,
        testType: 'rand'
      }).then(() => {
        router.replace({
          name: 'Testing'
        });
      });
    };

    return {
      subjects,
      licenseTypes,
      currSubject,
      currType,
      onExaminationButtonClick
    };
  }
});
</script>

<style lang="scss" scoped>
.home-container {
  padding: .15rem;
}
</style>
