<% if (type === 'vue2') { %>
import { registerBundles } from '@wakeadmin/i18n-legacy'
<% } else { %>
import { registerBundles } from '@wakeadmin/i18n'
<% } %>

registerBundles({
	zh: () => import('./zh.tr'),
	en: () => import('./en.tr'),
	'zh-Hant': () => import('./zh-Hant.tr'),
	'th-Hant': () => import('./th.tr'),
})