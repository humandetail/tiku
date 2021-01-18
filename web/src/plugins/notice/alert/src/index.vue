<template>
  <div
    class="hd-message-alert-container"
    id="hd-message-alert"
    :style="{
      'z-index': zIndex
    }"
  >
    <div class="mask" @click="onMaskClick"></div>
    <div class="hd-message-alert" :class="{ center }">
      <header class="message-alert-header border-bottom">
        <h2 class="title">
          {{ title }}
        </h2>
      </header>
      <div
        v-if="!useHtml"
        class="message-alert-content"
      >
        {{ message }}
      </div>
      <div
        v-else
        class="message-alert-content"
        v-html="message"
      ></div>
      <footer class="message-alert-footer border-top">
        <button
          class="btn btn-confirm"
          :style="{
            color: confirmButtonColor
          }"
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
  name: 'HdMessageAlert',

  props: {
    title: {
      type: String,
      default: '提示'
    },

    message: {
      type: String,
      default: '这是一条消息。'
    },

    confirmButtonText: {
      type: String,
      default: '知道了'
    },

    confirmButtonColor: {
      type: String,
      default: '#0098ff'
    },

    closeOnClickMask: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    useHtml: {
      type: Boolean,
      default: false
    },

    center: {
      type: Boolean,
      default: true
    },

    zIndex: {
      type: [Number, String],
      default: 9999
    }
  },

  setup (props, { emit }) {
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
      onConfirmBtnClick,
      onMaskClick
    };
  }
});
</script>

<style lang="scss" scoped>
.hd-message-alert-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }

  .hd-message-alert {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3rem;
    background-color: #fff;
    border-radius: .08rem;
    transform: translate(-50%, -50%);

    &.center {
      text-align: center;
    }

    .message-alert-header {
      padding: .1rem .15rem;

      .title {
        font-size: .18rem;
        line-height: 1.8;
      }
    }

    .message-alert-content {
      padding: .3rem .15rem;
    }

    .message-alert-footer {
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
