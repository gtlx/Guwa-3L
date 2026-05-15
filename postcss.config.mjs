import postcssImport from 'postcss-import';
import postcssNesting from 'tailwindcss/nesting/index.js';
import tailwindcss from 'tailwindcss';

export default {
    plugins: {
        'postcss-import': postcssImport,          // 合并多个 CSS 文件
        'tailwindcss/nesting': postcssNesting,
        tailwindcss: tailwindcss,
    }
};
