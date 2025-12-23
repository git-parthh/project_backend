const express=require("express");
require('dotenv').config();
const cors=require("cors");
const {movie,db}=require("./schema.js");
const app=express();
app.use(cors());
 async function contentById(id){
        try{
           const value= await movie.find({
                id:id
            });
            return value;
        }
        catch(error){
            console.log("Error while insertion: ",error)
        }
}


app.get("/photo/:id",function(req,res){
        let id=req.params.id;
        res.sendFile(`./photos/${id}.jpg`,{root:__dirname});
})
app.get("/info/:id",async function(req,res){
    let id=req.params.id;
    let value=await contentById(id);
    res.send(value);
})
app.get("/data/weekly-top",async(req,res)=>{
        try{
            const value=await movie.find({
                id:{$in:[1,2,3]}

            }).select("movie brief -_id");
            res.send(value);

        }catch(e){
            console.log("Error weekly-top:",error);
        }
})
const start=async ()=>{
    try{
        await db(process.env.MONGO_URL)
        .then(()=>console.log("Database connected"))
        .catch((error)=>console.log("Error with database:",error));

        app.listen(3000,function(err){
            if(err) console.log("Error occurered");
            else console.log("Server running on port 3000");
        })
    }
    catch(error){
        console.log("Error occurerd setting up database:",error);
    }
};
start();
