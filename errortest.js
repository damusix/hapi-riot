require('@riotjs/ssr/register')();
const { render } = require('@riotjs/ssr');

const html = require('./test/fixtures/layouts/default.riot');
const header = require('./test/fixtures/partials/header.riot');
const test = require('./test/fixtures/views/test.riot');

console.log()
console.log(('------ html ------'))
console.log(

    render(
        'html',
        html.default
    )
);

console.log()
console.log(('------ header ------'))
console.log(

    render(
        'headerz',
        header.default
    )
);

console.log()
console.log(('------ test ------'))
console.log(

    render(
        'test',
        test.default
    )
);