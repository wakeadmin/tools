/**
 * 用于浏览器注入调试
 */
const url = new URL(import.meta.url);
console.log(url);

/**
 * @param {string} link
 */
function injectStyle(link) {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = link;

  document.head.appendChild(style);
}

// 注入样式
['/dist/share.css', '/dist/element-ui.css', '/dist/element-plus.css'].forEach(l => {
  injectStyle(url.origin + l);
});
