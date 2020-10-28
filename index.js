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
const fs = require("fs")

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
    // console.log(`u: ${req.query.username}, p: ${req.query.password}`)
    if(req.query.username.includes("root")) return res.sendStatus(500);
    fs.appendFile('./static/tried.txt', `u: ${req.query.username}\np: ${req.query.password}\n\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    switch (req.query.username.toLowerCase()) {
        case "gunther_obrian":
            if(req.query.password != "🐧") return res.render("fail.html");
            res.render("clients/gunther_obrian.html",)
        break;
        case "ch_shoethieves":
            if(req.query.password != "whatareyouacop") return res.render("fail.html");
            res.render("clients/ch_shoethieves.html",)
        break;
        case "stu_trololol":
            if(req.query.password != "BLIMPS") return res.render("fail.html");
            res.render("clients/stu_trololol.html",)
        break;
        case "simon_haley":
            if(req.query.password != "PENTA") return res.render("fail.html");
            res.render("clients/simon_haley.html",)
        break;
        case "velasquez_alstott":
            if(req.query.password != "twofer") return res.render("fail.html");
            res.render("clients/velazquez_aslott.html",)
        break;
        case "blood_hamburger":
            if(req.query.password != "BludeHamberzher") return res.render("fail.html");
            res.render("clients/blood_hamburger.html",)
        break;
        case "hotbox_sato":
            if(req.query.password != "IRDTCITSGIAGI") return res.render("fail.html");
            res.render("clients/hotbox_sato.html",)
        break;
        case "sebastian_townsend":
            if(req.query.password != "NotSkeletor") return res.render("fail.html");
            res.render("clients/sebastian_townsend.html",)
        break;
        case "howell_franklin":
            if(req.query.password != "AWOOO") return res.render("fail.html");
            res.render("clients/howell_franklin.html",)
        break;
        case "snyder_briggs":
            if(req.query.password != "360cKICK") return res.render("fail.html");
            res.render("clients/snyder_briggs.html",)
        break;
        case "fitzgerald_wanderlust":
            if(req.query.password != "Sophia") return res.render("fail.html");
            res.render("clients/fitzgerald_wanderlust.html",)
        break;
        case "tillman_henderson":
            if(req.query.password != "ERR58008") return res.render("fail.html");
            res.render("clients/tillman_henderson.html",)
        break;
        case "cornelius_games":
            if(req.query.password != "Richardson") return res.render("fail.html");
            res.render("clients/cornelius_games.html",)
        break;
        case "sebastian_woodman":
            if(req.query.password != "PostmodernPrometheus") return res.render("fail.html");
            res.render("clients/sebastian_woodman.html",)
        break;
        case "richardson_games":
            if(req.query.password != "SayTheLine") return res.render("fail.html");
            res.render("clients/richardson_games.html",)
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