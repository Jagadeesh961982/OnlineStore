import nodemailer from 'nodemailer'

const sendEmail=async(options)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.AdminEmail,
            pass:process.env.AdminEmailPassword
        }

    })

    const mailOptions={
        from:process.env.AdminEmail,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)


}

export default sendEmail;