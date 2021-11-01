const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to: email,
        from:'alekalek2000@gmail.com',
        subject:'Thanks for joining!',
        text:'Welcome to the app, '+name+'. Let me know how you get along with the app'
    })
}

const sendDeleteEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'alekalek2000@gmail.com',
        subject:'We are sad to see you go',
        text:'Dear '+name+' we are sad to see you go. Could you spare some time to tell us why are you leaving'
    })
}

module.exports= {
    sendWelcomeEmail,
    sendDeleteEmail
}