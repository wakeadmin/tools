/**
 * 面包屑
 */
import { NoopArray } from '@wakeadmin/utils';
import { computed, defineComponent, unref } from 'vue';

import { useBayModel } from '@/hooks';
import { TreeNode } from '@/tree';

import style from './Breadcrumb.scss?inline';

export const Breadcrumb = defineComponent({
  name: 'BayLayoutBreadcrumb',
  styles: [style],
  props: {
    includeRoot: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const bay = useBayModel();

    const breadcrumbs = computed(() => {
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

    return () => {
      const list = unref(breadcrumbs);
      if (list.length) {
        return (
          <div class="bay-layout-breadcrumb">
            {list.map((i, idx) => {
              const isLeaf = idx === list.length - 1;
              const handleClick = () => {
                if (!isLeaf) {
                  bay.openTreeNode(i);
                }
              };

              return (
                <div class={['bay-layout-breadcrumb__item', { leaf: isLeaf }]} key={i.uid} onClick={handleClick}>
                  <span class="bay-layout-breadcrumb__name">{i.name}</span>
                  {!isLeaf && <span class="bay-layout-breadcrumb__separator">/</span>}
                </div>
              );
            })}
          </div>
        );
      }

      return null;
    };
  },
});
