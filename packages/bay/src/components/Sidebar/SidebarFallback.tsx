import { ElSkeleton } from 'element-plus';

export const SidebarFallback = () => (
  <div class="bay-sidebar">
    <ElSkeleton style="padding: 20px; width: 120px" rows={6} animated></ElSkeleton>
  </div>
);
