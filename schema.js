const mongoose=require("mongoose");

const movie_schema= new mongoose.Schema ({
      id: Number,
      movie: String,
      description: String
},{collection:"viewdiv"});

const db=(url)=>{
    return mongoose.connect(url);
}

const movie=mongoose.model("movie",movie_schema);
module.exports={movie,db};