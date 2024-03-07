import { defineComponent, ref, computed, h, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext, unref, mergeModels, useModel, watchEffect, toDisplayString, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot, ssrRenderTeleport, ssrRenderList } from 'vue/server-renderer';
import { d as useNuxtApp, a as useRuntimeConfig, _ as _export_sfc } from '../server.mjs';
import __nuxt_component_0$2 from './Icon-Ciweo1So.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import { r as encodeParam, l as hasProtocol, t as withLeadingSlash, j as joinURL, p as parseURL, n as defu, v as encodePath } from '../../nitro/node-server.mjs';
import { onClickOutside } from '@vueuse/core';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import './index-CxcwS-Uy.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$5 = {
  __name: "ReverseTimer",
  __ssrInlineRender: true,
  props: {
    countSecond: {
      type: Number,
      default: 21
    }
  },
  emits: ["customEvent"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const time = ref(props.countSecond);
    const progress = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "timer",
        style: {
          background: `conic-gradient( rgb(11, 3, 49) ${unref(progress)}%, rgb(196, 206, 255) 0)`
        }
      }, _attrs))} data-v-c31a770b><div class="timer-counter" data-v-c31a770b>${ssrInterpolate(unref(time))}</div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/ReverseTimer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c31a770b"]]);
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$FGkthESlFm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$FGkthESlFm, defaults: {} }
};
const useImage = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    }
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: true },
  // modifiers
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  // options
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  densities: { type: String, default: void 0 },
  preload: { type: Boolean, default: void 0 },
  // <img> attributes
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: {
    type: String,
    default: void 0,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], default: void 0 }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_2$1 = defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load", "error"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    const imgEl = ref();
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return () => h("img", {
      ref: imgEl,
      src: src.value,
      ...{ onerror: "this.setAttribute('data-error', 1)" },
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const _sfc_main$4 = {
  __name: "Input",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    placeholder: {
      type: String,
      default: "example@mail.com"
    },
    errors: {
      type: String,
      required: false
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const value = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-0d4b73cb><input class="${ssrRenderClass([{ "input-errors": __props.errors }, "input"])}"${ssrRenderAttr("value", value.value)} type="text"${ssrRenderAttr("placeholder", __props.placeholder)} data-v-0d4b73cb><div class="errors" data-v-0d4b73cb>${ssrInterpolate(__props.errors)}</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/Input.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0d4b73cb"]]);
const _sfc_main$3 = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    mainColor: {
      type: String,
      default: "hsl(125, 100%, 62%)"
    },
    imgSrc: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    function darkColor() {
      let color = props.mainColor;
      if (color.slice(0, 3) == "hsl") {
        let lightValue = color.slice(-5, -1);
        return color.replace(lightValue, " 10%");
      } else
        return color;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-56669cd1><button style="${ssrRenderStyle({
        backgroundColor: darkColor(),
        boxShadow: "inset 0px 0px 45px " + __props.mainColor
      })}" data-v-56669cd1>`);
      if (__props.imgSrc) {
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: __props.imgSrc,
          class: "icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Button.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-56669cd1"]]);
const _sfc_main$2 = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    //main params
    name: {
      type: String,
      default: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u043A\u043D\u0430"
    },
    title: {
      type: String,
      default: ""
    },
    titleColor: {
      type: String,
      default: "#ffffff"
    },
    haveBtn: {
      type: Boolean,
      default: false
    },
    haveTwoBtn: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: "OK"
    },
    btnColor: {
      type: String,
      default: "hsl(115, 100%, 50%)"
    },
    btnImg: {
      type: String,
      default: ""
    },
    haveInput: {
      type: Boolean,
      default: false
    },
    haveClose: {
      type: Boolean,
      default: false
    },
    haveTimer: {
      type: Boolean,
      default: false
    },
    countSecondInTimer: {
      type: Number,
      default: 10
    },
    imgSrc: {
      type: String,
      default: ""
    },
    glowColor: {
      type: String,
      default: "red"
    },
    styleModal: {
      type: Object,
      default: () => {
      }
    },
    styleText: {
      type: Object,
      default: () => {
      }
    },
    haveCones: {
      type: Boolean,
      default: false
    },
    conesAmount: {
      type: String,
      default: "9,000"
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const modal = ref(false);
    onClickOutside(modal, () => {
      if (props.haveClose) {
        hideOrNext();
      }
    });
    const activateBtn = ref(false);
    const errMsgInput = ref("");
    const remindAboutInput = () => {
      errMsgInput.value = "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435";
    };
    const userInput = ref("");
    watchEffect(() => {
      if (userInput.value.length > 6) {
        errMsgInput.value = "";
        activateBtn.value = true;
      } else
        activateBtn.value = false;
    });
    const show = () => {
      modal.value = true;
    };
    const hideOrNext = () => {
      modal.value = false;
    };
    __expose({
      show,
      hideOrNext
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseReverseTimer = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      const _component_NuxtImg = __nuxt_component_2$1;
      const _component_UserInput = __nuxt_component_1$1;
      const _component_BaseButton = __nuxt_component_2;
      ssrRenderTeleport(_push, (_push2) => {
        if (modal.value) {
          _push2(`<div class="modal-bg" data-v-b9aa7862><div class="modal" style="${ssrRenderStyle({ ...__props.styleModal })}" data-v-b9aa7862>`);
          if (__props.imgSrc) {
            _push2(`<div class="modal-glow" style="${ssrRenderStyle({
              boxShadow: "100px 90px 90px 10px " + __props.glowColor
            })}" data-v-b9aa7862></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="modal-header" data-v-b9aa7862><div class="modal-close" data-v-b9aa7862>`);
          if (__props.haveTimer) {
            _push2(ssrRenderComponent(_component_BaseReverseTimer, {
              class: "modal-timer",
              onCustomEvent: ($event) => hideOrNext(),
              countSecond: __props.countSecondInTimer
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          if (__props.haveClose) {
            _push2(`<button data-v-b9aa7862>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "fxemoji:ballottscriptx",
              size: "25px"
            }, null, _parent));
            _push2(`</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-name" data-v-b9aa7862>${ssrInterpolate(__props.name)}</div></div><div class="modal-body" data-v-b9aa7862>`);
          if (__props.imgSrc) {
            _push2(`<div class="modal-img" data-v-b9aa7862>`);
            _push2(ssrRenderComponent(_component_NuxtImg, { src: __props.imgSrc }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="modal-title" style="${ssrRenderStyle({ color: __props.titleColor })}" data-v-b9aa7862>${ssrInterpolate(__props.title)}</div><div style="${ssrRenderStyle({ ...__props.styleText })}" data-v-b9aa7862>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
          if (__props.haveCones) {
            _push2(`<div class="modal-cones" data-v-b9aa7862>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/cone.png",
              mainColor: "hsl(115, 100%, 50%)"
            }, null, _parent));
            _push2(` ${ssrInterpolate(__props.conesAmount)}M </div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.haveInput) {
            _push2(ssrRenderComponent(_component_UserInput, {
              class: "modal-input",
              modelValue: userInput.value,
              "onUpdate:modelValue": ($event) => userInput.value = $event,
              errors: errMsgInput.value
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.haveBtn) {
            _push2(`<div class="modal-control" data-v-b9aa7862>`);
            if (__props.haveInput && !activateBtn.value) {
              _push2(ssrRenderComponent(_component_BaseButton, {
                onClick: ($event) => remindAboutInput(),
                mainColor: "hsl(200, 0%, 50%)"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.btnText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.btnText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push2(ssrRenderComponent(_component_BaseButton, {
                imgSrc: __props.btnImg,
                mainColor: __props.btnColor,
                onClick: ($event) => hideOrNext()
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.btnText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.btnText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            }
            if (__props.haveTwoBtn) {
              _push2(ssrRenderComponent(_component_BaseButton, {
                onClick: ($event) => hideOrNext(),
                mainColor: "hsl(9, 100%, 50%)"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(` No `);
                  } else {
                    return [
                      createTextVNode(" No ")
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<div data-v-b9aa7862></div>`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b9aa7862"]]);
const _sfc_main$1 = {
  __name: "RatingDrum",
  __ssrInlineRender: true,
  props: {
    userRating: {
      type: Number,
      default: 500
    }
  },
  emits: ["endRatingDrum"],
  setup(__props, { emit: __emit }) {
    const counter = ref(0);
    const drum = ref(200);
    function valueLoop(arg) {
      counter.value = 0;
      setInterval();
    }
    const componentKey = ref(0);
    const forceRender = () => {
      componentKey.value += 1;
    };
    const userInput = ref("");
    function restart(arg) {
      valueLoop();
      forceRender();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      const _component_UserInput = __nuxt_component_1$1;
      const _component_BaseButton = __nuxt_component_2;
      _push(`<!--[--><div class="drum" data-v-fc7c9bde><div class="drum-number" style="${ssrRenderStyle({ animationDuration: `${unref(userInput) * 0.9 / unref(drum)}s` })}" data-v-fc7c9bde><!--[-->`);
      ssrRenderList(unref(drum), (num) => {
        _push(`<p class="drum-number-value" data-v-fc7c9bde>${ssrInterpolate(num)}</p>`);
      });
      _push(`<!--]--></div><div class="drum-rating" data-v-fc7c9bde><div class="drum-rating-title" data-v-fc7c9bde>\u0412\u0430\u0448 \u0440\u0435\u0439\u0442\u0438\u043D\u0433</div><div class="drum-rating-value" data-v-fc7c9bde>`);
      _push(ssrRenderComponent(_component_Icon, { name: "noto:crown" }, null, _parent));
      _push(` ${ssrInterpolate(unref(counter))}</div></div></div><div class="restart" data-v-fc7c9bde>`);
      _push(ssrRenderComponent(_component_UserInput, {
        class: "modal-input",
        modelValue: unref(userInput),
        "onUpdate:modelValue": ($event) => isRef(userInput) ? userInput.value = $event : null,
        placeholder: "\u0420\u0435\u0439\u0442\u0438\u043D\u0433"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseButton, {
        mainColor: "hsl(220, 100%, 50%)",
        imgSrc: "/reload.svg",
        onClick: ($event) => restart(unref(userInput))
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C`);
          } else {
            return [
              createTextVNode("\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/RatingDrum.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fc7c9bde"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const timer_modal = ref(null);
    const base_modal = ref(null);
    const pay_modal = ref(null);
    const new_stage_modal = ref(null);
    const warning_modal = ref(null);
    const account_modal = ref(null);
    const redress_modal = ref(null);
    const reward_modal = ref(null);
    const input_modal = ref(null);
    const attention_modal = ref(null);
    const block_modal = ref(null);
    const total_block_modal = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0;
      const _component_UserRatingDrum = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "timer_modal",
        ref: timer_modal,
        haveTimer: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad praesentium! Dolorum perferendis quis nobis, excepturi quia voluptate aperiam iusto necessitatibus dolore, placeat aliquam. Quaerat quas earum nihil repellat totam. `);
          } else {
            return [
              createTextVNode(" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad praesentium! Dolorum perferendis quis nobis, excepturi quia voluptate aperiam iusto necessitatibus dolore, placeat aliquam. Quaerat quas earum nihil repellat totam. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "base_modal",
        ref: base_modal,
        title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
        haveBtn: true,
        haveTwoBtn: true,
        imgSrc: "/flag.svg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis fuga in rem repellendus. `);
          } else {
            return [
              createTextVNode(" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis fuga in rem repellendus. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "pay_modal",
        ref: pay_modal,
        name: "\u0411\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u0438\u043C \u0437\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0443!",
        haveBtn: true,
        btnText: "\u0425\u043E\u0440\u043E\u0448\u043E!",
        imgSrc: "/buy.svg",
        glowColor: "green",
        haveTimer: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0448\u043B\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E. \u0424\u0438\u0448\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u044B \u043D\u0430 \u0412\u0430\u0448 \u0441\u0447\u0435\u0442 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F. \u0416\u0435\u043B\u0430\u0435\u043C \u0432\u0430\u043C \u0443\u0434\u0430\u0447\u043D\u043E\u0439 \u0438\u0433\u0440\u044B! `);
          } else {
            return [
              createTextVNode(" \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0448\u043B\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E. \u0424\u0438\u0448\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u044B \u043D\u0430 \u0412\u0430\u0448 \u0441\u0447\u0435\u0442 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F. \u0416\u0435\u043B\u0430\u0435\u043C \u0432\u0430\u043C \u0443\u0434\u0430\u0447\u043D\u043E\u0439 \u0438\u0433\u0440\u044B! ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "new_stage_modal",
        ref: new_stage_modal,
        styleModal: { height: "260px" },
        name: "\u041D\u043E\u0432\u044B\u0439 \u044D\u0442\u0430\u043F",
        haveClose: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` C\u044B\u0433\u0440\u0430\u0439\u0442\u0435 \u043E\u0434\u043D\u0443 \u0438\u0433\u0440\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0447\u043A\u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430 \u0438 \u0437\u0430\u043D\u044F\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u0432 \u043D\u043E\u0432\u043E\u043C \u044D\u0442\u0430\u043F\u0435 \u043B\u0438\u0433. `);
          } else {
            return [
              createTextVNode(" C\u044B\u0433\u0440\u0430\u0439\u0442\u0435 \u043E\u0434\u043D\u0443 \u0438\u0433\u0440\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0447\u043A\u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430 \u0438 \u0437\u0430\u043D\u044F\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u0432 \u043D\u043E\u0432\u043E\u043C \u044D\u0442\u0430\u043F\u0435 \u043B\u0438\u0433. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "warning_modal",
        ref: warning_modal,
        styleModal: { height: "200px" },
        name: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435",
        haveClose: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0444\u0438\u0448\u0435\u043A \u0434\u043B\u044F \u0441\u0442\u0430\u0440\u0442\u0430 `);
          } else {
            return [
              createTextVNode(" \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0444\u0438\u0448\u0435\u043A \u0434\u043B\u044F \u0441\u0442\u0430\u0440\u0442\u0430 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "account_modal",
        ref: account_modal,
        name: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0445\u043E\u0434\u0430",
        title: "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0432\u0445\u043E\u0434",
        titleColor: "red",
        imgSrc: "/warning.svg",
        haveBtn: true,
        btnText: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0412\u044B \u0432\u043E\u0448\u043B\u0438 \u0432 \u0438\u0433\u0440\u0443 \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435 \u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u043C \u043E\u043A\u043D\u0435 `);
          } else {
            return [
              createTextVNode(" \u0412\u044B \u0432\u043E\u0448\u043B\u0438 \u0432 \u0438\u0433\u0440\u0443 \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435 \u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u043C \u043E\u043A\u043D\u0435 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "redress_modal",
        ref: redress_modal,
        name: "\u041A\u043E\u043C\u043F\u0435\u043D\u0441\u0430\u0446\u0438\u044F",
        imgSrc: "/five-cones.png",
        glowColor: "hsl(125, 100%, 62%)",
        title: "\u0414\u043E\u0431\u0440\u043E\u0433\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0441\u0443\u0442\u043E\u043A!",
        titleColor: "hsl(125, 100%, 62%)",
        haveBtn: true,
        btnText: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E!",
        styleModal: { height: "650px" },
        haveCones: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 22.05.2023 \u0432 \u0438\u0433\u0440\u0435 \u043D\u0430\u0431\u043B\u044F\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u0431\u043E\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0433\u043B\u0438 \u043F\u043E\u0432\u043B\u0438\u044F\u0442\u044C \u043D\u0430 \u0438\u0433\u0440\u0440\u043E\u0432\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B.<br${_scopeId}> \u0412 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0438\u0437\u0432\u0435\u043D\u0435\u043D\u0438\u044F \u0437\u0430 \u043F\u0440\u0438\u0447\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u043D\u0435\u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u043C\u044B \u043D\u0430\u0447\u0438\u0441\u043B\u0438\u043B\u0438 \u043D\u0430 \u0412\u0430\u0448 \u0441\u0447\u0435\u0442 \u0444\u0438\u0448\u043A\u0438!<br${_scopeId}> \u0423\u0434\u0430\u0447\u0438 \u0432 \u0438\u0433\u0440\u0435! `);
          } else {
            return [
              createTextVNode(" 22.05.2023 \u0432 \u0438\u0433\u0440\u0435 \u043D\u0430\u0431\u043B\u044F\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u0431\u043E\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0433\u043B\u0438 \u043F\u043E\u0432\u043B\u0438\u044F\u0442\u044C \u043D\u0430 \u0438\u0433\u0440\u0440\u043E\u0432\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B."),
              createVNode("br"),
              createTextVNode(" \u0412 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0438\u0437\u0432\u0435\u043D\u0435\u043D\u0438\u044F \u0437\u0430 \u043F\u0440\u0438\u0447\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u043D\u0435\u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u043C\u044B \u043D\u0430\u0447\u0438\u0441\u043B\u0438\u043B\u0438 \u043D\u0430 \u0412\u0430\u0448 \u0441\u0447\u0435\u0442 \u0444\u0438\u0448\u043A\u0438!"),
              createVNode("br"),
              createTextVNode(" \u0423\u0434\u0430\u0447\u0438 \u0432 \u0438\u0433\u0440\u0435! ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "reward_modal",
        ref: reward_modal,
        name: "\u041D\u0430\u0433\u0440\u0430\u0434\u0430 \u0437\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440",
        glowColor: "blue",
        imgSrc: "/many-cones.png",
        haveBtn: true,
        btnText: "\u0417\u0430\u0431\u0440\u0430\u0442\u044C",
        haveCones: true,
        styleModal: { height: "420px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0444\u0438\u0448\u043A\u0438! `);
          } else {
            return [
              createTextVNode(" \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0444\u0438\u0448\u043A\u0438! ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "input_modal",
        ref: input_modal,
        name: "\u041F\u043E\u0447\u0442\u0430 \u0434\u043B\u044F \u0447\u0435\u043A\u0430",
        haveBtn: true,
        btnText: "\u0414\u0430\u043B\u0435\u0435",
        haveInput: true,
        styleModal: { height: "fit-content" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0412\u0432\u0435\u0434\u0438\u0442\u0435 email, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0435\u043C \u0432\u0430\u043C \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0447\u0435\u043A `);
          } else {
            return [
              createTextVNode(" \u0412\u0432\u0435\u0434\u0438\u0442\u0435 email, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0435\u043C \u0432\u0430\u043C \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0447\u0435\u043A ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "attention_modal",
        ref: attention_modal,
        name: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435!",
        imgSrc: "/warning.svg",
        title: "\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",
        titleColor: "red",
        haveBtn: true,
        btnText: "\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u043F\u043B\u0435\u043D",
        styleText: { textAlign: "left" },
        styleModal: { height: "780px", fontSize: "17px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: <br${_scopeId}><br${_scopeId}><ol${_scopeId}><li${_scopeId}>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435\u043F\u043E\u0434\u043E\u0431\u0430\u044E\u0449\u0435\u0433\u043E \u0430\u0432\u0442\u0430\u0430\u0440\u0430.</li><li${_scopeId}>\u041E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430.</li><li${_scopeId}>\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u0444\u0438\u0448\u0435\u043A \u0432 \u043E\u0431\u0445\u043E\u0434 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430</li></ol> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E\u044E \u0434\u0440\u0443\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0430\u0442\u043C\u043E\u0441\u0432\u0435\u0440\u044B, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u0439, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0435\u0441\u0441\u0440\u043E\u0447\u043D\u0443\u044E \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0432 \u0441\u043B\u0443\u0447\u0430\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0445 \u043D\u0430\u0440\u0443\u0449\u0435\u043D\u0438\u0439. `);
          } else {
            return [
              createTextVNode(" \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: "),
              createVNode("br"),
              createVNode("br"),
              createVNode("ol", null, [
                createVNode("li", null, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435\u043F\u043E\u0434\u043E\u0431\u0430\u044E\u0449\u0435\u0433\u043E \u0430\u0432\u0442\u0430\u0430\u0440\u0430."),
                createVNode("li", null, "\u041E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430."),
                createVNode("li", null, "\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u0444\u0438\u0448\u0435\u043A \u0432 \u043E\u0431\u0445\u043E\u0434 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430")
              ]),
              createTextVNode(" \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E\u044E \u0434\u0440\u0443\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0430\u0442\u043C\u043E\u0441\u0432\u0435\u0440\u044B, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u0439, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0435\u0441\u0441\u0440\u043E\u0447\u043D\u0443\u044E \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0432 \u0441\u043B\u0443\u0447\u0430\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0445 \u043D\u0430\u0440\u0443\u0449\u0435\u043D\u0438\u0439. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "block_modal",
        ref: block_modal,
        name: "\u0412\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0430",
        imgSrc: "/warning.svg",
        title: "\u0412\u0430\u0448 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D!",
        titleColor: "red",
        haveBtn: true,
        btnText: "\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u043F\u043B\u0435\u043D",
        styleText: { textAlign: "left", fontSize: "17px" },
        styleModal: { height: "760px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: <br${_scopeId}><br${_scopeId}><ol${_scopeId}><li${_scopeId}>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435\u043F\u043E\u0434\u043E\u0431\u0430\u044E\u0449\u0435\u0433\u043E \u0430\u0432\u0442\u0430\u0430\u0440\u0430.</li><li${_scopeId}>\u041E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430.</li><li${_scopeId}>\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u0444\u0438\u0448\u0435\u043A \u0432 \u043E\u0431\u0445\u043E\u0434 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430</li></ol> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E\u044E \u0434\u0440\u0443\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0430\u0442\u043C\u043E\u0441\u0432\u0435\u0440\u044B, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u0439, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0435\u0441\u0441\u0440\u043E\u0447\u043D\u0443\u044E \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0432 \u0441\u043B\u0443\u0447\u0430\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0445 \u043D\u0430\u0440\u0443\u0449\u0435\u043D\u0438\u0439. \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: <br${_scopeId}>`);
          } else {
            return [
              createTextVNode(" \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: "),
              createVNode("br"),
              createVNode("br"),
              createVNode("ol", null, [
                createVNode("li", null, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435\u043F\u043E\u0434\u043E\u0431\u0430\u044E\u0449\u0435\u0433\u043E \u0430\u0432\u0442\u0430\u0430\u0440\u0430."),
                createVNode("li", null, "\u041E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430."),
                createVNode("li", null, "\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u0444\u0438\u0448\u0435\u043A \u0432 \u043E\u0431\u0445\u043E\u0434 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430")
              ]),
              createTextVNode(" \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E\u044E \u0434\u0440\u0443\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0430\u0442\u043C\u043E\u0441\u0432\u0435\u0440\u044B, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u0439, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0435\u0441\u0441\u0440\u043E\u0447\u043D\u0443\u044E \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0432 \u0441\u043B\u0443\u0447\u0430\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0445 \u043D\u0430\u0440\u0443\u0449\u0435\u043D\u0438\u0439. \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: "),
              createVNode("br")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseModal, {
        ref_key: "total_block_modal",
        ref: total_block_modal,
        name: "\u0411\u0435\u0441\u0441\u0440\u043E\u0447\u043D\u0430\u044F \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0430!",
        imgSrc: "/warning.svg",
        title: "\u0412\u0430\u0448 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430!",
        titleColor: "red",
        haveBtn: true,
        btnImg: "/user.svg",
        btnColor: "hsl(220, 100%, 50%)",
        btnText: "\u0412 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443",
        styleText: { textAlign: "left", marginBottom: "40px" },
        styleModal: { height: "fit-content", fontSize: "17px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: <br${_scopeId}><br${_scopeId}><ol${_scopeId}><li${_scopeId}>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435\u043F\u043E\u0434\u043E\u0431\u0430\u044E\u0449\u0435\u0433\u043E \u0430\u0432\u0442\u0430\u0430\u0440\u0430.</li><li${_scopeId}>\u041E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430.</li><li${_scopeId}>\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u0444\u0438\u0448\u0435\u043A \u0432 \u043E\u0431\u0445\u043E\u0434 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430</li></ol> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E\u044E \u0434\u0440\u0443\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439. `);
          } else {
            return [
              createTextVNode(" \u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C: "),
              createVNode("br"),
              createVNode("br"),
              createVNode("ol", null, [
                createVNode("li", null, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435\u043F\u043E\u0434\u043E\u0431\u0430\u044E\u0449\u0435\u0433\u043E \u0430\u0432\u0442\u0430\u0430\u0440\u0430."),
                createVNode("li", null, "\u041E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430."),
                createVNode("li", null, "\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u0444\u0438\u0448\u0435\u043A \u0432 \u043E\u0431\u0445\u043E\u0434 \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430")
              ]),
              createTextVNode(" \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E\u044E \u0434\u0440\u0443\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="wrapper"><div class="wrapper-title">\u041C\u043E\u0434\u0430\u043B\u044C\u043D\u044B\u0435 \u043E\u043A\u043D\u0430:</div><button>\u0421 \u0442\u0430\u0439\u043C\u0435\u0440\u043E\u043C</button><button>\u0414\u0432\u0435 \u043A\u043D\u043E\u043F\u043A\u0438</button><button>C \u0442\u0430\u0439\u043C\u0435\u0440\u043E\u043C \u0438 \u043A\u043D\u043E\u043F\u043A\u043E\u0439</button><button>\u0421 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F</button><button> \u0421 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C\u044E \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \u043F\u043E \u043A\u043B\u0438\u043A\u0443 \u0432\u043D\u0435 \u043E\u043A\u043D\u0430 </button><button>\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0432\u0445\u043E\u0434</button><button>\u0421 \u0444\u0438\u0448\u043A\u0430\u043C\u0438</button><button>\u0415\u0449\u0435 \u0441 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u0444\u0438\u0448\u043A\u0430\u043C</button><button>\u0421 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u043C \u0432\u0432\u043E\u0434\u043E\u043C</button><button>\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043B\u0430\u0439\u0442</button><button>\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043C\u0435\u0434\u0438\u0443\u043C</button><button>\u041A\u043E\u043D\u0435\u0446</button></div><div class="wrapper"><div class="wrapper-title"> \u0411\u0430\u0440\u0430\u0431\u0430\u043D </div>`);
      _push(ssrRenderComponent(_component_UserRatingDrum, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DxxzfNQQ.mjs.map
