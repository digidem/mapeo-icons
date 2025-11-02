import { _ as __nuxt_component_0 } from './nuxt-link-DH6n6KP7.mjs';
import { d as useRoute, b as useRouter, c as useLocalePath, e as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-BGSw73gY.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';
import 'perfect-debounce';

class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(
      this.b
    )})`;
  }
  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }
  hueRotate(angle = 0) {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072
    ]);
  }
  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value)
    ]);
  }
  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value)
    ]);
  }
  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value
    ]);
  }
  multiply(matrix) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }
  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }
  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }
  invert(value = 1) {
    this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
  }
  hsl() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: h * 100,
      s: s * 100,
      l: l * 100
    };
  }
  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}
class Solver {
  constructor(target) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }
  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values)
    };
  }
  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18e3, 600, 1.2, 1.2];
    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1e3);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }
  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }
  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;
    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);
    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }
      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }
      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };
    function fix(value, idx) {
      let max = 100;
      if (idx === 2) {
        max = 7500;
      } else if (idx === 4 || idx === 5) {
        max = 200;
      }
      if (idx === 3) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + value % max;
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }
  loss(filters) {
    const color = this.reusedColor;
    color.set(0, 0, 0);
    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);
    const colorHSL = color.hsl();
    return Math.abs(color.r - this.target.r) + Math.abs(color.g - this.target.g) + Math.abs(color.b - this.target.b) + Math.abs(colorHSL.h - this.targetHSL.h) + Math.abs(colorHSL.s - this.targetHSL.s) + Math.abs(colorHSL.l - this.targetHSL.l);
  }
  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(
      2
    )}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(
      5
    )}%);`;
  }
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}
const colorize = (hex) => {
  const rgb = hexToRgb(hex);
  if (rgb.length !== 3) {
    alert("Invalid format!");
    return;
  }
  const color = new Color(rgb[0], rgb[1], rgb[2]);
  const solver = new Solver(color);
  const result = solver.solve();
  return result.filter;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "images",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const localePath = useLocalePath();
    const s = route.query.s || "";
    const l = route.query.l || "en";
    ref(s);
    const { data: imagesData, error: fetchError } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/search?s=${s}&l=${l}`, "$vR5ECL7_o3")), __temp = await __temp, __restore(), __temp);
    const images = ref(Array.isArray(imagesData.value) ? imagesData.value : []);
    const active = ref(null);
    const loading = ref(false);
    const loadingMore = ref(false);
    const loadingMoreError = ref(false);
    ref(1);
    const color = ref({
      hex: "#194d33",
      rgba: { r: 25, g: 77, b: 51, a: 1 },
      hsv: { h: 146, s: 68, v: 30 }
    });
    const colorized = computed(() => colorize(color.value?.hex));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_client_only = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0" }, _attrs))}><div class="max-w-4xl mx-auto sm:px-6 lg:px-8"><a class="flex justify-center pt-8 sm:pt-0" href="https://mapeo.app" target="_blank"><h1 class="text-2xl">${ssrInterpolate(_ctx.$t("select-icon"))}</h1></a><div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 pb-500px md:pb-0"><div class="flex flex-row flex-wrap justify-center"><!--[-->`);
      ssrRenderList(images.value, (image) => {
        _push(`<div class="${ssrRenderClass(`p-25px cursor-pointer border-red-500 border-solid rounded ${active.value === image ? `border-2` : "border-0"}`)}" style="${ssrRenderStyle(colorized.value)}"><img width="100"${ssrRenderAttr("src", image)}></div>`);
      });
      _push(`<!--]--></div>`);
      if (loadingMoreError.value) {
        _push(`<p class="text-red-500 py-4 text-center">${ssrInterpolate(_ctx.$t("loadingMoreError"))}! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col text-gray-800 md:border-t md:border-dashed fixed right-0.5 left-0.5 md:static bottom-4 md:bottom-0 md:flex-row md:justify-around items-center">`);
      if (loadingMoreError.value) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)("/")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-250px uppercase bg-yellow-400 py-4 px-8 rounded-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("search-again"))}</button>`);
            } else {
              return [
                createVNode("button", { class: "w-250px uppercase bg-yellow-400 py-4 px-8 rounded-xl" }, toDisplayString(_ctx.$t("search-again")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<button${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} class="w-250px uppercase bg-gray-900 py-4 px-8 rounded-xl text-light-700">${ssrInterpolate(_ctx.$t(loadingMore.value ? "loading" : "load-more"))}</button>`);
      }
      _push(`<div class="flex justify-center py-4">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div><button${ssrIncludeBooleanAttr(loading.value || !active.value) ? " disabled" : ""} class="w-250px uppercase bg-green-400 py-4 px-8 rounded-xl">${ssrInterpolate(_ctx.$t(loading.value ? "loading" : "generate"))}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=images-BdPFJ7cc.mjs.map
