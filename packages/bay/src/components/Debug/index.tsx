/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, unref, ref, reactive } from 'vue';
import { useInject } from '@wakeadmin/framework';
import { MicroApp } from '@wakeadmin/mapp/main';
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElTable,
  ElTableColumn,
  FormInstance,
  FormRules,
} from 'element-plus';
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

    const switchLocalMappActive = (app: MicroApp) => {
      model.switchLocalMappActive(app);
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
              <ElTable data={model.apps} stripe>
                <ElTableColumn label="本地" width="80px">
                  {{
                    default(scope: { row: MicroApp }) {
                      return model.isLocalApp(scope.row) ? <div class="debug__badge">本地</div> : '';
                    },
                  }}
                </ElTableColumn>
                <ElTableColumn label="name" prop="name"></ElTableColumn>
                <ElTableColumn label="activeRule">
                  {{
                    default(scope: { row: MicroApp }) {
                      return JSON.stringify(scope.row.activeRule);
                    },
                  }}
                </ElTableColumn>
                <ElTableColumn label="independent">
                  {{
                    default(scope: { row: MicroApp }) {
                      return JSON.stringify(!!scope.row.independent);
                    },
                  }}
                </ElTableColumn>
                <ElTableColumn label="routeMode" prop="routeMode"></ElTableColumn>
                <ElTableColumn label="操作">
                  {{
                    default(scope: { row: MicroApp }) {
                      const i = scope.row;
                      const isLocalApp = model.isLocalApp(i);
                      const isActive = model.isActiveApp(i);

                      return (
                        <>
                          <ElButton
                            onClick={() =>
                              (window.location.href = bayModel.generateLandingUrl({ type: 'app', name: i.name }, true))
                            }
                          >
                            打开
                          </ElButton>
                          {isLocalApp && (
                            <>
                              <ElButton type="danger" onClick={() => model.deleteLocalMapp(i)}>
                                删除
                              </ElButton>
                              <ElButton onClick={() => switchLocalMappActive(i)}>{isActive ? '禁用' : '启用'}</ElButton>
                              <ElButton onClick={() => handleEdit(i)}>编辑</ElButton>
                            </>
                          )}
                        </>
                      );
                    },
                  }}
                </ElTableColumn>
              </ElTable>

              {!adding.value && (
                <ElButton onClick={handleAdd} style="margin-top: 20px">
                  添加本地应用
                </ElButton>
              )}
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
