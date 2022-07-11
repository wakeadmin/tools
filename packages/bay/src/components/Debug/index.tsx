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
  ElMessageBox,
  FormInstance,
  FormRules,
} from 'element-plus';
import { DeleteBin, EditSquare } from '@wakeadmin/icons';
import { clone } from '@wakeadmin/utils';

import { useBayModel } from '@/hooks';

import './index.scss';

export const Debug = defineComponent({
  name: 'Debug',
  setup() {
    const bayModel = useBayModel();
    const model = unref(useInject('DI.bay.MicroAppModel'));
    const adding = ref<MicroApp>();
    const addForm = ref<FormInstance>();
    const rulesAdd = reactive<FormRules>({
      name: [{ required: true }],
      entry: [{ required: true }],
      activeRule: [{ required: true }],
    });

    const handleAdd = () => {
      adding.value = {
        name: '',
        entry: '',
        activeRule: '',
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
        let hasDuplicateName = false;
        let hasDuplicateActiveRule = false;

        for (const item of model.apps) {
          if (item.name === value.name) {
            hasDuplicateName = true;
          }

          if (item.activeRule === value.activeRule) {
            hasDuplicateActiveRule = true;
          }
        }

        try {
          if (hasDuplicateName || hasDuplicateActiveRule) {
            await ElMessageBox.confirm(
              `${hasDuplicateName ? '存在重复的名称' : ''} ${
                hasDuplicateActiveRule ? '存在重复的路由' : ''
              }, 确认覆盖？`
            );
          }

          model.addLocalMapp(value);
          adding.value = undefined;
        } catch {
          // ignore
        }
      }
    };

    return () => {
      return (
        <div class="debug">
          <div class="debug__hd">已注册微应用</div>
          <div class="debug__bd">
            <ul>
              {model.apps.map(i => {
                const removable = model.isLocalApp(i);
                return (
                  <li key={`${i.name}-${i.activeRule}-${i.entry}`} class="debug-mapp">
                    {removable && <div class="debug__badge">本地</div>}
                    name=<span class="debug__field">{i.name}</span>; entry=<span class="debug__field">{i.entry}</span>;
                    activeRule=<span class="debug__field">{i.activeRule}</span>; independent=
                    <span class="debug__field">{String(!!i.independent)}</span>
                    <ElLink href={bayModel.generateLandingUrl({ type: 'app', name: i.name })} style="margin-left: 20px">
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
                      modelValue={adding.value.activeRule}
                      onUpdate:modelValue={v => (adding.value!.activeRule = v)}
                      placeholder="/my-app"
                    />
                  </ElFormItem>
                  <ElFormItem label="独立模式(independent)" prop="independent">
                    <ElCheckbox
                      modelValue={adding.value.independent}
                      onUpdate:modelValue={v => (adding.value!.independent = v as boolean)}
                    />
                  </ElFormItem>
                  <ElFormItem>
                    <ElButton onClick={handleSaveAdd}>添加</ElButton>
                  </ElFormItem>
                </ElForm>
              </div>
            )}
          </div>
        </div>
      );
    };
  },
});
