<template>
  <div
    class="hd-confirm-wrapper"
    id="hd-confirm-wrapper"
    :style="{
      'z-index': zIndex
    }"
  >
    <div class="mask" @click="onMaskClick"></div>
    <div class="hd-confirm">
      <header class="confirm-header border-bottom">
        <h2 class="title">
          {{ title }}
        </h2>
      </header>
      <div
        v-if="!useHtml"
        class="confirm-content"
      >
        {{ message }}
      </div>
      <div
        v-else
        class="confirm-content"
        v-html="message"
      ></div>
      <footer class="confirm-footer border-top">
        <button
          class="btn btn-cancel"
          :style="{ color: cancelButtonColor }"
          @click="onCancelBtnClick"
        >
          {{ cancelButtonText }}
        </button>
        <button
          class="btn btn-confirm"
          :style="{ color: confirmButtonColor }"
          @click="onConfirmBtnClick"
        >
          {{ confirmButtonText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';

export default defineComponent({
  name: 'HdConfirm',

  props: {
    // 主标题
    title: {
      type: String,
      default: '提示'
    },

    // 询问的内容
    message: {
      type: String,
      default: '确定执行此操作吗？'
    },

    // 确认按钮的文本
    confirmButtonText: {
      type: String,
      default: '确认'
    },

    // 取消按钮的文本
    cancelButtonText: {
      type: String,
      default: '取消'
    },

    // 确认按钮的文本颜色
    confirmButtonColor: {
      type: String,
      default: '#0098ff'
    },

    // 取消按钮的文本颜色
    cancelButtonColor: {
      type: String,
      default: '#909399'
    },

    // 是否将 message 当作 html 处理，不建议
    useHtml: {
      type: Boolean,
      default: false
    },

    // 是否可以通过点击遮罩关闭
    closeOnClickMask: {
      type: Boolean,
      default: true
    },

    // 是否可以通过按下 esc 键关闭
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    // confrim 框的层级
    zIndex: {
      type: [Number, String],
      default: 9999
    }
  },

  setup (props, { emit }) {
    // 取消按钮点击事件
    const onCancelBtnClick = () => {
      emit('cancel');
    };

    // 确认按钮点击事件
    const onConfirmBtnClick = () => {
      emit('confirm');
    };

    // 遮罩点击事件
    const onMaskClick = () => {
      console.log(props.closeOnClickMask);
      if (props.closeOnClickMask) {
        emit('cancel');
      }
    };

    function onKeydown (e: KeyboardEvent) {
      // 用户按下 escape 键
      if (e.keyCode === 27) {
        emit('cancel');
      }
    }

    onMounted(() => {
      if (props.closeOnPressEscape) {
        document.addEventListener('keydown', onKeydown, false);
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onKeydown, false);
    })

    return {
      onCancelBtnClick,
      onConfirmBtnClick,
      onMaskClick
    };
  }
});
</script>

<style lang="scss" scoped>
.hd-confirm-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }

  .hd-confirm {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3rem;
    background-color: #fff;
    border-radius: .08rem;
    transform: translate(-50%, -50%);

    .confirm-header {
      padding: .1rem .15rem;

      .title {
        font-size: .18rem;
        line-height: 1.8;
      }
    }

    .confirm-content {
      padding: .3rem .15rem;
    }

    .confirm-footer {
      display: flex;
      height: .5rem;

      .btn {
        flex: 1;
        font-size: .16rem;
        border: none;
        outline: none;
        background-color: transparent;

        & + .btn {
          border-left: 1px solid #efefef;
        }
      }
    }
  }
}
</style>
