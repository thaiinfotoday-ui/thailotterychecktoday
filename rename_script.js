const fs = require('fs');
const path = require('path');

const dirs = ['app', 'components', 'lib'];
const rootDir = process.cwd();

function shouldBeTsx(content, filename) {
    if (filename.endsWith('page.js') ||
        filename.endsWith('layout.js') ||
        filename.endsWith('loading.js') ||
        filename.endsWith('error.js') ||
        filename.endsWith('not-found.js') ||
        filename.endsWith('global-error.js') ||
        filename.endsWith('template.js') ||
        filename.endsWith('default.js')) return true;

    if (filename.endsWith('route.js')) return false; // API routes

    if (content.includes("from 'react'") || content.includes('from "react"') ||
        content.includes("from 'next/") || content.includes('from "next/') ||
        content.includes('className=') || content.includes('<div') || content.includes('</')) {
        return true;
    }
    return false;
}

function processDir(directory) {
    const fullPath = path.join(rootDir, directory);
    if (!fs.existsSync(fullPath)) return;

    const items = fs.readdirSync(fullPath, { withFileTypes: true });

    items.forEach(item => {
        const itemPath = path.join(fullPath, item.name);
        if (item.isDirectory()) {
            if (item.name !== 'node_modules' && item.name !== '.next') {
                processDir(path.join(directory, item.name));
            }
        } else if (item.isFile() && item.name.endsWith('.js')) {
            const content = fs.readFileSync(itemPath, 'utf8');
            const isTsx = shouldBeTsx(content, item.name);
            const newExt = isTsx ? '.tsx' : '.ts';
            const newPath = itemPath.replace(/\.js$/, newExt);

            console.log(`Renaming ${itemPath} -> ${newPath}`);
            fs.renameSync(itemPath, newPath);
        }
    });
}

dirs.forEach(d => processDir(d));

if (fs.existsSync(path.join(rootDir, 'middleware.js'))) {
    console.log('Renaming middleware.js -> middleware.ts');
    fs.renameSync(path.join(rootDir, 'middleware.js'), path.join(rootDir, 'middleware.ts'));
}
