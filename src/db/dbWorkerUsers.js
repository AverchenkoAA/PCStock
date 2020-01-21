import  mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: String,
    firstName: String,
    lastName: String,
    password: String,
    }, {versionKey: false});


const User = mongoose.model("User", userScheme);

function getAllUsers(ctx, next){
    return User.find({}, function(err, user){
        if(err) return console.log(err);
        ctx.body = user;
        next();
    });
}

function getOneUsers(ctx, next){
    return User.findOne({_id: ctx.params.id}, function(err, user){
        if(err) return console.log(err);
         ctx.body = user;
         next();
     });
}

function insertOneUsers(ctx, next){
    if(!ctx.request.body) return ctx.status = 400;
    let usr = JSON.parse(JSON.stringify(ctx.request.body));
    const user = new User(usr);
    user.save(function(err){
             if(err) return console.log(err);
         });
    ctx.body = user; 
    next();  
}

function deleteOneUsers(ctx, next){
    return User.findByIdAndDelete(ctx.params.id, function(err, user){
        if(err) return console.log(err);
        ctx.body = "Delete success!";
        next();
    });
}

function updateOneUsers(ctx, next){
    if(!ctx.request.body) return ctx.status = 400;
    let newUser = JSON.parse(JSON.stringify(ctx.request.body));
    return User.findOneAndUpdate({_id: ctx.params.id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err);
        ctx.body = user;
        next();
     });
}

export{
    updateOneUsers,
    deleteOneUsers,
    insertOneUsers,
    getOneUsers,
    getAllUsers,
}
