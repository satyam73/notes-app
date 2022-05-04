const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successful");
}).catch((err)=>{
    console.log("connection error ", err.message);
})

// mongoose.connect("mongodb://localhost:27017/notes-app", {
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("database connected successful");
// }).catch((err)=>{
//     console.log("connection error ", err.message);
// })