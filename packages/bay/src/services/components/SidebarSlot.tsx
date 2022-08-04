import { defineComponent, onMounted, ref, Teleport, Ref, onBeforeUnmount } from 'vue';
import { Disposer } from '@wakeadmin/utils';

import { useBayModel } from '@/hooks';
import { MOUNT_POINT_SIDEBAR_BOTTOM, MOUNT_POINT_SIDEBAR_TOP } from '@/constants';

const STYLE_SHOW = { display: 'contents' };
const STYLE_HIDE = { display: 'none' };

function factory(mountPoint: string) {
  return defineComponent({
    name: 'BayLayoutSidebarSlot',
    setup() {
      const bay = useBayModel();
      const target = '#' + mountPoint;
      const defaultSlot = ref<HTMLSlotElement>();
      const collapseSlot = ref<HTMLSlotElement>();
      const expandSlot = ref<HTMLSlotElement>();

      const defaultTarget = ref<HTMLDivElement>();
      const collapseTarget = ref<HTMLDivElement>();
      const expandTarget = ref<HTMLDivElement>();
      const disposer = new Disposer();

      // 迁移 slot
      onMounted(() => {
        (
          [
            [defaultSlot, defaultTarget],
            [collapseSlot, collapseTarget],
            [expandSlot, expandTarget],
          ] as [Ref<HTMLSlotElement>, Ref<HTMLDivElement>][]
        ).forEach(([slotRef, targetRef]) => {
          if (slotRef.value) {
            const slot = slotRef.value;
            const assign = () => {
              const nodes = slot.assignedNodes();
              const targetNode = targetRef.value;

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
        });
      });

      onBeforeUnmount(disposer.release);

      return () => {
        return (
          <div>
            <div style="display: none">
              <slot ref={defaultSlot}></slot>
              <slot ref={collapseSlot} name="collapse"></slot>
              <slot ref={expandSlot} name="expand"></slot>
            </div>

            <Teleport to={target}>
              <div ref={defaultTarget} class="default-slot" style={STYLE_SHOW}></div>
              <div
                ref={collapseTarget}
                class="collapse-slot"
                style={bay.sidebarCollasped ? STYLE_SHOW : STYLE_HIDE}
              ></div>
              <div ref={expandTarget} class="expand-slot" style={bay.sidebarCollasped ? STYLE_HIDE : STYLE_SHOW}></div>
            </Teleport>
          </div>
        );
      };
    },
  });
}
export const SidebarBottomSlot = factory(MOUNT_POINT_SIDEBAR_BOTTOM);
export const SidebarTopSlot = factory(MOUNT_POINT_SIDEBAR_TOP);
