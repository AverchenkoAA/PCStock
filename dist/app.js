"use strict";

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _allComputers = require("./middleware/allComputers.js");

var _computer = require("./domain/computer.js");

var _user = require("./domain/user.js");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = module.exports = new _koa.default();
const router = new _koaRouter.default();
const baseURL = "/api";
const stub = __dirname + '/helpers/stub.html';
const computersURL = baseURL + '/computers';
const usersURL = baseURL + '/users';
let pc = new _computer.Computer('12345678', 'APC', 'Intel', 8, 1000, 240);
let user = new _user.User('Admin', 'Adminushka', 'Prost', "pasword"); //app.use(koaBody())

router //Routes for work with computers
.get(computersURL, (ctx, next) => {
  console.log(pc.showComputer());
  ctx.body = (0, _allComputers.getAllComputers)();
}).get(computersURL + '/:id', (ctx, next) => {
  ctx.body = 'Find computers ' + ctx.params.id;
}).post(computersURL, (ctx, next) => {
  ctx.body = 'Add new computers';
}).put(computersURL + '/:id', (ctx, next) => {
  ctx.body = 'Update computers ' + ctx.params.id;
}).del(computersURL + '/:id', (ctx, next) => {
  ctx.body = 'delete computers ' + ctx.params.id;
}) //Routes for work with users
.get(usersURL, (0, _koaBody.default)(), (ctx, next) => {
  //ctx.body = user.showUser(); 
  ctx.body = JSON.stringify(user);
}).post(usersURL, (0, _koaBody.default)(), (ctx, next) => {
  console.log("///// " + ctx.request.body.login);
  let usr = JSON.parse(JSON.stringify(ctx.request.body));
  ctx.body = usr.login;
  console.log(usr.firstName);
}).all('/', (ctx, next) => {
  ctx.type = 'html';
  ctx.body = (0, _fs.createReadStream)(stub);
});
app.use(router.routes());
if (!module.parent) app.listen(3000);