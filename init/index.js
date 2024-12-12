const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
if(process.env.NODE_ENV != "production"){
    require("dotenv").config({ path: "../.env" });
}

const dbUrl = process.env.dbUrl;
async function main(){
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

const initDB = async () =>{
    await Listing.deleteMany({});
    console.log(initData.data);
    initData.data = initData.data.map((obj) => ({...obj, owner:"675b1d140a77ec5f0ef8a619"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();
