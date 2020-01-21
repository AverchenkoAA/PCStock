require('dotenv').config();
import Router from 'koa-router'
import Koa from 'koa'
import koaBody from 'koa-body'
import { createReadStream } from 'fs';
import * as Computer from './db/dbWorkerComputers';
import * as User from './db/dbWorkerUsers';
import  mongoose  from 'mongoose';

const app = module.exports = new Koa();
const router = new Router();
const baseURL = "/api";
const stub = __dirname + '/helpers/stub.html';
const computersURL = baseURL + '/computers';
const usersURL = baseURL + '/users';

mongoose.connect(process.env.DB_CONN, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false  
        }, function(err){
    if(err) return console.log(err);
    app.listen(process.env.PORT, function(){
        console.log("Сервер ожидает подключения...");
    });
});


router
    //Routes for work with computers
     .get(computersURL, (ctx, next) => {
        return Computer.getAllComputers(ctx, next);
     })
     .get(computersURL+"/:id", (ctx, next) => {
        return Computer.getOneComputers(ctx, next);
     })
     .post(computersURL, koaBody(), (ctx, next) => {
        Computer.insertOneComputers(ctx, next);
     })
     .delete(computersURL+"/:id", (ctx, next) => {
        return Computer.deleteOneComputers(ctx, next);
      })
     .put(computersURL+"/:id", koaBody(), (ctx, next) => {
        return Computer.updateOneComputers(ctx, next);
      })

    //Routes for work with users
    .get(usersURL, (ctx, next) => {
        return User.getAllUsers(ctx, next);
     })
     .get(usersURL+"/:id", (ctx, next) => {
        return User.getOneUsers(ctx, next);
     })
     .post(usersURL, koaBody(), (ctx, next) => {
        User.insertOneUsers(ctx, next);
     })
     .delete(usersURL+"/:id", (ctx, next) => {
        return User.deleteOneUsers(ctx, next);
      })
     .put(usersURL+"/:id", koaBody(), (ctx, next) => {
        return User.updateOneUsers(ctx, next);
      })

    .all('/', (ctx) => {
        ctx.type = 'html'; 
        ctx.body = createReadStream(stub);
    });

app.use(router.routes());

//if (!module.parent) app.listen(3000);