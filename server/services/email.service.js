const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

let transporter = nodemailer.createTransport({


    service:"Gmail",
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const registerEmail = async(userEmail, user)=>{
    try{
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme:"default",
            product:{
                name:"Flickbase",
                link:`${process.env.EMAIL_MAIL_URL}`
            }
        })

        const email = {
            body:{
                name: userEmail,
                intro: 'welcome to flickbase!!!! we\'re excited to have you on board',
                action:{
                    instructions: 'to validate your account, please click here',
                    button:{
                        color:'#1a73e8',
                        text:'Validate your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                }
                    , outro: 'thank you'
            }
        }
        let emailBody= mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Welcome to Flickbase! verify your account",
            html: emailBody
        }

        await transporter.sendMail(message);
        return true;

    }catch(error){
        throw error
    }


}


module.exports = { 
    
    registerEmail

}