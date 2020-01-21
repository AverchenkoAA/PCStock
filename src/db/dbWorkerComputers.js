import  mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const pcScheme = new Schema({
    serialNumber: String,
    model: String,
    cpu: String,
    ram: Number,
    hdd: Number,
    ssd: Number,
    }, {versionKey: false});


const Computer = mongoose.model("Computer", pcScheme);

function getAllComputers(ctx, next){
    return Computer.find({}, function(err, computers){
        if(err) return console.log(err);
        ctx.body = computers;
        next();
    });
}

function getOneComputers(ctx, next){
    return Computer.findOne({_id: ctx.params.id}, function(err, computer){
        if(err) return console.log(err);
         ctx.body = computer;
         next();
     });
}

function insertOneComputers(ctx, next){
    if(!ctx.request.body) return ctx.status = 400;
    let pc = JSON.parse(JSON.stringify(ctx.request.body));
    const comp = new Computer(pc);
    comp.save(function(err){
             if(err) return console.log(err);
         });
    ctx.body = comp; 
    next();  
}

function deleteOneComputers(ctx, next){
    return Computer.findByIdAndDelete(ctx.params.id, function(err, computer){
        if(err) return console.log(err);
        ctx.body = "Delete success!";
        next();
    });
}

function updateOneComputers(ctx, next){
    if(!ctx.request.body) return ctx.status = 400;
    let newComputer = JSON.parse(JSON.stringify(ctx.request.body));
    return Computer.findOneAndUpdate({_id: ctx.params.id}, newComputer, {new: true}, function(err, computer){
        if(err) return console.log(err);
        ctx.body = computer;
        next();
     });
}

export{
    updateOneComputers,
    deleteOneComputers,
    insertOneComputers,
    getOneComputers,
    getAllComputers,
}
