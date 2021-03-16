let hljs = require("highlight.js/lib/highlight");
import 'highlight.js/styles/androidstudio.css';

let __BLOG_CONFIG__ = window.__BLOG_CONFIG__ || {};
__BLOG_CONFIG__.language = __BLOG_CONFIG__.language || ['xml', 'css', 'dos', 'java', 'javascript', 'json', 'php', 'python', 'scala', 'shell', 'sql', 'yaml'];
__BLOG_CONFIG__.language.forEach((item, index, array) => {
  hljs.registerLanguage(item, require('highlight.js/lib/languages/' + item));
});
export default hljs;
