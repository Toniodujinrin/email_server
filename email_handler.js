const nodemailer = require("nodemailer")
const emmiter = require("./emiiter")


emmiter.on("sendMail",(args)=>{
    const {receiver, from, subject, text} = args[0]
    
    res =args[1]
    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth:{
            user:process.env.EMAIL ,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const details = {
        from:from, 
        to:receiver, 
        subject:subject,
        text:text
    }

    transporter.sendMail(details,(err)=>{
        if(err){
           console.log(err)
           res.status(500).send("could not send email")
        }
        else{
            console.log(`email sent to ${receiver}`)
            res.status(200).send(`message sent to ${receiver} `)

        }
    })
})

emmiter.on("sendHtml",(args)=>{
    const {receiver, from, subject, text, html} = args[0]
    res =args[1]
    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth:{
            user:process.env.EMAIL ,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const details = {
        from:from, 
        to:receiver, 
        subject:subject,
        text:text,
        html:html
        
    }

    transporter.sendMail(details,(err)=>{
        if(err){
           console.log(err)
           res.status(500).send("could not send email")
        }
        else {
            console.log(`message sent ${receiver}`)
            res.status(200).send(`message sent to ${receiver} `)
        }
    })

})




