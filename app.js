var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var autoIncrement = require("mongodb-autoincrement");
//var MO = require("method-override");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/todo_db");
app.set("view engine","ejs");
app.use(express.static("public"));
//app.use(MO("_method"));

var todoSchema = new mongoose.Schema
({
    
    Title: String,
    IsDone: Boolean,
    UpdatedAt: String
});

var todo = mongoose.model("todo",todoSchema);
/*todo.create({
   
    Title: "first todo",
    IsDone: true,
    UpdatedAt: "06/08/2018"
});*/
//var p = todo.find();
app.get("/apis/todoes",function(req,res){
    
    todo.find({},function(err,todos){
        if(err)
        {console.log("err");}
        else
        {
          res.send(JSON.stringify(todos));
        }
    });
});
app.post("/apis/todoes",function(req,res){
    //console.log(req.body);
   todo.create(req.body, function(err,newtodo){
        if(err)
        {console.log("err");}
        else{
            console.log("added");
        }
    }); 
});
app.listen(3000);