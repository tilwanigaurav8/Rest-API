const mongodb=require('mongodb');
const db=require('../data/database');

class Todo{
    constructor(text,id){
        this.text=text;
        this.id=id;
    }


    static async getAllTodos(){
        const todoDocuments=await db.getDb().collection('todos').find().toArray();
        console.log('models fetching todos');
        return todoDocuments.map(function(todoDocument){
            return new Todo(todoDocument.text,todoDocument._id);
        });
    }

    save(){
        if(this.id){
            const todoId=new mongodb.ObjectId(this.id);
            console.log('saving constructor');
            return db.getDb().collection('todos').updateOne({_id:todoId},{$set:{text:this.text}},);
        }
        else{
            console.log('saving constructor failed');
            return db.getDb().collection('todos').insertOne({text:this.text});
        }
    }


    delete(){
        if(!this.id){
            console.log('deletion failed');
            throw new Error("Trying to delete without id");
        }
        const todoId=new mongodb.ObjectId(this.id);
        console.log('deletion not failed');
        return db.getDb().collection('todos').deleteOne({_id:todoId});
    }
}

module.exports=Todo;