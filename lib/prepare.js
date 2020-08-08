const Path = require('path');
const Fs = require('fs');

const Hoek = require('@hapi/hoek');

require('@riotjs/ssr/register')();

const components = new Map();


const traverse = function (path) {

    let files = [];

    Fs.readdirSync(path).forEach((file) => {


        file = Path.join(path, file);
        const stat = Fs.statSync(file);
        if (stat.isDirectory()) {
            files = files.concat(traverse(file));
        }

        if (Path.basename(file)[0] !== '.' &&
            Path.extname(file) === '.riot') {

            files.push(file);
        }
    });

    return files;
};

const registerTemplates = (config, next) => {

    const { path, partialsPath, layoutPath, relativeTo } = config;
    const files = Hoek.flatten([
        traverse(Path.resolve(relativeTo, path)),
        traverse(Path.resolve(relativeTo, partialsPath)),
        traverse(Path.resolve(relativeTo, layoutPath)),
    ]);

    for (const file of files) {

        const { default: component } = require(file);
        components.set(component.name, component);
    }

    return next();
}

registerTemplates.components = components

module.exports = registerTemplates;