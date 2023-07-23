const joi = require("joi")

const emailSchema = joi.object({
   receiver : joi.string().required().label("receiver"),
   subject : joi.string().required().label("subject"),
   from : joi.string().required().label("from"),
   text : joi.string().required().label("text"),
})


const htmlEmailSchema = joi.object({
    receiver : joi.string().required().label("receiver"),
    subject : joi.string().required().label("subject"),
    from : joi.string().required().label("from"),
    text : joi.string().required().label("text"),
    html :joi.string().required()
 })



class Validator{

static validateEMail=(body)=>{
   const {error} = emailSchema.validate(body)
   let err = false 
   if(error){
     err =  error.details[0].message
   }
   
   
   return err

}

static validateHtmlEmail=(body)=>{
    const {error} = htmlEmailSchema.validate(body)
    let err = false 
    if(error){
      err =  error.details[0].message
    }
    
    
    return err
    
 }


}



module.exports = Validator

