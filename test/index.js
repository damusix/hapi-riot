const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');

const Sinon = require('sinon');

const HapiRiot = require('../lib');

const { experiment, it, before, after } = exports.lab = Lab.script();

const server = Hapi.Server();

const stub = {
};


experiment('Compiler', () => {

    before(async () => {

        await server.register(Vision)
    });

    after(async () => {

    });

    it('it should register views engine', async () => {

        server.views({
            engines: {
                riot: HapiRiot
            },
            relativeTo: __dirname,
            path: 'fixtures/views',
            partialsPath:'fixtures/partials',
            layoutPath:'fixtures/layouts'
        });

        server.initialize();
    });

    it('renders the test view', async () => {

        server.route({
            method: 'get',
            path: '/test',
            handler: (r, h) => h.view('test', { titties: true })
        });

        const response = await server.inject({ method: 'get', url: '/test' });
        console.log(response.result)
        expect(response.statusCode).to.equal(200);

    });

});