import { defineComponent, computed, mergeProps, unref, ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { d as useRoute, a as useI18n, b as useRouter, c as useLocalePath } from './server.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/logo.webp");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const i18n = useI18n();
    useRouter();
    useLocalePath();
    const locale = ref(i18n.locale.value || "en");
    const term = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex items-top justify-center min-h-screen bg-gray-200 sm:items-center sm:pt-0" }, _attrs))}><div class="max-w-4xl mx-auto pt-5vh md:pt-0 sm:px-6 lg:px-8"><div class="max-w-lg mx-auto sm:px-1 lg:px-2 mb-5"><img class="mx-auto [h:100px] md:[h:150px]"${ssrRenderAttr("src", _imports_0)}></div><div class="bg-light-400 overflow-hidden shadow sm:rounded-lg p-6"><h1 class="text-center font-bold text-xl md:text-2xl py-4">${ssrInterpolate(_ctx.$t("title"))}</h1><div class="md:px-12 text-md md:text-lg mx-auto"><p class="mb-5">${ssrInterpolate(_ctx.$t("description"))}</p><p class="mb-5">${ssrInterpolate(_ctx.$t("config"))} <a href="https://docs.mapeo.app/complete-reference-guide/customization-options/custom-configurations/creating-custom-configurations" target="_blank" class="underline">${ssrInterpolate(_ctx.$t("link"))}</a></p></div></div><div class="mt-8 bg-light-50 overflow-hidden shadow sm:rounded-lg p-6"><div class="flex flex-row justify-around"><h2 class="text-2xl leading-7 font-semibold">${ssrInterpolate(_ctx.$t("select-language"))}</h2><select class="px-2 md:px-4 py-1 md:py-2"><option value="en"${ssrIncludeBooleanAttr(Array.isArray(locale.value) ? ssrLooseContain(locale.value, "en") : ssrLooseEqual(locale.value, "en")) ? " selected" : ""}>English</option><option value="pt"${ssrIncludeBooleanAttr(Array.isArray(locale.value) ? ssrLooseContain(locale.value, "pt") : ssrLooseEqual(locale.value, "pt")) ? " selected" : ""}>Português</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(locale.value) ? ssrLooseContain(locale.value, "es") : ssrLooseEqual(locale.value, "es")) ? " selected" : ""}>Español</option><option value="th"${ssrIncludeBooleanAttr(Array.isArray(locale.value) ? ssrLooseContain(locale.value, "th") : ssrLooseEqual(locale.value, "th")) ? " selected" : ""}>ไทย</option></select></div><div class="border-t border-dashed mt-4 pt-4"><p class="pb-8 text-center">${ssrInterpolate(_ctx.$t("enter-search"))}</p><form class="text-gray-800 flex flex-col md:flex-row flex-nowrap md:justify-between"><input${ssrRenderAttr("value", term.value)} class="w-full md:w-3/4 border-solid border-1px rounded-lg md:rounded-none md:rounded-l-lg border-red-300 py-4 pl-4" type="text" aria-label="term"${ssrRenderAttr("placeholder", _ctx.$t("enter-search"))}><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="[w:250px] uppercase bg-green-400 text-gray-700 py-4 px-8 mt-4 md:mt-0 rounded-xl md:rounded-none md:rounded-r-lg">${ssrInterpolate(_ctx.$t(loading.value ? "loading" : "search"))}</button></form>`);
      if (__props.error) {
        _push(`<p class="text-red-500">${ssrInterpolate(_ctx.$t("error"))}!</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><footer></footer></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Search.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "Search" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const error = computed(() => !!route.query.error);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Search = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Search, mergeProps({ error: unref(error) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bkepk5Et.mjs.map
