const Crypto = require('crypto')

const nameRgx = /<(\s*\w*[^>]*)>(.*?)/i

const filterSelf = (name, components) => components.filter(
    (component) => {

        return component.name !== name
    }
)

const createHashKey = (...args) => {

    return Crypto.createHmac('sha1', 'riot')
      .update(JSON.stringify(args))
      .digest('hex')
};

const stripBase = (name, html) => {

    const rgx = new RegExp(`<(/?)${name}>`, 'g');
    // return html.replace(rgx, '<$1html>');
    return html.replace(rgx, '');
};

module.exports = {
    nameRgx,
    filterSelf,
    stripBase,
    createHashKey
}