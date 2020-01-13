const mongoose = require('../DBSchema/SchemaMapper');
const Todo = mongoose.model('Todo');

var TodoController = function(){
    this.Insert = (data)=>{
        return new Promise((resolve,reject)=>{
            let todo = new Todo({
                description:data.description,
                completed:data.completed
            });
            todo.save().then(()=>{
                resolve({status:200,message:{success:true,data:data}});
            }).catch((err)=>{
                reject({status:500,message:'todo creation failed due to Error: '+err});
            });
        })
    };

    this.retrieve = (query)=>{
        if(query==="all"){
            return new Promise((resolve,reject)=>{
                Todo.find().then((data)=>{
                    resolve({status:200,message:{success:true,data:data}});
                }).catch((err)=>{
                    reject({status:500,message:'No data to be found. Error: '+err});
                })
            })
        }
        else if(query==="completed"){
        return new Promise((resolve,reject)=>{
            Todo.find({completed:true}).then((data)=>{
                resolve({status:200,message:{success:true,data:data}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        })}
        else if(query==="incompleted"){
            return new Promise((resolve,reject)=>{
                Todo.find({completed:false}).then((data)=>{
                    resolve({status:200,message:{success:true,data:data}});
                }).catch((err)=>{
                    reject({status:500,message:'No data to be found. Error: '+err});
                })
            }) 
        }
        


    };


    this.getAllCompleteCount=()=>{
        return new Promise((resolve,reject)=>{
            Todo.find({completed:false}).then((data)=>{
                resolve({status:200,message:{success:true,data:data.length}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }
    
    this.retrieveByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Todo.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };

    this.update = (id,data)=>{
        return new Promise((resolve,reject)=>{

            let todo = {
                description:data.description,
                completed:data.completed
            };
            Todo.findByIdAndUpdate({_id: id},todo).then(()=>{
                resolve({status:200,message:{success:true}});
            }).catch((err)=>{
                reject({status:500,message:'todo updating failed due to Error: '+err});
            });
        })
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Todo.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:{success:true}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }

    this.updateAll=(query)=>{
        
         if(query==="true"){
            return new Promise((resolve,reject)=>{
                Todo.update({"completed":"false"},{"$set":{"completed":"true"}}, {multi:true} ).then(()=>{
                    resolve({status:200,message:{success:true}});
                }).catch((err)=>{
                    reject({status:500,message:'No data to be found. Error: '+err});
                })
            })
        } else if(query==="false"){
            return new Promise((resolve,reject)=>{
                Todo.update({"completed":"true"},{"$set":{"completed":"false"}}, {multi:true} ).then(()=>{
                    resolve({status:200,message:{success:true}});
                }).catch((err)=>{
                    reject({status:500,message:'No data to be found. Error: '+err});
                })
            })
        }
    }
    this.clearCompleted=()=>{
        return new Promise((resolve,reject)=>{
            Todo.deleteMany({"completed":"true"}).then(()=>{
                resolve({status:200,message:{success:true}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }
};

module.exports = new TodoController();