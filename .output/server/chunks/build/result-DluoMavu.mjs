import { _ as __nuxt_component_0 } from './nuxt-link-DH6n6KP7.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { d as useRoute, a as useI18n, c as useLocalePath } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "result",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const i18n = useI18n();
    const localePath = useLocalePath();
    const image = ref("");
    const imageUrl = route.query.image || "";
    const color = ref(route.query.color || "");
    ref(route.query.search || "");
    const name = ref(i18n.t("name"));
    const copied = ref(false);
    const { data: generatedData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/generate?image=${imageUrl}&color=${color.value}`,
      "$hryZYQqzIM"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0" }, _attrs))}><div class="max-w-8xl mx-auto sm:px-6 lg:px-8"><div class="flex flex-col items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 text-center"><p>${ssrInterpolate(_ctx.$t("enter-icon-name"))}</p><input${ssrRenderAttr("value", name.value)} class="border-solid border-1px rounded-lg border-red-300 py-4 pl-4 mb-12 mt-4" type="text" aria-label="term"><div class="mt-4 pt-4 mb-12 text-gray-800 border-t border-dashed"><p class="md:px-12">${ssrInterpolate(_ctx.$t("save-images"))}</p></div><div><a${ssrRenderAttr("download", `${name.value}-100px.svg`)}${ssrRenderAttr("href", image.value)} target="_blank" class="flex flex-col items-center"><img${ssrRenderAttr("src", image.value)}${ssrRenderAttr("alt", name.value)} height="100" width="100"><p class="pb-12">${ssrInterpolate(`${name.value}-100px.svg`)}</p></a><a${ssrRenderAttr("download", `${name.value}-24px.svg`)}${ssrRenderAttr("href", image.value)} target="_blank" class="flex flex-col items-center"><img${ssrRenderAttr("src", image.value)}${ssrRenderAttr("alt", name.value)} height="24" width="24"><p class="pb-12">${ssrInterpolate(`${name.value}-24px.svg`)}</p></a></div><div><button class="${ssrRenderClass(`${copied.value ? "bg-blue-400" : "bg-green-400"} px-4 py-2 flex items-center`)}"><span class="pr-4">#${ssrInterpolate(color.value)}</span><svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M11 1.5h2.5v12a1 1 0 01-1 1h-10a1 1 0 01-1-1v-12H4m.5-1h6v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" stroke="currentColor"></path></svg></button></div><div class="mt-4 pt-4 text-gray-800 border-t border-dashed">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)(`/`)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="uppercase bg-yellow-400 py-4 px-8 mt-4 rounded-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("search-again"))}</button>`);
          } else {
            return [
              createVNode("button", { class: "uppercase bg-yellow-400 py-4 px-8 mt-4 rounded-xl" }, toDisplayString(_ctx.$t("search-again")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=result-DluoMavu.mjs.map
