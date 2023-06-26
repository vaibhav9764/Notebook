const mongoose = require('mongoose');


const mongURI="mongodb://127.0.0.1:27017/inotebook";
const connectToMongo= async()=>{
     await mongoose.connect(mongURI);
     console.log("connected to mongo successfully");


}
module.exports=connectToMongo;

