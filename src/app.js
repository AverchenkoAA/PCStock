import Router from 'koa-router'
import Koa from 'koa'
import koaBody from 'koa-body'
import {getAllComputers} from './middleware/allComputers.js';
import * as comp from './domain/computer.js';
import {User} from './domain/user.js';
import { createReadStream } from 'fs';

const app = module.exports = new Koa();
const router = new Router();
const baseURL = "/api";
const stub = __dirname + '/helpers/stub.html';
const computersURL = baseURL + '/computers';
const usersURL = baseURL + '/users';

let pc = comp.computer({ 
    serialNumber :'12345678',
    model: 'APC',
    cpu: 'Intel',
    ram: 8,
    hdd: 1000,
    ssd: 240,
})
let user = new User('Admin','Adminushka','Prost', "pasword");

//app.use(koaBody())
router
    //Routes for work with computers
    .get(computersURL, (ctx, next) => {
        console.log(pc.showComputer());
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

    //Routes for work with users
    .get(usersURL,koaBody(), (ctx, next) => {
        //ctx.body = user.showUser(); 
        ctx.body = JSON.stringify(user);
    })
    .post(usersURL, koaBody(), (ctx, next) => {
        console.log("///// "+ctx.request.body.login);

        let usr = JSON.parse(JSON.stringify(ctx.request.body));
        ctx.body = usr.login;
        console.log(usr.firstName);
            
    })

    .all('/', (ctx, next) => {
        ctx.type = 'html'; 
        ctx.body = createReadStream(stub);
    });

app.use(router.routes());

if (!module.parent) app.listen(3000);