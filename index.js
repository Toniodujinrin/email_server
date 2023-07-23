const http = require("http")
const https = require("https")
const fs = require("fs")
const express = require("express")
const cors = require("cors")
require("./email_handler")
require("dotenv").config()
const Validator = require("./validator")
const app = express()
const emiter = require("./emiiter")

app.use(cors())
app.use(express.json())

app.use('/',(req,res)=>{
res.send("welcome to my email server ")
})


app.post("/send",(req,res)=>{
    const err = Validator.validateEMail(req.body)
    if(err){
         res.status(400).send(err)
    }
    else{
        emiter.emit("sendMail",[req.body,res])
       
    }
})

app.post("/sendHtml",(req,res)=>{
    const err = Validator.validateHtmlEmail(req.body)
    if(err){
        res.status(400).send(err)

    }
    else{
        emiter.emit("sendHtml",([req.body, res]))
    }
})









const server = http.createServer(app)
const httpsServer = https.createServer({
    key: fs.readFileSync("./cert/key.pem","utf-8"),
    cert: fs.readFileSync("./cert/cert.pem","utf-8")
    },app)



httpsServer.listen(process.env.HTTPS_PORT,()=>{
        console.log(`https server listening on ${process.env.HTTPS_PORT}`)
    })

server.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`)
})




