"use strict";

var _computers = require("./middleware/computers.js");

const Koa = require('koa');

const Router = require('koa-router');

const app = module.exports = new Koa();
const router = new Router();
const baseURL = "/api";
let computersURL = baseURL + '/computers';
console.log("sdfsf");
router.get(computersURL, (ctx, next) => {
  ctx.body = (0, _computers.getAllComputers)();
}).get(computersURL + '/:id', (ctx, next) => {
  ctx.body = 'Find computers ' + ctx.params.id;
}).post(computersURL, (ctx, next) => {
  ctx.body = 'Add new computers';
}).put(computersURL + '/:id', (ctx, next) => {
  ctx.body = 'Update computers ' + ctx.params.id;
}).del(computersURL + '/:id', (ctx, next) => {
  ctx.body = 'delete computers ' + ctx.params.id;
}).all(computersURL, (ctx, next) => {
  ctx.body = 'Unfriendly request';
});
app.use(router.routes());
if (!module.parent) app.listen(3000);