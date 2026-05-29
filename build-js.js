const {exec} = require('child_process');
const {renameSync, readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync} = require('fs');

exec('tsc', () => {
    const libDir = 'dist/lib';
    const jsDir = 'dist/js';
    if (!existsSync(jsDir)) {
        mkdirSync(jsDir);
    }
    const js = jsDir + '/tyme.js';
    const minJs = jsDir + '/tyme.min.js';
    renameSync(libDir + '/index.js', js);
    const text = readFileSync(js, 'utf8');
    exec('terser ' + js + ' -c -o ' + minJs, () => {
        const minText = readFileSync(minJs, 'utf8');
        writeFileSync(js, text.replace('"use strict";', '"use strict";if (typeof exports === \'undefined\') { var exports = {};}'));
        writeFileSync(minJs, minText.replace('"use strict";', '"use strict";if(typeof exports===\'undefined\')var exports={};'));
        // for WeChat
        copyFileSync(minJs, libDir + '/index.cjs.js');
        console.log('js build completed')
    });
});
