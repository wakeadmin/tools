/**
 * 面包屑
 */
import { NoopArray } from '@wakeadmin/utils';
import { computed, defineComponent, unref, PropType } from 'vue';

import { useBayModel } from '@/hooks';
import { TreeNode } from '@/tree';
import { getMenuI18nKey, useT } from '@/utils';

import style from './Breadcrumb.scss?inline';

export interface CustomBreadcrumbItem {
  id?: string;
  title: string;
  onClick?: () => void;
}

export const Breadcrumb = defineComponent({
  name: 'BayLayoutBreadcrumb',
  styles: [style],
  props: {
    includeRoot: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array as PropType<CustomBreadcrumbItem[]>,
      default: undefined,
    },
  },
  setup(props) {
    const bay = useBayModel();
    const t = useT();

    const nodes = computed(() => {
      const activeNode = bay.menu?.activeNode;
      if (activeNode == null) {
        return NoopArray;
      }

      const list: TreeNode[] = [];
      let current: TreeNode | undefined = activeNode;

      while (current) {
        if (current.url) {
          list.push(current);
        }

        current = current.parent;
      }

      list.reverse();

      if (props.includeRoot) {
        return list;
      }

      return list.slice(1);
    });

    const breadcrumb = computed<(TreeNode | CustomBreadcrumbItem)[]>(() => {
      return [...nodes.value, ...(props.list ?? NoopArray)];
    });

    return () => {
      const list = unref(breadcrumb);
      if (list.length) {
        return (
          <div class="bay-layout-breadcrumb">
            {list.map((i, idx) => {
              const isLeaf = idx === list.length - 1;
              const handleClick = () => {
                if (TreeNode.isTreeNode(i)) {
                  if (!isLeaf) {
                    bay.openTreeNode(i);
                  }
                } else {
                  i.onClick?.();
                }
              };

              if (TreeNode.isTreeNode(i)) {
                return (
                  <div class={['bay-layout-breadcrumb__item', { leaf: isLeaf }]} key={i.uid} onClick={handleClick}>
                    <span class="bay-layout-breadcrumb__name">{t(getMenuI18nKey(i.identifierPath), i.name)}</span>
                    {!isLeaf && <span class="bay-layout-breadcrumb__separator">/</span>}
                  </div>
                );
              } else {
                return (
                  <div
                    class={['bay-layout-breadcrumb__item', { leaf: isLeaf }]}
                    key={i.id ?? i.title}
                    onClick={handleClick}
                  >
                    <span class="bay-layout-breadcrumb__name">{i.title}</span>
                    {!isLeaf && <span class="bay-layout-breadcrumb__separator">/</span>}
                  </div>
                );
              }
            })}
          </div>
        );
      }

      return null;
    };
  },
});
