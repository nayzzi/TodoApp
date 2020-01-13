const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
    
});


mongoose.model('Todo',TodoSchema);

mongoose.connect('mongodb://127.0.0.1:27017/Todos',{useNewUrlParser:true}).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
   console.error(err);
});

module.exports = mongoose;