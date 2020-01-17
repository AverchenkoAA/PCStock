const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

import {getAllComputers} from './middleware/computers.js';
import { createReadStream } from 'fs';

const app = module.exports = new Koa();
const router = new Router();
const baseURL = "/api";

let computersURL = baseURL + '/computers';
router
    .get(computersURL, (ctx, next) => {
        ctx.body = getAllComputers();
    })
    .get(computersURL + '/:id', (ctx, next) => {
        ctx.body = 'Find computers '+ ctx.params.id;
    })
    .post(computersURL, (ctx, next) => {
        ctx.body = 'Add new computers';
    })
    .put(computersURL + '/:id', (ctx, next) => {
        ctx.body = 'Update computers '+ ctx.params.id;
    })
    .del(computersURL + '/:id', (ctx, next) => {
        ctx.body = 'delete computers '+ ctx.params.id;
    })
    .all('/', (ctx, next) => {
        ctx.type = 'html'; ctx.body = createReadStream(__dirname + '/helpers/stub.html');
        //ctx.body = '../helpers/stub.html';

    });

app.use(router.routes());

if (!module.parent) app.listen(3000);