let hljs = require("highlight.js/lib/highlight");
import 'highlight.js/styles/androidstudio.css';

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('dos', require('highlight.js/lib/languages/dos'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('scala', require('highlight.js/lib/languages/scala'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));

export default hljs;
