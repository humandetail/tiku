/*
 * @FilePath: /tiku/web/src/compositions/betterScroll.ts
 * @Description: betterSroll 自定义hook
 * @Author: humandetail
 * @Date: 2021-01-07 01:00:14
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-07 15:24:32
 */

import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import ObserveDOM from '@better-scroll/observe-dom';

import { EaseItem } from '@better-scroll/shared-utils';
import { Page } from '@better-scroll/slide/dist/types/SlidePages';

BScroll.use(Slide);
BScroll.use(ObserveDOM);

export interface PluginAPI {
  next(time?: number, easing?: EaseItem): void;
  prev(time?: number, easing?: EaseItem): void;
  goToPage(x: number, y: number, time?: number, easing?: EaseItem): void;
  getCurrentPage(): Page;
  startPlay(): void;
  pausePlay(): void;
}

export function useSlide (wrapper: HTMLElement) {
  const bs = new BScroll(wrapper, {
    scrollX: true,
    scrollY: false,
    slide: {
      threshold: 100,
      loop: false,
      autoplay: false
    },
    useTransition: true,
    momentum: false,
    bounce: false,
    stopPropagation: true,
    eventPassthrough: 'vertical'
  });

  return bs;
}
