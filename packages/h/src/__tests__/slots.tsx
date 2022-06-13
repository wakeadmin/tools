/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsx h */
import { screen, cleanup } from '@testing-library/vue';
import { defineComponent, isVue2 } from 'vue-demi';

import { h } from '../h';
import { declareComponent } from '../declareComponent';

import { ignoreNewlineJoin, render } from './helper';

afterEach(cleanup);

test('潜在问题: image 100% 在  vue3 表现为 0', () => {
  const App = defineComponent({
    setup() {
      return () => {
        return (
          <img
            src="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg"
            class="overview-hero-icon-img"
            width="100%"
            height="100%"
            alt="Apple M2 芯片"
          />
        );
      };
    },
  });

  render(App, {});

  const img = screen.getByAltText('Apple M2 芯片');
  if (isVue2) {
    expect(img.outerHTML).toBe(
      '<img src="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg" width="100%" height="100%" alt="Apple M2 芯片" class="overview-hero-icon-img">'
    );
  } else {
    expect(img.outerHTML).toBe(
      '<img src="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg" class="overview-hero-icon-img" width="0" height="0" alt="Apple M2 芯片">'
    );
  }
});

/**
 * HTML 复杂嵌套结构测试
 */
const HTMLStructure = declareComponent({
  setup: () => () =>
    (
      <div data-testid="container" class="hero-copyblock">
        <div class="large-12">
          <h1 class="hero-eyebrow typography-hero-callout">MacBook&nbsp;Pro</h1>
          <h2 class="hero-headline typography-hero-headline centerall_06">
            超机动，
            <br class="small" />
            硬实力。
          </h2>
        </div>
        <div class="large-12">
          <p class="hero-copy typography-quote-reduced">
            全新 M2 芯片现身，
            <br class="small" />
            13 英寸 MacBook&nbsp;Pro 实力大涨。同样的紧凑设计之下，电池续航最长达 20 小时
            <sup class="footnote footnote-number">
              <a href="#footnote-2" aria-label="脚注 1" data-modal-close="">
                1
              </a>
            </sup>
            ，并以主动散热系统让强悍性能持续迸发。还有绚丽的视网膜显示屏、FaceTime 高清摄像头和录音棚级
            <span class="nowrap">麦克风</span>也全部到位，一台超机动的专业级<span class="nowrap">笔记</span>
            本电脑整装待发。
          </p>
        </div>
        <div class="hero-callout">
          <p class="hero-callout-copy typography-hero-callout">由 M2 强势驱动</p>
          <picture
            id="overview-hero-icon-1"
            class="overview-hero-icon hero-callout-icon"
            data-picture-lazy-load=""
            data-picture-loaded=""
          >
            <source
              srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_small.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_small_2x.jpg 2x"
              media="(max-width:734px)"
            />
            <source
              srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_medium.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_medium_2x.jpg 2x"
              media="(max-width:1068px)"
            />
            <source
              srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg 2x"
              media="(min-width:0px)"
            />
            <img
              src="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg"
              class="overview-hero-icon-img"
              alt="Apple M2 芯片"
            />
          </picture>
        </div>
      </div>
    ),
});

test('复杂 JSX 结构', () => {
  render(HTMLStructure, {});

  const container = screen.getByTestId('container');
  if (isVue2) {
    expect(container.outerHTML).toBe(
      ignoreNewlineJoin(
        `<div data-testid="container" class="hero-copyblock">
      <div class="large-12">
        <h1 class="hero-eyebrow typography-hero-callout">MacBook&nbsp;Pro</h1>
        <h2 class="hero-headline typography-hero-headline centerall_06">超机动，<br class="small">硬实力。</h2>
      </div>
      <div class="large-12">
        <p class="hero-copy typography-quote-reduced">全新 M2 芯片现身，<br class="small">13 英寸 MacBook&nbsp;Pro 实力大涨。同样的紧凑设计之下，电池续航最长达 20 小时<sup class="footnote footnote-number">
          <a href="#footnote-2" aria-label="脚注 1" data-modal-close="">1</a></sup>，并以主动散热系统让强悍性能持续迸发。还有绚丽的视网膜显示屏、FaceTime 高清摄像头和录音棚级<span class="nowrap">麦克风</span>也全部到位，一台超机动的专业级<span class="nowrap">笔记</span>本电脑整装待发。</p>
        </div><div class="hero-callout">
        <p class="hero-callout-copy typography-hero-callout">由 M2 强势驱动</p>
          <picture id="overview-hero-icon-1" data-picture-lazy-load="" data-picture-loaded="" class="overview-hero-icon hero-callout-icon">
            <source srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_small.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_small_2x.jpg 2x" media="(max-width:734px)">
            <source srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_medium.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_medium_2x.jpg 2x" media="(max-width:1068px)">
            <source srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg 2x" media="(min-width:0px)">
            <img src="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg" alt="Apple M2 芯片" class="overview-hero-icon-img">
          </picture>
        </div>
      </div>`
      )
    );
  } else {
    // Vue3 字段顺序可能有差别
    expect(container.outerHTML).toBe(
      ignoreNewlineJoin(
        `<div data-testid="container" class="hero-copyblock">
           <div class="large-12">
             <h1 class="hero-eyebrow typography-hero-callout">MacBook&nbsp;Pro</h1>
             <h2 class="hero-headline typography-hero-headline centerall_06">超机动，<br class="small">硬实力。</h2>
           </div>
           <div class="large-12">
             <p class="hero-copy typography-quote-reduced">全新 M2 芯片现身，<br class="small">13 英寸 MacBook&nbsp;Pro 实力大涨。同样的紧凑设计之下，电池续航最长达 20 小时<sup class="footnote footnote-number"><a href="#footnote-2" aria-label="脚注 1" data-modal-close="">1</a></sup>，并以主动散热系统让强悍性能持续迸发。还有绚丽的视网膜显示屏、FaceTime 高清摄像头和录音棚级<span class="nowrap">麦克风</span>也全部到位，一台超机动的专业级<span class="nowrap">笔记</span>本电脑整装待发。
             </p>
           </div>
           <div class="hero-callout"><p class="hero-callout-copy typography-hero-callout">由 M2 强势驱动</p>
             <picture id="overview-hero-icon-1" class="overview-hero-icon hero-callout-icon" data-picture-lazy-load="" data-picture-loaded="">
               <source srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_small.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_small_2x.jpg 2x" media="(max-width:734px)">
               <source srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_medium.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_medium_2x.jpg 2x" media="(max-width:1068px)">
               <source srcset="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large.jpg 1x, /v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg 2x" media="(min-width:0px)">
               <img src="/v/macbook-pro-13/l/images/overview/hero_icon__gf2ry7i5mt6y_large_2x.jpg" class="overview-hero-icon-img" alt="Apple M2 芯片">
              </picture>
           </div>
         </div>`
      )
    );
  }
});
