if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utilis/ExpressError.js")
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'assets', 'b.png')));

const dbUrl = process.env.dbUrl;
// async function main(){
//     await mongoose.connect(dbUrl);
// }
async function main(){
    mongoose.connect(process.env.dbUrl)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"assets")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
//app.use(cookieParser());

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto :{
        secret: process.env.secret
    },
    touchAfter: 24 * 3600,
})

store.on("error", ()=>{
    console.log("Error in Mongo Session Store", err)
})

const sessionOptions = {
    store:store,
    secret:process.env.secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"))
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
