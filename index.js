const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { Liquid } = require("liquidjs");
const engine = new Liquid({
    cache: process.env.NODE_ENV === "PROD",
    extname: ".html" 
});

app.engine("html", engine.express()); 
app.set("views", __dirname+"/views");
app.set("view engine", "liquid");

app.use(express.static("static"));

app.get("/",async (req, res)=>{
    res.render("index.html");
});
app.get("/login",async (req, res)=>{
    res.render("login.html");
});

app.get("/client", async (req,res)=>{
    if(!req.query?.username || !req.query?.password) res.render("fail.html")

    switch (req.query.username) {
        case "gunther_obrian":
            if(req.query.password != "🐧") return res.render("fail.html");
            res.render("clients/gunther_obrian.html",)
        break;
        case "ch_shoethieves":
            if(req.query.password != "whatareyouacop") return res.render("fail.html");
            res.render("clients/ch_shoethieves.html",)
        break;
        default:
            res.render("fail.html")
            break;
    }
})

let port = process.env.PORT ?? 8000;
app.listen(port, () => {
    console.log("Ready on",port);
});