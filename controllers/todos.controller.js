const Todo=require('../models/todo.models');

async function getAllTodos(req,res,next){
    let todos;
    console.log('fetching todos');
    try{
        todos=await Todo.getAllTodos();
        console.log('success');
    }
    catch(error){
        console.log('failed in fetching todos');
        return next(error);
    }
    res.json({
        todos:todos,
    });
}

async function addTodo(req,res,next){
    const todoText=req.body.text;
    const todo=new Todo(todoText);
    let insertedId;
    try{
        const result=await todo.save();
        insertedId=result.insertedId;
        console.log('adding id');
    }
    catch(error){
        console.log('adding id failed');
        return next(error);
    }
    todo.id=insertedId.toString();
    res.json({
        message:"Added Successfully",
        createdTodo:todo
    })
}

async function updateTodo(req,res,next){
    const todoId=req.params.id;
    const newTodoText=req.body.newText;

    const todo=new Todo(newTodoText,todoId);
    try{
        await todo.save();
    }
    catch(error){
        return next(error);
    }
    res.json({
        message:'Todo updated',
        updatedTodo:todo,
    })
}

async function deleteTodo(req,res,next){
    const todoId=req.params.id;
    const todo=new Todo(null,todoId);
    try{
        await todo.delete();
    }
    catch(error){
        return next(error);
    }
    res.json({
        message:'Todo deleted',
    })
}

module.exports={
    getAllTodos:getAllTodos,
    addTodo:addTodo,
    updateTodo:updateTodo,
    deleteTodo:deleteTodo
};