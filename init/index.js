const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Airnb');
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
    initData.data = initData.data.map((obj) => ({...obj, owner:"66dc2191995cc799da9cc330"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();