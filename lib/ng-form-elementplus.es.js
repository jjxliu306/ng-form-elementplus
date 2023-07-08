var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import require$$0, { resolveComponent, openBlock, createElementBlock, createVNode, createBlock, withCtx, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, normalizeClass, normalizeStyle, defineComponent, mergeProps, renderSlot, createSlots, withModifiers, withDirectives, vShow, resolveDynamicComponent } from "vue";
function cloneDeep(obj2) {
  if (typeof obj2 !== "object")
    return;
  let newObj = obj2 instanceof Array ? [] : {};
  for (let key in obj2) {
    if (typeof obj2[key] === "object") {
      newObj[key] = cloneDeep(obj2[key]);
    } else {
      newObj[key] = obj2[key];
    }
  }
  return newObj;
}
function dynamicFun(script, model, key = "$", row, rowKey) {
  if (!script)
    return false;
  const func = script.indexOf("return") >= 0 ? "{" + script + "}" : "return (" + script + ")";
  if (row && rowKey) {
    const Fn = new Function(key, rowKey, func);
    return Fn(model, row);
  } else {
    const Fn = new Function(key, func);
    return Fn(model);
  }
}
function dynamicVoidFun(script, model, key = "$", row, rowKey) {
  if (!script)
    return false;
  const func = script;
  if (row && rowKey) {
    const Fn = new Function(key, rowKey, func);
    Fn(model, row);
  } else {
    const Fn = new Function(key, func);
    Fn(model);
  }
}
function translateConfig(config = []) {
  const fs = (v) => {
    const formOptions = v.options;
    delete v.options;
    if (formOptions && formOptions.group && formOptions.group.length > 0) {
      formOptions.group.forEach((t) => {
        if (t.label && t.prop && t.default != null && !t.column) {
          v[t.prop] = t.default;
        } else if (t.column) {
          v[t.prop] = {};
          t.column.filter((tf) => tf.prop).forEach((tc) => {
            let jdefault = tc["default"];
            if (jdefault == void 0 || jdefault == null) {
              jdefault = void 0;
            }
            v[t.prop][tc.prop] = jdefault;
          });
        }
      });
    }
    if (formOptions && formOptions.columns && formOptions.columns.length > 0) {
      formOptions.columns.filter((tf) => tf.prop).forEach((tc) => {
        let jdefault = tc["default"];
        if (jdefault == void 0 || jdefault == null) {
          jdefault = void 0;
        }
        v[tc.prop] = jdefault;
      });
    }
  };
  const cloneConfig = cloneDeep(config);
  cloneConfig.map((t) => fs(t));
  return cloneConfig;
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$V = {
  name: "TableItem",
  props: {
    record: {
      type: Object,
      required: true
    },
    preview: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    models: {
      type: Object
    },
    domains: {
      type: Object
    },
    parentModel: {
      type: String,
      required: true
    }
  },
  computed: {
    customList() {
      if (this.$GSFORM && this.$GSFORM.customComponents) {
        const customComponents_ = this.$GSFORM.customComponents;
        return customComponents_.map((item) => item.type);
      } else {
        return [];
      }
    },
    recordRules() {
      if (this.preview || !this.record.rules || this.record.rules.length == 0) {
        return [];
      }
      let rules = this.record.rules;
      const isRequire = rules[0].required;
      for (var i = 0; i < rules.length; i++) {
        const t = rules[i];
        t.required = isRequire;
        if (t.required && (this.record.type == "input" || this.record.type == "textarea")) {
          t.whitespace = true;
        }
        if (t.vtype == 1 || t.vtype == 2) {
          t.validator = this.validatorFiled;
        }
        if (!t.trigger) {
          t.trigger = ["change", "blur"];
        }
      }
      return rules;
    }
  },
  methods: {}
};
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_item = resolveComponent("ng-form-item");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_ng_form_item, {
      disabled: _ctx.disabled,
      preview: $props.preview,
      models: $props.domains,
      record: $props.record,
      "show-label": false,
      "prop-prepend": $props.parentModel + "." + $props.index + ".",
      onFocus: _ctx.handleFocus,
      onBlur: _ctx.handleBlur
    }, null, 8, ["disabled", "preview", "models", "record", "prop-prepend", "onFocus", "onBlur"])
  ]);
}
var TableItem = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$V]]);
const _sfc_main$U = {
  name: "table-add-or-update",
  data() {
    return {
      randomId: "",
      loading: false,
      visible: false,
      dataForm: {
        _id: "",
        seq: 0
      },
      dataRule: {}
    };
  },
  computed: {
    customList() {
      if (this.customComponents) {
        return this.customComponents.map((item) => item.type);
      } else {
        return [];
      }
    }
  },
  props: {
    formTemplate: {
      type: Object,
      default: () => ({})
    },
    preview: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    config: {
      from: "configC",
      default: () => ({})
    }
  },
  methods: {
    recordRules(record) {
      if (this.preview) {
        return [];
      }
      const rules = record.rules;
      for (var i = 0; i < rules.length; i++) {
        const t = rules[i];
        if (t.vtype == 1 || t.vtype == 2) {
          t.validator = this.validatorFiled;
        }
        if (t.required && (record.type == "input" || record.type == "textarea")) {
          t.whitespace = true;
        }
        if (!t.trigger) {
          t.trigger = ["change", "blur"];
        }
      }
      return rules;
    },
    dynamicVisibleItem(record) {
      if (!record.options || !record.options.dynamicVisible) {
        return true;
      }
      if (!record.options.dynamicVisibleValue) {
        return true;
      }
      let fstr = record.options.dynamicVisibleValue;
      const func = dynamicFun(fstr, this.dataForm);
      return func;
    },
    clearHiddenValue() {
      if (!this.config || !this.config.outputHidden) {
        const formdesign = document.getElementById(this.randomId);
        for (let key in this.dataForm) {
          if (key.indexOf("_label") > 0 || key == "_id" || key == "seq")
            continue;
          const key_div = formdesign.querySelector("#" + key);
          if (!key_div) {
            delete this.dataForm[key];
            delete this.dataForm[key + "_label"];
          }
        }
      }
    },
    validatorFiled(rule, value, callback) {
      if (rule.vtype == 1) {
        if (!rule.pattern) {
          callback();
          return;
        }
        var patt1 = new RegExp(rule.pattern);
        if (patt1.test(value)) {
          callback();
        } else {
          callback(new Error(rule.message));
        }
        return;
      } else if (rule.vtype == 2) {
        const script = rule.script;
        const fvalue = dynamicFun(script, this.dataForm);
        if (!fvalue) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
    },
    init(data2) {
      this.randomId = "ng_table_dialog" + new Date().getTime();
      this.visible = true;
      this.dataForm._id = null;
      if (data2) {
        for (var i in data2) {
          this.dataForm[i] = data2[i];
        }
      } else {
        this.dataForm.seq = 0;
        this.formTemplate.list.forEach((item) => {
          if (item.options.defaultValue)
            this.dataForm[item.model] = item.options.defaultValue;
          else
            this.dataForm[item.model] = null;
        });
        this.$nextTick(() => {
          this.$refs["dataForm"] && this.$refs["dataForm"].resetFields();
        });
      }
    },
    dataFormSubmit() {
      this.$refs["dataForm"] && this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.clearHiddenValue();
          if (!this.dataForm._id) {
            const id = new Date().getTime() * 10 + parseInt(Math.random() * 100);
            this.dataForm._id = id;
            this.$emit("formAdd", cloneDeep(this.dataForm));
          } else {
            this.$emit("formUpdate", cloneDeep(this.dataForm));
          }
          this.loading = false;
          this.visible = false;
        }
      });
    }
  }
};
const _hoisted_1$E = { class: "mod-footer" };
const _hoisted_2$p = /* @__PURE__ */ createTextVNode("\u53D6\u6D88");
const _hoisted_3$k = /* @__PURE__ */ createTextVNode("\u786E\u5B9A");
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_item = resolveComponent("ng-form-item");
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");
  return openBlock(), createBlock(_component_el_dialog, {
    title: !$data.dataForm._id ? "\u65B0\u589E" : "\u4FEE\u6539",
    "close-on-click-modal": false,
    "append-to-body": true,
    "lock-scroll": false,
    modelValue: $data.visible,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.visible = $event),
    id: $data.randomId
  }, {
    default: withCtx(() => [
      typeof $props.formTemplate.list !== "undefined" ? (openBlock(), createBlock(_component_el_form, {
        class: "form-build form-design",
        "label-position": $options.config.labelPosition,
        "hide-required-asterisk": $options.config.hideRequiredMark,
        "label-width": $options.config.labelWidth + "px",
        ref: "dataForm",
        model: $data.dataForm,
        size: "small",
        key: $data.dataForm._id
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.formTemplate.list, (item) => {
            return openBlock(), createBlock(_component_ng_form_item, {
              key: item.key,
              disabled: $props.disabled,
              preview: $props.preview,
              models: $data.dataForm,
              record: item,
              onFocus: _ctx.handleFocus,
              onBlur: _ctx.handleBlur
            }, null, 8, ["disabled", "preview", "models", "record", "onFocus", "onBlur"]);
          }), 128)),
          createVNode(_component_el_form_item, {
            label: "\u6392\u5E8F",
            prop: "seq"
          }, {
            default: withCtx(() => [
              $props.preview ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($data.dataForm.seq), 1)
              ], 64)) : (openBlock(), createBlock(_component_el_input_number, {
                key: 1,
                modelValue: $data.dataForm.seq,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.dataForm.seq = $event),
                "controls-position": "right",
                min: 0,
                label: "\u6392\u5E8F\u53F7",
                disabled: $props.preview
              }, null, 8, ["modelValue", "disabled"]))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["label-position", "hide-required-asterisk", "label-width", "model"])) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_1$E, [
        createVNode(_component_el_button, {
          size: "small",
          onClick: _cache[1] || (_cache[1] = ($event) => $data.visible = false)
        }, {
          default: withCtx(() => [
            _hoisted_2$p
          ]),
          _: 1
        }),
        !$props.preview ? (openBlock(), createBlock(_component_el_button, {
          key: 0,
          size: "small",
          disabled: $data.loading,
          type: "primary",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.dataFormSubmit())
        }, {
          default: withCtx(() => [
            _hoisted_3$k
          ]),
          _: 1
        }, 8, ["disabled"])) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["title", "modelValue", "id"]);
}
var AddOrUpdate = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$U]]);
var index_vue_vue_type_style_index_0_lang$c = "";
const _sfc_main$T = {
  name: "ng-form-base-batch",
  components: {
    TableItem,
    AddOrUpdate
  },
  data() {
    return {
      addOrUpdateVisible: false,
      isVisible: true
    };
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    models: {
      type: Object,
      required: true
    },
    parentDisabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disabled() {
      return this.record.options.disabled || this.parentDisabled;
    },
    templateData() {
      return { list: this.record.list, config: this.config };
    },
    controlWidth() {
      let w = 100;
      if (this.preview) {
        return w;
      }
      if (this.record.options.copyRow) {
        w += 80;
      }
      if (this.record.options.addType == "dialog") {
        w += 80;
      }
      return w;
    }
  },
  inject: {
    config: {
      from: "configC",
      default: () => ({})
    }
  },
  mounted() {
    if (!Object.prototype.hasOwnProperty.call(this.models, this.record.model)) {
      this.models[this.record.model] = [];
    }
  },
  methods: {
    validationSubform() {
      return true;
    },
    resetForm() {
      this.$refs.dynamicValidateForm.resetFields();
    },
    removeDomain(index2) {
      this.$confirm(`\u786E\u5B9A\u5220\u9664\u6B64\u6570\u636E?`, "\u63D0\u793A", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(() => {
        let domains = this.models[this.record.model];
        if (domains) {
          if (index2 !== -1) {
            domains.splice(index2, 1);
            this.$message({
              message: "\u5220\u9664\u6210\u529F",
              type: "success",
              duration: 1e3
            });
          }
        }
      });
    },
    updateDomain(data2) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(data2);
      });
    },
    copyDomain(data2, index2) {
      let copyData = __spreadValues({}, data2);
      copyData._id = null;
      if (this.record.options.addType == "dialog") {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(copyData);
        });
      } else {
        this.isVisible = false;
        let domains = this.models[this.record.model];
        domains.splice(index2 + 1, 0, copyData);
        this.isVisible = true;
      }
    },
    addDomain() {
      if (this.record.options.addType == "dialog") {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init();
        });
      } else {
        this.isVisible = false;
        const items = this.record.list;
        const itemObject = {};
        items.forEach((t) => {
          itemObject[t.model] = "";
        });
        let domains = this.models[this.record.model];
        if (!domains) {
          const ds = [itemObject];
          domains = ds;
        } else {
          domains.push(itemObject);
        }
        this.models[this.record.model] = domains;
        this.isVisible = true;
      }
    },
    formAdd(form) {
      this.isVisible = false;
      let domains = this.models[this.record.model];
      if (!domains) {
        const ds = [form];
        this.models[this.record.model] = ds;
        domains = this.models[this.record.model];
      } else {
        domains.push(form);
      }
      domains.sort(function(a, b) {
        return a.seq - b.seq;
      });
      this.isVisible = true;
      this.$message({
        message: "\u6DFB\u52A0\u6210\u529F",
        type: "success",
        duration: 1e3
      });
    },
    formUpdate(form) {
      this.models[this.record.model];
      for (var i in this.models[this.record.model]) {
        if (this.models[this.record.model][i]._id == form._id) {
          this.models[this.record.model].splice(i, 1, form);
          break;
        }
      }
      this.models[this.record.model].sort(function(a, b) {
        return a.seq - b.seq;
      });
      this.$message({
        message: "\u66F4\u65B0\u6210\u529F",
        type: "success",
        duration: 1e3
      });
    },
    handleInput() {
      this.$emit("change", this.models);
    }
  }
};
const _hoisted_1$D = ["id", "name"];
const _hoisted_2$o = /* @__PURE__ */ createTextVNode(" \u67E5\u770B ");
const _hoisted_3$j = /* @__PURE__ */ createTextVNode(" \u4FEE\u6539 ");
const _hoisted_4$f = /* @__PURE__ */ createTextVNode(" \u590D\u5236 ");
const _hoisted_5$e = /* @__PURE__ */ createTextVNode(" \u5220\u9664 ");
const _hoisted_6$c = /* @__PURE__ */ createTextVNode("\u65B0\u589E ");
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_TableItem = resolveComponent("TableItem");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_table = resolveComponent("el-table");
  const _component_CirclePlusFilled = resolveComponent("CirclePlusFilled");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_AddOrUpdate = resolveComponent("AddOrUpdate");
  return openBlock(), createElementBlock("div", {
    id: $props.record.model,
    name: $props.record.model,
    class: "form-table-index"
  }, [
    createVNode(_component_el_table, {
      class: normalizeClass([
        "form-table",
        $props.record.options.customClass ? $props.record.options.customClass : ""
      ]),
      size: $options.config.size,
      style: normalizeStyle($props.record.options.customStyle),
      "empty-text": $props.record.options.noDataText || "\u6682\u65E0\u6570\u636E",
      data: $props.models[$props.record.model],
      border: $props.record.options.showBorder,
      scroll: {
        x: $props.record.list.length * 190 + 80 + (!$props.record.options.hideSequence ? 60 : 0),
        y: $props.record.options.scrollY
      }
    }, {
      default: withCtx(() => [
        $data.isVisible ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          !$props.record.options.hideSequence ? (openBlock(), createBlock(_component_el_table_column, {
            key: 0,
            label: "\u5E8F\u53F7",
            align: "center",
            type: "index",
            width: "50"
          })) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.record.list, (item, index2) => {
            return openBlock(), createElementBlock(Fragment, null, [
              $props.record.options.addType != "dialog" || (!$props.record.options.showItem || $props.record.options.showItem.length == 0 || $props.record.options.showItem.includes(item.model)) ? (openBlock(), createBlock(_component_el_table_column, {
                key: index2,
                label: item.label,
                width: $props.record.options.colWidth && $props.record.options.colWidth[item.model] ? $props.record.options.colWidth[item.model] : void 0,
                align: "center"
              }, {
                default: withCtx((scope) => [
                  createVNode(_component_TableItem, {
                    record: item,
                    index: scope.$index,
                    models: $props.models,
                    "parent-model": $props.record.model,
                    preview: $props.preview || $props.record.options.addType == "dialog",
                    domains: $props.models[$props.record.model][scope.$index]
                  }, null, 8, ["record", "index", "models", "parent-model", "preview", "domains"])
                ]),
                _: 2
              }, 1032, ["label", "width"])) : createCommentVNode("", true)
            ], 64);
          }), 256)),
          !$props.preview || $props.record.options.addType == "dialog" ? (openBlock(), createBlock(_component_el_table_column, {
            key: 1,
            label: "\u64CD\u4F5C",
            align: "center",
            width: $options.controlWidth
          }, {
            default: withCtx((scope) => [
              $props.preview && $props.record.options.addType == "dialog" ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "text",
                text: "",
                class: "ng-form-btn-view",
                size: $options.config.size,
                onClick: ($event) => $options.updateDomain(scope.row)
              }, {
                default: withCtx(() => [
                  _hoisted_2$o
                ]),
                _: 2
              }, 1032, ["size", "onClick"])) : createCommentVNode("", true),
              !$props.preview && $props.record.options.addType == "dialog" ? (openBlock(), createBlock(_component_el_button, {
                key: 1,
                type: "text",
                text: "",
                class: "ng-form-btn-view",
                size: $options.config.size,
                onClick: ($event) => $options.updateDomain(scope.row)
              }, {
                default: withCtx(() => [
                  _hoisted_3$j
                ]),
                _: 2
              }, 1032, ["size", "onClick"])) : createCommentVNode("", true),
              !$props.preview && $props.record.options.copyRow ? (openBlock(), createBlock(_component_el_button, {
                key: 2,
                type: "text",
                text: "",
                class: "ng-form-btn-view",
                size: $options.config.size,
                onClick: ($event) => $options.copyDomain(scope.row, scope.$index)
              }, {
                default: withCtx(() => [
                  _hoisted_4$f
                ]),
                _: 2
              }, 1032, ["size", "onClick"])) : createCommentVNode("", true),
              !$props.preview ? (openBlock(), createBlock(_component_el_button, {
                key: 3,
                type: "text",
                text: "",
                class: "ng-form-btn-del",
                size: $options.config.size,
                onClick: ($event) => $options.removeDomain(scope.$index)
              }, {
                default: withCtx(() => [
                  _hoisted_5$e
                ]),
                _: 2
              }, 1032, ["size", "onClick"])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["width"])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["class", "size", "style", "empty-text", "data", "border", "scroll"]),
    !$props.preview ? (openBlock(), createBlock(_component_el_button, {
      key: 0,
      size: $options.config.size,
      type: "dashed",
      disabled: $options.disabled,
      onClick: $options.addDomain
    }, {
      default: withCtx(() => [
        createVNode(_component_el_icon, null, {
          default: withCtx(() => [
            createVNode(_component_CirclePlusFilled)
          ]),
          _: 1
        }),
        _hoisted_6$c
      ]),
      _: 1
    }, 8, ["size", "disabled", "onClick"])) : createCommentVNode("", true),
    $data.addOrUpdateVisible ? (openBlock(), createBlock(_component_AddOrUpdate, {
      key: 1,
      ref: "addOrUpdate",
      formTemplate: $options.templateData,
      preview: $props.preview,
      onFormAdd: $options.formAdd,
      onFormUpdate: $options.formUpdate
    }, null, 8, ["formTemplate", "preview", "onFormAdd", "onFormUpdate"])) : createCommentVNode("", true)
  ], 8, _hoisted_1$D);
}
var TableBuild = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$T]]);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var vuedraggable_umd = { exports: {} };
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source2 = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source2), true).forEach(function(key) {
        _defineProperty(target, key, source2[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys(Object(source2)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
      });
    }
  }
  return target;
}
function _typeof(obj2) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj3) {
      return typeof obj3;
    };
  } else {
    _typeof = function(obj3) {
      return obj3 && typeof Symbol === "function" && obj3.constructor === Symbol && obj3 !== Symbol.prototype ? "symbol" : typeof obj3;
    };
  }
  return _typeof(obj2);
}
function _defineProperty(obj2, key, value) {
  if (key in obj2) {
    Object.defineProperty(obj2, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj2[key] = value;
  }
  return obj2;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source2 = arguments[i];
      for (var key in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key)) {
          target[key] = source2[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source2, excluded) {
  if (source2 == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source2);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source2[key];
  }
  return target;
}
function _objectWithoutProperties(source2, excluded) {
  if (source2 == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source2, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source2);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source2, key))
        continue;
      target[key] = source2[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var version = "1.14.0";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector)
    return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx)
        break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, "transform");
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list2 = ctx.getElementsByTagName(tagName), i = 0, n = list2.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list2[i], i);
      }
    }
    return list2;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window)
    return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    if (parentSide === "top" || parentSide === "left") {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible)
      return parent;
    if (parent === getWindowScrollingElement())
      break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj2) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i))
      continue;
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key) && obj2[key] === arr[i][key])
        return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect)
    return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body)
          return getWindowScrollingElement();
        if (gotSelf || includeSelf)
          return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend$1(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function setRect(el, rect) {
  css(el, "position", "absolute");
  css(el, "top", rect.top);
  css(el, "left", rect.left);
  css(el, "width", rect.width);
  css(el, "height", rect.height);
}
function unsetRect(el) {
  css(el, "position", "");
  css(el, "top", "");
  css(el, "left", "");
  css(el, "width", "");
  css(el, "height", "");
}
var expando = "Sortable" + new Date().getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation)
        return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost)
          return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function")
          callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state) {
        var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function")
          callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function")
            callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults$4 = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults$4) {
      if (defaults$4.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults$4[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName])
        return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault)
        return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2))
        continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function")
        return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName])
        return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable)
    return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data2 = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data2));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (!documentExists)
    return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
}(), _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
}, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable))
      return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
}, _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
}, _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
}, _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    invertSwap: false,
    invertedSwapThreshold: null,
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = {
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable)
      return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mouseup", _this._onDrop);
      on(ownerDocument, "touchend", _this._onDrop);
      on(ownerDocument, "touchcancel", _this._onDrop);
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(ownerDocument, "mouseup", _this._disableDelayedDrag);
        on(ownerDocument, "touchend", _this._disableDelayedDrag);
        on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent)
          break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document)
            ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled)
        return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent)
      return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled)
      return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled)
        return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled)
        return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend$1,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array)
    plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils)
      Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted2(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll)
    return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval(function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent)
    return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
var lastSwapEl;
function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  Swap.prototype = {
    dragStart: function dragStart2(_ref) {
      var dragEl2 = _ref.dragEl;
      lastSwapEl = dragEl2;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed, target = _ref2.target, onMove = _ref2.onMove, activeSortable = _ref2.activeSortable, changed = _ref2.changed, cancel = _ref2.cancel;
      if (!activeSortable.options.swap)
        return;
      var el = this.sortable.el, options = this.options;
      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;
        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }
        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }
      changed();
      completed(true);
      cancel();
    },
    drop: function drop3(_ref3) {
      var activeSortable = _ref3.activeSortable, putSortable2 = _ref3.putSortable, dragEl2 = _ref3.dragEl;
      var toSortable = putSortable2 || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
      if (lastSwapEl && (options.swap || putSortable2 && putSortable2.options.swap)) {
        if (dragEl2 !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable)
            activeSortable.captureAnimationState();
          swapNodes(dragEl2, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable)
            activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: "swap",
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(n1, n2) {
  var p1 = n1.parentNode, p2 = n2.parentNode, i1, i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1))
    return;
  i1 = index(n1);
  i2 = index(n2);
  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}
var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = false, folding = false, dragStarted = false, dragEl$1, clonesFromRect, clonesHidden;
function MultiDragPlugin() {
  function MultiDrag(sortable) {
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    if (sortable.options.supportPointer) {
      on(document, "pointerup", this._deselectMultiDrag);
    } else {
      on(document, "mouseup", this._deselectMultiDrag);
      on(document, "touchend", this._deselectMultiDrag);
    }
    on(document, "keydown", this._checkKeyDown);
    on(document, "keyup", this._checkKeyUp);
    this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl2) {
        var data2 = "";
        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function(multiDragElement, i) {
            data2 += (!i ? "" : ", ") + multiDragElement.textContent;
          });
        } else {
          data2 = dragEl2.textContent;
        }
        dataTransfer.setData("Text", data2);
      }
    };
  }
  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable, cancel = _ref2.cancel;
      if (!this.isMultiDrag)
        return;
      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style["will-change"] = "";
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }
      sortable._hideClone();
      cancel();
    },
    clone: function clone2(_ref3) {
      var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
      if (!this.isMultiDrag)
        return;
      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl2);
          dispatchSortableEvent("clone");
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
      if (!this.isMultiDrag)
        return;
      insertMultiDragClones(false, rootEl2);
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "");
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;
      _ref5.sortable;
      var cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
      if (!this.isMultiDrag)
        return;
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "none");
        if (_this.options.removeCloneOnHide && clone2.parentNode) {
          clone2.parentNode.removeChild(clone2);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      _ref6.sortable;
      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      });
      multiDragElements = multiDragElements.sort(function(a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted2(_ref7) {
      var _this2 = this;
      var sortable = _ref7.sortable;
      if (!this.isMultiDrag)
        return;
      if (this.options.sort) {
        sortable.captureAnimationState();
        if (this.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1)
              return;
            css(multiDragElement, "position", "absolute");
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1)
              return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }
      sortable.animateAll(function() {
        folding = false;
        initialFolding = false;
        if (_this2.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
        }
        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
      if (multiDragElements.length > 1) {
        multiDragElements.forEach(function(multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
      var options = this.options;
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        }
        initialFolding = false;
        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1)
              return;
            setRect(multiDragElement, dragRectAbsolute);
            parentEl2.appendChild(multiDragElement);
          });
          folding = true;
        }
        if (!isOwner) {
          if (!folding) {
            removeMultiDragElements();
          }
          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;
            activeSortable._showClone(sortable);
            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function(clone2) {
                activeSortable.addAnimationState({
                  target: clone2,
                  rect: clonesFromRect
                });
                clone2.fromRect = clonesFromRect;
                clone2.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });
      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop3(_ref12) {
      var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
      var toSortable = putSortable2 || this.sortable;
      if (!evt)
        return;
      var options = this.options, children = parentEl2.children;
      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }
        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "select",
            targetEl: dragEl$1,
            originalEvt: evt
          });
          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              var n, i;
              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }
              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i]))
                  continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable,
                  rootEl: rootEl2,
                  name: "select",
                  targetEl: children[i],
                  originalEvt: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }
          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "deselect",
            targetEl: dragEl$1,
            originalEvt: evt
          });
        }
      }
      if (dragStarted && this.isMultiDrag) {
        folding = false;
        if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
          if (!initialFolding && options.animation)
            dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();
          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function(multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect;
                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect
                  });
                }
              });
            }
            removeMultiDragElements();
            multiDragElements.forEach(function(multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl2.appendChild(multiDragElement);
              }
              multiDragIndex++;
            });
            if (oldIndex2 === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function(multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });
              if (update) {
                dispatchSortableEvent("update");
              }
            }
          }
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }
        multiDragSortable = toSortable;
      }
      if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
        multiDragClones.forEach(function(clone2) {
          clone2.parentNode && clone2.parentNode.removeChild(clone2);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();
      off(document, "pointerup", this._deselectMultiDrag);
      off(document, "mouseup", this._deselectMultiDrag);
      off(document, "touchend", this._deselectMultiDrag);
      off(document, "keydown", this._checkKeyDown);
      off(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted)
        return;
      if (multiDragSortable !== this.sortable)
        return;
      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false))
        return;
      if (evt && evt.button !== 0)
        return;
      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: "deselect",
          targetEl: el,
          originalEvt: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    pluginName: "multiDrag",
    utils: {
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el))
          return;
        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
          multiDragSortable = sortable;
        }
        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index2)
          return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index2, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;
      var oldIndicies = [], newIndicies = [];
      multiDragElements.forEach(function(multiDragElement) {
        oldIndicies.push({
          multiDragElement,
          index: multiDragElement.sortableIndex
        });
        var newIndex2;
        if (folding && multiDragElement !== dragEl$1) {
          newIndex2 = -1;
        } else if (folding) {
          newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
        } else {
          newIndex2 = index(multiDragElement);
        }
        newIndicies.push({
          multiDragElement,
          index: newIndex2
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies,
        newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();
        if (key === "ctrl") {
          key = "Control";
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }
        return key;
      }
    }
  });
}
function insertMultiDragElements(clonesInserted, rootEl2) {
  multiDragElements.forEach(function(multiDragElement, i) {
    var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(multiDragElement, target);
    } else {
      rootEl2.appendChild(multiDragElement);
    }
  });
}
function insertMultiDragClones(elementsInserted, rootEl2) {
  multiDragClones.forEach(function(clone2, i) {
    var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(clone2, target);
    } else {
      rootEl2.appendChild(clone2);
    }
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function(multiDragElement) {
    if (multiDragElement === dragEl$1)
      return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
var sortable_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Sortable,
  MultiDrag: MultiDragPlugin,
  Sortable,
  Swap: SwapPlugin
}, Symbol.toStringTag, { value: "Module" }));
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(sortable_esm);
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory(require$$0, require$$1);
  })(typeof self !== "undefined" ? self : commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a352__) {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = /* @__PURE__ */ Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? function getDefault() {
          return module2["default"];
        } : function getModuleExports() {
          return module2;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = "fb15");
    }({
      "00ee": function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__("b622");
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var test = {};
        test[TO_STRING_TAG] = "z";
        module2.exports = String(test) === "[object z]";
      },
      "0366": function(module2, exports2, __webpack_require__) {
        var aFunction = __webpack_require__("1c0b");
        module2.exports = function(fn, that, length) {
          aFunction(fn);
          if (that === void 0)
            return fn;
          switch (length) {
            case 0:
              return function() {
                return fn.call(that);
              };
            case 1:
              return function(a) {
                return fn.call(that, a);
              };
            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };
            case 3:
              return function(a, b, c) {
                return fn.call(that, a, b, c);
              };
          }
          return function() {
            return fn.apply(that, arguments);
          };
        };
      },
      "057f": function(module2, exports2, __webpack_require__) {
        var toIndexedObject = __webpack_require__("fc6a");
        var nativeGetOwnPropertyNames = __webpack_require__("241c").f;
        var toString2 = {}.toString;
        var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        var getWindowNames = function(it) {
          try {
            return nativeGetOwnPropertyNames(it);
          } catch (error) {
            return windowNames.slice();
          }
        };
        module2.exports.f = function getOwnPropertyNames(it) {
          return windowNames && toString2.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
        };
      },
      "06cf": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var propertyIsEnumerableModule = __webpack_require__("d1e7");
        var createPropertyDescriptor = __webpack_require__("5c6c");
        var toIndexedObject = __webpack_require__("fc6a");
        var toPrimitive = __webpack_require__("c04e");
        var has = __webpack_require__("5135");
        var IE8_DOM_DEFINE = __webpack_require__("0cfb");
        var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        exports2.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
          O = toIndexedObject(O);
          P = toPrimitive(P, true);
          if (IE8_DOM_DEFINE)
            try {
              return nativeGetOwnPropertyDescriptor(O, P);
            } catch (error) {
            }
          if (has(O, P))
            return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
        };
      },
      "0cfb": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var fails = __webpack_require__("d039");
        var createElement = __webpack_require__("cc12");
        module2.exports = !DESCRIPTORS && !fails(function() {
          return Object.defineProperty(createElement("div"), "a", {
            get: function() {
              return 7;
            }
          }).a != 7;
        });
      },
      "13d5": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $reduce = __webpack_require__("d58f").left;
        var arrayMethodIsStrict = __webpack_require__("a640");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var STRICT_METHOD = arrayMethodIsStrict("reduce");
        var USES_TO_LENGTH = arrayMethodUsesToLength("reduce", { 1: 0 });
        $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
          reduce: function reduce(callbackfn) {
            return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "14c3": function(module2, exports2, __webpack_require__) {
        var classof = __webpack_require__("c6b6");
        var regexpExec = __webpack_require__("9263");
        module2.exports = function(R, S) {
          var exec = R.exec;
          if (typeof exec === "function") {
            var result = exec.call(R, S);
            if (typeof result !== "object") {
              throw TypeError("RegExp exec method returned something other than an Object or null");
            }
            return result;
          }
          if (classof(R) !== "RegExp") {
            throw TypeError("RegExp#exec called on incompatible receiver");
          }
          return regexpExec.call(R, S);
        };
      },
      "159b": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var DOMIterables = __webpack_require__("fdbc");
        var forEach3 = __webpack_require__("17c2");
        var createNonEnumerableProperty = __webpack_require__("9112");
        for (var COLLECTION_NAME in DOMIterables) {
          var Collection = global2[COLLECTION_NAME];
          var CollectionPrototype = Collection && Collection.prototype;
          if (CollectionPrototype && CollectionPrototype.forEach !== forEach3)
            try {
              createNonEnumerableProperty(CollectionPrototype, "forEach", forEach3);
            } catch (error) {
              CollectionPrototype.forEach = forEach3;
            }
        }
      },
      "17c2": function(module2, exports2, __webpack_require__) {
        var $forEach = __webpack_require__("b727").forEach;
        var arrayMethodIsStrict = __webpack_require__("a640");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var STRICT_METHOD = arrayMethodIsStrict("forEach");
        var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
        module2.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach3(callbackfn) {
          return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        } : [].forEach;
      },
      "1be4": function(module2, exports2, __webpack_require__) {
        var getBuiltIn = __webpack_require__("d066");
        module2.exports = getBuiltIn("document", "documentElement");
      },
      "1c0b": function(module2, exports2) {
        module2.exports = function(it) {
          if (typeof it != "function") {
            throw TypeError(String(it) + " is not a function");
          }
          return it;
        };
      },
      "1c7e": function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__("b622");
        var ITERATOR = wellKnownSymbol("iterator");
        var SAFE_CLOSING = false;
        try {
          var called = 0;
          var iteratorWithReturn = {
            next: function() {
              return { done: !!called++ };
            },
            "return": function() {
              SAFE_CLOSING = true;
            }
          };
          iteratorWithReturn[ITERATOR] = function() {
            return this;
          };
          Array.from(iteratorWithReturn, function() {
            throw 2;
          });
        } catch (error) {
        }
        module2.exports = function(exec, SKIP_CLOSING) {
          if (!SKIP_CLOSING && !SAFE_CLOSING)
            return false;
          var ITERATION_SUPPORT = false;
          try {
            var object = {};
            object[ITERATOR] = function() {
              return {
                next: function() {
                  return { done: ITERATION_SUPPORT = true };
                }
              };
            };
            exec(object);
          } catch (error) {
          }
          return ITERATION_SUPPORT;
        };
      },
      "1d80": function(module2, exports2) {
        module2.exports = function(it) {
          if (it == void 0)
            throw TypeError("Can't call method on " + it);
          return it;
        };
      },
      "1dde": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        var wellKnownSymbol = __webpack_require__("b622");
        var V8_VERSION = __webpack_require__("2d00");
        var SPECIES = wellKnownSymbol("species");
        module2.exports = function(METHOD_NAME) {
          return V8_VERSION >= 51 || !fails(function() {
            var array = [];
            var constructor = array.constructor = {};
            constructor[SPECIES] = function() {
              return { foo: 1 };
            };
            return array[METHOD_NAME](Boolean).foo !== 1;
          });
        };
      },
      "23cb": function(module2, exports2, __webpack_require__) {
        var toInteger = __webpack_require__("a691");
        var max = Math.max;
        var min = Math.min;
        module2.exports = function(index2, length) {
          var integer = toInteger(index2);
          return integer < 0 ? max(integer + length, 0) : min(integer, length);
        };
      },
      "23e7": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
        var createNonEnumerableProperty = __webpack_require__("9112");
        var redefine = __webpack_require__("6eeb");
        var setGlobal = __webpack_require__("ce4e");
        var copyConstructorProperties = __webpack_require__("e893");
        var isForced = __webpack_require__("94ca");
        module2.exports = function(options, source2) {
          var TARGET = options.target;
          var GLOBAL = options.global;
          var STATIC = options.stat;
          var FORCED, target, key, targetProperty, sourceProperty, descriptor;
          if (GLOBAL) {
            target = global2;
          } else if (STATIC) {
            target = global2[TARGET] || setGlobal(TARGET, {});
          } else {
            target = (global2[TARGET] || {}).prototype;
          }
          if (target)
            for (key in source2) {
              sourceProperty = source2[key];
              if (options.noTargetGet) {
                descriptor = getOwnPropertyDescriptor(target, key);
                targetProperty = descriptor && descriptor.value;
              } else
                targetProperty = target[key];
              FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
              if (!FORCED && targetProperty !== void 0) {
                if (typeof sourceProperty === typeof targetProperty)
                  continue;
                copyConstructorProperties(sourceProperty, targetProperty);
              }
              if (options.sham || targetProperty && targetProperty.sham) {
                createNonEnumerableProperty(sourceProperty, "sham", true);
              }
              redefine(target, key, sourceProperty, options);
            }
        };
      },
      "241c": function(module2, exports2, __webpack_require__) {
        var internalObjectKeys = __webpack_require__("ca84");
        var enumBugKeys = __webpack_require__("7839");
        var hiddenKeys = enumBugKeys.concat("length", "prototype");
        exports2.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
          return internalObjectKeys(O, hiddenKeys);
        };
      },
      "25f0": function(module2, exports2, __webpack_require__) {
        var redefine = __webpack_require__("6eeb");
        var anObject = __webpack_require__("825a");
        var fails = __webpack_require__("d039");
        var flags = __webpack_require__("ad6d");
        var TO_STRING = "toString";
        var RegExpPrototype = RegExp.prototype;
        var nativeToString = RegExpPrototype[TO_STRING];
        var NOT_GENERIC = fails(function() {
          return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
        });
        var INCORRECT_NAME = nativeToString.name != TO_STRING;
        if (NOT_GENERIC || INCORRECT_NAME) {
          redefine(RegExp.prototype, TO_STRING, function toString2() {
            var R = anObject(this);
            var p = String(R.source);
            var rf = R.flags;
            var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
            return "/" + p + "/" + f;
          }, { unsafe: true });
        }
      },
      "2ca0": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
        var toLength = __webpack_require__("50c4");
        var notARegExp = __webpack_require__("5a34");
        var requireObjectCoercible = __webpack_require__("1d80");
        var correctIsRegExpLogic = __webpack_require__("ab13");
        var IS_PURE = __webpack_require__("c430");
        var nativeStartsWith = "".startsWith;
        var min = Math.min;
        var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
        var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
          var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
          return descriptor && !descriptor.writable;
        }();
        $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
          startsWith: function startsWith(searchString) {
            var that = String(requireObjectCoercible(this));
            notARegExp(searchString);
            var index2 = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
            var search = String(searchString);
            return nativeStartsWith ? nativeStartsWith.call(that, search, index2) : that.slice(index2, index2 + search.length) === search;
          }
        });
      },
      "2d00": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var userAgent2 = __webpack_require__("342f");
        var process2 = global2.process;
        var versions = process2 && process2.versions;
        var v8 = versions && versions.v8;
        var match, version2;
        if (v8) {
          match = v8.split(".");
          version2 = match[0] + match[1];
        } else if (userAgent2) {
          match = userAgent2.match(/Edge\/(\d+)/);
          if (!match || match[1] >= 74) {
            match = userAgent2.match(/Chrome\/(\d+)/);
            if (match)
              version2 = match[1];
          }
        }
        module2.exports = version2 && +version2;
      },
      "342f": function(module2, exports2, __webpack_require__) {
        var getBuiltIn = __webpack_require__("d066");
        module2.exports = getBuiltIn("navigator", "userAgent") || "";
      },
      "35a1": function(module2, exports2, __webpack_require__) {
        var classof = __webpack_require__("f5df");
        var Iterators = __webpack_require__("3f8c");
        var wellKnownSymbol = __webpack_require__("b622");
        var ITERATOR = wellKnownSymbol("iterator");
        module2.exports = function(it) {
          if (it != void 0)
            return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
      },
      "37e8": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var definePropertyModule = __webpack_require__("9bf2");
        var anObject = __webpack_require__("825a");
        var objectKeys = __webpack_require__("df75");
        module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
          anObject(O);
          var keys = objectKeys(Properties);
          var length = keys.length;
          var index2 = 0;
          var key;
          while (length > index2)
            definePropertyModule.f(O, key = keys[index2++], Properties[key]);
          return O;
        };
      },
      "3bbe": function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__("861d");
        module2.exports = function(it) {
          if (!isObject2(it) && it !== null) {
            throw TypeError("Can't set " + String(it) + " as a prototype");
          }
          return it;
        };
      },
      "3ca3": function(module2, exports2, __webpack_require__) {
        var charAt = __webpack_require__("6547").charAt;
        var InternalStateModule = __webpack_require__("69f3");
        var defineIterator = __webpack_require__("7dd0");
        var STRING_ITERATOR = "String Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
        defineIterator(String, "String", function(iterated) {
          setInternalState(this, {
            type: STRING_ITERATOR,
            string: String(iterated),
            index: 0
          });
        }, function next() {
          var state = getInternalState(this);
          var string = state.string;
          var index2 = state.index;
          var point;
          if (index2 >= string.length)
            return { value: void 0, done: true };
          point = charAt(string, index2);
          state.index += point.length;
          return { value: point, done: false };
        });
      },
      "3f8c": function(module2, exports2) {
        module2.exports = {};
      },
      "4160": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var forEach3 = __webpack_require__("17c2");
        $({ target: "Array", proto: true, forced: [].forEach != forEach3 }, {
          forEach: forEach3
        });
      },
      "428f": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        module2.exports = global2;
      },
      "44ad": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        var classof = __webpack_require__("c6b6");
        var split = "".split;
        module2.exports = fails(function() {
          return !Object("z").propertyIsEnumerable(0);
        }) ? function(it) {
          return classof(it) == "String" ? split.call(it, "") : Object(it);
        } : Object;
      },
      "44d2": function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__("b622");
        var create = __webpack_require__("7c73");
        var definePropertyModule = __webpack_require__("9bf2");
        var UNSCOPABLES = wellKnownSymbol("unscopables");
        var ArrayPrototype = Array.prototype;
        if (ArrayPrototype[UNSCOPABLES] == void 0) {
          definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
            configurable: true,
            value: create(null)
          });
        }
        module2.exports = function(key) {
          ArrayPrototype[UNSCOPABLES][key] = true;
        };
      },
      "44e7": function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__("861d");
        var classof = __webpack_require__("c6b6");
        var wellKnownSymbol = __webpack_require__("b622");
        var MATCH = wellKnownSymbol("match");
        module2.exports = function(it) {
          var isRegExp;
          return isObject2(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
        };
      },
      "4930": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
          return !String(Symbol());
        });
      },
      "4d64": function(module2, exports2, __webpack_require__) {
        var toIndexedObject = __webpack_require__("fc6a");
        var toLength = __webpack_require__("50c4");
        var toAbsoluteIndex = __webpack_require__("23cb");
        var createMethod = function(IS_INCLUDES) {
          return function($this, el, fromIndex) {
            var O = toIndexedObject($this);
            var length = toLength(O.length);
            var index2 = toAbsoluteIndex(fromIndex, length);
            var value;
            if (IS_INCLUDES && el != el)
              while (length > index2) {
                value = O[index2++];
                if (value != value)
                  return true;
              }
            else
              for (; length > index2; index2++) {
                if ((IS_INCLUDES || index2 in O) && O[index2] === el)
                  return IS_INCLUDES || index2 || 0;
              }
            return !IS_INCLUDES && -1;
          };
        };
        module2.exports = {
          includes: createMethod(true),
          indexOf: createMethod(false)
        };
      },
      "4de4": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $filter = __webpack_require__("b727").filter;
        var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
        var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          filter: function filter(callbackfn) {
            return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "4df4": function(module2, exports2, __webpack_require__) {
        var bind3 = __webpack_require__("0366");
        var toObject = __webpack_require__("7b0b");
        var callWithSafeIterationClosing = __webpack_require__("9bdd");
        var isArrayIteratorMethod = __webpack_require__("e95a");
        var toLength = __webpack_require__("50c4");
        var createProperty = __webpack_require__("8418");
        var getIteratorMethod = __webpack_require__("35a1");
        module2.exports = function from(arrayLike) {
          var O = toObject(arrayLike);
          var C = typeof this == "function" ? this : Array;
          var argumentsLength = arguments.length;
          var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
          var mapping = mapfn !== void 0;
          var iteratorMethod = getIteratorMethod(O);
          var index2 = 0;
          var length, result, step, iterator, next, value;
          if (mapping)
            mapfn = bind3(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
          if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
            iterator = iteratorMethod.call(O);
            next = iterator.next;
            result = new C();
            for (; !(step = next.call(iterator)).done; index2++) {
              value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index2], true) : step.value;
              createProperty(result, index2, value);
            }
          } else {
            length = toLength(O.length);
            result = new C(length);
            for (; length > index2; index2++) {
              value = mapping ? mapfn(O[index2], index2) : O[index2];
              createProperty(result, index2, value);
            }
          }
          result.length = index2;
          return result;
        };
      },
      "4fad": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $entries = __webpack_require__("6f53").entries;
        $({ target: "Object", stat: true }, {
          entries: function entries(O) {
            return $entries(O);
          }
        });
      },
      "50c4": function(module2, exports2, __webpack_require__) {
        var toInteger = __webpack_require__("a691");
        var min = Math.min;
        module2.exports = function(argument) {
          return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
        };
      },
      "5135": function(module2, exports2) {
        var hasOwnProperty = {}.hasOwnProperty;
        module2.exports = function(it, key) {
          return hasOwnProperty.call(it, key);
        };
      },
      "5319": function(module2, exports2, __webpack_require__) {
        var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
        var anObject = __webpack_require__("825a");
        var toObject = __webpack_require__("7b0b");
        var toLength = __webpack_require__("50c4");
        var toInteger = __webpack_require__("a691");
        var requireObjectCoercible = __webpack_require__("1d80");
        var advanceStringIndex = __webpack_require__("8aa5");
        var regExpExec = __webpack_require__("14c3");
        var max = Math.max;
        var min = Math.min;
        var floor = Math.floor;
        var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
        var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
        var maybeToString = function(it) {
          return it === void 0 ? it : String(it);
        };
        fixRegExpWellKnownSymbolLogic("replace", 2, function(REPLACE, nativeReplace, maybeCallNative, reason) {
          var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
          var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
          var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
          return [
            function replace(searchValue, replaceValue) {
              var O = requireObjectCoercible(this);
              var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
              return replacer !== void 0 ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
            },
            function(regexp, replaceValue) {
              if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
                var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
                if (res.done)
                  return res.value;
              }
              var rx = anObject(regexp);
              var S = String(this);
              var functionalReplace = typeof replaceValue === "function";
              if (!functionalReplace)
                replaceValue = String(replaceValue);
              var global2 = rx.global;
              if (global2) {
                var fullUnicode = rx.unicode;
                rx.lastIndex = 0;
              }
              var results = [];
              while (true) {
                var result = regExpExec(rx, S);
                if (result === null)
                  break;
                results.push(result);
                if (!global2)
                  break;
                var matchStr = String(result[0]);
                if (matchStr === "")
                  rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
              }
              var accumulatedResult = "";
              var nextSourcePosition = 0;
              for (var i = 0; i < results.length; i++) {
                result = results[i];
                var matched = String(result[0]);
                var position = max(min(toInteger(result.index), S.length), 0);
                var captures = [];
                for (var j = 1; j < result.length; j++)
                  captures.push(maybeToString(result[j]));
                var namedCaptures = result.groups;
                if (functionalReplace) {
                  var replacerArgs = [matched].concat(captures, position, S);
                  if (namedCaptures !== void 0)
                    replacerArgs.push(namedCaptures);
                  var replacement = String(replaceValue.apply(void 0, replacerArgs));
                } else {
                  replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                }
                if (position >= nextSourcePosition) {
                  accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                  nextSourcePosition = position + matched.length;
                }
              }
              return accumulatedResult + S.slice(nextSourcePosition);
            }
          ];
          function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
            var tailPos = position + matched.length;
            var m = captures.length;
            var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
            if (namedCaptures !== void 0) {
              namedCaptures = toObject(namedCaptures);
              symbols = SUBSTITUTION_SYMBOLS;
            }
            return nativeReplace.call(replacement, symbols, function(match, ch) {
              var capture;
              switch (ch.charAt(0)) {
                case "$":
                  return "$";
                case "&":
                  return matched;
                case "`":
                  return str.slice(0, position);
                case "'":
                  return str.slice(tailPos);
                case "<":
                  capture = namedCaptures[ch.slice(1, -1)];
                  break;
                default:
                  var n = +ch;
                  if (n === 0)
                    return match;
                  if (n > m) {
                    var f = floor(n / 10);
                    if (f === 0)
                      return match;
                    if (f <= m)
                      return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                    return match;
                  }
                  capture = captures[n - 1];
              }
              return capture === void 0 ? "" : capture;
            });
          }
        });
      },
      "5692": function(module2, exports2, __webpack_require__) {
        var IS_PURE = __webpack_require__("c430");
        var store = __webpack_require__("c6cd");
        (module2.exports = function(key, value) {
          return store[key] || (store[key] = value !== void 0 ? value : {});
        })("versions", []).push({
          version: "3.6.5",
          mode: IS_PURE ? "pure" : "global",
          copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)"
        });
      },
      "56ef": function(module2, exports2, __webpack_require__) {
        var getBuiltIn = __webpack_require__("d066");
        var getOwnPropertyNamesModule = __webpack_require__("241c");
        var getOwnPropertySymbolsModule = __webpack_require__("7418");
        var anObject = __webpack_require__("825a");
        module2.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys2(it) {
          var keys = getOwnPropertyNamesModule.f(anObject(it));
          var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
          return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
        };
      },
      "5a34": function(module2, exports2, __webpack_require__) {
        var isRegExp = __webpack_require__("44e7");
        module2.exports = function(it) {
          if (isRegExp(it)) {
            throw TypeError("The method doesn't accept regular expressions");
          }
          return it;
        };
      },
      "5c6c": function(module2, exports2) {
        module2.exports = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value
          };
        };
      },
      "5db7": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var flattenIntoArray = __webpack_require__("a2bf");
        var toObject = __webpack_require__("7b0b");
        var toLength = __webpack_require__("50c4");
        var aFunction = __webpack_require__("1c0b");
        var arraySpeciesCreate = __webpack_require__("65f0");
        $({ target: "Array", proto: true }, {
          flatMap: function flatMap(callbackfn) {
            var O = toObject(this);
            var sourceLen = toLength(O.length);
            var A;
            aFunction(callbackfn);
            A = arraySpeciesCreate(O, 0);
            A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            return A;
          }
        });
      },
      "6547": function(module2, exports2, __webpack_require__) {
        var toInteger = __webpack_require__("a691");
        var requireObjectCoercible = __webpack_require__("1d80");
        var createMethod = function(CONVERT_TO_STRING) {
          return function($this, pos) {
            var S = String(requireObjectCoercible($this));
            var position = toInteger(pos);
            var size = S.length;
            var first, second;
            if (position < 0 || position >= size)
              return CONVERT_TO_STRING ? "" : void 0;
            first = S.charCodeAt(position);
            return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
          };
        };
        module2.exports = {
          codeAt: createMethod(false),
          charAt: createMethod(true)
        };
      },
      "65f0": function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__("861d");
        var isArray2 = __webpack_require__("e8b5");
        var wellKnownSymbol = __webpack_require__("b622");
        var SPECIES = wellKnownSymbol("species");
        module2.exports = function(originalArray, length) {
          var C;
          if (isArray2(originalArray)) {
            C = originalArray.constructor;
            if (typeof C == "function" && (C === Array || isArray2(C.prototype)))
              C = void 0;
            else if (isObject2(C)) {
              C = C[SPECIES];
              if (C === null)
                C = void 0;
            }
          }
          return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
        };
      },
      "69f3": function(module2, exports2, __webpack_require__) {
        var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
        var global2 = __webpack_require__("da84");
        var isObject2 = __webpack_require__("861d");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var objectHas = __webpack_require__("5135");
        var sharedKey = __webpack_require__("f772");
        var hiddenKeys = __webpack_require__("d012");
        var WeakMap = global2.WeakMap;
        var set, get, has;
        var enforce = function(it) {
          return has(it) ? get(it) : set(it, {});
        };
        var getterFor = function(TYPE) {
          return function(it) {
            var state;
            if (!isObject2(it) || (state = get(it)).type !== TYPE) {
              throw TypeError("Incompatible receiver, " + TYPE + " required");
            }
            return state;
          };
        };
        if (NATIVE_WEAK_MAP) {
          var store = new WeakMap();
          var wmget = store.get;
          var wmhas = store.has;
          var wmset = store.set;
          set = function(it, metadata) {
            wmset.call(store, it, metadata);
            return metadata;
          };
          get = function(it) {
            return wmget.call(store, it) || {};
          };
          has = function(it) {
            return wmhas.call(store, it);
          };
        } else {
          var STATE = sharedKey("state");
          hiddenKeys[STATE] = true;
          set = function(it, metadata) {
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
          };
          get = function(it) {
            return objectHas(it, STATE) ? it[STATE] : {};
          };
          has = function(it) {
            return objectHas(it, STATE);
          };
        }
        module2.exports = {
          set,
          get,
          has,
          enforce,
          getterFor
        };
      },
      "6eeb": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var has = __webpack_require__("5135");
        var setGlobal = __webpack_require__("ce4e");
        var inspectSource = __webpack_require__("8925");
        var InternalStateModule = __webpack_require__("69f3");
        var getInternalState = InternalStateModule.get;
        var enforceInternalState = InternalStateModule.enforce;
        var TEMPLATE = String(String).split("String");
        (module2.exports = function(O, key, value, options) {
          var unsafe = options ? !!options.unsafe : false;
          var simple = options ? !!options.enumerable : false;
          var noTargetGet = options ? !!options.noTargetGet : false;
          if (typeof value == "function") {
            if (typeof key == "string" && !has(value, "name"))
              createNonEnumerableProperty(value, "name", key);
            enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
          }
          if (O === global2) {
            if (simple)
              O[key] = value;
            else
              setGlobal(key, value);
            return;
          } else if (!unsafe) {
            delete O[key];
          } else if (!noTargetGet && O[key]) {
            simple = true;
          }
          if (simple)
            O[key] = value;
          else
            createNonEnumerableProperty(O, key, value);
        })(Function.prototype, "toString", function toString2() {
          return typeof this == "function" && getInternalState(this).source || inspectSource(this);
        });
      },
      "6f53": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var objectKeys = __webpack_require__("df75");
        var toIndexedObject = __webpack_require__("fc6a");
        var propertyIsEnumerable = __webpack_require__("d1e7").f;
        var createMethod = function(TO_ENTRIES) {
          return function(it) {
            var O = toIndexedObject(it);
            var keys = objectKeys(O);
            var length = keys.length;
            var i = 0;
            var result = [];
            var key;
            while (length > i) {
              key = keys[i++];
              if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
                result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
              }
            }
            return result;
          };
        };
        module2.exports = {
          entries: createMethod(true),
          values: createMethod(false)
        };
      },
      "73d9": function(module2, exports2, __webpack_require__) {
        var addToUnscopables = __webpack_require__("44d2");
        addToUnscopables("flatMap");
      },
      "7418": function(module2, exports2) {
        exports2.f = Object.getOwnPropertySymbols;
      },
      "746f": function(module2, exports2, __webpack_require__) {
        var path = __webpack_require__("428f");
        var has = __webpack_require__("5135");
        var wrappedWellKnownSymbolModule = __webpack_require__("e538");
        var defineProperty = __webpack_require__("9bf2").f;
        module2.exports = function(NAME) {
          var Symbol2 = path.Symbol || (path.Symbol = {});
          if (!has(Symbol2, NAME))
            defineProperty(Symbol2, NAME, {
              value: wrappedWellKnownSymbolModule.f(NAME)
            });
        };
      },
      "7839": function(module2, exports2) {
        module2.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf"
        ];
      },
      "7b0b": function(module2, exports2, __webpack_require__) {
        var requireObjectCoercible = __webpack_require__("1d80");
        module2.exports = function(argument) {
          return Object(requireObjectCoercible(argument));
        };
      },
      "7c73": function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__("825a");
        var defineProperties = __webpack_require__("37e8");
        var enumBugKeys = __webpack_require__("7839");
        var hiddenKeys = __webpack_require__("d012");
        var html = __webpack_require__("1be4");
        var documentCreateElement = __webpack_require__("cc12");
        var sharedKey = __webpack_require__("f772");
        var GT = ">";
        var LT = "<";
        var PROTOTYPE = "prototype";
        var SCRIPT = "script";
        var IE_PROTO = sharedKey("IE_PROTO");
        var EmptyConstructor = function() {
        };
        var scriptTag = function(content) {
          return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
        };
        var NullProtoObjectViaActiveX = function(activeXDocument2) {
          activeXDocument2.write(scriptTag(""));
          activeXDocument2.close();
          var temp = activeXDocument2.parentWindow.Object;
          activeXDocument2 = null;
          return temp;
        };
        var NullProtoObjectViaIFrame = function() {
          var iframe = documentCreateElement("iframe");
          var JS = "java" + SCRIPT + ":";
          var iframeDocument;
          iframe.style.display = "none";
          html.appendChild(iframe);
          iframe.src = String(JS);
          iframeDocument = iframe.contentWindow.document;
          iframeDocument.open();
          iframeDocument.write(scriptTag("document.F=Object"));
          iframeDocument.close();
          return iframeDocument.F;
        };
        var activeXDocument;
        var NullProtoObject = function() {
          try {
            activeXDocument = document.domain && new ActiveXObject("htmlfile");
          } catch (error) {
          }
          NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
          var length = enumBugKeys.length;
          while (length--)
            delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
          return NullProtoObject();
        };
        hiddenKeys[IE_PROTO] = true;
        module2.exports = Object.create || function create(O, Properties) {
          var result;
          if (O !== null) {
            EmptyConstructor[PROTOTYPE] = anObject(O);
            result = new EmptyConstructor();
            EmptyConstructor[PROTOTYPE] = null;
            result[IE_PROTO] = O;
          } else
            result = NullProtoObject();
          return Properties === void 0 ? result : defineProperties(result, Properties);
        };
      },
      "7dd0": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var createIteratorConstructor = __webpack_require__("9ed3");
        var getPrototypeOf = __webpack_require__("e163");
        var setPrototypeOf = __webpack_require__("d2bb");
        var setToStringTag = __webpack_require__("d44e");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var redefine = __webpack_require__("6eeb");
        var wellKnownSymbol = __webpack_require__("b622");
        var IS_PURE = __webpack_require__("c430");
        var Iterators = __webpack_require__("3f8c");
        var IteratorsCore = __webpack_require__("ae93");
        var IteratorPrototype = IteratorsCore.IteratorPrototype;
        var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
        var ITERATOR = wellKnownSymbol("iterator");
        var KEYS = "keys";
        var VALUES = "values";
        var ENTRIES = "entries";
        var returnThis = function() {
          return this;
        };
        module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
          createIteratorConstructor(IteratorConstructor, NAME, next);
          var getIterationMethod = function(KIND) {
            if (KIND === DEFAULT && defaultIterator)
              return defaultIterator;
            if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
              return IterablePrototype[KIND];
            switch (KIND) {
              case KEYS:
                return function keys() {
                  return new IteratorConstructor(this, KIND);
                };
              case VALUES:
                return function values() {
                  return new IteratorConstructor(this, KIND);
                };
              case ENTRIES:
                return function entries() {
                  return new IteratorConstructor(this, KIND);
                };
            }
            return function() {
              return new IteratorConstructor(this);
            };
          };
          var TO_STRING_TAG = NAME + " Iterator";
          var INCORRECT_VALUES_NAME = false;
          var IterablePrototype = Iterable.prototype;
          var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
          var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
          var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
          var CurrentIteratorPrototype, methods, KEY;
          if (anyNativeIterator) {
            CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
            if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
              if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                if (setPrototypeOf) {
                  setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                  createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                }
              }
              setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
              if (IS_PURE)
                Iterators[TO_STRING_TAG] = returnThis;
            }
          }
          if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values() {
              return nativeIterator.call(this);
            };
          }
          if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
            createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
          }
          Iterators[NAME] = defaultIterator;
          if (DEFAULT) {
            methods = {
              values: getIterationMethod(VALUES),
              keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
              entries: getIterationMethod(ENTRIES)
            };
            if (FORCED)
              for (KEY in methods) {
                if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                  redefine(IterablePrototype, KEY, methods[KEY]);
                }
              }
            else
              $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
          }
          return methods;
        };
      },
      "7f9a": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var inspectSource = __webpack_require__("8925");
        var WeakMap = global2.WeakMap;
        module2.exports = typeof WeakMap === "function" && /native code/.test(inspectSource(WeakMap));
      },
      "825a": function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__("861d");
        module2.exports = function(it) {
          if (!isObject2(it)) {
            throw TypeError(String(it) + " is not an object");
          }
          return it;
        };
      },
      "83ab": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        module2.exports = !fails(function() {
          return Object.defineProperty({}, 1, { get: function() {
            return 7;
          } })[1] != 7;
        });
      },
      "8418": function(module2, exports2, __webpack_require__) {
        var toPrimitive = __webpack_require__("c04e");
        var definePropertyModule = __webpack_require__("9bf2");
        var createPropertyDescriptor = __webpack_require__("5c6c");
        module2.exports = function(object, key, value) {
          var propertyKey = toPrimitive(key);
          if (propertyKey in object)
            definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
          else
            object[propertyKey] = value;
        };
      },
      "861d": function(module2, exports2) {
        module2.exports = function(it) {
          return typeof it === "object" ? it !== null : typeof it === "function";
        };
      },
      "8875": function(module2, exports2, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function(root, factory) {
          {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          }
        })(typeof self !== "undefined" ? self : this, function() {
          function getCurrentScript() {
            var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
            if (!descriptor && "currentScript" in document && document.currentScript) {
              return document.currentScript;
            }
            if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
              return document.currentScript;
            }
            try {
              throw new Error();
            } catch (err) {
              var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig, stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack), scriptLocation = stackDetails && stackDetails[1] || false, line = stackDetails && stackDetails[2] || false, currentLocation = document.location.href.replace(document.location.hash, ""), pageSource, inlineScriptSourceRegExp, inlineScriptSource, scripts = document.getElementsByTagName("script");
              if (scriptLocation === currentLocation) {
                pageSource = document.documentElement.outerHTML;
                inlineScriptSourceRegExp = new RegExp("(?:[^\\n]+?\\n){0," + (line - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i");
                inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, "$1").trim();
              }
              for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].readyState === "interactive") {
                  return scripts[i];
                }
                if (scripts[i].src === scriptLocation) {
                  return scripts[i];
                }
                if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
                  return scripts[i];
                }
              }
              return null;
            }
          }
          return getCurrentScript;
        });
      },
      "8925": function(module2, exports2, __webpack_require__) {
        var store = __webpack_require__("c6cd");
        var functionToString = Function.toString;
        if (typeof store.inspectSource != "function") {
          store.inspectSource = function(it) {
            return functionToString.call(it);
          };
        }
        module2.exports = store.inspectSource;
      },
      "8aa5": function(module2, exports2, __webpack_require__) {
        var charAt = __webpack_require__("6547").charAt;
        module2.exports = function(S, index2, unicode) {
          return index2 + (unicode ? charAt(S, index2).length : 1);
        };
      },
      "8bbf": function(module2, exports2) {
        module2.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;
      },
      "90e3": function(module2, exports2) {
        var id = 0;
        var postfix = Math.random();
        module2.exports = function(key) {
          return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
        };
      },
      "9112": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var definePropertyModule = __webpack_require__("9bf2");
        var createPropertyDescriptor = __webpack_require__("5c6c");
        module2.exports = DESCRIPTORS ? function(object, key, value) {
          return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
        } : function(object, key, value) {
          object[key] = value;
          return object;
        };
      },
      "9263": function(module2, exports2, __webpack_require__) {
        var regexpFlags = __webpack_require__("ad6d");
        var stickyHelpers = __webpack_require__("9f7f");
        var nativeExec = RegExp.prototype.exec;
        var nativeReplace = String.prototype.replace;
        var patchedExec = nativeExec;
        var UPDATES_LAST_INDEX_WRONG = function() {
          var re1 = /a/;
          var re2 = /b*/g;
          nativeExec.call(re1, "a");
          nativeExec.call(re2, "a");
          return re1.lastIndex !== 0 || re2.lastIndex !== 0;
        }();
        var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
        var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
        var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;
        if (PATCH) {
          patchedExec = function exec(str) {
            var re = this;
            var lastIndex, reCopy, match, i;
            var sticky = UNSUPPORTED_Y && re.sticky;
            var flags = regexpFlags.call(re);
            var source2 = re.source;
            var charsAdded = 0;
            var strCopy = str;
            if (sticky) {
              flags = flags.replace("y", "");
              if (flags.indexOf("g") === -1) {
                flags += "g";
              }
              strCopy = String(str).slice(re.lastIndex);
              if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
                source2 = "(?: " + source2 + ")";
                strCopy = " " + strCopy;
                charsAdded++;
              }
              reCopy = new RegExp("^(?:" + source2 + ")", flags);
            }
            if (NPCG_INCLUDED) {
              reCopy = new RegExp("^" + source2 + "$(?!\\s)", flags);
            }
            if (UPDATES_LAST_INDEX_WRONG)
              lastIndex = re.lastIndex;
            match = nativeExec.call(sticky ? reCopy : re, strCopy);
            if (sticky) {
              if (match) {
                match.input = match.input.slice(charsAdded);
                match[0] = match[0].slice(charsAdded);
                match.index = re.lastIndex;
                re.lastIndex += match[0].length;
              } else
                re.lastIndex = 0;
            } else if (UPDATES_LAST_INDEX_WRONG && match) {
              re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
            }
            if (NPCG_INCLUDED && match && match.length > 1) {
              nativeReplace.call(match[0], reCopy, function() {
                for (i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === void 0)
                    match[i] = void 0;
                }
              });
            }
            return match;
          };
        }
        module2.exports = patchedExec;
      },
      "94ca": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        var replacement = /#|\.prototype\./;
        var isForced = function(feature, detection) {
          var value = data2[normalize(feature)];
          return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
        };
        var normalize = isForced.normalize = function(string) {
          return String(string).replace(replacement, ".").toLowerCase();
        };
        var data2 = isForced.data = {};
        var NATIVE = isForced.NATIVE = "N";
        var POLYFILL = isForced.POLYFILL = "P";
        module2.exports = isForced;
      },
      "99af": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var fails = __webpack_require__("d039");
        var isArray2 = __webpack_require__("e8b5");
        var isObject2 = __webpack_require__("861d");
        var toObject = __webpack_require__("7b0b");
        var toLength = __webpack_require__("50c4");
        var createProperty = __webpack_require__("8418");
        var arraySpeciesCreate = __webpack_require__("65f0");
        var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
        var wellKnownSymbol = __webpack_require__("b622");
        var V8_VERSION = __webpack_require__("2d00");
        var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
        var MAX_SAFE_INTEGER = 9007199254740991;
        var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
        var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
          var array = [];
          array[IS_CONCAT_SPREADABLE] = false;
          return array.concat()[0] !== array;
        });
        var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
        var isConcatSpreadable = function(O) {
          if (!isObject2(O))
            return false;
          var spreadable = O[IS_CONCAT_SPREADABLE];
          return spreadable !== void 0 ? !!spreadable : isArray2(O);
        };
        var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
        $({ target: "Array", proto: true, forced: FORCED }, {
          concat: function concat(arg) {
            var O = toObject(this);
            var A = arraySpeciesCreate(O, 0);
            var n = 0;
            var i, k, length, len, E;
            for (i = -1, length = arguments.length; i < length; i++) {
              E = i === -1 ? O : arguments[i];
              if (isConcatSpreadable(E)) {
                len = toLength(E.length);
                if (n + len > MAX_SAFE_INTEGER)
                  throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                for (k = 0; k < len; k++, n++)
                  if (k in E)
                    createProperty(A, n, E[k]);
              } else {
                if (n >= MAX_SAFE_INTEGER)
                  throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                createProperty(A, n++, E);
              }
            }
            A.length = n;
            return A;
          }
        });
      },
      "9bdd": function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__("825a");
        module2.exports = function(iterator, fn, value, ENTRIES) {
          try {
            return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
          } catch (error) {
            var returnMethod = iterator["return"];
            if (returnMethod !== void 0)
              anObject(returnMethod.call(iterator));
            throw error;
          }
        };
      },
      "9bf2": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var IE8_DOM_DEFINE = __webpack_require__("0cfb");
        var anObject = __webpack_require__("825a");
        var toPrimitive = __webpack_require__("c04e");
        var nativeDefineProperty = Object.defineProperty;
        exports2.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
          anObject(O);
          P = toPrimitive(P, true);
          anObject(Attributes);
          if (IE8_DOM_DEFINE)
            try {
              return nativeDefineProperty(O, P, Attributes);
            } catch (error) {
            }
          if ("get" in Attributes || "set" in Attributes)
            throw TypeError("Accessors not supported");
          if ("value" in Attributes)
            O[P] = Attributes.value;
          return O;
        };
      },
      "9ed3": function(module2, exports2, __webpack_require__) {
        var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
        var create = __webpack_require__("7c73");
        var createPropertyDescriptor = __webpack_require__("5c6c");
        var setToStringTag = __webpack_require__("d44e");
        var Iterators = __webpack_require__("3f8c");
        var returnThis = function() {
          return this;
        };
        module2.exports = function(IteratorConstructor, NAME, next) {
          var TO_STRING_TAG = NAME + " Iterator";
          IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
          setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
          Iterators[TO_STRING_TAG] = returnThis;
          return IteratorConstructor;
        };
      },
      "9f7f": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        function RE(s, f) {
          return RegExp(s, f);
        }
        exports2.UNSUPPORTED_Y = fails(function() {
          var re = RE("a", "y");
          re.lastIndex = 2;
          return re.exec("abcd") != null;
        });
        exports2.BROKEN_CARET = fails(function() {
          var re = RE("^r", "gy");
          re.lastIndex = 2;
          return re.exec("str") != null;
        });
      },
      "a2bf": function(module2, exports2, __webpack_require__) {
        var isArray2 = __webpack_require__("e8b5");
        var toLength = __webpack_require__("50c4");
        var bind3 = __webpack_require__("0366");
        var flattenIntoArray = function(target, original, source2, sourceLen, start, depth, mapper, thisArg) {
          var targetIndex = start;
          var sourceIndex = 0;
          var mapFn = mapper ? bind3(mapper, thisArg, 3) : false;
          var element;
          while (sourceIndex < sourceLen) {
            if (sourceIndex in source2) {
              element = mapFn ? mapFn(source2[sourceIndex], sourceIndex, original) : source2[sourceIndex];
              if (depth > 0 && isArray2(element)) {
                targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
              } else {
                if (targetIndex >= 9007199254740991)
                  throw TypeError("Exceed the acceptable array length");
                target[targetIndex] = element;
              }
              targetIndex++;
            }
            sourceIndex++;
          }
          return targetIndex;
        };
        module2.exports = flattenIntoArray;
      },
      "a352": function(module2, exports2) {
        module2.exports = __WEBPACK_EXTERNAL_MODULE_a352__;
      },
      "a434": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var toAbsoluteIndex = __webpack_require__("23cb");
        var toInteger = __webpack_require__("a691");
        var toLength = __webpack_require__("50c4");
        var toObject = __webpack_require__("7b0b");
        var arraySpeciesCreate = __webpack_require__("65f0");
        var createProperty = __webpack_require__("8418");
        var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
        var USES_TO_LENGTH = arrayMethodUsesToLength("splice", { ACCESSORS: true, 0: 0, 1: 2 });
        var max = Math.max;
        var min = Math.min;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          splice: function splice(start, deleteCount) {
            var O = toObject(this);
            var len = toLength(O.length);
            var actualStart = toAbsoluteIndex(start, len);
            var argumentsLength = arguments.length;
            var insertCount, actualDeleteCount, A, k, from, to;
            if (argumentsLength === 0) {
              insertCount = actualDeleteCount = 0;
            } else if (argumentsLength === 1) {
              insertCount = 0;
              actualDeleteCount = len - actualStart;
            } else {
              insertCount = argumentsLength - 2;
              actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
            }
            if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
              throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
            }
            A = arraySpeciesCreate(O, actualDeleteCount);
            for (k = 0; k < actualDeleteCount; k++) {
              from = actualStart + k;
              if (from in O)
                createProperty(A, k, O[from]);
            }
            A.length = actualDeleteCount;
            if (insertCount < actualDeleteCount) {
              for (k = actualStart; k < len - actualDeleteCount; k++) {
                from = k + actualDeleteCount;
                to = k + insertCount;
                if (from in O)
                  O[to] = O[from];
                else
                  delete O[to];
              }
              for (k = len; k > len - actualDeleteCount + insertCount; k--)
                delete O[k - 1];
            } else if (insertCount > actualDeleteCount) {
              for (k = len - actualDeleteCount; k > actualStart; k--) {
                from = k + actualDeleteCount - 1;
                to = k + insertCount - 1;
                if (from in O)
                  O[to] = O[from];
                else
                  delete O[to];
              }
            }
            for (k = 0; k < insertCount; k++) {
              O[k + actualStart] = arguments[k + 2];
            }
            O.length = len - actualDeleteCount + insertCount;
            return A;
          }
        });
      },
      "a4d3": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var global2 = __webpack_require__("da84");
        var getBuiltIn = __webpack_require__("d066");
        var IS_PURE = __webpack_require__("c430");
        var DESCRIPTORS = __webpack_require__("83ab");
        var NATIVE_SYMBOL = __webpack_require__("4930");
        var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
        var fails = __webpack_require__("d039");
        var has = __webpack_require__("5135");
        var isArray2 = __webpack_require__("e8b5");
        var isObject2 = __webpack_require__("861d");
        var anObject = __webpack_require__("825a");
        var toObject = __webpack_require__("7b0b");
        var toIndexedObject = __webpack_require__("fc6a");
        var toPrimitive = __webpack_require__("c04e");
        var createPropertyDescriptor = __webpack_require__("5c6c");
        var nativeObjectCreate = __webpack_require__("7c73");
        var objectKeys = __webpack_require__("df75");
        var getOwnPropertyNamesModule = __webpack_require__("241c");
        var getOwnPropertyNamesExternal = __webpack_require__("057f");
        var getOwnPropertySymbolsModule = __webpack_require__("7418");
        var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
        var definePropertyModule = __webpack_require__("9bf2");
        var propertyIsEnumerableModule = __webpack_require__("d1e7");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var redefine = __webpack_require__("6eeb");
        var shared = __webpack_require__("5692");
        var sharedKey = __webpack_require__("f772");
        var hiddenKeys = __webpack_require__("d012");
        var uid = __webpack_require__("90e3");
        var wellKnownSymbol = __webpack_require__("b622");
        var wrappedWellKnownSymbolModule = __webpack_require__("e538");
        var defineWellKnownSymbol = __webpack_require__("746f");
        var setToStringTag = __webpack_require__("d44e");
        var InternalStateModule = __webpack_require__("69f3");
        var $forEach = __webpack_require__("b727").forEach;
        var HIDDEN = sharedKey("hidden");
        var SYMBOL = "Symbol";
        var PROTOTYPE = "prototype";
        var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(SYMBOL);
        var ObjectPrototype = Object[PROTOTYPE];
        var $Symbol = global2.Symbol;
        var $stringify = getBuiltIn("JSON", "stringify");
        var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        var nativeDefineProperty = definePropertyModule.f;
        var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
        var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
        var AllSymbols = shared("symbols");
        var ObjectPrototypeSymbols = shared("op-symbols");
        var StringToSymbolRegistry = shared("string-to-symbol-registry");
        var SymbolToStringRegistry = shared("symbol-to-string-registry");
        var WellKnownSymbolsStore = shared("wks");
        var QObject = global2.QObject;
        var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
        var setSymbolDescriptor = DESCRIPTORS && fails(function() {
          return nativeObjectCreate(nativeDefineProperty({}, "a", {
            get: function() {
              return nativeDefineProperty(this, "a", { value: 7 }).a;
            }
          })).a != 7;
        }) ? function(O, P, Attributes) {
          var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
          if (ObjectPrototypeDescriptor)
            delete ObjectPrototype[P];
          nativeDefineProperty(O, P, Attributes);
          if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
            nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
          }
        } : nativeDefineProperty;
        var wrap = function(tag, description) {
          var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
          setInternalState(symbol, {
            type: SYMBOL,
            tag,
            description
          });
          if (!DESCRIPTORS)
            symbol.description = description;
          return symbol;
        };
        var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
          return typeof it == "symbol";
        } : function(it) {
          return Object(it) instanceof $Symbol;
        };
        var $defineProperty = function defineProperty(O, P, Attributes) {
          if (O === ObjectPrototype)
            $defineProperty(ObjectPrototypeSymbols, P, Attributes);
          anObject(O);
          var key = toPrimitive(P, true);
          anObject(Attributes);
          if (has(AllSymbols, key)) {
            if (!Attributes.enumerable) {
              if (!has(O, HIDDEN))
                nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
              O[HIDDEN][key] = true;
            } else {
              if (has(O, HIDDEN) && O[HIDDEN][key])
                O[HIDDEN][key] = false;
              Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
            }
            return setSymbolDescriptor(O, key, Attributes);
          }
          return nativeDefineProperty(O, key, Attributes);
        };
        var $defineProperties = function defineProperties(O, Properties) {
          anObject(O);
          var properties = toIndexedObject(Properties);
          var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
          $forEach(keys, function(key) {
            if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
              $defineProperty(O, key, properties[key]);
          });
          return O;
        };
        var $create = function create(O, Properties) {
          return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
        };
        var $propertyIsEnumerable = function propertyIsEnumerable(V) {
          var P = toPrimitive(V, true);
          var enumerable = nativePropertyIsEnumerable.call(this, P);
          if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
            return false;
          return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
        };
        var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
          var it = toIndexedObject(O);
          var key = toPrimitive(P, true);
          if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
            return;
          var descriptor = nativeGetOwnPropertyDescriptor(it, key);
          if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
            descriptor.enumerable = true;
          }
          return descriptor;
        };
        var $getOwnPropertyNames = function getOwnPropertyNames(O) {
          var names = nativeGetOwnPropertyNames(toIndexedObject(O));
          var result = [];
          $forEach(names, function(key) {
            if (!has(AllSymbols, key) && !has(hiddenKeys, key))
              result.push(key);
          });
          return result;
        };
        var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
          var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
          var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
          var result = [];
          $forEach(names, function(key) {
            if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
              result.push(AllSymbols[key]);
            }
          });
          return result;
        };
        if (!NATIVE_SYMBOL) {
          $Symbol = function Symbol2() {
            if (this instanceof $Symbol)
              throw TypeError("Symbol is not a constructor");
            var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
            var tag = uid(description);
            var setter = function(value) {
              if (this === ObjectPrototype)
                setter.call(ObjectPrototypeSymbols, value);
              if (has(this, HIDDEN) && has(this[HIDDEN], tag))
                this[HIDDEN][tag] = false;
              setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
            };
            if (DESCRIPTORS && USE_SETTER)
              setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
            return wrap(tag, description);
          };
          redefine($Symbol[PROTOTYPE], "toString", function toString2() {
            return getInternalState(this).tag;
          });
          redefine($Symbol, "withoutSetter", function(description) {
            return wrap(uid(description), description);
          });
          propertyIsEnumerableModule.f = $propertyIsEnumerable;
          definePropertyModule.f = $defineProperty;
          getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
          getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
          getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
          wrappedWellKnownSymbolModule.f = function(name) {
            return wrap(wellKnownSymbol(name), name);
          };
          if (DESCRIPTORS) {
            nativeDefineProperty($Symbol[PROTOTYPE], "description", {
              configurable: true,
              get: function description() {
                return getInternalState(this).description;
              }
            });
            if (!IS_PURE) {
              redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
            }
          }
        }
        $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
          Symbol: $Symbol
        });
        $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
          defineWellKnownSymbol(name);
        });
        $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
          "for": function(key) {
            var string = String(key);
            if (has(StringToSymbolRegistry, string))
              return StringToSymbolRegistry[string];
            var symbol = $Symbol(string);
            StringToSymbolRegistry[string] = symbol;
            SymbolToStringRegistry[symbol] = string;
            return symbol;
          },
          keyFor: function keyFor(sym) {
            if (!isSymbol(sym))
              throw TypeError(sym + " is not a symbol");
            if (has(SymbolToStringRegistry, sym))
              return SymbolToStringRegistry[sym];
          },
          useSetter: function() {
            USE_SETTER = true;
          },
          useSimple: function() {
            USE_SETTER = false;
          }
        });
        $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
          create: $create,
          defineProperty: $defineProperty,
          defineProperties: $defineProperties,
          getOwnPropertyDescriptor: $getOwnPropertyDescriptor
        });
        $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
          getOwnPropertyNames: $getOwnPropertyNames,
          getOwnPropertySymbols: $getOwnPropertySymbols
        });
        $({ target: "Object", stat: true, forced: fails(function() {
          getOwnPropertySymbolsModule.f(1);
        }) }, {
          getOwnPropertySymbols: function getOwnPropertySymbols(it) {
            return getOwnPropertySymbolsModule.f(toObject(it));
          }
        });
        if ($stringify) {
          var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
            var symbol = $Symbol();
            return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
          });
          $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
            stringify: function stringify(it, replacer, space) {
              var args = [it];
              var index2 = 1;
              var $replacer;
              while (arguments.length > index2)
                args.push(arguments[index2++]);
              $replacer = replacer;
              if (!isObject2(replacer) && it === void 0 || isSymbol(it))
                return;
              if (!isArray2(replacer))
                replacer = function(key, value) {
                  if (typeof $replacer == "function")
                    value = $replacer.call(this, key, value);
                  if (!isSymbol(value))
                    return value;
                };
              args[1] = replacer;
              return $stringify.apply(null, args);
            }
          });
        }
        if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
          createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
        }
        setToStringTag($Symbol, SYMBOL);
        hiddenKeys[HIDDEN] = true;
      },
      "a630": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var from = __webpack_require__("4df4");
        var checkCorrectnessOfIteration = __webpack_require__("1c7e");
        var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
          Array.from(iterable);
        });
        $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
          from
        });
      },
      "a640": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        module2.exports = function(METHOD_NAME, argument) {
          var method = [][METHOD_NAME];
          return !!method && fails(function() {
            method.call(null, argument || function() {
              throw 1;
            }, 1);
          });
        };
      },
      "a691": function(module2, exports2) {
        var ceil = Math.ceil;
        var floor = Math.floor;
        module2.exports = function(argument) {
          return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
        };
      },
      "ab13": function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__("b622");
        var MATCH = wellKnownSymbol("match");
        module2.exports = function(METHOD_NAME) {
          var regexp = /./;
          try {
            "/./"[METHOD_NAME](regexp);
          } catch (e) {
            try {
              regexp[MATCH] = false;
              return "/./"[METHOD_NAME](regexp);
            } catch (f) {
            }
          }
          return false;
        };
      },
      "ac1f": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var exec = __webpack_require__("9263");
        $({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
          exec
        });
      },
      "ad6d": function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__("825a");
        module2.exports = function() {
          var that = anObject(this);
          var result = "";
          if (that.global)
            result += "g";
          if (that.ignoreCase)
            result += "i";
          if (that.multiline)
            result += "m";
          if (that.dotAll)
            result += "s";
          if (that.unicode)
            result += "u";
          if (that.sticky)
            result += "y";
          return result;
        };
      },
      "ae40": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var fails = __webpack_require__("d039");
        var has = __webpack_require__("5135");
        var defineProperty = Object.defineProperty;
        var cache = {};
        var thrower = function(it) {
          throw it;
        };
        module2.exports = function(METHOD_NAME, options) {
          if (has(cache, METHOD_NAME))
            return cache[METHOD_NAME];
          if (!options)
            options = {};
          var method = [][METHOD_NAME];
          var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
          var argument0 = has(options, 0) ? options[0] : thrower;
          var argument1 = has(options, 1) ? options[1] : void 0;
          return cache[METHOD_NAME] = !!method && !fails(function() {
            if (ACCESSORS && !DESCRIPTORS)
              return true;
            var O = { length: -1 };
            if (ACCESSORS)
              defineProperty(O, 1, { enumerable: true, get: thrower });
            else
              O[1] = 1;
            method.call(O, argument0, argument1);
          });
        };
      },
      "ae93": function(module2, exports2, __webpack_require__) {
        var getPrototypeOf = __webpack_require__("e163");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var has = __webpack_require__("5135");
        var wellKnownSymbol = __webpack_require__("b622");
        var IS_PURE = __webpack_require__("c430");
        var ITERATOR = wellKnownSymbol("iterator");
        var BUGGY_SAFARI_ITERATORS = false;
        var returnThis = function() {
          return this;
        };
        var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
        if ([].keys) {
          arrayIterator = [].keys();
          if (!("next" in arrayIterator))
            BUGGY_SAFARI_ITERATORS = true;
          else {
            PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
            if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
              IteratorPrototype = PrototypeOfArrayIteratorPrototype;
          }
        }
        if (IteratorPrototype == void 0)
          IteratorPrototype = {};
        if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
          createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
        }
        module2.exports = {
          IteratorPrototype,
          BUGGY_SAFARI_ITERATORS
        };
      },
      "b041": function(module2, exports2, __webpack_require__) {
        var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
        var classof = __webpack_require__("f5df");
        module2.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString2() {
          return "[object " + classof(this) + "]";
        };
      },
      "b0c0": function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__("83ab");
        var defineProperty = __webpack_require__("9bf2").f;
        var FunctionPrototype = Function.prototype;
        var FunctionPrototypeToString = FunctionPrototype.toString;
        var nameRE = /^\s*function ([^ (]*)/;
        var NAME = "name";
        if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
          defineProperty(FunctionPrototype, NAME, {
            configurable: true,
            get: function() {
              try {
                return FunctionPrototypeToString.call(this).match(nameRE)[1];
              } catch (error) {
                return "";
              }
            }
          });
        }
      },
      "b622": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var shared = __webpack_require__("5692");
        var has = __webpack_require__("5135");
        var uid = __webpack_require__("90e3");
        var NATIVE_SYMBOL = __webpack_require__("4930");
        var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
        var WellKnownSymbolsStore = shared("wks");
        var Symbol2 = global2.Symbol;
        var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
        module2.exports = function(name) {
          if (!has(WellKnownSymbolsStore, name)) {
            if (NATIVE_SYMBOL && has(Symbol2, name))
              WellKnownSymbolsStore[name] = Symbol2[name];
            else
              WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
          }
          return WellKnownSymbolsStore[name];
        };
      },
      "b64b": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var toObject = __webpack_require__("7b0b");
        var nativeKeys = __webpack_require__("df75");
        var fails = __webpack_require__("d039");
        var FAILS_ON_PRIMITIVES = fails(function() {
          nativeKeys(1);
        });
        $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
          keys: function keys(it) {
            return nativeKeys(toObject(it));
          }
        });
      },
      "b727": function(module2, exports2, __webpack_require__) {
        var bind3 = __webpack_require__("0366");
        var IndexedObject = __webpack_require__("44ad");
        var toObject = __webpack_require__("7b0b");
        var toLength = __webpack_require__("50c4");
        var arraySpeciesCreate = __webpack_require__("65f0");
        var push = [].push;
        var createMethod = function(TYPE) {
          var IS_MAP = TYPE == 1;
          var IS_FILTER = TYPE == 2;
          var IS_SOME = TYPE == 3;
          var IS_EVERY = TYPE == 4;
          var IS_FIND_INDEX = TYPE == 6;
          var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
          return function($this, callbackfn, that, specificCreate) {
            var O = toObject($this);
            var self2 = IndexedObject(O);
            var boundFunction = bind3(callbackfn, that, 3);
            var length = toLength(self2.length);
            var index2 = 0;
            var create = specificCreate || arraySpeciesCreate;
            var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
            var value, result;
            for (; length > index2; index2++)
              if (NO_HOLES || index2 in self2) {
                value = self2[index2];
                result = boundFunction(value, index2, O);
                if (TYPE) {
                  if (IS_MAP)
                    target[index2] = result;
                  else if (result)
                    switch (TYPE) {
                      case 3:
                        return true;
                      case 5:
                        return value;
                      case 6:
                        return index2;
                      case 2:
                        push.call(target, value);
                    }
                  else if (IS_EVERY)
                    return false;
                }
              }
            return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
          };
        };
        module2.exports = {
          forEach: createMethod(0),
          map: createMethod(1),
          filter: createMethod(2),
          some: createMethod(3),
          every: createMethod(4),
          find: createMethod(5),
          findIndex: createMethod(6)
        };
      },
      "c04e": function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__("861d");
        module2.exports = function(input, PREFERRED_STRING) {
          if (!isObject2(input))
            return input;
          var fn, val;
          if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
            return val;
          if (typeof (fn = input.valueOf) == "function" && !isObject2(val = fn.call(input)))
            return val;
          if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
            return val;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      "c430": function(module2, exports2) {
        module2.exports = false;
      },
      "c6b6": function(module2, exports2) {
        var toString2 = {}.toString;
        module2.exports = function(it) {
          return toString2.call(it).slice(8, -1);
        };
      },
      "c6cd": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var setGlobal = __webpack_require__("ce4e");
        var SHARED = "__core-js_shared__";
        var store = global2[SHARED] || setGlobal(SHARED, {});
        module2.exports = store;
      },
      "c740": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $findIndex = __webpack_require__("b727").findIndex;
        var addToUnscopables = __webpack_require__("44d2");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var FIND_INDEX = "findIndex";
        var SKIPS_HOLES = true;
        var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);
        if (FIND_INDEX in [])
          Array(1)[FIND_INDEX](function() {
            SKIPS_HOLES = false;
          });
        $({ target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
          findIndex: function findIndex(callbackfn) {
            return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
        addToUnscopables(FIND_INDEX);
      },
      "c8ba": function(module2, exports2) {
        var g;
        g = function() {
          return this;
        }();
        try {
          g = g || new Function("return this")();
        } catch (e) {
          if (typeof window === "object")
            g = window;
        }
        module2.exports = g;
      },
      "c975": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $indexOf = __webpack_require__("4d64").indexOf;
        var arrayMethodIsStrict = __webpack_require__("a640");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var nativeIndexOf = [].indexOf;
        var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
        var STRICT_METHOD = arrayMethodIsStrict("indexOf");
        var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
        $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
          indexOf: function indexOf(searchElement) {
            return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "ca84": function(module2, exports2, __webpack_require__) {
        var has = __webpack_require__("5135");
        var toIndexedObject = __webpack_require__("fc6a");
        var indexOf = __webpack_require__("4d64").indexOf;
        var hiddenKeys = __webpack_require__("d012");
        module2.exports = function(object, names) {
          var O = toIndexedObject(object);
          var i = 0;
          var result = [];
          var key;
          for (key in O)
            !has(hiddenKeys, key) && has(O, key) && result.push(key);
          while (names.length > i)
            if (has(O, key = names[i++])) {
              ~indexOf(result, key) || result.push(key);
            }
          return result;
        };
      },
      "caad": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $includes = __webpack_require__("4d64").includes;
        var addToUnscopables = __webpack_require__("44d2");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
        $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
          includes: function includes(el) {
            return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
        addToUnscopables("includes");
      },
      "cc12": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var isObject2 = __webpack_require__("861d");
        var document2 = global2.document;
        var EXISTS = isObject2(document2) && isObject2(document2.createElement);
        module2.exports = function(it) {
          return EXISTS ? document2.createElement(it) : {};
        };
      },
      "ce4e": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var createNonEnumerableProperty = __webpack_require__("9112");
        module2.exports = function(key, value) {
          try {
            createNonEnumerableProperty(global2, key, value);
          } catch (error) {
            global2[key] = value;
          }
          return value;
        };
      },
      "d012": function(module2, exports2) {
        module2.exports = {};
      },
      "d039": function(module2, exports2) {
        module2.exports = function(exec) {
          try {
            return !!exec();
          } catch (error) {
            return true;
          }
        };
      },
      "d066": function(module2, exports2, __webpack_require__) {
        var path = __webpack_require__("428f");
        var global2 = __webpack_require__("da84");
        var aFunction = function(variable) {
          return typeof variable == "function" ? variable : void 0;
        };
        module2.exports = function(namespace, method) {
          return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global2[namespace]) : path[namespace] && path[namespace][method] || global2[namespace] && global2[namespace][method];
        };
      },
      "d1e7": function(module2, exports2, __webpack_require__) {
        var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
        exports2.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
          var descriptor = getOwnPropertyDescriptor(this, V);
          return !!descriptor && descriptor.enumerable;
        } : nativePropertyIsEnumerable;
      },
      "d28b": function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__("746f");
        defineWellKnownSymbol("iterator");
      },
      "d2bb": function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__("825a");
        var aPossiblePrototype = __webpack_require__("3bbe");
        module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;
          try {
            setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
          }
          return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER)
              setter.call(O, proto);
            else
              O.__proto__ = proto;
            return O;
          };
        }() : void 0);
      },
      "d3b7": function(module2, exports2, __webpack_require__) {
        var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
        var redefine = __webpack_require__("6eeb");
        var toString2 = __webpack_require__("b041");
        if (!TO_STRING_TAG_SUPPORT) {
          redefine(Object.prototype, "toString", toString2, { unsafe: true });
        }
      },
      "d44e": function(module2, exports2, __webpack_require__) {
        var defineProperty = __webpack_require__("9bf2").f;
        var has = __webpack_require__("5135");
        var wellKnownSymbol = __webpack_require__("b622");
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        module2.exports = function(it, TAG, STATIC) {
          if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
            defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
          }
        };
      },
      "d58f": function(module2, exports2, __webpack_require__) {
        var aFunction = __webpack_require__("1c0b");
        var toObject = __webpack_require__("7b0b");
        var IndexedObject = __webpack_require__("44ad");
        var toLength = __webpack_require__("50c4");
        var createMethod = function(IS_RIGHT) {
          return function(that, callbackfn, argumentsLength, memo) {
            aFunction(callbackfn);
            var O = toObject(that);
            var self2 = IndexedObject(O);
            var length = toLength(O.length);
            var index2 = IS_RIGHT ? length - 1 : 0;
            var i = IS_RIGHT ? -1 : 1;
            if (argumentsLength < 2)
              while (true) {
                if (index2 in self2) {
                  memo = self2[index2];
                  index2 += i;
                  break;
                }
                index2 += i;
                if (IS_RIGHT ? index2 < 0 : length <= index2) {
                  throw TypeError("Reduce of empty array with no initial value");
                }
              }
            for (; IS_RIGHT ? index2 >= 0 : length > index2; index2 += i)
              if (index2 in self2) {
                memo = callbackfn(memo, self2[index2], index2, O);
              }
            return memo;
          };
        };
        module2.exports = {
          left: createMethod(false),
          right: createMethod(true)
        };
      },
      "d784": function(module2, exports2, __webpack_require__) {
        __webpack_require__("ac1f");
        var redefine = __webpack_require__("6eeb");
        var fails = __webpack_require__("d039");
        var wellKnownSymbol = __webpack_require__("b622");
        var regexpExec = __webpack_require__("9263");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var SPECIES = wellKnownSymbol("species");
        var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
          var re = /./;
          re.exec = function() {
            var result = [];
            result.groups = { a: "7" };
            return result;
          };
          return "".replace(re, "$<a>") !== "7";
        });
        var REPLACE_KEEPS_$0 = function() {
          return "a".replace(/./, "$0") === "$0";
        }();
        var REPLACE = wellKnownSymbol("replace");
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
          if (/./[REPLACE]) {
            return /./[REPLACE]("a", "$0") === "";
          }
          return false;
        }();
        var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
          var re = /(?:)/;
          var originalExec = re.exec;
          re.exec = function() {
            return originalExec.apply(this, arguments);
          };
          var result = "ab".split(re);
          return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
        });
        module2.exports = function(KEY, length, exec, sham) {
          var SYMBOL = wellKnownSymbol(KEY);
          var DELEGATES_TO_SYMBOL = !fails(function() {
            var O = {};
            O[SYMBOL] = function() {
              return 7;
            };
            return ""[KEY](O) != 7;
          });
          var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
            var execCalled = false;
            var re = /a/;
            if (KEY === "split") {
              re = {};
              re.constructor = {};
              re.constructor[SPECIES] = function() {
                return re;
              };
              re.flags = "";
              re[SYMBOL] = /./[SYMBOL];
            }
            re.exec = function() {
              execCalled = true;
              return null;
            };
            re[SYMBOL]("");
            return !execCalled;
          });
          if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
            var nativeRegExpMethod = /./[SYMBOL];
            var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
              if (regexp.exec === regexpExec) {
                if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                  return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                }
                return { done: true, value: nativeMethod.call(str, regexp, arg2) };
              }
              return { done: false };
            }, {
              REPLACE_KEEPS_$0,
              REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
            });
            var stringMethod = methods[0];
            var regexMethod = methods[1];
            redefine(String.prototype, KEY, stringMethod);
            redefine(RegExp.prototype, SYMBOL, length == 2 ? function(string, arg) {
              return regexMethod.call(string, this, arg);
            } : function(string) {
              return regexMethod.call(string, this);
            });
          }
          if (sham)
            createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
        };
      },
      "d81d": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var $map = __webpack_require__("b727").map;
        var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
        var USES_TO_LENGTH = arrayMethodUsesToLength("map");
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          map: function map(callbackfn) {
            return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "da84": function(module2, exports2, __webpack_require__) {
        (function(global2) {
          var check = function(it) {
            return it && it.Math == Math && it;
          };
          module2.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global2 == "object" && global2) || Function("return this")();
        }).call(this, __webpack_require__("c8ba"));
      },
      "dbb4": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var DESCRIPTORS = __webpack_require__("83ab");
        var ownKeys2 = __webpack_require__("56ef");
        var toIndexedObject = __webpack_require__("fc6a");
        var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
        var createProperty = __webpack_require__("8418");
        $({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
          getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
            var O = toIndexedObject(object);
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
            var keys = ownKeys2(O);
            var result = {};
            var index2 = 0;
            var key, descriptor;
            while (keys.length > index2) {
              descriptor = getOwnPropertyDescriptor(O, key = keys[index2++]);
              if (descriptor !== void 0)
                createProperty(result, key, descriptor);
            }
            return result;
          }
        });
      },
      "dbf1": function(module2, __webpack_exports__, __webpack_require__) {
        (function(global2) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return console2;
          });
          function getConsole() {
            if (typeof window !== "undefined") {
              return window.console;
            }
            return global2.console;
          }
          var console2 = getConsole();
        }).call(this, __webpack_require__("c8ba"));
      },
      "ddb0": function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__("da84");
        var DOMIterables = __webpack_require__("fdbc");
        var ArrayIteratorMethods = __webpack_require__("e260");
        var createNonEnumerableProperty = __webpack_require__("9112");
        var wellKnownSymbol = __webpack_require__("b622");
        var ITERATOR = wellKnownSymbol("iterator");
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var ArrayValues = ArrayIteratorMethods.values;
        for (var COLLECTION_NAME in DOMIterables) {
          var Collection = global2[COLLECTION_NAME];
          var CollectionPrototype = Collection && Collection.prototype;
          if (CollectionPrototype) {
            if (CollectionPrototype[ITERATOR] !== ArrayValues)
              try {
                createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
              } catch (error) {
                CollectionPrototype[ITERATOR] = ArrayValues;
              }
            if (!CollectionPrototype[TO_STRING_TAG]) {
              createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
            }
            if (DOMIterables[COLLECTION_NAME])
              for (var METHOD_NAME in ArrayIteratorMethods) {
                if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
                  try {
                    createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                  } catch (error) {
                    CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                  }
              }
          }
        }
      },
      "df75": function(module2, exports2, __webpack_require__) {
        var internalObjectKeys = __webpack_require__("ca84");
        var enumBugKeys = __webpack_require__("7839");
        module2.exports = Object.keys || function keys(O) {
          return internalObjectKeys(O, enumBugKeys);
        };
      },
      "e01a": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var DESCRIPTORS = __webpack_require__("83ab");
        var global2 = __webpack_require__("da84");
        var has = __webpack_require__("5135");
        var isObject2 = __webpack_require__("861d");
        var defineProperty = __webpack_require__("9bf2").f;
        var copyConstructorProperties = __webpack_require__("e893");
        var NativeSymbol = global2.Symbol;
        if (DESCRIPTORS && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || NativeSymbol().description !== void 0)) {
          var EmptyStringDescriptionStore = {};
          var SymbolWrapper = function Symbol2() {
            var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
            var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
            if (description === "")
              EmptyStringDescriptionStore[result] = true;
            return result;
          };
          copyConstructorProperties(SymbolWrapper, NativeSymbol);
          var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
          symbolPrototype.constructor = SymbolWrapper;
          var symbolToString = symbolPrototype.toString;
          var native = String(NativeSymbol("test")) == "Symbol(test)";
          var regexp = /^Symbol\((.*)\)[^)]+$/;
          defineProperty(symbolPrototype, "description", {
            configurable: true,
            get: function description() {
              var symbol = isObject2(this) ? this.valueOf() : this;
              var string = symbolToString.call(symbol);
              if (has(EmptyStringDescriptionStore, symbol))
                return "";
              var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
              return desc === "" ? void 0 : desc;
            }
          });
          $({ global: true, forced: true }, {
            Symbol: SymbolWrapper
          });
        }
      },
      "e163": function(module2, exports2, __webpack_require__) {
        var has = __webpack_require__("5135");
        var toObject = __webpack_require__("7b0b");
        var sharedKey = __webpack_require__("f772");
        var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
        var IE_PROTO = sharedKey("IE_PROTO");
        var ObjectPrototype = Object.prototype;
        module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
          O = toObject(O);
          if (has(O, IE_PROTO))
            return O[IE_PROTO];
          if (typeof O.constructor == "function" && O instanceof O.constructor) {
            return O.constructor.prototype;
          }
          return O instanceof Object ? ObjectPrototype : null;
        };
      },
      "e177": function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__("d039");
        module2.exports = !fails(function() {
          function F() {
          }
          F.prototype.constructor = null;
          return Object.getPrototypeOf(new F()) !== F.prototype;
        });
      },
      "e260": function(module2, exports2, __webpack_require__) {
        var toIndexedObject = __webpack_require__("fc6a");
        var addToUnscopables = __webpack_require__("44d2");
        var Iterators = __webpack_require__("3f8c");
        var InternalStateModule = __webpack_require__("69f3");
        var defineIterator = __webpack_require__("7dd0");
        var ARRAY_ITERATOR = "Array Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
        module2.exports = defineIterator(Array, "Array", function(iterated, kind) {
          setInternalState(this, {
            type: ARRAY_ITERATOR,
            target: toIndexedObject(iterated),
            index: 0,
            kind
          });
        }, function() {
          var state = getInternalState(this);
          var target = state.target;
          var kind = state.kind;
          var index2 = state.index++;
          if (!target || index2 >= target.length) {
            state.target = void 0;
            return { value: void 0, done: true };
          }
          if (kind == "keys")
            return { value: index2, done: false };
          if (kind == "values")
            return { value: target[index2], done: false };
          return { value: [index2, target[index2]], done: false };
        }, "values");
        Iterators.Arguments = Iterators.Array;
        addToUnscopables("keys");
        addToUnscopables("values");
        addToUnscopables("entries");
      },
      "e439": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var fails = __webpack_require__("d039");
        var toIndexedObject = __webpack_require__("fc6a");
        var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
        var DESCRIPTORS = __webpack_require__("83ab");
        var FAILS_ON_PRIMITIVES = fails(function() {
          nativeGetOwnPropertyDescriptor(1);
        });
        var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;
        $({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
          getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
            return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
          }
        });
      },
      "e538": function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__("b622");
        exports2.f = wellKnownSymbol;
      },
      "e893": function(module2, exports2, __webpack_require__) {
        var has = __webpack_require__("5135");
        var ownKeys2 = __webpack_require__("56ef");
        var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
        var definePropertyModule = __webpack_require__("9bf2");
        module2.exports = function(target, source2) {
          var keys = ownKeys2(source2);
          var defineProperty = definePropertyModule.f;
          var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!has(target, key))
              defineProperty(target, key, getOwnPropertyDescriptor(source2, key));
          }
        };
      },
      "e8b5": function(module2, exports2, __webpack_require__) {
        var classof = __webpack_require__("c6b6");
        module2.exports = Array.isArray || function isArray2(arg) {
          return classof(arg) == "Array";
        };
      },
      "e95a": function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__("b622");
        var Iterators = __webpack_require__("3f8c");
        var ITERATOR = wellKnownSymbol("iterator");
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
        };
      },
      "f5df": function(module2, exports2, __webpack_require__) {
        var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
        var classofRaw = __webpack_require__("c6b6");
        var wellKnownSymbol = __webpack_require__("b622");
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var CORRECT_ARGUMENTS = classofRaw(function() {
          return arguments;
        }()) == "Arguments";
        var tryGet = function(it, key) {
          try {
            return it[key];
          } catch (error) {
          }
        };
        module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
          var O, tag, result;
          return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
        };
      },
      "f772": function(module2, exports2, __webpack_require__) {
        var shared = __webpack_require__("5692");
        var uid = __webpack_require__("90e3");
        var keys = shared("keys");
        module2.exports = function(key) {
          return keys[key] || (keys[key] = uid(key));
        };
      },
      "fb15": function(module2, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        if (typeof window !== "undefined") {
          var currentScript = window.document.currentScript;
          {
            var getCurrentScript = __webpack_require__("8875");
            currentScript = getCurrentScript();
            if (!("currentScript" in document)) {
              Object.defineProperty(document, "currentScript", { get: getCurrentScript });
            }
          }
          var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
          if (src) {
            __webpack_require__.p = src[1];
          }
        }
        __webpack_require__("99af");
        __webpack_require__("4de4");
        __webpack_require__("4160");
        __webpack_require__("c975");
        __webpack_require__("d81d");
        __webpack_require__("a434");
        __webpack_require__("159b");
        __webpack_require__("a4d3");
        __webpack_require__("e439");
        __webpack_require__("dbb4");
        __webpack_require__("b64b");
        function _defineProperty2(obj2, key, value) {
          if (key in obj2) {
            Object.defineProperty(obj2, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj2[key] = value;
          }
          return obj2;
        }
        function ownKeys2(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread22(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source2 = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys2(Object(source2), true).forEach(function(key) {
                _defineProperty2(target, key, source2[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
            } else {
              ownKeys2(Object(source2)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
              });
            }
          }
          return target;
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr))
            return arr;
        }
        __webpack_require__("e01a");
        __webpack_require__("d28b");
        __webpack_require__("e260");
        __webpack_require__("d3b7");
        __webpack_require__("3ca3");
        __webpack_require__("ddb0");
        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
            return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null)
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        __webpack_require__("a630");
        __webpack_require__("fb6a");
        __webpack_require__("b0c0");
        __webpack_require__("25f0");
        function _arrayLikeToArray2(arr, len) {
          if (len == null || len > arr.length)
            len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        }
        function _unsupportedIterableToArray2(o, minLen) {
          if (!o)
            return;
          if (typeof o === "string")
            return _arrayLikeToArray2(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor)
            n = o.constructor.name;
          if (n === "Map" || n === "Set")
            return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray2(o, minLen);
        }
        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
        }
        function _arrayWithoutHoles2(arr) {
          if (Array.isArray(arr))
            return _arrayLikeToArray2(arr);
        }
        function _iterableToArray2(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
            return Array.from(iter);
        }
        function _nonIterableSpread2() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _toConsumableArray2(arr) {
          return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread2();
        }
        var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
        var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /* @__PURE__ */ __webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);
        function removeNode(node) {
          if (node.parentElement !== null) {
            node.parentElement.removeChild(node);
          }
        }
        function insertNodeAt(fatherNode, node, position) {
          var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
          fatherNode.insertBefore(node, refNode);
        }
        var console2 = __webpack_require__("dbf1");
        __webpack_require__("13d5");
        __webpack_require__("4fad");
        __webpack_require__("ac1f");
        __webpack_require__("5319");
        function cached(fn) {
          var cache = /* @__PURE__ */ Object.create(null);
          return function cachedFn(str) {
            var hit = cache[str];
            return hit || (cache[str] = fn(str));
          };
        }
        var regex = /-(\w)/g;
        var camelize = cached(function(str) {
          return str.replace(regex, function(_, c) {
            return c.toUpperCase();
          });
        });
        __webpack_require__("5db7");
        __webpack_require__("73d9");
        var manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
        var emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
        var manage = ["Move"];
        var eventHandlerNames = [manage, manageAndEmit, emit].flatMap(function(events2) {
          return events2;
        }).map(function(evt) {
          return "on".concat(evt);
        });
        var events = {
          manage,
          manageAndEmit,
          emit
        };
        function isReadOnly(eventName) {
          return eventHandlerNames.indexOf(eventName) !== -1;
        }
        __webpack_require__("caad");
        __webpack_require__("2ca0");
        var tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
        function isHtmlTag(name) {
          return tags.includes(name);
        }
        function isTransition(name) {
          return ["transition-group", "TransitionGroup"].includes(name);
        }
        function isHtmlAttribute(value) {
          return ["id", "class", "role", "style"].includes(value) || value.startsWith("data-") || value.startsWith("aria-") || value.startsWith("on");
        }
        function project(entries) {
          return entries.reduce(function(res, _ref) {
            var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
            res[key] = value;
            return res;
          }, {});
        }
        function getComponentAttributes(_ref3) {
          var $attrs = _ref3.$attrs, _ref3$componentData = _ref3.componentData, componentData = _ref3$componentData === void 0 ? {} : _ref3$componentData;
          var attributes = project(Object.entries($attrs).filter(function(_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2), key = _ref5[0];
            _ref5[1];
            return isHtmlAttribute(key);
          }));
          return _objectSpread22(_objectSpread22({}, attributes), componentData);
        }
        function createSortableOption(_ref6) {
          var $attrs = _ref6.$attrs, callBackBuilder = _ref6.callBackBuilder;
          var options = project(getValidSortableEntries($attrs));
          Object.entries(callBackBuilder).forEach(function(_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2), eventType = _ref8[0], eventBuilder = _ref8[1];
            events[eventType].forEach(function(event) {
              options["on".concat(event)] = eventBuilder(event);
            });
          });
          var draggable2 = "[data-draggable]".concat(options.draggable || "");
          return _objectSpread22(_objectSpread22({}, options), {}, {
            draggable: draggable2
          });
        }
        function getValidSortableEntries(value) {
          return Object.entries(value).filter(function(_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2), key = _ref10[0];
            _ref10[1];
            return !isHtmlAttribute(key);
          }).map(function(_ref11) {
            var _ref12 = _slicedToArray(_ref11, 2), key = _ref12[0], value2 = _ref12[1];
            return [camelize(key), value2];
          }).filter(function(_ref13) {
            var _ref14 = _slicedToArray(_ref13, 2), key = _ref14[0];
            _ref14[1];
            return !isReadOnly(key);
          });
        }
        __webpack_require__("c740");
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props2) {
          for (var i = 0; i < props2.length; i++) {
            var descriptor = props2[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        var getHtmlElementFromNode = function getHtmlElementFromNode2(_ref) {
          var el = _ref.el;
          return el;
        };
        var addContext = function addContext2(domElement, context) {
          return domElement.__draggable_context = context;
        };
        var getContext = function getContext2(domElement) {
          return domElement.__draggable_context;
        };
        var componentStructure_ComponentStructure = /* @__PURE__ */ function() {
          function ComponentStructure(_ref2) {
            var _ref2$nodes = _ref2.nodes, header = _ref2$nodes.header, defaultNodes = _ref2$nodes.default, footer = _ref2$nodes.footer, root = _ref2.root, realList = _ref2.realList;
            _classCallCheck(this, ComponentStructure);
            this.defaultNodes = defaultNodes;
            this.children = [].concat(_toConsumableArray2(header), _toConsumableArray2(defaultNodes), _toConsumableArray2(footer));
            this.externalComponent = root.externalComponent;
            this.rootTransition = root.transition;
            this.tag = root.tag;
            this.realList = realList;
          }
          _createClass(ComponentStructure, [{
            key: "render",
            value: function render(h, attributes) {
              var tag = this.tag, children = this.children, _isRootComponent = this._isRootComponent;
              var option2 = !_isRootComponent ? children : {
                default: function _default() {
                  return children;
                }
              };
              return h(tag, attributes, option2);
            }
          }, {
            key: "updated",
            value: function updated() {
              var defaultNodes = this.defaultNodes, realList = this.realList;
              defaultNodes.forEach(function(node, index2) {
                addContext(getHtmlElementFromNode(node), {
                  element: realList[index2],
                  index: index2
                });
              });
            }
          }, {
            key: "getUnderlyingVm",
            value: function getUnderlyingVm(domElement) {
              return getContext(domElement);
            }
          }, {
            key: "getVmIndexFromDomIndex",
            value: function getVmIndexFromDomIndex(domIndex, element) {
              var defaultNodes = this.defaultNodes;
              var length = defaultNodes.length;
              var domChildren = element.children;
              var domElement = domChildren.item(domIndex);
              if (domElement === null) {
                return length;
              }
              var context = getContext(domElement);
              if (context) {
                return context.index;
              }
              if (length === 0) {
                return 0;
              }
              var firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);
              var indexFirstDomListElement = _toConsumableArray2(domChildren).findIndex(function(element2) {
                return element2 === firstDomListElement;
              });
              return domIndex < indexFirstDomListElement ? 0 : length;
            }
          }, {
            key: "_isRootComponent",
            get: function get() {
              return this.externalComponent || this.rootTransition;
            }
          }]);
          return ComponentStructure;
        }();
        var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
        function getSlot(slots, key) {
          var slotValue = slots[key];
          return slotValue ? slotValue() : [];
        }
        function computeNodes(_ref) {
          var $slots = _ref.$slots, realList = _ref.realList, getKey = _ref.getKey;
          var normalizedList = realList || [];
          var _map = ["header", "footer"].map(function(name) {
            return getSlot($slots, name);
          }), _map2 = _slicedToArray(_map, 2), header = _map2[0], footer = _map2[1];
          var item = $slots.item;
          if (!item) {
            throw new Error("draggable element must have an item slot");
          }
          var defaultNodes = normalizedList.flatMap(function(element, index2) {
            return item({
              element,
              index: index2
            }).map(function(node) {
              node.key = getKey(element);
              node.props = _objectSpread22(_objectSpread22({}, node.props || {}), {}, {
                "data-draggable": true
              });
              return node;
            });
          });
          if (defaultNodes.length !== normalizedList.length) {
            throw new Error("Item slot must have only one child");
          }
          return {
            header,
            footer,
            default: defaultNodes
          };
        }
        function getRootInformation(tag) {
          var transition = isTransition(tag);
          var externalComponent = !isHtmlTag(tag) && !transition;
          return {
            transition,
            externalComponent,
            tag: externalComponent ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])(tag) : transition ? external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"] : tag
          };
        }
        function computeComponentStructure(_ref2) {
          var $slots = _ref2.$slots, tag = _ref2.tag, realList = _ref2.realList, getKey = _ref2.getKey;
          var nodes = computeNodes({
            $slots,
            realList,
            getKey
          });
          var root = getRootInformation(tag);
          return new componentStructure_ComponentStructure({
            nodes,
            root,
            realList
          });
        }
        function _emit(evtName, evtData) {
          var _this = this;
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
            return _this.$emit(evtName.toLowerCase(), evtData);
          });
        }
        function _manage(evtName) {
          var _this2 = this;
          return function(evtData, originalElement) {
            if (_this2.realList !== null) {
              return _this2["onDrag".concat(evtName)](evtData, originalElement);
            }
          };
        }
        function _manageAndEmit(evtName) {
          var _this3 = this;
          var delegateCallBack = _manage.call(this, evtName);
          return function(evtData, originalElement) {
            delegateCallBack.call(_this3, evtData, originalElement);
            _emit.call(_this3, evtName, evtData);
          };
        }
        var draggingElement = null;
        var props = {
          list: {
            type: Array,
            required: false,
            default: null
          },
          modelValue: {
            type: Array,
            required: false,
            default: null
          },
          itemKey: {
            type: [String, Function],
            required: true
          },
          clone: {
            type: Function,
            default: function _default(original) {
              return original;
            }
          },
          tag: {
            type: String,
            default: "div"
          },
          move: {
            type: Function,
            default: null
          },
          componentData: {
            type: Object,
            required: false,
            default: null
          }
        };
        var emits = ["update:modelValue", "change"].concat(_toConsumableArray2([].concat(_toConsumableArray2(events.manageAndEmit), _toConsumableArray2(events.emit)).map(function(evt) {
          return evt.toLowerCase();
        })));
        var draggableComponent = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
          name: "draggable",
          inheritAttrs: false,
          props,
          emits,
          data: function data2() {
            return {
              error: false
            };
          },
          render: function render() {
            try {
              this.error = false;
              var $slots = this.$slots, $attrs = this.$attrs, tag = this.tag, componentData = this.componentData, realList = this.realList, getKey = this.getKey;
              var componentStructure = computeComponentStructure({
                $slots,
                tag,
                realList,
                getKey
              });
              this.componentStructure = componentStructure;
              var attributes = getComponentAttributes({
                $attrs,
                componentData
              });
              return componentStructure.render(external_commonjs_vue_commonjs2_vue_root_Vue_["h"], attributes);
            } catch (err) {
              this.error = true;
              return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])("pre", {
                style: {
                  color: "red"
                }
              }, err.stack);
            }
          },
          created: function created() {
            if (this.list !== null && this.modelValue !== null) {
              console2["a"].error("modelValue and list props are mutually exclusive! Please set one or another.");
            }
          },
          mounted: function mounted() {
            var _this4 = this;
            if (this.error) {
              return;
            }
            var $attrs = this.$attrs, $el = this.$el, componentStructure = this.componentStructure;
            componentStructure.updated();
            var sortableOptions = createSortableOption({
              $attrs,
              callBackBuilder: {
                manageAndEmit: function manageAndEmit2(event) {
                  return _manageAndEmit.call(_this4, event);
                },
                emit: function emit2(event) {
                  return _emit.bind(_this4, event);
                },
                manage: function manage2(event) {
                  return _manage.call(_this4, event);
                }
              }
            });
            var targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
            this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);
            this.targetDomElement = targetDomElement;
            targetDomElement.__draggable_component__ = this;
          },
          updated: function updated() {
            this.componentStructure.updated();
          },
          beforeUnmount: function beforeUnmount() {
            if (this._sortable !== void 0)
              this._sortable.destroy();
          },
          computed: {
            realList: function realList() {
              var list2 = this.list;
              return list2 ? list2 : this.modelValue;
            },
            getKey: function getKey() {
              var itemKey = this.itemKey;
              if (typeof itemKey === "function") {
                return itemKey;
              }
              return function(element) {
                return element[itemKey];
              };
            }
          },
          watch: {
            $attrs: {
              handler: function handler(newOptionValue) {
                var _sortable = this._sortable;
                if (!_sortable)
                  return;
                getValidSortableEntries(newOptionValue).forEach(function(_ref) {
                  var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                  _sortable.option(key, value);
                });
              },
              deep: true
            }
          },
          methods: {
            getUnderlyingVm: function getUnderlyingVm(domElement) {
              return this.componentStructure.getUnderlyingVm(domElement) || null;
            },
            getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(htmElement) {
              return htmElement.__draggable_component__;
            },
            emitChanges: function emitChanges(evt) {
              var _this5 = this;
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                return _this5.$emit("change", evt);
              });
            },
            alterList: function alterList(onList) {
              if (this.list) {
                onList(this.list);
                return;
              }
              var newList = _toConsumableArray2(this.modelValue);
              onList(newList);
              this.$emit("update:modelValue", newList);
            },
            spliceList: function spliceList() {
              var _arguments = arguments;
              var spliceList2 = function spliceList3(list2) {
                return list2.splice.apply(list2, _toConsumableArray2(_arguments));
              };
              this.alterList(spliceList2);
            },
            updatePosition: function updatePosition(oldIndex2, newIndex2) {
              var updatePosition2 = function updatePosition3(list2) {
                return list2.splice(newIndex2, 0, list2.splice(oldIndex2, 1)[0]);
              };
              this.alterList(updatePosition2);
            },
            getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref3) {
              var to = _ref3.to, related = _ref3.related;
              var component = this.getUnderlyingPotencialDraggableComponent(to);
              if (!component) {
                return {
                  component
                };
              }
              var list2 = component.realList;
              var context = {
                list: list2,
                component
              };
              if (to !== related && list2) {
                var destination = component.getUnderlyingVm(related) || {};
                return _objectSpread22(_objectSpread22({}, destination), context);
              }
              return context;
            },
            getVmIndexFromDomIndex: function getVmIndexFromDomIndex(domIndex) {
              return this.componentStructure.getVmIndexFromDomIndex(domIndex, this.targetDomElement);
            },
            onDragStart: function onDragStart(evt) {
              this.context = this.getUnderlyingVm(evt.item);
              evt.item._underlying_vm_ = this.clone(this.context.element);
              draggingElement = evt.item;
            },
            onDragAdd: function onDragAdd(evt) {
              var element = evt.item._underlying_vm_;
              if (element === void 0) {
                return;
              }
              removeNode(evt.item);
              var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
              this.spliceList(newIndex2, 0, element);
              var added = {
                element,
                newIndex: newIndex2
              };
              this.emitChanges({
                added
              });
            },
            onDragRemove: function onDragRemove(evt) {
              insertNodeAt(this.$el, evt.item, evt.oldIndex);
              if (evt.pullMode === "clone") {
                removeNode(evt.clone);
                return;
              }
              var _this$context = this.context, oldIndex2 = _this$context.index, element = _this$context.element;
              this.spliceList(oldIndex2, 1);
              var removed = {
                element,
                oldIndex: oldIndex2
              };
              this.emitChanges({
                removed
              });
            },
            onDragUpdate: function onDragUpdate(evt) {
              removeNode(evt.item);
              insertNodeAt(evt.from, evt.item, evt.oldIndex);
              var oldIndex2 = this.context.index;
              var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
              this.updatePosition(oldIndex2, newIndex2);
              var moved2 = {
                element: this.context.element,
                oldIndex: oldIndex2,
                newIndex: newIndex2
              };
              this.emitChanges({
                moved: moved2
              });
            },
            computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
              if (!relatedContext.element) {
                return 0;
              }
              var domChildren = _toConsumableArray2(evt.to.children).filter(function(el) {
                return el.style["display"] !== "none";
              });
              var currentDomIndex = domChildren.indexOf(evt.related);
              var currentIndex = relatedContext.component.getVmIndexFromDomIndex(currentDomIndex);
              var draggedInList = domChildren.indexOf(draggingElement) !== -1;
              return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
            },
            onDragMove: function onDragMove(evt, originalEvent) {
              var move = this.move, realList = this.realList;
              if (!move || !realList) {
                return true;
              }
              var relatedContext = this.getRelatedContextFromMoveEvent(evt);
              var futureIndex = this.computeFutureIndex(relatedContext, evt);
              var draggedContext = _objectSpread22(_objectSpread22({}, this.context), {}, {
                futureIndex
              });
              var sendEvent = _objectSpread22(_objectSpread22({}, evt), {}, {
                relatedContext,
                draggedContext
              });
              return move(sendEvent, originalEvent);
            },
            onDragEnd: function onDragEnd() {
              draggingElement = null;
            }
          }
        });
        var vuedraggable = draggableComponent;
        __webpack_exports__["default"] = vuedraggable;
      },
      "fb6a": function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__("23e7");
        var isObject2 = __webpack_require__("861d");
        var isArray2 = __webpack_require__("e8b5");
        var toAbsoluteIndex = __webpack_require__("23cb");
        var toLength = __webpack_require__("50c4");
        var toIndexedObject = __webpack_require__("fc6a");
        var createProperty = __webpack_require__("8418");
        var wellKnownSymbol = __webpack_require__("b622");
        var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
        var arrayMethodUsesToLength = __webpack_require__("ae40");
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
        var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
        var SPECIES = wellKnownSymbol("species");
        var nativeSlice = [].slice;
        var max = Math.max;
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          slice: function slice(start, end) {
            var O = toIndexedObject(this);
            var length = toLength(O.length);
            var k = toAbsoluteIndex(start, length);
            var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
            var Constructor, result, n;
            if (isArray2(O)) {
              Constructor = O.constructor;
              if (typeof Constructor == "function" && (Constructor === Array || isArray2(Constructor.prototype))) {
                Constructor = void 0;
              } else if (isObject2(Constructor)) {
                Constructor = Constructor[SPECIES];
                if (Constructor === null)
                  Constructor = void 0;
              }
              if (Constructor === Array || Constructor === void 0) {
                return nativeSlice.call(O, k, fin);
              }
            }
            result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
            for (n = 0; k < fin; k++, n++)
              if (k in O)
                createProperty(result, n, O[k]);
            result.length = n;
            return result;
          }
        });
      },
      "fc6a": function(module2, exports2, __webpack_require__) {
        var IndexedObject = __webpack_require__("44ad");
        var requireObjectCoercible = __webpack_require__("1d80");
        module2.exports = function(it) {
          return IndexedObject(requireObjectCoercible(it));
        };
      },
      "fdbc": function(module2, exports2) {
        module2.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0
        };
      },
      "fdbf": function(module2, exports2, __webpack_require__) {
        var NATIVE_SYMBOL = __webpack_require__("4930");
        module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
      }
    })["default"];
  });
})(vuedraggable_umd);
var draggable = /* @__PURE__ */ getDefaultExportFromCjs(vuedraggable_umd.exports);
var axios$2 = { exports: {} };
var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj2, fn) {
  if (obj2 === null || typeof obj2 === "undefined") {
    return;
  }
  if (typeof obj2 !== "object") {
    obj2 = [obj2];
  }
  if (isArray(obj2)) {
    for (var i = 0, l = obj2.length; i < l; i++) {
      fn.call(null, obj2[i], i, obj2);
    }
  } else {
    for (var key in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        fn.call(null, obj2[key], key, obj2);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray2(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$h = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray: toArray2,
  isTypedArray,
  isFileList
};
var utils$g = utils$h;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$g.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$g.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$g.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$g.forEach(val, function parseValue(v) {
        if (utils$g.isDate(v)) {
          v = v.toISOString();
        } else if (utils$g.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$f = utils$h;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$f.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$e = utils$h;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$e.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$d = utils$h;
function AxiosError$5(message, code, config, request3, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request3 && (this.request = request3);
  response && (this.response = response);
}
utils$d.inherits(AxiosError$5, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$5.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code) {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$5, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$5.from = function(error, code, config, request3, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$d.toFlatObject(error, axiosError, function filter(obj2) {
    return obj2 !== Error.prototype;
  });
  AxiosError$5.call(axiosError, error.message, code, config, request3, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$5;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$c = utils$h;
function toFormData$1(obj2, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$c.isDate(value)) {
      return value.toISOString();
    }
    if (utils$c.isArrayBuffer(value) || utils$c.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$c.isPlainObject(data2) || utils$c.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$c.forEach(data2, function each(value, key) {
        if (utils$c.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$c.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$c.endsWith(key, "[]") && (arr = utils$c.toArray(value))) {
            arr.forEach(function(el) {
              !utils$c.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj2);
  return formData;
}
var toFormData_1 = toFormData$1;
var AxiosError$4 = AxiosError_1;
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$4("Request failed with status code " + response.status, [AxiosError$4.ERR_BAD_REQUEST, AxiosError$4.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
};
var utils$b = utils$h;
var cookies$1 = utils$b.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils$b.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$b.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$b.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$a = utils$h;
var ignoreDuplicateOf = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;
  if (!headers) {
    return parsed;
  }
  utils$a.forEach(headers.split("\n"), function parser(line) {
    i = line.indexOf(":");
    key = utils$a.trim(line.substr(0, i)).toLowerCase();
    val = utils$a.trim(line.substr(i + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$9 = utils$h;
var isURLSameOrigin$1 = utils$9.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url) {
    var href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$9.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
var AxiosError$3 = AxiosError_1;
var utils$8 = utils$h;
function CanceledError$3(message) {
  AxiosError$3.call(this, message == null ? "canceled" : message, AxiosError$3.ERR_CANCELED);
  this.name = "CanceledError";
}
utils$8.inherits(CanceledError$3, AxiosError$3, {
  __CANCEL__: true
});
var CanceledError_1 = CanceledError$3;
var parseProtocol$1 = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
};
var utils$7 = utils$h;
var settle2 = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath$1 = buildFullPath$2;
var parseHeaders2 = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var transitionalDefaults$1 = transitional;
var AxiosError$2 = AxiosError_1;
var CanceledError$2 = CanceledError_1;
var parseProtocol2 = parseProtocol$1;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils$7.isFormData(requestData) && utils$7.isStandardBrowserEnv()) {
      delete requestHeaders["Content-Type"];
    }
    var request3 = new XMLHttpRequest();
    if (config.auth) {
      var username = config.auth.username || "";
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath$1(config.baseURL, config.url);
    request3.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
    request3.timeout = config.timeout;
    function onloadend() {
      if (!request3) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request3 ? parseHeaders2(request3.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request3.responseText : request3.response;
      var response = {
        data: responseData,
        status: request3.status,
        statusText: request3.statusText,
        headers: responseHeaders,
        config,
        request: request3
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request3 = null;
    }
    if ("onloadend" in request3) {
      request3.onloadend = onloadend;
    } else {
      request3.onreadystatechange = function handleLoad() {
        if (!request3 || request3.readyState !== 4) {
          return;
        }
        if (request3.status === 0 && !(request3.responseURL && request3.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request3.onabort = function handleAbort() {
      if (!request3) {
        return;
      }
      reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config, request3));
      request3 = null;
    };
    request3.onerror = function handleError() {
      reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config, request3, request3));
      request3 = null;
    };
    request3.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      var transitional3 = config.transitional || transitionalDefaults$1;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError$2(timeoutErrorMessage, transitional3.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED, config, request3));
      request3 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request3) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request3.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config.withCredentials)) {
      request3.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request3.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request3.addEventListener("progress", config.onDownloadProgress);
    }
    if (typeof config.onUploadProgress === "function" && request3.upload) {
      request3.upload.addEventListener("progress", config.onUploadProgress);
    }
    if (config.cancelToken || config.signal) {
      onCanceled = function(cancel) {
        if (!request3) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new CanceledError$2() : cancel);
        request3.abort();
        request3 = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }
    var protocol = parseProtocol2(fullPath);
    if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
      reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config));
      return;
    }
    request3.send(requestData);
  });
};
var _null = null;
var utils$6 = utils$h;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$6.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$6.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _null
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$5 = utils$h;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$5.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$h;
var transformData2 = transformData$1;
var isCancel2 = isCancel$1;
var defaults$1 = defaults_1;
var CanceledError$1 = CanceledError_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(config, config.data, config.headers, config.transformRequest);
  config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$h;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data = {
  "version": "0.27.2"
};
var VERSION = data.version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")), AxiosError.ERR_DEPRECATED);
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version2 + " and will be removed in the near future"));
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$h;
var buildURL2 = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  var fullPath = buildFullPath2(config.baseURL, config.url);
  return buildURL2(fullPath, config.params, config.paramsSerializer);
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CanceledError = CanceledError_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  this.promise.then(function(cancel) {
    if (!token._listeners)
      return;
    var i;
    var l = token._listeners.length;
    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });
  this.promise.then = function(onfulfilled) {
    var _resolve;
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index2 = this._listeners.indexOf(listener);
  if (index2 !== -1) {
    this._listeners.splice(index2, 1);
  }
};
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread = function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var utils$1 = utils$h;
var isAxiosError = function isAxiosError2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};
var utils = utils$h;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios$1 = createInstance(defaults);
axios$1.Axios = Axios;
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
var axios = axios$2.exports;
const request2 = axios.create({
  withCredentials: false
});
request2.interceptors.request.use((config) => {
  if (window.nghttpConfig) {
    let _config = window.nghttpConfig(config);
    if (_config) {
      config = _config;
    }
  }
  return config;
}, (error) => {
  console.log("error", error);
  return Promise.reject(new Error(error).message);
});
request2.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  console.log("error", error);
  return Promise.reject(new Error(error).message);
});
var objectPath = { exports: {} };
(function(module) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    var toStr = Object.prototype.toString;
    function hasOwnProperty(obj2, prop) {
      if (obj2 == null) {
        return false;
      }
      return Object.prototype.hasOwnProperty.call(obj2, prop);
    }
    function isEmpty(value) {
      if (!value) {
        return true;
      }
      if (isArray2(value) && value.length === 0) {
        return true;
      } else if (typeof value !== "string") {
        for (var i in value) {
          if (hasOwnProperty(value, i)) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    function toString2(type) {
      return toStr.call(type);
    }
    function isObject2(obj2) {
      return typeof obj2 === "object" && toString2(obj2) === "[object Object]";
    }
    var isArray2 = Array.isArray || function(obj2) {
      return toStr.call(obj2) === "[object Array]";
    };
    function isBoolean(obj2) {
      return typeof obj2 === "boolean" || toString2(obj2) === "[object Boolean]";
    }
    function getKey(key) {
      var intKey = parseInt(key);
      if (intKey.toString() === key) {
        return intKey;
      }
      return key;
    }
    function factory(options) {
      options = options || {};
      var objectPath2 = function(obj2) {
        return Object.keys(objectPath2).reduce(function(proxy, prop) {
          if (prop === "create") {
            return proxy;
          }
          if (typeof objectPath2[prop] === "function") {
            proxy[prop] = objectPath2[prop].bind(objectPath2, obj2);
          }
          return proxy;
        }, {});
      };
      var hasShallowProperty;
      if (options.includeInheritedProps) {
        hasShallowProperty = function() {
          return true;
        };
      } else {
        hasShallowProperty = function(obj2, prop) {
          return typeof prop === "number" && Array.isArray(obj2) || hasOwnProperty(obj2, prop);
        };
      }
      function getShallowProperty(obj2, prop) {
        if (hasShallowProperty(obj2, prop)) {
          return obj2[prop];
        }
      }
      var getShallowPropertySafely;
      if (options.includeInheritedProps) {
        getShallowPropertySafely = function(obj2, currentPath) {
          if (typeof currentPath !== "string" && typeof currentPath !== "number") {
            currentPath = String(currentPath);
          }
          var currentValue = getShallowProperty(obj2, currentPath);
          if (currentPath === "__proto__" || currentPath === "prototype" || currentPath === "constructor" && typeof currentValue === "function") {
            throw new Error("For security reasons, object's magic properties cannot be set");
          }
          return currentValue;
        };
      } else {
        getShallowPropertySafely = function(obj2, currentPath) {
          return getShallowProperty(obj2, currentPath);
        };
      }
      function set(obj2, path, value, doNotReplace) {
        if (typeof path === "number") {
          path = [path];
        }
        if (!path || path.length === 0) {
          return obj2;
        }
        if (typeof path === "string") {
          return set(obj2, path.split(".").map(getKey), value, doNotReplace);
        }
        var currentPath = path[0];
        var currentValue = getShallowPropertySafely(obj2, currentPath);
        if (path.length === 1) {
          if (currentValue === void 0 || !doNotReplace) {
            obj2[currentPath] = value;
          }
          return currentValue;
        }
        if (currentValue === void 0) {
          if (typeof path[1] === "number") {
            obj2[currentPath] = [];
          } else {
            obj2[currentPath] = {};
          }
        }
        return set(obj2[currentPath], path.slice(1), value, doNotReplace);
      }
      objectPath2.has = function(obj2, path) {
        if (typeof path === "number") {
          path = [path];
        } else if (typeof path === "string") {
          path = path.split(".");
        }
        if (!path || path.length === 0) {
          return !!obj2;
        }
        for (var i = 0; i < path.length; i++) {
          var j = getKey(path[i]);
          if (typeof j === "number" && isArray2(obj2) && j < obj2.length || (options.includeInheritedProps ? j in Object(obj2) : hasOwnProperty(obj2, j))) {
            obj2 = obj2[j];
          } else {
            return false;
          }
        }
        return true;
      };
      objectPath2.ensureExists = function(obj2, path, value) {
        return set(obj2, path, value, true);
      };
      objectPath2.set = function(obj2, path, value, doNotReplace) {
        return set(obj2, path, value, doNotReplace);
      };
      objectPath2.insert = function(obj2, path, value, at) {
        var arr = objectPath2.get(obj2, path);
        at = ~~at;
        if (!isArray2(arr)) {
          arr = [];
          objectPath2.set(obj2, path, arr);
        }
        arr.splice(at, 0, value);
      };
      objectPath2.empty = function(obj2, path) {
        if (isEmpty(path)) {
          return void 0;
        }
        if (obj2 == null) {
          return void 0;
        }
        var value, i;
        if (!(value = objectPath2.get(obj2, path))) {
          return void 0;
        }
        if (typeof value === "string") {
          return objectPath2.set(obj2, path, "");
        } else if (isBoolean(value)) {
          return objectPath2.set(obj2, path, false);
        } else if (typeof value === "number") {
          return objectPath2.set(obj2, path, 0);
        } else if (isArray2(value)) {
          value.length = 0;
        } else if (isObject2(value)) {
          for (i in value) {
            if (hasShallowProperty(value, i)) {
              delete value[i];
            }
          }
        } else {
          return objectPath2.set(obj2, path, null);
        }
      };
      objectPath2.push = function(obj2, path) {
        var arr = objectPath2.get(obj2, path);
        if (!isArray2(arr)) {
          arr = [];
          objectPath2.set(obj2, path, arr);
        }
        arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
      };
      objectPath2.coalesce = function(obj2, paths, defaultValue) {
        var value;
        for (var i = 0, len = paths.length; i < len; i++) {
          if ((value = objectPath2.get(obj2, paths[i])) !== void 0) {
            return value;
          }
        }
        return defaultValue;
      };
      objectPath2.get = function(obj2, path, defaultValue) {
        if (typeof path === "number") {
          path = [path];
        }
        if (!path || path.length === 0) {
          return obj2;
        }
        if (obj2 == null) {
          return defaultValue;
        }
        if (typeof path === "string") {
          return objectPath2.get(obj2, path.split("."), defaultValue);
        }
        var currentPath = getKey(path[0]);
        var nextObj = getShallowPropertySafely(obj2, currentPath);
        if (nextObj === void 0) {
          return defaultValue;
        }
        if (path.length === 1) {
          return nextObj;
        }
        return objectPath2.get(obj2[currentPath], path.slice(1), defaultValue);
      };
      objectPath2.del = function del(obj2, path) {
        if (typeof path === "number") {
          path = [path];
        }
        if (obj2 == null) {
          return obj2;
        }
        if (isEmpty(path)) {
          return obj2;
        }
        if (typeof path === "string") {
          return objectPath2.del(obj2, path.split("."));
        }
        var currentPath = getKey(path[0]);
        getShallowPropertySafely(obj2, currentPath);
        if (!hasShallowProperty(obj2, currentPath)) {
          return obj2;
        }
        if (path.length === 1) {
          if (isArray2(obj2)) {
            obj2.splice(currentPath, 1);
          } else {
            delete obj2[currentPath];
          }
        } else {
          return objectPath2.del(obj2[currentPath], path.slice(1));
        }
        return obj2;
      };
      return objectPath2;
    }
    var mod = factory();
    mod.create = factory;
    mod.withInheritedProps = factory({ includeInheritedProps: true });
    return mod;
  });
})(objectPath);
var mixin$1 = {
  props: {
    record: {
      type: Object,
      required: true
    },
    models: {
      type: Object,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    isDragPanel: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object
    }
  },
  data() {
    return {
      remoteUrl: "",
      remoteFilter: {},
      checkValues: [],
      copyLstenModel: ""
    };
  },
  inject: {
    customComponents: {
      from: "customC",
      default: () => []
    },
    config: {
      from: "configC",
      default: () => ({})
    },
    ngConfig: {
      from: "ngConfig",
      default: () => ({})
    }
  },
  computed: {
    recordDisabled() {
      if (this.isDragPanel)
        return false;
      if (this.disabled || this.preview)
        return true;
      if (this.record.options && this.record.options.disabled)
        return true;
      if (this.record.options.dynamicDisabled && this.record.options.dynamicDisabledValue) {
        const script = this.record.options.dynamicDisabledValue;
        const fvalue = dynamicFun(script, this.models);
        return fvalue;
      }
      return false;
    }
  },
  methods: {
    updateArrayDefaultValue() {
      if (this.models && (!Object.prototype.hasOwnProperty.call(this.models, this.record.model) || !(this.models[this.record.model] instanceof Array))) {
        const defaultValue = this.record.options.defaultValue;
        if (defaultValue != null && defaultValue != void 0 && defaultValue instanceof Array) {
          this.models[this.record.model] = defaultValue;
        } else {
          this.models[this.record.model] = [];
        }
      }
    },
    updateSimpleDefaultValue(isNumber2 = false) {
      if (this.models && (!Object.prototype.hasOwnProperty.call(this.models, this.record.model) || this.models[this.record.model] == void 0)) {
        const defaultValue = this.record.options.defaultValue;
        if (defaultValue != null && defaultValue != void 0) {
          this.models[this.record.model] = defaultValue;
        } else {
          if (isNumber2) {
            this.models[this.record.model] = -Infinity;
          } else {
            this.models[this.record.model] = "";
          }
        }
      }
    },
    handleSelectItem(item) {
      this.$emit("handleSelectItem", item);
    },
    dynamicVisible(script, item) {
      const func = script.indexOf("return") >= 0 ? "{" + script + "}" : "return (" + script + ")";
      const Fn = new Function("$", "$item", func);
      return Fn(this.models, item);
    },
    itemVisible(item) {
      if (!item)
        return false;
      if (this.isDragPanel || !this.localFilter || this.localFilter.length == 0)
        return true;
      for (let i = 0; i < this.localFilter.length; i++) {
        const v = this.dynamicVisible(this.localFilter[i], item);
        if (!v) {
          return false;
        }
      }
      return true;
    },
    transformAppend(append) {
      if (append && (append.indexOf("return") >= 0 || append.indexOf("$") >= 0)) {
        const script = append;
        const fvalue = dynamicFun(script, this.models);
        return fvalue;
      }
      return append;
    },
    initDynamicValue() {
      if (this.record.options.dynamic == 1 && this.record.options.remoteFunc) {
        const url = this.record.options.remoteFunc;
        this.remoteUrl = url;
        if (this.record.options.remoteLabel && this.record.options.remoteValue) {
          this.getRemoteData();
        }
        this.itemProp.label = this.record.options.remoteLabel;
        this.itemProp.value = this.record.options.remoteValue;
        this.itemProp.children = this.record.options.remoteChildren;
      } else if (this.record.options.dynamic == 2 && this.record.options.dictType) {
        if (this.ngConfig && this.ngConfig.dict && this.ngConfig.dict.length > 0) {
          const fsDict = this.ngConfig.dict.filter((t) => t.type == this.record.options.dictType);
          this.checkValues = cloneDeep(fsDict);
          this.itemProp.label = "label";
          this.itemProp.value = "value";
          this.itemProp.children = "children";
        }
      }
    },
    remoteMethod(query) {
      let queryParam = this.record.options.onlineParams;
      queryParam = queryParam.replace("$", query);
      let url = this.record.options.remoteFunc;
      if (url.indexOf("?") >= 0) {
        url += "&" + queryParam;
      } else {
        url += "?" + queryParam;
      }
      this.remoteUrl = url;
      this.getRemoteData();
    },
    getRemoteData() {
      const dataPath = this.record.options.dataPath;
      if (!dataPath) {
        this.checkValues = [];
        return;
      }
      request2({
        url: this.remoteUrl,
        method: "get",
        params: this.remoteFilter
      }).then((data2) => {
        if (data2) {
          const rdata = objectPath.exports.get(data2, dataPath);
          this.checkValues = rdata;
        }
      });
    },
    handleBlur(e) {
      this.$emit("handleBlur", e);
    },
    handleFocus(e) {
      this.$emit("handleFocus", e);
    }
  }
};
var index_vue_vue_type_style_index_0_lang$b = "";
const _sfc_main$S = defineComponent({
  mixins: [mixin$1],
  components: {
    TableBuild,
    draggable
  },
  created() {
    this.updateArrayDefaultValue();
  },
  methods: {
    dragEnd(evt, list2) {
      const clone2 = cloneDeep(list2[evt.newIndex]);
      list2[evt.newIndex] = clone2;
      this.handleSelectItem(clone2);
    },
    handleCopy(item) {
      const nitem = cloneDeep(item);
      const key = item.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      const oindex = this.record.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.record.list.splice(oindex + 1, 0, nitem);
      }
    },
    handleDetele(item) {
      const oindex = this.record.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.record.list.splice(oindex, 1);
      }
    }
  }
});
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_node = resolveComponent("ng-form-node");
  const _component_draggable = resolveComponent("draggable");
  const _component_el_row = resolveComponent("el-row");
  const _component_TableBuild = resolveComponent("TableBuild");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "ng-base-batch",
      _ctx.record.options.customClass ? _ctx.record.options.customClass : ""
    ]),
    style: normalizeStyle(_ctx.record.options.customStyle)
  }, [
    _ctx.isDragPanel ? (openBlock(), createBlock(_component_el_row, {
      key: 0,
      gutter: 20
    }, {
      default: withCtx(() => [
        createVNode(_component_draggable, mergeProps({
          tag: "div",
          class: "draggable-box"
        }, {
          group: "form-draggable",
          ghostClass: "moving",
          animation: 180,
          handle: ".drag-move"
        }, {
          "item-key": "key",
          "force-fallback": true,
          list: _ctx.record.list,
          onAdd: _cache[0] || (_cache[0] = ($event) => _ctx.dragEnd($event, _ctx.record.list))
        }), {
          item: withCtx(({ element }) => [
            (openBlock(), createBlock(_component_ng_form_node, {
              key: element.key,
              class: "drag-move",
              selectItem: _ctx.selectItem,
              record: element,
              onHandleSelectItem: _ctx.handleSelectItem,
              onHandleCopy: ($event) => _ctx.handleCopy(element),
              onHandleDetele: ($event) => _ctx.handleDetele(element)
            }, null, 8, ["selectItem", "record", "onHandleSelectItem", "onHandleCopy", "onHandleDetele"]))
          ]),
          _: 1
        }, 16, ["list"])
      ]),
      _: 1
    })) : (openBlock(), createBlock(_component_TableBuild, {
      key: 1,
      record: _ctx.record,
      models: _ctx.models,
      preview: _ctx.preview
    }, null, 8, ["record", "models", "preview"]))
  ], 6);
}
var BaseIndex$n = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$S]]);
var properties_vue_vue_type_style_index_0_lang$1 = "";
const _sfc_main$R = {
  components: {},
  props: {
    selectItem: {
      type: Object
    }
  },
  methods: {}
};
const _hoisted_1$C = { key: 1 };
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_divider = resolveComponent("el-divider");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  return openBlock(), createBlock(_component_el_collapse_item, {
    name: "column",
    title: "\u5B57\u6BB5"
  }, {
    default: withCtx(() => [
      createVNode(_component_el_form, {
        class: "ng-batch-properties",
        size: "small",
        "label-width": "80px",
        "label-position": "top"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_divider, { class: "divider-center" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($props.selectItem.options.addType == "dialog" ? "\u5916\u90E8\u5C55\u793A\u5B57\u6BB5" : "\u5B57\u6BB5\u5BBD\u5EA6"), 1)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox_group, {
                modelValue: $props.selectItem.options.showItem,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.selectItem.options.showItem = $event)
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($props.selectItem.list, (item) => {
                    return openBlock(), createBlock(_component_el_row, {
                      key: item.model
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            $props.selectItem.options.addType == "dialog" ? (openBlock(), createBlock(_component_el_checkbox, {
                              key: 0,
                              label: item.model
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["label"])) : (openBlock(), createElementBlock("span", _hoisted_1$C, toDisplayString(item.label), 1))
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              placeholder: "\u5BBD\u5EA6",
                              modelValue: $props.selectItem.options.colWidth[item.model],
                              "onUpdate:modelValue": ($event) => $props.selectItem.options.colWidth[item.model] = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var BaseProperties$5 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$R]]);
const obj$n = {};
obj$n.type = "batch";
obj$n.component = BaseIndex$n;
obj$n.properties = BaseProperties$5;
obj$n.seq = 20;
obj$n.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u52A8\u6001\u8868\u683C",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      default: -1
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      label: "\u6805\u683C\u9ED8\u8BA4\u503C",
      prop: "list",
      show: false,
      default: [],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6EDA\u52A8\u9AD8\u5EA6",
          prop: "scrollY",
          type: "number",
          default: 0,
          span: 24
        },
        {
          prop: "showItem",
          show: false,
          default: []
        },
        {
          prop: "colWidth",
          show: false,
          default: {}
        },
        {
          label: "\u6837\u5F0Fstyle",
          prop: "customStyle",
          type: "textarea",
          span: 24
        },
        {
          label: "\u6837\u5F0Fclass",
          prop: "customClass",
          type: "textarea",
          span: 24
        },
        {
          label: "\u7A7A\u5185\u5BB9\u63D0\u793A",
          prop: "noDataText",
          type: "textarea",
          default: "\u6682\u65E0\u6570\u636E",
          span: 24
        },
        {
          label: "\u884C\u590D\u5236",
          prop: "copyRow",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u9690\u85CF\u5E8F\u53F7",
          prop: "hideSequence",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u8FB9\u6846",
          prop: "showBorder",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u65B0\u589E\u65B9\u5F0F",
          prop: "addType",
          default: "line",
          type: "radioButton",
          dicData: [
            { label: "\u589E\u52A0\u884C", value: "line" },
            { label: "\u5F39\u51FA\u6846", value: "dialog" }
          ],
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$Q = {
  mixins: [mixin$1],
  data() {
    return {
      itemProp: {
        children: "children",
        value: "value",
        label: "label",
        multiple: this.record.options.multiple
      }
    };
  },
  created() {
    if (this.record.options.dynamic == 0 && this.models && (!Object.prototype.hasOwnProperty.call(this.models, this.record.model) || this.models[this.record.model] == void 0)) {
      if (this.record.options.defaultValue != null && this.record.options.defaultValue.length > 0) {
        this.models[this.record.model] = this.record.options.defaultValue;
      }
    }
    this.initDynamicValue();
    const value = this.models[this.record.model];
    if (value && value.length > 0) {
      this.handleChange(value);
    }
  },
  methods: {
    handleChange(value) {
      let labels = [];
      let as = [];
      this.record.options.dynamic > 0 ? this.checkValues : this.record.options.options;
      if (!this.itemProp.multiple) {
        as = [value];
      } else {
        as = value;
      }
      const checkNodes = this.$refs.cascader.getCheckedNodes();
      for (let i = 0; i < as.length; i++) {
        const v = as[i];
        const fs = checkNodes.filter((t) => t.path == v);
        if (fs && fs.length > 0) {
          const label = fs[0].pathLabels;
          if (label && label.length > 0)
            labels.push(label.join("/"));
        }
      }
      const modelLabel = this.record.model + "_label";
      this.models[modelLabel] = labels.join(",");
    }
  }
};
const _hoisted_1$B = { key: 1 };
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_cascader = resolveComponent("el-cascader");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_cascader, {
    key: 0,
    ref: "cascader",
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    options: _ctx.record.options.dynamic == 1 && _ctx.record.options.remoteFunc ? _ctx.checkValues : _ctx.record.options.options,
    style: normalizeStyle(`width:${_ctx.record.width}`),
    placeholder: _ctx.record.options.placeholder,
    filterable: _ctx.record.options.showSearch,
    clearable: _ctx.record.options.clearable,
    props: $data.itemProp,
    disabled: _ctx.recordDisabled,
    onChange: _cache[1] || (_cache[1] = ($event) => $options.handleChange($event)),
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["modelValue", "options", "style", "placeholder", "filterable", "clearable", "props", "disabled", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$B, toDisplayString(_ctx.models[_ctx.record.model + "_label"]), 1));
}
var BaseIndex$m = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$Q]]);
var kvList_vue_vue_type_style_index_0_lang = "";
const _sfc_main$P = {
  name: "ng-form-kv",
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    keyNumber: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    key() {
      return this.value.length;
    }
  },
  methods: {
    handleAdd() {
      this.value.push({
        value: "",
        label: ""
      });
      this.$emit("update:value", this.value);
    },
    handleDelete(deleteIndex) {
      this.value.splice(deleteIndex, 1);
      this.$emit("update:value", this.value);
    }
  }
};
const _hoisted_1$A = { class: "ng-form-kvlist" };
const _hoisted_2$n = ["onClick"];
const _hoisted_3$i = /* @__PURE__ */ createTextVNode("\u6DFB\u52A0");
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_col = resolveComponent("el-col");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_row = resolveComponent("el-row");
  return openBlock(), createElementBlock("div", _hoisted_1$A, [
    (openBlock(), createBlock(_component_el_row, {
      gutter: 8,
      key: $options.key
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (val, index2) => {
          return openBlock(), createElementBlock("div", {
            class: "option-change-box",
            key: index2
          }, [
            createVNode(_component_el_col, {
              span: 9,
              title: $props.keyNumber ? "\u503C" : "\u6807\u7B7E"
            }, {
              default: withCtx(() => [
                $props.keyNumber ? (openBlock(), createBlock(_component_el_input, {
                  key: 0,
                  modelValue: val.value,
                  "onUpdate:modelValue": ($event) => val.value = $event,
                  type: "number",
                  placeholder: "\u503C"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_el_input, {
                  key: 1,
                  modelValue: val.label,
                  "onUpdate:modelValue": ($event) => val.label = $event,
                  type: "text",
                  placeholder: "\u540D\u79F0"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]))
              ]),
              _: 2
            }, 1032, ["title"]),
            createVNode(_component_el_col, {
              span: 9,
              title: $props.keyNumber ? "\u6807\u7B7E" : "\u503C"
            }, {
              default: withCtx(() => [
                $props.keyNumber ? (openBlock(), createBlock(_component_el_input, {
                  key: 0,
                  modelValue: val.label,
                  "onUpdate:modelValue": ($event) => val.label = $event,
                  placeholder: "\u540D\u79F0"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_el_input, {
                  key: 1,
                  modelValue: val.value,
                  "onUpdate:modelValue": ($event) => val.value = $event,
                  placeholder: "\u503C"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]))
              ]),
              _: 2
            }, 1032, ["title"]),
            createVNode(_component_el_col, { span: 6 }, {
              default: withCtx(() => [
                createElementVNode("div", {
                  onClick: ($event) => $options.handleDelete(index2),
                  class: "option-delete-box",
                  title: "\u5220\u9664\u5F53\u524D\u884C\u6570\u636E"
                }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_Delete)
                    ]),
                    _: 1
                  })
                ], 8, _hoisted_2$n)
              ]),
              _: 2
            }, 1024)
          ]);
        }), 128)),
        !$props.disabled ? (openBlock(), createBlock(_component_el_col, {
          key: 0,
          span: 24
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              type: "primary",
              onClick: $options.handleAdd
            }, {
              default: withCtx(() => [
                _hoisted_3$i
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _: 1
    }))
  ]);
}
var KvList = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$P]]);
var kvListChildren_vue_vue_type_style_index_0_lang = "";
const _sfc_main$O = {
  name: "ng-form-kv-children",
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    keyNumber: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAdd() {
      this.value.push({
        value: "",
        label: ""
      });
      this.$emit("update:value", this.value);
    },
    append(data2) {
      const newChild = { value: "", label: "" };
      if (!data2.children) {
        data2["children"] = [];
      }
      data2.children.push(newChild);
    },
    remove(node, data2) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index2 = children.findIndex((d) => d.value === data2.value);
      children.splice(index2, 1);
    }
  }
};
const _hoisted_1$z = { class: "ng-form-kvlist-children" };
const _hoisted_2$m = { class: "custom-tree-node" };
const _hoisted_3$h = /* @__PURE__ */ createTextVNode("\u6DFB\u52A0");
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_col = resolveComponent("el-col");
  const _component_CirclePlus = resolveComponent("CirclePlus");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_tree = resolveComponent("el-tree");
  return openBlock(), createElementBlock("div", _hoisted_1$z, [
    createVNode(_component_el_tree, {
      data: $props.value ? $props.value : [],
      "show-checkbox": "",
      "default-expand-all": "",
      "expand-on-click-node": false
    }, {
      default: withCtx(({ node, data: data2 }) => [
        createElementVNode("span", _hoisted_2$m, [
          createElementVNode("span", null, [
            createVNode(_component_el_row, { gutter: 4 }, {
              default: withCtx(() => [
                createVNode(_component_el_col, { span: 9 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: data2.label,
                      "onUpdate:modelValue": ($event) => data2.label = $event,
                      type: $props.keyNumber ? "number" : "text",
                      placeholder: "\u540D\u79F0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "type"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_el_col, { span: 9 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: data2.value,
                      "onUpdate:modelValue": ($event) => data2.value = $event,
                      placeholder: "\u503C"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_el_col, { span: 6 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      text: "",
                      class: "kv-button",
                      size: "small",
                      onClick: () => $options.append(data2)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_CirclePlus)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_button, {
                      text: "",
                      class: "kv-button delete",
                      size: "small",
                      onClick: () => $options.remove(node, data2)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_Delete)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ])
        ])
      ]),
      _: 1
    }, 8, ["data"]),
    !$props.disabled ? (openBlock(), createBlock(_component_el_col, {
      key: 0,
      span: 24
    }, {
      default: withCtx(() => [
        createVNode(_component_el_button, {
          type: "primary",
          onClick: $options.handleAdd
        }, {
          default: withCtx(() => [
            _hoisted_3$h
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ]);
}
var KvListChildren = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$O]]);
const _sfc_main$N = {
  components: {
    KvList,
    KvListChildren
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  computed: {
    hasDict() {
      return this.ngConfig && this.ngConfig.dict && this.ngConfig.dict.length > 0 && this.selectItem && this.selectItem.type != "cascader";
    }
  },
  inject: {
    ngConfig: {
      from: "ngConfig",
      default: () => ({})
    }
  },
  methods: {
    queryDictSearch(queryString, cb) {
      const dicts = this.ngConfig && this.ngConfig.dict && this.ngConfig.dict.length > 0 ? this.ngConfig.dict : null;
      if (!dicts || dicts.length == 0) {
        cb([]);
      }
      const ls = {};
      const types = [];
      dicts.forEach((t) => {
        const type = t.type;
        if (!ls[type]) {
          ls[type] = type;
          types.push(t);
        }
      });
      const fs = types.filter((t) => t.type.indexOf(queryString) >= 0);
      cb(fs);
    }
  }
};
const _hoisted_1$y = /* @__PURE__ */ createTextVNode("\u6570\u636E\u914D\u7F6E");
const _hoisted_2$l = { key: 0 };
const _hoisted_3$g = /* @__PURE__ */ createTextVNode("\u8FDC\u7AEF\u65B9\u6CD5");
const _hoisted_4$e = /* @__PURE__ */ createTextVNode("\u5217\u8868\u6570\u636EdataPath");
const _hoisted_5$d = /* @__PURE__ */ createTextVNode("\u503C\u5B57\u6BB5");
const _hoisted_6$b = /* @__PURE__ */ createTextVNode("\u6807\u7B7E\u5B57\u6BB5");
const _hoisted_7$5 = { key: 1 };
const _hoisted_8$5 = /* @__PURE__ */ createTextVNode("\u5B57\u5178\u5206\u7C7B");
const _hoisted_9$3 = { class: "name" };
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_divider = resolveComponent("el-divider");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_autocomplete = resolveComponent("el-autocomplete");
  const _component_KvListChildren = resolveComponent("KvListChildren");
  const _component_KvList = resolveComponent("KvList");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createBlock(_component_el_form, {
    size: "small",
    "label-width": "80px",
    "label-position": "right"
  }, {
    default: withCtx(() => [
      createVNode(_component_el_form_item, { label: "\u6570\u636E\u6765\u6E90" }, {
        default: withCtx(() => [
          createVNode(_component_el_select, {
            clearable: "",
            modelValue: $props.selectItem.options.dynamic,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.selectItem.options.dynamic = $event),
            placeholder: "\u8BF7\u9009\u62E9",
            style: { "width": "100%" }
          }, {
            default: withCtx(() => [
              createVNode(_component_el_option, {
                label: "\u9759\u6001\u6570\u636E",
                value: 0
              }),
              createVNode(_component_el_option, {
                label: "API\u63A5\u53E3",
                value: 1
              }),
              $options.hasDict ? (openBlock(), createBlock(_component_el_option, {
                key: 0,
                label: "\u6570\u636E\u5B57\u5178",
                value: 2
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }),
      createVNode(_component_el_divider, null, {
        default: withCtx(() => [
          _hoisted_1$y
        ]),
        _: 1
      }),
      createVNode(_component_el_form_item, { "label-width": "0px" }, {
        default: withCtx(() => [
          $props.selectItem.options.dynamic == 1 ? (openBlock(), createElementBlock("div", _hoisted_2$l, [
            createVNode(_component_el_input, {
              size: "small",
              modelValue: $props.selectItem.options.remoteFunc,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.selectItem.options.remoteFunc = $event)
            }, {
              prepend: withCtx(() => [
                _hoisted_3$g
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_input, {
              size: "small",
              modelValue: $props.selectItem.options.dataPath,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.selectItem.options.dataPath = $event),
              title: "\u5047\u8BBE\u5F53\u524D\u63A5\u53E3\u8FD4\u56DE\u7684\u6570\u636E\u7ED3\u6784\u4E3A:{code:200,data:[{id:1,name:'11'},{id:2,name:'22'}]} , \u5219\u5F53\u524D\u7684dataPath\u586B\u5199: data"
            }, {
              prepend: withCtx(() => [
                _hoisted_4$e
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_input, {
              size: "small",
              modelValue: $props.selectItem.options.remoteValue,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $props.selectItem.options.remoteValue = $event)
            }, {
              prepend: withCtx(() => [
                _hoisted_5$d
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_input, {
              size: "small",
              modelValue: $props.selectItem.options.remoteLabel,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $props.selectItem.options.remoteLabel = $event)
            }, {
              prepend: withCtx(() => [
                _hoisted_6$b
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])) : $props.selectItem.options.dynamic == 2 ? (openBlock(), createElementBlock("div", _hoisted_7$5, [
            createVNode(_component_el_autocomplete, {
              modelValue: $props.selectItem.options.dictType,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $props.selectItem.options.dictType = $event),
              "fetch-suggestions": $options.queryDictSearch,
              "value-key": "type",
              placeholder: "\u8BF7\u8F93\u5165",
              onSelect: _ctx.handleDictSelect
            }, {
              prepend: withCtx(() => [
                _hoisted_8$5
              ]),
              default: withCtx(({ item }) => [
                createElementVNode("span", _hoisted_9$3, toDisplayString(item.type), 1)
              ]),
              _: 1
            }, 8, ["modelValue", "fetch-suggestions", "onSelect"])
          ])) : createCommentVNode("", true),
          $props.selectItem.options.dynamic == 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            $props.selectItem.type == "cascader" ? (openBlock(), createBlock(_component_KvListChildren, {
              key: 0,
              value: $props.selectItem.options.options
            }, null, 8, ["value"])) : (openBlock(), createBlock(_component_KvList, {
              key: 1,
              value: $props.selectItem.options.options
            }, null, 8, ["value"]))
          ], 64)) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      renderSlot(_ctx.$slots, "defaultValue"),
      createVNode(_component_el_divider)
    ]),
    _: 3
  });
}
var DatasourceConfig = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$N]]);
const _sfc_main$M = {
  components: {
    DatasourceConfig
  },
  props: {
    selectItem: {
      type: Object
    }
  }
};
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DatasourceConfig = resolveComponent("DatasourceConfig");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  return openBlock(), createBlock(_component_el_collapse_item, {
    name: "data",
    title: "\u6570\u636E"
  }, {
    default: withCtx(() => [
      createVNode(_component_DatasourceConfig, { selectItem: $props.selectItem }, null, 8, ["selectItem"])
    ]),
    _: 1
  });
}
var BaseProperties$4 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$M]]);
const obj$m = {};
obj$m.type = "cascader";
obj$m.component = BaseIndex$m;
obj$m.properties = BaseProperties$4;
obj$m.seq = 15;
obj$m.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u7EA7\u8054\u9009\u62E9\u5668",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur", "change"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          default: [],
          show: false,
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u6570\u636E\u83B7\u53D6",
          prop: "dynamic",
          default: 0,
          span: 24,
          type: "select",
          show: false,
          dicData: [
            { label: "\u9759\u6001\u6570\u636E", value: 0 },
            { label: "API\u63A5\u53E3", value: 1 }
          ]
        },
        {
          label: "\u9759\u6001\u6570\u636E",
          prop: "options",
          default: [
            {
              value: "1",
              label: "\u4E0B\u62C9\u68461"
            }
          ],
          span: 24,
          show: false
        },
        {
          label: "\u8FDC\u7A0B\u83B7\u53D6\u6570\u636E\u94FE\u63A5",
          prop: "remoteFunc",
          show: false
        },
        {
          label: "\u6570\u636E\u8DEF\u5F84",
          prop: "dataPath",
          show: false
        },
        {
          label: "\u6570\u636E\u503C\u5B57\u6BB5",
          prop: "remoteValue",
          show: false
        },
        {
          label: "\u6570\u636E\u6807\u7B7E\u5B57\u6BB5",
          prop: "remoteLabel",
          show: false
        },
        {
          label: "\u591A\u9009",
          prop: "multiple",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u53EF\u641C\u7D22",
          prop: "showSearch",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
var mixin = {
  mixins: [mixin$1],
  data() {
    return {
      localFilter: [],
      remoteFilter: {}
    };
  },
  computed: {
    dynamicOption() {
      if (!this.isDragPanel || !["select", "radio", "checkbox"].includes(this.record.type)) {
        return null;
      }
      if (this.record.options.dynamic == 0) {
        return null;
      }
      if (this.record.options.dynamic == 1) {
        return this.record.options.dynamic + this.record.options.remoteFunc + this.record.options.dataPath + this.record.options.remoteValue + this.record.options.remoteLabel;
      } else if (this.record.options.dynamic == 2) {
        return this.record.options.dynamic + this.record.options.dictType;
      }
      return null;
    },
    linkageData() {
      if (!this.isDragPanel && this.record.options.linkage) {
        const linkData = this.record.options.linkData;
        if (!linkData)
          return null;
        let vs = [];
        for (let i = 0; i < linkData.length; i++) {
          const ld = linkData[i];
          if (ld.model) {
            vs.push(this.models[ld.model]);
          }
        }
        return vs.join(",");
      }
      return null;
    }
  },
  watch: {
    dynamicOption: {
      handler(val, oldVal) {
        this.initDynamicValue();
      },
      deep: true
    },
    linkageData: {
      handler(val, oldVal) {
        if (val == oldVal) {
          return;
        }
        if (this.record.options.linkage) {
          const linkData = this.record.options.linkData;
          if (!linkData)
            return;
          let localScript = [];
          let remoteQuery = {};
          for (let i = 0; i < linkData.length; i++) {
            const ld = linkData[i];
            if (ld.vtype == 1) {
              localScript.push(ld.script);
            } else if (ld.vtype == 2 && this.record.options.dynamic == 1 && this.record.options.remoteFunc && ld.queryKey && ld.queryValue) {
              const queryValue = dynamicFun(ld.queryValue, this.models);
              remoteQuery[ld.queryKey] = queryValue;
            }
          }
          this.localFilter = localScript;
          this.remoteFilter = remoteQuery;
          if (this.record.type === "select" && this.record.options.multiple || this.record.type === "checkbox") {
            this.models[this.record.model] = [];
          } else {
            this.models[this.record.model] = null;
          }
          if (this.remoteFilter) {
            this.getRemoteData();
          }
        }
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log("handleChange", value);
      let labels = [];
      let datas = this.record.options.dynamic > 0 ? this.checkValues : this.record.options.options;
      if (!datas) {
        datas = [];
      }
      let as = [];
      if (!(value instanceof Array)) {
        as = [value];
      } else {
        as = value;
      }
      for (let i = 0; i < as.length; i++) {
        const v = as[i];
        const fs = datas.filter((t) => t[this.itemProp.value] == v);
        if (fs && fs.length > 0) {
          const label = fs[0][this.itemProp.label];
          labels.push(label);
        }
      }
      const modelLabel = this.record.model + "_label";
      this.models[modelLabel] = labels.join(",");
      if (this.record.options.selectCb) {
        const cvalues = this.record.options.dynamic == 1 && this.record.options.remoteFunc ? this.checkValues : this.record.options.options;
        const fs = cvalues.filter((t) => t[this.itemProp.value] == value);
        if (fs && fs.length > 0) {
          const select = fs[0];
          this.$nextTick(() => {
            const scriptFunc = this.record.options.selectCb;
            const func = "{" + scriptFunc + "}";
            const Fn = new Function("$", "$select", func);
            Fn(this.models, select);
          });
        }
      }
    }
  }
};
const _sfc_main$L = {
  mixins: [mixin],
  data() {
    return {
      itemProp: {
        value: "value",
        label: "label"
      }
    };
  },
  computed: {
    checkList() {
      if (this.record.options.dynamic == 1 && this.record.options.remoteFunc || this.record.options.dynamic == 2 && this.record.options.dictType) {
        return this.checkValues;
      } else {
        return this.record.options.options;
      }
    }
  },
  created() {
    this.updateArrayDefaultValue();
    this.initDynamicValue();
    const value = this.models[this.record.model];
    if (value && value.length > 0) {
      this.handleChange(value);
    }
  },
  mounted() {
  }
};
const _hoisted_1$x = { key: 1 };
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_checkbox_group, {
    key: 0,
    disabled: _ctx.recordDisabled,
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    placeholder: _ctx.record.options.placeholder,
    onChange: _cache[1] || (_cache[1] = ($event) => _ctx.handleChange($event)),
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.checkList, (checkitem, index2) => {
        return openBlock(), createElementBlock(Fragment, null, [
          _ctx.itemVisible(checkitem) ? (openBlock(), createBlock(_component_el_checkbox, {
            label: checkitem[$data.itemProp.value],
            key: checkitem[$data.itemProp.value] + index2
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(checkitem[$data.itemProp.label]), 1)
            ]),
            _: 2
          }, 1032, ["label"])) : createCommentVNode("", true)
        ], 64);
      }), 256))
    ]),
    _: 1
  }, 8, ["disabled", "modelValue", "placeholder", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$x, toDisplayString(_ctx.models[_ctx.record.model + "_label"]), 1));
}
var BaseIndex$l = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$L]]);
const _sfc_main$K = {
  name: "ng-properties-linkage",
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAdd() {
      if (!this.value) {
        this.value = [];
      }
      let addData = [
        ...this.value,
        {
          vtype: 1,
          model: "",
          script: "",
          queryKey: "",
          queryValue: ""
        }
      ];
      this.$emit("input", addData);
    },
    handleDelete(deleteIndex) {
      this.$emit("input", this.value.filter((val, index2) => index2 !== deleteIndex));
    }
  }
};
const _hoisted_1$w = { class: "ng-properties-linkage" };
const _hoisted_2$k = { class: "linkage-box" };
const _hoisted_3$f = /* @__PURE__ */ createTextVNode("\u672C\u5730");
const _hoisted_4$d = /* @__PURE__ */ createTextVNode("\u8FDC\u7A0B");
const _hoisted_5$c = /* @__PURE__ */ createTextVNode("\u5173\u8054\u5B57\u6BB5");
const _hoisted_6$a = /* @__PURE__ */ createTextVNode(" \u8868\u8FBE\u5F0F: ");
const _hoisted_7$4 = ["onClick"];
const _hoisted_8$4 = /* @__PURE__ */ createTextVNode("\u6DFB\u52A0");
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_row = resolveComponent("el-row");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  return openBlock(), createElementBlock("div", _hoisted_1$w, [
    createVNode(_component_el_row, { gutter: 8 }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (val, index2) => {
          return openBlock(), createElementBlock("span", { key: index2 }, [
            createElementVNode("div", _hoisted_2$k, [
              createVNode(_component_el_col, { span: 21 }, {
                default: withCtx(() => [
                  createElementVNode("template", null, [
                    createTextVNode(toDisplayString(index2 + 1) + "\u3001 ", 1),
                    createVNode(_component_el_radio, {
                      modelValue: val.vtype,
                      "onUpdate:modelValue": ($event) => val.vtype = $event,
                      label: 1
                    }, {
                      default: withCtx(() => [
                        _hoisted_3$f
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_el_radio, {
                      modelValue: val.vtype,
                      "onUpdate:modelValue": ($event) => val.vtype = $event,
                      label: 2
                    }, {
                      default: withCtx(() => [
                        _hoisted_4$d
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_col, { span: 21 }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    size: "small",
                    modelValue: val.model,
                    "onUpdate:modelValue": ($event) => val.model = $event,
                    placeholder: "\u5173\u8054\u5B57\u6BB5"
                  }, {
                    prepend: withCtx(() => [
                      _hoisted_5$c
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_col, { span: 21 }, {
                default: withCtx(() => [
                  val.vtype == 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    _hoisted_6$a,
                    createVNode(_component_el_input, {
                      size: "small",
                      type: "textarea",
                      modelValue: val.script,
                      "onUpdate:modelValue": ($event) => val.script = $event,
                      placeholder: "\u8868\u8FBE\u5F0F,eg: $item.value>$.age . \u5176\u4E2D$item\u8868\u793A\u5F53\u524D\u6570\u636E\u4E2D\u5177\u4F53\u4E00\u6761\u6570\u636E,$\u8868\u793A\u5F53\u524D\u6574\u4E2A\u8868\u5355\u6570\u636E"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ], 64)) : val.vtype == 2 ? (openBlock(), createBlock(_component_el_row, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            size: "small",
                            modelValue: val.queryKey,
                            "onUpdate:modelValue": ($event) => val.queryKey = $event,
                            placeholder: "query key"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            size: "small",
                            modelValue: val.queryValue,
                            "onUpdate:modelValue": ($event) => val.queryValue = $event,
                            placeholder: "query value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_col, { span: 3 }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    onClick: ($event) => $options.handleDelete(index2),
                    class: "option-delete-box"
                  }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Delete)
                      ]),
                      _: 1
                    })
                  ], 8, _hoisted_7$4)
                ]),
                _: 2
              }, 1024)
            ])
          ]);
        }), 128)),
        !$props.disabled ? (openBlock(), createBlock(_component_el_col, {
          key: 0,
          span: 24
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              type: "primary",
              size: "small",
              onClick: $options.handleAdd
            }, {
              default: withCtx(() => [
                _hoisted_8$4
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ]);
}
var Linkage = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$K]]);
const _sfc_main$J = {
  components: {
    DatasourceConfig,
    Linkage
  },
  props: {
    selectItem: {
      type: Object
    }
  }
};
const _hoisted_1$v = { slot: "defaultValue" };
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_DatasourceConfig = resolveComponent("DatasourceConfig");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_Linkage = resolveComponent("Linkage");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_el_collapse_item, {
      name: "data",
      title: "\u6570\u636E"
    }, {
      default: withCtx(() => [
        createVNode(_component_DatasourceConfig, { selectItem: $props.selectItem }, {
          default: withCtx(() => [
            createElementVNode("template", _hoisted_1$v, [
              $props.selectItem && $props.selectItem.options.dynamic == 0 ? (openBlock(), createBlock(_component_el_form_item, {
                key: 0,
                label: "\u9ED8\u8BA4\u503C"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_checkbox_group, {
                    options: $props.selectItem.options.options,
                    modelValue: $props.selectItem.options.defaultValue,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.selectItem.options.defaultValue = $event)
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList([].concat($props.selectItem.options.options), (item, index2) => {
                        return openBlock(), createBlock(_component_el_checkbox, {
                          label: item.value,
                          key: item.value + index2
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["options", "modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["selectItem"])
      ]),
      _: 1
    }),
    createVNode(_component_el_collapse_item, {
      name: "linkage",
      title: "\u8054\u52A8",
      class: "linkage-item"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_form, {
          size: "small",
          "label-width": "80px",
          class: "linkage-form"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "\u8054\u52A8\u5173\u8054" }, {
              default: withCtx(() => [
                createVNode(_component_el_switch, {
                  modelValue: $props.selectItem.options.linkage,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.selectItem.options.linkage = $event),
                  "active-text": "\u662F",
                  "inactive-text": "\u5426"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            $props.selectItem.options.linkage ? (openBlock(), createBlock(_component_Linkage, {
              key: 0,
              modelValue: $props.selectItem.options.linkData,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.selectItem.options.linkData = $event)
            }, null, 8, ["modelValue"])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
var BaseProperties$3 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$J]]);
const obj$l = {};
obj$l.type = "checkbox";
obj$l.component = BaseIndex$l;
obj$l.properties = BaseProperties$3;
obj$l.seq = 5;
obj$l.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u591A\u9009\u6846",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          default: [],
          show: false,
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u6570\u636E\u83B7\u53D6",
          prop: "dynamic",
          default: 0,
          span: 24,
          type: "select",
          show: false,
          dicData: [
            { label: "\u9759\u6001\u6570\u636E", value: 0 },
            { label: "API\u63A5\u53E3", value: 1 },
            { label: "\u6570\u636E\u5B57\u5178", value: 2 }
          ]
        },
        {
          label: "\u9759\u6001\u6570\u636E",
          prop: "options",
          default: [
            {
              value: "1",
              label: "\u9009\u98791"
            },
            {
              value: "2",
              label: "\u9009\u98792"
            }
          ],
          span: 24,
          show: false
        },
        {
          label: "\u8FDC\u7A0B\u83B7\u53D6\u6570\u636E\u94FE\u63A5",
          prop: "remoteFunc",
          show: false
        },
        {
          label: "\u6570\u636E\u8DEF\u5F84",
          prop: "dataPath",
          show: false
        },
        {
          label: "\u6570\u636E\u503C\u5B57\u6BB5",
          prop: "remoteValue",
          show: false
        },
        {
          label: "\u6570\u636E\u6807\u7B7E\u5B57\u6BB5",
          prop: "remoteLabel",
          show: false
        },
        {
          label: "\u5B57\u5178\u5206\u7C7B",
          prop: "dictType",
          show: false
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u8054\u52A8\u5173\u8054",
          prop: "linkage",
          type: "switch",
          default: false,
          show: false,
          span: 24
        },
        {
          label: "\u8054\u52A8\u5173\u8054",
          prop: "linkData",
          default: [],
          show: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$I = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  }
};
const _hoisted_1$u = { key: 1 };
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_date_picker = resolveComponent("el-date-picker");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_date_picker, {
    key: 0,
    style: normalizeStyle(`width:${_ctx.record.width}`),
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    disabled: _ctx.recordDisabled,
    align: "right",
    type: _ctx.record.options.dateType,
    clearable: _ctx.record.options.clearable,
    placeholder: _ctx.record.options.placeholder,
    format: _ctx.record.options.format,
    "value-format": _ctx.record.options.format,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["style", "modelValue", "disabled", "type", "clearable", "placeholder", "format", "value-format", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$u, toDisplayString(_ctx.models[_ctx.record.model]), 1));
}
var BaseIndex$k = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$I]]);
const obj$k = {};
obj$k.type = "date";
obj$k.component = BaseIndex$k;
obj$k.seq = 7;
obj$k.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u65E5\u671F",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u65E5\u671F\u7C7B\u578B",
          prop: "dateType",
          default: "date",
          type: "select",
          dicData: [
            { label: "\u5E74", value: "year" },
            { label: "\u6708\u4EFD", value: "month" },
            { label: "\u65E5\u671F", value: "date" }
          ],
          span: 24
        },
        {
          label: "\u65E5\u671F\u683C\u5F0F",
          prop: "format",
          default: "YYYY-MM-DD",
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$H = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  }
};
const _hoisted_1$t = { key: 1 };
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_date_picker = resolveComponent("el-date-picker");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_date_picker, {
    key: 0,
    style: normalizeStyle(`width:${_ctx.record.width}`),
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    align: "right",
    type: "datetime",
    disabled: _ctx.recordDisabled,
    clearable: _ctx.record.options.clearable,
    placeholder: _ctx.record.options.placeholder,
    format: _ctx.record.options.format,
    "value-format": _ctx.record.options.format,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["style", "modelValue", "disabled", "clearable", "placeholder", "format", "value-format", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$t, toDisplayString(_ctx.models[_ctx.record.model]), 1));
}
var BaseIndex$j = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$H]]);
const obj$j = {};
obj$j.type = "datePicker";
obj$j.component = BaseIndex$j;
obj$j.seq = 10;
obj$j.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u65E5\u671F\u65F6\u95F4",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u65E5\u671F\u683C\u5F0F",
          prop: "format",
          default: "YYYY-MM-DD HH:mm:ss",
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$G = {
  mixins: [mixin$1],
  created() {
    this.updateArrayDefaultValue();
  },
  computed: {
    modelText() {
      const value = this.models[this.record.model];
      if (value && value instanceof Array) {
        return value.join(" ~ ");
      }
      return "";
    }
  }
};
const _hoisted_1$s = { key: 1 };
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_date_picker = resolveComponent("el-date-picker");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_date_picker, {
    key: 0,
    style: normalizeStyle(`width:${_ctx.record.width}`),
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    align: "right",
    disabled: _ctx.recordDisabled,
    type: _ctx.record.options.dateType == "month" ? "monthrange" : "daterange",
    clearable: _ctx.record.options.clearable,
    "start-placeholder": _ctx.record.options.rangeStartPlaceholder,
    "end-placeholder": _ctx.record.options.rangeEndPlaceholder,
    format: _ctx.record.options.format,
    "value-format": _ctx.record.options.format,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["style", "modelValue", "disabled", "type", "clearable", "start-placeholder", "end-placeholder", "format", "value-format", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$s, toDisplayString($options.modelText), 1));
}
var BaseIndex$i = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$G]]);
const obj$i = {};
obj$i.type = "daterange";
obj$i.component = BaseIndex$i;
obj$i.seq = 8;
obj$i.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u65E5\u671F\u533A\u95F4",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u65E5\u671F\u7C7B\u578B",
          prop: "dateType",
          default: "date",
          type: "select",
          dicData: [
            { label: "\u6708\u4EFD", value: "month" },
            { label: "\u65E5\u671F", value: "date" }
          ],
          span: 24
        },
        {
          label: "\u65E5\u671F\u683C\u5F0F",
          prop: "format",
          default: "yyyy-MM-dd",
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A1",
          prop: "rangeStartPlaceholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A2",
          prop: "rangeEndPlaceholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$F = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  }
};
const _hoisted_1$r = ["innerHTML"];
const _hoisted_2$j = ["innerHTML"];
const _hoisted_3$e = { key: 1 };
const _hoisted_4$c = ["innerHTML"];
const _hoisted_5$b = { class: "base-item-span" };
const _hoisted_6$9 = ["innerHTML"];
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_input, {
    key: 0,
    placeholder: _ctx.record.options.placeholder,
    clearable: _ctx.record.options.clearable,
    disabled: _ctx.recordDisabled,
    type: _ctx.record.options.type || "text",
    style: normalizeStyle(`width:${_ctx.record.width}`),
    maxlength: _ctx.record.options.maxLength > 0 ? _ctx.record.options.maxLength : null,
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, createSlots({ _: 2 }, [
    _ctx.record.options.prepend ? {
      name: "prepend",
      fn: withCtx(() => [
        createElementVNode("span", {
          innerHTML: _ctx.transformAppend(_ctx.record.options.prepend)
        }, null, 8, _hoisted_1$r)
      ])
    } : void 0,
    _ctx.record.options.append ? {
      name: "append",
      fn: withCtx(() => [
        createElementVNode("span", {
          innerHTML: _ctx.transformAppend(_ctx.record.options.append)
        }, null, 8, _hoisted_2$j)
      ])
    } : void 0
  ]), 1032, ["placeholder", "clearable", "disabled", "type", "style", "maxlength", "modelValue", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("div", _hoisted_3$e, [
    _ctx.record.options.prepend ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "base-item-span",
      innerHTML: _ctx.transformAppend(_ctx.record.options.prepend)
    }, null, 8, _hoisted_4$c)) : createCommentVNode("", true),
    createElementVNode("span", _hoisted_5$b, toDisplayString(_ctx.models[_ctx.record.model]), 1),
    _ctx.record.options.append ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: "base-item-span",
      innerHTML: _ctx.transformAppend(_ctx.record.options.append)
    }, null, 8, _hoisted_6$9)) : createCommentVNode("", true)
  ]));
}
var BaseIndex$h = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F]]);
const obj$h = {};
obj$h.type = "input";
obj$h.component = BaseIndex$h;
obj$h.seq = 1;
obj$h.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u8F93\u5165\u6846",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          span: 24
        },
        {
          label: "\u8F93\u5165\u7C7B\u578B",
          prop: "type",
          span: 24,
          type: "select",
          default: "text",
          dicData: ["text", "date", "datetime-local", "email", "month", "number", "password", "tel", "time", "url", "week"].map((t) => {
            return { label: t, value: t };
          })
        },
        {
          label: "\u524D\u7F00",
          prop: "prepend",
          span: 24
        },
        {
          label: "\u540E\u7F00",
          prop: "append",
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u6700\u5927\u957F\u5EA6",
          type: "number",
          min: -1,
          max: 1e3,
          prop: "maxLength",
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
var index_vue_vue_type_style_index_0_lang$a = "";
const _sfc_main$E = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue(true);
  }
};
const _hoisted_1$q = ["innerHTML"];
const _hoisted_2$i = { key: 1 };
const _hoisted_3$d = ["innerHTML"];
const _hoisted_4$b = { class: "base-item-span" };
const _hoisted_5$a = ["innerHTML"];
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input_number = resolveComponent("el-input-number");
  return !_ctx.preview ? (openBlock(), createElementBlock("div", {
    key: 0,
    style: normalizeStyle(`width:${_ctx.record.width}`),
    class: "form-item-base-number el-input-number-diaplay"
  }, [
    createVNode(_component_el_input_number, {
      class: normalizeClass(_ctx.record.options.append ? "el-input-number__append" : null),
      modelValue: _ctx.models[_ctx.record.model],
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
      style: normalizeStyle(`width:${_ctx.record.width};float:left;`),
      min: _ctx.record.options.min || _ctx.record.options.min === 0 ? _ctx.record.options.min : -Infinity,
      max: _ctx.record.options.max || _ctx.record.options.max === 0 ? _ctx.record.options.max : Infinity,
      disabled: _ctx.recordDisabled,
      step: _ctx.record.options.step,
      precision: _ctx.record.options.precision > 50 || !_ctx.record.options.precision && _ctx.record.options.precision !== 0 ? null : _ctx.record.options.precision,
      "controls-position": "right",
      placeholder: _ctx.record.options.placeholder,
      onFocus: _ctx.handleFocus,
      onBlur: _ctx.handleBlur
    }, null, 8, ["class", "modelValue", "style", "min", "max", "disabled", "step", "precision", "placeholder", "onFocus", "onBlur"]),
    _ctx.record.options.append ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "el-input-group__append el-input-number-group__append",
      innerHTML: _ctx.transformAppend(_ctx.record.options.append)
    }, null, 8, _hoisted_1$q)) : createCommentVNode("", true)
  ], 4)) : (openBlock(), createElementBlock("div", _hoisted_2$i, [
    _ctx.record.options.prepend ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "base-item-span",
      innerHTML: _ctx.transformAppend(_ctx.record.options.prepend)
    }, null, 8, _hoisted_3$d)) : createCommentVNode("", true),
    createElementVNode("span", _hoisted_4$b, toDisplayString(_ctx.models[_ctx.record.model]), 1),
    _ctx.record.options.append ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: "base-item-span",
      innerHTML: _ctx.transformAppend(_ctx.record.options.append)
    }, null, 8, _hoisted_5$a)) : createCommentVNode("", true)
  ]));
}
var BaseIndex$g = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E]]);
const obj$g = {};
obj$g.type = "number";
obj$g.component = BaseIndex$g;
obj$g.seq = 3;
obj$g.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u6570\u5B57\u8F93\u5165\u6846",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u7CBE\u5EA6",
          prop: "precision",
          type: "number",
          default: 0,
          span: 24
        },
        {
          label: "\u6B65\u957F",
          prop: "step",
          type: "number",
          default: 1,
          span: 24
        },
        {
          label: "\u6700\u5C0F\u503C",
          prop: "min",
          type: "number",
          default: 0,
          span: 24
        },
        {
          label: "\u6700\u5927\u503C",
          prop: "max",
          type: "number",
          default: 1e3,
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          type: "number",
          span: 24
        },
        {
          label: "\u540E\u7F00",
          prop: "append",
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$D = {
  mixins: [mixin],
  data() {
    return {
      itemProp: {
        value: "value",
        label: "label"
      }
    };
  },
  computed: {
    checkList() {
      if (this.record.options.dynamic == 1 && this.record.options.remoteFunc || this.record.options.dynamic == 2 && this.record.options.dictType) {
        return this.checkValues;
      } else {
        return this.record.options.options;
      }
    }
  },
  created() {
    this.updateSimpleDefaultValue();
    this.initDynamicValue();
    const value = this.models[this.record.model];
    if (value && value.length > 0) {
      this.handleChange(value);
    }
  },
  mounted() {
  }
};
const _hoisted_1$p = { key: 1 };
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_radio_group, {
    key: 0,
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    disabled: _ctx.recordDisabled,
    placeholder: _ctx.record.options.placeholder,
    onChange: _cache[1] || (_cache[1] = ($event) => _ctx.handleChange($event)),
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.checkList, (radioitem, index2) => {
        return openBlock(), createElementBlock(Fragment, null, [
          _ctx.itemVisible(radioitem) ? (openBlock(), createBlock(_component_el_radio, {
            label: radioitem[$data.itemProp.value],
            key: radioitem[$data.itemProp.value] + index2
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(radioitem[$data.itemProp.label]), 1)
            ]),
            _: 2
          }, 1032, ["label"])) : createCommentVNode("", true)
        ], 64);
      }), 256))
    ]),
    _: 1
  }, 8, ["modelValue", "disabled", "placeholder", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$p, toDisplayString(_ctx.models[_ctx.record.model + "_label"]), 1));
}
var BaseIndex$f = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D]]);
const _sfc_main$C = {
  components: {
    DatasourceConfig,
    Linkage
  },
  props: {
    selectItem: {
      type: Object
    }
  }
};
const _hoisted_1$o = { slot: "defaultValue" };
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_DatasourceConfig = resolveComponent("DatasourceConfig");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_Linkage = resolveComponent("Linkage");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_el_collapse_item, {
      name: "data",
      title: "\u6570\u636E"
    }, {
      default: withCtx(() => [
        createVNode(_component_DatasourceConfig, { selectItem: $props.selectItem }, {
          default: withCtx(() => [
            createElementVNode("template", _hoisted_1$o, [
              $props.selectItem && $props.selectItem.options.dynamic == 0 ? (openBlock(), createBlock(_component_el_form_item, {
                key: 0,
                label: "\u9ED8\u8BA4\u503C"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_radio_group, {
                    options: $props.selectItem.options.options,
                    modelValue: $props.selectItem.options.defaultValue,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.selectItem.options.defaultValue = $event)
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList([].concat($props.selectItem.options.options), (item, index2) => {
                        return openBlock(), createBlock(_component_el_radio, {
                          label: item.value,
                          key: item.value + index2
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["options", "modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["selectItem"])
      ]),
      _: 1
    }),
    createVNode(_component_el_collapse_item, {
      name: "linkage",
      title: "\u8054\u52A8",
      class: "linkage-item"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_form, {
          size: "small",
          "label-width": "80px",
          class: "linkage-form"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "\u8054\u52A8\u5173\u8054" }, {
              default: withCtx(() => [
                createVNode(_component_el_switch, {
                  modelValue: $props.selectItem.options.linkage,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.selectItem.options.linkage = $event),
                  "active-text": "\u662F",
                  "inactive-text": "\u5426"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            $props.selectItem.options.linkage ? (openBlock(), createBlock(_component_Linkage, {
              key: 0,
              modelValue: $props.selectItem.options.linkData,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.selectItem.options.linkData = $event)
            }, null, 8, ["modelValue"])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
var BaseProperties$2 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C]]);
const obj$f = {};
obj$f.type = "radio";
obj$f.component = BaseIndex$f;
obj$f.properties = BaseProperties$2;
obj$f.seq = 6;
obj$f.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u5355\u9009\u6846",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          show: false,
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u6570\u636E\u83B7\u53D6",
          prop: "dynamic",
          default: 0,
          span: 24,
          type: "select",
          show: false,
          dicData: [
            { label: "\u9759\u6001\u6570\u636E", value: 0 },
            { label: "API\u63A5\u53E3", value: 1 },
            { label: "\u6570\u636E\u5B57\u5178", value: 2 }
          ]
        },
        {
          label: "\u9759\u6001\u6570\u636E",
          prop: "options",
          default: [
            {
              value: "1",
              label: "\u9009\u98791"
            },
            {
              value: "2",
              label: "\u9009\u98792"
            }
          ],
          span: 24,
          show: false
        },
        {
          label: "\u8FDC\u7A0B\u83B7\u53D6\u6570\u636E\u94FE\u63A5",
          prop: "remoteFunc",
          show: false
        },
        {
          label: "\u6570\u636E\u8DEF\u5F84",
          prop: "dataPath",
          show: false
        },
        {
          label: "\u6570\u636E\u503C\u5B57\u6BB5",
          prop: "remoteValue",
          show: false
        },
        {
          label: "\u6570\u636E\u6807\u7B7E\u5B57\u6BB5",
          prop: "remoteLabel",
          show: false
        },
        {
          label: "\u5B57\u5178\u5206\u7C7B",
          prop: "dictType",
          show: false
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u8054\u52A8\u5173\u8054",
          prop: "linkage",
          type: "switch",
          default: false,
          show: false,
          span: 24
        },
        {
          label: "\u8054\u52A8\u5173\u8054",
          prop: "linkData",
          default: [],
          show: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$B = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  }
};
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_rate = resolveComponent("el-rate");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_el_rate, {
      style: normalizeStyle(`width:${_ctx.record.width}`),
      modelValue: _ctx.models[_ctx.record.model],
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
      max: _ctx.record.options.max,
      allowHalf: _ctx.record.options.allowHalf,
      disabled: _ctx.recordDisabled,
      onFocus: _ctx.handleFocus,
      onBlur: _ctx.handleBlur
    }, null, 8, ["style", "modelValue", "max", "allowHalf", "disabled", "onFocus", "onBlur"])
  ]);
}
var BaseIndex$e = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B]]);
const obj$e = {};
obj$e.type = "rate";
obj$e.component = BaseIndex$e;
obj$e.seq = 11;
obj$e.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u8BC4\u5206",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6700\u5927\u503C",
          prop: "max",
          type: "number",
          min: 1,
          default: 5,
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          type: "number",
          span: 24
        },
        {
          label: "\u5141\u8BB8\u534A\u9009",
          prop: "allowHalf",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$A = {
  mixins: [mixin],
  data() {
    return {
      itemProp: {
        children: "children",
        value: "value",
        label: "label",
        multiple: this.record.options.multiple
      },
      localFilter: []
    };
  },
  computed: {
    itemValue() {
      if (!this.itemProp.value)
        return "value";
      return this.itemProp.value;
    },
    itemLabel() {
      if (!this.itemProp.label)
        return "label";
      return this.itemProp.label;
    },
    selectList() {
      if (this.record.options.dynamic == 1 && this.record.options.remoteFunc) {
        return this.checkValues;
      } else if (this.record.options.dynamic == 2 && this.record.options.dictType) {
        return this.checkValues;
      } else {
        return this.record.options.options;
      }
    }
  },
  created() {
    if (!this.record.options)
      return;
    if (this.record.options.multiple) {
      this.updateArrayDefaultValue();
    } else {
      this.updateSimpleDefaultValue();
    }
    this.initDynamicValue();
    const value = this.models[this.record.model];
    if (value && value.length > 0) {
      this.handleChange(value);
    }
  },
  methods: {
    clearChange() {
      if (!this.record.options.clearCb) {
        return;
      }
      const cbScript = this.record.options.clearCb;
      const func = "{" + cbScript + "}";
      const Fn = new Function("$", "data", func);
      Fn(this.models, this.data);
    }
  }
};
const _hoisted_1$n = { key: 0 };
const _hoisted_2$h = { key: 1 };
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  return !_ctx.preview ? (openBlock(), createElementBlock("div", _hoisted_1$n, [
    _ctx.record.options.multiple ? (openBlock(), createBlock(_component_el_select, {
      key: 0,
      modelValue: _ctx.models[_ctx.record.model],
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
      "value-key": $options.itemValue,
      style: normalizeStyle(`width:${_ctx.record.width}`),
      remote: _ctx.record.options.onlineSearch && _ctx.record.options.showSearch,
      "remote-method": _ctx.remoteMethod,
      placeholder: _ctx.record.options.placeholder,
      filterable: _ctx.record.options.showSearch,
      disabled: _ctx.recordDisabled,
      clearable: _ctx.record.options.clearable,
      multiple: "",
      onChange: _cache[1] || (_cache[1] = ($event) => _ctx.handleChange($event)),
      onClear: $options.clearChange,
      onFocus: _ctx.handleFocus,
      onBlur: _ctx.handleBlur
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.selectList, (item, index2) => {
          return openBlock(), createElementBlock(Fragment, null, [
            _ctx.itemVisible(item) ? (openBlock(), createBlock(_component_el_option, {
              key: item[$options.itemValue] + index2,
              label: item[$options.itemLabel],
              value: item[$options.itemValue]
            }, null, 8, ["label", "value"])) : createCommentVNode("", true)
          ], 64);
        }), 256))
      ]),
      _: 1
    }, 8, ["modelValue", "value-key", "style", "remote", "remote-method", "placeholder", "filterable", "disabled", "clearable", "onClear", "onFocus", "onBlur"])) : (openBlock(), createBlock(_component_el_select, {
      key: 1,
      modelValue: _ctx.models[_ctx.record.model],
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.models[_ctx.record.model] = $event),
      style: normalizeStyle(`width:${_ctx.record.width}`),
      "value-key": $options.itemValue,
      remote: _ctx.record.options.onlineSearch && _ctx.record.options.showSearch,
      "remote-method": _ctx.remoteMethod,
      placeholder: _ctx.record.options.placeholder,
      filterable: _ctx.record.options.showSearch,
      disabled: _ctx.recordDisabled,
      clearable: _ctx.record.options.clearable,
      onChange: _cache[3] || (_cache[3] = ($event) => _ctx.handleChange($event)),
      onClear: $options.clearChange,
      onFocus: _ctx.handleFocus,
      onBlur: _ctx.handleBlur
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.selectList, (item, index2) => {
          return openBlock(), createElementBlock(Fragment, null, [
            _ctx.itemVisible(item) ? (openBlock(), createBlock(_component_el_option, {
              key: item[$options.itemValue] + index2,
              label: item[$options.itemLabel],
              value: item[$options.itemValue]
            }, null, 8, ["label", "value"])) : createCommentVNode("", true)
          ], 64);
        }), 256))
      ]),
      _: 1
    }, 8, ["modelValue", "style", "value-key", "remote", "remote-method", "placeholder", "filterable", "disabled", "clearable", "onClear", "onFocus", "onBlur"]))
  ])) : (openBlock(), createElementBlock("span", _hoisted_2$h, toDisplayString(_ctx.models[_ctx.record.model + "_label"]), 1));
}
var BaseIndex$d = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A]]);
const _sfc_main$z = {
  components: {
    DatasourceConfig,
    Linkage
  },
  data() {
    return {};
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  computed: {
    multiple() {
      if (this.selectItem && this.selectItem.options)
        return this.selectItem.options.multiple;
      return void 0;
    }
  },
  watch: {
    multiple(val) {
      if (val == void 0)
        return;
      if (val) {
        this.selectItem.options["defaultValue"] = [];
      } else {
        this.selectItem.options["defaultValue"] = "";
      }
    }
  }
};
const _hoisted_1$m = { slot: "defaultValue" };
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_DatasourceConfig = resolveComponent("DatasourceConfig");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_Linkage = resolveComponent("Linkage");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_el_collapse_item, {
      name: "data",
      title: "\u6570\u636E"
    }, {
      default: withCtx(() => [
        createVNode(_component_DatasourceConfig, { selectItem: $props.selectItem }, {
          default: withCtx(() => [
            createElementVNode("template", _hoisted_1$m, [
              $props.selectItem && $props.selectItem.options.dynamic == 0 ? (openBlock(), createBlock(_component_el_form_item, {
                key: 0,
                label: "\u9ED8\u8BA4\u503C"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    multiple: $props.selectItem.options.multiple,
                    modelValue: $props.selectItem.options.defaultValue,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.selectItem.options.defaultValue = $event),
                    clearable: true
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($props.selectItem.options.options, (item, index2) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: item.value + index2,
                          label: item.label,
                          value: item.value
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["multiple", "modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["selectItem"])
      ]),
      _: 1
    }),
    createVNode(_component_el_collapse_item, {
      name: "linkage",
      title: "\u8054\u52A8",
      class: "linkage-item"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_form, {
          size: "small",
          "label-width": "80px",
          class: "linkage-form"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "\u8054\u52A8\u5173\u8054" }, {
              default: withCtx(() => [
                createVNode(_component_el_switch, {
                  modelValue: $props.selectItem.options.linkage,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.selectItem.options.linkage = $event),
                  "active-text": "\u662F",
                  "inactive-text": "\u5426"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            $props.selectItem.options.linkage ? (openBlock(), createBlock(_component_Linkage, {
              key: 0,
              modelValue: $props.selectItem.options.linkData,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.selectItem.options.linkData = $event)
            }, null, 8, ["modelValue"])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
var BaseProperties$1 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z]]);
const obj$d = {};
obj$d.type = "select";
obj$d.component = BaseIndex$d;
obj$d.properties = BaseProperties$1;
obj$d.seq = 4;
obj$d.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u4E0B\u62C9\u9009\u62E9\u5668",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          show: false,
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u6570\u636E\u83B7\u53D6",
          prop: "dynamic",
          default: 0,
          span: 24,
          type: "select",
          show: false,
          dicData: [
            { label: "\u9759\u6001\u6570\u636E", value: 0 },
            { label: "API\u63A5\u53E3", value: 1 },
            { label: "\u6570\u636E\u5B57\u5178", value: 2 }
          ]
        },
        {
          label: "\u9759\u6001\u6570\u636E",
          prop: "options",
          default: [
            {
              value: "1",
              label: "\u4E0B\u62C9\u68461"
            },
            {
              value: "2",
              label: "\u4E0B\u62C9\u68462"
            }
          ],
          span: 24,
          show: false
        },
        {
          label: "\u8FDC\u7A0B\u83B7\u53D6\u6570\u636E\u94FE\u63A5",
          prop: "remoteFunc",
          show: false
        },
        {
          label: "\u6570\u636E\u8DEF\u5F84",
          prop: "dataPath",
          show: false
        },
        {
          label: "\u6570\u636E\u503C\u5B57\u6BB5",
          prop: "remoteValue",
          show: false
        },
        {
          label: "\u6570\u636E\u6807\u7B7E\u5B57\u6BB5",
          prop: "remoteLabel",
          show: false
        },
        {
          label: "\u5B57\u5178\u5206\u7C7B",
          prop: "dictType",
          show: false
        },
        {
          label: "\u591A\u9009",
          prop: "multiple",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u53EF\u641C\u7D22",
          prop: "showSearch",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u9009\u62E9\u540E\u56DE\u8C03",
          prop: "selectCb",
          placeholder: "\u9009\u62E9\u540E\u56DE\u8C03\u65B9\u6CD5,eg: $.A004=$select.name, $\u8868\u793A\u5F53\u524D\u8868\u5355\u6570\u636E,$select\u6807\u793A\u5F53\u524D\u9009\u62E9\u5143\u7D20\u5B9E\u4F53",
          type: "textarea"
        },
        {
          label: "\u6E05\u9664\u540E\u56DE\u8C03",
          prop: "clearCb",
          placeholder: '\u6E05\u9664\u540E\u56DE\u8C03\u65B9\u6CD5,eg: $.A004="", $\u8868\u793A\u5F53\u524D\u8868\u5355\u6570\u636E',
          type: "textarea",
          show: "$.options.clearable"
        },
        {
          label: "\u8054\u52A8\u5173\u8054",
          prop: "linkage",
          type: "switch",
          default: false,
          show: false,
          span: 24
        },
        {
          label: "\u8054\u52A8\u5173\u8054",
          prop: "linkData",
          default: [],
          show: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$y = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  },
  computed: {
    sliderMarks() {
      if (!this.record.options.marks || this.record.options.marks.length == 0) {
        return null;
      }
      let p = {};
      this.record.options.marks.forEach((t) => {
        p[t.value] = t.label;
      });
      return p;
    }
  }
};
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_slider = resolveComponent("el-slider");
  return openBlock(), createBlock(_component_el_slider, {
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    style: normalizeStyle(`width:${_ctx.record.width}`),
    min: _ctx.record.options.min,
    max: _ctx.record.options.max,
    disabled: _ctx.recordDisabled,
    "show-input": _ctx.record.options.showInput,
    step: _ctx.record.options.step,
    marks: $options.sliderMarks,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["modelValue", "style", "min", "max", "disabled", "show-input", "step", "marks", "onFocus", "onBlur"]);
}
var BaseIndex$c = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y]]);
const obj$c = {};
obj$c.type = "slider";
obj$c.component = BaseIndex$c;
obj$c.seq = 12;
obj$c.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u6ED1\u52A8\u8F93\u5165\u6761",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6700\u5927\u503C",
          prop: "max",
          type: "number",
          min: 1,
          default: 5,
          span: 24
        },
        {
          label: "\u6700\u5C0F\u503C",
          prop: "min",
          type: "number",
          min: 1,
          default: 0,
          span: 24
        },
        {
          label: "\u6B65\u957F",
          prop: "step",
          type: "number",
          min: 1,
          default: 0,
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          type: "number",
          span: 24
        },
        {
          label: "\u8F93\u5165\u6846",
          prop: "showInput",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u6807\u8BB0",
          prop: "marks",
          type: "kv",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$x = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  }
};
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_switch = resolveComponent("el-switch");
  return openBlock(), createBlock(_component_el_switch, {
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    "active-text": _ctx.record.options.activeText,
    "inactive-text": _ctx.record.options.inactiveText,
    disabled: _ctx.recordDisabled,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["modelValue", "active-text", "inactive-text", "disabled", "onFocus", "onBlur"]);
}
var BaseIndex$b = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x]]);
const obj$b = {};
obj$b.type = "switch";
obj$b.component = BaseIndex$b;
obj$b.seq = 16;
obj$b.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u5F00\u5173",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u9009\u4E2D\u6807\u7B7E",
          prop: "activeText",
          default: "\u662F",
          span: 24
        },
        {
          label: "\u672A\u9009\u4E2D\u6807\u7B7E",
          prop: "inactiveText",
          default: "\u5426",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$w = {
  mixins: [mixin$1],
  created() {
    this.updateSimpleDefaultValue();
  }
};
const _hoisted_1$l = { key: 1 };
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  return !_ctx.preview ? (openBlock(), createBlock(_component_el_input, {
    key: 0,
    type: "textarea",
    style: normalizeStyle(`width:${_ctx.record.width}`),
    placeholder: _ctx.record.options.placeholder,
    clearable: _ctx.record.options.clearable,
    disabled: _ctx.recordDisabled,
    rows: _ctx.record.options.rows,
    autosize: _ctx.record.options.autosize,
    maxlength: _ctx.record.options.maxLength > 0 ? _ctx.record.options.maxLength : null,
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, null, 8, ["style", "placeholder", "clearable", "disabled", "rows", "autosize", "maxlength", "modelValue", "onFocus", "onBlur"])) : (openBlock(), createElementBlock("span", _hoisted_1$l, toDisplayString(_ctx.models[_ctx.record.model]), 1));
}
var BaseIndex$a = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
const obj$a = {};
obj$a.type = "textarea";
obj$a.component = BaseIndex$a;
obj$a.seq = 2;
obj$a.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u6587\u672C\u6846",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          span: 24
        },
        {
          label: "\u8F93\u5165\u6846\u884C\u6570",
          prop: "rows",
          type: "number",
          default: 4,
          min: 1,
          span: 24
        },
        {
          label: "\u8F93\u5165\u63D0\u793A",
          prop: "placeholder",
          default: "\u8BF7\u8F93\u5165",
          span: 24
        },
        {
          label: "\u6700\u5927\u957F\u5EA6",
          type: "number",
          min: -1,
          max: 1e3,
          prop: "maxLength",
          span: 24
        },
        {
          label: "\u53EF\u6E05\u9664",
          prop: "clearable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u81EA\u52A8\u9AD8\u5EA6",
          prop: "autosize",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$v = {
  name: "ng-form-upload",
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: []
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    action: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String
    },
    listType: {
      type: String,
      default: "text"
    },
    limit: {
      type: Number
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String
    },
    drag: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object
    },
    preview: {
      type: Boolean,
      default: false
    },
    imgDownBut: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(val) {
      if (val && val.length > 0) {
        const valueNames = val.map((t) => t.name).join(",");
        const fileListNames = this.fileList.map((t) => t.name).join(",");
        if (fileListNames != valueNames) {
          this.fileList = val;
        }
      }
    }
  },
  computed: {
    uploadHeader() {
      let hs = {};
      if (this.record && this.record.options && this.record.options.headers) {
        this.record.options.headers.forEach((t) => {
          hs[t.label] = t.value;
        });
      }
      const nghttpConfig = window.nghttpConfig;
      if (nghttpConfig) {
        const config = { headers: {} };
        nghttpConfig(config);
        hs = __spreadValues(__spreadValues({}, hs), config.headers);
      }
      return hs;
    },
    uploadResponseFileUrl() {
      if (this.record && this.record.options && this.record.options.responseFileUrl) {
        return this.record.options.responseFileUrl;
      }
      return null;
    }
  },
  mounted() {
    if (this.value == null || this.value == void 0) {
      this.fileList = [];
    } else {
      this.fileList = this.value;
    }
  },
  methods: {
    beforeUpload(file) {
      const fileName = file.name;
      const ltSize = file.size / 1024 / 1024;
      const index1 = fileName.lastIndexOf(".");
      const index2 = fileName.length;
      const fileSuffix = fileName.substring(index1 + 1, index2);
      file.type;
      if (this.accept && this.accept.indexOf("image") >= 0 && !this.isAssetTypeAnImage(fileSuffix)) {
        this.$message.error("\u5F53\u524D\u56FE\u7247\u683C\u5F0F\u53EA\u652F\u6301:[png,jpg,jpeg,bmp]");
        return false;
      }
      if (this.record.options.limitSize && ltSize > this.record.options.limitSize) {
        this.$message.error("\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7" + this.record.options.limitSize + "MB!");
        return false;
      }
      return true;
    },
    isAssetTypeAnImage(ext) {
      return ["png", "jpg", "jpeg", "bmp"].indexOf(ext.toLowerCase()) !== -1;
    },
    handleSuccess(response, file, fileList) {
      const responseFileUrl = this.uploadResponseFileUrl;
      const objectPath2 = require("object-path");
      const fileUrl = objectPath2.get(response, responseFileUrl);
      if (fileUrl) {
        ({ name: file.name, size: file.size, url: fileUrl });
        const addData = [
          ...this.value,
          {
            name: file.name,
            size: file.size,
            url: fileUrl
          }
        ];
        this.$emit("input", addData);
      }
    },
    handleRemove(file, fileList) {
      const name = file.name;
      this.$emit("input", this.value.filter((val) => val.name != name));
    },
    handlePreview(file) {
      if (file.url) {
        this.dialogVisible = true;
        this.dialogImageUrl = file.url;
      } else {
        this.$message.error("\u627E\u4E0D\u5230\u6587\u4EF6\u4E0B\u8F7D\u8DEF\u5F84");
      }
    },
    reviewDown(file) {
      this.handlePreview(file);
    },
    fileDown(file) {
      if (file.url) {
        window.open(file.url);
      } else {
        this.$message.error("\u627E\u4E0D\u5230\u6587\u4EF6\u4E0B\u8F7D\u8DEF\u5F84");
      }
    }
  }
};
const _hoisted_1$k = { key: 0 };
const _hoisted_2$g = { key: 0 };
const _hoisted_3$c = ["onClick", "src"];
const _hoisted_4$a = {
  key: 1,
  class: "el-upload-list el-upload-list--text"
};
const _hoisted_5$9 = ["tabindex", "onClick"];
const _hoisted_6$8 = {
  class: "el-upload-list__item-name",
  style: { "cursor": "pointer" }
};
const _hoisted_7$3 = { class: "el-upload-list__item-status-label" };
const _hoisted_8$3 = /* @__PURE__ */ createTextVNode("\u9009\u53D6\u6587\u4EF6");
const _hoisted_9$2 = /* @__PURE__ */ createElementVNode("div", { class: "el-upload__tip" }, "\u8BF7\u9009\u62E9\u56FE\u7247\uFF0C\u4E14\u4E0D\u8D85\u8FC7500kb", -1);
const _hoisted_10$1 = ["src"];
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Document = resolveComponent("Document");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_UploadSuccess = resolveComponent("UploadSuccess");
  const _component_el_button = resolveComponent("el-button");
  const _component_Plus = resolveComponent("Plus");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_dialog = resolveComponent("el-dialog");
  return openBlock(), createElementBlock("div", null, [
    _ctx.renderPreview || $props.disabled ? (openBlock(), createElementBlock("div", _hoisted_1$k, [
      $props.accept && $props.accept.indexOf("image") >= 0 && $props.listType && $props.listType.indexOf("picture-card") >= 0 ? (openBlock(), createElementBlock("div", _hoisted_2$g, [
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.fileList, (item, index2) => {
            return openBlock(), createElementBlock("li", {
              style: { "float": "left", "margin-right": "20px", "list-style": "none" },
              key: index2
            }, [
              createElementVNode("img", {
                onClick: ($event) => $options.reviewDown(item),
                src: item.url,
                class: normalizeClass([_ctx.direction == null || _ctx.direction == false ? "avatar" : "vertical"]),
                style: { "max-height": "150px", "max-width": "150px", "cursor": "pointer" }
              }, null, 10, _hoisted_3$c)
            ]);
          }), 128))
        ])
      ])) : (openBlock(), createElementBlock("ul", _hoisted_4$a, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.fileList, (item, index2) => {
          return openBlock(), createElementBlock("li", {
            key: index2,
            tabindex: index2,
            class: "el-upload-list__item pointer",
            style: { "cursor": "pointer" },
            onClick: ($event) => $options.fileDown(item)
          }, [
            createElementVNode("a", _hoisted_6$8, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_Document)
                ]),
                _: 1
              }),
              createTextVNode(toDisplayString(item.name), 1)
            ]),
            createElementVNode("label", _hoisted_7$3, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_UploadSuccess)
                ]),
                _: 1
              })
            ])
          ], 8, _hoisted_5$9);
        }), 128))
      ]))
    ])) : (openBlock(), createBlock(_component_el_upload, {
      key: 1,
      class: "ng-form-upload",
      action: $props.action,
      drag: $props.drag,
      disabled: $props.disabled,
      multiple: $props.multiple,
      limit: $props.limit,
      headers: $options.uploadHeader,
      accept: $props.accept,
      "list-type": $props.listType,
      "with-credentials": $props.withCredentials,
      "before-upload": $options.beforeUpload,
      "on-success": $options.handleSuccess,
      "on-remove": $options.handleRemove,
      "on-preview": $options.handlePreview,
      "auto-upload": $props.autoUpload,
      "file-list": $data.fileList
    }, createSlots({ _: 2 }, [
      !_ctx.renderPreview ? {
        name: "trigger",
        fn: withCtx(() => [
          $props.listType != "picture-card" ? (openBlock(), createBlock(_component_el_button, {
            key: 0,
            slot: "trigger",
            disabled: $props.disabled,
            size: "small",
            type: "primary"
          }, {
            default: withCtx(() => [
              _hoisted_8$3
            ]),
            _: 1
          }, 8, ["disabled"])) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
            default: withCtx(() => [
              createVNode(_component_Plus)
            ]),
            _: 1
          }))
        ])
      } : void 0,
      $props.tip != void 0 ? {
        name: "tip",
        fn: withCtx(() => [
          _hoisted_9$2
        ])
      } : void 0
    ]), 1032, ["action", "drag", "disabled", "multiple", "limit", "headers", "accept", "list-type", "with-credentials", "before-upload", "on-success", "on-remove", "on-preview", "auto-upload", "file-list"])),
    createVNode(_component_el_dialog, {
      "append-to-body": true,
      modelValue: $data.dialogVisible,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.dialogVisible = $event)
    }, {
      default: withCtx(() => [
        createElementVNode("img", {
          width: "100%",
          src: $data.dialogImageUrl,
          alt: ""
        }, null, 8, _hoisted_10$1)
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
var Upload = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v]]);
const _sfc_main$u = {
  mixins: [mixin$1],
  components: {
    Upload
  },
  created() {
    this.updateArrayDefaultValue();
  }
};
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Upload = resolveComponent("Upload");
  return openBlock(), createBlock(_component_Upload, {
    style: normalizeStyle(`width:${_ctx.record.width}`),
    disabled: _ctx.recordDisabled,
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    record: _ctx.record,
    accept: "image/*",
    preview: _ctx.preview,
    "list-type": _ctx.record.options.listType,
    multiple: _ctx.record.options.multiple,
    action: _ctx.record.options.action,
    limit: _ctx.record.options.limit
  }, null, 8, ["style", "disabled", "modelValue", "record", "preview", "list-type", "multiple", "action", "limit"]);
}
var BaseIndex$9 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u]]);
const obj$9 = {};
obj$9.type = "uploadImg";
obj$9.component = BaseIndex$9;
obj$9.seq = 21;
obj$9.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u4E0A\u4F20\u56FE\u7247",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u4E0A\u4F20\u5730\u5740",
          prop: "action",
          type: "textarea",
          span: 24
        },
        {
          label: "epl\u5730\u5740",
          prop: "responseFileUrl",
          type: "textarea",
          placeholder: "\u4E0A\u4F20\u6210\u529F\u540E\u89E3\u6790\u6587\u4EF6url\u7684epl\u5730\u5740",
          span: 24
        },
        {
          label: "\u6837\u5F0F",
          prop: "listType",
          type: "radioButton",
          default: "picture-card",
          dicData: [
            { label: "text", value: "text" },
            { label: "picture", value: "picture" },
            { label: "card", value: "picture-card" }
          ],
          span: 24
        },
        {
          label: "\u6587\u4EF6\u5927\u5C0F",
          prop: "limitSize",
          type: "number",
          default: 10,
          placeholder: "\u6587\u4EF6\u5927\u5C0F(Mb)",
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          show: false,
          default: [],
          span: 24
        },
        {
          label: "\u591A\u9009",
          prop: "multiple",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u6700\u5927\u4E0A\u4F20\u6570\u91CF",
          prop: "limit",
          type: "number",
          default: 3,
          show: "$.options.multiple",
          placeholder: "\u6700\u5927\u4E0A\u4F20\u6587\u4EF6\u6570\u91CF",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u643A\u5E26\u5934\u4FE1\u606F",
          prop: "headers",
          type: "kv",
          default: [],
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$t = {
  mixins: [mixin$1],
  components: {
    Upload
  },
  created() {
    this.updateArrayDefaultValue();
  }
};
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Upload = resolveComponent("Upload");
  return openBlock(), createBlock(_component_Upload, {
    style: normalizeStyle(`width:${_ctx.record.width}`),
    disabled: _ctx.recordDisabled,
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    record: _ctx.record,
    accept: "image/*",
    preview: _ctx.preview,
    "list-type": _ctx.record.options.listType,
    multiple: _ctx.record.options.multiple,
    action: _ctx.record.options.action,
    limit: _ctx.record.options.limit
  }, null, 8, ["style", "disabled", "modelValue", "record", "preview", "list-type", "multiple", "action", "limit"]);
}
var BaseIndex$8 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t]]);
const obj$8 = {};
obj$8.type = "uploadFile";
obj$8.component = BaseIndex$8;
obj$8.seq = 22;
obj$8.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u4E0A\u4F20\u6587\u4EF6",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u4E0A\u4F20\u5730\u5740",
          prop: "action",
          type: "textarea",
          span: 24
        },
        {
          label: "epl\u5730\u5740",
          prop: "responseFileUrl",
          type: "textarea",
          placeholder: "\u4E0A\u4F20\u6210\u529F\u540E\u89E3\u6790\u6587\u4EF6url\u7684epl\u5730\u5740",
          span: 24
        },
        {
          label: "\u6587\u4EF6\u7C7B\u578B",
          prop: "accept",
          placeholder: "\u6587\u4EF6\u7C7B\u578B",
          span: 24
        },
        {
          label: "\u6587\u4EF6\u5927\u5C0F",
          prop: "limitSize",
          type: "number",
          default: 10,
          placeholder: "\u6587\u4EF6\u5927\u5C0F(Mb)",
          span: 24
        },
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          show: false,
          default: [],
          span: 24
        },
        {
          label: "\u591A\u9009",
          prop: "multiple",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u6700\u5927\u4E0A\u4F20\u6570\u91CF",
          prop: "limit",
          type: "number",
          default: 3,
          show: "$.options.multiple",
          placeholder: "\u6700\u5927\u4E0A\u4F20\u6587\u4EF6\u6570\u91CF",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u643A\u5E26\u5934\u4FE1\u606F",
          prop: "headers",
          type: "kv",
          default: [],
          span: 24
        }
      ]
    }
  ]
};
let list$4 = [];
list$4.push(obj$n);
list$4.push(obj$m);
list$4.push(obj$l);
list$4.push(obj$k);
list$4.push(obj$j);
list$4.push(obj$i);
list$4.push(obj$h);
list$4.push(obj$g);
list$4.push(obj$f);
list$4.push(obj$e);
list$4.push(obj$d);
list$4.push(obj$c);
list$4.push(obj$b);
list$4.push(obj$a);
list$4.push(obj$9);
list$4.push(obj$8);
list$4 = list$4.sort(function(a, b) {
  return a.seq - b.seq;
});
var baseConfig = {
  type: "basic",
  name: "\u57FA\u7840\u7EC4\u4EF6",
  icon: "icon-tradingdata",
  list: list$4
};
const _sfc_main$s = {
  mixins: [mixin$1]
};
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_alert = resolveComponent("el-alert");
  return openBlock(), createElementBlock("div", {
    class: "form-label",
    style: normalizeStyle({ textAlign: _ctx.record.options.textAlign, width: _ctx.record.width })
  }, [
    createVNode(_component_el_alert, {
      title: _ctx.record.options.title,
      type: _ctx.record.options.type,
      description: _ctx.record.options.description,
      effect: _ctx.record.options.effect,
      closable: _ctx.record.options.closable,
      center: _ctx.record.options.center,
      "close-text": _ctx.record.options.closeText,
      "show-icon": _ctx.record.options.showIcon
    }, null, 8, ["title", "type", "description", "effect", "closable", "center", "close-text", "show-icon"])
  ], 4);
}
var BaseIndex$7 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
const obj$7 = {};
obj$7.type = "alert";
obj$7.component = BaseIndex$7;
obj$7.seq = 4;
obj$7.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u63D0\u793A",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      show: false,
      max: 1e3,
      default: 0,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6807\u9898",
          prop: "title",
          type: "textarea",
          default: "\u63D0\u793A\u6807\u9898",
          span: 24
        },
        {
          label: "\u8F85\u52A9\u6587\u5B57",
          prop: "description",
          type: "textarea",
          default: "\u8F85\u52A9\u5185\u5BB9",
          span: 24
        },
        {
          label: "\u7C7B\u578B",
          prop: "type",
          default: "success",
          type: "radioButton",
          dicData: [
            { label: "\u6210\u529F", value: "success" },
            { label: "\u544A\u8B66", value: "warning" },
            { label: "\u4FE1\u606F", value: "info" },
            { label: "\u5F02\u5E38", value: "error" }
          ],
          span: 24
        },
        {
          label: "\u4E3B\u9898",
          prop: "effect",
          default: "light",
          type: "radioButton",
          dicData: [
            { label: "\u9AD8\u4EAE", value: "light" },
            { label: "\u6697\u9ED1", value: "dark" }
          ],
          span: 24
        },
        {
          label: "\u53EF\u5173\u95ED",
          prop: "closable",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u5173\u95ED\u6587\u672C",
          prop: "closeText",
          show: "$.options.closable",
          placeholder: "\u4E0D\u9700\u8981\u5219\u4E0D\u586B",
          span: 24
        },
        {
          label: "\u5C45\u4E2D",
          prop: "center",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u663E\u793A\u56FE\u6807",
          prop: "showIcon",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$r = {
  mixins: [mixin$1]
};
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_divider = resolveComponent("el-divider");
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle(`width:${_ctx.record.width}`)
  }, [
    _ctx.record.label !== "" && _ctx.record.options.orientation ? (openBlock(), createBlock(_component_el_divider, {
      key: 0,
      "content-position": _ctx.record.options.orientation,
      direction: _ctx.record.options.direction ? _ctx.record.options.direction : "horizontal"
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.record.label), 1)
      ]),
      _: 1
    }, 8, ["content-position", "direction"])) : _ctx.record.label !== "" ? (openBlock(), createBlock(_component_el_divider, {
      key: 1,
      direction: _ctx.record.options.direction ? _ctx.record.options.direction : "horizontal"
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.record.label), 1)
      ]),
      _: 1
    }, 8, ["direction"])) : _ctx.record.label === "" ? (openBlock(), createBlock(_component_el_divider, {
      key: 2,
      direction: _ctx.record.options.direction ? _ctx.record.options.direction : "horizontal"
    }, null, 8, ["direction"])) : createCommentVNode("", true)
  ], 4);
}
var BaseIndex$6 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r]]);
const obj$6 = {};
obj$6.type = "divider";
obj$6.component = BaseIndex$6;
obj$6.seq = 3;
obj$6.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u5206\u5272\u7EBF",
      type: "textarea",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      show: false,
      max: 1e3,
      default: 0,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u65B9\u5411",
          prop: "direction",
          default: "horizontal",
          type: "radioButton",
          dicData: [
            { label: "\u6A2A\u5411", value: "horizontal" },
            { label: "\u7AD6\u5411", value: "vertical" }
          ],
          span: 24
        },
        {
          label: "\u6807\u7B7E\u4F4D\u7F6E",
          prop: "orientation",
          default: "center",
          type: "radioButton",
          show: '$.options.direction == "horizontal"',
          dicData: [
            { label: "\u5DE6", value: "left" },
            { label: "\u5C45\u4E2D", value: "center" },
            { label: "\u53F3", value: "right" }
          ],
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
const _sfc_main$q = {
  mixins: [mixin$1]
};
const _hoisted_1$j = ["id", "name", "innerHTML"];
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.record.model,
    name: _ctx.record.model,
    innerHTML: _ctx.record.options.defaultValue
  }, null, 8, _hoisted_1$j);
}
var BaseIndex$5 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q]]);
const obj$5 = {};
obj$5.type = "html";
obj$5.component = BaseIndex$5;
obj$5.seq = 2;
obj$5.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "HTML",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      show: false,
      max: 1e3,
      default: 0,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "HTML",
          prop: "defaultValue",
          type: "textarea",
          default: '<span style="color:red;">HTML</span>',
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
var index_vue_vue_type_style_index_0_lang$9 = "";
const _sfc_main$p = {
  mixins: [mixin$1],
  computed: {
    textStyle() {
      const style_ = {};
      if (this.record.options.bold) {
        style_.fontWeight = "bold";
      }
      if (this.record.options.fontSize && this.record.options.fontSize > 0) {
        style_.fontSize = this.record.options.fontSize + "px";
      }
      return style_;
    },
    showRequiredMark() {
      if (!this.record.options.showRequiredMark)
        return false;
      const fstr = this.record.options.showRequiredMarkScript;
      if (!fstr || !fstr.trim()) {
        return true;
      }
      const mark = dynamicFun(fstr, this.models);
      return mark;
    }
  }
};
const _hoisted_1$i = ["textContent"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "ng-form-label",
    style: normalizeStyle({ textAlign: _ctx.record.options.textAlign })
  }, [
    createElementVNode("label", {
      class: normalizeClass({ "is-required": $options.showRequiredMark }),
      textContent: toDisplayString(_ctx.record.label),
      style: normalizeStyle($options.textStyle)
    }, null, 14, _hoisted_1$i)
  ], 4);
}
var BaseIndex$4 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p]]);
const obj$4 = {};
obj$4.type = "text";
obj$4.component = BaseIndex$4;
obj$4.seq = 1;
obj$4.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u6807\u7B7E",
      type: "textarea",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      show: false,
      default: 0
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u5BF9\u9F50\u65B9\u5F0F",
          prop: "textAlign",
          default: "left",
          type: "radioButton",
          dicData: [
            { label: "\u5DE6", value: "left" },
            { label: "\u5C45\u4E2D", value: "center" },
            { label: "\u53F3", value: "right" }
          ],
          span: 24
        },
        {
          label: "\u5B57\u4F53\u5927\u5C0F",
          prop: "fontSize",
          type: "number",
          span: 24
        },
        {
          label: "\u5FC5\u9009\u6807\u8BB0",
          prop: "showRequiredMark",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u52A8\u6001\u5FC5\u9009",
          prop: "showRequiredMarkScript",
          show: "$.options.showRequiredMark",
          type: "textarea",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u52A0\u7C97",
          prop: "bold",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
let list$3 = [];
list$3.push(obj$7);
list$3.push(obj$6);
list$3.push(obj$5);
list$3.push(obj$4);
list$3 = list$3.sort(function(a, b) {
  return a.seq - b.seq;
});
var decorateConfig = {
  type: "decorate",
  name: "\u88C5\u9970\u7EC4\u4EF6",
  icon: "icon-tradingdata",
  list: list$3
};
var index_vue_vue_type_style_index_0_lang$8 = "";
const _sfc_main$o = {
  mixins: [mixin$1],
  components: {
    draggable
  },
  data() {
    return {
      showRightMenu: false,
      selectControlIndex: void 0
    };
  },
  created() {
    if (this.isDragPanel) {
      if (this.record && (this.record.list == null || this.record.list == void 0)) {
        this.record["list"] = [];
      }
    } else {
      if (!this.models)
        return;
      if (!this.models[this.record.model]) {
        let firstData = {};
        this.record.list.forEach((t) => {
          firstData[t.model] = "";
        });
        this.models[this.record.model] = [firstData];
      }
    }
  },
  methods: {
    dragEnd(evt, list2) {
      const nitem = cloneDeep(list2[evt.newIndex]);
      const key = nitem.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      list2[evt.newIndex] = nitem;
      this.handleSelectItem(nitem);
    },
    handleCopy(item) {
      const nitem = cloneDeep(item);
      const key = item.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      const oindex = this.record.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.record.list.splice(oindex + 1, 0, nitem);
      }
    },
    handleDetele(item) {
      const oindex = this.record.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.record.list.splice(oindex, 1);
      }
    },
    addControlData() {
      const data_ = {};
      this.record.list.forEach((t) => {
        data_[t.model] = "";
      });
      this.models[this.record.model].push(data_);
    },
    handleShowRightMenu(e, idx) {
      e.stopPropagation();
      if (!this.record.options.remove && !this.record.options.copy) {
        this.showRightMenu = false;
        this.selectControlIndex = void 0;
        return false;
      }
      if (this.showRightMenu) {
        this.showRightMenu = false;
      }
      let height = 210;
      let width = 280;
      const bodyHeight = document.body.clientHeight;
      const bodyWidth = document.body.clientWidth;
      if (e.clientY + height > bodyHeight) {
        this.menuTop = e.clientY - height;
      } else {
        this.menuTop = e.clientY;
      }
      if (e.clientX + width > bodyWidth) {
        this.menuLeft = e.clientX - width;
      } else {
        this.menuLeft = e.clientX + 20;
      }
      this.selectControlIndex = idx;
      this.$nextTick(() => {
        this.showRightMenu = true;
      });
      return false;
    },
    handleCopyData() {
      if (this.selectControlIndex == void 0 || this.selectControlIndex < 0) {
        this.showRightMenu = false;
        return;
      }
      if (!this.models[this.record.model] || this.models[this.record.model].length < this.selectControlIndex) {
        this.showRightMenu = false;
        return;
      }
      const cloneData = cloneDeep(this.models[this.record.model][this.selectControlIndex]);
      this.models[this.record.model].push(cloneData);
      this.showRightMenu = false;
    },
    handleRemoveData() {
      if (this.selectControlIndex == void 0 || this.selectControlIndex < 0) {
        return;
      }
      if (!this.models[this.record.model] || this.models[this.record.model].length < this.selectControlIndex) {
        this.showRightMenu = false;
        return;
      }
      if (this.models[this.record.model].length == 1) {
        this.$message.error(this.record.label + "\u5185\u4EC5\u5B58\u7684\u4E00\u6761\u6570\u636E\u4E0D\u80FD\u5220\u9664");
        this.showRightMenu = false;
        return;
      }
      this.models[this.record.model].splice(this.selectControlIndex, 1);
      this.showRightMenu = false;
    }
  }
};
const _hoisted_1$h = { key: 1 };
const _hoisted_2$f = ["onContextmenu"];
const _hoisted_3$b = /* @__PURE__ */ createTextVNode(" \u589E\u52A0 ");
const _hoisted_4$9 = /* @__PURE__ */ createTextVNode("\u590D\u5236 ");
const _hoisted_5$8 = { key: 1 };
const _hoisted_6$7 = /* @__PURE__ */ createTextVNode("\u5220\u9664 ");
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_node = resolveComponent("ng-form-node");
  const _component_draggable = resolveComponent("draggable");
  const _component_el_row = resolveComponent("el-row");
  const _component_ng_form_item = resolveComponent("ng-form-item");
  const _component_CirclePlusOutline = resolveComponent("CirclePlusOutline");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_Document = resolveComponent("Document");
  const _component_Delete = resolveComponent("Delete");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "ng-layout-controller drag-box",
      _ctx.record.options.customClass ? _ctx.record.options.customClass : ""
    ]),
    style: normalizeStyle(_ctx.record.options.customStyle)
  }, [
    _ctx.isDragPanel ? (openBlock(), createBlock(_component_el_row, {
      key: 0,
      gutter: 20,
      class: normalizeClass(["controller-row dragpanel", { "controller-bordered": _ctx.record.options && _ctx.record.options.bordered }])
    }, {
      default: withCtx(() => [
        createVNode(_component_draggable, mergeProps({
          tag: "div",
          class: "draggable-box"
        }, {
          group: "form-draggable",
          ghostClass: "moving",
          animation: 180,
          handle: ".drag-move"
        }, {
          "item-key": "key",
          "force-fallback": true,
          list: _ctx.record.list,
          onAdd: _cache[0] || (_cache[0] = ($event) => $options.dragEnd($event, _ctx.record.list))
        }), {
          item: withCtx(({ element }) => [
            (openBlock(), createBlock(_component_ng_form_node, {
              key: element.key,
              class: "drag-move",
              selectItem: _ctx.selectItem,
              record: element,
              onHandleSelectItem: _ctx.handleSelectItem,
              onHandleCopy: ($event) => $options.handleCopy(element),
              onHandleDetele: ($event) => $options.handleDetele(element)
            }, null, 8, ["selectItem", "record", "onHandleSelectItem", "onHandleCopy", "onHandleDetele"]))
          ]),
          _: 1
        }, 16, ["list"])
      ]),
      _: 1
    }, 8, ["class"])) : (openBlock(), createElementBlock("div", _hoisted_1$h, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.models[_ctx.record.model], (mdata, idx) => {
        return openBlock(), createElementBlock("div", {
          key: idx,
          class: normalizeClass([
            "table-layout",
            "form-table",
            _ctx.record.options.customClass ? _ctx.record.options.customClass : "",
            _ctx.record.options.bright ? "bright" : "",
            _ctx.record.options.small ? "small" : "",
            _ctx.record.options.bordered ? "controller-bordered" : ""
          ]),
          style: normalizeStyle(_ctx.record.options.customStyle),
          onContextmenu: withModifiers(($event) => $options.handleShowRightMenu($event, idx), ["prevent"])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.record.list, (item, index2) => {
            return openBlock(), createElementBlock("div", { key: index2 }, [
              createVNode(_component_ng_form_item, {
                ref_for: true,
                ref: "nestedComponents",
                disabled: _ctx.disabled,
                previewpreview: _ctx.preview,
                models: mdata,
                record: item,
                "prop-prepend": _ctx.record.model + "." + idx + "."
              }, null, 8, ["disabled", "previewpreview", "models", "record", "prop-prepend"])
            ]);
          }), 128))
        ], 46, _hoisted_2$f);
      }), 128)),
      !_ctx.preview && _ctx.record.options.add ? (openBlock(), createBlock(_component_el_button, {
        key: 0,
        type: "dashed",
        size: "small",
        disabled: _ctx.disabled,
        onClick: $options.addControlData
      }, {
        default: withCtx(() => [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_CirclePlusOutline)
            ]),
            _: 1
          }),
          _hoisted_3$b
        ]),
        _: 1
      }, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
      withDirectives(createElementVNode("div", {
        style: normalizeStyle({ "top": _ctx.menuTop + "px", "left": _ctx.menuLeft + "px" }),
        class: "right-menu",
        id: "rightMenu"
      }, [
        createElementVNode("ul", null, [
          _ctx.record.options.copy ? (openBlock(), createElementBlock("li", {
            key: 0,
            onClick: _cache[1] || (_cache[1] = (...args) => $options.handleCopyData && $options.handleCopyData(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_Document)
              ]),
              _: 1
            }),
            _hoisted_4$9
          ])) : createCommentVNode("", true),
          _ctx.record.options.copy && _ctx.record.options.remove ? (openBlock(), createElementBlock("hr", _hoisted_5$8)) : createCommentVNode("", true),
          _ctx.record.options.remove ? (openBlock(), createElementBlock("li", {
            key: 2,
            onClick: _cache[2] || (_cache[2] = (...args) => $options.handleRemoveData && $options.handleRemoveData(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_Delete)
              ]),
              _: 1
            }),
            _hoisted_6$7
          ])) : createCommentVNode("", true)
        ])
      ], 4), [
        [vShow, !_ctx.preview && $data.showRightMenu]
      ])
    ]))
  ], 6);
}
var BaseIndex$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
const obj$3 = {};
obj$3.type = "controller";
obj$3.component = BaseIndex$3;
obj$3.seq = 2;
obj$3.layout = true;
obj$3.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u5BB9\u5668",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      show: false,
      default: 0
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6837\u5F0Fstyle",
          prop: "customStyle",
          type: "textarea",
          span: 24
        },
        {
          label: "\u6837\u5F0Fclass",
          prop: "customClass",
          type: "textarea",
          span: 24
        },
        {
          label: "\u8FB9\u6846",
          prop: "bordered",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u53EF\u65B0\u589E",
          prop: "add",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u53EF\u590D\u5236",
          prop: "copy",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u53EF\u5220\u9664",
          prop: "remove",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
var index_vue_vue_type_style_index_0_lang$7 = "";
const _sfc_main$n = {
  mixins: [mixin$1],
  components: {
    draggable
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    dragEnd(evt, columns) {
      const nitem = cloneDeep(columns[evt.newIndex]);
      const key = nitem.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      columns[evt.newIndex] = nitem;
      this.handleSelectItem(nitem);
    },
    handleCopy(item) {
      const nitem = cloneDeep(item);
      const key = item.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      const oindex = this.record.columns.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.record.columns.splice(oindex + 1, 0, nitem);
      }
    },
    handleDetele(item) {
      const oindex = this.record.columns.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.record.columns.splice(oindex, 1);
      }
    }
  }
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_node = resolveComponent("ng-form-node");
  const _component_draggable = resolveComponent("draggable");
  const _component_ng_form_item = resolveComponent("ng-form-item");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  return openBlock(), createBlock(_component_el_row, {
    class: "ng-layout-row",
    gutter: _ctx.record.options.gutter
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.record.columns, (item, index2) => {
        return openBlock(), createBlock(_component_el_col, {
          class: "ng-layout-col",
          key: index2,
          span: item.span || 0
        }, {
          default: withCtx(() => [
            _ctx.isDragPanel ? (openBlock(), createBlock(_component_draggable, mergeProps({
              key: 0,
              tag: "div",
              class: "draggable-box grid-box"
            }, {
              group: "form-draggable",
              ghostClass: "moving",
              animation: 180,
              handle: ".drag-move"
            }, {
              "item-key": "key",
              "force-fallback": true,
              list: item.list,
              onAdd: ($event) => $options.dragEnd($event, item.list)
            }), {
              item: withCtx(({ element }) => [
                (openBlock(), createBlock(_component_ng_form_node, {
                  key: element.key,
                  class: "drag-move",
                  selectItem: _ctx.selectItem,
                  record: element,
                  onHandleSelectItem: _ctx.handleSelectItem,
                  onHandleCopy: ($event) => $options.handleCopy(element),
                  onHandleDetele: ($event) => $options.handleDetele(element)
                }, null, 8, ["selectItem", "record", "onHandleSelectItem", "onHandleCopy", "onHandleDetele"]))
              ]),
              _: 2
            }, 1040, ["list", "onAdd"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(item.list, (node) => {
              return openBlock(), createBlock(_component_ng_form_item, {
                key: node.key,
                disabled: _ctx.disabled,
                preview: _ctx.preview,
                models: _ctx.models,
                record: node
              }, null, 8, ["disabled", "preview", "models", "record"]);
            }), 128))
          ]),
          _: 2
        }, 1032, ["span"]);
      }), 128))
    ]),
    _: 1
  }, 8, ["gutter"]);
}
var BaseIndex$2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
var gridColProperties_vue_vue_type_style_index_0_lang = "";
const _sfc_main$m = {
  props: {
    value: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAddCol() {
      const addData = {
        span: 12,
        list: []
      };
      this.value.push(addData);
      this.$emit("update:value", this.value);
    },
    handleDelete(deleteIndex) {
      this.value.splice(deleteIndex, 1);
      this.$emit("update:value", this.value);
    }
  }
};
const _hoisted_1$g = ["onClick"];
const _hoisted_2$e = {
  key: 0,
  span: 24
};
const _hoisted_3$a = /* @__PURE__ */ createTextVNode("\u6DFB\u52A0");
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_col = resolveComponent("el-col");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (val, index2) => {
      return openBlock(), createElementBlock("div", {
        class: "layout-grid-col-pro",
        key: index2
      }, [
        createVNode(_component_el_col, { span: 18 }, {
          default: withCtx(() => [
            createVNode(_component_el_input_number, {
              style: { "width": "100%" },
              max: 24,
              modelValue: val.span,
              "onUpdate:modelValue": ($event) => val.span = $event,
              placeholder: "\u540D\u79F0"
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ]),
          _: 2
        }, 1024),
        createVNode(_component_el_col, { span: 6 }, {
          default: withCtx(() => [
            createElementVNode("div", {
              onClick: ($event) => $options.handleDelete(index2),
              class: "delete",
              title: "\u5220\u9664"
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_Delete)
                ]),
                _: 1
              })
            ], 8, _hoisted_1$g)
          ]),
          _: 2
        }, 1024)
      ]);
    }), 128)),
    !$props.disabled ? (openBlock(), createElementBlock("div", _hoisted_2$e, [
      createVNode(_component_el_button, {
        type: "primary",
        onClick: $options.handleAddCol
      }, {
        default: withCtx(() => [
          _hoisted_3$a
        ]),
        _: 1
      }, 8, ["onClick"])
    ])) : createCommentVNode("", true)
  ]);
}
var ColProperties = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
var properties_vue_vue_type_style_index_0_lang = "";
const _sfc_main$l = {
  components: {
    ColProperties
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  methods: {}
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ColProperties = resolveComponent("ColProperties");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  return openBlock(), createBlock(_component_el_collapse_item, {
    name: "grid",
    title: "\u6805\u683C"
  }, {
    default: withCtx(() => [
      createVNode(_component_el_form, {
        class: "layout-grid-properties",
        size: "small",
        "label-width": "80px",
        "label-position": "top"
      }, {
        default: withCtx(() => [
          $props.selectItem && $props.selectItem.columns && $props.selectItem.columns.length > 0 ? (openBlock(), createBlock(_component_el_form_item, {
            key: 0,
            label: "\u5217\u914D\u7F6E"
          }, {
            default: withCtx(() => [
              createVNode(_component_ColProperties, {
                value: $props.selectItem.columns
              }, null, 8, ["value"])
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var BaseProperties = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
const obj$2 = {};
obj$2.type = "grid";
obj$2.component = BaseIndex$2;
obj$2.properties = BaseProperties;
obj$2.seq = 3;
obj$2.layout = true;
obj$2.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u6805\u683C\u5E03\u5C40",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      show: false,
      default: 0
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6805\u683C\u9ED8\u8BA4\u503C",
      prop: "columns",
      show: false,
      default: [
        {
          span: 12,
          list: []
        },
        {
          span: 12,
          list: []
        }
      ],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6805\u683C\u95F4\u9694",
          prop: "gutter",
          type: "number",
          min: 0,
          default: 20,
          span: 24
        },
        {
          label: "\u6837\u5F0Fstyle",
          prop: "customStyle",
          type: "textarea",
          span: 24
        },
        {
          label: "\u6837\u5F0Fclass",
          prop: "customClass",
          type: "textarea",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
var build_vue_vue_type_style_index_0_lang$1 = "";
const _sfc_main$k = {
  mixins: [mixin$1],
  created() {
  },
  methods: {}
};
const _hoisted_1$f = { class: "table-box" };
const _hoisted_2$d = ["colspan", "rowspan"];
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_item = resolveComponent("ng-form-item");
  const _component_el_row = resolveComponent("el-row");
  return openBlock(), createElementBlock("div", _hoisted_1$f, [
    createElementVNode("table", {
      class: normalizeClass([
        "table-layout",
        "table-layout-build",
        "form-table",
        _ctx.record.options.customClass ? _ctx.record.options.customClass : "",
        _ctx.record.options.bright ? "bright" : "",
        _ctx.record.options.small ? "small" : "",
        _ctx.record.options.bordered ? "bordered" : ""
      ]),
      style: normalizeStyle(_ctx.record.options.customStyle)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.record.trs, (trItem, trIndex) => {
        return openBlock(), createElementBlock("tr", { key: trIndex }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(trItem.tds, (tdItem, tdIndex) => {
            return openBlock(), createElementBlock("td", {
              class: normalizeClass(["table-td", tdItem.class]),
              style: normalizeStyle(tdItem.style),
              key: tdIndex,
              colspan: tdItem.colspan,
              rowspan: tdItem.rowspan
            }, [
              createVNode(_component_el_row, { class: "row-td" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(tdItem.list, (item) => {
                    return openBlock(), createBlock(_component_ng_form_item, {
                      ref_for: true,
                      ref: "nestedComponents",
                      key: item.key,
                      disabled: _ctx.disabled,
                      preview: _ctx.preview,
                      models: _ctx.models,
                      record: item
                    }, null, 8, ["disabled", "preview", "models", "record"]);
                  }), 128))
                ]),
                _: 2
              }, 1024)
            ], 14, _hoisted_2$d);
          }), 128))
        ]);
      }), 128))
    ], 6)
  ]);
}
var Build = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
var design_vue_vue_type_style_index_0_lang = "";
const _sfc_main$j = {
  mixins: [mixin$1],
  components: {
    draggable
  },
  data() {
    return {
      showRightMenu: false,
      isMergeCol: false,
      menuTop: 0,
      menuLeft: 0,
      trIndex: 0,
      tdIndex: 0,
      styleVisible: false,
      tdStyle: {
        style: "",
        class: ""
      }
    };
  },
  created() {
    if (this.record && (this.record.trs == null || this.record.trs == void 0)) {
      this.record["trs"] = [
        {
          tds: [
            {
              colspan: 1,
              rowspan: 1,
              list: []
            },
            {
              colspan: 1,
              rowspan: 1,
              list: []
            }
          ]
        },
        {
          tds: [
            {
              colspan: 1,
              rowspan: 1,
              list: []
            },
            {
              colspan: 1,
              rowspan: 1,
              list: []
            }
          ]
        }
      ];
    }
  },
  mounted() {
    document.addEventListener("click", this.handleRemoveRightMenu, true);
    document.addEventListener("contextmenu", this.handleRemoveRightMenu, true);
  },
  destroyed() {
    document.removeEventListener("click", this.handleRemoveRightMenu, true);
    document.removeEventListener("contextmenu", this.handleRemoveRightMenu, true);
  },
  methods: {
    dragEnd(evt, list2) {
      const nitem = cloneDeep(list2[evt.newIndex]);
      const key = nitem.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      list2[evt.newIndex] = nitem;
      this.handleSelectItem(nitem);
    },
    handleCopy(item, parent) {
      const nitem = cloneDeep(item);
      const key = item.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      const oindex = parent.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        parent.list.splice(oindex + 1, 0, nitem);
      }
    },
    handleDetele(item, parent) {
      const oindex = parent.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        parent.list.splice(oindex, 1);
      }
    },
    handleDropMerge() {
      const td = this.record.trs[this.trIndex].tds[this.tdIndex];
      const colspan = td.colspan;
      const rowspan = td.rowspan;
      if (td && (colspan > 1 || rowspan > 1)) {
        this.record.trs[this.trIndex].tds[this.tdIndex].colspan = 1;
        this.record.trs[this.trIndex].tds[this.tdIndex].rowspan = 1;
        let cols = [];
        if (colspan > 1) {
          for (var i = 0; i < colspan - 1; i++) {
            cols.push({ colspan: 1, rowspan: 1, list: [] });
          }
          this.record.trs[this.trIndex].tds.splice(this.tdIndex + 1, 0, ...cols);
        }
        if (rowspan > 1) {
          cols.push({ colspan: 1, rowspan: 1, list: [] });
          for (var j = this.trIndex + 1; j < this.trIndex + rowspan; j++) {
            this.record.trs[j].tds.splice(this.tdIndex + 1, 0, ...cols);
          }
        }
      }
    },
    handleDownMerge() {
      if (this.record.trs.length - this.record.trs[this.trIndex].tds[this.tdIndex].rowspan <= this.trIndex) {
        this.$message.error("\u5F53\u524D\u662F\u6700\u540E\u4E00\u884C\uFF0C\u65E0\u6CD5\u5411\u4E0B\u5408\u5E76");
        return false;
      }
      let rows = 0;
      this.record.trs[this.trIndex].tds.forEach((element, index2) => {
        if (index2 >= this.tdIndex) {
          return false;
        }
        if (element.rowspan > this.record.trs[this.trIndex].tds[this.tdIndex].rowspan) {
          rows += 1;
        }
      });
      if (this.record.trs[this.trIndex].tds[this.tdIndex].colspan !== this.record.trs[this.trIndex + 1].tds[this.tdIndex - rows].colspan) {
        this.$message.error("\u5F53\u524D\u8868\u683C\u65E0\u6CD5\u5411\u4E0B\u5408\u5E76");
        return false;
      }
      let rowspan = this.record.trs[this.trIndex].tds[this.tdIndex].rowspan;
      const mergeRowIndex = this.trIndex + rowspan;
      const mergeRow = this.record.trs[mergeRowIndex];
      const mergeCol = mergeRow.tds[this.tdIndex];
      this.record.trs[this.trIndex].tds[this.tdIndex].rowspan = rowspan + mergeCol.rowspan;
      this.record.trs[this.trIndex + rowspan].tds = this.record.trs[this.trIndex + rowspan].tds.filter((item, index2) => index2 != this.tdIndex);
    },
    handleRightMerge() {
      const sumCols = this.record.trs[this.trIndex].tds.map((item) => item.colspan).reduce(function(partial, value) {
        return partial + value;
      });
      if (sumCols - this.record.trs[this.trIndex].tds[this.tdIndex].colspan <= this.tdIndex) {
        this.$message.error("\u5F53\u524D\u662F\u6700\u540E\u4E00\u5217\uFF0C\u65E0\u6CD5\u5411\u53F3\u5408\u5E76");
        return false;
      }
      if (this.record.trs[this.trIndex].tds[this.tdIndex].rowspan !== this.record.trs[this.trIndex].tds[this.tdIndex + 1].rowspan) {
        this.$message.error("\u5F53\u524D\u8868\u683C\u65E0\u6CD5\u5411\u53F3\u5408\u5E76");
        return false;
      }
      this.record.trs[this.trIndex].tds[this.tdIndex].colspan += this.record.trs[this.trIndex].tds[this.tdIndex + 1].colspan;
      this.record.trs[this.trIndex].tds = this.record.trs[this.trIndex].tds.filter((item, index2) => {
        return index2 !== this.tdIndex + 1;
      });
    },
    handleAddCol() {
      this.record.trs.forEach((item) => {
        item.tds.splice(this.tdIndex + 1, 0, {
          colspan: 1,
          rowspan: 1,
          list: []
        });
      });
    },
    handleAddRow() {
      const sumCols = this.record.trs[0].tds.map((item) => item.colspan).reduce(function(partial, value) {
        return partial + value;
      });
      const rowJson = { tds: [] };
      for (let i = 0; i < sumCols; i++) {
        rowJson.tds.push({
          colspan: 1,
          rowspan: 1,
          list: []
        });
      }
      this.record.trs.splice(this.trIndex + 1, 0, rowJson);
    },
    handleRemoveRow() {
      const tri = this.trIndex;
      const len = this.record.trs.length;
      if (len <= 1) {
        this.$message.error("\u5F53\u524D\u662F\u6700\u540E\u4E00\u884C,\u65E0\u6CD5\u5220\u9664");
        return;
      }
      this.record.trs.splice(tri, 1);
    },
    handleRemoveCol() {
      const tdi = this.tdIndex;
      for (let i in this.record.trs) {
        let tds = this.record.trs[i].tds;
        if (tds.length <= 1) {
          this.$message.error("\u5F53\u524D\u53EA\u5269\u4E0B\u6700\u540E\u4E00\u5217,\u65E0\u6CD5\u5220\u9664");
          return;
        }
      }
      this.record.trs.forEach((t) => {
        t.tds.splice(tdi, 1);
      });
    },
    handleSettingStyle() {
      const td = this.record.trs[this.trIndex].tds[this.tdIndex];
      const class_ = td.class;
      const style_ = td.style;
      this.tdStyle.style = style_;
      this.tdStyle.class = class_;
      this.styleVisible = true;
    },
    settingStyle() {
      const td = this.record.trs[this.trIndex].tds[this.tdIndex];
      td.style = this.tdStyle.style;
      td.class = this.tdStyle.class;
      this.record.trs[this.trIndex].tds.splice(this.tdIndex, 1, td);
      this.styleVisible = false;
    },
    showRightMenuHandle(e, trIndex, tdIndex, mergeCol) {
      e.stopPropagation();
      this.showRightMenu = true;
      let height = 210;
      let width = 280;
      const bodyHeight = document.body.clientHeight;
      const bodyWidth = document.body.clientWidth;
      if (e.clientY + height > bodyHeight) {
        this.menuTop = e.clientY - height;
      } else {
        this.menuTop = e.clientY;
      }
      if (e.clientX + width > bodyWidth) {
        this.menuLeft = e.clientX - width;
      } else {
        this.menuLeft = e.clientX + 20;
      }
      this.trIndex = trIndex;
      this.tdIndex = tdIndex;
      this.isMergeCol = mergeCol;
      return false;
    },
    handleRemoveRightMenu() {
      this.showRightMenu = false;
    }
  }
};
const _hoisted_1$e = ["colspan", "rowspan", "onContextmenu"];
const _hoisted_2$c = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-magic-stick" }, null, -1);
const _hoisted_3$9 = /* @__PURE__ */ createTextVNode("\u6837\u5F0F\u914D\u7F6E");
const _hoisted_4$8 = [
  _hoisted_2$c,
  _hoisted_3$9
];
const _hoisted_5$7 = /* @__PURE__ */ createElementVNode("hr", null, null, -1);
const _hoisted_6$6 = /* @__PURE__ */ createTextVNode("\u89E3\u9664\u5408\u5E76 ");
const _hoisted_7$2 = /* @__PURE__ */ createElementVNode("hr", null, null, -1);
const _hoisted_8$2 = /* @__PURE__ */ createTextVNode("\u5411\u4E0B\u5408\u5E76 ");
const _hoisted_9$1 = /* @__PURE__ */ createTextVNode("\u5411\u53F3\u5408\u5E76 ");
const _hoisted_10 = /* @__PURE__ */ createTextVNode("\u589E\u52A0\u4E00\u5217 ");
const _hoisted_11 = /* @__PURE__ */ createTextVNode("\u589E\u52A0\u4E00\u884C ");
const _hoisted_12 = /* @__PURE__ */ createElementVNode("hr", null, null, -1);
const _hoisted_13 = /* @__PURE__ */ createTextVNode("\u5220\u9664\u5F53\u524D\u884C ");
const _hoisted_14 = /* @__PURE__ */ createTextVNode("\u5220\u9664\u5F53\u524D\u5217 ");
const _hoisted_15 = { class: "dialog-footer" };
const _hoisted_16 = /* @__PURE__ */ createTextVNode("\u53D6 \u6D88");
const _hoisted_17 = /* @__PURE__ */ createTextVNode("\u786E \u5B9A");
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form_node = resolveComponent("ng-form-node");
  const _component_el_row = resolveComponent("el-row");
  const _component_draggable = resolveComponent("draggable");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_Bottom = resolveComponent("Bottom");
  const _component_Right = resolveComponent("Right");
  const _component_ZoomIn = resolveComponent("ZoomIn");
  const _component_ZoomOut = resolveComponent("ZoomOut");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");
  return openBlock(), createElementBlock("div", {
    class: "table-box",
    onClick: _cache[12] || (_cache[12] = withModifiers(($event) => _ctx.handleSelectItem(_ctx.record), ["stop"]))
  }, [
    createElementVNode("table", {
      class: normalizeClass([
        "table-layout",
        "form-table",
        _ctx.record.options.customClass ? _ctx.record.options.customClass : "",
        _ctx.record.options.bright ? "bright" : "",
        _ctx.record.options.small ? "small" : "",
        _ctx.record.options.bordered ? "bordered" : ""
      ]),
      style: normalizeStyle(_ctx.record.options.customStyle)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.record.trs, (trItem, trIndex) => {
        return openBlock(), createElementBlock("tr", { key: trIndex }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(trItem.tds, (tdItem, tdIndex) => {
            return openBlock(), createElementBlock("td", {
              class: normalizeClass(["table-td", tdItem.class]),
              style: normalizeStyle(tdItem.style),
              key: tdIndex,
              colspan: tdItem.colspan,
              rowspan: tdItem.rowspan,
              onContextmenu: withModifiers(($event) => $options.showRightMenuHandle($event, trIndex, tdIndex, tdItem.colspan > 1 || tdItem.rowspan > 1), ["prevent"])
            }, [
              createVNode(_component_draggable, mergeProps({
                tag: "div",
                class: "draggable-box td-draggable",
                style: { "min-height": (tdItem.rowspan > 1 ? tdItem.rowspan * 65 : 65) + "px" }
              }, {
                group: "form-draggable",
                ghostClass: "moving",
                animation: 180,
                handle: ".drag-move"
              }, {
                "force-fallback": true,
                list: tdItem.list,
                "item-key": "key",
                onAdd: ($event) => $options.dragEnd($event, tdItem.list)
              }), {
                item: withCtx(({ element }) => [
                  (openBlock(), createBlock(_component_el_row, {
                    class: "td-row",
                    key: element.key
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ng_form_node, {
                        class: "drag-move",
                        selectItem: _ctx.selectItem,
                        record: element,
                        onHandleSelectItem: _ctx.handleSelectItem,
                        onHandleCopy: ($event) => $options.handleCopy(element, tdItem),
                        onHandleDetele: ($event) => $options.handleDetele(element, tdItem)
                      }, null, 8, ["selectItem", "record", "onHandleSelectItem", "onHandleCopy", "onHandleDetele"])
                    ]),
                    _: 2
                  }, 1024))
                ]),
                _: 2
              }, 1040, ["style", "list", "onAdd"])
            ], 46, _hoisted_1$e);
          }), 128))
        ]);
      }), 128))
    ], 6),
    withDirectives(createElementVNode("div", {
      style: normalizeStyle({ "top": $data.menuTop + "px", "left": $data.menuLeft + "px" }),
      class: "right-menu",
      id: "table-design-rightmenu"
    }, [
      createElementVNode("ul", null, [
        createElementVNode("li", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleSettingStyle && $options.handleSettingStyle(...args))
        }, _hoisted_4$8),
        _hoisted_5$7,
        $data.isMergeCol ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("li", {
            onClick: _cache[1] || (_cache[1] = (...args) => $options.handleDropMerge && $options.handleDropMerge(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_Delete)
              ]),
              _: 1
            }),
            _hoisted_6$6
          ]),
          _hoisted_7$2
        ], 64)) : createCommentVNode("", true),
        createElementVNode("li", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.handleDownMerge && $options.handleDownMerge(...args))
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_Bottom)
            ]),
            _: 1
          }),
          _hoisted_8$2
        ]),
        createElementVNode("li", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.handleRightMerge && $options.handleRightMerge(...args))
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_Right)
            ]),
            _: 1
          }),
          _hoisted_9$1
        ]),
        createElementVNode("li", {
          onClick: _cache[4] || (_cache[4] = (...args) => $options.handleAddCol && $options.handleAddCol(...args))
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_ZoomIn)
            ]),
            _: 1
          }),
          _hoisted_10
        ]),
        createElementVNode("li", {
          onClick: _cache[5] || (_cache[5] = (...args) => $options.handleAddRow && $options.handleAddRow(...args))
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_ZoomIn)
            ]),
            _: 1
          }),
          _hoisted_11
        ]),
        _hoisted_12,
        createElementVNode("li", {
          onClick: _cache[6] || (_cache[6] = (...args) => $options.handleRemoveRow && $options.handleRemoveRow(...args))
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_ZoomOut)
            ]),
            _: 1
          }),
          _hoisted_13
        ]),
        createElementVNode("li", {
          onClick: _cache[7] || (_cache[7] = (...args) => $options.handleRemoveCol && $options.handleRemoveCol(...args))
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_ZoomOut)
            ]),
            _: 1
          }),
          _hoisted_14
        ])
      ])
    ], 4), [
      [vShow, $data.showRightMenu]
    ]),
    createVNode(_component_el_dialog, {
      title: "\u8868\u5185\u5355\u5143\u683C\u6837\u5F0F\u914D\u7F6E",
      modelValue: $data.styleVisible,
      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.styleVisible = $event),
      style: { "top": "20px" },
      "append-to-body": true
    }, {
      footer: withCtx(() => [
        createElementVNode("span", _hoisted_15, [
          createVNode(_component_el_button, {
            onClick: _cache[10] || (_cache[10] = ($event) => $data.styleVisible = false)
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }),
          createVNode(_component_el_button, {
            type: "primary",
            onClick: $options.settingStyle
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          size: "small",
          model: $data.tdStyle,
          "label-width": "80px"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "class" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: $data.tdStyle.class,
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.tdStyle.class = $event),
                  placeholder: "\u8BF7\u8F93\u5165class\u540D\u79F0"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "style" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  type: "textarea",
                  rows: 3,
                  modelValue: $data.tdStyle.style,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.tdStyle.style = $event),
                  placeholder: "\u8BF7\u8F93\u5165css\u6837\u5F0F"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
var Design = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
var index_vue_vue_type_style_index_0_lang$6 = "";
const _sfc_main$i = {
  mixins: [mixin$1],
  components: {
    Build,
    Design
  },
  data() {
    return {
      showRightMenu: false,
      selectControlIndex: void 0
    };
  },
  methods: {
    handleSelectItem(item) {
      this.$emit("handleSelectItem", item);
    }
  }
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Design = resolveComponent("Design");
  const _component_Build = resolveComponent("Build");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "ng-table-controller",
      _ctx.record.options.customClass ? _ctx.record.options.customClass : "",
      _ctx.record.options && _ctx.record.options.bordered ? "controller-bordered" : ""
    ]),
    style: normalizeStyle(_ctx.record.options.customStyle)
  }, [
    _ctx.isDragPanel ? (openBlock(), createBlock(_component_Design, {
      key: 0,
      record: _ctx.record,
      disabled: _ctx.disabled,
      preview: _ctx.preview,
      isDragPanel: _ctx.isDragPanel,
      selectItem: _ctx.selectItem,
      onHandleSelectItem: $options.handleSelectItem,
      models: _ctx.models
    }, null, 8, ["record", "disabled", "preview", "isDragPanel", "selectItem", "onHandleSelectItem", "models"])) : (openBlock(), createBlock(_component_Build, {
      key: 1,
      record: _ctx.record,
      disabled: _ctx.disabled,
      preview: _ctx.preview,
      isDragPanel: _ctx.isDragPanel,
      selectItem: _ctx.selectItem,
      models: _ctx.models
    }, null, 8, ["record", "disabled", "preview", "isDragPanel", "selectItem", "models"]))
  ], 6);
}
var BaseIndex$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
const obj$1 = {};
obj$1.type = "table";
obj$1.component = BaseIndex$1;
obj$1.seq = 1;
obj$1.layout = true;
obj$1.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u8868\u683C\u5E03\u5C40",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      show: false,
      default: 0
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u6837\u5F0Fstyle",
          prop: "customStyle",
          type: "textarea",
          span: 24
        },
        {
          label: "\u6837\u5F0Fclass",
          prop: "customClass",
          type: "textarea",
          span: 24
        },
        {
          label: "\u8FB9\u6846",
          prop: "bordered",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "hover\u70B9\u4EAE",
          prop: "bright",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u7D27\u51D1",
          prop: "small",
          type: "switch",
          default: true,
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
let list$2 = [];
list$2.push(obj$3);
list$2.push(obj$2);
list$2.push(obj$1);
list$2 = list$2.sort(function(a, b) {
  return a.seq - b.seq;
});
var layoutConfig = {
  type: "layout",
  name: "\u5E03\u5C40\u7EC4\u4EF6",
  icon: "icon-tradingdata",
  list: list$2
};
var AreaData = [
  {
    c: [
      {
        c: [
          {
            l: "\u4E1C\u57CE\u533A",
            v: "110101"
          },
          {
            l: "\u897F\u57CE\u533A",
            v: "110102"
          },
          {
            l: "\u671D\u9633\u533A",
            v: "110105"
          },
          {
            l: "\u4E30\u53F0\u533A",
            v: "110106"
          },
          {
            l: "\u77F3\u666F\u5C71\u533A",
            v: "110107"
          },
          {
            l: "\u6D77\u6DC0\u533A",
            v: "110108"
          },
          {
            l: "\u95E8\u5934\u6C9F\u533A",
            v: "110109"
          },
          {
            l: "\u623F\u5C71\u533A",
            v: "110111"
          },
          {
            l: "\u901A\u5DDE\u533A",
            v: "110112"
          },
          {
            l: "\u987A\u4E49\u533A",
            v: "110113"
          },
          {
            l: "\u660C\u5E73\u533A",
            v: "110114"
          },
          {
            l: "\u5927\u5174\u533A",
            v: "110115"
          },
          {
            l: "\u6000\u67D4\u533A",
            v: "110116"
          },
          {
            l: "\u5E73\u8C37\u533A",
            v: "110117"
          },
          {
            l: "\u5BC6\u4E91\u533A",
            v: "110118"
          },
          {
            l: "\u5EF6\u5E86\u533A",
            v: "110119"
          }
        ],
        l: "\u5E02\u8F96\u533A",
        v: "110100"
      }
    ],
    l: "\u5317\u4EAC\u5E02",
    v: "110000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u548C\u5E73\u533A",
            v: "120101"
          },
          {
            l: "\u6CB3\u4E1C\u533A",
            v: "120102"
          },
          {
            l: "\u6CB3\u897F\u533A",
            v: "120103"
          },
          {
            l: "\u5357\u5F00\u533A",
            v: "120104"
          },
          {
            l: "\u6CB3\u5317\u533A",
            v: "120105"
          },
          {
            l: "\u7EA2\u6865\u533A",
            v: "120106"
          },
          {
            l: "\u4E1C\u4E3D\u533A",
            v: "120110"
          },
          {
            l: "\u897F\u9752\u533A",
            v: "120111"
          },
          {
            l: "\u6D25\u5357\u533A",
            v: "120112"
          },
          {
            l: "\u5317\u8FB0\u533A",
            v: "120113"
          },
          {
            l: "\u6B66\u6E05\u533A",
            v: "120114"
          },
          {
            l: "\u5B9D\u577B\u533A",
            v: "120115"
          },
          {
            l: "\u6EE8\u6D77\u65B0\u533A",
            v: "120116"
          },
          {
            l: "\u5B81\u6CB3\u533A",
            v: "120117"
          },
          {
            l: "\u9759\u6D77\u533A",
            v: "120118"
          },
          {
            l: "\u84DF\u5DDE\u533A",
            v: "120119"
          }
        ],
        l: "\u5E02\u8F96\u533A",
        v: "120100"
      }
    ],
    l: "\u5929\u6D25\u5E02",
    v: "120000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u957F\u5B89\u533A",
            v: "130102"
          },
          {
            l: "\u6865\u897F\u533A",
            v: "130104"
          },
          {
            l: "\u65B0\u534E\u533A",
            v: "130105"
          },
          {
            l: "\u4E95\u9649\u77FF\u533A",
            v: "130107"
          },
          {
            l: "\u88D5\u534E\u533A",
            v: "130108"
          },
          {
            l: "\u85C1\u57CE\u533A",
            v: "130109"
          },
          {
            l: "\u9E7F\u6CC9\u533A",
            v: "130110"
          },
          {
            l: "\u683E\u57CE\u533A",
            v: "130111"
          },
          {
            l: "\u4E95\u9649\u53BF",
            v: "130121"
          },
          {
            l: "\u6B63\u5B9A\u53BF",
            v: "130123"
          },
          {
            l: "\u884C\u5510\u53BF",
            v: "130125"
          },
          {
            l: "\u7075\u5BFF\u53BF",
            v: "130126"
          },
          {
            l: "\u9AD8\u9091\u53BF",
            v: "130127"
          },
          {
            l: "\u6DF1\u6CFD\u53BF",
            v: "130128"
          },
          {
            l: "\u8D5E\u7687\u53BF",
            v: "130129"
          },
          {
            l: "\u65E0\u6781\u53BF",
            v: "130130"
          },
          {
            l: "\u5E73\u5C71\u53BF",
            v: "130131"
          },
          {
            l: "\u5143\u6C0F\u53BF",
            v: "130132"
          },
          {
            l: "\u8D75\u53BF",
            v: "130133"
          },
          {
            l: "\u77F3\u5BB6\u5E84\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "130171"
          },
          {
            l: "\u77F3\u5BB6\u5E84\u5FAA\u73AF\u5316\u5DE5\u56ED\u533A",
            v: "130172"
          },
          {
            l: "\u8F9B\u96C6\u5E02",
            v: "130181"
          },
          {
            l: "\u664B\u5DDE\u5E02",
            v: "130183"
          },
          {
            l: "\u65B0\u4E50\u5E02",
            v: "130184"
          }
        ],
        l: "\u77F3\u5BB6\u5E84\u5E02",
        v: "130100"
      },
      {
        c: [
          {
            l: "\u8DEF\u5357\u533A",
            v: "130202"
          },
          {
            l: "\u8DEF\u5317\u533A",
            v: "130203"
          },
          {
            l: "\u53E4\u51B6\u533A",
            v: "130204"
          },
          {
            l: "\u5F00\u5E73\u533A",
            v: "130205"
          },
          {
            l: "\u4E30\u5357\u533A",
            v: "130207"
          },
          {
            l: "\u4E30\u6DA6\u533A",
            v: "130208"
          },
          {
            l: "\u66F9\u5983\u7538\u533A",
            v: "130209"
          },
          {
            l: "\u6EE6\u5357\u53BF",
            v: "130224"
          },
          {
            l: "\u4E50\u4EAD\u53BF",
            v: "130225"
          },
          {
            l: "\u8FC1\u897F\u53BF",
            v: "130227"
          },
          {
            l: "\u7389\u7530\u53BF",
            v: "130229"
          },
          {
            l: "\u6CB3\u5317\u5510\u5C71\u82A6\u53F0\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "130271"
          },
          {
            l: "\u5510\u5C71\u5E02\u6C49\u6CBD\u7BA1\u7406\u533A",
            v: "130272"
          },
          {
            l: "\u5510\u5C71\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "130273"
          },
          {
            l: "\u6CB3\u5317\u5510\u5C71\u6D77\u6E2F\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "130274"
          },
          {
            l: "\u9075\u5316\u5E02",
            v: "130281"
          },
          {
            l: "\u8FC1\u5B89\u5E02",
            v: "130283"
          },
          {
            l: "\u6EE6\u5DDE\u5E02",
            v: "130284"
          }
        ],
        l: "\u5510\u5C71\u5E02",
        v: "130200"
      },
      {
        c: [
          {
            l: "\u6D77\u6E2F\u533A",
            v: "130302"
          },
          {
            l: "\u5C71\u6D77\u5173\u533A",
            v: "130303"
          },
          {
            l: "\u5317\u6234\u6CB3\u533A",
            v: "130304"
          },
          {
            l: "\u629A\u5B81\u533A",
            v: "130306"
          },
          {
            l: "\u9752\u9F99\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "130321"
          },
          {
            l: "\u660C\u9ECE\u53BF",
            v: "130322"
          },
          {
            l: "\u5362\u9F99\u53BF",
            v: "130324"
          },
          {
            l: "\u79E6\u7687\u5C9B\u5E02\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "130371"
          },
          {
            l: "\u5317\u6234\u6CB3\u65B0\u533A",
            v: "130372"
          }
        ],
        l: "\u79E6\u7687\u5C9B\u5E02",
        v: "130300"
      },
      {
        c: [
          {
            l: "\u90AF\u5C71\u533A",
            v: "130402"
          },
          {
            l: "\u4E1B\u53F0\u533A",
            v: "130403"
          },
          {
            l: "\u590D\u5174\u533A",
            v: "130404"
          },
          {
            l: "\u5CF0\u5CF0\u77FF\u533A",
            v: "130406"
          },
          {
            l: "\u80A5\u4E61\u533A",
            v: "130407"
          },
          {
            l: "\u6C38\u5E74\u533A",
            v: "130408"
          },
          {
            l: "\u4E34\u6F33\u53BF",
            v: "130423"
          },
          {
            l: "\u6210\u5B89\u53BF",
            v: "130424"
          },
          {
            l: "\u5927\u540D\u53BF",
            v: "130425"
          },
          {
            l: "\u6D89\u53BF",
            v: "130426"
          },
          {
            l: "\u78C1\u53BF",
            v: "130427"
          },
          {
            l: "\u90B1\u53BF",
            v: "130430"
          },
          {
            l: "\u9E21\u6CFD\u53BF",
            v: "130431"
          },
          {
            l: "\u5E7F\u5E73\u53BF",
            v: "130432"
          },
          {
            l: "\u9986\u9676\u53BF",
            v: "130433"
          },
          {
            l: "\u9B4F\u53BF",
            v: "130434"
          },
          {
            l: "\u66F2\u5468\u53BF",
            v: "130435"
          },
          {
            l: "\u90AF\u90F8\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "130471"
          },
          {
            l: "\u90AF\u90F8\u5180\u5357\u65B0\u533A",
            v: "130473"
          },
          {
            l: "\u6B66\u5B89\u5E02",
            v: "130481"
          }
        ],
        l: "\u90AF\u90F8\u5E02",
        v: "130400"
      },
      {
        c: [
          {
            l: "\u8944\u90FD\u533A",
            v: "130502"
          },
          {
            l: "\u4FE1\u90FD\u533A",
            v: "130503"
          },
          {
            l: "\u4EFB\u6CFD\u533A",
            v: "130505"
          },
          {
            l: "\u5357\u548C\u533A",
            v: "130506"
          },
          {
            l: "\u4E34\u57CE\u53BF",
            v: "130522"
          },
          {
            l: "\u5185\u4E18\u53BF",
            v: "130523"
          },
          {
            l: "\u67CF\u4E61\u53BF",
            v: "130524"
          },
          {
            l: "\u9686\u5C27\u53BF",
            v: "130525"
          },
          {
            l: "\u5B81\u664B\u53BF",
            v: "130528"
          },
          {
            l: "\u5DE8\u9E7F\u53BF",
            v: "130529"
          },
          {
            l: "\u65B0\u6CB3\u53BF",
            v: "130530"
          },
          {
            l: "\u5E7F\u5B97\u53BF",
            v: "130531"
          },
          {
            l: "\u5E73\u4E61\u53BF",
            v: "130532"
          },
          {
            l: "\u5A01\u53BF",
            v: "130533"
          },
          {
            l: "\u6E05\u6CB3\u53BF",
            v: "130534"
          },
          {
            l: "\u4E34\u897F\u53BF",
            v: "130535"
          },
          {
            l: "\u6CB3\u5317\u90A2\u53F0\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "130571"
          },
          {
            l: "\u5357\u5BAB\u5E02",
            v: "130581"
          },
          {
            l: "\u6C99\u6CB3\u5E02",
            v: "130582"
          }
        ],
        l: "\u90A2\u53F0\u5E02",
        v: "130500"
      },
      {
        c: [
          {
            l: "\u7ADE\u79C0\u533A",
            v: "130602"
          },
          {
            l: "\u83B2\u6C60\u533A",
            v: "130606"
          },
          {
            l: "\u6EE1\u57CE\u533A",
            v: "130607"
          },
          {
            l: "\u6E05\u82D1\u533A",
            v: "130608"
          },
          {
            l: "\u5F90\u6C34\u533A",
            v: "130609"
          },
          {
            l: "\u6D9E\u6C34\u53BF",
            v: "130623"
          },
          {
            l: "\u961C\u5E73\u53BF",
            v: "130624"
          },
          {
            l: "\u5B9A\u5174\u53BF",
            v: "130626"
          },
          {
            l: "\u5510\u53BF",
            v: "130627"
          },
          {
            l: "\u9AD8\u9633\u53BF",
            v: "130628"
          },
          {
            l: "\u5BB9\u57CE\u53BF",
            v: "130629"
          },
          {
            l: "\u6D9E\u6E90\u53BF",
            v: "130630"
          },
          {
            l: "\u671B\u90FD\u53BF",
            v: "130631"
          },
          {
            l: "\u5B89\u65B0\u53BF",
            v: "130632"
          },
          {
            l: "\u6613\u53BF",
            v: "130633"
          },
          {
            l: "\u66F2\u9633\u53BF",
            v: "130634"
          },
          {
            l: "\u8821\u53BF",
            v: "130635"
          },
          {
            l: "\u987A\u5E73\u53BF",
            v: "130636"
          },
          {
            l: "\u535A\u91CE\u53BF",
            v: "130637"
          },
          {
            l: "\u96C4\u53BF",
            v: "130638"
          },
          {
            l: "\u4FDD\u5B9A\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "130671"
          },
          {
            l: "\u4FDD\u5B9A\u767D\u6C9F\u65B0\u57CE",
            v: "130672"
          },
          {
            l: "\u6DBF\u5DDE\u5E02",
            v: "130681"
          },
          {
            l: "\u5B9A\u5DDE\u5E02",
            v: "130682"
          },
          {
            l: "\u5B89\u56FD\u5E02",
            v: "130683"
          },
          {
            l: "\u9AD8\u7891\u5E97\u5E02",
            v: "130684"
          }
        ],
        l: "\u4FDD\u5B9A\u5E02",
        v: "130600"
      },
      {
        c: [
          {
            l: "\u6865\u4E1C\u533A",
            v: "130702"
          },
          {
            l: "\u6865\u897F\u533A",
            v: "130703"
          },
          {
            l: "\u5BA3\u5316\u533A",
            v: "130705"
          },
          {
            l: "\u4E0B\u82B1\u56ED\u533A",
            v: "130706"
          },
          {
            l: "\u4E07\u5168\u533A",
            v: "130708"
          },
          {
            l: "\u5D07\u793C\u533A",
            v: "130709"
          },
          {
            l: "\u5F20\u5317\u53BF",
            v: "130722"
          },
          {
            l: "\u5EB7\u4FDD\u53BF",
            v: "130723"
          },
          {
            l: "\u6CBD\u6E90\u53BF",
            v: "130724"
          },
          {
            l: "\u5C1A\u4E49\u53BF",
            v: "130725"
          },
          {
            l: "\u851A\u53BF",
            v: "130726"
          },
          {
            l: "\u9633\u539F\u53BF",
            v: "130727"
          },
          {
            l: "\u6000\u5B89\u53BF",
            v: "130728"
          },
          {
            l: "\u6000\u6765\u53BF",
            v: "130730"
          },
          {
            l: "\u6DBF\u9E7F\u53BF",
            v: "130731"
          },
          {
            l: "\u8D64\u57CE\u53BF",
            v: "130732"
          },
          {
            l: "\u5F20\u5BB6\u53E3\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "130771"
          },
          {
            l: "\u5F20\u5BB6\u53E3\u5E02\u5BDF\u5317\u7BA1\u7406\u533A",
            v: "130772"
          },
          {
            l: "\u5F20\u5BB6\u53E3\u5E02\u585E\u5317\u7BA1\u7406\u533A",
            v: "130773"
          }
        ],
        l: "\u5F20\u5BB6\u53E3\u5E02",
        v: "130700"
      },
      {
        c: [
          {
            l: "\u53CC\u6865\u533A",
            v: "130802"
          },
          {
            l: "\u53CC\u6EE6\u533A",
            v: "130803"
          },
          {
            l: "\u9E70\u624B\u8425\u5B50\u77FF\u533A",
            v: "130804"
          },
          {
            l: "\u627F\u5FB7\u53BF",
            v: "130821"
          },
          {
            l: "\u5174\u9686\u53BF",
            v: "130822"
          },
          {
            l: "\u6EE6\u5E73\u53BF",
            v: "130824"
          },
          {
            l: "\u9686\u5316\u53BF",
            v: "130825"
          },
          {
            l: "\u4E30\u5B81\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "130826"
          },
          {
            l: "\u5BBD\u57CE\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "130827"
          },
          {
            l: "\u56F4\u573A\u6EE1\u65CF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "130828"
          },
          {
            l: "\u627F\u5FB7\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "130871"
          },
          {
            l: "\u5E73\u6CC9\u5E02",
            v: "130881"
          }
        ],
        l: "\u627F\u5FB7\u5E02",
        v: "130800"
      },
      {
        c: [
          {
            l: "\u65B0\u534E\u533A",
            v: "130902"
          },
          {
            l: "\u8FD0\u6CB3\u533A",
            v: "130903"
          },
          {
            l: "\u6CA7\u53BF",
            v: "130921"
          },
          {
            l: "\u9752\u53BF",
            v: "130922"
          },
          {
            l: "\u4E1C\u5149\u53BF",
            v: "130923"
          },
          {
            l: "\u6D77\u5174\u53BF",
            v: "130924"
          },
          {
            l: "\u76D0\u5C71\u53BF",
            v: "130925"
          },
          {
            l: "\u8083\u5B81\u53BF",
            v: "130926"
          },
          {
            l: "\u5357\u76AE\u53BF",
            v: "130927"
          },
          {
            l: "\u5434\u6865\u53BF",
            v: "130928"
          },
          {
            l: "\u732E\u53BF",
            v: "130929"
          },
          {
            l: "\u5B5F\u6751\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "130930"
          },
          {
            l: "\u6CB3\u5317\u6CA7\u5DDE\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "130971"
          },
          {
            l: "\u6CA7\u5DDE\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "130972"
          },
          {
            l: "\u6CA7\u5DDE\u6E24\u6D77\u65B0\u533A",
            v: "130973"
          },
          {
            l: "\u6CCA\u5934\u5E02",
            v: "130981"
          },
          {
            l: "\u4EFB\u4E18\u5E02",
            v: "130982"
          },
          {
            l: "\u9EC4\u9A85\u5E02",
            v: "130983"
          },
          {
            l: "\u6CB3\u95F4\u5E02",
            v: "130984"
          }
        ],
        l: "\u6CA7\u5DDE\u5E02",
        v: "130900"
      },
      {
        c: [
          {
            l: "\u5B89\u6B21\u533A",
            v: "131002"
          },
          {
            l: "\u5E7F\u9633\u533A",
            v: "131003"
          },
          {
            l: "\u56FA\u5B89\u53BF",
            v: "131022"
          },
          {
            l: "\u6C38\u6E05\u53BF",
            v: "131023"
          },
          {
            l: "\u9999\u6CB3\u53BF",
            v: "131024"
          },
          {
            l: "\u5927\u57CE\u53BF",
            v: "131025"
          },
          {
            l: "\u6587\u5B89\u53BF",
            v: "131026"
          },
          {
            l: "\u5927\u5382\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "131028"
          },
          {
            l: "\u5ECA\u574A\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "131071"
          },
          {
            l: "\u9738\u5DDE\u5E02",
            v: "131081"
          },
          {
            l: "\u4E09\u6CB3\u5E02",
            v: "131082"
          }
        ],
        l: "\u5ECA\u574A\u5E02",
        v: "131000"
      },
      {
        c: [
          {
            l: "\u6843\u57CE\u533A",
            v: "131102"
          },
          {
            l: "\u5180\u5DDE\u533A",
            v: "131103"
          },
          {
            l: "\u67A3\u5F3A\u53BF",
            v: "131121"
          },
          {
            l: "\u6B66\u9091\u53BF",
            v: "131122"
          },
          {
            l: "\u6B66\u5F3A\u53BF",
            v: "131123"
          },
          {
            l: "\u9976\u9633\u53BF",
            v: "131124"
          },
          {
            l: "\u5B89\u5E73\u53BF",
            v: "131125"
          },
          {
            l: "\u6545\u57CE\u53BF",
            v: "131126"
          },
          {
            l: "\u666F\u53BF",
            v: "131127"
          },
          {
            l: "\u961C\u57CE\u53BF",
            v: "131128"
          },
          {
            l: "\u6CB3\u5317\u8861\u6C34\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "131171"
          },
          {
            l: "\u8861\u6C34\u6EE8\u6E56\u65B0\u533A",
            v: "131172"
          },
          {
            l: "\u6DF1\u5DDE\u5E02",
            v: "131182"
          }
        ],
        l: "\u8861\u6C34\u5E02",
        v: "131100"
      }
    ],
    l: "\u6CB3\u5317\u7701",
    v: "130000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5C0F\u5E97\u533A",
            v: "140105"
          },
          {
            l: "\u8FCE\u6CFD\u533A",
            v: "140106"
          },
          {
            l: "\u674F\u82B1\u5CAD\u533A",
            v: "140107"
          },
          {
            l: "\u5C16\u8349\u576A\u533A",
            v: "140108"
          },
          {
            l: "\u4E07\u67CF\u6797\u533A",
            v: "140109"
          },
          {
            l: "\u664B\u6E90\u533A",
            v: "140110"
          },
          {
            l: "\u6E05\u5F90\u53BF",
            v: "140121"
          },
          {
            l: "\u9633\u66F2\u53BF",
            v: "140122"
          },
          {
            l: "\u5A04\u70E6\u53BF",
            v: "140123"
          },
          {
            l: "\u5C71\u897F\u8F6C\u578B\u7EFC\u5408\u6539\u9769\u793A\u8303\u533A",
            v: "140171"
          },
          {
            l: "\u53E4\u4EA4\u5E02",
            v: "140181"
          }
        ],
        l: "\u592A\u539F\u5E02",
        v: "140100"
      },
      {
        c: [
          {
            l: "\u65B0\u8363\u533A",
            v: "140212"
          },
          {
            l: "\u5E73\u57CE\u533A",
            v: "140213"
          },
          {
            l: "\u4E91\u5188\u533A",
            v: "140214"
          },
          {
            l: "\u4E91\u5DDE\u533A",
            v: "140215"
          },
          {
            l: "\u9633\u9AD8\u53BF",
            v: "140221"
          },
          {
            l: "\u5929\u9547\u53BF",
            v: "140222"
          },
          {
            l: "\u5E7F\u7075\u53BF",
            v: "140223"
          },
          {
            l: "\u7075\u4E18\u53BF",
            v: "140224"
          },
          {
            l: "\u6D51\u6E90\u53BF",
            v: "140225"
          },
          {
            l: "\u5DE6\u4E91\u53BF",
            v: "140226"
          },
          {
            l: "\u5C71\u897F\u5927\u540C\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "140271"
          }
        ],
        l: "\u5927\u540C\u5E02",
        v: "140200"
      },
      {
        c: [
          {
            l: "\u57CE\u533A",
            v: "140302"
          },
          {
            l: "\u77FF\u533A",
            v: "140303"
          },
          {
            l: "\u90CA\u533A",
            v: "140311"
          },
          {
            l: "\u5E73\u5B9A\u53BF",
            v: "140321"
          },
          {
            l: "\u76C2\u53BF",
            v: "140322"
          }
        ],
        l: "\u9633\u6CC9\u5E02",
        v: "140300"
      },
      {
        c: [
          {
            l: "\u6F5E\u5DDE\u533A",
            v: "140403"
          },
          {
            l: "\u4E0A\u515A\u533A",
            v: "140404"
          },
          {
            l: "\u5C6F\u7559\u533A",
            v: "140405"
          },
          {
            l: "\u6F5E\u57CE\u533A",
            v: "140406"
          },
          {
            l: "\u8944\u57A3\u53BF",
            v: "140423"
          },
          {
            l: "\u5E73\u987A\u53BF",
            v: "140425"
          },
          {
            l: "\u9ECE\u57CE\u53BF",
            v: "140426"
          },
          {
            l: "\u58F6\u5173\u53BF",
            v: "140427"
          },
          {
            l: "\u957F\u5B50\u53BF",
            v: "140428"
          },
          {
            l: "\u6B66\u4E61\u53BF",
            v: "140429"
          },
          {
            l: "\u6C81\u53BF",
            v: "140430"
          },
          {
            l: "\u6C81\u6E90\u53BF",
            v: "140431"
          },
          {
            l: "\u5C71\u897F\u957F\u6CBB\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A",
            v: "140471"
          }
        ],
        l: "\u957F\u6CBB\u5E02",
        v: "140400"
      },
      {
        c: [
          {
            l: "\u57CE\u533A",
            v: "140502"
          },
          {
            l: "\u6C81\u6C34\u53BF",
            v: "140521"
          },
          {
            l: "\u9633\u57CE\u53BF",
            v: "140522"
          },
          {
            l: "\u9675\u5DDD\u53BF",
            v: "140524"
          },
          {
            l: "\u6CFD\u5DDE\u53BF",
            v: "140525"
          },
          {
            l: "\u9AD8\u5E73\u5E02",
            v: "140581"
          }
        ],
        l: "\u664B\u57CE\u5E02",
        v: "140500"
      },
      {
        c: [
          {
            l: "\u6714\u57CE\u533A",
            v: "140602"
          },
          {
            l: "\u5E73\u9C81\u533A",
            v: "140603"
          },
          {
            l: "\u5C71\u9634\u53BF",
            v: "140621"
          },
          {
            l: "\u5E94\u53BF",
            v: "140622"
          },
          {
            l: "\u53F3\u7389\u53BF",
            v: "140623"
          },
          {
            l: "\u5C71\u897F\u6714\u5DDE\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "140671"
          },
          {
            l: "\u6000\u4EC1\u5E02",
            v: "140681"
          }
        ],
        l: "\u6714\u5DDE\u5E02",
        v: "140600"
      },
      {
        c: [
          {
            l: "\u6986\u6B21\u533A",
            v: "140702"
          },
          {
            l: "\u592A\u8C37\u533A",
            v: "140703"
          },
          {
            l: "\u6986\u793E\u53BF",
            v: "140721"
          },
          {
            l: "\u5DE6\u6743\u53BF",
            v: "140722"
          },
          {
            l: "\u548C\u987A\u53BF",
            v: "140723"
          },
          {
            l: "\u6614\u9633\u53BF",
            v: "140724"
          },
          {
            l: "\u5BFF\u9633\u53BF",
            v: "140725"
          },
          {
            l: "\u7941\u53BF",
            v: "140727"
          },
          {
            l: "\u5E73\u9065\u53BF",
            v: "140728"
          },
          {
            l: "\u7075\u77F3\u53BF",
            v: "140729"
          },
          {
            l: "\u4ECB\u4F11\u5E02",
            v: "140781"
          }
        ],
        l: "\u664B\u4E2D\u5E02",
        v: "140700"
      },
      {
        c: [
          {
            l: "\u76D0\u6E56\u533A",
            v: "140802"
          },
          {
            l: "\u4E34\u7317\u53BF",
            v: "140821"
          },
          {
            l: "\u4E07\u8363\u53BF",
            v: "140822"
          },
          {
            l: "\u95FB\u559C\u53BF",
            v: "140823"
          },
          {
            l: "\u7A37\u5C71\u53BF",
            v: "140824"
          },
          {
            l: "\u65B0\u7EDB\u53BF",
            v: "140825"
          },
          {
            l: "\u7EDB\u53BF",
            v: "140826"
          },
          {
            l: "\u57A3\u66F2\u53BF",
            v: "140827"
          },
          {
            l: "\u590F\u53BF",
            v: "140828"
          },
          {
            l: "\u5E73\u9646\u53BF",
            v: "140829"
          },
          {
            l: "\u82AE\u57CE\u53BF",
            v: "140830"
          },
          {
            l: "\u6C38\u6D4E\u5E02",
            v: "140881"
          },
          {
            l: "\u6CB3\u6D25\u5E02",
            v: "140882"
          }
        ],
        l: "\u8FD0\u57CE\u5E02",
        v: "140800"
      },
      {
        c: [
          {
            l: "\u5FFB\u5E9C\u533A",
            v: "140902"
          },
          {
            l: "\u5B9A\u8944\u53BF",
            v: "140921"
          },
          {
            l: "\u4E94\u53F0\u53BF",
            v: "140922"
          },
          {
            l: "\u4EE3\u53BF",
            v: "140923"
          },
          {
            l: "\u7E41\u5CD9\u53BF",
            v: "140924"
          },
          {
            l: "\u5B81\u6B66\u53BF",
            v: "140925"
          },
          {
            l: "\u9759\u4E50\u53BF",
            v: "140926"
          },
          {
            l: "\u795E\u6C60\u53BF",
            v: "140927"
          },
          {
            l: "\u4E94\u5BE8\u53BF",
            v: "140928"
          },
          {
            l: "\u5CA2\u5C9A\u53BF",
            v: "140929"
          },
          {
            l: "\u6CB3\u66F2\u53BF",
            v: "140930"
          },
          {
            l: "\u4FDD\u5FB7\u53BF",
            v: "140931"
          },
          {
            l: "\u504F\u5173\u53BF",
            v: "140932"
          },
          {
            l: "\u4E94\u53F0\u5C71\u98CE\u666F\u540D\u80DC\u533A",
            v: "140971"
          },
          {
            l: "\u539F\u5E73\u5E02",
            v: "140981"
          }
        ],
        l: "\u5FFB\u5DDE\u5E02",
        v: "140900"
      },
      {
        c: [
          {
            l: "\u5C27\u90FD\u533A",
            v: "141002"
          },
          {
            l: "\u66F2\u6C83\u53BF",
            v: "141021"
          },
          {
            l: "\u7FFC\u57CE\u53BF",
            v: "141022"
          },
          {
            l: "\u8944\u6C7E\u53BF",
            v: "141023"
          },
          {
            l: "\u6D2A\u6D1E\u53BF",
            v: "141024"
          },
          {
            l: "\u53E4\u53BF",
            v: "141025"
          },
          {
            l: "\u5B89\u6CFD\u53BF",
            v: "141026"
          },
          {
            l: "\u6D6E\u5C71\u53BF",
            v: "141027"
          },
          {
            l: "\u5409\u53BF",
            v: "141028"
          },
          {
            l: "\u4E61\u5B81\u53BF",
            v: "141029"
          },
          {
            l: "\u5927\u5B81\u53BF",
            v: "141030"
          },
          {
            l: "\u96B0\u53BF",
            v: "141031"
          },
          {
            l: "\u6C38\u548C\u53BF",
            v: "141032"
          },
          {
            l: "\u84B2\u53BF",
            v: "141033"
          },
          {
            l: "\u6C7E\u897F\u53BF",
            v: "141034"
          },
          {
            l: "\u4FAF\u9A6C\u5E02",
            v: "141081"
          },
          {
            l: "\u970D\u5DDE\u5E02",
            v: "141082"
          }
        ],
        l: "\u4E34\u6C7E\u5E02",
        v: "141000"
      },
      {
        c: [
          {
            l: "\u79BB\u77F3\u533A",
            v: "141102"
          },
          {
            l: "\u6587\u6C34\u53BF",
            v: "141121"
          },
          {
            l: "\u4EA4\u57CE\u53BF",
            v: "141122"
          },
          {
            l: "\u5174\u53BF",
            v: "141123"
          },
          {
            l: "\u4E34\u53BF",
            v: "141124"
          },
          {
            l: "\u67F3\u6797\u53BF",
            v: "141125"
          },
          {
            l: "\u77F3\u697C\u53BF",
            v: "141126"
          },
          {
            l: "\u5C9A\u53BF",
            v: "141127"
          },
          {
            l: "\u65B9\u5C71\u53BF",
            v: "141128"
          },
          {
            l: "\u4E2D\u9633\u53BF",
            v: "141129"
          },
          {
            l: "\u4EA4\u53E3\u53BF",
            v: "141130"
          },
          {
            l: "\u5B5D\u4E49\u5E02",
            v: "141181"
          },
          {
            l: "\u6C7E\u9633\u5E02",
            v: "141182"
          }
        ],
        l: "\u5415\u6881\u5E02",
        v: "141100"
      }
    ],
    l: "\u5C71\u897F\u7701",
    v: "140000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u65B0\u57CE\u533A",
            v: "150102"
          },
          {
            l: "\u56DE\u6C11\u533A",
            v: "150103"
          },
          {
            l: "\u7389\u6CC9\u533A",
            v: "150104"
          },
          {
            l: "\u8D5B\u7F55\u533A",
            v: "150105"
          },
          {
            l: "\u571F\u9ED8\u7279\u5DE6\u65D7",
            v: "150121"
          },
          {
            l: "\u6258\u514B\u6258\u53BF",
            v: "150122"
          },
          {
            l: "\u548C\u6797\u683C\u5C14\u53BF",
            v: "150123"
          },
          {
            l: "\u6E05\u6C34\u6CB3\u53BF",
            v: "150124"
          },
          {
            l: "\u6B66\u5DDD\u53BF",
            v: "150125"
          },
          {
            l: "\u547C\u548C\u6D69\u7279\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "150172"
          }
        ],
        l: "\u547C\u548C\u6D69\u7279\u5E02",
        v: "150100"
      },
      {
        c: [
          {
            l: "\u4E1C\u6CB3\u533A",
            v: "150202"
          },
          {
            l: "\u6606\u90FD\u4ED1\u533A",
            v: "150203"
          },
          {
            l: "\u9752\u5C71\u533A",
            v: "150204"
          },
          {
            l: "\u77F3\u62D0\u533A",
            v: "150205"
          },
          {
            l: "\u767D\u4E91\u9102\u535A\u77FF\u533A",
            v: "150206"
          },
          {
            l: "\u4E5D\u539F\u533A",
            v: "150207"
          },
          {
            l: "\u571F\u9ED8\u7279\u53F3\u65D7",
            v: "150221"
          },
          {
            l: "\u56FA\u9633\u53BF",
            v: "150222"
          },
          {
            l: "\u8FBE\u5C14\u7F55\u8302\u660E\u5B89\u8054\u5408\u65D7",
            v: "150223"
          },
          {
            l: "\u5305\u5934\u7A00\u571F\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "150271"
          }
        ],
        l: "\u5305\u5934\u5E02",
        v: "150200"
      },
      {
        c: [
          {
            l: "\u6D77\u52C3\u6E7E\u533A",
            v: "150302"
          },
          {
            l: "\u6D77\u5357\u533A",
            v: "150303"
          },
          {
            l: "\u4E4C\u8FBE\u533A",
            v: "150304"
          }
        ],
        l: "\u4E4C\u6D77\u5E02",
        v: "150300"
      },
      {
        c: [
          {
            l: "\u7EA2\u5C71\u533A",
            v: "150402"
          },
          {
            l: "\u5143\u5B9D\u5C71\u533A",
            v: "150403"
          },
          {
            l: "\u677E\u5C71\u533A",
            v: "150404"
          },
          {
            l: "\u963F\u9C81\u79D1\u5C14\u6C81\u65D7",
            v: "150421"
          },
          {
            l: "\u5DF4\u6797\u5DE6\u65D7",
            v: "150422"
          },
          {
            l: "\u5DF4\u6797\u53F3\u65D7",
            v: "150423"
          },
          {
            l: "\u6797\u897F\u53BF",
            v: "150424"
          },
          {
            l: "\u514B\u4EC0\u514B\u817E\u65D7",
            v: "150425"
          },
          {
            l: "\u7FC1\u725B\u7279\u65D7",
            v: "150426"
          },
          {
            l: "\u5580\u5587\u6C81\u65D7",
            v: "150428"
          },
          {
            l: "\u5B81\u57CE\u53BF",
            v: "150429"
          },
          {
            l: "\u6556\u6C49\u65D7",
            v: "150430"
          }
        ],
        l: "\u8D64\u5CF0\u5E02",
        v: "150400"
      },
      {
        c: [
          {
            l: "\u79D1\u5C14\u6C81\u533A",
            v: "150502"
          },
          {
            l: "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u4E2D\u65D7",
            v: "150521"
          },
          {
            l: "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u540E\u65D7",
            v: "150522"
          },
          {
            l: "\u5F00\u9C81\u53BF",
            v: "150523"
          },
          {
            l: "\u5E93\u4F26\u65D7",
            v: "150524"
          },
          {
            l: "\u5948\u66FC\u65D7",
            v: "150525"
          },
          {
            l: "\u624E\u9C81\u7279\u65D7",
            v: "150526"
          },
          {
            l: "\u901A\u8FBD\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "150571"
          },
          {
            l: "\u970D\u6797\u90ED\u52D2\u5E02",
            v: "150581"
          }
        ],
        l: "\u901A\u8FBD\u5E02",
        v: "150500"
      },
      {
        c: [
          {
            l: "\u4E1C\u80DC\u533A",
            v: "150602"
          },
          {
            l: "\u5EB7\u5DF4\u4EC0\u533A",
            v: "150603"
          },
          {
            l: "\u8FBE\u62C9\u7279\u65D7",
            v: "150621"
          },
          {
            l: "\u51C6\u683C\u5C14\u65D7",
            v: "150622"
          },
          {
            l: "\u9102\u6258\u514B\u524D\u65D7",
            v: "150623"
          },
          {
            l: "\u9102\u6258\u514B\u65D7",
            v: "150624"
          },
          {
            l: "\u676D\u9526\u65D7",
            v: "150625"
          },
          {
            l: "\u4E4C\u5BA1\u65D7",
            v: "150626"
          },
          {
            l: "\u4F0A\u91D1\u970D\u6D1B\u65D7",
            v: "150627"
          }
        ],
        l: "\u9102\u5C14\u591A\u65AF\u5E02",
        v: "150600"
      },
      {
        c: [
          {
            l: "\u6D77\u62C9\u5C14\u533A",
            v: "150702"
          },
          {
            l: "\u624E\u8D49\u8BFA\u5C14\u533A",
            v: "150703"
          },
          {
            l: "\u963F\u8363\u65D7",
            v: "150721"
          },
          {
            l: "\u83AB\u529B\u8FBE\u74E6\u8FBE\u65A1\u5C14\u65CF\u81EA\u6CBB\u65D7",
            v: "150722"
          },
          {
            l: "\u9102\u4F26\u6625\u81EA\u6CBB\u65D7",
            v: "150723"
          },
          {
            l: "\u9102\u6E29\u514B\u65CF\u81EA\u6CBB\u65D7",
            v: "150724"
          },
          {
            l: "\u9648\u5DF4\u5C14\u864E\u65D7",
            v: "150725"
          },
          {
            l: "\u65B0\u5DF4\u5C14\u864E\u5DE6\u65D7",
            v: "150726"
          },
          {
            l: "\u65B0\u5DF4\u5C14\u864E\u53F3\u65D7",
            v: "150727"
          },
          {
            l: "\u6EE1\u6D32\u91CC\u5E02",
            v: "150781"
          },
          {
            l: "\u7259\u514B\u77F3\u5E02",
            v: "150782"
          },
          {
            l: "\u624E\u5170\u5C6F\u5E02",
            v: "150783"
          },
          {
            l: "\u989D\u5C14\u53E4\u7EB3\u5E02",
            v: "150784"
          },
          {
            l: "\u6839\u6CB3\u5E02",
            v: "150785"
          }
        ],
        l: "\u547C\u4F26\u8D1D\u5C14\u5E02",
        v: "150700"
      },
      {
        c: [
          {
            l: "\u4E34\u6CB3\u533A",
            v: "150802"
          },
          {
            l: "\u4E94\u539F\u53BF",
            v: "150821"
          },
          {
            l: "\u78F4\u53E3\u53BF",
            v: "150822"
          },
          {
            l: "\u4E4C\u62C9\u7279\u524D\u65D7",
            v: "150823"
          },
          {
            l: "\u4E4C\u62C9\u7279\u4E2D\u65D7",
            v: "150824"
          },
          {
            l: "\u4E4C\u62C9\u7279\u540E\u65D7",
            v: "150825"
          },
          {
            l: "\u676D\u9526\u540E\u65D7",
            v: "150826"
          }
        ],
        l: "\u5DF4\u5F66\u6DD6\u5C14\u5E02",
        v: "150800"
      },
      {
        c: [
          {
            l: "\u96C6\u5B81\u533A",
            v: "150902"
          },
          {
            l: "\u5353\u8D44\u53BF",
            v: "150921"
          },
          {
            l: "\u5316\u5FB7\u53BF",
            v: "150922"
          },
          {
            l: "\u5546\u90FD\u53BF",
            v: "150923"
          },
          {
            l: "\u5174\u548C\u53BF",
            v: "150924"
          },
          {
            l: "\u51C9\u57CE\u53BF",
            v: "150925"
          },
          {
            l: "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u524D\u65D7",
            v: "150926"
          },
          {
            l: "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u4E2D\u65D7",
            v: "150927"
          },
          {
            l: "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u540E\u65D7",
            v: "150928"
          },
          {
            l: "\u56DB\u5B50\u738B\u65D7",
            v: "150929"
          },
          {
            l: "\u4E30\u9547\u5E02",
            v: "150981"
          }
        ],
        l: "\u4E4C\u5170\u5BDF\u5E03\u5E02",
        v: "150900"
      },
      {
        c: [
          {
            l: "\u4E4C\u5170\u6D69\u7279\u5E02",
            v: "152201"
          },
          {
            l: "\u963F\u5C14\u5C71\u5E02",
            v: "152202"
          },
          {
            l: "\u79D1\u5C14\u6C81\u53F3\u7FFC\u524D\u65D7",
            v: "152221"
          },
          {
            l: "\u79D1\u5C14\u6C81\u53F3\u7FFC\u4E2D\u65D7",
            v: "152222"
          },
          {
            l: "\u624E\u8D49\u7279\u65D7",
            v: "152223"
          },
          {
            l: "\u7A81\u6CC9\u53BF",
            v: "152224"
          }
        ],
        l: "\u5174\u5B89\u76DF",
        v: "152200"
      },
      {
        c: [
          {
            l: "\u4E8C\u8FDE\u6D69\u7279\u5E02",
            v: "152501"
          },
          {
            l: "\u9521\u6797\u6D69\u7279\u5E02",
            v: "152502"
          },
          {
            l: "\u963F\u5DF4\u560E\u65D7",
            v: "152522"
          },
          {
            l: "\u82CF\u5C3C\u7279\u5DE6\u65D7",
            v: "152523"
          },
          {
            l: "\u82CF\u5C3C\u7279\u53F3\u65D7",
            v: "152524"
          },
          {
            l: "\u4E1C\u4E4C\u73E0\u7A46\u6C81\u65D7",
            v: "152525"
          },
          {
            l: "\u897F\u4E4C\u73E0\u7A46\u6C81\u65D7",
            v: "152526"
          },
          {
            l: "\u592A\u4EC6\u5BFA\u65D7",
            v: "152527"
          },
          {
            l: "\u9576\u9EC4\u65D7",
            v: "152528"
          },
          {
            l: "\u6B63\u9576\u767D\u65D7",
            v: "152529"
          },
          {
            l: "\u6B63\u84DD\u65D7",
            v: "152530"
          },
          {
            l: "\u591A\u4F26\u53BF",
            v: "152531"
          },
          {
            l: "\u4E4C\u62C9\u76D6\u7BA1\u59D4\u4F1A",
            v: "152571"
          }
        ],
        l: "\u9521\u6797\u90ED\u52D2\u76DF",
        v: "152500"
      },
      {
        c: [
          {
            l: "\u963F\u62C9\u5584\u5DE6\u65D7",
            v: "152921"
          },
          {
            l: "\u963F\u62C9\u5584\u53F3\u65D7",
            v: "152922"
          },
          {
            l: "\u989D\u6D4E\u7EB3\u65D7",
            v: "152923"
          },
          {
            l: "\u5185\u8499\u53E4\u963F\u62C9\u5584\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "152971"
          }
        ],
        l: "\u963F\u62C9\u5584\u76DF",
        v: "152900"
      }
    ],
    l: "\u5185\u8499\u53E4\u81EA\u6CBB\u533A",
    v: "150000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u548C\u5E73\u533A",
            v: "210102"
          },
          {
            l: "\u6C88\u6CB3\u533A",
            v: "210103"
          },
          {
            l: "\u5927\u4E1C\u533A",
            v: "210104"
          },
          {
            l: "\u7687\u59D1\u533A",
            v: "210105"
          },
          {
            l: "\u94C1\u897F\u533A",
            v: "210106"
          },
          {
            l: "\u82CF\u5BB6\u5C6F\u533A",
            v: "210111"
          },
          {
            l: "\u6D51\u5357\u533A",
            v: "210112"
          },
          {
            l: "\u6C88\u5317\u65B0\u533A",
            v: "210113"
          },
          {
            l: "\u4E8E\u6D2A\u533A",
            v: "210114"
          },
          {
            l: "\u8FBD\u4E2D\u533A",
            v: "210115"
          },
          {
            l: "\u5EB7\u5E73\u53BF",
            v: "210123"
          },
          {
            l: "\u6CD5\u5E93\u53BF",
            v: "210124"
          },
          {
            l: "\u65B0\u6C11\u5E02",
            v: "210181"
          }
        ],
        l: "\u6C88\u9633\u5E02",
        v: "210100"
      },
      {
        c: [
          {
            l: "\u4E2D\u5C71\u533A",
            v: "210202"
          },
          {
            l: "\u897F\u5C97\u533A",
            v: "210203"
          },
          {
            l: "\u6C99\u6CB3\u53E3\u533A",
            v: "210204"
          },
          {
            l: "\u7518\u4E95\u5B50\u533A",
            v: "210211"
          },
          {
            l: "\u65C5\u987A\u53E3\u533A",
            v: "210212"
          },
          {
            l: "\u91D1\u5DDE\u533A",
            v: "210213"
          },
          {
            l: "\u666E\u5170\u5E97\u533A",
            v: "210214"
          },
          {
            l: "\u957F\u6D77\u53BF",
            v: "210224"
          },
          {
            l: "\u74E6\u623F\u5E97\u5E02",
            v: "210281"
          },
          {
            l: "\u5E84\u6CB3\u5E02",
            v: "210283"
          }
        ],
        l: "\u5927\u8FDE\u5E02",
        v: "210200"
      },
      {
        c: [
          {
            l: "\u94C1\u4E1C\u533A",
            v: "210302"
          },
          {
            l: "\u94C1\u897F\u533A",
            v: "210303"
          },
          {
            l: "\u7ACB\u5C71\u533A",
            v: "210304"
          },
          {
            l: "\u5343\u5C71\u533A",
            v: "210311"
          },
          {
            l: "\u53F0\u5B89\u53BF",
            v: "210321"
          },
          {
            l: "\u5CAB\u5CA9\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "210323"
          },
          {
            l: "\u6D77\u57CE\u5E02",
            v: "210381"
          }
        ],
        l: "\u978D\u5C71\u5E02",
        v: "210300"
      },
      {
        c: [
          {
            l: "\u65B0\u629A\u533A",
            v: "210402"
          },
          {
            l: "\u4E1C\u6D32\u533A",
            v: "210403"
          },
          {
            l: "\u671B\u82B1\u533A",
            v: "210404"
          },
          {
            l: "\u987A\u57CE\u533A",
            v: "210411"
          },
          {
            l: "\u629A\u987A\u53BF",
            v: "210421"
          },
          {
            l: "\u65B0\u5BBE\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "210422"
          },
          {
            l: "\u6E05\u539F\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "210423"
          }
        ],
        l: "\u629A\u987A\u5E02",
        v: "210400"
      },
      {
        c: [
          {
            l: "\u5E73\u5C71\u533A",
            v: "210502"
          },
          {
            l: "\u6EAA\u6E56\u533A",
            v: "210503"
          },
          {
            l: "\u660E\u5C71\u533A",
            v: "210504"
          },
          {
            l: "\u5357\u82AC\u533A",
            v: "210505"
          },
          {
            l: "\u672C\u6EAA\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "210521"
          },
          {
            l: "\u6853\u4EC1\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "210522"
          }
        ],
        l: "\u672C\u6EAA\u5E02",
        v: "210500"
      },
      {
        c: [
          {
            l: "\u5143\u5B9D\u533A",
            v: "210602"
          },
          {
            l: "\u632F\u5174\u533A",
            v: "210603"
          },
          {
            l: "\u632F\u5B89\u533A",
            v: "210604"
          },
          {
            l: "\u5BBD\u7538\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "210624"
          },
          {
            l: "\u4E1C\u6E2F\u5E02",
            v: "210681"
          },
          {
            l: "\u51E4\u57CE\u5E02",
            v: "210682"
          }
        ],
        l: "\u4E39\u4E1C\u5E02",
        v: "210600"
      },
      {
        c: [
          {
            l: "\u53E4\u5854\u533A",
            v: "210702"
          },
          {
            l: "\u51CC\u6CB3\u533A",
            v: "210703"
          },
          {
            l: "\u592A\u548C\u533A",
            v: "210711"
          },
          {
            l: "\u9ED1\u5C71\u53BF",
            v: "210726"
          },
          {
            l: "\u4E49\u53BF",
            v: "210727"
          },
          {
            l: "\u51CC\u6D77\u5E02",
            v: "210781"
          },
          {
            l: "\u5317\u9547\u5E02",
            v: "210782"
          }
        ],
        l: "\u9526\u5DDE\u5E02",
        v: "210700"
      },
      {
        c: [
          {
            l: "\u7AD9\u524D\u533A",
            v: "210802"
          },
          {
            l: "\u897F\u5E02\u533A",
            v: "210803"
          },
          {
            l: "\u9C85\u9C7C\u5708\u533A",
            v: "210804"
          },
          {
            l: "\u8001\u8FB9\u533A",
            v: "210811"
          },
          {
            l: "\u76D6\u5DDE\u5E02",
            v: "210881"
          },
          {
            l: "\u5927\u77F3\u6865\u5E02",
            v: "210882"
          }
        ],
        l: "\u8425\u53E3\u5E02",
        v: "210800"
      },
      {
        c: [
          {
            l: "\u6D77\u5DDE\u533A",
            v: "210902"
          },
          {
            l: "\u65B0\u90B1\u533A",
            v: "210903"
          },
          {
            l: "\u592A\u5E73\u533A",
            v: "210904"
          },
          {
            l: "\u6E05\u6CB3\u95E8\u533A",
            v: "210905"
          },
          {
            l: "\u7EC6\u6CB3\u533A",
            v: "210911"
          },
          {
            l: "\u961C\u65B0\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "210921"
          },
          {
            l: "\u5F70\u6B66\u53BF",
            v: "210922"
          }
        ],
        l: "\u961C\u65B0\u5E02",
        v: "210900"
      },
      {
        c: [
          {
            l: "\u767D\u5854\u533A",
            v: "211002"
          },
          {
            l: "\u6587\u5723\u533A",
            v: "211003"
          },
          {
            l: "\u5B8F\u4F1F\u533A",
            v: "211004"
          },
          {
            l: "\u5F13\u957F\u5CAD\u533A",
            v: "211005"
          },
          {
            l: "\u592A\u5B50\u6CB3\u533A",
            v: "211011"
          },
          {
            l: "\u8FBD\u9633\u53BF",
            v: "211021"
          },
          {
            l: "\u706F\u5854\u5E02",
            v: "211081"
          }
        ],
        l: "\u8FBD\u9633\u5E02",
        v: "211000"
      },
      {
        c: [
          {
            l: "\u53CC\u53F0\u5B50\u533A",
            v: "211102"
          },
          {
            l: "\u5174\u9686\u53F0\u533A",
            v: "211103"
          },
          {
            l: "\u5927\u6D3C\u533A",
            v: "211104"
          },
          {
            l: "\u76D8\u5C71\u53BF",
            v: "211122"
          }
        ],
        l: "\u76D8\u9526\u5E02",
        v: "211100"
      },
      {
        c: [
          {
            l: "\u94F6\u5DDE\u533A",
            v: "211202"
          },
          {
            l: "\u6E05\u6CB3\u533A",
            v: "211204"
          },
          {
            l: "\u94C1\u5CAD\u53BF",
            v: "211221"
          },
          {
            l: "\u897F\u4E30\u53BF",
            v: "211223"
          },
          {
            l: "\u660C\u56FE\u53BF",
            v: "211224"
          },
          {
            l: "\u8C03\u5175\u5C71\u5E02",
            v: "211281"
          },
          {
            l: "\u5F00\u539F\u5E02",
            v: "211282"
          }
        ],
        l: "\u94C1\u5CAD\u5E02",
        v: "211200"
      },
      {
        c: [
          {
            l: "\u53CC\u5854\u533A",
            v: "211302"
          },
          {
            l: "\u9F99\u57CE\u533A",
            v: "211303"
          },
          {
            l: "\u671D\u9633\u53BF",
            v: "211321"
          },
          {
            l: "\u5EFA\u5E73\u53BF",
            v: "211322"
          },
          {
            l: "\u5580\u5587\u6C81\u5DE6\u7FFC\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "211324"
          },
          {
            l: "\u5317\u7968\u5E02",
            v: "211381"
          },
          {
            l: "\u51CC\u6E90\u5E02",
            v: "211382"
          }
        ],
        l: "\u671D\u9633\u5E02",
        v: "211300"
      },
      {
        c: [
          {
            l: "\u8FDE\u5C71\u533A",
            v: "211402"
          },
          {
            l: "\u9F99\u6E2F\u533A",
            v: "211403"
          },
          {
            l: "\u5357\u7968\u533A",
            v: "211404"
          },
          {
            l: "\u7EE5\u4E2D\u53BF",
            v: "211421"
          },
          {
            l: "\u5EFA\u660C\u53BF",
            v: "211422"
          },
          {
            l: "\u5174\u57CE\u5E02",
            v: "211481"
          }
        ],
        l: "\u846B\u82A6\u5C9B\u5E02",
        v: "211400"
      }
    ],
    l: "\u8FBD\u5B81\u7701",
    v: "210000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5357\u5173\u533A",
            v: "220102"
          },
          {
            l: "\u5BBD\u57CE\u533A",
            v: "220103"
          },
          {
            l: "\u671D\u9633\u533A",
            v: "220104"
          },
          {
            l: "\u4E8C\u9053\u533A",
            v: "220105"
          },
          {
            l: "\u7EFF\u56ED\u533A",
            v: "220106"
          },
          {
            l: "\u53CC\u9633\u533A",
            v: "220112"
          },
          {
            l: "\u4E5D\u53F0\u533A",
            v: "220113"
          },
          {
            l: "\u519C\u5B89\u53BF",
            v: "220122"
          },
          {
            l: "\u957F\u6625\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "220171"
          },
          {
            l: "\u957F\u6625\u51C0\u6708\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "220172"
          },
          {
            l: "\u957F\u6625\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "220173"
          },
          {
            l: "\u957F\u6625\u6C7D\u8F66\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "220174"
          },
          {
            l: "\u6986\u6811\u5E02",
            v: "220182"
          },
          {
            l: "\u5FB7\u60E0\u5E02",
            v: "220183"
          },
          {
            l: "\u516C\u4E3B\u5CAD\u5E02",
            v: "220184"
          }
        ],
        l: "\u957F\u6625\u5E02",
        v: "220100"
      },
      {
        c: [
          {
            l: "\u660C\u9091\u533A",
            v: "220202"
          },
          {
            l: "\u9F99\u6F6D\u533A",
            v: "220203"
          },
          {
            l: "\u8239\u8425\u533A",
            v: "220204"
          },
          {
            l: "\u4E30\u6EE1\u533A",
            v: "220211"
          },
          {
            l: "\u6C38\u5409\u53BF",
            v: "220221"
          },
          {
            l: "\u5409\u6797\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "220271"
          },
          {
            l: "\u5409\u6797\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "220272"
          },
          {
            l: "\u5409\u6797\u4E2D\u56FD\u65B0\u52A0\u5761\u98DF\u54C1\u533A",
            v: "220273"
          },
          {
            l: "\u86DF\u6CB3\u5E02",
            v: "220281"
          },
          {
            l: "\u6866\u7538\u5E02",
            v: "220282"
          },
          {
            l: "\u8212\u5170\u5E02",
            v: "220283"
          },
          {
            l: "\u78D0\u77F3\u5E02",
            v: "220284"
          }
        ],
        l: "\u5409\u6797\u5E02",
        v: "220200"
      },
      {
        c: [
          {
            l: "\u94C1\u897F\u533A",
            v: "220302"
          },
          {
            l: "\u94C1\u4E1C\u533A",
            v: "220303"
          },
          {
            l: "\u68A8\u6811\u53BF",
            v: "220322"
          },
          {
            l: "\u4F0A\u901A\u6EE1\u65CF\u81EA\u6CBB\u53BF",
            v: "220323"
          },
          {
            l: "\u53CC\u8FBD\u5E02",
            v: "220382"
          }
        ],
        l: "\u56DB\u5E73\u5E02",
        v: "220300"
      },
      {
        c: [
          {
            l: "\u9F99\u5C71\u533A",
            v: "220402"
          },
          {
            l: "\u897F\u5B89\u533A",
            v: "220403"
          },
          {
            l: "\u4E1C\u4E30\u53BF",
            v: "220421"
          },
          {
            l: "\u4E1C\u8FBD\u53BF",
            v: "220422"
          }
        ],
        l: "\u8FBD\u6E90\u5E02",
        v: "220400"
      },
      {
        c: [
          {
            l: "\u4E1C\u660C\u533A",
            v: "220502"
          },
          {
            l: "\u4E8C\u9053\u6C5F\u533A",
            v: "220503"
          },
          {
            l: "\u901A\u5316\u53BF",
            v: "220521"
          },
          {
            l: "\u8F89\u5357\u53BF",
            v: "220523"
          },
          {
            l: "\u67F3\u6CB3\u53BF",
            v: "220524"
          },
          {
            l: "\u6885\u6CB3\u53E3\u5E02",
            v: "220581"
          },
          {
            l: "\u96C6\u5B89\u5E02",
            v: "220582"
          }
        ],
        l: "\u901A\u5316\u5E02",
        v: "220500"
      },
      {
        c: [
          {
            l: "\u6D51\u6C5F\u533A",
            v: "220602"
          },
          {
            l: "\u6C5F\u6E90\u533A",
            v: "220605"
          },
          {
            l: "\u629A\u677E\u53BF",
            v: "220621"
          },
          {
            l: "\u9756\u5B87\u53BF",
            v: "220622"
          },
          {
            l: "\u957F\u767D\u671D\u9C9C\u65CF\u81EA\u6CBB\u53BF",
            v: "220623"
          },
          {
            l: "\u4E34\u6C5F\u5E02",
            v: "220681"
          }
        ],
        l: "\u767D\u5C71\u5E02",
        v: "220600"
      },
      {
        c: [
          {
            l: "\u5B81\u6C5F\u533A",
            v: "220702"
          },
          {
            l: "\u524D\u90ED\u5C14\u7F57\u65AF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "220721"
          },
          {
            l: "\u957F\u5CAD\u53BF",
            v: "220722"
          },
          {
            l: "\u4E7E\u5B89\u53BF",
            v: "220723"
          },
          {
            l: "\u5409\u6797\u677E\u539F\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "220771"
          },
          {
            l: "\u6276\u4F59\u5E02",
            v: "220781"
          }
        ],
        l: "\u677E\u539F\u5E02",
        v: "220700"
      },
      {
        c: [
          {
            l: "\u6D2E\u5317\u533A",
            v: "220802"
          },
          {
            l: "\u9547\u8D49\u53BF",
            v: "220821"
          },
          {
            l: "\u901A\u6986\u53BF",
            v: "220822"
          },
          {
            l: "\u5409\u6797\u767D\u57CE\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "220871"
          },
          {
            l: "\u6D2E\u5357\u5E02",
            v: "220881"
          },
          {
            l: "\u5927\u5B89\u5E02",
            v: "220882"
          }
        ],
        l: "\u767D\u57CE\u5E02",
        v: "220800"
      },
      {
        c: [
          {
            l: "\u5EF6\u5409\u5E02",
            v: "222401"
          },
          {
            l: "\u56FE\u4EEC\u5E02",
            v: "222402"
          },
          {
            l: "\u6566\u5316\u5E02",
            v: "222403"
          },
          {
            l: "\u73F2\u6625\u5E02",
            v: "222404"
          },
          {
            l: "\u9F99\u4E95\u5E02",
            v: "222405"
          },
          {
            l: "\u548C\u9F99\u5E02",
            v: "222406"
          },
          {
            l: "\u6C6A\u6E05\u53BF",
            v: "222424"
          },
          {
            l: "\u5B89\u56FE\u53BF",
            v: "222426"
          }
        ],
        l: "\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE",
        v: "222400"
      }
    ],
    l: "\u5409\u6797\u7701",
    v: "220000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u9053\u91CC\u533A",
            v: "230102"
          },
          {
            l: "\u5357\u5C97\u533A",
            v: "230103"
          },
          {
            l: "\u9053\u5916\u533A",
            v: "230104"
          },
          {
            l: "\u5E73\u623F\u533A",
            v: "230108"
          },
          {
            l: "\u677E\u5317\u533A",
            v: "230109"
          },
          {
            l: "\u9999\u574A\u533A",
            v: "230110"
          },
          {
            l: "\u547C\u5170\u533A",
            v: "230111"
          },
          {
            l: "\u963F\u57CE\u533A",
            v: "230112"
          },
          {
            l: "\u53CC\u57CE\u533A",
            v: "230113"
          },
          {
            l: "\u4F9D\u5170\u53BF",
            v: "230123"
          },
          {
            l: "\u65B9\u6B63\u53BF",
            v: "230124"
          },
          {
            l: "\u5BBE\u53BF",
            v: "230125"
          },
          {
            l: "\u5DF4\u5F66\u53BF",
            v: "230126"
          },
          {
            l: "\u6728\u5170\u53BF",
            v: "230127"
          },
          {
            l: "\u901A\u6CB3\u53BF",
            v: "230128"
          },
          {
            l: "\u5EF6\u5BFF\u53BF",
            v: "230129"
          },
          {
            l: "\u5C1A\u5FD7\u5E02",
            v: "230183"
          },
          {
            l: "\u4E94\u5E38\u5E02",
            v: "230184"
          }
        ],
        l: "\u54C8\u5C14\u6EE8\u5E02",
        v: "230100"
      },
      {
        c: [
          {
            l: "\u9F99\u6C99\u533A",
            v: "230202"
          },
          {
            l: "\u5EFA\u534E\u533A",
            v: "230203"
          },
          {
            l: "\u94C1\u950B\u533A",
            v: "230204"
          },
          {
            l: "\u6602\u6602\u6EAA\u533A",
            v: "230205"
          },
          {
            l: "\u5BCC\u62C9\u5C14\u57FA\u533A",
            v: "230206"
          },
          {
            l: "\u78BE\u5B50\u5C71\u533A",
            v: "230207"
          },
          {
            l: "\u6885\u91CC\u65AF\u8FBE\u65A1\u5C14\u65CF\u533A",
            v: "230208"
          },
          {
            l: "\u9F99\u6C5F\u53BF",
            v: "230221"
          },
          {
            l: "\u4F9D\u5B89\u53BF",
            v: "230223"
          },
          {
            l: "\u6CF0\u6765\u53BF",
            v: "230224"
          },
          {
            l: "\u7518\u5357\u53BF",
            v: "230225"
          },
          {
            l: "\u5BCC\u88D5\u53BF",
            v: "230227"
          },
          {
            l: "\u514B\u5C71\u53BF",
            v: "230229"
          },
          {
            l: "\u514B\u4E1C\u53BF",
            v: "230230"
          },
          {
            l: "\u62DC\u6CC9\u53BF",
            v: "230231"
          },
          {
            l: "\u8BB7\u6CB3\u5E02",
            v: "230281"
          }
        ],
        l: "\u9F50\u9F50\u54C8\u5C14\u5E02",
        v: "230200"
      },
      {
        c: [
          {
            l: "\u9E21\u51A0\u533A",
            v: "230302"
          },
          {
            l: "\u6052\u5C71\u533A",
            v: "230303"
          },
          {
            l: "\u6EF4\u9053\u533A",
            v: "230304"
          },
          {
            l: "\u68A8\u6811\u533A",
            v: "230305"
          },
          {
            l: "\u57CE\u5B50\u6CB3\u533A",
            v: "230306"
          },
          {
            l: "\u9EBB\u5C71\u533A",
            v: "230307"
          },
          {
            l: "\u9E21\u4E1C\u53BF",
            v: "230321"
          },
          {
            l: "\u864E\u6797\u5E02",
            v: "230381"
          },
          {
            l: "\u5BC6\u5C71\u5E02",
            v: "230382"
          }
        ],
        l: "\u9E21\u897F\u5E02",
        v: "230300"
      },
      {
        c: [
          {
            l: "\u5411\u9633\u533A",
            v: "230402"
          },
          {
            l: "\u5DE5\u519C\u533A",
            v: "230403"
          },
          {
            l: "\u5357\u5C71\u533A",
            v: "230404"
          },
          {
            l: "\u5174\u5B89\u533A",
            v: "230405"
          },
          {
            l: "\u4E1C\u5C71\u533A",
            v: "230406"
          },
          {
            l: "\u5174\u5C71\u533A",
            v: "230407"
          },
          {
            l: "\u841D\u5317\u53BF",
            v: "230421"
          },
          {
            l: "\u7EE5\u6EE8\u53BF",
            v: "230422"
          }
        ],
        l: "\u9E64\u5C97\u5E02",
        v: "230400"
      },
      {
        c: [
          {
            l: "\u5C16\u5C71\u533A",
            v: "230502"
          },
          {
            l: "\u5CAD\u4E1C\u533A",
            v: "230503"
          },
          {
            l: "\u56DB\u65B9\u53F0\u533A",
            v: "230505"
          },
          {
            l: "\u5B9D\u5C71\u533A",
            v: "230506"
          },
          {
            l: "\u96C6\u8D24\u53BF",
            v: "230521"
          },
          {
            l: "\u53CB\u8C0A\u53BF",
            v: "230522"
          },
          {
            l: "\u5B9D\u6E05\u53BF",
            v: "230523"
          },
          {
            l: "\u9976\u6CB3\u53BF",
            v: "230524"
          }
        ],
        l: "\u53CC\u9E2D\u5C71\u5E02",
        v: "230500"
      },
      {
        c: [
          {
            l: "\u8428\u5C14\u56FE\u533A",
            v: "230602"
          },
          {
            l: "\u9F99\u51E4\u533A",
            v: "230603"
          },
          {
            l: "\u8BA9\u80E1\u8DEF\u533A",
            v: "230604"
          },
          {
            l: "\u7EA2\u5C97\u533A",
            v: "230605"
          },
          {
            l: "\u5927\u540C\u533A",
            v: "230606"
          },
          {
            l: "\u8087\u5DDE\u53BF",
            v: "230621"
          },
          {
            l: "\u8087\u6E90\u53BF",
            v: "230622"
          },
          {
            l: "\u6797\u7538\u53BF",
            v: "230623"
          },
          {
            l: "\u675C\u5C14\u4F2F\u7279\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "230624"
          },
          {
            l: "\u5927\u5E86\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "230671"
          }
        ],
        l: "\u5927\u5E86\u5E02",
        v: "230600"
      },
      {
        c: [
          {
            l: "\u4F0A\u7F8E\u533A",
            v: "230717"
          },
          {
            l: "\u4E4C\u7FE0\u533A",
            v: "230718"
          },
          {
            l: "\u53CB\u597D\u533A",
            v: "230719"
          },
          {
            l: "\u5609\u836B\u53BF",
            v: "230722"
          },
          {
            l: "\u6C64\u65FA\u53BF",
            v: "230723"
          },
          {
            l: "\u4E30\u6797\u53BF",
            v: "230724"
          },
          {
            l: "\u5927\u7B90\u5C71\u53BF",
            v: "230725"
          },
          {
            l: "\u5357\u5C94\u53BF",
            v: "230726"
          },
          {
            l: "\u91D1\u6797\u533A",
            v: "230751"
          },
          {
            l: "\u94C1\u529B\u5E02",
            v: "230781"
          }
        ],
        l: "\u4F0A\u6625\u5E02",
        v: "230700"
      },
      {
        c: [
          {
            l: "\u5411\u9633\u533A",
            v: "230803"
          },
          {
            l: "\u524D\u8FDB\u533A",
            v: "230804"
          },
          {
            l: "\u4E1C\u98CE\u533A",
            v: "230805"
          },
          {
            l: "\u90CA\u533A",
            v: "230811"
          },
          {
            l: "\u6866\u5357\u53BF",
            v: "230822"
          },
          {
            l: "\u6866\u5DDD\u53BF",
            v: "230826"
          },
          {
            l: "\u6C64\u539F\u53BF",
            v: "230828"
          },
          {
            l: "\u540C\u6C5F\u5E02",
            v: "230881"
          },
          {
            l: "\u5BCC\u9526\u5E02",
            v: "230882"
          },
          {
            l: "\u629A\u8FDC\u5E02",
            v: "230883"
          }
        ],
        l: "\u4F73\u6728\u65AF\u5E02",
        v: "230800"
      },
      {
        c: [
          {
            l: "\u65B0\u5174\u533A",
            v: "230902"
          },
          {
            l: "\u6843\u5C71\u533A",
            v: "230903"
          },
          {
            l: "\u8304\u5B50\u6CB3\u533A",
            v: "230904"
          },
          {
            l: "\u52C3\u5229\u53BF",
            v: "230921"
          }
        ],
        l: "\u4E03\u53F0\u6CB3\u5E02",
        v: "230900"
      },
      {
        c: [
          {
            l: "\u4E1C\u5B89\u533A",
            v: "231002"
          },
          {
            l: "\u9633\u660E\u533A",
            v: "231003"
          },
          {
            l: "\u7231\u6C11\u533A",
            v: "231004"
          },
          {
            l: "\u897F\u5B89\u533A",
            v: "231005"
          },
          {
            l: "\u6797\u53E3\u53BF",
            v: "231025"
          },
          {
            l: "\u7261\u4E39\u6C5F\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "231071"
          },
          {
            l: "\u7EE5\u82AC\u6CB3\u5E02",
            v: "231081"
          },
          {
            l: "\u6D77\u6797\u5E02",
            v: "231083"
          },
          {
            l: "\u5B81\u5B89\u5E02",
            v: "231084"
          },
          {
            l: "\u7A46\u68F1\u5E02",
            v: "231085"
          },
          {
            l: "\u4E1C\u5B81\u5E02",
            v: "231086"
          }
        ],
        l: "\u7261\u4E39\u6C5F\u5E02",
        v: "231000"
      },
      {
        c: [
          {
            l: "\u7231\u8F89\u533A",
            v: "231102"
          },
          {
            l: "\u900A\u514B\u53BF",
            v: "231123"
          },
          {
            l: "\u5B59\u5434\u53BF",
            v: "231124"
          },
          {
            l: "\u5317\u5B89\u5E02",
            v: "231181"
          },
          {
            l: "\u4E94\u5927\u8FDE\u6C60\u5E02",
            v: "231182"
          },
          {
            l: "\u5AE9\u6C5F\u5E02",
            v: "231183"
          }
        ],
        l: "\u9ED1\u6CB3\u5E02",
        v: "231100"
      },
      {
        c: [
          {
            l: "\u5317\u6797\u533A",
            v: "231202"
          },
          {
            l: "\u671B\u594E\u53BF",
            v: "231221"
          },
          {
            l: "\u5170\u897F\u53BF",
            v: "231222"
          },
          {
            l: "\u9752\u5188\u53BF",
            v: "231223"
          },
          {
            l: "\u5E86\u5B89\u53BF",
            v: "231224"
          },
          {
            l: "\u660E\u6C34\u53BF",
            v: "231225"
          },
          {
            l: "\u7EE5\u68F1\u53BF",
            v: "231226"
          },
          {
            l: "\u5B89\u8FBE\u5E02",
            v: "231281"
          },
          {
            l: "\u8087\u4E1C\u5E02",
            v: "231282"
          },
          {
            l: "\u6D77\u4F26\u5E02",
            v: "231283"
          }
        ],
        l: "\u7EE5\u5316\u5E02",
        v: "231200"
      },
      {
        c: [
          {
            l: "\u6F20\u6CB3\u5E02",
            v: "232701"
          },
          {
            l: "\u547C\u739B\u53BF",
            v: "232721"
          },
          {
            l: "\u5854\u6CB3\u53BF",
            v: "232722"
          },
          {
            l: "\u52A0\u683C\u8FBE\u5947\u533A",
            v: "232761"
          },
          {
            l: "\u677E\u5CAD\u533A",
            v: "232762"
          },
          {
            l: "\u65B0\u6797\u533A",
            v: "232763"
          },
          {
            l: "\u547C\u4E2D\u533A",
            v: "232764"
          }
        ],
        l: "\u5927\u5174\u5B89\u5CAD\u5730\u533A",
        v: "232700"
      }
    ],
    l: "\u9ED1\u9F99\u6C5F\u7701",
    v: "230000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u9EC4\u6D66\u533A",
            v: "310101"
          },
          {
            l: "\u5F90\u6C47\u533A",
            v: "310104"
          },
          {
            l: "\u957F\u5B81\u533A",
            v: "310105"
          },
          {
            l: "\u9759\u5B89\u533A",
            v: "310106"
          },
          {
            l: "\u666E\u9640\u533A",
            v: "310107"
          },
          {
            l: "\u8679\u53E3\u533A",
            v: "310109"
          },
          {
            l: "\u6768\u6D66\u533A",
            v: "310110"
          },
          {
            l: "\u95F5\u884C\u533A",
            v: "310112"
          },
          {
            l: "\u5B9D\u5C71\u533A",
            v: "310113"
          },
          {
            l: "\u5609\u5B9A\u533A",
            v: "310114"
          },
          {
            l: "\u6D66\u4E1C\u65B0\u533A",
            v: "310115"
          },
          {
            l: "\u91D1\u5C71\u533A",
            v: "310116"
          },
          {
            l: "\u677E\u6C5F\u533A",
            v: "310117"
          },
          {
            l: "\u9752\u6D66\u533A",
            v: "310118"
          },
          {
            l: "\u5949\u8D24\u533A",
            v: "310120"
          },
          {
            l: "\u5D07\u660E\u533A",
            v: "310151"
          }
        ],
        l: "\u5E02\u8F96\u533A",
        v: "310100"
      }
    ],
    l: "\u4E0A\u6D77\u5E02",
    v: "310000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u7384\u6B66\u533A",
            v: "320102"
          },
          {
            l: "\u79E6\u6DEE\u533A",
            v: "320104"
          },
          {
            l: "\u5EFA\u90BA\u533A",
            v: "320105"
          },
          {
            l: "\u9F13\u697C\u533A",
            v: "320106"
          },
          {
            l: "\u6D66\u53E3\u533A",
            v: "320111"
          },
          {
            l: "\u6816\u971E\u533A",
            v: "320113"
          },
          {
            l: "\u96E8\u82B1\u53F0\u533A",
            v: "320114"
          },
          {
            l: "\u6C5F\u5B81\u533A",
            v: "320115"
          },
          {
            l: "\u516D\u5408\u533A",
            v: "320116"
          },
          {
            l: "\u6EA7\u6C34\u533A",
            v: "320117"
          },
          {
            l: "\u9AD8\u6DF3\u533A",
            v: "320118"
          }
        ],
        l: "\u5357\u4EAC\u5E02",
        v: "320100"
      },
      {
        c: [
          {
            l: "\u9521\u5C71\u533A",
            v: "320205"
          },
          {
            l: "\u60E0\u5C71\u533A",
            v: "320206"
          },
          {
            l: "\u6EE8\u6E56\u533A",
            v: "320211"
          },
          {
            l: "\u6881\u6EAA\u533A",
            v: "320213"
          },
          {
            l: "\u65B0\u5434\u533A",
            v: "320214"
          },
          {
            l: "\u6C5F\u9634\u5E02",
            v: "320281"
          },
          {
            l: "\u5B9C\u5174\u5E02",
            v: "320282"
          }
        ],
        l: "\u65E0\u9521\u5E02",
        v: "320200"
      },
      {
        c: [
          {
            l: "\u9F13\u697C\u533A",
            v: "320302"
          },
          {
            l: "\u4E91\u9F99\u533A",
            v: "320303"
          },
          {
            l: "\u8D3E\u6C6A\u533A",
            v: "320305"
          },
          {
            l: "\u6CC9\u5C71\u533A",
            v: "320311"
          },
          {
            l: "\u94DC\u5C71\u533A",
            v: "320312"
          },
          {
            l: "\u4E30\u53BF",
            v: "320321"
          },
          {
            l: "\u6C9B\u53BF",
            v: "320322"
          },
          {
            l: "\u7762\u5B81\u53BF",
            v: "320324"
          },
          {
            l: "\u5F90\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "320371"
          },
          {
            l: "\u65B0\u6C82\u5E02",
            v: "320381"
          },
          {
            l: "\u90B3\u5DDE\u5E02",
            v: "320382"
          }
        ],
        l: "\u5F90\u5DDE\u5E02",
        v: "320300"
      },
      {
        c: [
          {
            l: "\u5929\u5B81\u533A",
            v: "320402"
          },
          {
            l: "\u949F\u697C\u533A",
            v: "320404"
          },
          {
            l: "\u65B0\u5317\u533A",
            v: "320411"
          },
          {
            l: "\u6B66\u8FDB\u533A",
            v: "320412"
          },
          {
            l: "\u91D1\u575B\u533A",
            v: "320413"
          },
          {
            l: "\u6EA7\u9633\u5E02",
            v: "320481"
          }
        ],
        l: "\u5E38\u5DDE\u5E02",
        v: "320400"
      },
      {
        c: [
          {
            l: "\u864E\u4E18\u533A",
            v: "320505"
          },
          {
            l: "\u5434\u4E2D\u533A",
            v: "320506"
          },
          {
            l: "\u76F8\u57CE\u533A",
            v: "320507"
          },
          {
            l: "\u59D1\u82CF\u533A",
            v: "320508"
          },
          {
            l: "\u5434\u6C5F\u533A",
            v: "320509"
          },
          {
            l: "\u82CF\u5DDE\u5DE5\u4E1A\u56ED\u533A",
            v: "320571"
          },
          {
            l: "\u5E38\u719F\u5E02",
            v: "320581"
          },
          {
            l: "\u5F20\u5BB6\u6E2F\u5E02",
            v: "320582"
          },
          {
            l: "\u6606\u5C71\u5E02",
            v: "320583"
          },
          {
            l: "\u592A\u4ED3\u5E02",
            v: "320585"
          }
        ],
        l: "\u82CF\u5DDE\u5E02",
        v: "320500"
      },
      {
        c: [
          {
            l: "\u5D07\u5DDD\u533A",
            v: "320602"
          },
          {
            l: "\u6E2F\u95F8\u533A",
            v: "320611"
          },
          {
            l: "\u901A\u5DDE\u533A",
            v: "320612"
          },
          {
            l: "\u5982\u4E1C\u53BF",
            v: "320623"
          },
          {
            l: "\u5357\u901A\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "320671"
          },
          {
            l: "\u542F\u4E1C\u5E02",
            v: "320681"
          },
          {
            l: "\u5982\u768B\u5E02",
            v: "320682"
          },
          {
            l: "\u6D77\u95E8\u5E02",
            v: "320684"
          },
          {
            l: "\u6D77\u5B89\u5E02",
            v: "320685"
          }
        ],
        l: "\u5357\u901A\u5E02",
        v: "320600"
      },
      {
        c: [
          {
            l: "\u8FDE\u4E91\u533A",
            v: "320703"
          },
          {
            l: "\u6D77\u5DDE\u533A",
            v: "320706"
          },
          {
            l: "\u8D63\u6986\u533A",
            v: "320707"
          },
          {
            l: "\u4E1C\u6D77\u53BF",
            v: "320722"
          },
          {
            l: "\u704C\u4E91\u53BF",
            v: "320723"
          },
          {
            l: "\u704C\u5357\u53BF",
            v: "320724"
          },
          {
            l: "\u8FDE\u4E91\u6E2F\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "320771"
          },
          {
            l: "\u8FDE\u4E91\u6E2F\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "320772"
          }
        ],
        l: "\u8FDE\u4E91\u6E2F\u5E02",
        v: "320700"
      },
      {
        c: [
          {
            l: "\u6DEE\u5B89\u533A",
            v: "320803"
          },
          {
            l: "\u6DEE\u9634\u533A",
            v: "320804"
          },
          {
            l: "\u6E05\u6C5F\u6D66\u533A",
            v: "320812"
          },
          {
            l: "\u6D2A\u6CFD\u533A",
            v: "320813"
          },
          {
            l: "\u6D9F\u6C34\u53BF",
            v: "320826"
          },
          {
            l: "\u76F1\u7719\u53BF",
            v: "320830"
          },
          {
            l: "\u91D1\u6E56\u53BF",
            v: "320831"
          },
          {
            l: "\u6DEE\u5B89\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "320871"
          }
        ],
        l: "\u6DEE\u5B89\u5E02",
        v: "320800"
      },
      {
        c: [
          {
            l: "\u4EAD\u6E56\u533A",
            v: "320902"
          },
          {
            l: "\u76D0\u90FD\u533A",
            v: "320903"
          },
          {
            l: "\u5927\u4E30\u533A",
            v: "320904"
          },
          {
            l: "\u54CD\u6C34\u53BF",
            v: "320921"
          },
          {
            l: "\u6EE8\u6D77\u53BF",
            v: "320922"
          },
          {
            l: "\u961C\u5B81\u53BF",
            v: "320923"
          },
          {
            l: "\u5C04\u9633\u53BF",
            v: "320924"
          },
          {
            l: "\u5EFA\u6E56\u53BF",
            v: "320925"
          },
          {
            l: "\u76D0\u57CE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "320971"
          },
          {
            l: "\u4E1C\u53F0\u5E02",
            v: "320981"
          }
        ],
        l: "\u76D0\u57CE\u5E02",
        v: "320900"
      },
      {
        c: [
          {
            l: "\u5E7F\u9675\u533A",
            v: "321002"
          },
          {
            l: "\u9097\u6C5F\u533A",
            v: "321003"
          },
          {
            l: "\u6C5F\u90FD\u533A",
            v: "321012"
          },
          {
            l: "\u5B9D\u5E94\u53BF",
            v: "321023"
          },
          {
            l: "\u626C\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "321071"
          },
          {
            l: "\u4EEA\u5F81\u5E02",
            v: "321081"
          },
          {
            l: "\u9AD8\u90AE\u5E02",
            v: "321084"
          }
        ],
        l: "\u626C\u5DDE\u5E02",
        v: "321000"
      },
      {
        c: [
          {
            l: "\u4EAC\u53E3\u533A",
            v: "321102"
          },
          {
            l: "\u6DA6\u5DDE\u533A",
            v: "321111"
          },
          {
            l: "\u4E39\u5F92\u533A",
            v: "321112"
          },
          {
            l: "\u9547\u6C5F\u65B0\u533A",
            v: "321171"
          },
          {
            l: "\u4E39\u9633\u5E02",
            v: "321181"
          },
          {
            l: "\u626C\u4E2D\u5E02",
            v: "321182"
          },
          {
            l: "\u53E5\u5BB9\u5E02",
            v: "321183"
          }
        ],
        l: "\u9547\u6C5F\u5E02",
        v: "321100"
      },
      {
        c: [
          {
            l: "\u6D77\u9675\u533A",
            v: "321202"
          },
          {
            l: "\u9AD8\u6E2F\u533A",
            v: "321203"
          },
          {
            l: "\u59DC\u5830\u533A",
            v: "321204"
          },
          {
            l: "\u6CF0\u5DDE\u533B\u836F\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "321271"
          },
          {
            l: "\u5174\u5316\u5E02",
            v: "321281"
          },
          {
            l: "\u9756\u6C5F\u5E02",
            v: "321282"
          },
          {
            l: "\u6CF0\u5174\u5E02",
            v: "321283"
          }
        ],
        l: "\u6CF0\u5DDE\u5E02",
        v: "321200"
      },
      {
        c: [
          {
            l: "\u5BBF\u57CE\u533A",
            v: "321302"
          },
          {
            l: "\u5BBF\u8C6B\u533A",
            v: "321311"
          },
          {
            l: "\u6CAD\u9633\u53BF",
            v: "321322"
          },
          {
            l: "\u6CD7\u9633\u53BF",
            v: "321323"
          },
          {
            l: "\u6CD7\u6D2A\u53BF",
            v: "321324"
          },
          {
            l: "\u5BBF\u8FC1\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "321371"
          }
        ],
        l: "\u5BBF\u8FC1\u5E02",
        v: "321300"
      }
    ],
    l: "\u6C5F\u82CF\u7701",
    v: "320000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u4E0A\u57CE\u533A",
            v: "330102"
          },
          {
            l: "\u4E0B\u57CE\u533A",
            v: "330103"
          },
          {
            l: "\u6C5F\u5E72\u533A",
            v: "330104"
          },
          {
            l: "\u62F1\u5885\u533A",
            v: "330105"
          },
          {
            l: "\u897F\u6E56\u533A",
            v: "330106"
          },
          {
            l: "\u6EE8\u6C5F\u533A",
            v: "330108"
          },
          {
            l: "\u8427\u5C71\u533A",
            v: "330109"
          },
          {
            l: "\u4F59\u676D\u533A",
            v: "330110"
          },
          {
            l: "\u5BCC\u9633\u533A",
            v: "330111"
          },
          {
            l: "\u4E34\u5B89\u533A",
            v: "330112"
          },
          {
            l: "\u6850\u5E90\u53BF",
            v: "330122"
          },
          {
            l: "\u6DF3\u5B89\u53BF",
            v: "330127"
          },
          {
            l: "\u5EFA\u5FB7\u5E02",
            v: "330182"
          }
        ],
        l: "\u676D\u5DDE\u5E02",
        v: "330100"
      },
      {
        c: [
          {
            l: "\u6D77\u66D9\u533A",
            v: "330203"
          },
          {
            l: "\u6C5F\u5317\u533A",
            v: "330205"
          },
          {
            l: "\u5317\u4ED1\u533A",
            v: "330206"
          },
          {
            l: "\u9547\u6D77\u533A",
            v: "330211"
          },
          {
            l: "\u911E\u5DDE\u533A",
            v: "330212"
          },
          {
            l: "\u5949\u5316\u533A",
            v: "330213"
          },
          {
            l: "\u8C61\u5C71\u53BF",
            v: "330225"
          },
          {
            l: "\u5B81\u6D77\u53BF",
            v: "330226"
          },
          {
            l: "\u4F59\u59DA\u5E02",
            v: "330281"
          },
          {
            l: "\u6148\u6EAA\u5E02",
            v: "330282"
          }
        ],
        l: "\u5B81\u6CE2\u5E02",
        v: "330200"
      },
      {
        c: [
          {
            l: "\u9E7F\u57CE\u533A",
            v: "330302"
          },
          {
            l: "\u9F99\u6E7E\u533A",
            v: "330303"
          },
          {
            l: "\u74EF\u6D77\u533A",
            v: "330304"
          },
          {
            l: "\u6D1E\u5934\u533A",
            v: "330305"
          },
          {
            l: "\u6C38\u5609\u53BF",
            v: "330324"
          },
          {
            l: "\u5E73\u9633\u53BF",
            v: "330326"
          },
          {
            l: "\u82CD\u5357\u53BF",
            v: "330327"
          },
          {
            l: "\u6587\u6210\u53BF",
            v: "330328"
          },
          {
            l: "\u6CF0\u987A\u53BF",
            v: "330329"
          },
          {
            l: "\u6E29\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "330371"
          },
          {
            l: "\u745E\u5B89\u5E02",
            v: "330381"
          },
          {
            l: "\u4E50\u6E05\u5E02",
            v: "330382"
          },
          {
            l: "\u9F99\u6E2F\u5E02",
            v: "330383"
          }
        ],
        l: "\u6E29\u5DDE\u5E02",
        v: "330300"
      },
      {
        c: [
          {
            l: "\u5357\u6E56\u533A",
            v: "330402"
          },
          {
            l: "\u79C0\u6D32\u533A",
            v: "330411"
          },
          {
            l: "\u5609\u5584\u53BF",
            v: "330421"
          },
          {
            l: "\u6D77\u76D0\u53BF",
            v: "330424"
          },
          {
            l: "\u6D77\u5B81\u5E02",
            v: "330481"
          },
          {
            l: "\u5E73\u6E56\u5E02",
            v: "330482"
          },
          {
            l: "\u6850\u4E61\u5E02",
            v: "330483"
          }
        ],
        l: "\u5609\u5174\u5E02",
        v: "330400"
      },
      {
        c: [
          {
            l: "\u5434\u5174\u533A",
            v: "330502"
          },
          {
            l: "\u5357\u6D54\u533A",
            v: "330503"
          },
          {
            l: "\u5FB7\u6E05\u53BF",
            v: "330521"
          },
          {
            l: "\u957F\u5174\u53BF",
            v: "330522"
          },
          {
            l: "\u5B89\u5409\u53BF",
            v: "330523"
          }
        ],
        l: "\u6E56\u5DDE\u5E02",
        v: "330500"
      },
      {
        c: [
          {
            l: "\u8D8A\u57CE\u533A",
            v: "330602"
          },
          {
            l: "\u67EF\u6865\u533A",
            v: "330603"
          },
          {
            l: "\u4E0A\u865E\u533A",
            v: "330604"
          },
          {
            l: "\u65B0\u660C\u53BF",
            v: "330624"
          },
          {
            l: "\u8BF8\u66A8\u5E02",
            v: "330681"
          },
          {
            l: "\u5D4A\u5DDE\u5E02",
            v: "330683"
          }
        ],
        l: "\u7ECD\u5174\u5E02",
        v: "330600"
      },
      {
        c: [
          {
            l: "\u5A7A\u57CE\u533A",
            v: "330702"
          },
          {
            l: "\u91D1\u4E1C\u533A",
            v: "330703"
          },
          {
            l: "\u6B66\u4E49\u53BF",
            v: "330723"
          },
          {
            l: "\u6D66\u6C5F\u53BF",
            v: "330726"
          },
          {
            l: "\u78D0\u5B89\u53BF",
            v: "330727"
          },
          {
            l: "\u5170\u6EAA\u5E02",
            v: "330781"
          },
          {
            l: "\u4E49\u4E4C\u5E02",
            v: "330782"
          },
          {
            l: "\u4E1C\u9633\u5E02",
            v: "330783"
          },
          {
            l: "\u6C38\u5EB7\u5E02",
            v: "330784"
          }
        ],
        l: "\u91D1\u534E\u5E02",
        v: "330700"
      },
      {
        c: [
          {
            l: "\u67EF\u57CE\u533A",
            v: "330802"
          },
          {
            l: "\u8862\u6C5F\u533A",
            v: "330803"
          },
          {
            l: "\u5E38\u5C71\u53BF",
            v: "330822"
          },
          {
            l: "\u5F00\u5316\u53BF",
            v: "330824"
          },
          {
            l: "\u9F99\u6E38\u53BF",
            v: "330825"
          },
          {
            l: "\u6C5F\u5C71\u5E02",
            v: "330881"
          }
        ],
        l: "\u8862\u5DDE\u5E02",
        v: "330800"
      },
      {
        c: [
          {
            l: "\u5B9A\u6D77\u533A",
            v: "330902"
          },
          {
            l: "\u666E\u9640\u533A",
            v: "330903"
          },
          {
            l: "\u5CB1\u5C71\u53BF",
            v: "330921"
          },
          {
            l: "\u5D4A\u6CD7\u53BF",
            v: "330922"
          }
        ],
        l: "\u821F\u5C71\u5E02",
        v: "330900"
      },
      {
        c: [
          {
            l: "\u6912\u6C5F\u533A",
            v: "331002"
          },
          {
            l: "\u9EC4\u5CA9\u533A",
            v: "331003"
          },
          {
            l: "\u8DEF\u6865\u533A",
            v: "331004"
          },
          {
            l: "\u4E09\u95E8\u53BF",
            v: "331022"
          },
          {
            l: "\u5929\u53F0\u53BF",
            v: "331023"
          },
          {
            l: "\u4ED9\u5C45\u53BF",
            v: "331024"
          },
          {
            l: "\u6E29\u5CAD\u5E02",
            v: "331081"
          },
          {
            l: "\u4E34\u6D77\u5E02",
            v: "331082"
          },
          {
            l: "\u7389\u73AF\u5E02",
            v: "331083"
          }
        ],
        l: "\u53F0\u5DDE\u5E02",
        v: "331000"
      },
      {
        c: [
          {
            l: "\u83B2\u90FD\u533A",
            v: "331102"
          },
          {
            l: "\u9752\u7530\u53BF",
            v: "331121"
          },
          {
            l: "\u7F19\u4E91\u53BF",
            v: "331122"
          },
          {
            l: "\u9042\u660C\u53BF",
            v: "331123"
          },
          {
            l: "\u677E\u9633\u53BF",
            v: "331124"
          },
          {
            l: "\u4E91\u548C\u53BF",
            v: "331125"
          },
          {
            l: "\u5E86\u5143\u53BF",
            v: "331126"
          },
          {
            l: "\u666F\u5B81\u7572\u65CF\u81EA\u6CBB\u53BF",
            v: "331127"
          },
          {
            l: "\u9F99\u6CC9\u5E02",
            v: "331181"
          }
        ],
        l: "\u4E3D\u6C34\u5E02",
        v: "331100"
      }
    ],
    l: "\u6D59\u6C5F\u7701",
    v: "330000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u7476\u6D77\u533A",
            v: "340102"
          },
          {
            l: "\u5E90\u9633\u533A",
            v: "340103"
          },
          {
            l: "\u8700\u5C71\u533A",
            v: "340104"
          },
          {
            l: "\u5305\u6CB3\u533A",
            v: "340111"
          },
          {
            l: "\u957F\u4E30\u53BF",
            v: "340121"
          },
          {
            l: "\u80A5\u4E1C\u53BF",
            v: "340122"
          },
          {
            l: "\u80A5\u897F\u53BF",
            v: "340123"
          },
          {
            l: "\u5E90\u6C5F\u53BF",
            v: "340124"
          },
          {
            l: "\u5408\u80A5\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "340171"
          },
          {
            l: "\u5408\u80A5\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "340172"
          },
          {
            l: "\u5408\u80A5\u65B0\u7AD9\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "340173"
          },
          {
            l: "\u5DE2\u6E56\u5E02",
            v: "340181"
          }
        ],
        l: "\u5408\u80A5\u5E02",
        v: "340100"
      },
      {
        c: [
          {
            l: "\u955C\u6E56\u533A",
            v: "340202"
          },
          {
            l: "\u5F0B\u6C5F\u533A",
            v: "340203"
          },
          {
            l: "\u9E20\u6C5F\u533A",
            v: "340207"
          },
          {
            l: "\u4E09\u5C71\u533A",
            v: "340208"
          },
          {
            l: "\u829C\u6E56\u53BF",
            v: "340221"
          },
          {
            l: "\u7E41\u660C\u53BF",
            v: "340222"
          },
          {
            l: "\u5357\u9675\u53BF",
            v: "340223"
          },
          {
            l: "\u829C\u6E56\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "340271"
          },
          {
            l: "\u5B89\u5FBD\u829C\u6E56\u957F\u6C5F\u5927\u6865\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "340272"
          },
          {
            l: "\u65E0\u4E3A\u5E02",
            v: "340281"
          }
        ],
        l: "\u829C\u6E56\u5E02",
        v: "340200"
      },
      {
        c: [
          {
            l: "\u9F99\u5B50\u6E56\u533A",
            v: "340302"
          },
          {
            l: "\u868C\u5C71\u533A",
            v: "340303"
          },
          {
            l: "\u79B9\u4F1A\u533A",
            v: "340304"
          },
          {
            l: "\u6DEE\u4E0A\u533A",
            v: "340311"
          },
          {
            l: "\u6000\u8FDC\u53BF",
            v: "340321"
          },
          {
            l: "\u4E94\u6CB3\u53BF",
            v: "340322"
          },
          {
            l: "\u56FA\u9547\u53BF",
            v: "340323"
          },
          {
            l: "\u868C\u57E0\u5E02\u9AD8\u65B0\u6280\u672F\u5F00\u53D1\u533A",
            v: "340371"
          },
          {
            l: "\u868C\u57E0\u5E02\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "340372"
          }
        ],
        l: "\u868C\u57E0\u5E02",
        v: "340300"
      },
      {
        c: [
          {
            l: "\u5927\u901A\u533A",
            v: "340402"
          },
          {
            l: "\u7530\u5BB6\u5EB5\u533A",
            v: "340403"
          },
          {
            l: "\u8C22\u5BB6\u96C6\u533A",
            v: "340404"
          },
          {
            l: "\u516B\u516C\u5C71\u533A",
            v: "340405"
          },
          {
            l: "\u6F58\u96C6\u533A",
            v: "340406"
          },
          {
            l: "\u51E4\u53F0\u53BF",
            v: "340421"
          },
          {
            l: "\u5BFF\u53BF",
            v: "340422"
          }
        ],
        l: "\u6DEE\u5357\u5E02",
        v: "340400"
      },
      {
        c: [
          {
            l: "\u82B1\u5C71\u533A",
            v: "340503"
          },
          {
            l: "\u96E8\u5C71\u533A",
            v: "340504"
          },
          {
            l: "\u535A\u671B\u533A",
            v: "340506"
          },
          {
            l: "\u5F53\u6D82\u53BF",
            v: "340521"
          },
          {
            l: "\u542B\u5C71\u53BF",
            v: "340522"
          },
          {
            l: "\u548C\u53BF",
            v: "340523"
          }
        ],
        l: "\u9A6C\u978D\u5C71\u5E02",
        v: "340500"
      },
      {
        c: [
          {
            l: "\u675C\u96C6\u533A",
            v: "340602"
          },
          {
            l: "\u76F8\u5C71\u533A",
            v: "340603"
          },
          {
            l: "\u70C8\u5C71\u533A",
            v: "340604"
          },
          {
            l: "\u6FC9\u6EAA\u53BF",
            v: "340621"
          }
        ],
        l: "\u6DEE\u5317\u5E02",
        v: "340600"
      },
      {
        c: [
          {
            l: "\u94DC\u5B98\u533A",
            v: "340705"
          },
          {
            l: "\u4E49\u5B89\u533A",
            v: "340706"
          },
          {
            l: "\u90CA\u533A",
            v: "340711"
          },
          {
            l: "\u679E\u9633\u53BF",
            v: "340722"
          }
        ],
        l: "\u94DC\u9675\u5E02",
        v: "340700"
      },
      {
        c: [
          {
            l: "\u8FCE\u6C5F\u533A",
            v: "340802"
          },
          {
            l: "\u5927\u89C2\u533A",
            v: "340803"
          },
          {
            l: "\u5B9C\u79C0\u533A",
            v: "340811"
          },
          {
            l: "\u6000\u5B81\u53BF",
            v: "340822"
          },
          {
            l: "\u592A\u6E56\u53BF",
            v: "340825"
          },
          {
            l: "\u5BBF\u677E\u53BF",
            v: "340826"
          },
          {
            l: "\u671B\u6C5F\u53BF",
            v: "340827"
          },
          {
            l: "\u5CB3\u897F\u53BF",
            v: "340828"
          },
          {
            l: "\u5B89\u5FBD\u5B89\u5E86\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "340871"
          },
          {
            l: "\u6850\u57CE\u5E02",
            v: "340881"
          },
          {
            l: "\u6F5C\u5C71\u5E02",
            v: "340882"
          }
        ],
        l: "\u5B89\u5E86\u5E02",
        v: "340800"
      },
      {
        c: [
          {
            l: "\u5C6F\u6EAA\u533A",
            v: "341002"
          },
          {
            l: "\u9EC4\u5C71\u533A",
            v: "341003"
          },
          {
            l: "\u5FBD\u5DDE\u533A",
            v: "341004"
          },
          {
            l: "\u6B59\u53BF",
            v: "341021"
          },
          {
            l: "\u4F11\u5B81\u53BF",
            v: "341022"
          },
          {
            l: "\u9EDF\u53BF",
            v: "341023"
          },
          {
            l: "\u7941\u95E8\u53BF",
            v: "341024"
          }
        ],
        l: "\u9EC4\u5C71\u5E02",
        v: "341000"
      },
      {
        c: [
          {
            l: "\u7405\u740A\u533A",
            v: "341102"
          },
          {
            l: "\u5357\u8C2F\u533A",
            v: "341103"
          },
          {
            l: "\u6765\u5B89\u53BF",
            v: "341122"
          },
          {
            l: "\u5168\u6912\u53BF",
            v: "341124"
          },
          {
            l: "\u5B9A\u8FDC\u53BF",
            v: "341125"
          },
          {
            l: "\u51E4\u9633\u53BF",
            v: "341126"
          },
          {
            l: "\u82CF\u6EC1\u73B0\u4EE3\u4EA7\u4E1A\u56ED",
            v: "341171"
          },
          {
            l: "\u6EC1\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "341172"
          },
          {
            l: "\u5929\u957F\u5E02",
            v: "341181"
          },
          {
            l: "\u660E\u5149\u5E02",
            v: "341182"
          }
        ],
        l: "\u6EC1\u5DDE\u5E02",
        v: "341100"
      },
      {
        c: [
          {
            l: "\u988D\u5DDE\u533A",
            v: "341202"
          },
          {
            l: "\u988D\u4E1C\u533A",
            v: "341203"
          },
          {
            l: "\u988D\u6CC9\u533A",
            v: "341204"
          },
          {
            l: "\u4E34\u6CC9\u53BF",
            v: "341221"
          },
          {
            l: "\u592A\u548C\u53BF",
            v: "341222"
          },
          {
            l: "\u961C\u5357\u53BF",
            v: "341225"
          },
          {
            l: "\u988D\u4E0A\u53BF",
            v: "341226"
          },
          {
            l: "\u961C\u9633\u5408\u80A5\u73B0\u4EE3\u4EA7\u4E1A\u56ED\u533A",
            v: "341271"
          },
          {
            l: "\u961C\u9633\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "341272"
          },
          {
            l: "\u754C\u9996\u5E02",
            v: "341282"
          }
        ],
        l: "\u961C\u9633\u5E02",
        v: "341200"
      },
      {
        c: [
          {
            l: "\u57C7\u6865\u533A",
            v: "341302"
          },
          {
            l: "\u7800\u5C71\u53BF",
            v: "341321"
          },
          {
            l: "\u8427\u53BF",
            v: "341322"
          },
          {
            l: "\u7075\u74A7\u53BF",
            v: "341323"
          },
          {
            l: "\u6CD7\u53BF",
            v: "341324"
          },
          {
            l: "\u5BBF\u5DDE\u9A6C\u978D\u5C71\u73B0\u4EE3\u4EA7\u4E1A\u56ED\u533A",
            v: "341371"
          },
          {
            l: "\u5BBF\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "341372"
          }
        ],
        l: "\u5BBF\u5DDE\u5E02",
        v: "341300"
      },
      {
        c: [
          {
            l: "\u91D1\u5B89\u533A",
            v: "341502"
          },
          {
            l: "\u88D5\u5B89\u533A",
            v: "341503"
          },
          {
            l: "\u53F6\u96C6\u533A",
            v: "341504"
          },
          {
            l: "\u970D\u90B1\u53BF",
            v: "341522"
          },
          {
            l: "\u8212\u57CE\u53BF",
            v: "341523"
          },
          {
            l: "\u91D1\u5BE8\u53BF",
            v: "341524"
          },
          {
            l: "\u970D\u5C71\u53BF",
            v: "341525"
          }
        ],
        l: "\u516D\u5B89\u5E02",
        v: "341500"
      },
      {
        c: [
          {
            l: "\u8C2F\u57CE\u533A",
            v: "341602"
          },
          {
            l: "\u6DA1\u9633\u53BF",
            v: "341621"
          },
          {
            l: "\u8499\u57CE\u53BF",
            v: "341622"
          },
          {
            l: "\u5229\u8F9B\u53BF",
            v: "341623"
          }
        ],
        l: "\u4EB3\u5DDE\u5E02",
        v: "341600"
      },
      {
        c: [
          {
            l: "\u8D35\u6C60\u533A",
            v: "341702"
          },
          {
            l: "\u4E1C\u81F3\u53BF",
            v: "341721"
          },
          {
            l: "\u77F3\u53F0\u53BF",
            v: "341722"
          },
          {
            l: "\u9752\u9633\u53BF",
            v: "341723"
          }
        ],
        l: "\u6C60\u5DDE\u5E02",
        v: "341700"
      },
      {
        c: [
          {
            l: "\u5BA3\u5DDE\u533A",
            v: "341802"
          },
          {
            l: "\u90CE\u6EAA\u53BF",
            v: "341821"
          },
          {
            l: "\u6CFE\u53BF",
            v: "341823"
          },
          {
            l: "\u7EE9\u6EAA\u53BF",
            v: "341824"
          },
          {
            l: "\u65CC\u5FB7\u53BF",
            v: "341825"
          },
          {
            l: "\u5BA3\u57CE\u5E02\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "341871"
          },
          {
            l: "\u5B81\u56FD\u5E02",
            v: "341881"
          },
          {
            l: "\u5E7F\u5FB7\u5E02",
            v: "341882"
          }
        ],
        l: "\u5BA3\u57CE\u5E02",
        v: "341800"
      }
    ],
    l: "\u5B89\u5FBD\u7701",
    v: "340000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u9F13\u697C\u533A",
            v: "350102"
          },
          {
            l: "\u53F0\u6C5F\u533A",
            v: "350103"
          },
          {
            l: "\u4ED3\u5C71\u533A",
            v: "350104"
          },
          {
            l: "\u9A6C\u5C3E\u533A",
            v: "350105"
          },
          {
            l: "\u664B\u5B89\u533A",
            v: "350111"
          },
          {
            l: "\u957F\u4E50\u533A",
            v: "350112"
          },
          {
            l: "\u95FD\u4FAF\u53BF",
            v: "350121"
          },
          {
            l: "\u8FDE\u6C5F\u53BF",
            v: "350122"
          },
          {
            l: "\u7F57\u6E90\u53BF",
            v: "350123"
          },
          {
            l: "\u95FD\u6E05\u53BF",
            v: "350124"
          },
          {
            l: "\u6C38\u6CF0\u53BF",
            v: "350125"
          },
          {
            l: "\u5E73\u6F6D\u53BF",
            v: "350128"
          },
          {
            l: "\u798F\u6E05\u5E02",
            v: "350181"
          }
        ],
        l: "\u798F\u5DDE\u5E02",
        v: "350100"
      },
      {
        c: [
          {
            l: "\u601D\u660E\u533A",
            v: "350203"
          },
          {
            l: "\u6D77\u6CA7\u533A",
            v: "350205"
          },
          {
            l: "\u6E56\u91CC\u533A",
            v: "350206"
          },
          {
            l: "\u96C6\u7F8E\u533A",
            v: "350211"
          },
          {
            l: "\u540C\u5B89\u533A",
            v: "350212"
          },
          {
            l: "\u7FD4\u5B89\u533A",
            v: "350213"
          }
        ],
        l: "\u53A6\u95E8\u5E02",
        v: "350200"
      },
      {
        c: [
          {
            l: "\u57CE\u53A2\u533A",
            v: "350302"
          },
          {
            l: "\u6DB5\u6C5F\u533A",
            v: "350303"
          },
          {
            l: "\u8354\u57CE\u533A",
            v: "350304"
          },
          {
            l: "\u79C0\u5C7F\u533A",
            v: "350305"
          },
          {
            l: "\u4ED9\u6E38\u53BF",
            v: "350322"
          }
        ],
        l: "\u8386\u7530\u5E02",
        v: "350300"
      },
      {
        c: [
          {
            l: "\u6885\u5217\u533A",
            v: "350402"
          },
          {
            l: "\u4E09\u5143\u533A",
            v: "350403"
          },
          {
            l: "\u660E\u6EAA\u53BF",
            v: "350421"
          },
          {
            l: "\u6E05\u6D41\u53BF",
            v: "350423"
          },
          {
            l: "\u5B81\u5316\u53BF",
            v: "350424"
          },
          {
            l: "\u5927\u7530\u53BF",
            v: "350425"
          },
          {
            l: "\u5C24\u6EAA\u53BF",
            v: "350426"
          },
          {
            l: "\u6C99\u53BF",
            v: "350427"
          },
          {
            l: "\u5C06\u4E50\u53BF",
            v: "350428"
          },
          {
            l: "\u6CF0\u5B81\u53BF",
            v: "350429"
          },
          {
            l: "\u5EFA\u5B81\u53BF",
            v: "350430"
          },
          {
            l: "\u6C38\u5B89\u5E02",
            v: "350481"
          }
        ],
        l: "\u4E09\u660E\u5E02",
        v: "350400"
      },
      {
        c: [
          {
            l: "\u9CA4\u57CE\u533A",
            v: "350502"
          },
          {
            l: "\u4E30\u6CFD\u533A",
            v: "350503"
          },
          {
            l: "\u6D1B\u6C5F\u533A",
            v: "350504"
          },
          {
            l: "\u6CC9\u6E2F\u533A",
            v: "350505"
          },
          {
            l: "\u60E0\u5B89\u53BF",
            v: "350521"
          },
          {
            l: "\u5B89\u6EAA\u53BF",
            v: "350524"
          },
          {
            l: "\u6C38\u6625\u53BF",
            v: "350525"
          },
          {
            l: "\u5FB7\u5316\u53BF",
            v: "350526"
          },
          {
            l: "\u91D1\u95E8\u53BF",
            v: "350527"
          },
          {
            l: "\u77F3\u72EE\u5E02",
            v: "350581"
          },
          {
            l: "\u664B\u6C5F\u5E02",
            v: "350582"
          },
          {
            l: "\u5357\u5B89\u5E02",
            v: "350583"
          }
        ],
        l: "\u6CC9\u5DDE\u5E02",
        v: "350500"
      },
      {
        c: [
          {
            l: "\u8297\u57CE\u533A",
            v: "350602"
          },
          {
            l: "\u9F99\u6587\u533A",
            v: "350603"
          },
          {
            l: "\u4E91\u9704\u53BF",
            v: "350622"
          },
          {
            l: "\u6F33\u6D66\u53BF",
            v: "350623"
          },
          {
            l: "\u8BCF\u5B89\u53BF",
            v: "350624"
          },
          {
            l: "\u957F\u6CF0\u53BF",
            v: "350625"
          },
          {
            l: "\u4E1C\u5C71\u53BF",
            v: "350626"
          },
          {
            l: "\u5357\u9756\u53BF",
            v: "350627"
          },
          {
            l: "\u5E73\u548C\u53BF",
            v: "350628"
          },
          {
            l: "\u534E\u5B89\u53BF",
            v: "350629"
          },
          {
            l: "\u9F99\u6D77\u5E02",
            v: "350681"
          }
        ],
        l: "\u6F33\u5DDE\u5E02",
        v: "350600"
      },
      {
        c: [
          {
            l: "\u5EF6\u5E73\u533A",
            v: "350702"
          },
          {
            l: "\u5EFA\u9633\u533A",
            v: "350703"
          },
          {
            l: "\u987A\u660C\u53BF",
            v: "350721"
          },
          {
            l: "\u6D66\u57CE\u53BF",
            v: "350722"
          },
          {
            l: "\u5149\u6CFD\u53BF",
            v: "350723"
          },
          {
            l: "\u677E\u6EAA\u53BF",
            v: "350724"
          },
          {
            l: "\u653F\u548C\u53BF",
            v: "350725"
          },
          {
            l: "\u90B5\u6B66\u5E02",
            v: "350781"
          },
          {
            l: "\u6B66\u5937\u5C71\u5E02",
            v: "350782"
          },
          {
            l: "\u5EFA\u74EF\u5E02",
            v: "350783"
          }
        ],
        l: "\u5357\u5E73\u5E02",
        v: "350700"
      },
      {
        c: [
          {
            l: "\u65B0\u7F57\u533A",
            v: "350802"
          },
          {
            l: "\u6C38\u5B9A\u533A",
            v: "350803"
          },
          {
            l: "\u957F\u6C40\u53BF",
            v: "350821"
          },
          {
            l: "\u4E0A\u676D\u53BF",
            v: "350823"
          },
          {
            l: "\u6B66\u5E73\u53BF",
            v: "350824"
          },
          {
            l: "\u8FDE\u57CE\u53BF",
            v: "350825"
          },
          {
            l: "\u6F33\u5E73\u5E02",
            v: "350881"
          }
        ],
        l: "\u9F99\u5CA9\u5E02",
        v: "350800"
      },
      {
        c: [
          {
            l: "\u8549\u57CE\u533A",
            v: "350902"
          },
          {
            l: "\u971E\u6D66\u53BF",
            v: "350921"
          },
          {
            l: "\u53E4\u7530\u53BF",
            v: "350922"
          },
          {
            l: "\u5C4F\u5357\u53BF",
            v: "350923"
          },
          {
            l: "\u5BFF\u5B81\u53BF",
            v: "350924"
          },
          {
            l: "\u5468\u5B81\u53BF",
            v: "350925"
          },
          {
            l: "\u67D8\u8363\u53BF",
            v: "350926"
          },
          {
            l: "\u798F\u5B89\u5E02",
            v: "350981"
          },
          {
            l: "\u798F\u9F0E\u5E02",
            v: "350982"
          }
        ],
        l: "\u5B81\u5FB7\u5E02",
        v: "350900"
      }
    ],
    l: "\u798F\u5EFA\u7701",
    v: "350000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u4E1C\u6E56\u533A",
            v: "360102"
          },
          {
            l: "\u897F\u6E56\u533A",
            v: "360103"
          },
          {
            l: "\u9752\u4E91\u8C31\u533A",
            v: "360104"
          },
          {
            l: "\u9752\u5C71\u6E56\u533A",
            v: "360111"
          },
          {
            l: "\u65B0\u5EFA\u533A",
            v: "360112"
          },
          {
            l: "\u7EA2\u8C37\u6EE9\u533A",
            v: "360113"
          },
          {
            l: "\u5357\u660C\u53BF",
            v: "360121"
          },
          {
            l: "\u5B89\u4E49\u53BF",
            v: "360123"
          },
          {
            l: "\u8FDB\u8D24\u53BF",
            v: "360124"
          }
        ],
        l: "\u5357\u660C\u5E02",
        v: "360100"
      },
      {
        c: [
          {
            l: "\u660C\u6C5F\u533A",
            v: "360202"
          },
          {
            l: "\u73E0\u5C71\u533A",
            v: "360203"
          },
          {
            l: "\u6D6E\u6881\u53BF",
            v: "360222"
          },
          {
            l: "\u4E50\u5E73\u5E02",
            v: "360281"
          }
        ],
        l: "\u666F\u5FB7\u9547\u5E02",
        v: "360200"
      },
      {
        c: [
          {
            l: "\u5B89\u6E90\u533A",
            v: "360302"
          },
          {
            l: "\u6E58\u4E1C\u533A",
            v: "360313"
          },
          {
            l: "\u83B2\u82B1\u53BF",
            v: "360321"
          },
          {
            l: "\u4E0A\u6817\u53BF",
            v: "360322"
          },
          {
            l: "\u82A6\u6EAA\u53BF",
            v: "360323"
          }
        ],
        l: "\u840D\u4E61\u5E02",
        v: "360300"
      },
      {
        c: [
          {
            l: "\u6FC2\u6EAA\u533A",
            v: "360402"
          },
          {
            l: "\u6D54\u9633\u533A",
            v: "360403"
          },
          {
            l: "\u67F4\u6851\u533A",
            v: "360404"
          },
          {
            l: "\u6B66\u5B81\u53BF",
            v: "360423"
          },
          {
            l: "\u4FEE\u6C34\u53BF",
            v: "360424"
          },
          {
            l: "\u6C38\u4FEE\u53BF",
            v: "360425"
          },
          {
            l: "\u5FB7\u5B89\u53BF",
            v: "360426"
          },
          {
            l: "\u90FD\u660C\u53BF",
            v: "360428"
          },
          {
            l: "\u6E56\u53E3\u53BF",
            v: "360429"
          },
          {
            l: "\u5F6D\u6CFD\u53BF",
            v: "360430"
          },
          {
            l: "\u745E\u660C\u5E02",
            v: "360481"
          },
          {
            l: "\u5171\u9752\u57CE\u5E02",
            v: "360482"
          },
          {
            l: "\u5E90\u5C71\u5E02",
            v: "360483"
          }
        ],
        l: "\u4E5D\u6C5F\u5E02",
        v: "360400"
      },
      {
        c: [
          {
            l: "\u6E1D\u6C34\u533A",
            v: "360502"
          },
          {
            l: "\u5206\u5B9C\u53BF",
            v: "360521"
          }
        ],
        l: "\u65B0\u4F59\u5E02",
        v: "360500"
      },
      {
        c: [
          {
            l: "\u6708\u6E56\u533A",
            v: "360602"
          },
          {
            l: "\u4F59\u6C5F\u533A",
            v: "360603"
          },
          {
            l: "\u8D35\u6EAA\u5E02",
            v: "360681"
          }
        ],
        l: "\u9E70\u6F6D\u5E02",
        v: "360600"
      },
      {
        c: [
          {
            l: "\u7AE0\u8D21\u533A",
            v: "360702"
          },
          {
            l: "\u5357\u5EB7\u533A",
            v: "360703"
          },
          {
            l: "\u8D63\u53BF\u533A",
            v: "360704"
          },
          {
            l: "\u4FE1\u4E30\u53BF",
            v: "360722"
          },
          {
            l: "\u5927\u4F59\u53BF",
            v: "360723"
          },
          {
            l: "\u4E0A\u72B9\u53BF",
            v: "360724"
          },
          {
            l: "\u5D07\u4E49\u53BF",
            v: "360725"
          },
          {
            l: "\u5B89\u8FDC\u53BF",
            v: "360726"
          },
          {
            l: "\u5B9A\u5357\u53BF",
            v: "360728"
          },
          {
            l: "\u5168\u5357\u53BF",
            v: "360729"
          },
          {
            l: "\u5B81\u90FD\u53BF",
            v: "360730"
          },
          {
            l: "\u4E8E\u90FD\u53BF",
            v: "360731"
          },
          {
            l: "\u5174\u56FD\u53BF",
            v: "360732"
          },
          {
            l: "\u4F1A\u660C\u53BF",
            v: "360733"
          },
          {
            l: "\u5BFB\u4E4C\u53BF",
            v: "360734"
          },
          {
            l: "\u77F3\u57CE\u53BF",
            v: "360735"
          },
          {
            l: "\u745E\u91D1\u5E02",
            v: "360781"
          },
          {
            l: "\u9F99\u5357\u5E02",
            v: "360783"
          }
        ],
        l: "\u8D63\u5DDE\u5E02",
        v: "360700"
      },
      {
        c: [
          {
            l: "\u5409\u5DDE\u533A",
            v: "360802"
          },
          {
            l: "\u9752\u539F\u533A",
            v: "360803"
          },
          {
            l: "\u5409\u5B89\u53BF",
            v: "360821"
          },
          {
            l: "\u5409\u6C34\u53BF",
            v: "360822"
          },
          {
            l: "\u5CE1\u6C5F\u53BF",
            v: "360823"
          },
          {
            l: "\u65B0\u5E72\u53BF",
            v: "360824"
          },
          {
            l: "\u6C38\u4E30\u53BF",
            v: "360825"
          },
          {
            l: "\u6CF0\u548C\u53BF",
            v: "360826"
          },
          {
            l: "\u9042\u5DDD\u53BF",
            v: "360827"
          },
          {
            l: "\u4E07\u5B89\u53BF",
            v: "360828"
          },
          {
            l: "\u5B89\u798F\u53BF",
            v: "360829"
          },
          {
            l: "\u6C38\u65B0\u53BF",
            v: "360830"
          },
          {
            l: "\u4E95\u5188\u5C71\u5E02",
            v: "360881"
          }
        ],
        l: "\u5409\u5B89\u5E02",
        v: "360800"
      },
      {
        c: [
          {
            l: "\u8881\u5DDE\u533A",
            v: "360902"
          },
          {
            l: "\u5949\u65B0\u53BF",
            v: "360921"
          },
          {
            l: "\u4E07\u8F7D\u53BF",
            v: "360922"
          },
          {
            l: "\u4E0A\u9AD8\u53BF",
            v: "360923"
          },
          {
            l: "\u5B9C\u4E30\u53BF",
            v: "360924"
          },
          {
            l: "\u9756\u5B89\u53BF",
            v: "360925"
          },
          {
            l: "\u94DC\u9F13\u53BF",
            v: "360926"
          },
          {
            l: "\u4E30\u57CE\u5E02",
            v: "360981"
          },
          {
            l: "\u6A1F\u6811\u5E02",
            v: "360982"
          },
          {
            l: "\u9AD8\u5B89\u5E02",
            v: "360983"
          }
        ],
        l: "\u5B9C\u6625\u5E02",
        v: "360900"
      },
      {
        c: [
          {
            l: "\u4E34\u5DDD\u533A",
            v: "361002"
          },
          {
            l: "\u4E1C\u4E61\u533A",
            v: "361003"
          },
          {
            l: "\u5357\u57CE\u53BF",
            v: "361021"
          },
          {
            l: "\u9ECE\u5DDD\u53BF",
            v: "361022"
          },
          {
            l: "\u5357\u4E30\u53BF",
            v: "361023"
          },
          {
            l: "\u5D07\u4EC1\u53BF",
            v: "361024"
          },
          {
            l: "\u4E50\u5B89\u53BF",
            v: "361025"
          },
          {
            l: "\u5B9C\u9EC4\u53BF",
            v: "361026"
          },
          {
            l: "\u91D1\u6EAA\u53BF",
            v: "361027"
          },
          {
            l: "\u8D44\u6EAA\u53BF",
            v: "361028"
          },
          {
            l: "\u5E7F\u660C\u53BF",
            v: "361030"
          }
        ],
        l: "\u629A\u5DDE\u5E02",
        v: "361000"
      },
      {
        c: [
          {
            l: "\u4FE1\u5DDE\u533A",
            v: "361102"
          },
          {
            l: "\u5E7F\u4E30\u533A",
            v: "361103"
          },
          {
            l: "\u5E7F\u4FE1\u533A",
            v: "361104"
          },
          {
            l: "\u7389\u5C71\u53BF",
            v: "361123"
          },
          {
            l: "\u94C5\u5C71\u53BF",
            v: "361124"
          },
          {
            l: "\u6A2A\u5CF0\u53BF",
            v: "361125"
          },
          {
            l: "\u5F0B\u9633\u53BF",
            v: "361126"
          },
          {
            l: "\u4F59\u5E72\u53BF",
            v: "361127"
          },
          {
            l: "\u9131\u9633\u53BF",
            v: "361128"
          },
          {
            l: "\u4E07\u5E74\u53BF",
            v: "361129"
          },
          {
            l: "\u5A7A\u6E90\u53BF",
            v: "361130"
          },
          {
            l: "\u5FB7\u5174\u5E02",
            v: "361181"
          }
        ],
        l: "\u4E0A\u9976\u5E02",
        v: "361100"
      }
    ],
    l: "\u6C5F\u897F\u7701",
    v: "360000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5386\u4E0B\u533A",
            v: "370102"
          },
          {
            l: "\u5E02\u4E2D\u533A",
            v: "370103"
          },
          {
            l: "\u69D0\u836B\u533A",
            v: "370104"
          },
          {
            l: "\u5929\u6865\u533A",
            v: "370105"
          },
          {
            l: "\u5386\u57CE\u533A",
            v: "370112"
          },
          {
            l: "\u957F\u6E05\u533A",
            v: "370113"
          },
          {
            l: "\u7AE0\u4E18\u533A",
            v: "370114"
          },
          {
            l: "\u6D4E\u9633\u533A",
            v: "370115"
          },
          {
            l: "\u83B1\u829C\u533A",
            v: "370116"
          },
          {
            l: "\u94A2\u57CE\u533A",
            v: "370117"
          },
          {
            l: "\u5E73\u9634\u53BF",
            v: "370124"
          },
          {
            l: "\u5546\u6CB3\u53BF",
            v: "370126"
          },
          {
            l: "\u6D4E\u5357\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "370171"
          }
        ],
        l: "\u6D4E\u5357\u5E02",
        v: "370100"
      },
      {
        c: [
          {
            l: "\u5E02\u5357\u533A",
            v: "370202"
          },
          {
            l: "\u5E02\u5317\u533A",
            v: "370203"
          },
          {
            l: "\u9EC4\u5C9B\u533A",
            v: "370211"
          },
          {
            l: "\u5D02\u5C71\u533A",
            v: "370212"
          },
          {
            l: "\u674E\u6CA7\u533A",
            v: "370213"
          },
          {
            l: "\u57CE\u9633\u533A",
            v: "370214"
          },
          {
            l: "\u5373\u58A8\u533A",
            v: "370215"
          },
          {
            l: "\u9752\u5C9B\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "370271"
          },
          {
            l: "\u80F6\u5DDE\u5E02",
            v: "370281"
          },
          {
            l: "\u5E73\u5EA6\u5E02",
            v: "370283"
          },
          {
            l: "\u83B1\u897F\u5E02",
            v: "370285"
          }
        ],
        l: "\u9752\u5C9B\u5E02",
        v: "370200"
      },
      {
        c: [
          {
            l: "\u6DC4\u5DDD\u533A",
            v: "370302"
          },
          {
            l: "\u5F20\u5E97\u533A",
            v: "370303"
          },
          {
            l: "\u535A\u5C71\u533A",
            v: "370304"
          },
          {
            l: "\u4E34\u6DC4\u533A",
            v: "370305"
          },
          {
            l: "\u5468\u6751\u533A",
            v: "370306"
          },
          {
            l: "\u6853\u53F0\u53BF",
            v: "370321"
          },
          {
            l: "\u9AD8\u9752\u53BF",
            v: "370322"
          },
          {
            l: "\u6C82\u6E90\u53BF",
            v: "370323"
          }
        ],
        l: "\u6DC4\u535A\u5E02",
        v: "370300"
      },
      {
        c: [
          {
            l: "\u5E02\u4E2D\u533A",
            v: "370402"
          },
          {
            l: "\u859B\u57CE\u533A",
            v: "370403"
          },
          {
            l: "\u5CC4\u57CE\u533A",
            v: "370404"
          },
          {
            l: "\u53F0\u513F\u5E84\u533A",
            v: "370405"
          },
          {
            l: "\u5C71\u4EAD\u533A",
            v: "370406"
          },
          {
            l: "\u6ED5\u5DDE\u5E02",
            v: "370481"
          }
        ],
        l: "\u67A3\u5E84\u5E02",
        v: "370400"
      },
      {
        c: [
          {
            l: "\u4E1C\u8425\u533A",
            v: "370502"
          },
          {
            l: "\u6CB3\u53E3\u533A",
            v: "370503"
          },
          {
            l: "\u57A6\u5229\u533A",
            v: "370505"
          },
          {
            l: "\u5229\u6D25\u53BF",
            v: "370522"
          },
          {
            l: "\u5E7F\u9976\u53BF",
            v: "370523"
          },
          {
            l: "\u4E1C\u8425\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "370571"
          },
          {
            l: "\u4E1C\u8425\u6E2F\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "370572"
          }
        ],
        l: "\u4E1C\u8425\u5E02",
        v: "370500"
      },
      {
        c: [
          {
            l: "\u829D\u7F58\u533A",
            v: "370602"
          },
          {
            l: "\u798F\u5C71\u533A",
            v: "370611"
          },
          {
            l: "\u725F\u5E73\u533A",
            v: "370612"
          },
          {
            l: "\u83B1\u5C71\u533A",
            v: "370613"
          },
          {
            l: "\u84EC\u83B1\u533A",
            v: "370614"
          },
          {
            l: "\u70DF\u53F0\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "370671"
          },
          {
            l: "\u70DF\u53F0\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "370672"
          },
          {
            l: "\u9F99\u53E3\u5E02",
            v: "370681"
          },
          {
            l: "\u83B1\u9633\u5E02",
            v: "370682"
          },
          {
            l: "\u83B1\u5DDE\u5E02",
            v: "370683"
          },
          {
            l: "\u62DB\u8FDC\u5E02",
            v: "370685"
          },
          {
            l: "\u6816\u971E\u5E02",
            v: "370686"
          },
          {
            l: "\u6D77\u9633\u5E02",
            v: "370687"
          }
        ],
        l: "\u70DF\u53F0\u5E02",
        v: "370600"
      },
      {
        c: [
          {
            l: "\u6F4D\u57CE\u533A",
            v: "370702"
          },
          {
            l: "\u5BD2\u4EAD\u533A",
            v: "370703"
          },
          {
            l: "\u574A\u5B50\u533A",
            v: "370704"
          },
          {
            l: "\u594E\u6587\u533A",
            v: "370705"
          },
          {
            l: "\u4E34\u6710\u53BF",
            v: "370724"
          },
          {
            l: "\u660C\u4E50\u53BF",
            v: "370725"
          },
          {
            l: "\u6F4D\u574A\u6EE8\u6D77\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "370772"
          },
          {
            l: "\u9752\u5DDE\u5E02",
            v: "370781"
          },
          {
            l: "\u8BF8\u57CE\u5E02",
            v: "370782"
          },
          {
            l: "\u5BFF\u5149\u5E02",
            v: "370783"
          },
          {
            l: "\u5B89\u4E18\u5E02",
            v: "370784"
          },
          {
            l: "\u9AD8\u5BC6\u5E02",
            v: "370785"
          },
          {
            l: "\u660C\u9091\u5E02",
            v: "370786"
          }
        ],
        l: "\u6F4D\u574A\u5E02",
        v: "370700"
      },
      {
        c: [
          {
            l: "\u4EFB\u57CE\u533A",
            v: "370811"
          },
          {
            l: "\u5156\u5DDE\u533A",
            v: "370812"
          },
          {
            l: "\u5FAE\u5C71\u53BF",
            v: "370826"
          },
          {
            l: "\u9C7C\u53F0\u53BF",
            v: "370827"
          },
          {
            l: "\u91D1\u4E61\u53BF",
            v: "370828"
          },
          {
            l: "\u5609\u7965\u53BF",
            v: "370829"
          },
          {
            l: "\u6C76\u4E0A\u53BF",
            v: "370830"
          },
          {
            l: "\u6CD7\u6C34\u53BF",
            v: "370831"
          },
          {
            l: "\u6881\u5C71\u53BF",
            v: "370832"
          },
          {
            l: "\u6D4E\u5B81\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "370871"
          },
          {
            l: "\u66F2\u961C\u5E02",
            v: "370881"
          },
          {
            l: "\u90B9\u57CE\u5E02",
            v: "370883"
          }
        ],
        l: "\u6D4E\u5B81\u5E02",
        v: "370800"
      },
      {
        c: [
          {
            l: "\u6CF0\u5C71\u533A",
            v: "370902"
          },
          {
            l: "\u5CB1\u5CB3\u533A",
            v: "370911"
          },
          {
            l: "\u5B81\u9633\u53BF",
            v: "370921"
          },
          {
            l: "\u4E1C\u5E73\u53BF",
            v: "370923"
          },
          {
            l: "\u65B0\u6CF0\u5E02",
            v: "370982"
          },
          {
            l: "\u80A5\u57CE\u5E02",
            v: "370983"
          }
        ],
        l: "\u6CF0\u5B89\u5E02",
        v: "370900"
      },
      {
        c: [
          {
            l: "\u73AF\u7FE0\u533A",
            v: "371002"
          },
          {
            l: "\u6587\u767B\u533A",
            v: "371003"
          },
          {
            l: "\u5A01\u6D77\u706B\u70AC\u9AD8\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "371071"
          },
          {
            l: "\u5A01\u6D77\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "371072"
          },
          {
            l: "\u5A01\u6D77\u4E34\u6E2F\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "371073"
          },
          {
            l: "\u8363\u6210\u5E02",
            v: "371082"
          },
          {
            l: "\u4E73\u5C71\u5E02",
            v: "371083"
          }
        ],
        l: "\u5A01\u6D77\u5E02",
        v: "371000"
      },
      {
        c: [
          {
            l: "\u4E1C\u6E2F\u533A",
            v: "371102"
          },
          {
            l: "\u5C9A\u5C71\u533A",
            v: "371103"
          },
          {
            l: "\u4E94\u83B2\u53BF",
            v: "371121"
          },
          {
            l: "\u8392\u53BF",
            v: "371122"
          },
          {
            l: "\u65E5\u7167\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "371171"
          }
        ],
        l: "\u65E5\u7167\u5E02",
        v: "371100"
      },
      {
        c: [
          {
            l: "\u5170\u5C71\u533A",
            v: "371302"
          },
          {
            l: "\u7F57\u5E84\u533A",
            v: "371311"
          },
          {
            l: "\u6CB3\u4E1C\u533A",
            v: "371312"
          },
          {
            l: "\u6C82\u5357\u53BF",
            v: "371321"
          },
          {
            l: "\u90EF\u57CE\u53BF",
            v: "371322"
          },
          {
            l: "\u6C82\u6C34\u53BF",
            v: "371323"
          },
          {
            l: "\u5170\u9675\u53BF",
            v: "371324"
          },
          {
            l: "\u8D39\u53BF",
            v: "371325"
          },
          {
            l: "\u5E73\u9091\u53BF",
            v: "371326"
          },
          {
            l: "\u8392\u5357\u53BF",
            v: "371327"
          },
          {
            l: "\u8499\u9634\u53BF",
            v: "371328"
          },
          {
            l: "\u4E34\u6CAD\u53BF",
            v: "371329"
          },
          {
            l: "\u4E34\u6C82\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "371371"
          }
        ],
        l: "\u4E34\u6C82\u5E02",
        v: "371300"
      },
      {
        c: [
          {
            l: "\u5FB7\u57CE\u533A",
            v: "371402"
          },
          {
            l: "\u9675\u57CE\u533A",
            v: "371403"
          },
          {
            l: "\u5B81\u6D25\u53BF",
            v: "371422"
          },
          {
            l: "\u5E86\u4E91\u53BF",
            v: "371423"
          },
          {
            l: "\u4E34\u9091\u53BF",
            v: "371424"
          },
          {
            l: "\u9F50\u6CB3\u53BF",
            v: "371425"
          },
          {
            l: "\u5E73\u539F\u53BF",
            v: "371426"
          },
          {
            l: "\u590F\u6D25\u53BF",
            v: "371427"
          },
          {
            l: "\u6B66\u57CE\u53BF",
            v: "371428"
          },
          {
            l: "\u5FB7\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "371471"
          },
          {
            l: "\u5FB7\u5DDE\u8FD0\u6CB3\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "371472"
          },
          {
            l: "\u4E50\u9675\u5E02",
            v: "371481"
          },
          {
            l: "\u79B9\u57CE\u5E02",
            v: "371482"
          }
        ],
        l: "\u5FB7\u5DDE\u5E02",
        v: "371400"
      },
      {
        c: [
          {
            l: "\u4E1C\u660C\u5E9C\u533A",
            v: "371502"
          },
          {
            l: "\u830C\u5E73\u533A",
            v: "371503"
          },
          {
            l: "\u9633\u8C37\u53BF",
            v: "371521"
          },
          {
            l: "\u8398\u53BF",
            v: "371522"
          },
          {
            l: "\u4E1C\u963F\u53BF",
            v: "371524"
          },
          {
            l: "\u51A0\u53BF",
            v: "371525"
          },
          {
            l: "\u9AD8\u5510\u53BF",
            v: "371526"
          },
          {
            l: "\u4E34\u6E05\u5E02",
            v: "371581"
          }
        ],
        l: "\u804A\u57CE\u5E02",
        v: "371500"
      },
      {
        c: [
          {
            l: "\u6EE8\u57CE\u533A",
            v: "371602"
          },
          {
            l: "\u6CBE\u5316\u533A",
            v: "371603"
          },
          {
            l: "\u60E0\u6C11\u53BF",
            v: "371621"
          },
          {
            l: "\u9633\u4FE1\u53BF",
            v: "371622"
          },
          {
            l: "\u65E0\u68E3\u53BF",
            v: "371623"
          },
          {
            l: "\u535A\u5174\u53BF",
            v: "371625"
          },
          {
            l: "\u90B9\u5E73\u5E02",
            v: "371681"
          }
        ],
        l: "\u6EE8\u5DDE\u5E02",
        v: "371600"
      },
      {
        c: [
          {
            l: "\u7261\u4E39\u533A",
            v: "371702"
          },
          {
            l: "\u5B9A\u9676\u533A",
            v: "371703"
          },
          {
            l: "\u66F9\u53BF",
            v: "371721"
          },
          {
            l: "\u5355\u53BF",
            v: "371722"
          },
          {
            l: "\u6210\u6B66\u53BF",
            v: "371723"
          },
          {
            l: "\u5DE8\u91CE\u53BF",
            v: "371724"
          },
          {
            l: "\u90D3\u57CE\u53BF",
            v: "371725"
          },
          {
            l: "\u9104\u57CE\u53BF",
            v: "371726"
          },
          {
            l: "\u4E1C\u660E\u53BF",
            v: "371728"
          },
          {
            l: "\u83CF\u6CFD\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "371771"
          },
          {
            l: "\u83CF\u6CFD\u9AD8\u65B0\u6280\u672F\u5F00\u53D1\u533A",
            v: "371772"
          }
        ],
        l: "\u83CF\u6CFD\u5E02",
        v: "371700"
      }
    ],
    l: "\u5C71\u4E1C\u7701",
    v: "370000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u4E2D\u539F\u533A",
            v: "410102"
          },
          {
            l: "\u4E8C\u4E03\u533A",
            v: "410103"
          },
          {
            l: "\u7BA1\u57CE\u56DE\u65CF\u533A",
            v: "410104"
          },
          {
            l: "\u91D1\u6C34\u533A",
            v: "410105"
          },
          {
            l: "\u4E0A\u8857\u533A",
            v: "410106"
          },
          {
            l: "\u60E0\u6D4E\u533A",
            v: "410108"
          },
          {
            l: "\u4E2D\u725F\u53BF",
            v: "410122"
          },
          {
            l: "\u90D1\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "410171"
          },
          {
            l: "\u90D1\u5DDE\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "410172"
          },
          {
            l: "\u90D1\u5DDE\u822A\u7A7A\u6E2F\u7ECF\u6D4E\u7EFC\u5408\u5B9E\u9A8C\u533A",
            v: "410173"
          },
          {
            l: "\u5DE9\u4E49\u5E02",
            v: "410181"
          },
          {
            l: "\u8365\u9633\u5E02",
            v: "410182"
          },
          {
            l: "\u65B0\u5BC6\u5E02",
            v: "410183"
          },
          {
            l: "\u65B0\u90D1\u5E02",
            v: "410184"
          },
          {
            l: "\u767B\u5C01\u5E02",
            v: "410185"
          }
        ],
        l: "\u90D1\u5DDE\u5E02",
        v: "410100"
      },
      {
        c: [
          {
            l: "\u9F99\u4EAD\u533A",
            v: "410202"
          },
          {
            l: "\u987A\u6CB3\u56DE\u65CF\u533A",
            v: "410203"
          },
          {
            l: "\u9F13\u697C\u533A",
            v: "410204"
          },
          {
            l: "\u79B9\u738B\u53F0\u533A",
            v: "410205"
          },
          {
            l: "\u7965\u7B26\u533A",
            v: "410212"
          },
          {
            l: "\u675E\u53BF",
            v: "410221"
          },
          {
            l: "\u901A\u8BB8\u53BF",
            v: "410222"
          },
          {
            l: "\u5C09\u6C0F\u53BF",
            v: "410223"
          },
          {
            l: "\u5170\u8003\u53BF",
            v: "410225"
          }
        ],
        l: "\u5F00\u5C01\u5E02",
        v: "410200"
      },
      {
        c: [
          {
            l: "\u8001\u57CE\u533A",
            v: "410302"
          },
          {
            l: "\u897F\u5DE5\u533A",
            v: "410303"
          },
          {
            l: "\u700D\u6CB3\u56DE\u65CF\u533A",
            v: "410304"
          },
          {
            l: "\u6DA7\u897F\u533A",
            v: "410305"
          },
          {
            l: "\u5409\u5229\u533A",
            v: "410306"
          },
          {
            l: "\u6D1B\u9F99\u533A",
            v: "410311"
          },
          {
            l: "\u5B5F\u6D25\u53BF",
            v: "410322"
          },
          {
            l: "\u65B0\u5B89\u53BF",
            v: "410323"
          },
          {
            l: "\u683E\u5DDD\u53BF",
            v: "410324"
          },
          {
            l: "\u5D69\u53BF",
            v: "410325"
          },
          {
            l: "\u6C5D\u9633\u53BF",
            v: "410326"
          },
          {
            l: "\u5B9C\u9633\u53BF",
            v: "410327"
          },
          {
            l: "\u6D1B\u5B81\u53BF",
            v: "410328"
          },
          {
            l: "\u4F0A\u5DDD\u53BF",
            v: "410329"
          },
          {
            l: "\u6D1B\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "410371"
          },
          {
            l: "\u5043\u5E08\u5E02",
            v: "410381"
          }
        ],
        l: "\u6D1B\u9633\u5E02",
        v: "410300"
      },
      {
        c: [
          {
            l: "\u65B0\u534E\u533A",
            v: "410402"
          },
          {
            l: "\u536B\u4E1C\u533A",
            v: "410403"
          },
          {
            l: "\u77F3\u9F99\u533A",
            v: "410404"
          },
          {
            l: "\u6E5B\u6CB3\u533A",
            v: "410411"
          },
          {
            l: "\u5B9D\u4E30\u53BF",
            v: "410421"
          },
          {
            l: "\u53F6\u53BF",
            v: "410422"
          },
          {
            l: "\u9C81\u5C71\u53BF",
            v: "410423"
          },
          {
            l: "\u90CF\u53BF",
            v: "410425"
          },
          {
            l: "\u5E73\u9876\u5C71\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "410471"
          },
          {
            l: "\u5E73\u9876\u5C71\u5E02\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A",
            v: "410472"
          },
          {
            l: "\u821E\u94A2\u5E02",
            v: "410481"
          },
          {
            l: "\u6C5D\u5DDE\u5E02",
            v: "410482"
          }
        ],
        l: "\u5E73\u9876\u5C71\u5E02",
        v: "410400"
      },
      {
        c: [
          {
            l: "\u6587\u5CF0\u533A",
            v: "410502"
          },
          {
            l: "\u5317\u5173\u533A",
            v: "410503"
          },
          {
            l: "\u6BB7\u90FD\u533A",
            v: "410505"
          },
          {
            l: "\u9F99\u5B89\u533A",
            v: "410506"
          },
          {
            l: "\u5B89\u9633\u53BF",
            v: "410522"
          },
          {
            l: "\u6C64\u9634\u53BF",
            v: "410523"
          },
          {
            l: "\u6ED1\u53BF",
            v: "410526"
          },
          {
            l: "\u5185\u9EC4\u53BF",
            v: "410527"
          },
          {
            l: "\u5B89\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "410571"
          },
          {
            l: "\u6797\u5DDE\u5E02",
            v: "410581"
          }
        ],
        l: "\u5B89\u9633\u5E02",
        v: "410500"
      },
      {
        c: [
          {
            l: "\u9E64\u5C71\u533A",
            v: "410602"
          },
          {
            l: "\u5C71\u57CE\u533A",
            v: "410603"
          },
          {
            l: "\u6DC7\u6EE8\u533A",
            v: "410611"
          },
          {
            l: "\u6D5A\u53BF",
            v: "410621"
          },
          {
            l: "\u6DC7\u53BF",
            v: "410622"
          },
          {
            l: "\u9E64\u58C1\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "410671"
          }
        ],
        l: "\u9E64\u58C1\u5E02",
        v: "410600"
      },
      {
        c: [
          {
            l: "\u7EA2\u65D7\u533A",
            v: "410702"
          },
          {
            l: "\u536B\u6EE8\u533A",
            v: "410703"
          },
          {
            l: "\u51E4\u6CC9\u533A",
            v: "410704"
          },
          {
            l: "\u7267\u91CE\u533A",
            v: "410711"
          },
          {
            l: "\u65B0\u4E61\u53BF",
            v: "410721"
          },
          {
            l: "\u83B7\u5609\u53BF",
            v: "410724"
          },
          {
            l: "\u539F\u9633\u53BF",
            v: "410725"
          },
          {
            l: "\u5EF6\u6D25\u53BF",
            v: "410726"
          },
          {
            l: "\u5C01\u4E18\u53BF",
            v: "410727"
          },
          {
            l: "\u65B0\u4E61\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "410771"
          },
          {
            l: "\u65B0\u4E61\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "410772"
          },
          {
            l: "\u65B0\u4E61\u5E02\u5E73\u539F\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A",
            v: "410773"
          },
          {
            l: "\u536B\u8F89\u5E02",
            v: "410781"
          },
          {
            l: "\u8F89\u53BF\u5E02",
            v: "410782"
          },
          {
            l: "\u957F\u57A3\u5E02",
            v: "410783"
          }
        ],
        l: "\u65B0\u4E61\u5E02",
        v: "410700"
      },
      {
        c: [
          {
            l: "\u89E3\u653E\u533A",
            v: "410802"
          },
          {
            l: "\u4E2D\u7AD9\u533A",
            v: "410803"
          },
          {
            l: "\u9A6C\u6751\u533A",
            v: "410804"
          },
          {
            l: "\u5C71\u9633\u533A",
            v: "410811"
          },
          {
            l: "\u4FEE\u6B66\u53BF",
            v: "410821"
          },
          {
            l: "\u535A\u7231\u53BF",
            v: "410822"
          },
          {
            l: "\u6B66\u965F\u53BF",
            v: "410823"
          },
          {
            l: "\u6E29\u53BF",
            v: "410825"
          },
          {
            l: "\u7126\u4F5C\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A",
            v: "410871"
          },
          {
            l: "\u6C81\u9633\u5E02",
            v: "410882"
          },
          {
            l: "\u5B5F\u5DDE\u5E02",
            v: "410883"
          }
        ],
        l: "\u7126\u4F5C\u5E02",
        v: "410800"
      },
      {
        c: [
          {
            l: "\u534E\u9F99\u533A",
            v: "410902"
          },
          {
            l: "\u6E05\u4E30\u53BF",
            v: "410922"
          },
          {
            l: "\u5357\u4E50\u53BF",
            v: "410923"
          },
          {
            l: "\u8303\u53BF",
            v: "410926"
          },
          {
            l: "\u53F0\u524D\u53BF",
            v: "410927"
          },
          {
            l: "\u6FEE\u9633\u53BF",
            v: "410928"
          },
          {
            l: "\u6CB3\u5357\u6FEE\u9633\u5DE5\u4E1A\u56ED\u533A",
            v: "410971"
          },
          {
            l: "\u6FEE\u9633\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "410972"
          }
        ],
        l: "\u6FEE\u9633\u5E02",
        v: "410900"
      },
      {
        c: [
          {
            l: "\u9B4F\u90FD\u533A",
            v: "411002"
          },
          {
            l: "\u5EFA\u5B89\u533A",
            v: "411003"
          },
          {
            l: "\u9122\u9675\u53BF",
            v: "411024"
          },
          {
            l: "\u8944\u57CE\u53BF",
            v: "411025"
          },
          {
            l: "\u8BB8\u660C\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "411071"
          },
          {
            l: "\u79B9\u5DDE\u5E02",
            v: "411081"
          },
          {
            l: "\u957F\u845B\u5E02",
            v: "411082"
          }
        ],
        l: "\u8BB8\u660C\u5E02",
        v: "411000"
      },
      {
        c: [
          {
            l: "\u6E90\u6C47\u533A",
            v: "411102"
          },
          {
            l: "\u90FE\u57CE\u533A",
            v: "411103"
          },
          {
            l: "\u53EC\u9675\u533A",
            v: "411104"
          },
          {
            l: "\u821E\u9633\u53BF",
            v: "411121"
          },
          {
            l: "\u4E34\u988D\u53BF",
            v: "411122"
          },
          {
            l: "\u6F2F\u6CB3\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "411171"
          }
        ],
        l: "\u6F2F\u6CB3\u5E02",
        v: "411100"
      },
      {
        c: [
          {
            l: "\u6E56\u6EE8\u533A",
            v: "411202"
          },
          {
            l: "\u9655\u5DDE\u533A",
            v: "411203"
          },
          {
            l: "\u6E11\u6C60\u53BF",
            v: "411221"
          },
          {
            l: "\u5362\u6C0F\u53BF",
            v: "411224"
          },
          {
            l: "\u6CB3\u5357\u4E09\u95E8\u5CE1\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "411271"
          },
          {
            l: "\u4E49\u9A6C\u5E02",
            v: "411281"
          },
          {
            l: "\u7075\u5B9D\u5E02",
            v: "411282"
          }
        ],
        l: "\u4E09\u95E8\u5CE1\u5E02",
        v: "411200"
      },
      {
        c: [
          {
            l: "\u5B9B\u57CE\u533A",
            v: "411302"
          },
          {
            l: "\u5367\u9F99\u533A",
            v: "411303"
          },
          {
            l: "\u5357\u53EC\u53BF",
            v: "411321"
          },
          {
            l: "\u65B9\u57CE\u53BF",
            v: "411322"
          },
          {
            l: "\u897F\u5CE1\u53BF",
            v: "411323"
          },
          {
            l: "\u9547\u5E73\u53BF",
            v: "411324"
          },
          {
            l: "\u5185\u4E61\u53BF",
            v: "411325"
          },
          {
            l: "\u6DC5\u5DDD\u53BF",
            v: "411326"
          },
          {
            l: "\u793E\u65D7\u53BF",
            v: "411327"
          },
          {
            l: "\u5510\u6CB3\u53BF",
            v: "411328"
          },
          {
            l: "\u65B0\u91CE\u53BF",
            v: "411329"
          },
          {
            l: "\u6850\u67CF\u53BF",
            v: "411330"
          },
          {
            l: "\u5357\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "411371"
          },
          {
            l: "\u5357\u9633\u5E02\u57CE\u4E61\u4E00\u4F53\u5316\u793A\u8303\u533A",
            v: "411372"
          },
          {
            l: "\u9093\u5DDE\u5E02",
            v: "411381"
          }
        ],
        l: "\u5357\u9633\u5E02",
        v: "411300"
      },
      {
        c: [
          {
            l: "\u6881\u56ED\u533A",
            v: "411402"
          },
          {
            l: "\u7762\u9633\u533A",
            v: "411403"
          },
          {
            l: "\u6C11\u6743\u53BF",
            v: "411421"
          },
          {
            l: "\u7762\u53BF",
            v: "411422"
          },
          {
            l: "\u5B81\u9675\u53BF",
            v: "411423"
          },
          {
            l: "\u67D8\u57CE\u53BF",
            v: "411424"
          },
          {
            l: "\u865E\u57CE\u53BF",
            v: "411425"
          },
          {
            l: "\u590F\u9091\u53BF",
            v: "411426"
          },
          {
            l: "\u8C6B\u4E1C\u7EFC\u5408\u7269\u6D41\u4EA7\u4E1A\u805A\u96C6\u533A",
            v: "411471"
          },
          {
            l: "\u6CB3\u5357\u5546\u4E18\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "411472"
          },
          {
            l: "\u6C38\u57CE\u5E02",
            v: "411481"
          }
        ],
        l: "\u5546\u4E18\u5E02",
        v: "411400"
      },
      {
        c: [
          {
            l: "\u6D49\u6CB3\u533A",
            v: "411502"
          },
          {
            l: "\u5E73\u6865\u533A",
            v: "411503"
          },
          {
            l: "\u7F57\u5C71\u53BF",
            v: "411521"
          },
          {
            l: "\u5149\u5C71\u53BF",
            v: "411522"
          },
          {
            l: "\u65B0\u53BF",
            v: "411523"
          },
          {
            l: "\u5546\u57CE\u53BF",
            v: "411524"
          },
          {
            l: "\u56FA\u59CB\u53BF",
            v: "411525"
          },
          {
            l: "\u6F62\u5DDD\u53BF",
            v: "411526"
          },
          {
            l: "\u6DEE\u6EE8\u53BF",
            v: "411527"
          },
          {
            l: "\u606F\u53BF",
            v: "411528"
          },
          {
            l: "\u4FE1\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u5F00\u53D1\u533A",
            v: "411571"
          }
        ],
        l: "\u4FE1\u9633\u5E02",
        v: "411500"
      },
      {
        c: [
          {
            l: "\u5DDD\u6C47\u533A",
            v: "411602"
          },
          {
            l: "\u6DEE\u9633\u533A",
            v: "411603"
          },
          {
            l: "\u6276\u6C9F\u53BF",
            v: "411621"
          },
          {
            l: "\u897F\u534E\u53BF",
            v: "411622"
          },
          {
            l: "\u5546\u6C34\u53BF",
            v: "411623"
          },
          {
            l: "\u6C88\u4E18\u53BF",
            v: "411624"
          },
          {
            l: "\u90F8\u57CE\u53BF",
            v: "411625"
          },
          {
            l: "\u592A\u5EB7\u53BF",
            v: "411627"
          },
          {
            l: "\u9E7F\u9091\u53BF",
            v: "411628"
          },
          {
            l: "\u6CB3\u5357\u5468\u53E3\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "411671"
          },
          {
            l: "\u9879\u57CE\u5E02",
            v: "411681"
          }
        ],
        l: "\u5468\u53E3\u5E02",
        v: "411600"
      },
      {
        c: [
          {
            l: "\u9A7F\u57CE\u533A",
            v: "411702"
          },
          {
            l: "\u897F\u5E73\u53BF",
            v: "411721"
          },
          {
            l: "\u4E0A\u8521\u53BF",
            v: "411722"
          },
          {
            l: "\u5E73\u8206\u53BF",
            v: "411723"
          },
          {
            l: "\u6B63\u9633\u53BF",
            v: "411724"
          },
          {
            l: "\u786E\u5C71\u53BF",
            v: "411725"
          },
          {
            l: "\u6CCC\u9633\u53BF",
            v: "411726"
          },
          {
            l: "\u6C5D\u5357\u53BF",
            v: "411727"
          },
          {
            l: "\u9042\u5E73\u53BF",
            v: "411728"
          },
          {
            l: "\u65B0\u8521\u53BF",
            v: "411729"
          },
          {
            l: "\u6CB3\u5357\u9A7B\u9A6C\u5E97\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "411771"
          }
        ],
        l: "\u9A7B\u9A6C\u5E97\u5E02",
        v: "411700"
      },
      {
        c: [
          {
            l: "\u6D4E\u6E90\u5E02",
            v: "419001"
          }
        ],
        l: "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212",
        v: "419000"
      }
    ],
    l: "\u6CB3\u5357\u7701",
    v: "410000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u6C5F\u5CB8\u533A",
            v: "420102"
          },
          {
            l: "\u6C5F\u6C49\u533A",
            v: "420103"
          },
          {
            l: "\u785A\u53E3\u533A",
            v: "420104"
          },
          {
            l: "\u6C49\u9633\u533A",
            v: "420105"
          },
          {
            l: "\u6B66\u660C\u533A",
            v: "420106"
          },
          {
            l: "\u9752\u5C71\u533A",
            v: "420107"
          },
          {
            l: "\u6D2A\u5C71\u533A",
            v: "420111"
          },
          {
            l: "\u4E1C\u897F\u6E56\u533A",
            v: "420112"
          },
          {
            l: "\u6C49\u5357\u533A",
            v: "420113"
          },
          {
            l: "\u8521\u7538\u533A",
            v: "420114"
          },
          {
            l: "\u6C5F\u590F\u533A",
            v: "420115"
          },
          {
            l: "\u9EC4\u9642\u533A",
            v: "420116"
          },
          {
            l: "\u65B0\u6D32\u533A",
            v: "420117"
          }
        ],
        l: "\u6B66\u6C49\u5E02",
        v: "420100"
      },
      {
        c: [
          {
            l: "\u9EC4\u77F3\u6E2F\u533A",
            v: "420202"
          },
          {
            l: "\u897F\u585E\u5C71\u533A",
            v: "420203"
          },
          {
            l: "\u4E0B\u9646\u533A",
            v: "420204"
          },
          {
            l: "\u94C1\u5C71\u533A",
            v: "420205"
          },
          {
            l: "\u9633\u65B0\u53BF",
            v: "420222"
          },
          {
            l: "\u5927\u51B6\u5E02",
            v: "420281"
          }
        ],
        l: "\u9EC4\u77F3\u5E02",
        v: "420200"
      },
      {
        c: [
          {
            l: "\u8305\u7BAD\u533A",
            v: "420302"
          },
          {
            l: "\u5F20\u6E7E\u533A",
            v: "420303"
          },
          {
            l: "\u90E7\u9633\u533A",
            v: "420304"
          },
          {
            l: "\u90E7\u897F\u53BF",
            v: "420322"
          },
          {
            l: "\u7AF9\u5C71\u53BF",
            v: "420323"
          },
          {
            l: "\u7AF9\u6EAA\u53BF",
            v: "420324"
          },
          {
            l: "\u623F\u53BF",
            v: "420325"
          },
          {
            l: "\u4E39\u6C5F\u53E3\u5E02",
            v: "420381"
          }
        ],
        l: "\u5341\u5830\u5E02",
        v: "420300"
      },
      {
        c: [
          {
            l: "\u897F\u9675\u533A",
            v: "420502"
          },
          {
            l: "\u4F0D\u5BB6\u5C97\u533A",
            v: "420503"
          },
          {
            l: "\u70B9\u519B\u533A",
            v: "420504"
          },
          {
            l: "\u7307\u4EAD\u533A",
            v: "420505"
          },
          {
            l: "\u5937\u9675\u533A",
            v: "420506"
          },
          {
            l: "\u8FDC\u5B89\u53BF",
            v: "420525"
          },
          {
            l: "\u5174\u5C71\u53BF",
            v: "420526"
          },
          {
            l: "\u79ED\u5F52\u53BF",
            v: "420527"
          },
          {
            l: "\u957F\u9633\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
            v: "420528"
          },
          {
            l: "\u4E94\u5CF0\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
            v: "420529"
          },
          {
            l: "\u5B9C\u90FD\u5E02",
            v: "420581"
          },
          {
            l: "\u5F53\u9633\u5E02",
            v: "420582"
          },
          {
            l: "\u679D\u6C5F\u5E02",
            v: "420583"
          }
        ],
        l: "\u5B9C\u660C\u5E02",
        v: "420500"
      },
      {
        c: [
          {
            l: "\u8944\u57CE\u533A",
            v: "420602"
          },
          {
            l: "\u6A0A\u57CE\u533A",
            v: "420606"
          },
          {
            l: "\u8944\u5DDE\u533A",
            v: "420607"
          },
          {
            l: "\u5357\u6F33\u53BF",
            v: "420624"
          },
          {
            l: "\u8C37\u57CE\u53BF",
            v: "420625"
          },
          {
            l: "\u4FDD\u5EB7\u53BF",
            v: "420626"
          },
          {
            l: "\u8001\u6CB3\u53E3\u5E02",
            v: "420682"
          },
          {
            l: "\u67A3\u9633\u5E02",
            v: "420683"
          },
          {
            l: "\u5B9C\u57CE\u5E02",
            v: "420684"
          }
        ],
        l: "\u8944\u9633\u5E02",
        v: "420600"
      },
      {
        c: [
          {
            l: "\u6881\u5B50\u6E56\u533A",
            v: "420702"
          },
          {
            l: "\u534E\u5BB9\u533A",
            v: "420703"
          },
          {
            l: "\u9102\u57CE\u533A",
            v: "420704"
          }
        ],
        l: "\u9102\u5DDE\u5E02",
        v: "420700"
      },
      {
        c: [
          {
            l: "\u4E1C\u5B9D\u533A",
            v: "420802"
          },
          {
            l: "\u6387\u5200\u533A",
            v: "420804"
          },
          {
            l: "\u6C99\u6D0B\u53BF",
            v: "420822"
          },
          {
            l: "\u949F\u7965\u5E02",
            v: "420881"
          },
          {
            l: "\u4EAC\u5C71\u5E02",
            v: "420882"
          }
        ],
        l: "\u8346\u95E8\u5E02",
        v: "420800"
      },
      {
        c: [
          {
            l: "\u5B5D\u5357\u533A",
            v: "420902"
          },
          {
            l: "\u5B5D\u660C\u53BF",
            v: "420921"
          },
          {
            l: "\u5927\u609F\u53BF",
            v: "420922"
          },
          {
            l: "\u4E91\u68A6\u53BF",
            v: "420923"
          },
          {
            l: "\u5E94\u57CE\u5E02",
            v: "420981"
          },
          {
            l: "\u5B89\u9646\u5E02",
            v: "420982"
          },
          {
            l: "\u6C49\u5DDD\u5E02",
            v: "420984"
          }
        ],
        l: "\u5B5D\u611F\u5E02",
        v: "420900"
      },
      {
        c: [
          {
            l: "\u6C99\u5E02\u533A",
            v: "421002"
          },
          {
            l: "\u8346\u5DDE\u533A",
            v: "421003"
          },
          {
            l: "\u516C\u5B89\u53BF",
            v: "421022"
          },
          {
            l: "\u76D1\u5229\u53BF",
            v: "421023"
          },
          {
            l: "\u6C5F\u9675\u53BF",
            v: "421024"
          },
          {
            l: "\u8346\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "421071"
          },
          {
            l: "\u77F3\u9996\u5E02",
            v: "421081"
          },
          {
            l: "\u6D2A\u6E56\u5E02",
            v: "421083"
          },
          {
            l: "\u677E\u6ECB\u5E02",
            v: "421087"
          }
        ],
        l: "\u8346\u5DDE\u5E02",
        v: "421000"
      },
      {
        c: [
          {
            l: "\u9EC4\u5DDE\u533A",
            v: "421102"
          },
          {
            l: "\u56E2\u98CE\u53BF",
            v: "421121"
          },
          {
            l: "\u7EA2\u5B89\u53BF",
            v: "421122"
          },
          {
            l: "\u7F57\u7530\u53BF",
            v: "421123"
          },
          {
            l: "\u82F1\u5C71\u53BF",
            v: "421124"
          },
          {
            l: "\u6D60\u6C34\u53BF",
            v: "421125"
          },
          {
            l: "\u8572\u6625\u53BF",
            v: "421126"
          },
          {
            l: "\u9EC4\u6885\u53BF",
            v: "421127"
          },
          {
            l: "\u9F99\u611F\u6E56\u7BA1\u7406\u533A",
            v: "421171"
          },
          {
            l: "\u9EBB\u57CE\u5E02",
            v: "421181"
          },
          {
            l: "\u6B66\u7A74\u5E02",
            v: "421182"
          }
        ],
        l: "\u9EC4\u5188\u5E02",
        v: "421100"
      },
      {
        c: [
          {
            l: "\u54B8\u5B89\u533A",
            v: "421202"
          },
          {
            l: "\u5609\u9C7C\u53BF",
            v: "421221"
          },
          {
            l: "\u901A\u57CE\u53BF",
            v: "421222"
          },
          {
            l: "\u5D07\u9633\u53BF",
            v: "421223"
          },
          {
            l: "\u901A\u5C71\u53BF",
            v: "421224"
          },
          {
            l: "\u8D64\u58C1\u5E02",
            v: "421281"
          }
        ],
        l: "\u54B8\u5B81\u5E02",
        v: "421200"
      },
      {
        c: [
          {
            l: "\u66FE\u90FD\u533A",
            v: "421303"
          },
          {
            l: "\u968F\u53BF",
            v: "421321"
          },
          {
            l: "\u5E7F\u6C34\u5E02",
            v: "421381"
          }
        ],
        l: "\u968F\u5DDE\u5E02",
        v: "421300"
      },
      {
        c: [
          {
            l: "\u6069\u65BD\u5E02",
            v: "422801"
          },
          {
            l: "\u5229\u5DDD\u5E02",
            v: "422802"
          },
          {
            l: "\u5EFA\u59CB\u53BF",
            v: "422822"
          },
          {
            l: "\u5DF4\u4E1C\u53BF",
            v: "422823"
          },
          {
            l: "\u5BA3\u6069\u53BF",
            v: "422825"
          },
          {
            l: "\u54B8\u4E30\u53BF",
            v: "422826"
          },
          {
            l: "\u6765\u51E4\u53BF",
            v: "422827"
          },
          {
            l: "\u9E64\u5CF0\u53BF",
            v: "422828"
          }
        ],
        l: "\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
        v: "422800"
      },
      {
        c: [
          {
            l: "\u4ED9\u6843\u5E02",
            v: "429004"
          },
          {
            l: "\u6F5C\u6C5F\u5E02",
            v: "429005"
          },
          {
            l: "\u5929\u95E8\u5E02",
            v: "429006"
          },
          {
            l: "\u795E\u519C\u67B6\u6797\u533A",
            v: "429021"
          }
        ],
        l: "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212",
        v: "429000"
      }
    ],
    l: "\u6E56\u5317\u7701",
    v: "420000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u8299\u84C9\u533A",
            v: "430102"
          },
          {
            l: "\u5929\u5FC3\u533A",
            v: "430103"
          },
          {
            l: "\u5CB3\u9E93\u533A",
            v: "430104"
          },
          {
            l: "\u5F00\u798F\u533A",
            v: "430105"
          },
          {
            l: "\u96E8\u82B1\u533A",
            v: "430111"
          },
          {
            l: "\u671B\u57CE\u533A",
            v: "430112"
          },
          {
            l: "\u957F\u6C99\u53BF",
            v: "430121"
          },
          {
            l: "\u6D4F\u9633\u5E02",
            v: "430181"
          },
          {
            l: "\u5B81\u4E61\u5E02",
            v: "430182"
          }
        ],
        l: "\u957F\u6C99\u5E02",
        v: "430100"
      },
      {
        c: [
          {
            l: "\u8377\u5858\u533A",
            v: "430202"
          },
          {
            l: "\u82A6\u6DDE\u533A",
            v: "430203"
          },
          {
            l: "\u77F3\u5CF0\u533A",
            v: "430204"
          },
          {
            l: "\u5929\u5143\u533A",
            v: "430211"
          },
          {
            l: "\u6E0C\u53E3\u533A",
            v: "430212"
          },
          {
            l: "\u6538\u53BF",
            v: "430223"
          },
          {
            l: "\u8336\u9675\u53BF",
            v: "430224"
          },
          {
            l: "\u708E\u9675\u53BF",
            v: "430225"
          },
          {
            l: "\u4E91\u9F99\u793A\u8303\u533A",
            v: "430271"
          },
          {
            l: "\u91B4\u9675\u5E02",
            v: "430281"
          }
        ],
        l: "\u682A\u6D32\u5E02",
        v: "430200"
      },
      {
        c: [
          {
            l: "\u96E8\u6E56\u533A",
            v: "430302"
          },
          {
            l: "\u5CB3\u5858\u533A",
            v: "430304"
          },
          {
            l: "\u6E58\u6F6D\u53BF",
            v: "430321"
          },
          {
            l: "\u6E56\u5357\u6E58\u6F6D\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A",
            v: "430371"
          },
          {
            l: "\u6E58\u6F6D\u662D\u5C71\u793A\u8303\u533A",
            v: "430372"
          },
          {
            l: "\u6E58\u6F6D\u4E5D\u534E\u793A\u8303\u533A",
            v: "430373"
          },
          {
            l: "\u6E58\u4E61\u5E02",
            v: "430381"
          },
          {
            l: "\u97F6\u5C71\u5E02",
            v: "430382"
          }
        ],
        l: "\u6E58\u6F6D\u5E02",
        v: "430300"
      },
      {
        c: [
          {
            l: "\u73E0\u6656\u533A",
            v: "430405"
          },
          {
            l: "\u96C1\u5CF0\u533A",
            v: "430406"
          },
          {
            l: "\u77F3\u9F13\u533A",
            v: "430407"
          },
          {
            l: "\u84B8\u6E58\u533A",
            v: "430408"
          },
          {
            l: "\u5357\u5CB3\u533A",
            v: "430412"
          },
          {
            l: "\u8861\u9633\u53BF",
            v: "430421"
          },
          {
            l: "\u8861\u5357\u53BF",
            v: "430422"
          },
          {
            l: "\u8861\u5C71\u53BF",
            v: "430423"
          },
          {
            l: "\u8861\u4E1C\u53BF",
            v: "430424"
          },
          {
            l: "\u7941\u4E1C\u53BF",
            v: "430426"
          },
          {
            l: "\u8861\u9633\u7EFC\u5408\u4FDD\u7A0E\u533A",
            v: "430471"
          },
          {
            l: "\u6E56\u5357\u8861\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A",
            v: "430472"
          },
          {
            l: "\u6E56\u5357\u8861\u9633\u677E\u6728\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "430473"
          },
          {
            l: "\u8012\u9633\u5E02",
            v: "430481"
          },
          {
            l: "\u5E38\u5B81\u5E02",
            v: "430482"
          }
        ],
        l: "\u8861\u9633\u5E02",
        v: "430400"
      },
      {
        c: [
          {
            l: "\u53CC\u6E05\u533A",
            v: "430502"
          },
          {
            l: "\u5927\u7965\u533A",
            v: "430503"
          },
          {
            l: "\u5317\u5854\u533A",
            v: "430511"
          },
          {
            l: "\u65B0\u90B5\u53BF",
            v: "430522"
          },
          {
            l: "\u90B5\u9633\u53BF",
            v: "430523"
          },
          {
            l: "\u9686\u56DE\u53BF",
            v: "430524"
          },
          {
            l: "\u6D1E\u53E3\u53BF",
            v: "430525"
          },
          {
            l: "\u7EE5\u5B81\u53BF",
            v: "430527"
          },
          {
            l: "\u65B0\u5B81\u53BF",
            v: "430528"
          },
          {
            l: "\u57CE\u6B65\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "430529"
          },
          {
            l: "\u6B66\u5188\u5E02",
            v: "430581"
          },
          {
            l: "\u90B5\u4E1C\u5E02",
            v: "430582"
          }
        ],
        l: "\u90B5\u9633\u5E02",
        v: "430500"
      },
      {
        c: [
          {
            l: "\u5CB3\u9633\u697C\u533A",
            v: "430602"
          },
          {
            l: "\u4E91\u6EAA\u533A",
            v: "430603"
          },
          {
            l: "\u541B\u5C71\u533A",
            v: "430611"
          },
          {
            l: "\u5CB3\u9633\u53BF",
            v: "430621"
          },
          {
            l: "\u534E\u5BB9\u53BF",
            v: "430623"
          },
          {
            l: "\u6E58\u9634\u53BF",
            v: "430624"
          },
          {
            l: "\u5E73\u6C5F\u53BF",
            v: "430626"
          },
          {
            l: "\u5CB3\u9633\u5E02\u5C48\u539F\u7BA1\u7406\u533A",
            v: "430671"
          },
          {
            l: "\u6C68\u7F57\u5E02",
            v: "430681"
          },
          {
            l: "\u4E34\u6E58\u5E02",
            v: "430682"
          }
        ],
        l: "\u5CB3\u9633\u5E02",
        v: "430600"
      },
      {
        c: [
          {
            l: "\u6B66\u9675\u533A",
            v: "430702"
          },
          {
            l: "\u9F0E\u57CE\u533A",
            v: "430703"
          },
          {
            l: "\u5B89\u4E61\u53BF",
            v: "430721"
          },
          {
            l: "\u6C49\u5BFF\u53BF",
            v: "430722"
          },
          {
            l: "\u6FA7\u53BF",
            v: "430723"
          },
          {
            l: "\u4E34\u6FA7\u53BF",
            v: "430724"
          },
          {
            l: "\u6843\u6E90\u53BF",
            v: "430725"
          },
          {
            l: "\u77F3\u95E8\u53BF",
            v: "430726"
          },
          {
            l: "\u5E38\u5FB7\u5E02\u897F\u6D1E\u5EAD\u7BA1\u7406\u533A",
            v: "430771"
          },
          {
            l: "\u6D25\u5E02\u5E02",
            v: "430781"
          }
        ],
        l: "\u5E38\u5FB7\u5E02",
        v: "430700"
      },
      {
        c: [
          {
            l: "\u6C38\u5B9A\u533A",
            v: "430802"
          },
          {
            l: "\u6B66\u9675\u6E90\u533A",
            v: "430811"
          },
          {
            l: "\u6148\u5229\u53BF",
            v: "430821"
          },
          {
            l: "\u6851\u690D\u53BF",
            v: "430822"
          }
        ],
        l: "\u5F20\u5BB6\u754C\u5E02",
        v: "430800"
      },
      {
        c: [
          {
            l: "\u8D44\u9633\u533A",
            v: "430902"
          },
          {
            l: "\u8D6B\u5C71\u533A",
            v: "430903"
          },
          {
            l: "\u5357\u53BF",
            v: "430921"
          },
          {
            l: "\u6843\u6C5F\u53BF",
            v: "430922"
          },
          {
            l: "\u5B89\u5316\u53BF",
            v: "430923"
          },
          {
            l: "\u76CA\u9633\u5E02\u5927\u901A\u6E56\u7BA1\u7406\u533A",
            v: "430971"
          },
          {
            l: "\u6E56\u5357\u76CA\u9633\u9AD8\u65B0\u6280\u672F\u4EA7\u4E1A\u56ED\u533A",
            v: "430972"
          },
          {
            l: "\u6C85\u6C5F\u5E02",
            v: "430981"
          }
        ],
        l: "\u76CA\u9633\u5E02",
        v: "430900"
      },
      {
        c: [
          {
            l: "\u5317\u6E56\u533A",
            v: "431002"
          },
          {
            l: "\u82CF\u4ED9\u533A",
            v: "431003"
          },
          {
            l: "\u6842\u9633\u53BF",
            v: "431021"
          },
          {
            l: "\u5B9C\u7AE0\u53BF",
            v: "431022"
          },
          {
            l: "\u6C38\u5174\u53BF",
            v: "431023"
          },
          {
            l: "\u5609\u79BE\u53BF",
            v: "431024"
          },
          {
            l: "\u4E34\u6B66\u53BF",
            v: "431025"
          },
          {
            l: "\u6C5D\u57CE\u53BF",
            v: "431026"
          },
          {
            l: "\u6842\u4E1C\u53BF",
            v: "431027"
          },
          {
            l: "\u5B89\u4EC1\u53BF",
            v: "431028"
          },
          {
            l: "\u8D44\u5174\u5E02",
            v: "431081"
          }
        ],
        l: "\u90F4\u5DDE\u5E02",
        v: "431000"
      },
      {
        c: [
          {
            l: "\u96F6\u9675\u533A",
            v: "431102"
          },
          {
            l: "\u51B7\u6C34\u6EE9\u533A",
            v: "431103"
          },
          {
            l: "\u7941\u9633\u53BF",
            v: "431121"
          },
          {
            l: "\u4E1C\u5B89\u53BF",
            v: "431122"
          },
          {
            l: "\u53CC\u724C\u53BF",
            v: "431123"
          },
          {
            l: "\u9053\u53BF",
            v: "431124"
          },
          {
            l: "\u6C5F\u6C38\u53BF",
            v: "431125"
          },
          {
            l: "\u5B81\u8FDC\u53BF",
            v: "431126"
          },
          {
            l: "\u84DD\u5C71\u53BF",
            v: "431127"
          },
          {
            l: "\u65B0\u7530\u53BF",
            v: "431128"
          },
          {
            l: "\u6C5F\u534E\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "431129"
          },
          {
            l: "\u6C38\u5DDE\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "431171"
          },
          {
            l: "\u6C38\u5DDE\u5E02\u91D1\u6D1E\u7BA1\u7406\u533A",
            v: "431172"
          },
          {
            l: "\u6C38\u5DDE\u5E02\u56DE\u9F99\u5729\u7BA1\u7406\u533A",
            v: "431173"
          }
        ],
        l: "\u6C38\u5DDE\u5E02",
        v: "431100"
      },
      {
        c: [
          {
            l: "\u9E64\u57CE\u533A",
            v: "431202"
          },
          {
            l: "\u4E2D\u65B9\u53BF",
            v: "431221"
          },
          {
            l: "\u6C85\u9675\u53BF",
            v: "431222"
          },
          {
            l: "\u8FB0\u6EAA\u53BF",
            v: "431223"
          },
          {
            l: "\u6E86\u6D66\u53BF",
            v: "431224"
          },
          {
            l: "\u4F1A\u540C\u53BF",
            v: "431225"
          },
          {
            l: "\u9EBB\u9633\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "431226"
          },
          {
            l: "\u65B0\u6643\u4F97\u65CF\u81EA\u6CBB\u53BF",
            v: "431227"
          },
          {
            l: "\u82B7\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF",
            v: "431228"
          },
          {
            l: "\u9756\u5DDE\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u53BF",
            v: "431229"
          },
          {
            l: "\u901A\u9053\u4F97\u65CF\u81EA\u6CBB\u53BF",
            v: "431230"
          },
          {
            l: "\u6000\u5316\u5E02\u6D2A\u6C5F\u7BA1\u7406\u533A",
            v: "431271"
          },
          {
            l: "\u6D2A\u6C5F\u5E02",
            v: "431281"
          }
        ],
        l: "\u6000\u5316\u5E02",
        v: "431200"
      },
      {
        c: [
          {
            l: "\u5A04\u661F\u533A",
            v: "431302"
          },
          {
            l: "\u53CC\u5CF0\u53BF",
            v: "431321"
          },
          {
            l: "\u65B0\u5316\u53BF",
            v: "431322"
          },
          {
            l: "\u51B7\u6C34\u6C5F\u5E02",
            v: "431381"
          },
          {
            l: "\u6D9F\u6E90\u5E02",
            v: "431382"
          }
        ],
        l: "\u5A04\u5E95\u5E02",
        v: "431300"
      },
      {
        c: [
          {
            l: "\u5409\u9996\u5E02",
            v: "433101"
          },
          {
            l: "\u6CF8\u6EAA\u53BF",
            v: "433122"
          },
          {
            l: "\u51E4\u51F0\u53BF",
            v: "433123"
          },
          {
            l: "\u82B1\u57A3\u53BF",
            v: "433124"
          },
          {
            l: "\u4FDD\u9756\u53BF",
            v: "433125"
          },
          {
            l: "\u53E4\u4E08\u53BF",
            v: "433126"
          },
          {
            l: "\u6C38\u987A\u53BF",
            v: "433127"
          },
          {
            l: "\u9F99\u5C71\u53BF",
            v: "433130"
          }
        ],
        l: "\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
        v: "433100"
      }
    ],
    l: "\u6E56\u5357\u7701",
    v: "430000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u8354\u6E7E\u533A",
            v: "440103"
          },
          {
            l: "\u8D8A\u79C0\u533A",
            v: "440104"
          },
          {
            l: "\u6D77\u73E0\u533A",
            v: "440105"
          },
          {
            l: "\u5929\u6CB3\u533A",
            v: "440106"
          },
          {
            l: "\u767D\u4E91\u533A",
            v: "440111"
          },
          {
            l: "\u9EC4\u57D4\u533A",
            v: "440112"
          },
          {
            l: "\u756A\u79BA\u533A",
            v: "440113"
          },
          {
            l: "\u82B1\u90FD\u533A",
            v: "440114"
          },
          {
            l: "\u5357\u6C99\u533A",
            v: "440115"
          },
          {
            l: "\u4ECE\u5316\u533A",
            v: "440117"
          },
          {
            l: "\u589E\u57CE\u533A",
            v: "440118"
          }
        ],
        l: "\u5E7F\u5DDE\u5E02",
        v: "440100"
      },
      {
        c: [
          {
            l: "\u6B66\u6C5F\u533A",
            v: "440203"
          },
          {
            l: "\u6D48\u6C5F\u533A",
            v: "440204"
          },
          {
            l: "\u66F2\u6C5F\u533A",
            v: "440205"
          },
          {
            l: "\u59CB\u5174\u53BF",
            v: "440222"
          },
          {
            l: "\u4EC1\u5316\u53BF",
            v: "440224"
          },
          {
            l: "\u7FC1\u6E90\u53BF",
            v: "440229"
          },
          {
            l: "\u4E73\u6E90\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "440232"
          },
          {
            l: "\u65B0\u4E30\u53BF",
            v: "440233"
          },
          {
            l: "\u4E50\u660C\u5E02",
            v: "440281"
          },
          {
            l: "\u5357\u96C4\u5E02",
            v: "440282"
          }
        ],
        l: "\u97F6\u5173\u5E02",
        v: "440200"
      },
      {
        c: [
          {
            l: "\u7F57\u6E56\u533A",
            v: "440303"
          },
          {
            l: "\u798F\u7530\u533A",
            v: "440304"
          },
          {
            l: "\u5357\u5C71\u533A",
            v: "440305"
          },
          {
            l: "\u5B9D\u5B89\u533A",
            v: "440306"
          },
          {
            l: "\u9F99\u5C97\u533A",
            v: "440307"
          },
          {
            l: "\u76D0\u7530\u533A",
            v: "440308"
          },
          {
            l: "\u9F99\u534E\u533A",
            v: "440309"
          },
          {
            l: "\u576A\u5C71\u533A",
            v: "440310"
          },
          {
            l: "\u5149\u660E\u533A",
            v: "440311"
          }
        ],
        l: "\u6DF1\u5733\u5E02",
        v: "440300"
      },
      {
        c: [
          {
            l: "\u9999\u6D32\u533A",
            v: "440402"
          },
          {
            l: "\u6597\u95E8\u533A",
            v: "440403"
          },
          {
            l: "\u91D1\u6E7E\u533A",
            v: "440404"
          }
        ],
        l: "\u73E0\u6D77\u5E02",
        v: "440400"
      },
      {
        c: [
          {
            l: "\u9F99\u6E56\u533A",
            v: "440507"
          },
          {
            l: "\u91D1\u5E73\u533A",
            v: "440511"
          },
          {
            l: "\u6FE0\u6C5F\u533A",
            v: "440512"
          },
          {
            l: "\u6F6E\u9633\u533A",
            v: "440513"
          },
          {
            l: "\u6F6E\u5357\u533A",
            v: "440514"
          },
          {
            l: "\u6F84\u6D77\u533A",
            v: "440515"
          },
          {
            l: "\u5357\u6FB3\u53BF",
            v: "440523"
          }
        ],
        l: "\u6C55\u5934\u5E02",
        v: "440500"
      },
      {
        c: [
          {
            l: "\u7985\u57CE\u533A",
            v: "440604"
          },
          {
            l: "\u5357\u6D77\u533A",
            v: "440605"
          },
          {
            l: "\u987A\u5FB7\u533A",
            v: "440606"
          },
          {
            l: "\u4E09\u6C34\u533A",
            v: "440607"
          },
          {
            l: "\u9AD8\u660E\u533A",
            v: "440608"
          }
        ],
        l: "\u4F5B\u5C71\u5E02",
        v: "440600"
      },
      {
        c: [
          {
            l: "\u84EC\u6C5F\u533A",
            v: "440703"
          },
          {
            l: "\u6C5F\u6D77\u533A",
            v: "440704"
          },
          {
            l: "\u65B0\u4F1A\u533A",
            v: "440705"
          },
          {
            l: "\u53F0\u5C71\u5E02",
            v: "440781"
          },
          {
            l: "\u5F00\u5E73\u5E02",
            v: "440783"
          },
          {
            l: "\u9E64\u5C71\u5E02",
            v: "440784"
          },
          {
            l: "\u6069\u5E73\u5E02",
            v: "440785"
          }
        ],
        l: "\u6C5F\u95E8\u5E02",
        v: "440700"
      },
      {
        c: [
          {
            l: "\u8D64\u574E\u533A",
            v: "440802"
          },
          {
            l: "\u971E\u5C71\u533A",
            v: "440803"
          },
          {
            l: "\u5761\u5934\u533A",
            v: "440804"
          },
          {
            l: "\u9EBB\u7AE0\u533A",
            v: "440811"
          },
          {
            l: "\u9042\u6EAA\u53BF",
            v: "440823"
          },
          {
            l: "\u5F90\u95FB\u53BF",
            v: "440825"
          },
          {
            l: "\u5EC9\u6C5F\u5E02",
            v: "440881"
          },
          {
            l: "\u96F7\u5DDE\u5E02",
            v: "440882"
          },
          {
            l: "\u5434\u5DDD\u5E02",
            v: "440883"
          }
        ],
        l: "\u6E5B\u6C5F\u5E02",
        v: "440800"
      },
      {
        c: [
          {
            l: "\u8302\u5357\u533A",
            v: "440902"
          },
          {
            l: "\u7535\u767D\u533A",
            v: "440904"
          },
          {
            l: "\u9AD8\u5DDE\u5E02",
            v: "440981"
          },
          {
            l: "\u5316\u5DDE\u5E02",
            v: "440982"
          },
          {
            l: "\u4FE1\u5B9C\u5E02",
            v: "440983"
          }
        ],
        l: "\u8302\u540D\u5E02",
        v: "440900"
      },
      {
        c: [
          {
            l: "\u7AEF\u5DDE\u533A",
            v: "441202"
          },
          {
            l: "\u9F0E\u6E56\u533A",
            v: "441203"
          },
          {
            l: "\u9AD8\u8981\u533A",
            v: "441204"
          },
          {
            l: "\u5E7F\u5B81\u53BF",
            v: "441223"
          },
          {
            l: "\u6000\u96C6\u53BF",
            v: "441224"
          },
          {
            l: "\u5C01\u5F00\u53BF",
            v: "441225"
          },
          {
            l: "\u5FB7\u5E86\u53BF",
            v: "441226"
          },
          {
            l: "\u56DB\u4F1A\u5E02",
            v: "441284"
          }
        ],
        l: "\u8087\u5E86\u5E02",
        v: "441200"
      },
      {
        c: [
          {
            l: "\u60E0\u57CE\u533A",
            v: "441302"
          },
          {
            l: "\u60E0\u9633\u533A",
            v: "441303"
          },
          {
            l: "\u535A\u7F57\u53BF",
            v: "441322"
          },
          {
            l: "\u60E0\u4E1C\u53BF",
            v: "441323"
          },
          {
            l: "\u9F99\u95E8\u53BF",
            v: "441324"
          }
        ],
        l: "\u60E0\u5DDE\u5E02",
        v: "441300"
      },
      {
        c: [
          {
            l: "\u6885\u6C5F\u533A",
            v: "441402"
          },
          {
            l: "\u6885\u53BF\u533A",
            v: "441403"
          },
          {
            l: "\u5927\u57D4\u53BF",
            v: "441422"
          },
          {
            l: "\u4E30\u987A\u53BF",
            v: "441423"
          },
          {
            l: "\u4E94\u534E\u53BF",
            v: "441424"
          },
          {
            l: "\u5E73\u8FDC\u53BF",
            v: "441426"
          },
          {
            l: "\u8549\u5CAD\u53BF",
            v: "441427"
          },
          {
            l: "\u5174\u5B81\u5E02",
            v: "441481"
          }
        ],
        l: "\u6885\u5DDE\u5E02",
        v: "441400"
      },
      {
        c: [
          {
            l: "\u57CE\u533A",
            v: "441502"
          },
          {
            l: "\u6D77\u4E30\u53BF",
            v: "441521"
          },
          {
            l: "\u9646\u6CB3\u53BF",
            v: "441523"
          },
          {
            l: "\u9646\u4E30\u5E02",
            v: "441581"
          }
        ],
        l: "\u6C55\u5C3E\u5E02",
        v: "441500"
      },
      {
        c: [
          {
            l: "\u6E90\u57CE\u533A",
            v: "441602"
          },
          {
            l: "\u7D2B\u91D1\u53BF",
            v: "441621"
          },
          {
            l: "\u9F99\u5DDD\u53BF",
            v: "441622"
          },
          {
            l: "\u8FDE\u5E73\u53BF",
            v: "441623"
          },
          {
            l: "\u548C\u5E73\u53BF",
            v: "441624"
          },
          {
            l: "\u4E1C\u6E90\u53BF",
            v: "441625"
          }
        ],
        l: "\u6CB3\u6E90\u5E02",
        v: "441600"
      },
      {
        c: [
          {
            l: "\u6C5F\u57CE\u533A",
            v: "441702"
          },
          {
            l: "\u9633\u4E1C\u533A",
            v: "441704"
          },
          {
            l: "\u9633\u897F\u53BF",
            v: "441721"
          },
          {
            l: "\u9633\u6625\u5E02",
            v: "441781"
          }
        ],
        l: "\u9633\u6C5F\u5E02",
        v: "441700"
      },
      {
        c: [
          {
            l: "\u6E05\u57CE\u533A",
            v: "441802"
          },
          {
            l: "\u6E05\u65B0\u533A",
            v: "441803"
          },
          {
            l: "\u4F5B\u5188\u53BF",
            v: "441821"
          },
          {
            l: "\u9633\u5C71\u53BF",
            v: "441823"
          },
          {
            l: "\u8FDE\u5C71\u58EE\u65CF\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "441825"
          },
          {
            l: "\u8FDE\u5357\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "441826"
          },
          {
            l: "\u82F1\u5FB7\u5E02",
            v: "441881"
          },
          {
            l: "\u8FDE\u5DDE\u5E02",
            v: "441882"
          }
        ],
        l: "\u6E05\u8FDC\u5E02",
        v: "441800"
      },
      {
        l: "\u4E1C\u839E\u5E02",
        v: "441900"
      },
      {
        l: "\u4E2D\u5C71\u5E02",
        v: "442000"
      },
      {
        c: [
          {
            l: "\u6E58\u6865\u533A",
            v: "445102"
          },
          {
            l: "\u6F6E\u5B89\u533A",
            v: "445103"
          },
          {
            l: "\u9976\u5E73\u53BF",
            v: "445122"
          }
        ],
        l: "\u6F6E\u5DDE\u5E02",
        v: "445100"
      },
      {
        c: [
          {
            l: "\u6995\u57CE\u533A",
            v: "445202"
          },
          {
            l: "\u63ED\u4E1C\u533A",
            v: "445203"
          },
          {
            l: "\u63ED\u897F\u53BF",
            v: "445222"
          },
          {
            l: "\u60E0\u6765\u53BF",
            v: "445224"
          },
          {
            l: "\u666E\u5B81\u5E02",
            v: "445281"
          }
        ],
        l: "\u63ED\u9633\u5E02",
        v: "445200"
      },
      {
        c: [
          {
            l: "\u4E91\u57CE\u533A",
            v: "445302"
          },
          {
            l: "\u4E91\u5B89\u533A",
            v: "445303"
          },
          {
            l: "\u65B0\u5174\u53BF",
            v: "445321"
          },
          {
            l: "\u90C1\u5357\u53BF",
            v: "445322"
          },
          {
            l: "\u7F57\u5B9A\u5E02",
            v: "445381"
          }
        ],
        l: "\u4E91\u6D6E\u5E02",
        v: "445300"
      }
    ],
    l: "\u5E7F\u4E1C\u7701",
    v: "440000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5174\u5B81\u533A",
            v: "450102"
          },
          {
            l: "\u9752\u79C0\u533A",
            v: "450103"
          },
          {
            l: "\u6C5F\u5357\u533A",
            v: "450105"
          },
          {
            l: "\u897F\u4E61\u5858\u533A",
            v: "450107"
          },
          {
            l: "\u826F\u5E86\u533A",
            v: "450108"
          },
          {
            l: "\u9095\u5B81\u533A",
            v: "450109"
          },
          {
            l: "\u6B66\u9E23\u533A",
            v: "450110"
          },
          {
            l: "\u9686\u5B89\u53BF",
            v: "450123"
          },
          {
            l: "\u9A6C\u5C71\u53BF",
            v: "450124"
          },
          {
            l: "\u4E0A\u6797\u53BF",
            v: "450125"
          },
          {
            l: "\u5BBE\u9633\u53BF",
            v: "450126"
          },
          {
            l: "\u6A2A\u53BF",
            v: "450127"
          }
        ],
        l: "\u5357\u5B81\u5E02",
        v: "450100"
      },
      {
        c: [
          {
            l: "\u57CE\u4E2D\u533A",
            v: "450202"
          },
          {
            l: "\u9C7C\u5CF0\u533A",
            v: "450203"
          },
          {
            l: "\u67F3\u5357\u533A",
            v: "450204"
          },
          {
            l: "\u67F3\u5317\u533A",
            v: "450205"
          },
          {
            l: "\u67F3\u6C5F\u533A",
            v: "450206"
          },
          {
            l: "\u67F3\u57CE\u53BF",
            v: "450222"
          },
          {
            l: "\u9E7F\u5BE8\u53BF",
            v: "450223"
          },
          {
            l: "\u878D\u5B89\u53BF",
            v: "450224"
          },
          {
            l: "\u878D\u6C34\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "450225"
          },
          {
            l: "\u4E09\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF",
            v: "450226"
          }
        ],
        l: "\u67F3\u5DDE\u5E02",
        v: "450200"
      },
      {
        c: [
          {
            l: "\u79C0\u5CF0\u533A",
            v: "450302"
          },
          {
            l: "\u53E0\u5F69\u533A",
            v: "450303"
          },
          {
            l: "\u8C61\u5C71\u533A",
            v: "450304"
          },
          {
            l: "\u4E03\u661F\u533A",
            v: "450305"
          },
          {
            l: "\u96C1\u5C71\u533A",
            v: "450311"
          },
          {
            l: "\u4E34\u6842\u533A",
            v: "450312"
          },
          {
            l: "\u9633\u6714\u53BF",
            v: "450321"
          },
          {
            l: "\u7075\u5DDD\u53BF",
            v: "450323"
          },
          {
            l: "\u5168\u5DDE\u53BF",
            v: "450324"
          },
          {
            l: "\u5174\u5B89\u53BF",
            v: "450325"
          },
          {
            l: "\u6C38\u798F\u53BF",
            v: "450326"
          },
          {
            l: "\u704C\u9633\u53BF",
            v: "450327"
          },
          {
            l: "\u9F99\u80DC\u5404\u65CF\u81EA\u6CBB\u53BF",
            v: "450328"
          },
          {
            l: "\u8D44\u6E90\u53BF",
            v: "450329"
          },
          {
            l: "\u5E73\u4E50\u53BF",
            v: "450330"
          },
          {
            l: "\u606D\u57CE\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "450332"
          },
          {
            l: "\u8354\u6D66\u5E02",
            v: "450381"
          }
        ],
        l: "\u6842\u6797\u5E02",
        v: "450300"
      },
      {
        c: [
          {
            l: "\u4E07\u79C0\u533A",
            v: "450403"
          },
          {
            l: "\u957F\u6D32\u533A",
            v: "450405"
          },
          {
            l: "\u9F99\u5729\u533A",
            v: "450406"
          },
          {
            l: "\u82CD\u68A7\u53BF",
            v: "450421"
          },
          {
            l: "\u85E4\u53BF",
            v: "450422"
          },
          {
            l: "\u8499\u5C71\u53BF",
            v: "450423"
          },
          {
            l: "\u5C91\u6EAA\u5E02",
            v: "450481"
          }
        ],
        l: "\u68A7\u5DDE\u5E02",
        v: "450400"
      },
      {
        c: [
          {
            l: "\u6D77\u57CE\u533A",
            v: "450502"
          },
          {
            l: "\u94F6\u6D77\u533A",
            v: "450503"
          },
          {
            l: "\u94C1\u5C71\u6E2F\u533A",
            v: "450512"
          },
          {
            l: "\u5408\u6D66\u53BF",
            v: "450521"
          }
        ],
        l: "\u5317\u6D77\u5E02",
        v: "450500"
      },
      {
        c: [
          {
            l: "\u6E2F\u53E3\u533A",
            v: "450602"
          },
          {
            l: "\u9632\u57CE\u533A",
            v: "450603"
          },
          {
            l: "\u4E0A\u601D\u53BF",
            v: "450621"
          },
          {
            l: "\u4E1C\u5174\u5E02",
            v: "450681"
          }
        ],
        l: "\u9632\u57CE\u6E2F\u5E02",
        v: "450600"
      },
      {
        c: [
          {
            l: "\u94A6\u5357\u533A",
            v: "450702"
          },
          {
            l: "\u94A6\u5317\u533A",
            v: "450703"
          },
          {
            l: "\u7075\u5C71\u53BF",
            v: "450721"
          },
          {
            l: "\u6D66\u5317\u53BF",
            v: "450722"
          }
        ],
        l: "\u94A6\u5DDE\u5E02",
        v: "450700"
      },
      {
        c: [
          {
            l: "\u6E2F\u5317\u533A",
            v: "450802"
          },
          {
            l: "\u6E2F\u5357\u533A",
            v: "450803"
          },
          {
            l: "\u8983\u5858\u533A",
            v: "450804"
          },
          {
            l: "\u5E73\u5357\u53BF",
            v: "450821"
          },
          {
            l: "\u6842\u5E73\u5E02",
            v: "450881"
          }
        ],
        l: "\u8D35\u6E2F\u5E02",
        v: "450800"
      },
      {
        c: [
          {
            l: "\u7389\u5DDE\u533A",
            v: "450902"
          },
          {
            l: "\u798F\u7EF5\u533A",
            v: "450903"
          },
          {
            l: "\u5BB9\u53BF",
            v: "450921"
          },
          {
            l: "\u9646\u5DDD\u53BF",
            v: "450922"
          },
          {
            l: "\u535A\u767D\u53BF",
            v: "450923"
          },
          {
            l: "\u5174\u4E1A\u53BF",
            v: "450924"
          },
          {
            l: "\u5317\u6D41\u5E02",
            v: "450981"
          }
        ],
        l: "\u7389\u6797\u5E02",
        v: "450900"
      },
      {
        c: [
          {
            l: "\u53F3\u6C5F\u533A",
            v: "451002"
          },
          {
            l: "\u7530\u9633\u533A",
            v: "451003"
          },
          {
            l: "\u7530\u4E1C\u53BF",
            v: "451022"
          },
          {
            l: "\u5FB7\u4FDD\u53BF",
            v: "451024"
          },
          {
            l: "\u90A3\u5761\u53BF",
            v: "451026"
          },
          {
            l: "\u51CC\u4E91\u53BF",
            v: "451027"
          },
          {
            l: "\u4E50\u4E1A\u53BF",
            v: "451028"
          },
          {
            l: "\u7530\u6797\u53BF",
            v: "451029"
          },
          {
            l: "\u897F\u6797\u53BF",
            v: "451030"
          },
          {
            l: "\u9686\u6797\u5404\u65CF\u81EA\u6CBB\u53BF",
            v: "451031"
          },
          {
            l: "\u9756\u897F\u5E02",
            v: "451081"
          },
          {
            l: "\u5E73\u679C\u5E02",
            v: "451082"
          }
        ],
        l: "\u767E\u8272\u5E02",
        v: "451000"
      },
      {
        c: [
          {
            l: "\u516B\u6B65\u533A",
            v: "451102"
          },
          {
            l: "\u5E73\u6842\u533A",
            v: "451103"
          },
          {
            l: "\u662D\u5E73\u53BF",
            v: "451121"
          },
          {
            l: "\u949F\u5C71\u53BF",
            v: "451122"
          },
          {
            l: "\u5BCC\u5DDD\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "451123"
          }
        ],
        l: "\u8D3A\u5DDE\u5E02",
        v: "451100"
      },
      {
        c: [
          {
            l: "\u91D1\u57CE\u6C5F\u533A",
            v: "451202"
          },
          {
            l: "\u5B9C\u5DDE\u533A",
            v: "451203"
          },
          {
            l: "\u5357\u4E39\u53BF",
            v: "451221"
          },
          {
            l: "\u5929\u5CE8\u53BF",
            v: "451222"
          },
          {
            l: "\u51E4\u5C71\u53BF",
            v: "451223"
          },
          {
            l: "\u4E1C\u5170\u53BF",
            v: "451224"
          },
          {
            l: "\u7F57\u57CE\u4EEB\u4F6C\u65CF\u81EA\u6CBB\u53BF",
            v: "451225"
          },
          {
            l: "\u73AF\u6C5F\u6BDB\u5357\u65CF\u81EA\u6CBB\u53BF",
            v: "451226"
          },
          {
            l: "\u5DF4\u9A6C\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "451227"
          },
          {
            l: "\u90FD\u5B89\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "451228"
          },
          {
            l: "\u5927\u5316\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "451229"
          }
        ],
        l: "\u6CB3\u6C60\u5E02",
        v: "451200"
      },
      {
        c: [
          {
            l: "\u5174\u5BBE\u533A",
            v: "451302"
          },
          {
            l: "\u5FFB\u57CE\u53BF",
            v: "451321"
          },
          {
            l: "\u8C61\u5DDE\u53BF",
            v: "451322"
          },
          {
            l: "\u6B66\u5BA3\u53BF",
            v: "451323"
          },
          {
            l: "\u91D1\u79C0\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "451324"
          },
          {
            l: "\u5408\u5C71\u5E02",
            v: "451381"
          }
        ],
        l: "\u6765\u5BBE\u5E02",
        v: "451300"
      },
      {
        c: [
          {
            l: "\u6C5F\u5DDE\u533A",
            v: "451402"
          },
          {
            l: "\u6276\u7EE5\u53BF",
            v: "451421"
          },
          {
            l: "\u5B81\u660E\u53BF",
            v: "451422"
          },
          {
            l: "\u9F99\u5DDE\u53BF",
            v: "451423"
          },
          {
            l: "\u5927\u65B0\u53BF",
            v: "451424"
          },
          {
            l: "\u5929\u7B49\u53BF",
            v: "451425"
          },
          {
            l: "\u51ED\u7965\u5E02",
            v: "451481"
          }
        ],
        l: "\u5D07\u5DE6\u5E02",
        v: "451400"
      }
    ],
    l: "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A",
    v: "450000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u79C0\u82F1\u533A",
            v: "460105"
          },
          {
            l: "\u9F99\u534E\u533A",
            v: "460106"
          },
          {
            l: "\u743C\u5C71\u533A",
            v: "460107"
          },
          {
            l: "\u7F8E\u5170\u533A",
            v: "460108"
          }
        ],
        l: "\u6D77\u53E3\u5E02",
        v: "460100"
      },
      {
        c: [
          {
            l: "\u6D77\u68E0\u533A",
            v: "460202"
          },
          {
            l: "\u5409\u9633\u533A",
            v: "460203"
          },
          {
            l: "\u5929\u6DAF\u533A",
            v: "460204"
          },
          {
            l: "\u5D16\u5DDE\u533A",
            v: "460205"
          }
        ],
        l: "\u4E09\u4E9A\u5E02",
        v: "460200"
      },
      {
        c: [
          {
            l: "\u897F\u6C99\u7FA4\u5C9B",
            v: "460321"
          },
          {
            l: "\u5357\u6C99\u7FA4\u5C9B",
            v: "460322"
          },
          {
            l: "\u4E2D\u6C99\u7FA4\u5C9B\u7684\u5C9B\u7901\u53CA\u5176\u6D77\u57DF",
            v: "460323"
          }
        ],
        l: "\u4E09\u6C99\u5E02",
        v: "460300"
      },
      {
        l: "\u510B\u5DDE\u5E02",
        v: "460400"
      },
      {
        c: [
          {
            l: "\u4E94\u6307\u5C71\u5E02",
            v: "469001"
          },
          {
            l: "\u743C\u6D77\u5E02",
            v: "469002"
          },
          {
            l: "\u6587\u660C\u5E02",
            v: "469005"
          },
          {
            l: "\u4E07\u5B81\u5E02",
            v: "469006"
          },
          {
            l: "\u4E1C\u65B9\u5E02",
            v: "469007"
          },
          {
            l: "\u5B9A\u5B89\u53BF",
            v: "469021"
          },
          {
            l: "\u5C6F\u660C\u53BF",
            v: "469022"
          },
          {
            l: "\u6F84\u8FC8\u53BF",
            v: "469023"
          },
          {
            l: "\u4E34\u9AD8\u53BF",
            v: "469024"
          },
          {
            l: "\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF",
            v: "469025"
          },
          {
            l: "\u660C\u6C5F\u9ECE\u65CF\u81EA\u6CBB\u53BF",
            v: "469026"
          },
          {
            l: "\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF",
            v: "469027"
          },
          {
            l: "\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF",
            v: "469028"
          },
          {
            l: "\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "469029"
          },
          {
            l: "\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "469030"
          }
        ],
        l: "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212",
        v: "469000"
      }
    ],
    l: "\u6D77\u5357\u7701",
    v: "460000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u4E07\u5DDE\u533A",
            v: "500101"
          },
          {
            l: "\u6DAA\u9675\u533A",
            v: "500102"
          },
          {
            l: "\u6E1D\u4E2D\u533A",
            v: "500103"
          },
          {
            l: "\u5927\u6E21\u53E3\u533A",
            v: "500104"
          },
          {
            l: "\u6C5F\u5317\u533A",
            v: "500105"
          },
          {
            l: "\u6C99\u576A\u575D\u533A",
            v: "500106"
          },
          {
            l: "\u4E5D\u9F99\u5761\u533A",
            v: "500107"
          },
          {
            l: "\u5357\u5CB8\u533A",
            v: "500108"
          },
          {
            l: "\u5317\u789A\u533A",
            v: "500109"
          },
          {
            l: "\u7DA6\u6C5F\u533A",
            v: "500110"
          },
          {
            l: "\u5927\u8DB3\u533A",
            v: "500111"
          },
          {
            l: "\u6E1D\u5317\u533A",
            v: "500112"
          },
          {
            l: "\u5DF4\u5357\u533A",
            v: "500113"
          },
          {
            l: "\u9ED4\u6C5F\u533A",
            v: "500114"
          },
          {
            l: "\u957F\u5BFF\u533A",
            v: "500115"
          },
          {
            l: "\u6C5F\u6D25\u533A",
            v: "500116"
          },
          {
            l: "\u5408\u5DDD\u533A",
            v: "500117"
          },
          {
            l: "\u6C38\u5DDD\u533A",
            v: "500118"
          },
          {
            l: "\u5357\u5DDD\u533A",
            v: "500119"
          },
          {
            l: "\u74A7\u5C71\u533A",
            v: "500120"
          },
          {
            l: "\u94DC\u6881\u533A",
            v: "500151"
          },
          {
            l: "\u6F7C\u5357\u533A",
            v: "500152"
          },
          {
            l: "\u8363\u660C\u533A",
            v: "500153"
          },
          {
            l: "\u5F00\u5DDE\u533A",
            v: "500154"
          },
          {
            l: "\u6881\u5E73\u533A",
            v: "500155"
          },
          {
            l: "\u6B66\u9686\u533A",
            v: "500156"
          }
        ],
        l: "\u5E02\u8F96\u533A",
        v: "500100"
      },
      {
        c: [
          {
            l: "\u57CE\u53E3\u53BF",
            v: "500229"
          },
          {
            l: "\u4E30\u90FD\u53BF",
            v: "500230"
          },
          {
            l: "\u57AB\u6C5F\u53BF",
            v: "500231"
          },
          {
            l: "\u5FE0\u53BF",
            v: "500233"
          },
          {
            l: "\u4E91\u9633\u53BF",
            v: "500235"
          },
          {
            l: "\u5949\u8282\u53BF",
            v: "500236"
          },
          {
            l: "\u5DEB\u5C71\u53BF",
            v: "500237"
          },
          {
            l: "\u5DEB\u6EAA\u53BF",
            v: "500238"
          },
          {
            l: "\u77F3\u67F1\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
            v: "500240"
          },
          {
            l: "\u79C0\u5C71\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "500241"
          },
          {
            l: "\u9149\u9633\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "500242"
          },
          {
            l: "\u5F6D\u6C34\u82D7\u65CF\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
            v: "500243"
          }
        ],
        l: "\u53BF",
        v: "500200"
      }
    ],
    l: "\u91CD\u5E86\u5E02",
    v: "500000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u9526\u6C5F\u533A",
            v: "510104"
          },
          {
            l: "\u9752\u7F8A\u533A",
            v: "510105"
          },
          {
            l: "\u91D1\u725B\u533A",
            v: "510106"
          },
          {
            l: "\u6B66\u4FAF\u533A",
            v: "510107"
          },
          {
            l: "\u6210\u534E\u533A",
            v: "510108"
          },
          {
            l: "\u9F99\u6CC9\u9A7F\u533A",
            v: "510112"
          },
          {
            l: "\u9752\u767D\u6C5F\u533A",
            v: "510113"
          },
          {
            l: "\u65B0\u90FD\u533A",
            v: "510114"
          },
          {
            l: "\u6E29\u6C5F\u533A",
            v: "510115"
          },
          {
            l: "\u53CC\u6D41\u533A",
            v: "510116"
          },
          {
            l: "\u90EB\u90FD\u533A",
            v: "510117"
          },
          {
            l: "\u65B0\u6D25\u533A",
            v: "510118"
          },
          {
            l: "\u91D1\u5802\u53BF",
            v: "510121"
          },
          {
            l: "\u5927\u9091\u53BF",
            v: "510129"
          },
          {
            l: "\u84B2\u6C5F\u53BF",
            v: "510131"
          },
          {
            l: "\u90FD\u6C5F\u5830\u5E02",
            v: "510181"
          },
          {
            l: "\u5F6D\u5DDE\u5E02",
            v: "510182"
          },
          {
            l: "\u909B\u5D03\u5E02",
            v: "510183"
          },
          {
            l: "\u5D07\u5DDE\u5E02",
            v: "510184"
          },
          {
            l: "\u7B80\u9633\u5E02",
            v: "510185"
          }
        ],
        l: "\u6210\u90FD\u5E02",
        v: "510100"
      },
      {
        c: [
          {
            l: "\u81EA\u6D41\u4E95\u533A",
            v: "510302"
          },
          {
            l: "\u8D21\u4E95\u533A",
            v: "510303"
          },
          {
            l: "\u5927\u5B89\u533A",
            v: "510304"
          },
          {
            l: "\u6CBF\u6EE9\u533A",
            v: "510311"
          },
          {
            l: "\u8363\u53BF",
            v: "510321"
          },
          {
            l: "\u5BCC\u987A\u53BF",
            v: "510322"
          }
        ],
        l: "\u81EA\u8D21\u5E02",
        v: "510300"
      },
      {
        c: [
          {
            l: "\u4E1C\u533A",
            v: "510402"
          },
          {
            l: "\u897F\u533A",
            v: "510403"
          },
          {
            l: "\u4EC1\u548C\u533A",
            v: "510411"
          },
          {
            l: "\u7C73\u6613\u53BF",
            v: "510421"
          },
          {
            l: "\u76D0\u8FB9\u53BF",
            v: "510422"
          }
        ],
        l: "\u6500\u679D\u82B1\u5E02",
        v: "510400"
      },
      {
        c: [
          {
            l: "\u6C5F\u9633\u533A",
            v: "510502"
          },
          {
            l: "\u7EB3\u6EAA\u533A",
            v: "510503"
          },
          {
            l: "\u9F99\u9A6C\u6F6D\u533A",
            v: "510504"
          },
          {
            l: "\u6CF8\u53BF",
            v: "510521"
          },
          {
            l: "\u5408\u6C5F\u53BF",
            v: "510522"
          },
          {
            l: "\u53D9\u6C38\u53BF",
            v: "510524"
          },
          {
            l: "\u53E4\u853A\u53BF",
            v: "510525"
          }
        ],
        l: "\u6CF8\u5DDE\u5E02",
        v: "510500"
      },
      {
        c: [
          {
            l: "\u65CC\u9633\u533A",
            v: "510603"
          },
          {
            l: "\u7F57\u6C5F\u533A",
            v: "510604"
          },
          {
            l: "\u4E2D\u6C5F\u53BF",
            v: "510623"
          },
          {
            l: "\u5E7F\u6C49\u5E02",
            v: "510681"
          },
          {
            l: "\u4EC0\u90A1\u5E02",
            v: "510682"
          },
          {
            l: "\u7EF5\u7AF9\u5E02",
            v: "510683"
          }
        ],
        l: "\u5FB7\u9633\u5E02",
        v: "510600"
      },
      {
        c: [
          {
            l: "\u6DAA\u57CE\u533A",
            v: "510703"
          },
          {
            l: "\u6E38\u4ED9\u533A",
            v: "510704"
          },
          {
            l: "\u5B89\u5DDE\u533A",
            v: "510705"
          },
          {
            l: "\u4E09\u53F0\u53BF",
            v: "510722"
          },
          {
            l: "\u76D0\u4EAD\u53BF",
            v: "510723"
          },
          {
            l: "\u6893\u6F7C\u53BF",
            v: "510725"
          },
          {
            l: "\u5317\u5DDD\u7F8C\u65CF\u81EA\u6CBB\u53BF",
            v: "510726"
          },
          {
            l: "\u5E73\u6B66\u53BF",
            v: "510727"
          },
          {
            l: "\u6C5F\u6CB9\u5E02",
            v: "510781"
          }
        ],
        l: "\u7EF5\u9633\u5E02",
        v: "510700"
      },
      {
        c: [
          {
            l: "\u5229\u5DDE\u533A",
            v: "510802"
          },
          {
            l: "\u662D\u5316\u533A",
            v: "510811"
          },
          {
            l: "\u671D\u5929\u533A",
            v: "510812"
          },
          {
            l: "\u65FA\u82CD\u53BF",
            v: "510821"
          },
          {
            l: "\u9752\u5DDD\u53BF",
            v: "510822"
          },
          {
            l: "\u5251\u9601\u53BF",
            v: "510823"
          },
          {
            l: "\u82CD\u6EAA\u53BF",
            v: "510824"
          }
        ],
        l: "\u5E7F\u5143\u5E02",
        v: "510800"
      },
      {
        c: [
          {
            l: "\u8239\u5C71\u533A",
            v: "510903"
          },
          {
            l: "\u5B89\u5C45\u533A",
            v: "510904"
          },
          {
            l: "\u84EC\u6EAA\u53BF",
            v: "510921"
          },
          {
            l: "\u5927\u82F1\u53BF",
            v: "510923"
          },
          {
            l: "\u5C04\u6D2A\u5E02",
            v: "510981"
          }
        ],
        l: "\u9042\u5B81\u5E02",
        v: "510900"
      },
      {
        c: [
          {
            l: "\u5E02\u4E2D\u533A",
            v: "511002"
          },
          {
            l: "\u4E1C\u5174\u533A",
            v: "511011"
          },
          {
            l: "\u5A01\u8FDC\u53BF",
            v: "511024"
          },
          {
            l: "\u8D44\u4E2D\u53BF",
            v: "511025"
          },
          {
            l: "\u5185\u6C5F\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "511071"
          },
          {
            l: "\u9686\u660C\u5E02",
            v: "511083"
          }
        ],
        l: "\u5185\u6C5F\u5E02",
        v: "511000"
      },
      {
        c: [
          {
            l: "\u5E02\u4E2D\u533A",
            v: "511102"
          },
          {
            l: "\u6C99\u6E7E\u533A",
            v: "511111"
          },
          {
            l: "\u4E94\u901A\u6865\u533A",
            v: "511112"
          },
          {
            l: "\u91D1\u53E3\u6CB3\u533A",
            v: "511113"
          },
          {
            l: "\u728D\u4E3A\u53BF",
            v: "511123"
          },
          {
            l: "\u4E95\u7814\u53BF",
            v: "511124"
          },
          {
            l: "\u5939\u6C5F\u53BF",
            v: "511126"
          },
          {
            l: "\u6C90\u5DDD\u53BF",
            v: "511129"
          },
          {
            l: "\u5CE8\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "511132"
          },
          {
            l: "\u9A6C\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "511133"
          },
          {
            l: "\u5CE8\u7709\u5C71\u5E02",
            v: "511181"
          }
        ],
        l: "\u4E50\u5C71\u5E02",
        v: "511100"
      },
      {
        c: [
          {
            l: "\u987A\u5E86\u533A",
            v: "511302"
          },
          {
            l: "\u9AD8\u576A\u533A",
            v: "511303"
          },
          {
            l: "\u5609\u9675\u533A",
            v: "511304"
          },
          {
            l: "\u5357\u90E8\u53BF",
            v: "511321"
          },
          {
            l: "\u8425\u5C71\u53BF",
            v: "511322"
          },
          {
            l: "\u84EC\u5B89\u53BF",
            v: "511323"
          },
          {
            l: "\u4EEA\u9647\u53BF",
            v: "511324"
          },
          {
            l: "\u897F\u5145\u53BF",
            v: "511325"
          },
          {
            l: "\u9606\u4E2D\u5E02",
            v: "511381"
          }
        ],
        l: "\u5357\u5145\u5E02",
        v: "511300"
      },
      {
        c: [
          {
            l: "\u4E1C\u5761\u533A",
            v: "511402"
          },
          {
            l: "\u5F6D\u5C71\u533A",
            v: "511403"
          },
          {
            l: "\u4EC1\u5BFF\u53BF",
            v: "511421"
          },
          {
            l: "\u6D2A\u96C5\u53BF",
            v: "511423"
          },
          {
            l: "\u4E39\u68F1\u53BF",
            v: "511424"
          },
          {
            l: "\u9752\u795E\u53BF",
            v: "511425"
          }
        ],
        l: "\u7709\u5C71\u5E02",
        v: "511400"
      },
      {
        c: [
          {
            l: "\u7FE0\u5C4F\u533A",
            v: "511502"
          },
          {
            l: "\u5357\u6EAA\u533A",
            v: "511503"
          },
          {
            l: "\u53D9\u5DDE\u533A",
            v: "511504"
          },
          {
            l: "\u6C5F\u5B89\u53BF",
            v: "511523"
          },
          {
            l: "\u957F\u5B81\u53BF",
            v: "511524"
          },
          {
            l: "\u9AD8\u53BF",
            v: "511525"
          },
          {
            l: "\u73D9\u53BF",
            v: "511526"
          },
          {
            l: "\u7B60\u8FDE\u53BF",
            v: "511527"
          },
          {
            l: "\u5174\u6587\u53BF",
            v: "511528"
          },
          {
            l: "\u5C4F\u5C71\u53BF",
            v: "511529"
          }
        ],
        l: "\u5B9C\u5BBE\u5E02",
        v: "511500"
      },
      {
        c: [
          {
            l: "\u5E7F\u5B89\u533A",
            v: "511602"
          },
          {
            l: "\u524D\u950B\u533A",
            v: "511603"
          },
          {
            l: "\u5CB3\u6C60\u53BF",
            v: "511621"
          },
          {
            l: "\u6B66\u80DC\u53BF",
            v: "511622"
          },
          {
            l: "\u90BB\u6C34\u53BF",
            v: "511623"
          },
          {
            l: "\u534E\u84E5\u5E02",
            v: "511681"
          }
        ],
        l: "\u5E7F\u5B89\u5E02",
        v: "511600"
      },
      {
        c: [
          {
            l: "\u901A\u5DDD\u533A",
            v: "511702"
          },
          {
            l: "\u8FBE\u5DDD\u533A",
            v: "511703"
          },
          {
            l: "\u5BA3\u6C49\u53BF",
            v: "511722"
          },
          {
            l: "\u5F00\u6C5F\u53BF",
            v: "511723"
          },
          {
            l: "\u5927\u7AF9\u53BF",
            v: "511724"
          },
          {
            l: "\u6E20\u53BF",
            v: "511725"
          },
          {
            l: "\u8FBE\u5DDE\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "511771"
          },
          {
            l: "\u4E07\u6E90\u5E02",
            v: "511781"
          }
        ],
        l: "\u8FBE\u5DDE\u5E02",
        v: "511700"
      },
      {
        c: [
          {
            l: "\u96E8\u57CE\u533A",
            v: "511802"
          },
          {
            l: "\u540D\u5C71\u533A",
            v: "511803"
          },
          {
            l: "\u8365\u7ECF\u53BF",
            v: "511822"
          },
          {
            l: "\u6C49\u6E90\u53BF",
            v: "511823"
          },
          {
            l: "\u77F3\u68C9\u53BF",
            v: "511824"
          },
          {
            l: "\u5929\u5168\u53BF",
            v: "511825"
          },
          {
            l: "\u82A6\u5C71\u53BF",
            v: "511826"
          },
          {
            l: "\u5B9D\u5174\u53BF",
            v: "511827"
          }
        ],
        l: "\u96C5\u5B89\u5E02",
        v: "511800"
      },
      {
        c: [
          {
            l: "\u5DF4\u5DDE\u533A",
            v: "511902"
          },
          {
            l: "\u6069\u9633\u533A",
            v: "511903"
          },
          {
            l: "\u901A\u6C5F\u53BF",
            v: "511921"
          },
          {
            l: "\u5357\u6C5F\u53BF",
            v: "511922"
          },
          {
            l: "\u5E73\u660C\u53BF",
            v: "511923"
          },
          {
            l: "\u5DF4\u4E2D\u7ECF\u6D4E\u5F00\u53D1\u533A",
            v: "511971"
          }
        ],
        l: "\u5DF4\u4E2D\u5E02",
        v: "511900"
      },
      {
        c: [
          {
            l: "\u96C1\u6C5F\u533A",
            v: "512002"
          },
          {
            l: "\u5B89\u5CB3\u53BF",
            v: "512021"
          },
          {
            l: "\u4E50\u81F3\u53BF",
            v: "512022"
          }
        ],
        l: "\u8D44\u9633\u5E02",
        v: "512000"
      },
      {
        c: [
          {
            l: "\u9A6C\u5C14\u5EB7\u5E02",
            v: "513201"
          },
          {
            l: "\u6C76\u5DDD\u53BF",
            v: "513221"
          },
          {
            l: "\u7406\u53BF",
            v: "513222"
          },
          {
            l: "\u8302\u53BF",
            v: "513223"
          },
          {
            l: "\u677E\u6F58\u53BF",
            v: "513224"
          },
          {
            l: "\u4E5D\u5BE8\u6C9F\u53BF",
            v: "513225"
          },
          {
            l: "\u91D1\u5DDD\u53BF",
            v: "513226"
          },
          {
            l: "\u5C0F\u91D1\u53BF",
            v: "513227"
          },
          {
            l: "\u9ED1\u6C34\u53BF",
            v: "513228"
          },
          {
            l: "\u58E4\u5858\u53BF",
            v: "513230"
          },
          {
            l: "\u963F\u575D\u53BF",
            v: "513231"
          },
          {
            l: "\u82E5\u5C14\u76D6\u53BF",
            v: "513232"
          },
          {
            l: "\u7EA2\u539F\u53BF",
            v: "513233"
          }
        ],
        l: "\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE",
        v: "513200"
      },
      {
        c: [
          {
            l: "\u5EB7\u5B9A\u5E02",
            v: "513301"
          },
          {
            l: "\u6CF8\u5B9A\u53BF",
            v: "513322"
          },
          {
            l: "\u4E39\u5DF4\u53BF",
            v: "513323"
          },
          {
            l: "\u4E5D\u9F99\u53BF",
            v: "513324"
          },
          {
            l: "\u96C5\u6C5F\u53BF",
            v: "513325"
          },
          {
            l: "\u9053\u5B5A\u53BF",
            v: "513326"
          },
          {
            l: "\u7089\u970D\u53BF",
            v: "513327"
          },
          {
            l: "\u7518\u5B5C\u53BF",
            v: "513328"
          },
          {
            l: "\u65B0\u9F99\u53BF",
            v: "513329"
          },
          {
            l: "\u5FB7\u683C\u53BF",
            v: "513330"
          },
          {
            l: "\u767D\u7389\u53BF",
            v: "513331"
          },
          {
            l: "\u77F3\u6E20\u53BF",
            v: "513332"
          },
          {
            l: "\u8272\u8FBE\u53BF",
            v: "513333"
          },
          {
            l: "\u7406\u5858\u53BF",
            v: "513334"
          },
          {
            l: "\u5DF4\u5858\u53BF",
            v: "513335"
          },
          {
            l: "\u4E61\u57CE\u53BF",
            v: "513336"
          },
          {
            l: "\u7A3B\u57CE\u53BF",
            v: "513337"
          },
          {
            l: "\u5F97\u8363\u53BF",
            v: "513338"
          }
        ],
        l: "\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "513300"
      },
      {
        c: [
          {
            l: "\u897F\u660C\u5E02",
            v: "513401"
          },
          {
            l: "\u6728\u91CC\u85CF\u65CF\u81EA\u6CBB\u53BF",
            v: "513422"
          },
          {
            l: "\u76D0\u6E90\u53BF",
            v: "513423"
          },
          {
            l: "\u5FB7\u660C\u53BF",
            v: "513424"
          },
          {
            l: "\u4F1A\u7406\u53BF",
            v: "513425"
          },
          {
            l: "\u4F1A\u4E1C\u53BF",
            v: "513426"
          },
          {
            l: "\u5B81\u5357\u53BF",
            v: "513427"
          },
          {
            l: "\u666E\u683C\u53BF",
            v: "513428"
          },
          {
            l: "\u5E03\u62D6\u53BF",
            v: "513429"
          },
          {
            l: "\u91D1\u9633\u53BF",
            v: "513430"
          },
          {
            l: "\u662D\u89C9\u53BF",
            v: "513431"
          },
          {
            l: "\u559C\u5FB7\u53BF",
            v: "513432"
          },
          {
            l: "\u5195\u5B81\u53BF",
            v: "513433"
          },
          {
            l: "\u8D8A\u897F\u53BF",
            v: "513434"
          },
          {
            l: "\u7518\u6D1B\u53BF",
            v: "513435"
          },
          {
            l: "\u7F8E\u59D1\u53BF",
            v: "513436"
          },
          {
            l: "\u96F7\u6CE2\u53BF",
            v: "513437"
          }
        ],
        l: "\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE",
        v: "513400"
      }
    ],
    l: "\u56DB\u5DDD\u7701",
    v: "510000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5357\u660E\u533A",
            v: "520102"
          },
          {
            l: "\u4E91\u5CA9\u533A",
            v: "520103"
          },
          {
            l: "\u82B1\u6EAA\u533A",
            v: "520111"
          },
          {
            l: "\u4E4C\u5F53\u533A",
            v: "520112"
          },
          {
            l: "\u767D\u4E91\u533A",
            v: "520113"
          },
          {
            l: "\u89C2\u5C71\u6E56\u533A",
            v: "520115"
          },
          {
            l: "\u5F00\u9633\u53BF",
            v: "520121"
          },
          {
            l: "\u606F\u70FD\u53BF",
            v: "520122"
          },
          {
            l: "\u4FEE\u6587\u53BF",
            v: "520123"
          },
          {
            l: "\u6E05\u9547\u5E02",
            v: "520181"
          }
        ],
        l: "\u8D35\u9633\u5E02",
        v: "520100"
      },
      {
        c: [
          {
            l: "\u949F\u5C71\u533A",
            v: "520201"
          },
          {
            l: "\u516D\u679D\u7279\u533A",
            v: "520203"
          },
          {
            l: "\u6C34\u57CE\u53BF",
            v: "520221"
          },
          {
            l: "\u76D8\u5DDE\u5E02",
            v: "520281"
          }
        ],
        l: "\u516D\u76D8\u6C34\u5E02",
        v: "520200"
      },
      {
        c: [
          {
            l: "\u7EA2\u82B1\u5C97\u533A",
            v: "520302"
          },
          {
            l: "\u6C47\u5DDD\u533A",
            v: "520303"
          },
          {
            l: "\u64AD\u5DDE\u533A",
            v: "520304"
          },
          {
            l: "\u6850\u6893\u53BF",
            v: "520322"
          },
          {
            l: "\u7EE5\u9633\u53BF",
            v: "520323"
          },
          {
            l: "\u6B63\u5B89\u53BF",
            v: "520324"
          },
          {
            l: "\u9053\u771F\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520325"
          },
          {
            l: "\u52A1\u5DDD\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520326"
          },
          {
            l: "\u51E4\u5188\u53BF",
            v: "520327"
          },
          {
            l: "\u6E44\u6F6D\u53BF",
            v: "520328"
          },
          {
            l: "\u4F59\u5E86\u53BF",
            v: "520329"
          },
          {
            l: "\u4E60\u6C34\u53BF",
            v: "520330"
          },
          {
            l: "\u8D64\u6C34\u5E02",
            v: "520381"
          },
          {
            l: "\u4EC1\u6000\u5E02",
            v: "520382"
          }
        ],
        l: "\u9075\u4E49\u5E02",
        v: "520300"
      },
      {
        c: [
          {
            l: "\u897F\u79C0\u533A",
            v: "520402"
          },
          {
            l: "\u5E73\u575D\u533A",
            v: "520403"
          },
          {
            l: "\u666E\u5B9A\u53BF",
            v: "520422"
          },
          {
            l: "\u9547\u5B81\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520423"
          },
          {
            l: "\u5173\u5CAD\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520424"
          },
          {
            l: "\u7D2B\u4E91\u82D7\u65CF\u5E03\u4F9D\u65CF\u81EA\u6CBB\u53BF",
            v: "520425"
          }
        ],
        l: "\u5B89\u987A\u5E02",
        v: "520400"
      },
      {
        c: [
          {
            l: "\u4E03\u661F\u5173\u533A",
            v: "520502"
          },
          {
            l: "\u5927\u65B9\u53BF",
            v: "520521"
          },
          {
            l: "\u9ED4\u897F\u53BF",
            v: "520522"
          },
          {
            l: "\u91D1\u6C99\u53BF",
            v: "520523"
          },
          {
            l: "\u7EC7\u91D1\u53BF",
            v: "520524"
          },
          {
            l: "\u7EB3\u96CD\u53BF",
            v: "520525"
          },
          {
            l: "\u5A01\u5B81\u5F5D\u65CF\u56DE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520526"
          },
          {
            l: "\u8D6B\u7AE0\u53BF",
            v: "520527"
          }
        ],
        l: "\u6BD5\u8282\u5E02",
        v: "520500"
      },
      {
        c: [
          {
            l: "\u78A7\u6C5F\u533A",
            v: "520602"
          },
          {
            l: "\u4E07\u5C71\u533A",
            v: "520603"
          },
          {
            l: "\u6C5F\u53E3\u53BF",
            v: "520621"
          },
          {
            l: "\u7389\u5C4F\u4F97\u65CF\u81EA\u6CBB\u53BF",
            v: "520622"
          },
          {
            l: "\u77F3\u9621\u53BF",
            v: "520623"
          },
          {
            l: "\u601D\u5357\u53BF",
            v: "520624"
          },
          {
            l: "\u5370\u6C5F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520625"
          },
          {
            l: "\u5FB7\u6C5F\u53BF",
            v: "520626"
          },
          {
            l: "\u6CBF\u6CB3\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
            v: "520627"
          },
          {
            l: "\u677E\u6843\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "520628"
          }
        ],
        l: "\u94DC\u4EC1\u5E02",
        v: "520600"
      },
      {
        c: [
          {
            l: "\u5174\u4E49\u5E02",
            v: "522301"
          },
          {
            l: "\u5174\u4EC1\u5E02",
            v: "522302"
          },
          {
            l: "\u666E\u5B89\u53BF",
            v: "522323"
          },
          {
            l: "\u6674\u9686\u53BF",
            v: "522324"
          },
          {
            l: "\u8D1E\u4E30\u53BF",
            v: "522325"
          },
          {
            l: "\u671B\u8C1F\u53BF",
            v: "522326"
          },
          {
            l: "\u518C\u4EA8\u53BF",
            v: "522327"
          },
          {
            l: "\u5B89\u9F99\u53BF",
            v: "522328"
          }
        ],
        l: "\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
        v: "522300"
      },
      {
        c: [
          {
            l: "\u51EF\u91CC\u5E02",
            v: "522601"
          },
          {
            l: "\u9EC4\u5E73\u53BF",
            v: "522622"
          },
          {
            l: "\u65BD\u79C9\u53BF",
            v: "522623"
          },
          {
            l: "\u4E09\u7A57\u53BF",
            v: "522624"
          },
          {
            l: "\u9547\u8FDC\u53BF",
            v: "522625"
          },
          {
            l: "\u5C91\u5DE9\u53BF",
            v: "522626"
          },
          {
            l: "\u5929\u67F1\u53BF",
            v: "522627"
          },
          {
            l: "\u9526\u5C4F\u53BF",
            v: "522628"
          },
          {
            l: "\u5251\u6CB3\u53BF",
            v: "522629"
          },
          {
            l: "\u53F0\u6C5F\u53BF",
            v: "522630"
          },
          {
            l: "\u9ECE\u5E73\u53BF",
            v: "522631"
          },
          {
            l: "\u6995\u6C5F\u53BF",
            v: "522632"
          },
          {
            l: "\u4ECE\u6C5F\u53BF",
            v: "522633"
          },
          {
            l: "\u96F7\u5C71\u53BF",
            v: "522634"
          },
          {
            l: "\u9EBB\u6C5F\u53BF",
            v: "522635"
          },
          {
            l: "\u4E39\u5BE8\u53BF",
            v: "522636"
          }
        ],
        l: "\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE",
        v: "522600"
      },
      {
        c: [
          {
            l: "\u90FD\u5300\u5E02",
            v: "522701"
          },
          {
            l: "\u798F\u6CC9\u5E02",
            v: "522702"
          },
          {
            l: "\u8354\u6CE2\u53BF",
            v: "522722"
          },
          {
            l: "\u8D35\u5B9A\u53BF",
            v: "522723"
          },
          {
            l: "\u74EE\u5B89\u53BF",
            v: "522725"
          },
          {
            l: "\u72EC\u5C71\u53BF",
            v: "522726"
          },
          {
            l: "\u5E73\u5858\u53BF",
            v: "522727"
          },
          {
            l: "\u7F57\u7538\u53BF",
            v: "522728"
          },
          {
            l: "\u957F\u987A\u53BF",
            v: "522729"
          },
          {
            l: "\u9F99\u91CC\u53BF",
            v: "522730"
          },
          {
            l: "\u60E0\u6C34\u53BF",
            v: "522731"
          },
          {
            l: "\u4E09\u90FD\u6C34\u65CF\u81EA\u6CBB\u53BF",
            v: "522732"
          }
        ],
        l: "\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
        v: "522700"
      }
    ],
    l: "\u8D35\u5DDE\u7701",
    v: "520000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u4E94\u534E\u533A",
            v: "530102"
          },
          {
            l: "\u76D8\u9F99\u533A",
            v: "530103"
          },
          {
            l: "\u5B98\u6E21\u533A",
            v: "530111"
          },
          {
            l: "\u897F\u5C71\u533A",
            v: "530112"
          },
          {
            l: "\u4E1C\u5DDD\u533A",
            v: "530113"
          },
          {
            l: "\u5448\u8D21\u533A",
            v: "530114"
          },
          {
            l: "\u664B\u5B81\u533A",
            v: "530115"
          },
          {
            l: "\u5BCC\u6C11\u53BF",
            v: "530124"
          },
          {
            l: "\u5B9C\u826F\u53BF",
            v: "530125"
          },
          {
            l: "\u77F3\u6797\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530126"
          },
          {
            l: "\u5D69\u660E\u53BF",
            v: "530127"
          },
          {
            l: "\u7984\u529D\u5F5D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "530128"
          },
          {
            l: "\u5BFB\u7538\u56DE\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530129"
          },
          {
            l: "\u5B89\u5B81\u5E02",
            v: "530181"
          }
        ],
        l: "\u6606\u660E\u5E02",
        v: "530100"
      },
      {
        c: [
          {
            l: "\u9E92\u9E9F\u533A",
            v: "530302"
          },
          {
            l: "\u6CBE\u76CA\u533A",
            v: "530303"
          },
          {
            l: "\u9A6C\u9F99\u533A",
            v: "530304"
          },
          {
            l: "\u9646\u826F\u53BF",
            v: "530322"
          },
          {
            l: "\u5E08\u5B97\u53BF",
            v: "530323"
          },
          {
            l: "\u7F57\u5E73\u53BF",
            v: "530324"
          },
          {
            l: "\u5BCC\u6E90\u53BF",
            v: "530325"
          },
          {
            l: "\u4F1A\u6CFD\u53BF",
            v: "530326"
          },
          {
            l: "\u5BA3\u5A01\u5E02",
            v: "530381"
          }
        ],
        l: "\u66F2\u9756\u5E02",
        v: "530300"
      },
      {
        c: [
          {
            l: "\u7EA2\u5854\u533A",
            v: "530402"
          },
          {
            l: "\u6C5F\u5DDD\u533A",
            v: "530403"
          },
          {
            l: "\u901A\u6D77\u53BF",
            v: "530423"
          },
          {
            l: "\u534E\u5B81\u53BF",
            v: "530424"
          },
          {
            l: "\u6613\u95E8\u53BF",
            v: "530425"
          },
          {
            l: "\u5CE8\u5C71\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530426"
          },
          {
            l: "\u65B0\u5E73\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
            v: "530427"
          },
          {
            l: "\u5143\u6C5F\u54C8\u5C3C\u65CF\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
            v: "530428"
          },
          {
            l: "\u6F84\u6C5F\u5E02",
            v: "530481"
          }
        ],
        l: "\u7389\u6EAA\u5E02",
        v: "530400"
      },
      {
        c: [
          {
            l: "\u9686\u9633\u533A",
            v: "530502"
          },
          {
            l: "\u65BD\u7538\u53BF",
            v: "530521"
          },
          {
            l: "\u9F99\u9675\u53BF",
            v: "530523"
          },
          {
            l: "\u660C\u5B81\u53BF",
            v: "530524"
          },
          {
            l: "\u817E\u51B2\u5E02",
            v: "530581"
          }
        ],
        l: "\u4FDD\u5C71\u5E02",
        v: "530500"
      },
      {
        c: [
          {
            l: "\u662D\u9633\u533A",
            v: "530602"
          },
          {
            l: "\u9C81\u7538\u53BF",
            v: "530621"
          },
          {
            l: "\u5DE7\u5BB6\u53BF",
            v: "530622"
          },
          {
            l: "\u76D0\u6D25\u53BF",
            v: "530623"
          },
          {
            l: "\u5927\u5173\u53BF",
            v: "530624"
          },
          {
            l: "\u6C38\u5584\u53BF",
            v: "530625"
          },
          {
            l: "\u7EE5\u6C5F\u53BF",
            v: "530626"
          },
          {
            l: "\u9547\u96C4\u53BF",
            v: "530627"
          },
          {
            l: "\u5F5D\u826F\u53BF",
            v: "530628"
          },
          {
            l: "\u5A01\u4FE1\u53BF",
            v: "530629"
          },
          {
            l: "\u6C34\u5BCC\u5E02",
            v: "530681"
          }
        ],
        l: "\u662D\u901A\u5E02",
        v: "530600"
      },
      {
        c: [
          {
            l: "\u53E4\u57CE\u533A",
            v: "530702"
          },
          {
            l: "\u7389\u9F99\u7EB3\u897F\u65CF\u81EA\u6CBB\u53BF",
            v: "530721"
          },
          {
            l: "\u6C38\u80DC\u53BF",
            v: "530722"
          },
          {
            l: "\u534E\u576A\u53BF",
            v: "530723"
          },
          {
            l: "\u5B81\u8497\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530724"
          }
        ],
        l: "\u4E3D\u6C5F\u5E02",
        v: "530700"
      },
      {
        c: [
          {
            l: "\u601D\u8305\u533A",
            v: "530802"
          },
          {
            l: "\u5B81\u6D31\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530821"
          },
          {
            l: "\u58A8\u6C5F\u54C8\u5C3C\u65CF\u81EA\u6CBB\u53BF",
            v: "530822"
          },
          {
            l: "\u666F\u4E1C\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530823"
          },
          {
            l: "\u666F\u8C37\u50A3\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530824"
          },
          {
            l: "\u9547\u6C85\u5F5D\u65CF\u54C8\u5C3C\u65CF\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF",
            v: "530825"
          },
          {
            l: "\u6C5F\u57CE\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "530826"
          },
          {
            l: "\u5B5F\u8FDE\u50A3\u65CF\u62C9\u795C\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF",
            v: "530827"
          },
          {
            l: "\u6F9C\u6CA7\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF",
            v: "530828"
          },
          {
            l: "\u897F\u76DF\u4F64\u65CF\u81EA\u6CBB\u53BF",
            v: "530829"
          }
        ],
        l: "\u666E\u6D31\u5E02",
        v: "530800"
      },
      {
        c: [
          {
            l: "\u4E34\u7FD4\u533A",
            v: "530902"
          },
          {
            l: "\u51E4\u5E86\u53BF",
            v: "530921"
          },
          {
            l: "\u4E91\u53BF",
            v: "530922"
          },
          {
            l: "\u6C38\u5FB7\u53BF",
            v: "530923"
          },
          {
            l: "\u9547\u5EB7\u53BF",
            v: "530924"
          },
          {
            l: "\u53CC\u6C5F\u62C9\u795C\u65CF\u4F64\u65CF\u5E03\u6717\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
            v: "530925"
          },
          {
            l: "\u803F\u9A6C\u50A3\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF",
            v: "530926"
          },
          {
            l: "\u6CA7\u6E90\u4F64\u65CF\u81EA\u6CBB\u53BF",
            v: "530927"
          }
        ],
        l: "\u4E34\u6CA7\u5E02",
        v: "530900"
      },
      {
        c: [
          {
            l: "\u695A\u96C4\u5E02",
            v: "532301"
          },
          {
            l: "\u53CC\u67CF\u53BF",
            v: "532322"
          },
          {
            l: "\u725F\u5B9A\u53BF",
            v: "532323"
          },
          {
            l: "\u5357\u534E\u53BF",
            v: "532324"
          },
          {
            l: "\u59DA\u5B89\u53BF",
            v: "532325"
          },
          {
            l: "\u5927\u59DA\u53BF",
            v: "532326"
          },
          {
            l: "\u6C38\u4EC1\u53BF",
            v: "532327"
          },
          {
            l: "\u5143\u8C0B\u53BF",
            v: "532328"
          },
          {
            l: "\u6B66\u5B9A\u53BF",
            v: "532329"
          },
          {
            l: "\u7984\u4E30\u53BF",
            v: "532331"
          }
        ],
        l: "\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE",
        v: "532300"
      },
      {
        c: [
          {
            l: "\u4E2A\u65E7\u5E02",
            v: "532501"
          },
          {
            l: "\u5F00\u8FDC\u5E02",
            v: "532502"
          },
          {
            l: "\u8499\u81EA\u5E02",
            v: "532503"
          },
          {
            l: "\u5F25\u52D2\u5E02",
            v: "532504"
          },
          {
            l: "\u5C4F\u8FB9\u82D7\u65CF\u81EA\u6CBB\u53BF",
            v: "532523"
          },
          {
            l: "\u5EFA\u6C34\u53BF",
            v: "532524"
          },
          {
            l: "\u77F3\u5C4F\u53BF",
            v: "532525"
          },
          {
            l: "\u6CF8\u897F\u53BF",
            v: "532527"
          },
          {
            l: "\u5143\u9633\u53BF",
            v: "532528"
          },
          {
            l: "\u7EA2\u6CB3\u53BF",
            v: "532529"
          },
          {
            l: "\u91D1\u5E73\u82D7\u65CF\u7476\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
            v: "532530"
          },
          {
            l: "\u7EFF\u6625\u53BF",
            v: "532531"
          },
          {
            l: "\u6CB3\u53E3\u7476\u65CF\u81EA\u6CBB\u53BF",
            v: "532532"
          }
        ],
        l: "\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE",
        v: "532500"
      },
      {
        c: [
          {
            l: "\u6587\u5C71\u5E02",
            v: "532601"
          },
          {
            l: "\u781A\u5C71\u53BF",
            v: "532622"
          },
          {
            l: "\u897F\u7574\u53BF",
            v: "532623"
          },
          {
            l: "\u9EBB\u6817\u5761\u53BF",
            v: "532624"
          },
          {
            l: "\u9A6C\u5173\u53BF",
            v: "532625"
          },
          {
            l: "\u4E18\u5317\u53BF",
            v: "532626"
          },
          {
            l: "\u5E7F\u5357\u53BF",
            v: "532627"
          },
          {
            l: "\u5BCC\u5B81\u53BF",
            v: "532628"
          }
        ],
        l: "\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
        v: "532600"
      },
      {
        c: [
          {
            l: "\u666F\u6D2A\u5E02",
            v: "532801"
          },
          {
            l: "\u52D0\u6D77\u53BF",
            v: "532822"
          },
          {
            l: "\u52D0\u814A\u53BF",
            v: "532823"
          }
        ],
        l: "\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE",
        v: "532800"
      },
      {
        c: [
          {
            l: "\u5927\u7406\u5E02",
            v: "532901"
          },
          {
            l: "\u6F3E\u6FDE\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "532922"
          },
          {
            l: "\u7965\u4E91\u53BF",
            v: "532923"
          },
          {
            l: "\u5BBE\u5DDD\u53BF",
            v: "532924"
          },
          {
            l: "\u5F25\u6E21\u53BF",
            v: "532925"
          },
          {
            l: "\u5357\u6DA7\u5F5D\u65CF\u81EA\u6CBB\u53BF",
            v: "532926"
          },
          {
            l: "\u5DCD\u5C71\u5F5D\u65CF\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "532927"
          },
          {
            l: "\u6C38\u5E73\u53BF",
            v: "532928"
          },
          {
            l: "\u4E91\u9F99\u53BF",
            v: "532929"
          },
          {
            l: "\u6D31\u6E90\u53BF",
            v: "532930"
          },
          {
            l: "\u5251\u5DDD\u53BF",
            v: "532931"
          },
          {
            l: "\u9E64\u5E86\u53BF",
            v: "532932"
          }
        ],
        l: "\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE",
        v: "532900"
      },
      {
        c: [
          {
            l: "\u745E\u4E3D\u5E02",
            v: "533102"
          },
          {
            l: "\u8292\u5E02",
            v: "533103"
          },
          {
            l: "\u6881\u6CB3\u53BF",
            v: "533122"
          },
          {
            l: "\u76C8\u6C5F\u53BF",
            v: "533123"
          },
          {
            l: "\u9647\u5DDD\u53BF",
            v: "533124"
          }
        ],
        l: "\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE",
        v: "533100"
      },
      {
        c: [
          {
            l: "\u6CF8\u6C34\u5E02",
            v: "533301"
          },
          {
            l: "\u798F\u8D21\u53BF",
            v: "533323"
          },
          {
            l: "\u8D21\u5C71\u72EC\u9F99\u65CF\u6012\u65CF\u81EA\u6CBB\u53BF",
            v: "533324"
          },
          {
            l: "\u5170\u576A\u767D\u65CF\u666E\u7C73\u65CF\u81EA\u6CBB\u53BF",
            v: "533325"
          }
        ],
        l: "\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE",
        v: "533300"
      },
      {
        c: [
          {
            l: "\u9999\u683C\u91CC\u62C9\u5E02",
            v: "533401"
          },
          {
            l: "\u5FB7\u94A6\u53BF",
            v: "533422"
          },
          {
            l: "\u7EF4\u897F\u5088\u50F3\u65CF\u81EA\u6CBB\u53BF",
            v: "533423"
          }
        ],
        l: "\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "533400"
      }
    ],
    l: "\u4E91\u5357\u7701",
    v: "530000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u57CE\u5173\u533A",
            v: "540102"
          },
          {
            l: "\u5806\u9F99\u5FB7\u5E86\u533A",
            v: "540103"
          },
          {
            l: "\u8FBE\u5B5C\u533A",
            v: "540104"
          },
          {
            l: "\u6797\u5468\u53BF",
            v: "540121"
          },
          {
            l: "\u5F53\u96C4\u53BF",
            v: "540122"
          },
          {
            l: "\u5C3C\u6728\u53BF",
            v: "540123"
          },
          {
            l: "\u66F2\u6C34\u53BF",
            v: "540124"
          },
          {
            l: "\u58A8\u7AF9\u5DE5\u5361\u53BF",
            v: "540127"
          },
          {
            l: "\u683C\u5C14\u6728\u85CF\u9752\u5DE5\u4E1A\u56ED\u533A",
            v: "540171"
          },
          {
            l: "\u62C9\u8428\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "540172"
          },
          {
            l: "\u897F\u85CF\u6587\u5316\u65C5\u6E38\u521B\u610F\u56ED\u533A",
            v: "540173"
          },
          {
            l: "\u8FBE\u5B5C\u5DE5\u4E1A\u56ED\u533A",
            v: "540174"
          }
        ],
        l: "\u62C9\u8428\u5E02",
        v: "540100"
      },
      {
        c: [
          {
            l: "\u6851\u73E0\u5B5C\u533A",
            v: "540202"
          },
          {
            l: "\u5357\u6728\u6797\u53BF",
            v: "540221"
          },
          {
            l: "\u6C5F\u5B5C\u53BF",
            v: "540222"
          },
          {
            l: "\u5B9A\u65E5\u53BF",
            v: "540223"
          },
          {
            l: "\u8428\u8FE6\u53BF",
            v: "540224"
          },
          {
            l: "\u62C9\u5B5C\u53BF",
            v: "540225"
          },
          {
            l: "\u6602\u4EC1\u53BF",
            v: "540226"
          },
          {
            l: "\u8C22\u901A\u95E8\u53BF",
            v: "540227"
          },
          {
            l: "\u767D\u6717\u53BF",
            v: "540228"
          },
          {
            l: "\u4EC1\u5E03\u53BF",
            v: "540229"
          },
          {
            l: "\u5EB7\u9A6C\u53BF",
            v: "540230"
          },
          {
            l: "\u5B9A\u7ED3\u53BF",
            v: "540231"
          },
          {
            l: "\u4EF2\u5DF4\u53BF",
            v: "540232"
          },
          {
            l: "\u4E9A\u4E1C\u53BF",
            v: "540233"
          },
          {
            l: "\u5409\u9686\u53BF",
            v: "540234"
          },
          {
            l: "\u8042\u62C9\u6728\u53BF",
            v: "540235"
          },
          {
            l: "\u8428\u560E\u53BF",
            v: "540236"
          },
          {
            l: "\u5C97\u5DF4\u53BF",
            v: "540237"
          }
        ],
        l: "\u65E5\u5580\u5219\u5E02",
        v: "540200"
      },
      {
        c: [
          {
            l: "\u5361\u82E5\u533A",
            v: "540302"
          },
          {
            l: "\u6C5F\u8FBE\u53BF",
            v: "540321"
          },
          {
            l: "\u8D21\u89C9\u53BF",
            v: "540322"
          },
          {
            l: "\u7C7B\u4E4C\u9F50\u53BF",
            v: "540323"
          },
          {
            l: "\u4E01\u9752\u53BF",
            v: "540324"
          },
          {
            l: "\u5BDF\u96C5\u53BF",
            v: "540325"
          },
          {
            l: "\u516B\u5BBF\u53BF",
            v: "540326"
          },
          {
            l: "\u5DE6\u8D21\u53BF",
            v: "540327"
          },
          {
            l: "\u8292\u5EB7\u53BF",
            v: "540328"
          },
          {
            l: "\u6D1B\u9686\u53BF",
            v: "540329"
          },
          {
            l: "\u8FB9\u575D\u53BF",
            v: "540330"
          }
        ],
        l: "\u660C\u90FD\u5E02",
        v: "540300"
      },
      {
        c: [
          {
            l: "\u5DF4\u5B9C\u533A",
            v: "540402"
          },
          {
            l: "\u5DE5\u5E03\u6C5F\u8FBE\u53BF",
            v: "540421"
          },
          {
            l: "\u7C73\u6797\u53BF",
            v: "540422"
          },
          {
            l: "\u58A8\u8131\u53BF",
            v: "540423"
          },
          {
            l: "\u6CE2\u5BC6\u53BF",
            v: "540424"
          },
          {
            l: "\u5BDF\u9685\u53BF",
            v: "540425"
          },
          {
            l: "\u6717\u53BF",
            v: "540426"
          }
        ],
        l: "\u6797\u829D\u5E02",
        v: "540400"
      },
      {
        c: [
          {
            l: "\u4E43\u4E1C\u533A",
            v: "540502"
          },
          {
            l: "\u624E\u56CA\u53BF",
            v: "540521"
          },
          {
            l: "\u8D21\u560E\u53BF",
            v: "540522"
          },
          {
            l: "\u6851\u65E5\u53BF",
            v: "540523"
          },
          {
            l: "\u743C\u7ED3\u53BF",
            v: "540524"
          },
          {
            l: "\u66F2\u677E\u53BF",
            v: "540525"
          },
          {
            l: "\u63AA\u7F8E\u53BF",
            v: "540526"
          },
          {
            l: "\u6D1B\u624E\u53BF",
            v: "540527"
          },
          {
            l: "\u52A0\u67E5\u53BF",
            v: "540528"
          },
          {
            l: "\u9686\u5B50\u53BF",
            v: "540529"
          },
          {
            l: "\u9519\u90A3\u53BF",
            v: "540530"
          },
          {
            l: "\u6D6A\u5361\u5B50\u53BF",
            v: "540531"
          }
        ],
        l: "\u5C71\u5357\u5E02",
        v: "540500"
      },
      {
        c: [
          {
            l: "\u8272\u5C3C\u533A",
            v: "540602"
          },
          {
            l: "\u5609\u9ECE\u53BF",
            v: "540621"
          },
          {
            l: "\u6BD4\u5982\u53BF",
            v: "540622"
          },
          {
            l: "\u8042\u8363\u53BF",
            v: "540623"
          },
          {
            l: "\u5B89\u591A\u53BF",
            v: "540624"
          },
          {
            l: "\u7533\u624E\u53BF",
            v: "540625"
          },
          {
            l: "\u7D22\u53BF",
            v: "540626"
          },
          {
            l: "\u73ED\u6208\u53BF",
            v: "540627"
          },
          {
            l: "\u5DF4\u9752\u53BF",
            v: "540628"
          },
          {
            l: "\u5C3C\u739B\u53BF",
            v: "540629"
          },
          {
            l: "\u53CC\u6E56\u53BF",
            v: "540630"
          }
        ],
        l: "\u90A3\u66F2\u5E02",
        v: "540600"
      },
      {
        c: [
          {
            l: "\u666E\u5170\u53BF",
            v: "542521"
          },
          {
            l: "\u672D\u8FBE\u53BF",
            v: "542522"
          },
          {
            l: "\u5676\u5C14\u53BF",
            v: "542523"
          },
          {
            l: "\u65E5\u571F\u53BF",
            v: "542524"
          },
          {
            l: "\u9769\u5409\u53BF",
            v: "542525"
          },
          {
            l: "\u6539\u5219\u53BF",
            v: "542526"
          },
          {
            l: "\u63AA\u52E4\u53BF",
            v: "542527"
          }
        ],
        l: "\u963F\u91CC\u5730\u533A",
        v: "542500"
      }
    ],
    l: "\u897F\u85CF\u81EA\u6CBB\u533A",
    v: "540000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u65B0\u57CE\u533A",
            v: "610102"
          },
          {
            l: "\u7891\u6797\u533A",
            v: "610103"
          },
          {
            l: "\u83B2\u6E56\u533A",
            v: "610104"
          },
          {
            l: "\u705E\u6865\u533A",
            v: "610111"
          },
          {
            l: "\u672A\u592E\u533A",
            v: "610112"
          },
          {
            l: "\u96C1\u5854\u533A",
            v: "610113"
          },
          {
            l: "\u960E\u826F\u533A",
            v: "610114"
          },
          {
            l: "\u4E34\u6F7C\u533A",
            v: "610115"
          },
          {
            l: "\u957F\u5B89\u533A",
            v: "610116"
          },
          {
            l: "\u9AD8\u9675\u533A",
            v: "610117"
          },
          {
            l: "\u9120\u9091\u533A",
            v: "610118"
          },
          {
            l: "\u84DD\u7530\u53BF",
            v: "610122"
          },
          {
            l: "\u5468\u81F3\u53BF",
            v: "610124"
          }
        ],
        l: "\u897F\u5B89\u5E02",
        v: "610100"
      },
      {
        c: [
          {
            l: "\u738B\u76CA\u533A",
            v: "610202"
          },
          {
            l: "\u5370\u53F0\u533A",
            v: "610203"
          },
          {
            l: "\u8000\u5DDE\u533A",
            v: "610204"
          },
          {
            l: "\u5B9C\u541B\u53BF",
            v: "610222"
          }
        ],
        l: "\u94DC\u5DDD\u5E02",
        v: "610200"
      },
      {
        c: [
          {
            l: "\u6E2D\u6EE8\u533A",
            v: "610302"
          },
          {
            l: "\u91D1\u53F0\u533A",
            v: "610303"
          },
          {
            l: "\u9648\u4ED3\u533A",
            v: "610304"
          },
          {
            l: "\u51E4\u7FD4\u53BF",
            v: "610322"
          },
          {
            l: "\u5C90\u5C71\u53BF",
            v: "610323"
          },
          {
            l: "\u6276\u98CE\u53BF",
            v: "610324"
          },
          {
            l: "\u7709\u53BF",
            v: "610326"
          },
          {
            l: "\u9647\u53BF",
            v: "610327"
          },
          {
            l: "\u5343\u9633\u53BF",
            v: "610328"
          },
          {
            l: "\u9E9F\u6E38\u53BF",
            v: "610329"
          },
          {
            l: "\u51E4\u53BF",
            v: "610330"
          },
          {
            l: "\u592A\u767D\u53BF",
            v: "610331"
          }
        ],
        l: "\u5B9D\u9E21\u5E02",
        v: "610300"
      },
      {
        c: [
          {
            l: "\u79E6\u90FD\u533A",
            v: "610402"
          },
          {
            l: "\u6768\u9675\u533A",
            v: "610403"
          },
          {
            l: "\u6E2D\u57CE\u533A",
            v: "610404"
          },
          {
            l: "\u4E09\u539F\u53BF",
            v: "610422"
          },
          {
            l: "\u6CFE\u9633\u53BF",
            v: "610423"
          },
          {
            l: "\u4E7E\u53BF",
            v: "610424"
          },
          {
            l: "\u793C\u6CC9\u53BF",
            v: "610425"
          },
          {
            l: "\u6C38\u5BFF\u53BF",
            v: "610426"
          },
          {
            l: "\u957F\u6B66\u53BF",
            v: "610428"
          },
          {
            l: "\u65EC\u9091\u53BF",
            v: "610429"
          },
          {
            l: "\u6DF3\u5316\u53BF",
            v: "610430"
          },
          {
            l: "\u6B66\u529F\u53BF",
            v: "610431"
          },
          {
            l: "\u5174\u5E73\u5E02",
            v: "610481"
          },
          {
            l: "\u5F6C\u5DDE\u5E02",
            v: "610482"
          }
        ],
        l: "\u54B8\u9633\u5E02",
        v: "610400"
      },
      {
        c: [
          {
            l: "\u4E34\u6E2D\u533A",
            v: "610502"
          },
          {
            l: "\u534E\u5DDE\u533A",
            v: "610503"
          },
          {
            l: "\u6F7C\u5173\u53BF",
            v: "610522"
          },
          {
            l: "\u5927\u8354\u53BF",
            v: "610523"
          },
          {
            l: "\u5408\u9633\u53BF",
            v: "610524"
          },
          {
            l: "\u6F84\u57CE\u53BF",
            v: "610525"
          },
          {
            l: "\u84B2\u57CE\u53BF",
            v: "610526"
          },
          {
            l: "\u767D\u6C34\u53BF",
            v: "610527"
          },
          {
            l: "\u5BCC\u5E73\u53BF",
            v: "610528"
          },
          {
            l: "\u97E9\u57CE\u5E02",
            v: "610581"
          },
          {
            l: "\u534E\u9634\u5E02",
            v: "610582"
          }
        ],
        l: "\u6E2D\u5357\u5E02",
        v: "610500"
      },
      {
        c: [
          {
            l: "\u5B9D\u5854\u533A",
            v: "610602"
          },
          {
            l: "\u5B89\u585E\u533A",
            v: "610603"
          },
          {
            l: "\u5EF6\u957F\u53BF",
            v: "610621"
          },
          {
            l: "\u5EF6\u5DDD\u53BF",
            v: "610622"
          },
          {
            l: "\u5FD7\u4E39\u53BF",
            v: "610625"
          },
          {
            l: "\u5434\u8D77\u53BF",
            v: "610626"
          },
          {
            l: "\u7518\u6CC9\u53BF",
            v: "610627"
          },
          {
            l: "\u5BCC\u53BF",
            v: "610628"
          },
          {
            l: "\u6D1B\u5DDD\u53BF",
            v: "610629"
          },
          {
            l: "\u5B9C\u5DDD\u53BF",
            v: "610630"
          },
          {
            l: "\u9EC4\u9F99\u53BF",
            v: "610631"
          },
          {
            l: "\u9EC4\u9675\u53BF",
            v: "610632"
          },
          {
            l: "\u5B50\u957F\u5E02",
            v: "610681"
          }
        ],
        l: "\u5EF6\u5B89\u5E02",
        v: "610600"
      },
      {
        c: [
          {
            l: "\u6C49\u53F0\u533A",
            v: "610702"
          },
          {
            l: "\u5357\u90D1\u533A",
            v: "610703"
          },
          {
            l: "\u57CE\u56FA\u53BF",
            v: "610722"
          },
          {
            l: "\u6D0B\u53BF",
            v: "610723"
          },
          {
            l: "\u897F\u4E61\u53BF",
            v: "610724"
          },
          {
            l: "\u52C9\u53BF",
            v: "610725"
          },
          {
            l: "\u5B81\u5F3A\u53BF",
            v: "610726"
          },
          {
            l: "\u7565\u9633\u53BF",
            v: "610727"
          },
          {
            l: "\u9547\u5DF4\u53BF",
            v: "610728"
          },
          {
            l: "\u7559\u575D\u53BF",
            v: "610729"
          },
          {
            l: "\u4F5B\u576A\u53BF",
            v: "610730"
          }
        ],
        l: "\u6C49\u4E2D\u5E02",
        v: "610700"
      },
      {
        c: [
          {
            l: "\u6986\u9633\u533A",
            v: "610802"
          },
          {
            l: "\u6A2A\u5C71\u533A",
            v: "610803"
          },
          {
            l: "\u5E9C\u8C37\u53BF",
            v: "610822"
          },
          {
            l: "\u9756\u8FB9\u53BF",
            v: "610824"
          },
          {
            l: "\u5B9A\u8FB9\u53BF",
            v: "610825"
          },
          {
            l: "\u7EE5\u5FB7\u53BF",
            v: "610826"
          },
          {
            l: "\u7C73\u8102\u53BF",
            v: "610827"
          },
          {
            l: "\u4F73\u53BF",
            v: "610828"
          },
          {
            l: "\u5434\u5821\u53BF",
            v: "610829"
          },
          {
            l: "\u6E05\u6DA7\u53BF",
            v: "610830"
          },
          {
            l: "\u5B50\u6D32\u53BF",
            v: "610831"
          },
          {
            l: "\u795E\u6728\u5E02",
            v: "610881"
          }
        ],
        l: "\u6986\u6797\u5E02",
        v: "610800"
      },
      {
        c: [
          {
            l: "\u6C49\u6EE8\u533A",
            v: "610902"
          },
          {
            l: "\u6C49\u9634\u53BF",
            v: "610921"
          },
          {
            l: "\u77F3\u6CC9\u53BF",
            v: "610922"
          },
          {
            l: "\u5B81\u9655\u53BF",
            v: "610923"
          },
          {
            l: "\u7D2B\u9633\u53BF",
            v: "610924"
          },
          {
            l: "\u5C9A\u768B\u53BF",
            v: "610925"
          },
          {
            l: "\u5E73\u5229\u53BF",
            v: "610926"
          },
          {
            l: "\u9547\u576A\u53BF",
            v: "610927"
          },
          {
            l: "\u65EC\u9633\u53BF",
            v: "610928"
          },
          {
            l: "\u767D\u6CB3\u53BF",
            v: "610929"
          }
        ],
        l: "\u5B89\u5EB7\u5E02",
        v: "610900"
      },
      {
        c: [
          {
            l: "\u5546\u5DDE\u533A",
            v: "611002"
          },
          {
            l: "\u6D1B\u5357\u53BF",
            v: "611021"
          },
          {
            l: "\u4E39\u51E4\u53BF",
            v: "611022"
          },
          {
            l: "\u5546\u5357\u53BF",
            v: "611023"
          },
          {
            l: "\u5C71\u9633\u53BF",
            v: "611024"
          },
          {
            l: "\u9547\u5B89\u53BF",
            v: "611025"
          },
          {
            l: "\u67DE\u6C34\u53BF",
            v: "611026"
          }
        ],
        l: "\u5546\u6D1B\u5E02",
        v: "611000"
      }
    ],
    l: "\u9655\u897F\u7701",
    v: "610000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u57CE\u5173\u533A",
            v: "620102"
          },
          {
            l: "\u4E03\u91CC\u6CB3\u533A",
            v: "620103"
          },
          {
            l: "\u897F\u56FA\u533A",
            v: "620104"
          },
          {
            l: "\u5B89\u5B81\u533A",
            v: "620105"
          },
          {
            l: "\u7EA2\u53E4\u533A",
            v: "620111"
          },
          {
            l: "\u6C38\u767B\u53BF",
            v: "620121"
          },
          {
            l: "\u768B\u5170\u53BF",
            v: "620122"
          },
          {
            l: "\u6986\u4E2D\u53BF",
            v: "620123"
          },
          {
            l: "\u5170\u5DDE\u65B0\u533A",
            v: "620171"
          }
        ],
        l: "\u5170\u5DDE\u5E02",
        v: "620100"
      },
      {
        l: "\u5609\u5CEA\u5173\u5E02",
        v: "620200"
      },
      {
        c: [
          {
            l: "\u91D1\u5DDD\u533A",
            v: "620302"
          },
          {
            l: "\u6C38\u660C\u53BF",
            v: "620321"
          }
        ],
        l: "\u91D1\u660C\u5E02",
        v: "620300"
      },
      {
        c: [
          {
            l: "\u767D\u94F6\u533A",
            v: "620402"
          },
          {
            l: "\u5E73\u5DDD\u533A",
            v: "620403"
          },
          {
            l: "\u9756\u8FDC\u53BF",
            v: "620421"
          },
          {
            l: "\u4F1A\u5B81\u53BF",
            v: "620422"
          },
          {
            l: "\u666F\u6CF0\u53BF",
            v: "620423"
          }
        ],
        l: "\u767D\u94F6\u5E02",
        v: "620400"
      },
      {
        c: [
          {
            l: "\u79E6\u5DDE\u533A",
            v: "620502"
          },
          {
            l: "\u9EA6\u79EF\u533A",
            v: "620503"
          },
          {
            l: "\u6E05\u6C34\u53BF",
            v: "620521"
          },
          {
            l: "\u79E6\u5B89\u53BF",
            v: "620522"
          },
          {
            l: "\u7518\u8C37\u53BF",
            v: "620523"
          },
          {
            l: "\u6B66\u5C71\u53BF",
            v: "620524"
          },
          {
            l: "\u5F20\u5BB6\u5DDD\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "620525"
          }
        ],
        l: "\u5929\u6C34\u5E02",
        v: "620500"
      },
      {
        c: [
          {
            l: "\u51C9\u5DDE\u533A",
            v: "620602"
          },
          {
            l: "\u6C11\u52E4\u53BF",
            v: "620621"
          },
          {
            l: "\u53E4\u6D6A\u53BF",
            v: "620622"
          },
          {
            l: "\u5929\u795D\u85CF\u65CF\u81EA\u6CBB\u53BF",
            v: "620623"
          }
        ],
        l: "\u6B66\u5A01\u5E02",
        v: "620600"
      },
      {
        c: [
          {
            l: "\u7518\u5DDE\u533A",
            v: "620702"
          },
          {
            l: "\u8083\u5357\u88D5\u56FA\u65CF\u81EA\u6CBB\u53BF",
            v: "620721"
          },
          {
            l: "\u6C11\u4E50\u53BF",
            v: "620722"
          },
          {
            l: "\u4E34\u6CFD\u53BF",
            v: "620723"
          },
          {
            l: "\u9AD8\u53F0\u53BF",
            v: "620724"
          },
          {
            l: "\u5C71\u4E39\u53BF",
            v: "620725"
          }
        ],
        l: "\u5F20\u6396\u5E02",
        v: "620700"
      },
      {
        c: [
          {
            l: "\u5D06\u5CD2\u533A",
            v: "620802"
          },
          {
            l: "\u6CFE\u5DDD\u53BF",
            v: "620821"
          },
          {
            l: "\u7075\u53F0\u53BF",
            v: "620822"
          },
          {
            l: "\u5D07\u4FE1\u53BF",
            v: "620823"
          },
          {
            l: "\u5E84\u6D6A\u53BF",
            v: "620825"
          },
          {
            l: "\u9759\u5B81\u53BF",
            v: "620826"
          },
          {
            l: "\u534E\u4EAD\u5E02",
            v: "620881"
          }
        ],
        l: "\u5E73\u51C9\u5E02",
        v: "620800"
      },
      {
        c: [
          {
            l: "\u8083\u5DDE\u533A",
            v: "620902"
          },
          {
            l: "\u91D1\u5854\u53BF",
            v: "620921"
          },
          {
            l: "\u74DC\u5DDE\u53BF",
            v: "620922"
          },
          {
            l: "\u8083\u5317\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "620923"
          },
          {
            l: "\u963F\u514B\u585E\u54C8\u8428\u514B\u65CF\u81EA\u6CBB\u53BF",
            v: "620924"
          },
          {
            l: "\u7389\u95E8\u5E02",
            v: "620981"
          },
          {
            l: "\u6566\u714C\u5E02",
            v: "620982"
          }
        ],
        l: "\u9152\u6CC9\u5E02",
        v: "620900"
      },
      {
        c: [
          {
            l: "\u897F\u5CF0\u533A",
            v: "621002"
          },
          {
            l: "\u5E86\u57CE\u53BF",
            v: "621021"
          },
          {
            l: "\u73AF\u53BF",
            v: "621022"
          },
          {
            l: "\u534E\u6C60\u53BF",
            v: "621023"
          },
          {
            l: "\u5408\u6C34\u53BF",
            v: "621024"
          },
          {
            l: "\u6B63\u5B81\u53BF",
            v: "621025"
          },
          {
            l: "\u5B81\u53BF",
            v: "621026"
          },
          {
            l: "\u9547\u539F\u53BF",
            v: "621027"
          }
        ],
        l: "\u5E86\u9633\u5E02",
        v: "621000"
      },
      {
        c: [
          {
            l: "\u5B89\u5B9A\u533A",
            v: "621102"
          },
          {
            l: "\u901A\u6E2D\u53BF",
            v: "621121"
          },
          {
            l: "\u9647\u897F\u53BF",
            v: "621122"
          },
          {
            l: "\u6E2D\u6E90\u53BF",
            v: "621123"
          },
          {
            l: "\u4E34\u6D2E\u53BF",
            v: "621124"
          },
          {
            l: "\u6F33\u53BF",
            v: "621125"
          },
          {
            l: "\u5CB7\u53BF",
            v: "621126"
          }
        ],
        l: "\u5B9A\u897F\u5E02",
        v: "621100"
      },
      {
        c: [
          {
            l: "\u6B66\u90FD\u533A",
            v: "621202"
          },
          {
            l: "\u6210\u53BF",
            v: "621221"
          },
          {
            l: "\u6587\u53BF",
            v: "621222"
          },
          {
            l: "\u5B95\u660C\u53BF",
            v: "621223"
          },
          {
            l: "\u5EB7\u53BF",
            v: "621224"
          },
          {
            l: "\u897F\u548C\u53BF",
            v: "621225"
          },
          {
            l: "\u793C\u53BF",
            v: "621226"
          },
          {
            l: "\u5FBD\u53BF",
            v: "621227"
          },
          {
            l: "\u4E24\u5F53\u53BF",
            v: "621228"
          }
        ],
        l: "\u9647\u5357\u5E02",
        v: "621200"
      },
      {
        c: [
          {
            l: "\u4E34\u590F\u5E02",
            v: "622901"
          },
          {
            l: "\u4E34\u590F\u53BF",
            v: "622921"
          },
          {
            l: "\u5EB7\u4E50\u53BF",
            v: "622922"
          },
          {
            l: "\u6C38\u9756\u53BF",
            v: "622923"
          },
          {
            l: "\u5E7F\u6CB3\u53BF",
            v: "622924"
          },
          {
            l: "\u548C\u653F\u53BF",
            v: "622925"
          },
          {
            l: "\u4E1C\u4E61\u65CF\u81EA\u6CBB\u53BF",
            v: "622926"
          },
          {
            l: "\u79EF\u77F3\u5C71\u4FDD\u5B89\u65CF\u4E1C\u4E61\u65CF\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF",
            v: "622927"
          }
        ],
        l: "\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE",
        v: "622900"
      },
      {
        c: [
          {
            l: "\u5408\u4F5C\u5E02",
            v: "623001"
          },
          {
            l: "\u4E34\u6F6D\u53BF",
            v: "623021"
          },
          {
            l: "\u5353\u5C3C\u53BF",
            v: "623022"
          },
          {
            l: "\u821F\u66F2\u53BF",
            v: "623023"
          },
          {
            l: "\u8FED\u90E8\u53BF",
            v: "623024"
          },
          {
            l: "\u739B\u66F2\u53BF",
            v: "623025"
          },
          {
            l: "\u788C\u66F2\u53BF",
            v: "623026"
          },
          {
            l: "\u590F\u6CB3\u53BF",
            v: "623027"
          }
        ],
        l: "\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "623000"
      }
    ],
    l: "\u7518\u8083\u7701",
    v: "620000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u57CE\u4E1C\u533A",
            v: "630102"
          },
          {
            l: "\u57CE\u4E2D\u533A",
            v: "630103"
          },
          {
            l: "\u57CE\u897F\u533A",
            v: "630104"
          },
          {
            l: "\u57CE\u5317\u533A",
            v: "630105"
          },
          {
            l: "\u6E5F\u4E2D\u533A",
            v: "630106"
          },
          {
            l: "\u5927\u901A\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF",
            v: "630121"
          },
          {
            l: "\u6E5F\u6E90\u53BF",
            v: "630123"
          }
        ],
        l: "\u897F\u5B81\u5E02",
        v: "630100"
      },
      {
        c: [
          {
            l: "\u4E50\u90FD\u533A",
            v: "630202"
          },
          {
            l: "\u5E73\u5B89\u533A",
            v: "630203"
          },
          {
            l: "\u6C11\u548C\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF",
            v: "630222"
          },
          {
            l: "\u4E92\u52A9\u571F\u65CF\u81EA\u6CBB\u53BF",
            v: "630223"
          },
          {
            l: "\u5316\u9686\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "630224"
          },
          {
            l: "\u5FAA\u5316\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF",
            v: "630225"
          }
        ],
        l: "\u6D77\u4E1C\u5E02",
        v: "630200"
      },
      {
        c: [
          {
            l: "\u95E8\u6E90\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "632221"
          },
          {
            l: "\u7941\u8FDE\u53BF",
            v: "632222"
          },
          {
            l: "\u6D77\u664F\u53BF",
            v: "632223"
          },
          {
            l: "\u521A\u5BDF\u53BF",
            v: "632224"
          }
        ],
        l: "\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "632200"
      },
      {
        c: [
          {
            l: "\u540C\u4EC1\u53BF",
            v: "632321"
          },
          {
            l: "\u5C16\u624E\u53BF",
            v: "632322"
          },
          {
            l: "\u6CFD\u5E93\u53BF",
            v: "632323"
          },
          {
            l: "\u6CB3\u5357\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
            v: "632324"
          }
        ],
        l: "\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "632300"
      },
      {
        c: [
          {
            l: "\u5171\u548C\u53BF",
            v: "632521"
          },
          {
            l: "\u540C\u5FB7\u53BF",
            v: "632522"
          },
          {
            l: "\u8D35\u5FB7\u53BF",
            v: "632523"
          },
          {
            l: "\u5174\u6D77\u53BF",
            v: "632524"
          },
          {
            l: "\u8D35\u5357\u53BF",
            v: "632525"
          }
        ],
        l: "\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "632500"
      },
      {
        c: [
          {
            l: "\u739B\u6C81\u53BF",
            v: "632621"
          },
          {
            l: "\u73ED\u739B\u53BF",
            v: "632622"
          },
          {
            l: "\u7518\u5FB7\u53BF",
            v: "632623"
          },
          {
            l: "\u8FBE\u65E5\u53BF",
            v: "632624"
          },
          {
            l: "\u4E45\u6CBB\u53BF",
            v: "632625"
          },
          {
            l: "\u739B\u591A\u53BF",
            v: "632626"
          }
        ],
        l: "\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "632600"
      },
      {
        c: [
          {
            l: "\u7389\u6811\u5E02",
            v: "632701"
          },
          {
            l: "\u6742\u591A\u53BF",
            v: "632722"
          },
          {
            l: "\u79F0\u591A\u53BF",
            v: "632723"
          },
          {
            l: "\u6CBB\u591A\u53BF",
            v: "632724"
          },
          {
            l: "\u56CA\u8C26\u53BF",
            v: "632725"
          },
          {
            l: "\u66F2\u9EBB\u83B1\u53BF",
            v: "632726"
          }
        ],
        l: "\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "632700"
      },
      {
        c: [
          {
            l: "\u683C\u5C14\u6728\u5E02",
            v: "632801"
          },
          {
            l: "\u5FB7\u4EE4\u54C8\u5E02",
            v: "632802"
          },
          {
            l: "\u832B\u5D16\u5E02",
            v: "632803"
          },
          {
            l: "\u4E4C\u5170\u53BF",
            v: "632821"
          },
          {
            l: "\u90FD\u5170\u53BF",
            v: "632822"
          },
          {
            l: "\u5929\u5CFB\u53BF",
            v: "632823"
          },
          {
            l: "\u5927\u67F4\u65E6\u884C\u653F\u59D4\u5458\u4F1A",
            v: "632857"
          }
        ],
        l: "\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE",
        v: "632800"
      }
    ],
    l: "\u9752\u6D77\u7701",
    v: "630000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5174\u5E86\u533A",
            v: "640104"
          },
          {
            l: "\u897F\u590F\u533A",
            v: "640105"
          },
          {
            l: "\u91D1\u51E4\u533A",
            v: "640106"
          },
          {
            l: "\u6C38\u5B81\u53BF",
            v: "640121"
          },
          {
            l: "\u8D3A\u5170\u53BF",
            v: "640122"
          },
          {
            l: "\u7075\u6B66\u5E02",
            v: "640181"
          }
        ],
        l: "\u94F6\u5DDD\u5E02",
        v: "640100"
      },
      {
        c: [
          {
            l: "\u5927\u6B66\u53E3\u533A",
            v: "640202"
          },
          {
            l: "\u60E0\u519C\u533A",
            v: "640205"
          },
          {
            l: "\u5E73\u7F57\u53BF",
            v: "640221"
          }
        ],
        l: "\u77F3\u5634\u5C71\u5E02",
        v: "640200"
      },
      {
        c: [
          {
            l: "\u5229\u901A\u533A",
            v: "640302"
          },
          {
            l: "\u7EA2\u5BFA\u5821\u533A",
            v: "640303"
          },
          {
            l: "\u76D0\u6C60\u53BF",
            v: "640323"
          },
          {
            l: "\u540C\u5FC3\u53BF",
            v: "640324"
          },
          {
            l: "\u9752\u94DC\u5CE1\u5E02",
            v: "640381"
          }
        ],
        l: "\u5434\u5FE0\u5E02",
        v: "640300"
      },
      {
        c: [
          {
            l: "\u539F\u5DDE\u533A",
            v: "640402"
          },
          {
            l: "\u897F\u5409\u53BF",
            v: "640422"
          },
          {
            l: "\u9686\u5FB7\u53BF",
            v: "640423"
          },
          {
            l: "\u6CFE\u6E90\u53BF",
            v: "640424"
          },
          {
            l: "\u5F6D\u9633\u53BF",
            v: "640425"
          }
        ],
        l: "\u56FA\u539F\u5E02",
        v: "640400"
      },
      {
        c: [
          {
            l: "\u6C99\u5761\u5934\u533A",
            v: "640502"
          },
          {
            l: "\u4E2D\u5B81\u53BF",
            v: "640521"
          },
          {
            l: "\u6D77\u539F\u53BF",
            v: "640522"
          }
        ],
        l: "\u4E2D\u536B\u5E02",
        v: "640500"
      }
    ],
    l: "\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A",
    v: "640000"
  },
  {
    c: [
      {
        c: [
          {
            l: "\u5929\u5C71\u533A",
            v: "650102"
          },
          {
            l: "\u6C99\u4F9D\u5DF4\u514B\u533A",
            v: "650103"
          },
          {
            l: "\u65B0\u5E02\u533A",
            v: "650104"
          },
          {
            l: "\u6C34\u78E8\u6C9F\u533A",
            v: "650105"
          },
          {
            l: "\u5934\u5C6F\u6CB3\u533A",
            v: "650106"
          },
          {
            l: "\u8FBE\u5742\u57CE\u533A",
            v: "650107"
          },
          {
            l: "\u7C73\u4E1C\u533A",
            v: "650109"
          },
          {
            l: "\u4E4C\u9C81\u6728\u9F50\u53BF",
            v: "650121"
          }
        ],
        l: "\u4E4C\u9C81\u6728\u9F50\u5E02",
        v: "650100"
      },
      {
        c: [
          {
            l: "\u72EC\u5C71\u5B50\u533A",
            v: "650202"
          },
          {
            l: "\u514B\u62C9\u739B\u4F9D\u533A",
            v: "650203"
          },
          {
            l: "\u767D\u78B1\u6EE9\u533A",
            v: "650204"
          },
          {
            l: "\u4E4C\u5C14\u79BE\u533A",
            v: "650205"
          }
        ],
        l: "\u514B\u62C9\u739B\u4F9D\u5E02",
        v: "650200"
      },
      {
        c: [
          {
            l: "\u9AD8\u660C\u533A",
            v: "650402"
          },
          {
            l: "\u912F\u5584\u53BF",
            v: "650421"
          },
          {
            l: "\u6258\u514B\u900A\u53BF",
            v: "650422"
          }
        ],
        l: "\u5410\u9C81\u756A\u5E02",
        v: "650400"
      },
      {
        c: [
          {
            l: "\u4F0A\u5DDE\u533A",
            v: "650502"
          },
          {
            l: "\u5DF4\u91CC\u5764\u54C8\u8428\u514B\u81EA\u6CBB\u53BF",
            v: "650521"
          },
          {
            l: "\u4F0A\u543E\u53BF",
            v: "650522"
          }
        ],
        l: "\u54C8\u5BC6\u5E02",
        v: "650500"
      },
      {
        c: [
          {
            l: "\u660C\u5409\u5E02",
            v: "652301"
          },
          {
            l: "\u961C\u5EB7\u5E02",
            v: "652302"
          },
          {
            l: "\u547C\u56FE\u58C1\u53BF",
            v: "652323"
          },
          {
            l: "\u739B\u7EB3\u65AF\u53BF",
            v: "652324"
          },
          {
            l: "\u5947\u53F0\u53BF",
            v: "652325"
          },
          {
            l: "\u5409\u6728\u8428\u5C14\u53BF",
            v: "652327"
          },
          {
            l: "\u6728\u5792\u54C8\u8428\u514B\u81EA\u6CBB\u53BF",
            v: "652328"
          }
        ],
        l: "\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE",
        v: "652300"
      },
      {
        c: [
          {
            l: "\u535A\u4E50\u5E02",
            v: "652701"
          },
          {
            l: "\u963F\u62C9\u5C71\u53E3\u5E02",
            v: "652702"
          },
          {
            l: "\u7CBE\u6CB3\u53BF",
            v: "652722"
          },
          {
            l: "\u6E29\u6CC9\u53BF",
            v: "652723"
          }
        ],
        l: "\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE",
        v: "652700"
      },
      {
        c: [
          {
            l: "\u5E93\u5C14\u52D2\u5E02",
            v: "652801"
          },
          {
            l: "\u8F6E\u53F0\u53BF",
            v: "652822"
          },
          {
            l: "\u5C09\u7281\u53BF",
            v: "652823"
          },
          {
            l: "\u82E5\u7F8C\u53BF",
            v: "652824"
          },
          {
            l: "\u4E14\u672B\u53BF",
            v: "652825"
          },
          {
            l: "\u7109\u8006\u56DE\u65CF\u81EA\u6CBB\u53BF",
            v: "652826"
          },
          {
            l: "\u548C\u9759\u53BF",
            v: "652827"
          },
          {
            l: "\u548C\u7855\u53BF",
            v: "652828"
          },
          {
            l: "\u535A\u6E56\u53BF",
            v: "652829"
          },
          {
            l: "\u5E93\u5C14\u52D2\u7ECF\u6D4E\u6280\u672F\u5F00\u53D1\u533A",
            v: "652871"
          }
        ],
        l: "\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE",
        v: "652800"
      },
      {
        c: [
          {
            l: "\u963F\u514B\u82CF\u5E02",
            v: "652901"
          },
          {
            l: "\u5E93\u8F66\u5E02",
            v: "652902"
          },
          {
            l: "\u6E29\u5BBF\u53BF",
            v: "652922"
          },
          {
            l: "\u6C99\u96C5\u53BF",
            v: "652924"
          },
          {
            l: "\u65B0\u548C\u53BF",
            v: "652925"
          },
          {
            l: "\u62DC\u57CE\u53BF",
            v: "652926"
          },
          {
            l: "\u4E4C\u4EC0\u53BF",
            v: "652927"
          },
          {
            l: "\u963F\u74E6\u63D0\u53BF",
            v: "652928"
          },
          {
            l: "\u67EF\u576A\u53BF",
            v: "652929"
          }
        ],
        l: "\u963F\u514B\u82CF\u5730\u533A",
        v: "652900"
      },
      {
        c: [
          {
            l: "\u963F\u56FE\u4EC0\u5E02",
            v: "653001"
          },
          {
            l: "\u963F\u514B\u9676\u53BF",
            v: "653022"
          },
          {
            l: "\u963F\u5408\u5947\u53BF",
            v: "653023"
          },
          {
            l: "\u4E4C\u6070\u53BF",
            v: "653024"
          }
        ],
        l: "\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE",
        v: "653000"
      },
      {
        c: [
          {
            l: "\u5580\u4EC0\u5E02",
            v: "653101"
          },
          {
            l: "\u758F\u9644\u53BF",
            v: "653121"
          },
          {
            l: "\u758F\u52D2\u53BF",
            v: "653122"
          },
          {
            l: "\u82F1\u5409\u6C99\u53BF",
            v: "653123"
          },
          {
            l: "\u6CFD\u666E\u53BF",
            v: "653124"
          },
          {
            l: "\u838E\u8F66\u53BF",
            v: "653125"
          },
          {
            l: "\u53F6\u57CE\u53BF",
            v: "653126"
          },
          {
            l: "\u9EA6\u76D6\u63D0\u53BF",
            v: "653127"
          },
          {
            l: "\u5CB3\u666E\u6E56\u53BF",
            v: "653128"
          },
          {
            l: "\u4F3D\u5E08\u53BF",
            v: "653129"
          },
          {
            l: "\u5DF4\u695A\u53BF",
            v: "653130"
          },
          {
            l: "\u5854\u4EC0\u5E93\u5C14\u5E72\u5854\u5409\u514B\u81EA\u6CBB\u53BF",
            v: "653131"
          }
        ],
        l: "\u5580\u4EC0\u5730\u533A",
        v: "653100"
      },
      {
        c: [
          {
            l: "\u548C\u7530\u5E02",
            v: "653201"
          },
          {
            l: "\u548C\u7530\u53BF",
            v: "653221"
          },
          {
            l: "\u58A8\u7389\u53BF",
            v: "653222"
          },
          {
            l: "\u76AE\u5C71\u53BF",
            v: "653223"
          },
          {
            l: "\u6D1B\u6D66\u53BF",
            v: "653224"
          },
          {
            l: "\u7B56\u52D2\u53BF",
            v: "653225"
          },
          {
            l: "\u4E8E\u7530\u53BF",
            v: "653226"
          },
          {
            l: "\u6C11\u4E30\u53BF",
            v: "653227"
          }
        ],
        l: "\u548C\u7530\u5730\u533A",
        v: "653200"
      },
      {
        c: [
          {
            l: "\u4F0A\u5B81\u5E02",
            v: "654002"
          },
          {
            l: "\u594E\u5C6F\u5E02",
            v: "654003"
          },
          {
            l: "\u970D\u5C14\u679C\u65AF\u5E02",
            v: "654004"
          },
          {
            l: "\u4F0A\u5B81\u53BF",
            v: "654021"
          },
          {
            l: "\u5BDF\u5E03\u67E5\u5C14\u9521\u4F2F\u81EA\u6CBB\u53BF",
            v: "654022"
          },
          {
            l: "\u970D\u57CE\u53BF",
            v: "654023"
          },
          {
            l: "\u5DE9\u7559\u53BF",
            v: "654024"
          },
          {
            l: "\u65B0\u6E90\u53BF",
            v: "654025"
          },
          {
            l: "\u662D\u82CF\u53BF",
            v: "654026"
          },
          {
            l: "\u7279\u514B\u65AF\u53BF",
            v: "654027"
          },
          {
            l: "\u5C3C\u52D2\u514B\u53BF",
            v: "654028"
          }
        ],
        l: "\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE",
        v: "654000"
      },
      {
        c: [
          {
            l: "\u5854\u57CE\u5E02",
            v: "654201"
          },
          {
            l: "\u4E4C\u82CF\u5E02",
            v: "654202"
          },
          {
            l: "\u989D\u654F\u53BF",
            v: "654221"
          },
          {
            l: "\u6C99\u6E7E\u53BF",
            v: "654223"
          },
          {
            l: "\u6258\u91CC\u53BF",
            v: "654224"
          },
          {
            l: "\u88D5\u6C11\u53BF",
            v: "654225"
          },
          {
            l: "\u548C\u5E03\u514B\u8D5B\u5C14\u8499\u53E4\u81EA\u6CBB\u53BF",
            v: "654226"
          }
        ],
        l: "\u5854\u57CE\u5730\u533A",
        v: "654200"
      },
      {
        c: [
          {
            l: "\u963F\u52D2\u6CF0\u5E02",
            v: "654301"
          },
          {
            l: "\u5E03\u5C14\u6D25\u53BF",
            v: "654321"
          },
          {
            l: "\u5BCC\u8574\u53BF",
            v: "654322"
          },
          {
            l: "\u798F\u6D77\u53BF",
            v: "654323"
          },
          {
            l: "\u54C8\u5DF4\u6CB3\u53BF",
            v: "654324"
          },
          {
            l: "\u9752\u6CB3\u53BF",
            v: "654325"
          },
          {
            l: "\u5409\u6728\u4E43\u53BF",
            v: "654326"
          }
        ],
        l: "\u963F\u52D2\u6CF0\u5730\u533A",
        v: "654300"
      },
      {
        c: [
          {
            l: "\u77F3\u6CB3\u5B50\u5E02",
            v: "659001"
          },
          {
            l: "\u963F\u62C9\u5C14\u5E02",
            v: "659002"
          },
          {
            l: "\u56FE\u6728\u8212\u514B\u5E02",
            v: "659003"
          },
          {
            l: "\u4E94\u5BB6\u6E20\u5E02",
            v: "659004"
          },
          {
            l: "\u5317\u5C6F\u5E02",
            v: "659005"
          },
          {
            l: "\u94C1\u95E8\u5173\u5E02",
            v: "659006"
          },
          {
            l: "\u53CC\u6CB3\u5E02",
            v: "659007"
          },
          {
            l: "\u53EF\u514B\u8FBE\u62C9\u5E02",
            v: "659008"
          },
          {
            l: "\u6606\u7389\u5E02",
            v: "659009"
          },
          {
            l: "\u80E1\u6768\u6CB3\u5E02",
            v: "659010"
          }
        ],
        l: "\u81EA\u6CBB\u533A\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212",
        v: "659000"
      }
    ],
    l: "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A",
    v: "650000"
  }
];
var state_vue_vue_type_style_index_0_lang = "";
const _sfc_main$h = {
  name: "ng-state",
  data() {
    return {
      areas: AreaData,
      provinces: [],
      citys: [],
      districts: [],
      dataForm: {
        province: "",
        city: "",
        district: ""
      }
    };
  },
  props: {
    value: {
      type: String
    },
    record: {
      type: Object,
      required: true
    },
    formConfig: {
      type: Object,
      required: false
    },
    models: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    isDragPanel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxLevel() {
      return this.record && this.record.options ? this.record.options.maxLevel : 3;
    },
    oneByOne() {
      return this.record && this.record.options ? this.record.options.oneByOne : false;
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    value(val) {
      let currValue = "";
      if (this.maxLevel == 1) {
        currValue = this.dataForm.province;
      } else if (this.maxLevel == 2) {
        currValue = this.dataForm.city;
      } else if (this.maxLevel == 3) {
        currValue = this.dataForm.district;
      }
      if (val != currValue) {
        this.init();
      } else {
        this.updateStateLabel(val);
      }
    }
  },
  methods: {
    validator() {
    },
    updateStateLabel() {
      const str_ = this.getLabel();
      if (this.record && this.record.model) {
        this.models[this.record.model + "_label"] = str_;
      }
    },
    getLabel() {
      let address = [];
      const val = this.value;
      const fs_ = (areas) => {
        areas.forEach((t) => {
          if (t.v == val) {
            address.push(t.l);
          } else if (val && val.indexOf(t.v.replace(/0+$/, "")) == 0 && t.c && t.c.length > 0) {
            address.push(t.l);
            fs_(t.c);
          }
        });
      };
      fs_(AreaData);
      let separator = this.record ? this.record.options.separator : null;
      if (separator == null || separator == void 0) {
        separator = "";
      }
      let str_ = "";
      if (!this.record || this.record.options.showAllPath) {
        str_ = address.join(separator);
      } else {
        str_ = address.length > 0 ? address[address.length - 1] : "";
      }
      return str_;
    },
    init() {
      this.provinces = this.areas;
      if (this.value) {
        this.dataForm.province = this.value.substr(0, 2) + "0000";
        this.dataForm.city = this.value.substr(0, 4) + "00";
        this.dataForm.district = this.value;
        this.changeProvince(this.dataForm.province, 1);
        this.changeCity(this.dataForm.city, 1);
        this.changeDistrict(this.dataForm.district, 1);
        if (this.record && !this.models[this.record.model + "_label"]) {
          this.$nextTick(() => {
            this.updateStateLabel(this.value);
          });
        }
      }
    },
    getOrgs(pid) {
      return new Promise((resolve, reject) => {
        const ds = this.getOrgChild(pid);
        resolve(ds);
      });
    },
    getOrgChild(pid) {
      if (!pid) {
        return this.areas.map((t) => {
          return { v: t.v, l: t.t };
        });
      }
      let datas = [];
      const fn = (data2) => {
        for (let i = 0; i < data2.length; i++) {
          if (data2[i].v == pid) {
            datas = data2[i].c;
            break;
          } else if (data2[i].c && data2[i].c.length > 0) {
            fn(data2[i].c);
          }
        }
      };
      fn(this.areas);
      return datas;
    },
    changeProvince(v, type) {
      if (!type) {
        this.dataForm.city = "";
        this.dataForm.district = "";
      }
      this.districts = [];
      if (v) {
        this.getOrgs(v).then((data2) => {
          this.citys = data2;
        }).catch(() => {
          this.citys = [];
        });
      } else {
        this.citys = [];
      }
      if (!type) {
        if (this.maxLevel == 1) {
          this.$emit("input", v);
        } else {
          this.$emit("input", "");
        }
      }
    },
    changeCity(v, type) {
      if (!type) {
        this.dataForm.district = "";
      }
      if (v) {
        this.getOrgs(v).then((data2) => {
          this.districts = data2;
        }).catch(() => {
          this.districts = [];
        });
        if (!type) {
          if (this.maxLevel == 2) {
            this.$emit("input", v);
          } else {
            this.$emit("input", "");
          }
        }
      } else {
        this.districts = [];
        if (!type) {
          this.$emit("input", "");
        }
      }
    },
    changeDistrict(v, type) {
      if (type)
        return;
      if (v) {
        if (this.maxLevel == 3) {
          this.$emit("input", v);
        }
      } else {
        this.$emit("input", "");
      }
    }
  }
};
const _hoisted_1$d = {
  key: 0,
  class: "ng-application-state"
};
const _hoisted_2$b = /* @__PURE__ */ createElementVNode("span", null, "\u7701\u4EFD:", -1);
const _hoisted_3$8 = /* @__PURE__ */ createElementVNode("span", null, "\u5730\u5E02:", -1);
const _hoisted_4$7 = /* @__PURE__ */ createElementVNode("span", null, "\u533A\u53BF:", -1);
const _hoisted_5$6 = { key: 1 };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  return !$props.preview || $props.isDragPanel ? (openBlock(), createElementBlock("div", _hoisted_1$d, [
    createVNode(_component_el_select, {
      class: "width-select",
      modelValue: $data.dataForm.province,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.dataForm.province = $event),
      "value-key": "value",
      filterable: "",
      clearable: "",
      placeholder: "\u8BF7\u9009\u62E9\u7701\u4EFD",
      onChange: $options.changeProvince,
      onClear: _cache[1] || (_cache[1] = ($event) => $options.changeProvince()),
      disabled: $props.disabled
    }, {
      prefix: withCtx(() => [
        _hoisted_2$b
      ]),
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.provinces, (item) => {
          return openBlock(), createBlock(_component_el_option, {
            key: item.v,
            label: item.l,
            value: item.v
          }, null, 8, ["label", "value"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["modelValue", "onChange", "disabled"]),
    $options.maxLevel > 1 && (!$options.oneByOne || $data.dataForm.province) ? (openBlock(), createBlock(_component_el_select, {
      key: 0,
      class: "width-select",
      modelValue: $data.dataForm.city,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.dataForm.city = $event),
      "value-key": "value",
      filterable: "",
      clearable: "",
      placeholder: "\u8BF7\u9009\u62E9\u5730\u5E02",
      onChange: $options.changeCity,
      onClear: _cache[3] || (_cache[3] = ($event) => $options.changeCity()),
      disabled: $props.disabled
    }, {
      prefix: withCtx(() => [
        _hoisted_3$8
      ]),
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.citys, (item) => {
          return openBlock(), createBlock(_component_el_option, {
            key: item.v,
            label: item.l,
            value: item.v
          }, null, 8, ["label", "value"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["modelValue", "onChange", "disabled"])) : createCommentVNode("", true),
    $options.maxLevel > 2 && (!$options.oneByOne || $data.dataForm.city) ? (openBlock(), createBlock(_component_el_select, {
      key: 1,
      class: "width-select",
      modelValue: $data.dataForm.district,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.dataForm.district = $event),
      "value-key": "value",
      filterable: "",
      clearable: "",
      placeholder: "\u8BF7\u9009\u62E9\u533A\u53BF",
      onChange: $options.changeDistrict,
      onClear: _cache[5] || (_cache[5] = ($event) => $options.changeDistrict()),
      disabled: $props.disabled
    }, {
      prefix: withCtx(() => [
        _hoisted_4$7
      ]),
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.districts, (item) => {
          return openBlock(), createBlock(_component_el_option, {
            key: item.v,
            label: item.l,
            value: item.v
          }, null, 8, ["label", "value"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["modelValue", "onChange", "disabled"])) : createCommentVNode("", true)
  ])) : (openBlock(), createElementBlock("div", _hoisted_5$6, [
    createElementVNode("span", null, toDisplayString($props.models[$props.record.model + "_label"]), 1)
  ]));
}
var NgState = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
const _sfc_main$g = {
  mixins: [mixin$1],
  components: {
    NgState
  },
  mounted() {
  }
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_state = resolveComponent("ng-state");
  return openBlock(), createBlock(_component_ng_state, {
    modelValue: _ctx.models[_ctx.record.model],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models[_ctx.record.model] = $event),
    preview: _ctx.preview,
    models: _ctx.models,
    record: _ctx.record,
    config: _ctx.config,
    disabled: _ctx.recordDisabled
  }, null, 8, ["modelValue", "preview", "models", "record", "config", "disabled"]);
}
var BaseIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
const obj = {};
obj.type = "state";
obj.component = BaseIndex;
obj.seq = 1;
obj.options = {
  config: {
    size: "small",
    labelWidth: 80
  },
  columns: [
    {
      label: "\u6807\u7B7E",
      prop: "label",
      default: "\u533A\u5212\u9009\u62E9",
      span: 24
    },
    {
      label: "\u6807\u7B7E\u5BBD\u5EA6",
      prop: "labelWidth",
      type: "number",
      min: -1,
      max: 1e3,
      default: -1,
      span: 24
    },
    {
      label: "\u8981\u7D20\u5BBD\u5EA6",
      prop: "width",
      default: "100%",
      span: 24
    },
    {
      label: "\u6240\u5360\u6805\u683C",
      type: "slider",
      prop: "span",
      min: 1,
      max: 24,
      default: 24,
      span: 24
    },
    {
      label: "\u6570\u636E\u5B57\u6BB5",
      prop: "model",
      span: 24
    },
    {
      label: "\u6570\u636EKEY",
      prop: "key",
      show: false,
      span: 24
    },
    {
      type: "divider",
      label: "\u6548\u9A8C\u89C4\u5219"
    },
    {
      prop: "rules",
      type: "rules",
      labelWidth: 0,
      default: [{
        required: false,
        message: "\u5FC5\u586B\u9879",
        trigger: ["blur", "change"]
      }],
      span: 24
    }
  ],
  group: [
    {
      label: "\u5C5E\u6027",
      prop: "options",
      alone: true,
      collapse: false,
      column: [
        {
          label: "\u9ED8\u8BA4\u503C",
          prop: "defaultValue",
          show: false,
          span: 24
        },
        {
          label: "\u533A\u5212\u5C42\u7EA7",
          prop: "maxLevel",
          default: 3,
          span: 24,
          type: "select",
          dicData: [
            { value: 1, label: "\u7701" },
            { value: 2, label: "\u5730\u5E02" },
            { value: 3, label: "\u533A\u53BF" }
          ]
        },
        {
          label: "\u9012\u8FDB\u5F0F\u663E\u793A",
          prop: "oneByOne",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u56DE\u663E\u8DEF\u5F84",
          prop: "showAllPath",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u8DEF\u5F84\u5206\u9694\u7B26",
          prop: "separator",
          show: "$.options.showAllPath",
          default: "/",
          span: 24
        },
        {
          label: "\u662F\u5426\u9690\u85CF",
          prop: "hidden",
          type: "switch",
          default: false,
          span: 24
        },
        {
          label: "\u662F\u5426\u7981\u7528",
          prop: "disabled",
          type: "switch",
          default: false,
          span: 24
        }
      ]
    }
  ]
};
let list$1 = [];
list$1.push(obj);
list$1 = list$1.sort(function(a, b) {
  return a.seq - b.seq;
});
var applicationConfig = {
  type: "application",
  name: "\u5E94\u7528\u7EC4\u4EF6",
  icon: "icon-tradingdata",
  list: list$1
};
var NgConstants = {
  itemConfig: null
};
const list = [baseConfig, decorateConfig, layoutConfig, applicationConfig];
let itemConfig = {};
list.forEach((t) => {
  t.list.forEach((n) => {
    const nclone = cloneDeep(n);
    delete nclone.component;
    delete nclone.properties;
    itemConfig[n.type] = nclone;
  });
});
NgConstants.itemConfig = itemConfig;
list.forEach((t) => {
  t.list = translateConfig(t.list);
});
const _sfc_main$f = {
  name: "ng-form-item-node",
  data() {
    return {
      items: list
    };
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    models: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    isDragPanel: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object
    }
  },
  inject: {
    customComponents: {
      from: "customC",
      default: () => []
    },
    config: {
      from: "configC",
      default: () => ({})
    }
  },
  computed: {
    customComponent() {
      if (this.customComponents && this.customComponents.length > 0) {
        const cs = this.customComponents.filter((t) => t.type == this.record.type);
        if (cs && cs.length > 0) {
          return cs[0].component;
        }
      }
      const selectItemType = this.record.type;
      if (this.items && this.items.length > 0) {
        for (let i = 0; i < this.items.length; i++) {
          const itemList = this.items[i];
          if (itemList.list && itemList.list.length > 0) {
            const fs = itemList.list.filter((t) => t.type == selectItemType);
            if (fs && fs.length > 0) {
              return fs[0].component;
            }
          }
        }
      }
      return null;
    },
    listenModelValue() {
      if (!this.isDragPanel && this.record.options.listenModel && this.record.options.listenModelData) {
        const lmodels = this.record.options.listenModelData.split(",");
        let vs = [];
        for (let i = 0; i < lmodels.length; i++) {
          const ld = lmodels[i];
          if (ld && ld.trim()) {
            vs.push(this.models[ld.trim()]);
          }
        }
        return vs.join(",");
      }
      return null;
    }
  },
  watch: {
    listenModelValue: {
      handler(val, oldVal) {
        if (this.isDragPanel || !this.models || !this.record.options.listenModel || !this.record.options.listenModelData || !this.record.options.listenModelScript)
          return;
        dynamicVoidFun(this.record.options.listenModelScript, this.models);
      },
      immediate: true
    }
  },
  methods: {
    handleSelectItem(item) {
      this.$emit("handleSelectItem", item);
    },
    handleFocus(e) {
      const focusEventScript = this.record.options.focusEvent;
      if (!focusEventScript)
        return;
      dynamicVoidFun(focusEventScript, this.models);
    },
    handleBlur(e) {
      const blurEventScript = this.record.options.blurEvent;
      if (!blurEventScript)
        return;
      dynamicVoidFun(blurEventScript, this.models);
    }
  }
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($options.customComponent), {
    record: $props.record,
    style: normalizeStyle({
      margin: $props.record.margin && $props.record.margin.length > 0 ? $props.record.margin.join("px ") + "px" : "0px",
      borderRadius: ($props.record.itemBorderRadius ? $props.record.itemBorderRadius : 0) + "px",
      backgroundColor: $props.record.backgroundColor ? $props.record.backgroundColor : ""
    }),
    disabled: $props.disabled,
    preview: $props.preview,
    isDragPanel: $props.isDragPanel,
    selectItem: $props.selectItem,
    models: $props.models,
    onHandleSelectItem: $options.handleSelectItem,
    onHandleFocus: $options.handleFocus,
    onHandleBlur: $options.handleBlur
  }, null, 8, ["record", "style", "disabled", "preview", "isDragPanel", "selectItem", "models", "onHandleSelectItem", "onHandleFocus", "onHandleBlur"]);
}
var NgFormItemNode = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
const _sfc_main$e = {
  name: "ng-form-item",
  components: {
    ItemNode: NgFormItemNode
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    models: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    isDragPanel: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    propPrepend: {
      type: String
    }
  },
  inject: {
    customComponents: {
      from: "customC",
      default: () => []
    },
    config: {
      from: "configC",
      default: () => ({})
    }
  },
  computed: {
    isLayout() {
      return this.record.layout;
    },
    label() {
      if (!this.showLabel)
        return null;
      let labelWidth = this.config.labelWidth;
      if (this.record.options && this.record.options.labelWidth >= 0) {
        labelWidth = this.record.options.labelWidth;
      }
      if (this.record.labelWidth >= 0) {
        labelWidth = this.record.labelWidth;
      }
      if (labelWidth > 0) {
        return this.record.label;
      }
      return null;
    },
    labelWidth() {
      if (!this.showLabel)
        return "0px";
      let labelWidth = this.config.labelWidth;
      if (this.record.options && this.record.options.labelWidth >= 0) {
        labelWidth = this.record.options.labelWidth;
      }
      if (this.record.labelWidth >= 0) {
        labelWidth = this.record.labelWidth;
      }
      return labelWidth + "px";
    },
    recordProps() {
      if (this.recordRules && this.recordRules.length > 0) {
        if (this.propPrepend) {
          return this.propPrepend + this.record.model;
        } else {
          return this.record.model;
        }
      }
      return null;
    },
    showRequiredMark() {
      const fstr = this.record.options.showRequiredMarkScript;
      if (!fstr) {
        return false;
      }
      const mark = dynamicFun(fstr, this.models);
      return mark;
    },
    recordVisible() {
      if (this.isDragPanel) {
        return true;
      }
      if (this.record.options && this.record.options.hidden) {
        return false;
      }
      if (!this.record.options || !this.record.options.dynamicVisible || !this.record.options.dynamicVisibleValue) {
        return true;
      }
      let fstr = this.record.options.dynamicVisibleValue;
      const func = dynamicFun(fstr, this.models);
      return func;
    },
    recordRules() {
      if (!this.record.rules || this.record.rules.length == 0) {
        return [];
      }
      let rules = cloneDeep(this.record.rules);
      const isRequire = rules[0].required;
      for (var i = 0; i < rules.length; i++) {
        const t = rules[i];
        if (isRequire && (this.record.type == "input" || this.record.type == "textarea")) {
          t.whitespace = true;
        }
        if (t.vtype == 1 || t.vtype == 2) {
          t.validator = this.validatorFiled;
        }
        if (!t.trigger) {
          t.trigger = ["change", "blur"];
        }
      }
      return rules;
    },
    recordRequired() {
      if (this.config.hideRequiredMark || !this.config.syncLabelRequired) {
        return false;
      }
      let rules = this.record.rules;
      if (!rules || rules.length == 0)
        return false;
      const isRequire = rules[0].required;
      if (isRequire) {
        return true;
      }
      const value = this.models[this.record.model];
      for (var i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.vtype == 1) {
          if (!rule.pattern) {
            continue;
          }
          const patt1 = new RegExp(rule.pattern);
          if (!patt1.test(value)) {
            return true;
          }
        } else if (rule.vtype == 2) {
          const script = rule.script;
          const fvalue = dynamicFun(script, this.models);
          if (!fvalue) {
            return true;
          }
        }
      }
      return false;
    }
  },
  methods: {
    handleSelectItem(item) {
      this.$emit("handleSelectItem", item);
    },
    validatorFiled(rule, value, callback) {
      if (rule.vtype == 1) {
        if (!rule.pattern) {
          callback();
          return;
        }
        var patt1 = new RegExp(rule.pattern);
        if (patt1.test(value)) {
          callback();
        } else {
          callback(new Error(rule.message));
        }
        return;
      } else if (rule.vtype == 2) {
        const script = rule.script;
        const fvalue = dynamicFun(script, this.models);
        if (!fvalue) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  },
  mounted() {
  }
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ItemNode = resolveComponent("ItemNode");
  const _component_el_form_item = resolveComponent("el-form-item");
  return $options.isLayout && $options.recordVisible ? (openBlock(), createBlock(_component_ItemNode, {
    key: 0,
    record: $props.record,
    disabled: $props.disabled,
    preview: $props.preview,
    isDragPanel: $props.isDragPanel,
    selectItem: $props.selectItem,
    models: $props.models,
    onHandleSelectItem: $options.handleSelectItem
  }, null, 8, ["record", "disabled", "preview", "isDragPanel", "selectItem", "models", "onHandleSelectItem"])) : $options.recordVisible ? (openBlock(), createBlock(_component_el_form_item, {
    key: 1,
    label: $options.label,
    rules: $options.recordRules,
    prop: $options.recordProps,
    required: $options.recordRequired,
    id: $props.record.model,
    name: $props.record.model,
    "label-width": $options.labelWidth
  }, {
    default: withCtx(() => [
      createVNode(_component_ItemNode, {
        record: $props.record,
        disabled: $props.disabled,
        preview: $props.preview,
        isDragPanel: $props.isDragPanel,
        selectItem: $props.selectItem,
        models: $props.models,
        onHandleSelectItem: $options.handleSelectItem
      }, null, 8, ["record", "disabled", "preview", "isDragPanel", "selectItem", "models", "onHandleSelectItem"])
    ]),
    _: 1
  }, 8, ["label", "rules", "prop", "required", "id", "name", "label-width"])) : createCommentVNode("", true);
}
var NgFormItem = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
var node_vue_vue_type_style_index_0_lang = "";
const _sfc_main$d = {
  name: "ng-form-node",
  components: {
    Item: NgFormItem
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      default: () => {
      }
    },
    isDrag: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    models: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      refreshKey: 1
    };
  },
  computed: {},
  created() {
    if (this.record.type == "controller" && !this.record.list) {
      this.record["list"] = [];
    }
  },
  activated() {
  },
  mounted() {
  },
  methods: {
    handleSelectItem(rec, index2) {
      this.$emit("handleSelectItem", rec, index2 + 1);
    },
    handleRefresh() {
      this.refreshKey++;
    }
  }
};
const _hoisted_1$c = {
  class: "form-item-box",
  style: { "height": "100%", "width": "100%" }
};
const _hoisted_2$a = ["textContent"];
const _hoisted_3$7 = { class: "node-control" };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Item = resolveComponent("Item");
  const _component_DocumentCopy = resolveComponent("DocumentCopy");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_col = resolveComponent("el-col");
  return openBlock(), createBlock(_component_el_col, {
    span: $props.record.span || 24
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass({ "active": $props.selectItem && $props.record.key === $props.selectItem.key, "drag-box": $props.isDrag, "node-item": $props.isDrag }),
        onClick: _cache[6] || (_cache[6] = withModifiers(($event) => $options.handleSelectItem($props.record), ["stop"]))
      }, [
        createElementVNode("div", _hoisted_1$c, [
          (openBlock(), createBlock(_component_Item, {
            models: $props.models,
            record: $props.record,
            isDragPanel: $props.isDrag,
            selectItem: $props.selectItem,
            preview: $props.preview,
            key: $data.refreshKey,
            onSubmit: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("submit")),
            onReset: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("reset")),
            onHandleSelectItem: $options.handleSelectItem,
            onHandleCopy: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("handleCopy")),
            onHandleDetele: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("handleDetele"))
          }, null, 8, ["models", "record", "isDragPanel", "selectItem", "preview", "onHandleSelectItem"]))
        ]),
        $props.isDrag ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("div", {
            class: "key-box",
            textContent: toDisplayString($props.record.model)
          }, null, 8, _hoisted_2$a),
          createElementVNode("div", _hoisted_3$7, [
            createElementVNode("div", {
              class: normalizeClass(["copy pointer", $props.selectItem && $props.record.key === $props.selectItem.key ? "active" : "unactivated"]),
              title: "\u590D\u5236",
              onClick: _cache[4] || (_cache[4] = withModifiers(($event) => _ctx.$emit("handleCopy"), ["stop"]))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_DocumentCopy)
                ]),
                _: 1
              })
            ], 2),
            createElementVNode("div", {
              class: normalizeClass(["delete pointer", $props.selectItem && $props.record.key === $props.selectItem.key ? "active" : "unactivated"]),
              title: "\u5220\u9664",
              onClick: _cache[5] || (_cache[5] = withModifiers(($event) => _ctx.$emit("handleDetele"), ["stop"]))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_Delete)
                ]),
                _: 1
              })
            ], 2)
          ])
        ], 64)) : createCommentVNode("", true)
      ], 2)
    ]),
    _: 1
  }, 8, ["span"]);
}
var NgFormNode = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
var build_vue_vue_type_style_index_0_lang = "";
const _sfc_main$c = {
  name: "ng-form-build",
  components: {
    Node: NgFormNode
  },
  data() {
    return {
      randomId: new Date().getTime() + "111"
    };
  },
  props: {
    formTemplate: {
      type: Object,
      required: true
    },
    config: {
      type: Object
    },
    models: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    preview: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    renderPreview: {
      type: Boolean,
      default: false
    },
    customComponents: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    templateConfig() {
      if (this.formTemplate)
        return this.formTemplate.config;
      return {};
    },
    httpConfig() {
      if (this.config && this.config.httpConfig) {
        return this.config.httpConfig;
      }
      return null;
    }
  },
  watch: {
    httpConfig: {
      handler(newVal) {
        window.nghttpConfig = newVal;
      },
      deep: true,
      immediate: false
    }
  },
  provide: function() {
    return {
      customC: this.customComponents,
      configC: this.templateConfig,
      httpConfigC: this.httpConfig,
      ngConfig: this.config
    };
  },
  created() {
    if (this.httpConfig) {
      window.nghttpConfig = this.httpConfig;
    }
  },
  methods: {
    reset() {
      this.$refs.form && this.$refs.form.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (this.$refs.form) {
          this.$refs.form.validate((valid, values) => {
            resolve(valid, values);
          });
        } else {
          reject();
        }
      });
    },
    getData(async = true) {
      const data2 = cloneDeep(this.models);
      this.clearHiddenValue(data2);
      if (!async) {
        return new Promise((resolve, reject) => {
          this.$refs.form && this.$refs.form.validate((valid, values) => {
            if (!valid) {
              reject("\u9A8C\u8BC1\u5931\u8D25");
            }
            resolve(data2);
          });
        });
      }
      return data2;
    },
    clearHiddenValue(data2) {
      if (!this.formTemplate.config || !this.formTemplate.config.outputHidden) {
        const formdesign = document.getElementById(this.randomId);
        console.log("formdesign", formdesign);
        for (let key in data2) {
          if (key.indexOf("_label") > 0)
            continue;
          const key_div = formdesign.querySelector("#" + key);
          if (!key_div) {
            delete data2[key];
            delete data2[key + "_label"];
          }
        }
      }
    }
  }
};
const _hoisted_1$b = { class: "form-build-panel" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Node = resolveComponent("Node");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    $props.formTemplate && $props.formTemplate.config && $props.formTemplate.list ? (openBlock(), createBlock(_component_el_form, {
      key: 0,
      "label-width": $props.formTemplate.config.labelWidth + "px",
      class: "ng-form-build",
      "label-position": $props.formTemplate.config.labelPosition,
      "hide-required-asterisk": $props.formTemplate.config.hideRequiredMark,
      "label-suffix": $props.formTemplate.config.labelSuffix,
      ref: "form",
      style: normalizeStyle($props.formTemplate.config.customStyle),
      size: $props.formTemplate.config.size,
      model: $props.models,
      disabled: $props.disabled,
      id: $data.randomId
    }, {
      default: withCtx(() => [
        createVNode(_component_el_row, {
          gutter: 20,
          class: "row"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.formTemplate.list, (record) => {
              return openBlock(), createBlock(_component_Node, {
                key: record.key,
                record,
                models: $props.models,
                disabled: $props.disabled,
                preview: $props.preview || $props.renderPreview,
                isDrag: false
              }, null, 8, ["record", "models", "disabled", "preview"]);
            }), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["label-width", "label-position", "hide-required-asterisk", "label-suffix", "style", "size", "model", "disabled", "id"])) : createCommentVNode("", true)
  ]);
}
var NgFormBuild = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const _sfc_main$b = {
  name: "ng-form-preview",
  data() {
    return {
      visible: false,
      renderVisisble: false,
      previewWidth: 850,
      models: {},
      formTemplate: {},
      key: "1",
      preview: false,
      dataVisible: false,
      dataJson: ""
    };
  },
  components: {
    FormBuild: NgFormBuild
  },
  inject: {
    customComponents: {
      from: "customC",
      default: () => []
    },
    ngConfig: {
      from: "ngConfig",
      default: () => {
        return {};
      }
    }
  },
  methods: {
    init(data2) {
      console.log("data", data2);
      this.formTemplate.list = data2.list;
      this.formTemplate.config = data2.config;
      this.models = {};
      this.key = "key" + new Date().getTime();
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.formBuild.reset();
      });
    },
    handleGetData() {
      const models_ = this.$refs.formBuild.getData(true);
      this.dataJson = JSON.stringify(models_, null, "	");
      this.dataVisible = true;
    },
    handleValidator() {
      this.$refs.formBuild.validate();
    },
    handleView() {
      this.preview = !this.preview;
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
const _hoisted_1$a = { class: "item-main" };
const _hoisted_2$9 = { class: "dialog-footer" };
const _hoisted_3$6 = /* @__PURE__ */ createTextVNode("\u53D6\u6D88");
const _hoisted_4$6 = /* @__PURE__ */ createTextVNode("\u6548\u9A8C");
const _hoisted_5$5 = /* @__PURE__ */ createTextVNode("\u83B7\u53D6\u6570\u636E");
const _hoisted_6$5 = { class: "json-box" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormBuild = resolveComponent("FormBuild");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_dialog = resolveComponent("el-dialog");
  return openBlock(), createBlock(_component_el_dialog, {
    title: "\u9884\u89C8",
    modelValue: $data.visible,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.visible = $event),
    style: { "top": "20px" },
    "append-to-body": true,
    class: "design-preview",
    "close-on-click-modal": false,
    "destroy-on-close": true,
    width: "800px"
  }, {
    footer: withCtx(() => [
      createElementVNode("span", _hoisted_2$9, [
        createVNode(_component_el_button, {
          size: "small",
          onClick: $options.handleCancel
        }, {
          default: withCtx(() => [
            _hoisted_3$6
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          type: "primary",
          size: "small",
          onClick: $options.handleValidator
        }, {
          default: withCtx(() => [
            _hoisted_4$6
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          type: "primary",
          size: "small",
          onClick: $options.handleGetData
        }, {
          default: withCtx(() => [
            _hoisted_5$5
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          type: "primary",
          size: "small",
          onClick: $options.handleView
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($data.preview ? "\u586B\u62A5\u6A21\u5F0F" : "\u67E5\u770B\u6A21\u5F0F"), 1)
          ]),
          _: 1
        }, 8, ["onClick"])
      ])
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$a, [
        (openBlock(), createBlock(_component_FormBuild, {
          key: $data.key,
          preview: $data.preview,
          formTemplate: $data.formTemplate,
          models: $data.models,
          config: $options.ngConfig,
          ref: "formBuild",
          customComponents: $options.customComponents
        }, null, 8, ["preview", "formTemplate", "models", "config", "customComponents"]))
      ]),
      createVNode(_component_el_dialog, {
        title: "\u6570\u636E\u67E5\u770B",
        modelValue: $data.dataVisible,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.dataVisible = $event),
        style: { "top": "20px" },
        "append-to-body": true,
        class: "data-preview",
        "close-on-click-modal": false,
        "destroy-on-close": true,
        width: "600px"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_6$5, [
            createVNode(_component_el_input, {
              style: { "min-height": "300px", "height": "300px", "max-height": "290px", "overflow": "auto" },
              autosize: "",
              readonly: "",
              ref: "dataJson",
              type: "textarea",
              value: $data.dataJson
            }, null, 8, ["value"])
          ])
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
var Preview = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const _sfc_main$a = {
  name: "ng-form-code",
  data() {
    return {
      visible: false,
      jsonCode: "",
      fileFormat: "json",
      edit: false
    };
  },
  methods: {
    init(model, edit = false) {
      this.visible = true;
      this.edit = edit;
      this.$nextTick(() => {
        this.jsonCode = JSON.stringify(model, null, "	");
      });
    },
    handleCancel() {
      this.visible = false;
    },
    handleImp() {
      if (!this.jsonCode) {
        alert("\u6587\u672C\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      try {
        const importData = JSON.parse(this.jsonCode);
        if (importData && typeof importData == "object") {
          this.$emit("imp", importData);
          this.handleCancel();
        } else {
          this.$message.error("\u6A21\u677F\u89E3\u6790\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5\u6587\u672C\u5185\u5BB9.");
          return;
        }
      } catch (error) {
        this.$message.error("\u6A21\u677F\u89E3\u6790\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5\u6587\u672C\u5185\u5BB9.");
        return;
      }
    },
    exportData(data2, fileName = `ng-form-template.${this.fileFormat}`) {
      let content = "data:text/csv;charset=utf-8,";
      content += data2;
      var encodedUri = encodeURI(content);
      var actions = document.createElement("a");
      actions.setAttribute("href", encodedUri);
      actions.setAttribute("download", fileName);
      actions.click();
    },
    handleExportJson() {
      this.exportData(this.jsonCode);
    }
  }
};
const _hoisted_1$9 = { class: "json-box" };
const _hoisted_2$8 = {
  key: 0,
  class: "copy-btn-box"
};
const _hoisted_3$5 = /* @__PURE__ */ createTextVNode(" \u5BFC\u51FA\u4EE3\u7801 ");
const _hoisted_4$5 = { class: "dialog-footer" };
const _hoisted_5$4 = /* @__PURE__ */ createTextVNode("\u5173\u95ED");
const _hoisted_6$4 = /* @__PURE__ */ createTextVNode("\u5BFC\u5165");
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");
  return openBlock(), createBlock(_component_el_dialog, {
    title: "\u6A21\u677F\u6570\u636E",
    modelValue: $data.visible,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.visible = $event),
    "append-to-body": true,
    style: { "top": "20px" },
    width: "850px"
  }, {
    footer: withCtx(() => [
      createElementVNode("span", _hoisted_4$5, [
        createVNode(_component_el_button, {
          size: "small",
          onClick: $options.handleCancel
        }, {
          default: withCtx(() => [
            _hoisted_5$4
          ]),
          _: 1
        }, 8, ["onClick"]),
        $data.edit ? (openBlock(), createBlock(_component_el_button, {
          key: 0,
          size: "small",
          type: "primary",
          onClick: $options.handleImp
        }, {
          default: withCtx(() => [
            _hoisted_6$4
          ]),
          _: 1
        }, 8, ["onClick"])) : createCommentVNode("", true)
      ])
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$9, [
        createVNode(_component_el_input, {
          style: { "min-height": "300px", "height": "300px", "max-height": "290px", "overflow": "auto" },
          autosize: "",
          readonly: !$data.edit,
          ref: "myEditor",
          type: "textarea",
          modelValue: $data.jsonCode,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.jsonCode = $event)
        }, null, 8, ["readonly", "modelValue"])
      ]),
      !$data.edit ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
        createVNode(_component_el_button, {
          size: "small",
          onClick: $options.handleExportJson,
          type: "primary"
        }, {
          default: withCtx(() => [
            _hoisted_3$5
          ]),
          _: 1
        }, 8, ["onClick"])
      ])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
var Code = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
var index_vue_vue_type_style_index_0_lang$5 = "";
const _sfc_main$9 = {
  components: {
    Preview,
    Code
  },
  data() {
    return {
      previewVisible: false,
      codeVisible: false
    };
  },
  props: {
    formTemplate: {
      type: Object
    },
    clear: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    reder: {
      type: Boolean,
      default: true
    },
    imp: {
      type: Boolean,
      default: true
    },
    exp: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClear() {
      this.$confirm("\u662F\u5426\u8981\u6E05\u7A7A\u5F53\u524D\u9762\u677F?", "\u63D0\u793A", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(() => {
        this.formTemplate["list"] = [];
      });
    },
    handlePreview() {
      this.previewVisible = true;
      this.$nextTick(() => {
        this.$refs.preview.init(this.formTemplate);
      });
    },
    handleImport() {
      this.codeVisible = true;
      this.$nextTick(() => {
        this.$refs.code.init(this.formTemplate, true);
      });
    },
    importData(codes) {
      this.$emit("importData", codes);
    },
    handleExport() {
      this.codeVisible = true;
      this.$nextTick(() => {
        this.$refs.code.init(this.formTemplate);
      });
    }
  }
};
const _hoisted_1$8 = { class: "panel-header-index" };
const _hoisted_2$7 = /* @__PURE__ */ createElementVNode("img", {
  class: "logo",
  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABTpJREFUWEftVmtsFFUU/u7M7KNTS9tAtSAtiAotQUA0BIjKI1s07i5CutWCAaIJqMFAQvwhGORhICYSMSQCIaYhaDTQBZGyxZQWCD8EDRCw2Ae05VmklLZLS3dndmbuNXe22+6yC2TbHxjjSSaZuXPuOd/57jnnHoLHLOQx+8f/AP4bDDidCzI1aKMqfKVnks2pATPgeNOzDgRrTccM6yvLveuSATEgAAVOTxED9jLgB8Zo1dHy/buScc51BwTA4SrcDUbcFkpGHz5c2pqs84EDcHqOcSOVPu/M/jj/dwNwu92yYljHAkI+JWwCAV4iQD1jrJ4IqAfIOMaw3IyCYCvALjCKMYSQMQzgzxmBkfMArbWLoZqysrJAIpYS5oDDWfSRJLI1uoGhfJNNIjRviCDYJXT9fsNI42uSAGNomkAJAVruMag6s/D1/CwhYBWJfNVPQ36FWfmaRcAtjZINlb7S7feDiAPgcHoOAXAuck0zXC6nKKemwlb1mbnvrsLwxXEVU3JEOJ6VkGHv2777XAjfn9Pw9kiCJTNkU787xNDcxVDVqOv7azQJgK/S53VFg4gB4HB6WKosY/uGZRiaNxnQVaChAriwzzSWan140TRcViHfVpH5XApSBpuE9MrpmwZWVSjmd6XP22uo96XA6dmYnf3U6pJNyyE9ORqoOQA0HgXUTvz0p4aSsyEcWCA/EoS/KQi108CQsTJEqxB37AW7unntbzri85q0mgAKnEVzGNgvm1cWY8KsQuDsLqDpeO/mCy0Gqlso5o+PjSpRUlGNoa0uAHumhLThtjiVbX+E8HONBgLy1hFf6UEye/bCVNGu1Oamk6d3zM8RQETgXkt/yxoN7RTDrID8RHz0EaMrfEHjUju7aSj2fOJwvzMF1Di5ZfGLGGe5Bujhc4qWeyGGT35VoFNgzQwbRmQkNs6Z+rRCQW6GgK9etz/wuMov6tjymwoI4lTicBUuGZQ2aOe+H0vC586f++S7MyHsqdbM1ecHC9jmTknI0MeHgqi/Q81/ReMsWPqyWYVx0thO8eHBIEDYUuJwerZaRLKsfOUkAR1XEjKwpkrBqetGr6H1s+yYlivGGD7WpGPTCbV3bfJwERsd9oQAeJJ6DqpU0dm3HMCxnHRhRsm8xFFxC96/NJTV6WgPUpP+FVNtJhPRwpvR50cVNLWHdebmS3CNiU9a9a5uJunmOxZUt9LjJgM56cL7JfNSUvudeUls7L4Vwt2rCj64JPUw4CpcAkZ2eotlpEd1tiRsJqXqv6ygod3AqmreBHgO9FTB2pk2vDKCd8tYaQswFO9NeI880nFpsRzTrqnB0FYTwIluATvqaLgKIn3g1Vxx2KrpttjM6nHB+3xEeL/nsnBi+HxJz0wT0Yms83+LJsZWAe+SgVYNX9620AY/azb7AFeMdMIF4y14b1Li0uF6vos6vuH1CyA6umiWeJ94bWQ8k13NKrpuqNjTKaG8mfV1wkhk/C5gwOrV022Y+Uy8gUfy/QAFQ2PoaAgg1Bku48W1YvxdENnLb0P+7s6z4N3xFgyWkxsZT13RIBnAC1kC9KABPUihdunQAxTnbTZ8fU43XSW8DaNAmPMAHzbm5EkCr/cJ2X2p4VcYrvopRmUKSLOFAda0UpTVaahs1DEvi2LuEDMOXCcirhkCznYSevpvgzeOh88DfSBiJyKrSGh+liA0dVCjS2UmmshEFNCY0BYIr03MFm/aCMsI6JAvdjCq6szsVklNRBEQiWZCHiwIqWUU9QLoG4yQkQzgNXpSIOxKf2bCfwBgrE2DNwT/bgAAAABJRU5ErkJggg=="
}, null, -1);
const _hoisted_3$4 = /* @__PURE__ */ createElementVNode("span", { class: "title" }, "ng-form-elementplus", -1);
const _hoisted_4$4 = { class: "buttons" };
const _hoisted_5$3 = /* @__PURE__ */ createTextVNode("\u6E05\u7A7A");
const _hoisted_6$3 = /* @__PURE__ */ createTextVNode("\u9884\u89C8");
const _hoisted_7$1 = /* @__PURE__ */ createTextVNode("\u5BFC\u5165");
const _hoisted_8$1 = /* @__PURE__ */ createTextVNode("\u5BFC\u51FA");
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = resolveComponent("el-col");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_row = resolveComponent("el-row");
  const _component_Preview = resolveComponent("Preview");
  const _component_Code = resolveComponent("Code");
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createVNode(_component_el_row, null, {
      default: withCtx(() => [
        createVNode(_component_el_col, { span: 8 }, {
          default: withCtx(() => [
            _hoisted_2$7,
            _hoisted_3$4
          ]),
          _: 1
        }),
        createVNode(_component_el_col, { span: 8 }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "formName")
          ]),
          _: 3
        }),
        createVNode(_component_el_col, { span: 8 }, {
          default: withCtx(() => [
            createElementVNode("span", _hoisted_4$4, [
              renderSlot(_ctx.$slots, "controlButton"),
              $props.clear ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                text: "",
                size: "medium",
                icon: "Delete",
                onClick: $options.handleClear
              }, {
                default: withCtx(() => [
                  _hoisted_5$3
                ]),
                _: 1
              }, 8, ["onClick"])) : createCommentVNode("", true),
              $props.preview ? (openBlock(), createBlock(_component_el_button, {
                key: 1,
                text: "",
                size: "medium",
                icon: "View",
                onClick: $options.handlePreview
              }, {
                default: withCtx(() => [
                  _hoisted_6$3
                ]),
                _: 1
              }, 8, ["onClick"])) : createCommentVNode("", true),
              $props.imp ? (openBlock(), createBlock(_component_el_button, {
                key: 2,
                text: "",
                size: "medium",
                icon: "Download",
                onClick: $options.handleImport
              }, {
                default: withCtx(() => [
                  _hoisted_7$1
                ]),
                _: 1
              }, 8, ["onClick"])) : createCommentVNode("", true),
              $props.exp ? (openBlock(), createBlock(_component_el_button, {
                key: 3,
                text: "",
                size: "medium",
                icon: "Upload",
                onClick: $options.handleExport
              }, {
                default: withCtx(() => [
                  _hoisted_8$1
                ]),
                _: 1
              }, 8, ["onClick"])) : createCommentVNode("", true)
            ])
          ]),
          _: 3
        })
      ]),
      _: 3
    }),
    $data.previewVisible ? (openBlock(), createBlock(_component_Preview, {
      key: 0,
      ref: "preview"
    }, null, 512)) : createCommentVNode("", true),
    $data.codeVisible ? (openBlock(), createBlock(_component_Code, {
      key: 1,
      ref: "code",
      onImp: $options.importData
    }, null, 8, ["onImp"])) : createCommentVNode("", true)
  ]);
}
var HeaderPanel = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const icons = {
  alert: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMy4yIiB5PSIxNC4yIiB3aWR0aD0iNDIuNiIgaGVpZ2h0PSIyMC42IiByeD0iNC44IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNEOEQ4RDgiIHN0cm9rZS13aWR0aD0iMS42Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIyNCIgcj0iNiIgZmlsbD0iI0ZCRURDOCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMjgiIHI9IjEiIGZpbGw9IiNDMDg4MTEiLz48cGF0aCBkPSJNMTIgMjB2NiIgc3Ryb2tlPSIjQzA4ODExIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBzdHJva2U9IiM4RThFOEUiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTIyIDIyaDExIi8+PHBhdGggc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0yMiAyN2gxOSIvPjwvc3ZnPgo=",
  button: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iNi41IiB5PSIxNS41IiB3aWR0aD0iMzYiIGhlaWdodD0iMTciIHJ4PSIzLjUiIGZpbGw9IiM0QUExRUQiIHN0cm9rZT0iIzRBQTFFRCIvPjxwYXRoIGQ9Im0xMi42ODQgMjcgLjQzMi0xLjMyN2gyLjFMMTUuNjQ3IDI3aDEuMzE5bC0yLjAwNi01LjgxOGgtMS41ODVMMTEuMzY2IDI3aDEuMzE4Wm0uNzQ1LTIuMjg3LjcxNi0yLjIwMmguMDQ1bC43MTYgMi4yMDJoLTEuNDc3Wm01Ljk4MyAyLjM3MmMxLjE2MiAwIDEuODkyLS42ODIgMS45NDgtMS42ODRoLTEuMTQyYy0uMDcuNDY1LS4zNzcuNzI3LS43OTIuNzI3LS41NjYgMC0uOTMyLS40NzUtLjkzMi0xLjMxIDAtLjgyNC4zNy0xLjI5NS45MzItMS4yOTUuNDQzIDAgLjcyNy4yOTIuNzkyLjcyN2gxLjE0MmMtLjA1LTEuMDA5LS44MTUtMS42Ny0xLjk1NC0xLjY3LTEuMzI0IDAtMi4xNDIuOTE3LTIuMTQyIDIuMjU1IDAgMS4zMjcuODA0IDIuMjUgMi4xNDggMi4yNVptNS4wNDQtNC40NDloLS44MnYtMS4wNDVoLTEuMjF2MS4wNDVoLS41OTh2LjkxaC41OTd2Mi4yNzJjLS4wMDYuODU1LjU3NyAxLjI3OSAxLjQ1NSAxLjI0Mi4zMTItLjAxMi41MzQtLjA3NC42NTYtLjExNGwtLjE5LS45Yy0uMDYuMDEtLjE4OC4wNC0uMzAyLjA0LS4yNDEgMC0uNDA5LS4wOTItLjQwOS0uNDI3di0yLjExM2guODIxdi0uOTFaTTI1LjI0NSAyN2gxLjIxdi00LjM2NGgtMS4yMVYyN1ptLjYwOC00LjkyNmMuMzYgMCAuNjU2LS4yNzYuNjU2LS42MTQgMC0uMzM1LS4yOTYtLjYxLS42NTYtLjYxLS4zNTggMC0uNjU0LjI3NS0uNjU0LjYxIDAgLjMzOC4yOTYuNjE0LjY1NC42MTRabTMuNTQzIDUuMDExYzEuMzI0IDAgMi4xNDgtLjkwNiAyLjE0OC0yLjI1IDAtMS4zNTItLjgyNC0yLjI1Ni0yLjE0OC0yLjI1Ni0xLjMyNCAwLTIuMTQ4LjkwNC0yLjE0OCAyLjI1NiAwIDEuMzQ0LjgyNCAyLjI1IDIuMTQ4IDIuMjVabS4wMDYtLjkzN2MtLjYxMSAwLS45MjQtLjU2LS45MjQtMS4zMjEgMC0uNzYyLjMxMy0xLjMyNC45MjQtMS4zMjQuNiAwIC45MTIuNTYyLjkxMiAxLjMyNCAwIC43NjEtLjMxMyAxLjMyLS45MTIgMS4zMlptNC4xMzktMS42N2MuMDAzLS41NjMuMzM4LS44OTMuODI3LS44OTMuNDg1IDAgLjc3OC4zMTguNzc1Ljg1MlYyN2gxLjIxdi0yLjc3OGMwLTEuMDE4LS41OTYtMS42NDMtMS41MDUtMS42NDMtLjY0OCAwLTEuMTE3LjMxOS0xLjMxMy44MjdoLS4wNTF2LS43N2gtMS4xNTNWMjdoMS4yMXYtMi41MjNaIiBmaWxsPSIjZmZmIi8+PC9zdmc+Cg==",
  batch: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMy4yIiB5PSIzLjIiIHdpZHRoPSI0MS42IiBoZWlnaHQ9IjQxLjYiIHJ4PSI0LjgiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBkPSJNOCAxMHY1YTIgMiAwIDAgMCAyIDJoMjhhMiAyIDAgMCAwIDItMnYtNWEyIDIgMCAwIDAtMi0ySDEwYTIgMiAwIDAgMC0yIDJaTTggMjJ2NWEyIDIgMCAwIDAgMiAyaDI4YTIgMiAwIDAgMCAyLTJ2LTVhMiAyIDAgMCAwLTItMkgxMGEyIDIgMCAwIDAtMiAyWk04IDM0djVhMiAyIDAgMCAwIDIgMmgyOGEyIDIgMCAwIDAgMi0ydi01YTIgMiAwIDAgMC0yLTJIMTBhMiAyIDAgMCAwLTIgMloiIGZpbGw9IiNFRUUiLz48L3N2Zz4K",
  cascader: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cmVjdCB4PSIuMiIgeT0iMy4yIiB3aWR0aD0iNDcuNiIgaGVpZ2h0PSIxNC42IiByeD0iMy44IiBmaWxsPSIjRkNGQ0ZDIiBzdHJva2U9IiNERURFREUiIHN0cm9rZS13aWR0aD0iMS42Ii8+PHJlY3QgeD0iNCIgeT0iMTUiIHdpZHRoPSI0MyIgaGVpZ2h0PSIyOSIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0RFREVERSIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNyAxMWgyTTIwIDExaDkiLz48cGF0aCBzdHJva2U9IiNCRUJFQkUiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xNyA5LjEzMSAxMy4xMzEgMTMiLz48cGF0aCBkPSJNMjQgMzRoMjJ2N2EyIDIgMCAwIDEtMiAySDI0di05WiIgZmlsbD0iI0VDRjVGRCIvPjxwYXRoIHN0cm9rZT0iIzc1NzU3NSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xNyAyMGgxOU0yNiAyOWgxNU0yOCAzOWg4Ii8+PHBhdGggZD0ibTE2IDI4IDIuNSAyIDIuNS0yTTggMTlsMi41IDIgMi41LTJNMzcgMTBsMi41IDIgMi41LTIiIHN0cm9rZT0iI0JFQkVCRSIgc3Ryb2tlLXdpZHRoPSIxLjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Im00MCAzOS4zNjEgMS4zNjEgMS4xMzRMNDMuNjMgMzgiIHN0cm9rZT0iIzNDOTJEQyIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDh2NDhIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4K",
  checkbox: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTguMTY2IDEzLjc5MSAxLjc1IDEuNDU4IDIuOTE3LTMuMjA4TTguMTY2IDM0LjQ1OGwxLjc1IDEuNDU4IDIuOTE3LTMuMjA4IiBzdHJva2U9IiNGNUY1RjUiIHN0cm9rZS13aWR0aD0iMS4yIi8+PHJlY3QgeD0iOS41IiB5PSI2LjUiIHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHJ4PSIyLjUiIGZpbGw9IiMzQzkyREMiIHN0cm9rZT0iIzNDOTJEQyIvPjxyZWN0IHg9IjkuNSIgeT0iMzIuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjIuNSIgZmlsbD0iIzNDOTJEQyIgc3Ryb2tlPSIjM0M5MkRDIi8+PHBhdGggZD0ibTEyIDExLjM2MSAxLjM2MSAxLjEzNEwxNS42MyAxME0xMiAzNy4zNjFsMS4zNjEgMS4xMzRMMTUuNjMgMzYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIHN0cm9rZT0iI0RFREVERSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yMyAxMC42NjZoMTRNMjMgMzYuNjY2aDE0Ii8+PHJlY3QgeD0iOS41IiB5PSIxOS41IiB3aWR0aD0iOSIgaGVpZ2h0PSI5IiByeD0iMi41IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNERURFREUiLz48cGF0aCBzdHJva2U9IiNERURFREUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjMgMjMuMzM0aDExIi8+PC9zdmc+Cg==",
  controller: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMy4yIiB5PSI3LjIiIHdpZHRoPSI0MS42IiBoZWlnaHQ9IjMzLjYiIHJ4PSI0LjgiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBzdHJva2U9IiNEOEQ4RDgiIHN0cm9rZS13aWR0aD0iMS42IiBkPSJNNCAxNi4yaDQwIi8+PHJlY3QgeD0iNyIgeT0iMTkiIHdpZHRoPSIzNCIgaGVpZ2h0PSIxOCIgcng9IjIiIGZpbGw9IiNFRUUiLz48L3N2Zz4K",
  date: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iMTUiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxOCIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1LjQgMjIuNUg2LjZ2NC43MzdjMCAuMjI4LjE4NS40MTMuNDE0LjQxM2g3Ljk3MmEuNDE0LjQxNCAwIDAgMCAuNDE0LS40MTNWMjIuNVptLTguMzg3LTMuNzVoNy45NzRjMS4xMTIgMCAyLjAxMy45MDEgMi4wMTMgMi4wMTN2Ni40NzRhMi4wMTQgMi4wMTQgMCAwIDEtMi4wMTQgMi4wMTNINy4wMTRBMi4wMTQgMi4wMTQgMCAwIDEgNSAyNy4yMzd2LTYuNDc0YzAtMS4xMTIuOTAxLTIuMDEzIDIuMDEzLTIuMDEzWm0yLjM1MyA1LjM3NWEuODc1Ljg3NSAwIDEgMS0xLjc1IDAgLjg3NS44NzUgMCAwIDEgMS43NSAwWk04LjQ5IDI3LjI1YS44NzUuODc1IDAgMSAwIDAtMS43NS44NzUuODc1IDAgMCAwIDAgMS43NVptMy4zODQtMy4xMjVhLjg3NS44NzUgMCAxIDEtMS43NSAwIC44NzUuODc1IDAgMCAxIDEuNzUgMFpNMTEgMjcuMjVhLjg3NS44NzUgMCAxIDAgMC0xLjc1Ljg3NS44NzUgMCAwIDAgMCAxLjc1Wm0zLjU1LTMuMTI1YS44NzUuODc1IDAgMSAxLTEuNzUgMCAuODc1Ljg3NSAwIDAgMSAxLjc1IDBaIiBmaWxsPSIjQjJCMkIyIi8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIxIDI0aDEyIi8+PHBhdGggZD0iTTM4IDIwaDEuNW0xLjUgMGgtMS41bTAgMHY4bTAgMEgzOG0xLjUgMEg0MSIgc3Ryb2tlPSIjOTQ5NDk0IiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==",
  daterange: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iNSIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjE4IiByeD0iMyIgZmlsbD0iI0ZDRkNGQyIgc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjEuNiIvPjxnIGZpbHRlcj0idXJsKCNhKSI+PHJlY3QgeD0iNCIgeT0iMjMiIHdpZHRoPSI0MyIgaGVpZ2h0PSIyMCIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiLz48cmVjdCB4PSIzLjUiIHk9IjIyLjUiIHdpZHRoPSI0NCIgaGVpZ2h0PSIyMSIgcng9IjMuNSIgc3Ryb2tlPSIjREVERURFIi8+PC9nPjxwYXRoIGQ9Ik03IDI3djNhMSAxIDAgMCAwIDEgMWg1YTEgMSAwIDAgMCAxLTF2LTNhMSAxIDAgMCAwLTEtMUg4YTEgMSAwIDAgMC0xIDFaIiBmaWxsPSIjREVERURFIi8+PHBhdGggZD0iTTcgMzV2M2ExIDEgMCAwIDAgMSAxaDE2YTEgMSAwIDAgMCAxLTF2LTNhMSAxIDAgMCAwLTEtMUg4YTEgMSAwIDAgMC0xIDFaIiBmaWxsPSIjRUNGNUZEIi8+PHBhdGggZD0iTTIxIDM0LjIwNnY0LjU4OGMwIC4xMTQuMDkyLjIwNi4yMDYuMjA2SDI1LjVhMi41IDIuNSAwIDAgMCAwLTVoLTQuMjk0YS4yMDYuMjA2IDAgMCAwLS4yMDYuMjA2WiIgZmlsbD0iIzNDOTJEQyIvPjxwYXRoIGQ9Ik0yMiAyN3YzYTEgMSAwIDAgMCAxIDFoMjBhMSAxIDAgMCAwIDEtMXYtM2ExIDEgMCAwIDAtMS0xSDIzYTEgMSAwIDAgMC0xIDFaIiBmaWxsPSIjRUNGNUZEIi8+PHBhdGggZD0iTTMxIDM1djNhMSAxIDAgMCAwIDEgMWgxMWExIDEgMCAwIDAgMS0xdi0zYTEgMSAwIDAgMC0xLTFIMzJhMSAxIDAgMCAwLTEgMVoiIGZpbGw9IiNERURFREUiLz48cGF0aCBkPSJNMjIuNzk0IDI2SDE4LjVhMi41IDIuNSAwIDAgMCAwIDVoNC4yOTRhLjIwNi4yMDYgMCAwIDAgLjIwNi0uMjA2di00LjU4OGEuMjA2LjIwNiAwIDAgMC0uMjA2LS4yMDZaIiBmaWxsPSIjM0M5MkRDIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03LjYgMTMuNXY0LjczN2MwIC4yMjguMTg1LjQxMy40MTQuNDEzaDcuOTcyYS40MTQuNDE0IDAgMCAwIC40MTQtLjQxM1YxMy41SDcuNlptOC4zODctMy43NUg4LjAxM0EyLjAxMyAyLjAxMyAwIDAgMCA2IDExLjc2M3Y2LjQ3NGMwIDEuMTEyLjkwMiAyLjAxMyAyLjAxNCAyLjAxM2g3Ljk3MkEyLjAxNCAyLjAxNCAwIDAgMCAxOCAxOC4yMzd2LTYuNDc0YTIuMDEzIDIuMDEzIDAgMCAwLTIuMDEzLTIuMDEzWk0xNS43IDE1YS43LjcgMCAwIDEtLjcuN0g5YS43LjcgMCAxIDEgMC0xLjRoNmEuNy43IDAgMCAxIC43LjdaTTEyIDE3Ljk1YS43LjcgMCAxIDAgMC0xLjRIOWEuNy43IDAgMSAwIDAgMS40aDNaIiBmaWxsPSIjQjJCMkIyIi8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIyIDE0aDEyIi8+PHBhdGggZD0iTTM5IDEwaDEuNW0xLjUgMGgtMS41bTAgMHY4bTAgMEgzOW0xLjUgMEg0MiIgc3Ryb2tlPSIjOTQ5NDk0IiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGRlZnM+PGZpbHRlciBpZD0iYSIgeD0iMyIgeT0iMjIiIHdpZHRoPSI0NSIgaGVpZ2h0PSIyMyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPjxmZU9mZnNldCBkeT0iMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjg2MjUgMCAwIDAgMCAwLjg2MjUgMCAwIDAgMCAwLjg2MjUgMCAwIDAgMSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzE3ODU6MTM2ODIiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTc4NToxMzY4MiIgcmVzdWx0PSJzaGFwZSIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4K",
  datePicker: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iMTUiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxOCIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjQzNSAyMi41SDYuNnY0LjczN2MwIC4yMjguMTg1LjQxNC40MTQuNDE0aDIuMTM0Yy4xNTYuNTg5LjQyOCAxLjEzLjc5IDEuNkg3LjAxNEEyLjAxNCAyLjAxNCAwIDAgMSA1IDI3LjIzNnYtNi40NzNjMC0xLjExMi45MDEtMi4wMTQgMi4wMTMtMi4wMTRoNy45NzRjMS4xMTIgMCAyLjAxMy45MDIgMi4wMTMgMi4wMTRWMjMuNjcyQTQuNDkxIDQuNDkxIDAgMCAwIDEzLjUgMjJjLS43NDQgMC0xLjQ0Ni4xODEtMi4wNjUuNVpNOCAyNC43NWEuNzUuNzUgMCAxIDAgMC0xLjUuNzUuNzUgMCAwIDAgMCAxLjVabS43NSAxLjVhLjc1Ljc1IDAgMSAxLTEuNSAwIC43NS43NSAwIDAgMSAxLjUgMFoiIGZpbGw9IiNCMkIyQjIiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1LjY4NCAyOC42NWEzLjE1IDMuMTUgMCAwIDAgMC00LjQ3MyAzLjE5NyAzLjE5NyAwIDAgMC00LjUwMiAwIDMuMTUgMy4xNSAwIDAgMCAwIDQuNDc0IDMuMTk3IDMuMTk3IDAgMCAwIDQuNTAyIDBabS0xLjg3NS0zLjU1M2EuNTIyLjUyMiAwIDEgMC0xLjA0NCAwdjEuNWMwIC4yNDUuMTcuNDU4LjQxLjUxbDEuNjM2LjM1NmEuNTIyLjUyMiAwIDEgMCAuMjIzLTEuMDJsLTEuMjI2LS4yNjd2LTEuMDhaIiBmaWxsPSIjQjJCMkIyIi8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIxIDI0aDEyIi8+PHBhdGggZD0iTTM4IDIwaDEuNW0xLjUgMGgtMS41bTAgMHY4bTAgMEgzOG0xLjUgMEg0MSIgc3Ryb2tlPSIjOTQ5NDk0IiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==",
  divider: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgNnY4YTQgNCAwIDAgMCA0IDRoMjZhNCA0IDAgMCAwIDQtNFY2TTQxIDQydi04YTQgNCAwIDAgMC00LTRIMTFhNCA0IDAgMCAwLTQgNHY4IiBzdHJva2U9IiNCRUJFQkUiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjEgNCIvPjxwYXRoIGQ9Ik00MSAyNC44YS44LjggMCAwIDAgMC0xLjZ2MS42Wk03IDIzLjJhLjguOCAwIDAgMCAwIDEuNnYtMS42Wm0zNCAwSDd2MS42aDM0di0xLjZaIiBmaWxsPSIjOEU4RThFIi8+PC9zdmc+Cg==",
  grid: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwIDM5SDdWMTZhMSAxIDAgMCAxIDEtMWgzMWExIDEgMCAwIDEgMSAxdjIzWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMyAzOFYxME03IDI3aDMzLjI1TTcgMjFoMzMuMjVNNyAzM2gzMy4yNSIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIGQ9Ik00MCAxNUg3di01YTEgMSAwIDAgMSAxLTFoMzFhMSAxIDAgMCAxIDEgMXY1WiIgZmlsbD0iI0VFRSIvPjxwYXRoIGQ9Ik02Ljg3NSAxNWgzMy4yNSIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuNiIvPjxyZWN0IHg9IjYuOCIgeT0iOS44IiB3aWR0aD0iMzMuNCIgaGVpZ2h0PSIyOC40IiByeD0iMi4yIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMS42Ii8+PC9zdmc+Cg==",
  html: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQxIDZIN0M0Ljc5MDg2IDYgMyA3Ljc5MDg2IDMgMTBWMzhDMyA0MC4yMDkxIDQuNzkwODYgNDIgNyA0Mkg0MUM0My4yMDkxIDQyIDQ1IDQwLjIwOTEgNDUgMzhWMTBDNDUgNy43OTA4NiA0My4yMDkxIDYgNDEgNloiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNEOEQ4RDgiIHN0cm9rZS13aWR0aD0iMS42Ii8+CjxwYXRoIGQ9Ik04Ljg0NjAxIDE5Ljk5OThDOC42MjE2NCAxOS45OTk4IDguNDA2NDYgMTkuOTEwNyA4LjI0NzggMTkuNzUyQzguMDg5MTQgMTkuNTkzMyA4LjAwMDAxIDE5LjM3ODIgOC4wMDAwMSAxOS4xNTM4VjEyLjg0NThDNy45OTYxMSAxMi43MzIzIDguMDE1MDkgMTIuNjE5MiA4LjA1NTgyIDEyLjUxMzJDOC4wOTY1NSAxMi40MDcyIDguMTU4MjEgMTIuMzEwNSA4LjIzNzEgMTIuMjI4OUM4LjMxNiAxMi4xNDcyIDguNDEwNTMgMTIuMDgyMyA4LjUxNTA2IDEyLjAzNzlDOC42MTk1OCAxMS45OTM2IDguNzMxOTcgMTEuOTcwNyA4Ljg0NTUxIDExLjk3MDdDOC45NTkwNiAxMS45NzA3IDkuMDcxNDQgMTEuOTkzNiA5LjE3NTk3IDEyLjAzNzlDOS4yODA0OSAxMi4wODIzIDkuMzc1MDIgMTIuMTQ3MiA5LjQ1MzkyIDEyLjIyODlDOS41MzI4MiAxMi4zMTA1IDkuNTk0NDcgMTIuNDA3MiA5LjYzNTIgMTIuNTEzMkM5LjY3NTkzIDEyLjYxOTIgOS42OTQ5MiAxMi43MzIzIDkuNjkxMDEgMTIuODQ1OFYxNS4yOTk4SDEzLjEyNVYxMi44NDM4QzEzLjEyNSAxMi42MTk5IDEzLjIxMzkgMTIuNDA1MyAxMy4zNzIyIDEyLjI0N0MxMy41MzA1IDEyLjA4ODcgMTMuNzQ1MiAxMS45OTk4IDEzLjk2OSAxMS45OTk4QzE0LjE5MjkgMTEuOTk5OCAxNC40MDc1IDEyLjA4ODcgMTQuNTY1OCAxMi4yNDdDMTQuNzI0MSAxMi40MDUzIDE0LjgxMyAxMi42MTk5IDE0LjgxMyAxMi44NDM4VjE5LjE1NThDMTQuODEzIDE5LjM3OTYgMTQuNzI0MSAxOS41OTQzIDE0LjU2NTggMTkuNzUyNkMxNC40MDc1IDE5LjkxMDkgMTQuMTkyOSAxOS45OTk4IDEzLjk2OSAxOS45OTk4QzEzLjc0NTIgMTkuOTk5OCAxMy41MzA1IDE5LjkxMDkgMTMuMzcyMiAxOS43NTI2QzEzLjIxMzkgMTkuNTk0MyAxMy4xMjUgMTkuMzc5NiAxMy4xMjUgMTkuMTU1OFYxNi42OTU4SDkuNjkxMDFWMTkuMTUzOEM5LjY5MTAxIDE5LjM3OCA5LjYwMjAyIDE5LjU5MyA5LjQ0MzU4IDE5Ljc1MTZDOS4yODUxNCAxOS45MTAzIDkuMDcwMjEgMTkuOTk5NSA4Ljg0NjAxIDE5Ljk5OThaTTE2LjkzIDEzLjM5NDhDMTYuNzQ1IDEzLjM5NDggMTYuNTY3NiAxMy4zMjEzIDE2LjQzNjggMTMuMTkwNUMxNi4zMDYgMTMuMDU5NyAxNi4yMzI1IDEyLjg4MjMgMTYuMjMyNSAxMi42OTczQzE2LjIzMjUgMTIuNTEyMyAxNi4zMDYgMTIuMzM0OSAxNi40MzY4IDEyLjIwNDFDMTYuNTY3NiAxMi4wNzMzIDE2Ljc0NSAxMS45OTk4IDE2LjkzIDExLjk5OThIMjIuMTA1QzIyLjI5IDExLjk5OTggMjIuNDY3NCAxMi4wNzMzIDIyLjU5ODIgMTIuMjA0MUMyMi43MjkgMTIuMzM0OSAyMi44MDI1IDEyLjUxMjMgMjIuODAyNSAxMi42OTczQzIyLjgwMjUgMTIuODgyMyAyMi43MjkgMTMuMDU5NyAyMi41OTgyIDEzLjE5MDVDMjIuNDY3NCAxMy4zMjEzIDIyLjI5IDEzLjM5NDggMjIuMTA1IDEzLjM5NDhIMjAuMzUzVjE5LjE2NDhDMjAuMzUzIDE5LjM4NjUgMjAuMjY0OSAxOS41OTkxIDIwLjEwODIgMTkuNzU1OUMxOS45NTE0IDE5LjkxMjcgMTkuNzM4NyAyMC4wMDA4IDE5LjUxNyAyMC4wMDA4QzE5LjI5NTMgMjAuMDAwOCAxOS4wODI3IDE5LjkxMjcgMTguOTI1OSAxOS43NTU5QzE4Ljc2OTEgMTkuNTk5MSAxOC42ODEgMTkuMzg2NSAxOC42ODEgMTkuMTY0OFYxMy4zOTQ4SDE2LjkzWk0yNC4yMTUgMTMuMjIxOEMyNC4yMTUgMTIuNTQ2OCAyNC43NjIgMTEuOTk5OCAyNS40MzcgMTEuOTk5OEgyNS40ODFDMjUuOTc3IDExLjk5OTggMjYuNDIzIDEyLjI5OTggMjYuNjExIDEyLjc1ODhMMjguNTA0IDE3LjM3NDhIMjguNTk3TDMwLjQ5IDEyLjc1ODhDMzAuNTgxOSAxMi41MzQ1IDMwLjczODMgMTIuMzQyNSAzMC45Mzk1IDEyLjIwNzRDMzEuMTQwOCAxMi4wNzIyIDMxLjM3NzYgMTIgMzEuNjIgMTEuOTk5OEgzMS42NjRDMzIuMzM5IDExLjk5OTggMzIuODg3IDEyLjU0NjggMzIuODg3IDEzLjIyMThWMTkuMTc5OEMzMi44ODcgMTkuMzk3MyAzMi44MDA2IDE5LjYwNTggMzIuNjQ2OCAxOS43NTk2QzMyLjQ5MzEgMTkuOTEzNCAzMi4yODQ1IDE5Ljk5OTggMzIuMDY3IDE5Ljk5OThDMzEuODQ5NSAxOS45OTk4IDMxLjY0MSAxOS45MTM0IDMxLjQ4NzIgMTkuNzU5NkMzMS4zMzM0IDE5LjYwNTggMzEuMjQ3IDE5LjM5NzMgMzEuMjQ3IDE5LjE3OThWMTQuNzkyOEgzMS4xOEwyOS4zMTcgMTkuNDQyOEMyOS4yNTU3IDE5LjU5NTggMjkuMTQ5OSAxOS43MjcgMjkuMDEzMyAxOS44MTk0QzI4Ljg3NjcgMTkuOTExNyAyOC43MTU2IDE5Ljk2MSAyOC41NTA3IDE5Ljk2MDlDMjguMzg1OCAxOS45NjA4IDI4LjIyNDcgMTkuOTExMyAyOC4wODgyIDE5LjgxODhDMjcuOTUxOCAxOS43MjYyIDI3Ljg0NjEgMTkuNTk0OSAyNy43ODUgMTkuNDQxOEwyNS45MjIgMTQuNzcyOEgyNS44NTVWMTkuMTc5OEMyNS44NTUgMTkuMzk3MyAyNS43Njg2IDE5LjYwNTggMjUuNjE0OCAxOS43NTk2QzI1LjQ2MTEgMTkuOTEzNCAyNS4yNTI1IDE5Ljk5OTggMjUuMDM1IDE5Ljk5OThDMjQuODE3NSAxOS45OTk4IDI0LjYwOSAxOS45MTM0IDI0LjQ1NTIgMTkuNzU5NkMyNC4zMDE0IDE5LjYwNTggMjQuMjE1IDE5LjM5NzMgMjQuMjE1IDE5LjE3OThWMTMuMjIxOFpNMzUuODMyIDE5Ljk5OThDMzUuNTA3OSAxOS45OTk4IDM1LjE5NzEgMTkuODcxIDM0Ljk2NzkgMTkuNjQxOUMzNC43Mzg4IDE5LjQxMjcgMzQuNjEgMTkuMTAxOSAzNC42MSAxOC43Nzc4VjEyLjg0NThDMzQuNjA2MSAxMi43MzIzIDM0LjYyNTEgMTIuNjE5MiAzNC42NjU4IDEyLjUxMzJDMzQuNzA2NiAxMi40MDcyIDM0Ljc2ODIgMTIuMzEwNSAzNC44NDcxIDEyLjIyODlDMzQuOTI2IDEyLjE0NzIgMzUuMDIwNSAxMi4wODIzIDM1LjEyNTEgMTIuMDM3OUMzNS4yMjk2IDExLjk5MzYgMzUuMzQyIDExLjk3MDcgMzUuNDU1NSAxMS45NzA3QzM1LjU2OTEgMTEuOTcwNyAzNS42ODE0IDExLjk5MzYgMzUuNzg2IDEyLjAzNzlDMzUuODkwNSAxMi4wODIzIDM1Ljk4NSAxMi4xNDcyIDM2LjA2MzkgMTIuMjI4OUMzNi4xNDI4IDEyLjMxMDUgMzYuMjA0NSAxMi40MDcyIDM2LjI0NTIgMTIuNTEzMkMzNi4yODU5IDEyLjYxOTIgMzYuMzA0OSAxMi43MzIzIDM2LjMwMSAxMi44NDU4VjE4LjYwNThIMzkuMDM0QzM5LjIxOSAxOC42MDU4IDM5LjM5NjQgMTguNjc5MyAzOS41MjcyIDE4LjgxMDFDMzkuNjU4IDE4Ljk0MDkgMzkuNzMxNSAxOS4xMTgzIDM5LjczMTUgMTkuMzAzM0MzOS43MzE1IDE5LjQ4ODMgMzkuNjU4IDE5LjY2NTcgMzkuNTI3MiAxOS43OTY1QzM5LjM5NjQgMTkuOTI3MyAzOS4yMTkgMjAuMDAwOCAzOS4wMzQgMjAuMDAwOEgzNS44MzJWMTkuOTk5OFoiIGZpbGw9IiNCMkIyQjIiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMzkgMzBIOEM3LjczNDc4IDMwIDcuNDgwNDMgMzAuMTA1NCA3LjI5Mjg5IDMwLjI5MjlDNy4xMDUzNiAzMC40ODA0IDcgMzAuNzM0OCA3IDMxQzcgMzEuMjY1MiA3LjEwNTM2IDMxLjUxOTYgNy4yOTI4OSAzMS43MDcxQzcuNDgwNDMgMzEuODk0NiA3LjczNDc4IDMyIDggMzJIMzlDMzkuMjY1MiAzMiAzOS41MTk2IDMxLjg5NDYgMzkuNzA3MSAzMS43MDcxQzM5Ljg5NDYgMzEuNTE5NiA0MCAzMS4yNjUyIDQwIDMxQzQwIDMwLjczNDggMzkuODk0NiAzMC40ODA0IDM5LjcwNzEgMzAuMjkyOUMzOS41MTk2IDMwLjEwNTQgMzkuMjY1MiAzMCAzOSAzMFpNMzkgMjVIOEM3LjczNDc4IDI1IDcuNDgwNDMgMjUuMTA1NCA3LjI5Mjg5IDI1LjI5MjlDNy4xMDUzNiAyNS40ODA0IDcgMjUuNzM0OCA3IDI2QzcgMjYuMjY1MiA3LjEwNTM2IDI2LjUxOTYgNy4yOTI4OSAyNi43MDcxQzcuNDgwNDMgMjYuODk0NiA3LjczNDc4IDI3IDggMjdIMzlDMzkuMjY1MiAyNyAzOS41MTk2IDI2Ljg5NDYgMzkuNzA3MSAyNi43MDcxQzM5Ljg5NDYgMjYuNTE5NiA0MCAyNi4yNjUyIDQwIDI2QzQwIDI1LjczNDggMzkuODk0NiAyNS40ODA0IDM5LjcwNzEgMjUuMjkyOUMzOS41MTk2IDI1LjEwNTQgMzkuMjY1MiAyNSAzOSAyNVpNMjggMzVIOEM3LjczNDc4IDM1IDcuNDgwNDMgMzUuMTA1NCA3LjI5Mjg5IDM1LjI5MjlDNy4xMDUzNiAzNS40ODA0IDcgMzUuNzM0OCA3IDM2QzcgMzYuMjY1MiA3LjEwNTM2IDM2LjUxOTYgNy4yOTI4OSAzNi43MDcxQzcuNDgwNDMgMzYuODk0NiA3LjczNDc4IDM3IDggMzdIMjhDMjguMjY1MiAzNyAyOC41MTk2IDM2Ljg5NDYgMjguNzA3MSAzNi43MDcxQzI4Ljg5NDYgMzYuNTE5NiAyOSAzNi4yNjUyIDI5IDM2QzI5IDM1LjczNDggMjguODk0NiAzNS40ODA0IDI4LjcwNzEgMzUuMjkyOUMyOC41MTk2IDM1LjEwNTQgMjguMjY1MiAzNSAyOCAzNVoiIGZpbGw9IiNEOEQ4RDgiLz4KPC9zdmc+Cg==",
  input: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iMTUiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxOCIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBzdHJva2U9IiNEOEQ4RDgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjEgMjRoMTIiLz48cGF0aCBkPSJNMzggMjBoMS41bTEuNSAwaC0xLjVtMCAwdjhtMCAwSDM4bTEuNSAwSDQxIiBzdHJva2U9IiM5NDk0OTQiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNy4yNSAyMi4wNzRWMjAuOThhLjczLjczIDAgMCAxIC43My0uNzNIMTFtMy43NSAxLjgyNFYyMC45OGEuNzMuNzMgMCAwIDAtLjczLS43M0gxMW0wIDB2Ny41bTAgMEg5LjExbTEuODkgMGgyLjA1MSIgc3Ryb2tlPSIjQjJCMkIyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==",
  number: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iMTUiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxOCIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0RFREVERSIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBkPSJNNC41IDI2LjA2aDguNTU1TTExLjYyOSAxOS41bC0xLjQyNiA4LjU1NU04LjA2NCAxOS41bC0xLjQyNiA4LjU1NU01LjIxMyAyMi4wNjdIMTMuNSIgc3Ryb2tlPSIjQjJCMkIyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIxIDI0aDEyIi8+PHBhdGggZD0iTTM4IDIwaDEuNW0xLjUgMGgtMS41bTAgMHY4bTAgMEgzOG0xLjUgMEg0MSIgc3Ryb2tlPSIjOTQ5NDk0IiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==",
  radio: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIwIDM1aDE5TTIwIDI0aDIxTTIwIDEzaDEzIi8+PHJlY3QgeD0iNyIgeT0iMzEiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNERURFREUiIHN0cm9rZS13aWR0aD0iMS4yIi8+PHJlY3QgeD0iNyIgeT0iMjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjM0M5MkRDIiBzdHJva2U9IiMzQzkyREMiLz48cmVjdCB4PSI3IiB5PSI5IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuMiIvPjxyZWN0IHg9IjEwIiB5PSIyMyIgd2lkdGg9IjIiIGhlaWdodD0iMiIgcng9IjEiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIvPjwvc3ZnPgo=",
  rate: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuODU0IDE3LjljLjIxLS42MTcgMS4wODItLjYxNyAxLjI5MiAwbDEuMTI0IDMuMzA5aDMuNTUzYy42NjggMCAuOTM4Ljg2LjM4OSAxLjI0MmwtMi44NDcgMS45NzcgMS4xMDQgMy4yNDhjLjIxMi42MjItLjQ5NCAxLjE1NC0xLjAzNS43OEw4LjUgMjYuNDE2bC0yLjkzNCAyLjAzOGMtLjU0LjM3NS0xLjI0Ni0uMTU3LTEuMDM1LS43OGwxLjEwNC0zLjI0Ny0yLjg0Ny0xLjk3N2MtLjU0OC0uMzgxLS4yNzktMS4yNDIuMzktMS4yNDJoMy41NTFsMS4xMjUtMy4zMXoiIGZpbGw9IiNFQ0JCNDAiLz48cGF0aCBkPSJNMjQuMjE4IDE3LjljLjIxLS42MTcgMS4wODItLjYxNyAxLjI5MSAwbDEuMTI1IDMuMzA5aDMuNTUzYy42NjggMCAuOTM3Ljg2LjM4OSAxLjI0MmwtMi44NDggMS45NzcgMS4xMDQgMy4yNDhjLjIxMi42MjItLjQ5NCAxLjE1NC0xLjAzNC43OGwtMi45MzQtMi4wMzktMi45MzUgMi4wMzhjLS41NC4zNzUtMS4yNDYtLjE1Ny0xLjAzNC0uNzhsMS4xMDQtMy4yNDctMi44NDctMS45NzdjLS41NDktLjM4MS0uMjgtMS4yNDIuMzg5LTEuMjQyaDMuNTUybDEuMTI1LTMuMzF6IiBmaWxsPSIjRDhEOEQ4Ii8+PHBhdGggZD0iTTM5LjIxNSAxNy45OTZjLjIwNC0uNjI4IDEuMDkzLS42MjggMS4yOTcgMGwuODgyIDIuNzE1YS42ODIuNjgyIDAgMCAwIC42NDkuNDcxaDIuODU1Yy42NiAwIC45MzUuODQ2LjQgMS4yMzRsLTIuMzEgMS42NzhhLjY4Mi42ODIgMCAwIDAtLjI0Ny43NjJsLjg4MyAyLjcxNmMuMjA0LjYyOC0uNTE1IDEuMTUtMS4wNS43NjJsLTIuMzEtMS42NzhhLjY4Mi42ODIgMCAwIDAtLjgwMSAwbC0yLjMxIDEuNjc4Yy0uNTM0LjM4OC0xLjI1My0uMTM0LTEuMDUtLjc2MmwuODgzLTIuNzE2YS42ODIuNjgyIDAgMCAwLS4yNDgtLjc2MmwtMi4zMS0xLjY3OGMtLjUzNC0uMzg4LS4yNi0xLjIzNC40MDEtMS4yMzRoMi44NTVjLjI5NiAwIC41NTgtLjE5LjY0OS0uNDdsLjg4Mi0yLjcxNnoiIGZpbGw9IiNERURFREUiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI1IDE3LjQ1MWMtLjM0Ni0uMjE2LS44NjYtLjA5NC0xLjAxNS4zNjhsLTEuMDM2IDMuMTg2SDE5LjZjLS42NjEgMC0uOTM2Ljg0Ni0uNDAxIDEuMjM0bDIuNzEgMS45Ny0xLjAzNSAzLjE4NmMtLjIwNC42MjguNTE1IDEuMTUgMS4wNS43NjJsMi43MS0xLjk3LjM2Ny4yNjd2LTkuMDAzeiIgZmlsbD0iI0VDQkI0MCIvPjwvc3ZnPgo=",
  select: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iNCIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjEzIiByeD0iMyIgZmlsbD0iI0ZDRkNGQyIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIHN0cm9rZT0iIzc1NzU3NSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik03IDExaDE3Ii8+PHJlY3QgeD0iNCIgeT0iMTUiIHdpZHRoPSI0MyIgaGVpZ2h0PSIyOSIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0RFREVERSIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBmaWxsPSIjRUNGNUZEIiBkPSJNNSAyNmg0MXY4SDV6Ii8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTEwIDIxaDEzIi8+PHBhdGggc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTEwIDMwaDI1Ii8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTEwIDM5aDE3Ii8+PHBhdGggc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjEuNiIgZD0iTTQgMjUuMmg0M000IDM0LjJoNDMiLz48cGF0aCBkPSJtMzggMTAgMi41IDIgMi41LTIiIHN0cm9rZT0iI0JFQkVCRSIgc3Ryb2tlLXdpZHRoPSIxLjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Im0zOSAzMC4zNjEgMS4zNjEgMS4xMzRMNDIuNjMgMjkiIHN0cm9rZT0iIzNDOTJEQyIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPgo=",
  slider: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMTAiIHk9IjIyIiB3aWR0aD0iMzQiIGhlaWdodD0iMyIgcng9IjEuNSIgZmlsbD0iI0Q4RDhEOCIvPjxyZWN0IHg9IjUiIHk9IjIyIiB3aWR0aD0iMjkiIGhlaWdodD0iMyIgcng9IjEuNSIgZmlsbD0iIzRBQTFFRCIvPjxjaXJjbGUgY3g9IjMxLjM5OSIgY3k9IjIzLjM5OSIgcj0iMy44OTkiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI0JFQkVCRSIvPjwvc3ZnPgo=",
  switch: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iNy41IiB5PSIyMS41IiB3aWR0aD0iMTMiIGhlaWdodD0iNyIgcng9IjMuNSIgZmlsbD0iIzNDOTJEQyIgc3Ryb2tlPSIjM0M5MkRDIi8+PHJlY3QgeD0iMTUiIHk9IjIzIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2ZmZiIvPjxwYXRoIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yNSAyNWgxNiIvPjwvc3ZnPgo=",
  table: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQzIDM4SDVWMTdhMSAxIDAgMCAxIDEtMWgzNmExIDEgMCAwIDEgMSAxdjIxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01IDM1aDM4djFhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJ2LTFaIiBmaWxsPSIjREVERURFIi8+PHBhdGggZD0iTTEyIDM4VjExTTI4IDM4VjExTTUgMjJoMzhNNSAyOWgzOE0yMCAzOFYxMU0zNiAzOFYxMSIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIGQ9Ik00MyAxNkg1di01YTEgMSAwIDAgMSAxLTFoMzZhMSAxIDAgMCAxIDEgMXY1WiIgZmlsbD0iI0RFREVERSIvPjxyZWN0IHg9IjQuOCIgeT0iMTAuOCIgd2lkdGg9IjM4LjQiIGhlaWdodD0iMjcuNCIgcng9IjIuMiIgc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjEuNiIvPjwvc3ZnPgo=",
  text: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDExSDZhMiAyIDAgMCAwLTIgMnY0TTM4IDM4aDRhMiAyIDAgMCAwIDItMnYtNE00NCAxN3YtNGEyIDIgMCAwIDAtMi0yaC00TTQgMzJ2NGEyIDIgMCAwIDAgMiAyaDQiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yOCAxN2gxMU0yOCAyMmgxMU05IDI4aDMwTTkgMzNoMjQiLz48cGF0aCBkPSJNOC42MjIgMTUuODQ0VjIzaDEuNDY4di00LjY3NWguMDU5bDEuODUyIDQuNjRoMWwxLjg1MS00LjYyM2guMDZWMjNoMS40Njd2LTcuMTU2aC0xLjg2NmwtMS45NyA0LjgwOGgtLjA4NGwtMS45NzEtNC44MDhIOC42MjJaIiBmaWxsPSIjOEU4RThFIi8+PHBhdGggZD0iTTIxLjAwNiAxNnY3bTAgMEwyNCAyMG0tMi45OTQgM0wxOCAyMCIgc3Ryb2tlPSIjOEU4RThFIiBzdHJva2Utd2lkdGg9IjEuNCIvPjwvc3ZnPgo=",
  textarea: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iOSIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjMxIiByeD0iMyIgZmlsbD0iI0ZDRkNGQyIgc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIGQ9Ik01LjUgMjIuNWg5TTUuNSAyMC4yNWg5TTEzIDE4aDEuNU01LjUgMTQuOTE5di0uNzg3YzAtLjM1LjI4My0uNjMyLjYzMi0uNjMySDguNW0zIDEuNDE5di0uNzg3YS42MzIuNjMyIDAgMCAwLS42MzItLjYzMkg4LjVtMCAwVjE4bTAgMEg2Ljk1N004LjUgMThoMS41NDMiIHN0cm9rZT0iI0IyQjJCMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik02IDI5aDI4TTYgMzRoMTciLz48cGF0aCBkPSJNMzkgMjdoMS41bTEuNSAwaC0xLjVtMCAwdjhtMCAwSDM5bTEuNSAwSDQyIiBzdHJva2U9IiM5NDk0OTQiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4K",
  time: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iMTUiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxOCIgcng9IjMiIGZpbGw9IiNGQ0ZDRkMiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTYuNTUgMjRhNC40NSA0LjQ1IDAgMSAxIDguOSAwIDQuNDUgNC40NSAwIDAgMS04LjkgMFpNMTEgMTcuOTVhNi4wNSA2LjA1IDAgMSAwIDAgMTIuMSA2LjA1IDYuMDUgMCAwIDAgMC0xMi4xWk0xMC4yIDIxYS44LjggMCAxIDEgMS42IDB2My4wMmEuOC44IDAgMCAxLS40OS43MzdsLTIuNjI0IDEuMTA2YS44LjggMCAwIDEtLjYyMS0xLjQ3NWwyLjEzNS0uOVYyMVoiIGZpbGw9IiNCMkIyQjIiLz48cGF0aCBzdHJva2U9IiNEOEQ4RDgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjEgMjRoMTIiLz48cGF0aCBkPSJNMzggMjBoMS41bTEuNSAwaC0xLjVtMCAwdjhtMCAwSDM4bTEuNSAwSDQxIiBzdHJva2U9IiM5NDk0OTQiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4K",
  uploadFile: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMiIgeT0iOSIgd2lkdGg9IjQ0IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0iI0Y2RjZGNiIgc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iMiA2Ii8+PHBhdGggZD0ibTEwLjQ5MyAzMyAuNDMyLTEuMzI3aDIuMUwxMy40NTUgMzNoMS4zMThsLTIuMDA1LTUuODE4aC0xLjU4Nkw5LjE3NSAzM2gxLjMxOFptLjc0NC0yLjI4Ny43MTYtMi4yMDJIMTJsLjcxNSAyLjIwMmgtMS40NzdabTUuNjIgMi4zNThjLjcwNCAwIDEuMDctLjQwNiAxLjIzOC0uNzdoLjA1MVYzM2gxLjE5NHYtNS44MThoLTEuMjA4djIuMTg3aC0uMDM3Yy0uMTYyLS4zNTUtLjUxMS0uNzktMS4yNDEtLjc5LS45NTggMC0xLjc2Ny43NDUtMS43NjcgMi4yNDUgMCAxLjQ2Ljc3NSAyLjI0NyAxLjc3IDIuMjQ3Wm0uMzgzLS45NjNjLS41OTQgMC0uOTE4LS41MjgtLjkxOC0xLjI5IDAtLjc1Ni4zMTktMS4yNzUuOTE4LTEuMjc1LjU4OCAwIC45MTguNDk3LjkxOCAxLjI3NSAwIC43NzktLjMzNiAxLjI5LS45MTggMS4yOVptNC43MDMuOTYzYy43MDQgMCAxLjA3LS40MDYgMS4yMzgtLjc3aC4wNTFWMzNoMS4xOTN2LTUuODE4aC0xLjIwN3YyLjE4N2gtLjAzN2MtLjE2Mi0uMzU1LS41MTEtLjc5LTEuMjQxLS43OS0uOTU4IDAtMS43NjcuNzQ1LTEuNzY3IDIuMjQ1IDAgMS40Ni43NzUgMi4yNDcgMS43NyAyLjI0N1ptLjM4My0uOTYzYy0uNTk0IDAtLjkxOC0uNTI4LS45MTgtMS4yOSAwLS43NTYuMzE5LTEuMjc1LjkxOC0xLjI3NS41ODggMCAuOTE4LjQ5Ny45MTggMS4yNzUgMCAuNzc5LS4zMzYgMS4yOS0uOTE4IDEuMjlabTcuMjkzLTMuNDcyaC0uODY3di0uMjkyYzAtLjI5Ni4xMi0uNDY5LjQ3NS0uNDY5LjE0NCAwIC4yOTIuMDMxLjM4OS4wNjNsLjIxMy0uOTFhMy4xOSAzLjE5IDAgMCAwLS44NTUtLjExOWMtLjgyMSAwLTEuNDMyLjQ2My0xLjQzMiAxLjQxMnYuMzE1aC0uNjE3di45MWguNjE3VjMzaDEuMjF2LTMuNDU0aC44Njd2LS45MVpNMzAuMzU4IDMzaDEuMjF2LTQuMzY0aC0xLjIxVjMzWm0uNjA4LTQuOTI2Yy4zNiAwIC42NTYtLjI3Ni42NTYtLjYxNCAwLS4zMzUtLjI5NS0uNjEtLjY1Ni0uNjEtLjM1OCAwLS42NTQuMjc1LS42NTQuNjEgMCAuMzM4LjI5Ni42MTQuNjU0LjYxNFptMi43ODItLjg5MmgtMS4yMVYzM2gxLjIxdi01LjgxOFptMi45NTggNS45MDNjMS4wOCAwIDEuODA3LS41MjUgMS45NzctMS4zMzVsLTEuMTItLjA3NGMtLjEyMS4zMzItLjQzNC41MDYtLjgzNy41MDYtLjYwNSAwLS45ODktLjQtLjk4OS0xLjA1MXYtLjAwM2gyLjk3MnYtLjMzMmMwLTEuNDgzLS44OTgtMi4yMTYtMi4wNTEtMi4yMTYtMS4yODQgMC0yLjExNy45MTItMi4xMTcgMi4yNTggMCAxLjM4NC44MjEgMi4yNDcgMi4xNjUgMi4yNDdabS0uOTY5LTIuNzA3YS45MjIuOTIyIDAgMCAxIC45NC0uODk1Yy41MjYgMCAuODkuMzc1Ljg5My44OTVoLTEuODMzWiIgZmlsbD0iIzhFOEU4RSIvPjxnIGNsaXAtcGF0aD0idXJsKCNhKSI+PHBhdGggZD0iTTI4LjE2NyAxNi45MTd2My4zMzNjMCAuOTItLjc0NyAxLjY2Ny0xLjY2NyAxLjY2N2gtNS44MzNjLS45MiAwLTEuNjY3LS43NDctMS42NjctMS42Njd2LTVoNy41Yy45MiAwIDEuNjY3Ljc0NiAxLjY2NyAxLjY2N1oiIGZpbGw9IiNCRUJFQkUiLz48cGF0aCBkPSJNMjAgMTRoM2ExIDEgMCAwIDEgMSAxdjEuNWgtNVYxNWExIDEgMCAwIDEgMS0xWiIgZmlsbD0iI0JFQkVCRSIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNy4zMzQgMjAuNjY3aC44MzN2Mi41aC0uODMzek0yNi41IDIxLjVoLjgzM3YxLjY2N0gyNi41ek0yNCAyMS41aDIuNXYxLjY2N0gyNHoiLz48Y2lyY2xlIGN4PSIyNS42NjciIGN5PSIyMC42NjciIHI9IjMuMzMzIiBmaWxsPSIjRjVGNUY1IiBzdHJva2U9IiNGNUY1RjUiIHN0cm9rZS13aWR0aD0iLjgzMyIvPjxjaXJjbGUgY3g9IjI1LjY2NiIgY3k9IjIwLjY2NyIgcj0iMS44MzMiIHN0cm9rZT0iI0JFQkVCRSIgc3Ryb2tlLXdpZHRoPSIxLjE2NyIvPjxwYXRoIGQ9Im0yNi45MzggMjEuODU2IDEuNzM1IDEuNzM2IiBzdHJva2U9IiNCRUJFQkUiIHN0cm9rZS13aWR0aD0iMS4xNjciLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOSAxNCkiIGQ9Ik0wIDBoMTB2MTBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4K",
  uploadImg: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iNS44IiB5PSIxMC44IiB3aWR0aD0iMzYuNCIgaGVpZ2h0PSIyNi40IiByeD0iMy4yIiBmaWxsPSIjZmZmIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMS42Ii8+PGNpcmNsZSBjeD0iMTMuNSIgY3k9IjE4LjUiIHI9IjMuNSIgZmlsbD0iI0VFQ0E4NiIvPjxwYXRoIGQ9Ik0yNy45MjMgMTguMzY2YTEgMSAwIDAgMSAxLjY5Ni0uMDE4bDguMzk1IDEzLjExM0ExIDEgMCAwIDEgMzcuMTcyIDMzSDIwLjc4MWExIDEgMCAwIDEtLjg1NC0xLjUybDcuOTk2LTEzLjExNFoiIGZpbGw9IiM4MkJGOTkiLz48cGF0aCBkPSJNMTYuNjc2IDI2LjE5OWExIDEgMCAwIDEgMS42NDggMGwzLjU5OSA1LjIzNEExIDEgMCAwIDEgMjEuMDk5IDMzSDEzLjlhMSAxIDAgMCAxLS44MjQtMS41NjdsMy41OTktNS4yMzRaIiBmaWxsPSIjODJCRjk5Ii8+PC9zdmc+Cg==",
  state: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMy4yIiB5PSI3LjIiIHdpZHRoPSI0MS42IiBoZWlnaHQ9IjM0LjYiIHJ4PSIzLjgiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiLz48cGF0aCBvcGFjaXR5PSIuNSIgZD0iTTcgMzB2NmEyIDIgMCAwIDAgMiAyaDMwYTIgMiAwIDAgMCAyLTJ2LTZhMiAyIDAgMCAwLTItMkg5YTIgMiAwIDAgMC0yIDJaTTcgMTN2NmEyIDIgMCAwIDAgMiAyaDMwYTIgMiAwIDAgMCAyLTJ2LTZhMiAyIDAgMCAwLTItMkg5YTIgMiAwIDAgMC0yIDJaIiBmaWxsPSIjRDhEOEQ4Ii8+PHJlY3QgeD0iMTQuMiIgeT0iMTcuMiIgd2lkdGg9IjMyLjYiIGhlaWdodD0iMTUuNiIgcng9IjEuOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjRDhEOEQ4IiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIG9wYWNpdHk9Ii41IiBkPSJNMTcgMjJ2NmEyIDIgMCAwIDAgMiAyaDIzYTIgMiAwIDAgMCAyLTJ2LTZhMiAyIDAgMCAwLTItMkgxOWEyIDIgMCAwIDAtMiAyWiIgZmlsbD0iI0Q4RDhEOCIvPjwvc3ZnPgo="
};
const getItemIcon = (type) => {
  return icons[type];
};
var dragItem_vue_vue_type_style_index_0_lang = "";
const _sfc_main$8 = {
  name: "dragItem",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    draggable
  },
  methods: {
    handleEnd(e, list2) {
      const index2 = e.oldIndex;
      const key = list2[index2].type + "_" + new Date().getTime();
      list2[index2].key = key;
      list2[index2].model = key;
      this.$emit("dragend", list2, e.oldIndex);
    },
    handleStart(e, list2) {
    },
    weightIcon(item) {
      if (item.icon)
        return item.icon;
      return getItemIcon(item.type);
    }
  }
};
const _hoisted_1$7 = { class: "drag-item" };
const _hoisted_2$6 = { class: "form-edit-widget-label" };
const _hoisted_3$3 = ["title"];
const _hoisted_4$3 = { class: "label-item" };
const _hoisted_5$2 = ["src", "alt"];
const _hoisted_6$2 = { class: "handle-label" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_draggable = resolveComponent("draggable");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createVNode(_component_draggable, mergeProps({
      tag: "ul",
      list: $props.list
    }, {
      group: { name: "form-draggable", pull: "clone", put: false },
      sort: false,
      animation: 180,
      ghostClass: "moving"
    }, {
      "item-key": "key",
      "force-fallback": true,
      onStart: _cache[0] || (_cache[0] = ($event) => $options.handleStart($event, $props.list)),
      onEnd: _cache[1] || (_cache[1] = ($event) => $options.handleEnd($event, $props.list))
    }), {
      item: withCtx(({ element }) => [
        createElementVNode("li", _hoisted_2$6, [
          createElementVNode("div", {
            class: "handle-widget-label",
            draggable: "true",
            title: element.label
          }, [
            createElementVNode("div", _hoisted_4$3, [
              $options.weightIcon(element) ? (openBlock(), createElementBlock("img", {
                key: 0,
                draggable: "false",
                class: "item-img",
                src: $options.weightIcon(element),
                alt: element.label
              }, null, 8, _hoisted_5$2)) : createCommentVNode("", true)
            ]),
            createElementVNode("div", _hoisted_6$2, toDisplayString(element.label), 1)
          ], 8, _hoisted_3$3)
        ])
      ]),
      _: 1
    }, 16, ["list"])
  ]);
}
var DragItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
var index_vue_vue_type_style_index_0_lang$4 = "";
const _sfc_main$7 = {
  components: {
    DragItem
  },
  props: {
    basicItem: {
      type: [Array, Boolean],
      default: true
    },
    decorateItem: {
      type: [Array, Boolean],
      default: true
    },
    layoutItem: {
      type: [Array, Boolean],
      default: true
    },
    applicationItem: {
      type: [Array, Boolean],
      default: true
    }
  },
  computed: {
    dataList() {
      const this_ = this;
      const list$12 = cloneDeep(list);
      let items = list$12.filter((t) => {
        if (t.type == "basic" && this_.basicItem) {
          return true;
        } else if (t.type == "layout" && this_.layoutItem) {
          return true;
        } else if (t.type == "application" && this_.applicationItem) {
          return true;
        } else if (t.type == "decorate" && this_.decorateItem) {
          return true;
        }
        return false;
      });
      items.map((t) => {
        if (t.type == "basic" && this_.basicItem instanceof Array) {
          const listChildren = t.list.filter((n) => this_.basicItem.includes(n.type));
          t.list = listChildren;
        } else if (t.type == "layout" && this_.layoutItem instanceof Array) {
          const listChildren = t.list.filter((n) => this_.layoutItem.includes(n.type));
          t.list = listChildren;
        } else if (t.type == "application" && this_.applicationItem instanceof Array) {
          const listChildren = t.list.filter((n) => this_.applicationItem.includes(n.type));
          t.list = listChildren;
        } else if (t.type == "decorate" && this_.decorateItem instanceof Array) {
          const listChildren = t.list.filter((n) => this_.decorateItem.includes(n.type));
          t.list = listChildren;
        }
      });
      if (this.customComponents && this.customComponents.length > 0) {
        items.push({
          type: "custom",
          name: "\u81EA\u5B9A\u4E49\u7EC4\u4EF6",
          list: this.customComponents
        });
      }
      return items;
    }
  },
  inject: {
    customComponents: {
      from: "customC",
      default: () => []
    }
  },
  data() {
    return {
      actives: [1],
      startType: "",
      data: {
        list: [],
        config: {
          layout: "horizontal",
          labelCol: { span: 4 },
          wrapperCol: { span: 18 },
          hideRequiredMark: false,
          customStyle: ""
        }
      },
      previewOptions: {
        width: 850
      },
      selectItem: {
        key: ""
      }
    };
  },
  methods: {
    itemInitArray(list2 = []) {
      const nlist = cloneDeep(list2);
      if (nlist && nlist.length > 0) {
        nlist.forEach((t, idx) => {
          if (!t.key) {
            const key = t.type + "_" + new Date().getTime() + idx;
            t["key"] = key;
            t["model"] = key;
            delete t.component;
            delete t.properties;
            delete t.seq;
          }
        });
      }
      return nlist;
    },
    generateKey(list2, index2) {
      const key = list2[index2].type + "_" + new Date().getTime();
      const nData = cloneDeep(list2[index2]);
      nData.key = key;
      nData.model = key;
      list2[index2] = nData;
      console.log("generateKey", key);
    },
    handleStart(list2, index2) {
      this.generateKey(list2, index2);
    },
    handleEnd(list2, index2) {
      this.generateKey(list2, index2);
    }
  }
};
const _hoisted_1$6 = { class: "title" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DragItem = resolveComponent("DragItem");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  const _component_el_collapse = resolveComponent("el-collapse");
  return openBlock(), createBlock(_component_el_collapse, {
    class: "drag-panel",
    modelValue: $data.actives,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.actives = $event),
    accordion: ""
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.dataList, (colItem, colIndex) => {
        return openBlock(), createElementBlock(Fragment, null, [
          colItem && colItem.list && colItem.list.length > 0 ? (openBlock(), createBlock(_component_el_collapse_item, {
            key: colIndex,
            title: colItem.name,
            name: colIndex + 1
          }, {
            title: withCtx(() => [
              createElementVNode("span", _hoisted_1$6, toDisplayString(colItem.name), 1)
            ]),
            default: withCtx(() => [
              createVNode(_component_DragItem, {
                list: $options.itemInitArray(colItem.list),
                title: colItem.name,
                onGenerateKey: $options.generateKey,
                onDragend: $options.handleEnd
              }, null, 8, ["list", "title", "onGenerateKey", "onDragend"])
            ]),
            _: 2
          }, 1032, ["title", "name"])) : createCommentVNode("", true)
        ], 64);
      }), 256))
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
var DragPanel = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
var index_vue_vue_type_style_index_0_lang$3 = "";
const _sfc_main$6 = {
  name: "ng-form-container",
  components: {
    Node: NgFormNode,
    draggable
  },
  data() {
    return {};
  },
  props: {
    formTemplate: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object
    }
  },
  methods: {
    dragEnd(evt, list2) {
      const clone2 = cloneDeep(this.formTemplate.list[evt.newIndex]);
      this.formTemplate.list[evt.newIndex] = clone2;
      console.log("list", this.formTemplate.list);
      this.$emit("update:formTemplate", this.formTemplate);
      this.handleSelectItem(this.formTemplate.list[evt.newIndex]);
    },
    handleSelectItem(record) {
      this.$emit("handleSelectItem", record);
    },
    handleCopy(item) {
      const nitem = cloneDeep(item);
      const key = item.type + "_" + new Date().getTime();
      nitem.key = key;
      nitem.model = key;
      const oindex = this.formTemplate.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.formTemplate.list.splice(oindex + 1, 0, nitem);
      }
    },
    handleDetele(item) {
      const oindex = this.formTemplate.list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        this.formTemplate.list.splice(oindex, 1);
        this.handleSelectItem(void 0);
      }
    }
  }
};
const _hoisted_1$5 = { class: "form-panel" };
const _hoisted_2$5 = {
  key: 0,
  class: "no-data-text"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Node = resolveComponent("Node");
  const _component_draggable = resolveComponent("draggable");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    !$props.formTemplate || !$props.formTemplate.list || $props.formTemplate.list.length === 0 ? (openBlock(), createElementBlock("p", _hoisted_2$5, " \u4ECE\u5DE6\u4FA7\u9009\u62E9\u7EC4\u4EF6\u6DFB\u52A0 ")) : createCommentVNode("", true),
    createVNode(_component_el_form, {
      "label-width": $props.formTemplate.config.labelWidth + "px",
      class: "ng-form",
      "label-position": $props.formTemplate.config.labelPosition,
      "hide-required-asterisk": $props.formTemplate.config.hideRequiredMark,
      "label-suffix": $props.formTemplate.config.labelSuffix,
      ref: "form",
      style: normalizeStyle($props.formTemplate.config.customStyle),
      size: $props.formTemplate.config.size
    }, {
      default: withCtx(() => [
        createVNode(_component_el_row, {
          gutter: 20,
          class: "row"
        }, {
          default: withCtx(() => [
            createVNode(_component_draggable, mergeProps({
              tag: "div",
              class: "draggable-box items-main"
            }, {
              group: "form-draggable",
              ghostClass: "moving",
              animation: 180,
              handle: ".drag-move"
            }, {
              "force-fallback": true,
              list: $props.formTemplate.list,
              onAdd: _cache[0] || (_cache[0] = ($event) => $options.dragEnd($event)),
              "data-draggable": "true",
              "item-key": "key"
            }), {
              item: withCtx(({ element }) => [
                (openBlock(), createBlock(_component_Node, {
                  key: element.key,
                  class: "drag-move",
                  record: element,
                  isDrag: true,
                  config: $props.formTemplate.config,
                  selectItem: $props.selectItem,
                  onHandleSelectItem: $options.handleSelectItem,
                  onHandleCopy: ($event) => $options.handleCopy(element),
                  onHandleDetele: ($event) => $options.handleDetele(element)
                }, null, 8, ["record", "config", "selectItem", "onHandleSelectItem", "onHandleCopy", "onHandleDetele"]))
              ]),
              _: 1
            }, 16, ["list"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["label-width", "label-position", "hide-required-asterisk", "label-suffix", "style", "size"])
  ]);
}
var ContainerPanel = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var formProperties_vue_vue_type_style_index_0_lang = "";
const _sfc_main$5 = {
  name: "form-properties",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
const _hoisted_1$4 = { class: "form-properties" };
const _hoisted_2$4 = { class: "properties-body" };
const _hoisted_3$2 = /* @__PURE__ */ createTextVNode("\u5DE6\u5BF9\u9F50");
const _hoisted_4$2 = /* @__PURE__ */ createTextVNode("\u53F3\u5BF9\u9F50");
const _hoisted_5$1 = /* @__PURE__ */ createTextVNode("\u9876\u90E8\u5BF9\u9F50");
const _hoisted_6$1 = /* @__PURE__ */ createTextVNode("large");
const _hoisted_7 = /* @__PURE__ */ createTextVNode("default");
const _hoisted_8 = /* @__PURE__ */ createTextVNode("small");
const _hoisted_9 = /* @__PURE__ */ createTextVNode(" \u5B9E\u9645\u9884\u89C8\u6548\u679C\u8BF7\u70B9\u51FB\u9884\u89C8\u67E5\u770B ");
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio_button = resolveComponent("el-radio-button");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_divider = resolveComponent("el-divider");
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createElementVNode("div", _hoisted_2$4, [
      createVNode(_component_el_form, {
        "label-position": "left",
        size: "small"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "\u6807\u7B7E\u5BF9\u9F50\u65B9\u5F0F" }, {
            default: withCtx(() => [
              createVNode(_component_el_radio_group, {
                modelValue: $props.config.labelPosition,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.config.labelPosition = $event)
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_radio_button, { label: "left" }, {
                    default: withCtx(() => [
                      _hoisted_3$2
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_radio_button, { label: "right" }, {
                    default: withCtx(() => [
                      _hoisted_4$2
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_radio_button, { label: "top" }, {
                    default: withCtx(() => [
                      _hoisted_5$1
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          createVNode(_component_el_form_item, { label: "\u6807\u7B7E\u5BBD\u5EA6" }, {
            default: withCtx(() => [
              createVNode(_component_el_input_number, {
                modelValue: $props.config.labelWidth,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.config.labelWidth = $event),
                min: 0,
                max: 200,
                step: 10
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "\u6807\u7B7E\u540E\u7F00" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: $props.config.labelSuffix,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.config.labelSuffix = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          createVNode(_component_el_form_item, { label: "\u7EC4\u4EF6\u5C3A\u5BF8" }, {
            default: withCtx(() => [
              createVNode(_component_el_radio_group, {
                modelValue: $props.config.size,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $props.config.size = $event)
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_radio_button, { label: "large" }, {
                    default: withCtx(() => [
                      _hoisted_6$1
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_radio_button, { label: "default" }, {
                    default: withCtx(() => [
                      _hoisted_7
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_radio_button, { label: "small" }, {
                    default: withCtx(() => [
                      _hoisted_8
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          createVNode(_component_el_form_item, {
            label: "\u6821\u9A8C\u5B57\u6BB5\u63D0\u793A",
            title: "\u662F\u5426\u6253\u5F00element-ui\u4E2Dhide-required-asterisk\u5F00\u5173\uFF0C\u5373 \u662F\u5426\u9690\u85CF\u5FC5\u586B\u5B57\u6BB5\u7684\u6807\u7B7E\u65C1\u8FB9\u7684\u7EA2\u8272\u661F\u53F7"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_switch, {
                modelValue: $props.config.hideRequiredMark,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $props.config.hideRequiredMark = $event),
                "active-text": "\u6253\u5F00",
                "inactive-value": true,
                "active-value": false,
                "inactive-text": "\u5173\u95ED"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          !$props.config.hideRequiredMark ? (openBlock(), createBlock(_component_el_form_item, {
            key: 0,
            label: "\u52A8\u6001\u6821\u9A8C\u6807\u7B7E",
            title: "\u6B64\u5F00\u5173\u5728\u6253\u5F00hide-required-asterisk\u65F6\uFF0C\u662F\u5426\u5C06\u6807\u7B7E\u65C1\u8FB9\u7684\u7EA2\u8272\u661F\u53F7\u8DDF\u968F\u7EC4\u4EF6\u7684\u6821\u9A8C\u89C4\u5219\u4E00\u8D77\u663E\u793A"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_switch, {
                modelValue: $props.config.syncLabelRequired,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $props.config.syncLabelRequired = $event),
                "active-text": "\u6253\u5F00",
                "inactive-value": false,
                "active-value": true,
                "inactive-text": "\u5173\u95ED"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_el_form_item, {
            label: "\u8F93\u51FA\u9690\u85CF\u7EC4\u4EF6\u503C",
            title: "\u5F53\u5B58\u5728\u52A8\u6001\u9690\u85CF\u7684\u7EC4\u4EF6\u65F6\uFF0C\u6B64\u5F00\u5173\u51B3\u5B9A\u9690\u85CF\u7684\u7EC4\u4EF6\u4E2D\u7684\u503C\u662F\u5426\u5C06\u88AB\u5FFD\u7565\u5220\u9664"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_switch, {
                modelValue: $props.config.outputHidden,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $props.config.outputHidden = $event),
                "active-text": "\u6253\u5F00",
                "inactive-text": "\u5173\u95ED"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          createVNode(_component_el_form_item, { label: "\u8868\u5355CSS" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                type: "textarea",
                modelValue: $props.config.customStyle,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $props.config.customStyle = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          renderSlot(_ctx.$slots, "form-extend-properties"),
          createVNode(_component_el_form_item, { label: "\u63D0\u793A" }, {
            default: withCtx(() => [
              _hoisted_9
            ]),
            _: 1
          })
        ]),
        _: 3
      })
    ])
  ]);
}
var FormProperties = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
var rules_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = {
  name: "ng-form-rules",
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    keyNumber: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAddRules() {
      const addData = {
        vtype: 1,
        pattern: "",
        script: "",
        message: ""
      };
      this.value.push(addData);
      this.$emit("update:value", addData);
    },
    handleDelete(deleteIndex) {
      this.value.splice(deleteIndex, 1);
      this.$emit("update:value", this.value);
    }
  }
};
const _hoisted_1$3 = { class: "ng-form-rules" };
const _hoisted_2$3 = {
  key: 0,
  class: "option-change-box"
};
const _hoisted_3$1 = /* @__PURE__ */ createTextVNode(" \u6B63\u5219 ");
const _hoisted_4$1 = /* @__PURE__ */ createTextVNode(" \u8868\u8FBE\u5F0F ");
const _hoisted_5 = ["onClick"];
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u589E\u52A0\u6821\u9A8C");
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_col = resolveComponent("el-col");
  const _component_Delete = resolveComponent("Delete");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_row = resolveComponent("el-row");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    $props.value && $props.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
      createVNode(_component_el_checkbox, {
        modelValue: $props.value[0].required,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.value[0].required = $event),
        label: "\u5FC5\u586B"
      }, null, 8, ["modelValue"]),
      createVNode(_component_el_input, {
        modelValue: $props.value[0].message,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.value[0].message = $event),
        placeholder: "\u5FC5\u586B\u6821\u9A8C\u63D0\u793A\u4FE1\u606F"
      }, null, 8, ["modelValue"])
    ], 64)) : createCommentVNode("", true),
    createVNode(_component_el_row, { gutter: 8 }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (val, index2) => {
          return openBlock(), createElementBlock("span", { key: index2 }, [
            index2 !== 0 ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
              createVNode(_component_el_col, { span: 24 }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(index2) + "\u3001 ", 1),
                  createVNode(_component_el_radio, {
                    modelValue: val.vtype,
                    "onUpdate:modelValue": ($event) => val.vtype = $event,
                    label: 1,
                    title: "\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u8981\u5E26\u524D\u540E\u7684/"
                  }, {
                    default: withCtx(() => [
                      _hoisted_3$1
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_radio, {
                    modelValue: val.vtype,
                    "onUpdate:modelValue": ($event) => val.vtype = $event,
                    label: 2,
                    title: "\u8868\u8FBE\u5F0F\u4E2D$\u8868\u793A\u5168\u5C40\u8868\u5355\u6570\u636E,$row\u8868\u793A\u5728\u52A8\u6001\u8868\u683C\u5185\u5355\u884C\u7684\u6570\u636E"
                  }, {
                    default: withCtx(() => [
                      _hoisted_4$1
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_col, { span: 20 }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: val.message,
                    "onUpdate:modelValue": ($event) => val.message = $event,
                    placeholder: "\u63D0\u793A\u4FE1\u606F"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_col, { span: 4 }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    onClick: ($event) => $options.handleDelete(index2),
                    class: "option-delete-box"
                  }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Delete)
                      ]),
                      _: 1
                    })
                  ], 8, _hoisted_5)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_col, { span: 24 }, {
                default: withCtx(() => [
                  val.vtype == 1 ? (openBlock(), createBlock(_component_el_input, {
                    key: 0,
                    modelValue: val.pattern,
                    "onUpdate:modelValue": ($event) => val.pattern = $event,
                    placeholder: "\u6B63\u5219\u8868\u8FBE\u5F0Fpattern"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : val.vtype == 2 ? (openBlock(), createBlock(_component_el_input, {
                    key: 1,
                    type: "textarea",
                    modelValue: val.script,
                    "onUpdate:modelValue": ($event) => val.script = $event,
                    placeholder: "\u6761\u4EF6\u8868\u8FBE\u5F0F"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024)
            ])) : createCommentVNode("", true)
          ]);
        }), 128)),
        !$props.disabled ? (openBlock(), createBlock(_component_el_col, {
          key: 0,
          span: 24
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              type: "primary",
              onClick: $options.handleAddRules
            }, {
              default: withCtx(() => [
                _hoisted_6
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ]);
}
var Rules = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
var index_vue_vue_type_style_index_0_lang$2 = "";
const _sfc_main$3 = {
  name: "ng-form",
  components: {
    KvList,
    Rules
  },
  data() {
    return {};
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  mounted() {
  },
  methods: {
    getScriptValue(script, currentValue) {
      return dynamicFun(script, this.record, currentValue);
    },
    columnVisible(script) {
      if (script == false)
        return false;
      if (typeof script == "string") {
        return dynamicFun(script, this.record);
      }
      return true;
    },
    addData(recordProp, columnProp, type) {
      let defaultVal = "#ffffff";
      if (recordProp[columnProp] == void 0 || recordProp[columnProp] == null || !(recordProp[columnProp] instanceof Array)) {
        recordProp[columnProp] = [defaultVal];
      } else {
        recordProp[columnProp].push(defaultVal);
      }
    },
    removeData(model, prop, index2) {
      const nlist = model[prop].filter((value, i) => i !== index2);
      model[prop] = nlist;
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_divider = resolveComponent("el-divider");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_radio_button = resolveComponent("el-radio-button");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_el_date_picker = resolveComponent("el-date-picker");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_slider = resolveComponent("el-slider");
  const _component_el_color_picker = resolveComponent("el-color-picker");
  const _component_KvList = resolveComponent("KvList");
  const _component_Rules = resolveComponent("Rules");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  return openBlock(), createBlock(_component_el_form, {
    ref: "form",
    class: "ng-form",
    onSubmit: _cache[0] || (_cache[0] = withModifiers(() => {
    }, ["prevent"])),
    model: $props.model,
    "label-suffix": $props.config.labelSuffix,
    size: "small",
    "label-position": "right",
    "label-width": ($props.config.labelWidth || 80) + "px"
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, (column) => {
        return openBlock(), createElementBlock(Fragment, null, [
          column.type == "divider" && (column.show == void 0 || column.show == true || $options.columnVisible(column.show)) ? (openBlock(), createBlock(_component_el_divider, {
            key: column.label,
            "content-position": "center",
            class: "ng-form-divider"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(column.label), 1)
            ]),
            _: 2
          }, 1024)) : column.show == void 0 || column.show == true || $options.columnVisible(column.show) ? (openBlock(), createBlock(_component_el_form_item, {
            prop: column.prop,
            label: column.label,
            rules: column.rules,
            title: column.tip,
            "label-width": column.labelWidth != null ? column.labelWidth + "px" : null,
            key: column.prop
          }, createSlots({
            default: withCtx(() => [
              !column.type || column.type == "input" ? (openBlock(), createBlock(_component_el_input, {
                key: 0,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                modelModifiers: { trim: true },
                placeholder: column.placeholder
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : column.type == "textarea" ? (openBlock(), createBlock(_component_el_input, {
                key: 1,
                type: "textarea",
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                placeholder: column.placeholder
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : column.type == "number" ? (openBlock(), createBlock(_component_el_input_number, {
                key: 2,
                style: { "width": "100%" },
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                "controls-position": "right",
                min: column.min || void 0,
                max: column.max || void 0,
                precision: column.precision,
                step: column.step
              }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "precision", "step"])) : column.type == "numbers" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($props.model[column.prop], (item, index2) => {
                  return openBlock(), createElementBlock("div", { key: index2 }, [
                    createVNode(_component_el_row, { span: 24 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 22 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input_number, {
                              modelValue: $props.model[column.prop][index2],
                              "onUpdate:modelValue": ($event) => $props.model[column.prop][index2] = $event,
                              "controls-position": "right",
                              min: column.min || void 0,
                              max: column.max || void 0,
                              precision: column.precision,
                              step: column.step
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "precision", "step"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_el_col, {
                          span: 2,
                          style: { "padding-left": "5px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              text: "",
                              icon: "Close",
                              onClick: ($event) => $options.removeData($props.model, column.prop, index2)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128)),
                createVNode(_component_el_button, {
                  text: "",
                  icon: "Plus",
                  onClick: ($event) => $options.addData($props.model, column.prop, column.type)
                }, null, 8, ["onClick"])
              ], 64)) : column.type == "radio" ? (openBlock(), createBlock(_component_el_radio_group, {
                key: 4,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(column.dicData, (rv) => {
                    return openBlock(), createBlock(_component_el_radio, {
                      label: rv.value,
                      key: rv.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(rv.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])) : column.type == "radioButton" ? (openBlock(), createBlock(_component_el_radio_group, {
                key: 5,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(column.dicData, (rv) => {
                    return openBlock(), createBlock(_component_el_radio_button, {
                      label: rv.value,
                      key: rv.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(rv.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])) : column.type == "switch" ? (openBlock(), createBlock(_component_el_switch, {
                key: 6,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])) : column.type == "date" ? (openBlock(), createBlock(_component_el_date_picker, {
                key: 7,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                align: "right",
                type: "date",
                clearable: "",
                placeholder: column.placeholder,
                format: column.format,
                "value-format": column.format
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "format", "value-format"])) : column.type == "checkbox" ? (openBlock(), createBlock(_component_el_checkbox_group, {
                key: 8,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(column.dicData, (rv) => {
                    return openBlock(), createBlock(_component_el_checkbox, {
                      label: rv.value,
                      key: rv.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(rv.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])) : column.type == "select" ? (openBlock(), createBlock(_component_el_select, {
                key: 9,
                clearable: "",
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                placeholder: "\u8BF7\u9009\u62E9",
                style: { "width": "100%" }
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(column.dicData, (rv) => {
                    return openBlock(), createBlock(_component_el_option, {
                      label: rv.label,
                      key: rv.value,
                      value: rv.value
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])) : column.type == "slider" ? (openBlock(), createBlock(_component_el_slider, {
                key: 10,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                "show-input": column.showInput,
                min: column.min || 0,
                max: column.max,
                stops: column.stops,
                "show-stops": column.showStops,
                range: column.range
              }, null, 8, ["modelValue", "onUpdate:modelValue", "show-input", "min", "max", "stops", "show-stops", "range"])) : column.type == "doubleNumber" ? (openBlock(), createBlock(_component_el_row, { key: 11 }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: $props.model[column.prop][0],
                        "onUpdate:modelValue": ($event) => $props.model[column.prop][0] = $event,
                        "controls-position": "right",
                        min: column.min || void 0,
                        max: column.max || void 0,
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_el_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: $props.model[column.prop][1],
                        "onUpdate:modelValue": ($event) => $props.model[column.prop][1] = $event,
                        "controls-position": "right",
                        min: column.min || void 0,
                        max: column.max || void 0,
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)) : column.type == "colors" ? (openBlock(), createElementBlock(Fragment, { key: 12 }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($props.model[column.prop], (item, index2) => {
                  return openBlock(), createElementBlock("div", { key: index2 }, [
                    createVNode(_component_el_row, { span: 24 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 22 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_color_picker, {
                              modelValue: $props.model[column.prop][index2],
                              "onUpdate:modelValue": ($event) => $props.model[column.prop][index2] = $event,
                              placeholder: "\u8BF7\u9009\u62E9\u989C\u8272"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_el_col, {
                          span: 2,
                          style: { "padding-left": "5px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              text: "",
                              icon: "Close",
                              onClick: ($event) => $options.removeData($props.model, column.prop, index2)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128)),
                createVNode(_component_el_button, {
                  text: "",
                  icon: "Plus",
                  onClick: ($event) => $options.addData($props.model, column.prop, column.type)
                }, null, 8, ["onClick"])
              ], 64)) : column.type == "color" ? (openBlock(), createBlock(_component_el_color_picker, {
                key: 13,
                modelValue: $props.model[column.prop],
                "onUpdate:modelValue": ($event) => $props.model[column.prop] = $event,
                placeholder: "\u8BF7\u9009\u62E9\u989C\u8272"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])) : column.type == "kv" ? (openBlock(), createBlock(_component_KvList, {
                key: 14,
                value: $props.model[column.prop],
                keyNumber: column.keyNumber
              }, null, 8, ["value", "keyNumber"])) : column.type == "rules" ? (openBlock(), createBlock(_component_Rules, {
                key: 15,
                value: $props.model[column.prop]
              }, null, 8, ["value"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, [
            column.labelScript ? {
              name: "label",
              fn: withCtx(() => [
                createTextVNode(toDisplayString($options.getScriptValue(column.labelScript, column.label)), 1)
              ])
            } : void 0
          ]), 1032, ["prop", "label", "rules", "title", "label-width"])) : createCommentVNode("", true)
        ], 64);
      }), 256))
    ]),
    _: 1
  }, 8, ["model", "label-suffix", "label-width"]);
}
var NgForm = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var itemProperties_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  components: {
    NgForm
  },
  data() {
    return {
      activeNames: [],
      groupColumns: [],
      formColumns: {}
    };
  },
  props: {
    selectItem: {}
  },
  inject: {
    customComponents: {
      from: "customC",
      default: () => []
    }
  },
  computed: {
    selectItemKey() {
      if (this.selectItem && this.selectItem.key) {
        return this.selectItem.key;
      }
      return "";
    },
    isCustomComponent() {
      if (!this.selectItem || !this.selectItem.type)
        return false;
      if (this.customComponents && this.customComponents.length > 0) {
        const cs = this.customComponents.filter((t) => t.type == this.selectItem.type);
        return cs && cs.length > 0;
      }
      return false;
    },
    propertiesComponent() {
      if (!this.selectItem || !this.selectItem.type)
        return null;
      if (this.customComponents && this.customComponents.length > 0) {
        const cs = this.customComponents.filter((t) => t.type == this.selectItem.type);
        if (cs && cs.length > 0) {
          return cs[0].properties;
        }
      }
      const selectItemType = this.selectItem.type;
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          const itemList = list[i];
          if (itemList.list && itemList.list.length > 0) {
            const fs = itemList.list.filter((t) => t.type == selectItemType);
            if (fs && fs.length > 0) {
              return fs[0].properties;
            }
          }
        }
      }
      return null;
    },
    groupColumnsCollapse() {
      return this.groupColumns.filter((form) => {
        return (form.alone == void 0 || form.alone == true) && form.column && form.column.length > 0;
      });
    }
  },
  watch: {
    selectItemKey() {
      this.init();
    }
  },
  methods: {
    init() {
      console.log("selectItemKey", this.selectItemKey);
      if (this.selectItem) {
        this.$nextTick(() => {
          if (this.$refs.properties && this.$refs.properties.init) {
            this.$refs.properties.init();
          }
        });
        this.groupColumns = this.initFormOptions();
        this.formColumns = this.initFormColumns();
        this.formGroupColumn = [];
      } else {
        this.groupColumns = [];
        this.formColumns = {};
        this.formGroupColumn = {};
      }
    },
    initFormOptions() {
      const currentType = this.selectItem.type;
      const configs = NgConstants.itemConfig;
      if (configs && configs[currentType]) {
        const tformOptions = cloneDeep(configs[currentType].options);
        let config_ = __spreadValues({}, tformOptions.config);
        const groups = tformOptions.group;
        if (!groups || groups.length == 0) {
          return [];
        }
        const this_ = this;
        const groupColumns = [];
        groups.forEach((t) => {
          t.config = config_;
          const prop = t.prop;
          if (!this_.selectItem[prop]) {
            this_.selectItem.prop = {};
          }
          const groupColumn = t.column;
          if (groupColumn) {
            groupColumn.filter((gf) => gf.default).forEach((gc) => {
              if (!Object.prototype.hasOwnProperty.call(this_.selectItem[prop], gc.prop)) {
                this_.selectItem[prop][gc.prop] = gc.default;
              }
            });
          }
          groupColumns.push(t);
        });
        return groupColumns;
      }
      return [];
    },
    initFormColumns() {
      if (this.isCustomComponent && this.selectItem) {
        let label_ = this.selectItem.label;
        let labelWidth_ = this.selectItem.labelWidth;
        let width_ = this.selectItem.width;
        let span_ = this.selectItem.span;
        if (!label_) {
          label_ = this.selectItem.type;
          this.selectItem["label"] = label_;
        }
        if (!labelWidth_) {
          labelWidth_ = -1;
          this.selectItem["labelWidth"] = labelWidth_;
        }
        if (!width_) {
          width_ = "100%";
          this.selectItem["width"] = width_;
        }
        if (!span_) {
          span_ = 24;
          this.selectItem["span"] = span_;
        }
        return {
          config: {
            size: "small",
            labelWidth: 80
          },
          column: [
            {
              label: "\u6807\u7B7E",
              prop: "label",
              default: label_,
              span: 24
            },
            {
              label: "\u6807\u7B7E\u5BBD\u5EA6",
              prop: "labelWidth",
              type: "number",
              min: -1,
              max: 1e3,
              default: labelWidth_,
              span: 24
            },
            {
              label: "\u8981\u7D20\u5BBD\u5EA6",
              prop: "width",
              default: width_,
              span: 24
            },
            {
              label: "\u6240\u5360\u6805\u683C",
              type: "slider",
              prop: "span",
              min: 1,
              max: 24,
              default: span_,
              span: 24
            }
          ]
        };
      }
      const currentType = this.selectItem.type;
      const configs = NgConstants.itemConfig;
      if (configs && configs[currentType]) {
        const tformOptions = cloneDeep(configs[currentType].options);
        let config_ = __spreadValues({}, tformOptions.config);
        let columns = tformOptions.columns;
        const this_ = this;
        if (columns) {
          columns.filter((gf) => gf.default).forEach((gc) => {
            if (!Object.prototype.hasOwnProperty.call(this_.selectItem, gc.prop)) {
              this_.selectItem[gc.prop] = gc.default;
            }
          });
        }
        return { config: config_, column: columns };
      }
      return null;
    },
    showCollapse(form) {
      if (!form.column || form.column.length == 0)
        return false;
      if (form.show == void 0 || form.show == true)
        return true;
      if (typeof form.show == "string") {
        return dynamicFun(form.show, this.selectItem);
      }
      return true;
    }
  }
};
const _hoisted_1$2 = { class: "item-properties" };
const _hoisted_2$2 = { class: "no-data-text" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ng_form = resolveComponent("ng-form");
  const _component_el_collapse_item = resolveComponent("el-collapse-item");
  const _component_el_collapse = resolveComponent("el-collapse");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    withDirectives(createElementVNode("p", _hoisted_2$2, " \u8BF7\u5148\u4ECE\u9762\u677F\u4E2D\u9009\u62E9\u7EC4\u4EF6 ", 512), [
      [vShow, !$options.selectItemKey]
    ]),
    $data.formColumns && $data.formColumns.column && $data.formColumns.column.length > 0 ? (openBlock(), createBlock(_component_ng_form, {
      key: 0,
      config: $data.formColumns.config,
      record: $props.selectItem,
      model: $props.selectItem,
      columns: $data.formColumns.column
    }, null, 8, ["config", "record", "model", "columns"])) : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.groupColumns, (form, formIndex) => {
      return openBlock(), createElementBlock(Fragment, null, [
        form.alone != void 0 && form.alone == false && form.column && form.column.length > 0 ? (openBlock(), createBlock(_component_ng_form, {
          key: formIndex + $options.selectItemKey,
          config: form.config,
          record: $props.selectItem,
          model: $props.selectItem[form.prop],
          columns: form.column
        }, null, 8, ["config", "record", "model", "columns"])) : createCommentVNode("", true)
      ], 64);
    }), 256)),
    renderSlot(_ctx.$slots, "custom-properties"),
    (openBlock(), createBlock(_component_el_collapse, {
      key: "2" + $options.selectItemKey,
      modelValue: $data.activeNames,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.activeNames = $event),
      class: "ng-form-properties-collapse"
    }, {
      default: withCtx(() => [
        $options.groupColumnsCollapse && $options.groupColumnsCollapse.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($options.groupColumnsCollapse, (form, formIndex) => {
          return openBlock(), createBlock(_component_el_collapse_item, {
            key: "form" + formIndex,
            title: form.label,
            name: formIndex + ""
          }, {
            default: withCtx(() => [
              createVNode(_component_ng_form, {
                config: form.config,
                record: $props.selectItem,
                model: $props.selectItem[form.prop],
                columns: form.column
              }, null, 8, ["config", "record", "model", "columns"])
            ]),
            _: 2
          }, 1032, ["title", "name"]);
        }), 128)) : createCommentVNode("", true),
        $options.propertiesComponent ? (openBlock(), createBlock(resolveDynamicComponent($options.propertiesComponent), {
          key: 1,
          ref: "itemProperties",
          selectItem: $props.selectItem
        }, null, 8, ["selectItem"])) : createCommentVNode("", true),
        $props.selectItem && $props.selectItem.options && $data.formColumns && $data.formColumns.config ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createVNode(_component_el_collapse_item, {
            name: "event",
            title: "\u4E8B\u4EF6"
          }, {
            default: withCtx(() => [
              createVNode(_component_ng_form, {
                config: $data.formColumns.config,
                record: $props.selectItem,
                model: $props.selectItem.options,
                columns: [
                  {
                    label: "\u83B7\u53D6\u7126\u70B9",
                    prop: "focusEvent",
                    type: "textarea",
                    placeholder: "\u83B7\u53D6\u7126\u70B9\u540E\u4E8B\u4EF6,eg: $.address = $.city + $.location",
                    span: 24
                  },
                  {
                    label: "\u5931\u53BB\u7126\u70B9",
                    prop: "blurEvent",
                    type: "textarea",
                    placeholder: "\u5931\u53BB\u7126\u70B9\u540E\u4E8B\u4EF6,eg: $.address = $.city + $.location",
                    span: 24
                  }
                ]
              }, null, 8, ["config", "record", "model", "columns"])
            ]),
            _: 1
          }),
          createVNode(_component_el_collapse_item, {
            name: "listen",
            title: "\u76D1\u542C"
          }, {
            default: withCtx(() => [
              createVNode(_component_ng_form, {
                config: $data.formColumns.config,
                record: $props.selectItem,
                model: $props.selectItem.options,
                columns: [
                  {
                    label: "\u76D1\u542C\u7EC4\u4EF6",
                    prop: "listenModel",
                    type: "switch",
                    span: 24
                  },
                  {
                    label: "\u7EC4\u4EF6model",
                    prop: "listenModelData",
                    placeholder: "\u591A\u4E2A\u4F7F\u7528,\u5206\u5272",
                    show: "$.options.listenModel",
                    span: 24
                  },
                  {
                    label: "\u89E6\u53D1\u8868\u8FBE\u5F0F",
                    prop: "listenModelScript",
                    type: "textarea",
                    placeholder: "\u8868\u8FBE\u5F0F,eg: $.address = $.city + $.location",
                    show: "$.options.listenModel",
                    span: 24
                  }
                ]
              }, null, 8, ["config", "record", "model", "columns"])
            ]),
            _: 1
          }),
          createVNode(_component_el_collapse_item, {
            name: "show",
            title: "\u52A8\u6001\u914D\u7F6E"
          }, {
            default: withCtx(() => [
              createVNode(_component_ng_form, {
                config: $data.formColumns.config,
                record: $props.selectItem,
                model: $props.selectItem.options,
                columns: [
                  {
                    label: "\u52A8\u6001\u663E\u793A",
                    prop: "dynamicVisible",
                    type: "switch",
                    span: 24
                  },
                  {
                    label: "\u663E\u793A\u6761\u4EF6",
                    prop: "dynamicVisibleValue",
                    show: "$.options.dynamicVisible",
                    type: "textarea",
                    placeholder: "\u8BF7\u8F93\u5165\u663E\u793A\u6761\u4EF6,$\u6807\u8BC6\u5F53\u524D\u6574\u4E2A\u8868\u5355\u7684\u7ED1\u5B9A\u6570\u636E",
                    span: 24
                  },
                  {
                    label: "\u52A8\u6001\u7981\u7528",
                    prop: "dynamicDisabled",
                    type: "switch",
                    span: 24
                  },
                  {
                    label: "\u7981\u7528\u6761\u4EF6",
                    prop: "dynamicDisabledValue",
                    show: "$.options.dynamicDisabled",
                    type: "textarea",
                    placeholder: "\u8BF7\u8F93\u5165\u7981\u7528\u6761\u4EF6,$\u6807\u8BC6\u5F53\u524D\u6574\u4E2A\u8868\u5355\u7684\u7ED1\u5B9A\u6570\u636E",
                    span: 24
                  }
                ]
              }, null, 8, ["config", "record", "model", "columns"])
            ]),
            _: 1
          })
        ], 64)) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["modelValue"]))
  ]);
}
var ItemProperties = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var index_vue_vue_type_style_index_0_lang$1 = "";
const _sfc_main$1 = {
  components: {
    FormProperties,
    ItemProperties
  },
  props: {
    selectItem: {}
  },
  data() {
    return {
      active: "item"
    };
  },
  inject: {
    config: {
      from: "configC",
      default: () => ({})
    }
  },
  computed: {
    selectItemKey() {
      if (this.selectItem && this.selectItem.key) {
        return this.selectItem.key;
      }
      return null;
    }
  },
  watch: {
    selectItemKey(val) {
      if (val) {
        this.active = "item";
      }
    }
  }
};
const _hoisted_1$1 = { slot: "custom-properties" };
const _hoisted_2$1 = { slot: "form-extend-properties" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ItemProperties = resolveComponent("ItemProperties");
  const _component_el_tab_pane = resolveComponent("el-tab-pane");
  const _component_FormProperties = resolveComponent("FormProperties");
  const _component_el_tabs = resolveComponent("el-tabs");
  return openBlock(), createBlock(_component_el_tabs, {
    type: "card",
    modelValue: $data.active,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.active = $event),
    class: "design-properties"
  }, {
    default: withCtx(() => [
      createVNode(_component_el_tab_pane, {
        label: "\u63A7\u4EF6\u5C5E\u6027",
        name: "item",
        class: "tab-pane"
      }, {
        default: withCtx(() => [
          createVNode(_component_ItemProperties, { selectItem: $props.selectItem }, {
            default: withCtx(() => [
              createElementVNode("template", _hoisted_1$1, [
                renderSlot(_ctx.$slots, "custom-properties", { selectItem: $props.selectItem })
              ])
            ]),
            _: 3
          }, 8, ["selectItem"])
        ]),
        _: 3
      }),
      createVNode(_component_el_tab_pane, {
        label: "\u8868\u5355\u5C5E\u6027",
        name: "form",
        class: "tab-pane"
      }, {
        default: withCtx(() => [
          createVNode(_component_FormProperties, { config: $options.config }, {
            default: withCtx(() => [
              createElementVNode("template", _hoisted_2$1, [
                renderSlot(_ctx.$slots, "form-extend-properties")
              ])
            ]),
            _: 3
          }, 8, ["config"])
        ]),
        _: 3
      }),
      renderSlot(_ctx.$slots, "extend-tab", { class: "tab-pane" })
    ]),
    _: 3
  }, 8, ["modelValue"]);
}
var PropertiesPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var index_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "ng-form-design",
  components: {
    HeaderPanel,
    DragPanel,
    ContainerPanel,
    PropertiesPanel
  },
  data() {
    return {
      selectItem: {},
      template: {
        list: [],
        config: {
          labelPosition: "left",
          labelWidth: 100,
          size: "default",
          outputHidden: true,
          hideRequiredMark: false,
          syncLabelRequired: false,
          customStyle: ""
        }
      }
    };
  },
  props: {
    customComponents: {
      type: Array,
      default: () => []
    },
    clear: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    imp: {
      type: Boolean,
      default: true
    },
    exp: {
      type: Boolean,
      default: true
    },
    config: {
      type: Object
    },
    basicItem: {
      type: [Array, Boolean],
      default: true
    },
    decorateItem: {
      type: [Array, Boolean],
      default: true
    },
    layoutItem: {
      type: [Array, Boolean],
      default: true
    },
    applicationItem: {
      type: [Array, Boolean],
      default: true
    }
  },
  computed: {
    templateConfig() {
      if (this.template)
        return this.template.config;
      return {};
    },
    httpConfig() {
      if (this.config && this.config.httpConfig) {
        return this.config.httpConfig;
      }
      return null;
    }
  },
  watch: {
    httpConfig: {
      handler(newVal) {
        window.nghttpConfig = newVal;
      },
      deep: true,
      immediate: false
    }
  },
  provide: function() {
    return {
      customC: this.customComponents,
      configC: this.templateConfig,
      httpConfigC: this.httpConfig,
      ngConfig: this.config
    };
  },
  created() {
    if (this.httpConfig) {
      window.nghttpConfig = this.httpConfig;
    }
  },
  methods: {
    handleSelectItem(record) {
      this.selectItem = record;
    },
    getModel() {
      const model = cloneDeep(this.template);
      return model;
    },
    initModel(formTemplate) {
      const modelData = cloneDeep(formTemplate);
      this.importData(modelData);
    },
    importData(formTemplate = {}) {
      this.template.list = formTemplate.list;
      this.template.config = formTemplate.config;
    }
  }
};
const _hoisted_1 = { slot: "controlButton" };
const _hoisted_2 = { slot: "custom-properties" };
const _hoisted_3 = { slot: "form-extend-properties" };
const _hoisted_4 = { slot: "extend-tab" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HeaderPanel = resolveComponent("HeaderPanel");
  const _component_el_header = resolveComponent("el-header");
  const _component_DragPanel = resolveComponent("DragPanel");
  const _component_el_aside = resolveComponent("el-aside");
  const _component_ContainerPanel = resolveComponent("ContainerPanel");
  const _component_el_main = resolveComponent("el-main");
  const _component_PropertiesPanel = resolveComponent("PropertiesPanel");
  const _component_el_container = resolveComponent("el-container");
  return openBlock(), createBlock(_component_el_container, { class: "form-design" }, {
    default: withCtx(() => [
      createVNode(_component_el_header, {
        class: "header",
        height: "40px"
      }, {
        default: withCtx(() => [
          createVNode(_component_HeaderPanel, {
            clear: $props.clear,
            preview: $props.preview,
            imp: $props.imp,
            exp: $props.exp,
            formTemplate: $data.template,
            onImportData: $options.importData
          }, {
            controlButton: withCtx(() => [
              renderSlot(_ctx.$slots, "controlButton")
            ]),
            formName: withCtx(() => [
              renderSlot(_ctx.$slots, "formName")
            ]),
            _: 3
          }, 8, ["clear", "preview", "imp", "exp", "formTemplate", "onImportData"])
        ]),
        _: 3
      }),
      createVNode(_component_el_main, { class: "form-main" }, {
        default: withCtx(() => [
          createVNode(_component_el_container, { class: "ng-main-container" }, {
            default: withCtx(() => [
              createVNode(_component_el_aside, {
                width: "260px",
                class: "item-panel"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "drag"),
                  createVNode(_component_DragPanel, {
                    "basic-item": $props.basicItem,
                    "decorate-item": $props.decorateItem,
                    "layout-item": $props.layoutItem,
                    "application-item": $props.applicationItem
                  }, null, 8, ["basic-item", "decorate-item", "layout-item", "application-item"])
                ]),
                _: 3
              }),
              createVNode(_component_el_main, { class: "center-panel form-main" }, {
                default: withCtx(() => [
                  createVNode(_component_ContainerPanel, {
                    formTemplate: $data.template,
                    onHandleSelectItem: $options.handleSelectItem,
                    selectItem: $data.selectItem
                  }, {
                    default: withCtx(() => [
                      createElementVNode("template", _hoisted_1, [
                        renderSlot(_ctx.$slots, "controlButton")
                      ])
                    ]),
                    _: 3
                  }, 8, ["formTemplate", "onHandleSelectItem", "selectItem"])
                ]),
                _: 3
              }),
              createVNode(_component_el_aside, {
                width: "260px",
                class: "properties-panel"
              }, {
                default: withCtx(() => [
                  createVNode(_component_PropertiesPanel, { selectItem: $data.selectItem }, {
                    default: withCtx(() => [
                      createElementVNode("template", _hoisted_2, [
                        renderSlot(_ctx.$slots, "custom-properties", { selectItem: $data.selectItem })
                      ]),
                      createElementVNode("template", _hoisted_3, [
                        renderSlot(_ctx.$slots, "form-extend-properties", { data: $data.template })
                      ]),
                      createElementVNode("template", _hoisted_4, [
                        renderSlot(_ctx.$slots, "extend-tab", { data: $data.template })
                      ])
                    ]),
                    _: 3
                  }, 8, ["selectItem"])
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
var NgFormDesign = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const components = [NgForm, NgFormDesign, NgFormBuild, NgFormItem, NgFormNode, NgFormItemNode];
const NgFormElementPlus = {
  install(App) {
    components.forEach((item) => {
      App.component(item.name, item);
    });
  }
};
export { NgForm, NgFormBuild, NgFormDesign, NgFormItem, NgFormItemNode, NgFormNode, NgFormElementPlus as default };