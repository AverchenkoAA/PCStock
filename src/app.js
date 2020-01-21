import Router from 'koa-router'
import Koa from 'koa'
import koaBody from 'koa-body'
import {getAllComputers} from './middleware/allComputers.js';
import {computer} from './domain/computer.js';
import {user} from './domain/user.js';
import {ComputersWorker} from './db/dbWorkerComputers.js';
import {UsersWorker} from './db/dbWorkerUsers.js';
import { createReadStream } from 'fs';
import  mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: String,
    firstName: String,
    lastName: String,
    password: String,
    }, {versionKey: false});
const computerScheme = new Schema({
    serialNumber: String,
    model: String,
    cpu: String,
    ram: Number,
    hdd: Number,
    ssd: Number,
    }, {versionKey: false});

const User = mongoose.model("User", userScheme);
const Computer = mongoose.model("Computer", computerScheme);

const app = module.exports = new Koa();
const router = new Router();
const baseURL = "/api";
const stub = __dirname + '/helpers/stub.html';
const computersURL = baseURL + '/computers';
const usersURL = baseURL + '/users';
const pcWorker = new ComputersWorker();
const usrWorker = new UsersWorker();

let pc = new computer({
   serialNumber: '2345678',
   model: 'APC',
   cpu: 'Intel',
   ram: 8,
   hdd: 1000,
   ssd: 240,
});

let pers = new user({
    login: 'User',
    firstName: 'User',
    lastName: 'Userovich', 
    password: "pasword",
});

mongoose.connect("mongodb://localhost:27017/PCStock", { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false  
        }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});


router
    //Routes for work with computers
    .get(computersURL, (ctx, next) => {
        return Computer.find({}, function(err, computers){
             if(err) return console.log(err);
             console.log(computers);
             ctx.body = computers;
             next();
         });
     })
     .get(computersURL+"/:id", (ctx, next) => {
        return Computer.findOne({_id: ctx.params.id}, function(err, computer){
            if(err) return console.log(err);
             console.log(computer);
             ctx.body = computer;
             next();
         });
     })
     .post(computersURL, koaBody(), (ctx, next) => {
         if(!ctx.request.body) return ctx.status = 400;
         let pc = JSON.parse(JSON.stringify(ctx.request.body));
         const comp = new Computer(pc);
         comp.save(function(err){
             if(err) return console.log(err);
         });
         ctx.body = comp; 
         next();          
     })
     .delete(computersURL+"/:id", (ctx, next) => {
         return Computer.findByIdAndDelete(ctx.params.id, function(err, computer){
             if(err) return console.log(err);
             ctx.body = "Delete success!";
             next();
          });
      })
     .put(computersURL+"/:id", koaBody(), (ctx, next) => {
         if(!ctx.request.body) return ctx.status = 400;
         let newComputer = JSON.parse(JSON.stringify(ctx.request.body));
         return Computer.findOneAndUpdate({_id: ctx.params.id}, newComputer, {new: true}, function(err, computer){
             if(err) return console.log(err);
             ctx.body = computer;
             next();
          });
      })

    //Routes for work with users
    .get(usersURL, (ctx, next) => {
       return User.find({}, function(err, users){
            if(err) return console.log(err);
            console.log(users);
            ctx.body = users;
            next();
        });
    })
    .get(usersURL+"/:id", (ctx, next) => {
       return User.findOne({_id: ctx.params.id}, function(err, user){
           if(err) return console.log(err);
            console.log(user);
            ctx.body = user;
            next();
        });
    })
    .post(usersURL, koaBody(), (ctx, next) => {
        if(!ctx.request.body) return ctx.status = 400;
        let usr = JSON.parse(JSON.stringify(ctx.request.body));
        const user = new User(usr);
        user.save(function(err){
            if(err) return console.log(err);
        });
        ctx.body = user; 
        next();          
    })
    .delete(usersURL+"/:id", (ctx, next) => {
        return User.findByIdAndDelete(ctx.params.id, function(err, user){
            if(err) return console.log(err);
            ctx.body = "Delete success!";
            next();
         });
     })
    .put(usersURL+"/:id", koaBody(), (ctx, next) => {
        if(!ctx.request.body) return ctx.status = 400;
        let newUser = JSON.parse(JSON.stringify(ctx.request.body));
        return User.findOneAndUpdate({_id: ctx.params.id}, newUser, {new: true}, function(err, user){
            if(err) return console.log(err);
            ctx.body = user;
            next();
         });
     })

    .all('/', (ctx) => {
        ctx.type = 'html'; 
        ctx.body = createReadStream(stub);
    });

app.use(router.routes());

//if (!module.parent) app.listen(3000);