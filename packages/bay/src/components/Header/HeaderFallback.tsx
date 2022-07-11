import { ElSkeleton, ElSkeletonItem } from 'element-plus';

export const HeaderFallback = () => (
  <div class="bay-header">
    <ElSkeleton
      rows={1}
      animated
      v-slots={{
        template: () => <ElSkeletonItem variant="h1" />,
      }}
    ></ElSkeleton>
  </div>
);
