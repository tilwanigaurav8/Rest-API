const express=require('express');
const db=require('./data/database');
const quoteRoutes=require('./routes/quotes.routes');
const todosRoutes=require('./routes/todos.routes');
const app=express();
app.use(express.json());

app.use('/todos',todosRoutes);

app.use('/quote',quoteRoutes);

app.use(function(error,req,res,next){
    if(error){
        
    res.status(500).json({
        message:"Something went wrong"
    })}
})

db.initDb().then(function(){
    app.listen(3000);
}).catch(function(error){
    console.log("Connecting the database failed");
});