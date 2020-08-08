const Path = require('path');
const Hoek = require('@hapi/hoek');
const { render } = require('@riotjs/ssr');

const prepare = require('./prepare');

const utils = require('./utils');

const defaults = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    removeCacheRegExp: undefined,
    layout: undefined,
    layoutPath: undefined,
    layoutRenderMethod: 'renderToStaticMarkup'
};

const { components } = prepare;

const compile = (template, compileOpts) => {

    compileOpts = Hoek.applyToDefaults(defaults, compileOpts);

    const allComponents = [...components.values()];

    return (context, renderOpts) => {

        const [_, componentName] = template.match(utils.nameRgx)
        const key = utils.createHashKey(
            componentName,
            context,
            renderOpts
        );

        console.log(key);

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let output = render(
            componentName,
            components.get(componentName),
            context
        );

        output = utils.stripBase(componentName, output);


        // output = render(
        //     componentName,
        //     components.get(componentName),
        //     {
        //         ...context,
        //         components: utils.filterSelf(componentName, allComponents)
        //     }
        // );


        console.log(output)

        // let View = require(renderOpts.filename);

        // // support for es6 default export semantics
        // View = View.default || View;

        // const createViewElement = (props = null, children = null) => React.createElement(View, props, children);

        // let output = renderOpts.doctype;

        // let layoutPath;

        // if (renderOpts.layout) {
        //     layoutPath = Path.join(renderOpts.layoutPath, renderOpts.layout);
        //     let Layout = require(layoutPath);

        //     // support for es6 default export semantics
        //     Layout = Layout.default || Layout;

        //     const createLayoutElement = (props = null, children = null) => React.createElement(Layout, props, children);

        //     const viewOutput = ReactDOMServer[renderOpts.renderMethod](createViewElement(context));

        //     output += ReactDOMServer[renderOpts.layoutRenderMethod](createLayoutElement(context, viewOutput));
        // }
        // else {
        //     output += ReactDOMServer[renderOpts.renderMethod](createViewElement(context));
        // }

        // /*
        //  * Transpilers tend to take a while to start up. Here we delete the
        //  * view and layout modules (and any modules matching the
        //  * `removeCacheRegExp` pattern) from the require cache so we don't need
        //  * to restart the app to see view changes.
        //  */
        // if (renderOpts.removeCache) {
        //     if (renderOpts.layout) {
        //         const layoutKey = require.resolve(layoutPath);
        //         delete require.cache[layoutKey];
        //     }

        //     const viewKey = require.resolve(renderOpts.filename);
        //     delete require.cache[viewKey];

        //     if (renderOpts.removeCacheRegExp) {
        //         const regexp = new RegExp(renderOpts.removeCacheRegExp);

        //         Object.keys(require.cache).forEach((cacheKey) => {

        //             if (regexp.test(cacheKey)) {
        //                 delete require.cache[cacheKey];
        //             }
        //         });
        //     }
        // }

        return output;
    };
};


module.exports = {
    compile,
    prepare
};