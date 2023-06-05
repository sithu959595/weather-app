const express=require("express")
const path=require("path")
const hbs=require("hbs")
const geoCode=require("./utils/geoCode.js")
const getWeather=require("./utils/getWeather.js")
// const getWeather=require(".../weather-app/getWeather")

const app=express()

const port=process.env.PORT || 3000 ;

app.use(express.static(path.join(__dirname,"../public")))
let views_path=path.join(__dirname,"../templates/views")
let partials_path=path.join(__dirname,"../templates/partials")
console.log(partials_path)
app.set('view engine','hbs')
app.set("views",views_path)
hbs.registerPartials(partials_path)

app.get('/',(req,res)=>{
    res.render('index',{
        title:"Home",
        name:"SiThuLin"
    })
    // res.send("testing")
})

app.get('/testing',(req,res)=>{
    
    res.send("testing")
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Si Thu"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Si Thu Lin"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"The address needs to be provided"
        })
    }
    console.log("dddd")

    let input=encodeURIComponent(req.query.address);
   
    geoCode(input,(errGeo,dataGeo)=>{
        if(errGeo){
            return res.send({
                error: "Error for finding geocode"
            })
        }
        // console.log("Error Geo",errGeo);
        console.log("Data Geo: ",dataGeo);
        getWeather(dataGeo.long,dataGeo.lat,(err,data)=>{
            if(err){
                return res.send({
                    error: "Error for getting weather forecast"
                })
            }
            // console.log("Error",err);
            console.log("Data: ",data);
            res.send({
                forecast: data,
                location: req.query.address
            })
        })
    });


    
})
app.get('/help/*',(req,res)=>{
    res.render("404",{
        message:"Help article not found"
    });
})

app.get('*',(req,res)=>{
    res.render("404",{
        message:"Page not Found"
    });
})

app.listen(PORT,()=>{
    console.log("Sever is up and on.")
})