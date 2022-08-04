/* eslint-disable vue/one-component-per-file */
import { defineComponent, onMounted, ref, Teleport, Ref, onBeforeUnmount } from 'vue';
import { Disposer } from '@wakeadmin/utils';

import { MOUNT_POINT_HEADER } from '@/constants';
import { registerHeaderDropdownItem } from '../header-dropdown';

function factory(mountPoint: string) {
  return defineComponent({
    name: 'BayLayoutHeaderSlot',
    setup() {
      const target = '#' + mountPoint;
      const defaultSlot = ref<HTMLSlotElement>();

      const defaultTarget = ref<HTMLDivElement>();

      const disposer = new Disposer();

      // 迁移 slot
      onMounted(() => {
        ([[defaultSlot, defaultTarget]] as [Ref<HTMLSlotElement>, Ref<HTMLDivElement>][]).forEach(
          ([slotRef, targetRef]) => {
            if (slotRef.value) {
              const slot = slotRef.value;
              const assign = () => {
                const targetNode = targetRef.value;
                const nodes = slot.assignedNodes();

                if (targetNode == null) {
                  return;
                }

                for (const node of nodes) {
                  if (!targetNode.contains(node)) {
                    targetNode.appendChild(node);
                  }
                }
              };

              slot.addEventListener('slotchange', assign);

              disposer.push(() => {
                slot.removeEventListener('slotchange', assign);
              });

              assign();
            }
          }
        );
      });

      onBeforeUnmount(disposer.release);

      return () => {
        return (
          <div>
            <div style="display: none">
              <slot ref={defaultSlot}></slot>
            </div>

            <Teleport to={target}>
              <div ref={defaultTarget} class="default-slot" style="display: contents"></div>
            </Teleport>
          </div>
        );
      };
    },
  });
}

export const HeaderDropdownMenu = defineComponent({
  name: 'BayLayoutHeaderDropdownMenu',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
  },
  emits: {
    click() {
      return true;
    },
  },
  setup(props, context) {
    const dispose = registerHeaderDropdownItem({
      title: () => props.title,
      icon: () => props.icon,
      onClick: () => context.emit('click'),
    });

    onBeforeUnmount(dispose);

    return () => null;
  },
});

export const HeaderSlot = factory(MOUNT_POINT_HEADER);
