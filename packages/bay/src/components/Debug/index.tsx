/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, unref, ref, reactive } from 'vue';
import { useInject } from '@wakeadmin/framework';
import { MicroApp } from '@wakeadmin/mapp/main';
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLink,
  ElSelect,
  FormInstance,
  FormRules,
} from 'element-plus';
import { DeleteBin, EditSquare } from '@wakeadmin/icons';
import { clone } from '@wakeadmin/utils';

import { useBayModel } from '@/hooks';

import './index.scss';

export const Debug = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Debug',
  setup() {
    const bayModel = useBayModel();
    const model = unref(useInject('DI.bay.MicroAppModel'));
    const adding = ref<MicroApp>();
    const addForm = ref<FormInstance>();
    const rulesAdd = reactive<FormRules>({
      name: [{ required: true }],
      entry: [{ required: true }],
      activeRule: [
        { required: true },
        {
          validator(_rule, value: string, callback) {
            const baseUrl = bayModel.bay.baseUrl;
            if (value && baseUrl !== '/') {
              const list = value
                .split(',')
                .map(i => i.trim())
                .filter(Boolean);
              if (list.some(i => i.startsWith(baseUrl))) {
                callback(new Error(`activeRule 不需要加上 baseUrl 前缀`));
              } else {
                callback();
              }
            } else {
              callback();
            }
          },
        },
      ],
    });

    const handleAdd = () => {
      adding.value = {
        name: '',
        entry: '',
        activeRule: '',
        routeMode: 'hash',
      };
    };

    const handleEdit = (app: MicroApp) => {
      adding.value = clone(app);

      model.deleteLocalMapp(app);
    };

    const handleSaveAdd = async () => {
      const valid = await addForm.value?.validate();

      if (valid) {
        const value = adding.value!;
        model.addLocalMapp(value);
        adding.value = undefined;
      }
    };

    return () => {
      return (
        <div>
          <div class="debug">
            <div class="debug__hd">已注册微应用</div>
            <div class="debug__bd">
              <div>基本信息</div>
              <ul>
                <li>baseUrl: {bayModel.bay.baseUrl}</li>
              </ul>

              <div>微应用</div>
              <ul>
                {model.apps.map((i, idx) => {
                  const removable = model.isLocalApp(i);
                  return (
                    <li key={idx} class="debug-mapp">
                      {removable && <div class="debug__badge">本地</div>}
                      name=<span class="debug__field">{i.name}</span>; entry=<span class="debug__field">{i.entry}</span>
                      ; activeRule=<span class="debug__field">{JSON.stringify(i.activeRule)}</span>; independent=
                      <span class="debug__field">{String(!!i.independent)}</span>; routeMode=
                      <span class="debug__field">{i.routeMode ?? 'hash'}</span>
                      <ElLink
                        href={bayModel.generateLandingUrl({ type: 'app', name: i.name })}
                        style="margin-left: 20px"
                      >
                        打开
                      </ElLink>
                      {removable && (
                        <ElIcon class="debug__delete">
                          <DeleteBin onClick={() => model.deleteLocalMapp(i)}></DeleteBin>
                        </ElIcon>
                      )}
                      {removable && (
                        <ElIcon class="debug__delete">
                          <EditSquare onClick={() => handleEdit(i)}></EditSquare>
                        </ElIcon>
                      )}
                    </li>
                  );
                })}
              </ul>
              {!adding.value && <ElButton onClick={handleAdd}>添加本地应用</ElButton>}
              {!!adding.value && (
                <div class="debug__add">
                  <ElForm ref={addForm} labelWidth="180px" labelPosition="right" rules={rulesAdd} model={adding.value}>
                    <ElFormItem label="名称(name)" prop="name">
                      <ElInput
                        modelValue={adding.value.name}
                        onUpdate:modelValue={v => (adding.value!.name = v)}
                        placeholder="微应用名称"
                      />
                    </ElFormItem>
                    <ElFormItem label="入口(entry)" prop="entry">
                      <ElInput
                        modelValue={adding.value.entry}
                        onUpdate:modelValue={v => (adding.value!.entry = v)}
                        placeholder="//localhost:port"
                      />
                    </ElFormItem>
                    <ElFormItem label="路由(activeRule)" prop="activeRule">
                      <ElInput
                        modelValue={adding.value.activeRule as string}
                        onUpdate:modelValue={v => (adding.value!.activeRule = v)}
                        placeholder="/my-app, 多个 activeRule 可以使用 ',' 分割"
                      />
                    </ElFormItem>
                    <ElFormItem label="独立模式(independent)" prop="independent">
                      <ElCheckbox
                        modelValue={adding.value.independent}
                        onUpdate:modelValue={v => (adding.value!.independent = v as boolean)}
                      />
                    </ElFormItem>
                    <ElFormItem label="路由模式(routeMode)" prop="routeMode">
                      <ElSelect
                        modelValue={adding.value.routeMode}
                        onUpdate:modelValue={v => (adding.value!.routeMode = v)}
                      >
                        <ElSelect.Option value="hash">hash 模式</ElSelect.Option>
                        <ElSelect.Option value="history">history 模式</ElSelect.Option>
                      </ElSelect>
                    </ElFormItem>
                    <ElFormItem>
                      <ElButton onClick={handleSaveAdd}>添加</ElButton>
                    </ElFormItem>
                  </ElForm>
                </div>
              )}
            </div>
          </div>

          <div class="debug">
            <div class="debug__hd">调试脚本注入</div>
            <div class="debug__bd">
              <ElInput
                modelValue={model.debugScript}
                onUpdate:modelValue={e => {
                  model.saveDebugScript(e);
                }}
                placeholder="调试脚本链接，多个脚本以 ',' 分隔, 重启后生效"
              />
            </div>
          </div>
        </div>
      );
    };
  },
});
