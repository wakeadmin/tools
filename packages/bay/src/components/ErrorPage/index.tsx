/**
 * 基座错误页面
 */
import { ErrorPageProps } from '@wakeadmin/mapp';
import { ElButton, ElSpace } from 'element-plus';
import { useT } from '@/utils';

import './index.scss';

const goHome = () => window.location.replace('/');
const goBack = () => window.history.back();

export function ErrorPage(props: ErrorPageProps) {
  const t = useT();
  let children: JSX.Element;

  if (props.type === 'http') {
    const code = props.code ?? '500';

    const detail = (
      <div class="bay-error__detail">
        <ElSpace>
          <ElButton onClick={goBack}>{t('bay.back')}</ElButton>
          <ElButton onClick={goHome}>{t('bay.backHome')}</ElButton>
        </ElSpace>
      </div>
    );

    if (code === '404') {
      children = <wkc-error-page-not-found>{detail}</wkc-error-page-not-found>;
    } else if (code === '403') {
      children = <wkc-error-page-forbidden>{detail}</wkc-error-page-forbidden>;
    } else {
      children = <wkc-error-page description={t('bay.serverError', { code })} />;
    }
  } else {
    children = (
      <wkc-error-page description={props.title}>
        {!!props.detail && <div class="bay-error__detail">{props.detail}</div>}
      </wkc-error-page>
    );
  }

  return <div class="bay-error-page">{children}</div>;
}
