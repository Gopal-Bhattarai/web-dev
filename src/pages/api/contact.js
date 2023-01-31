import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SGMAIL_API)

export default async function handler(req, res){

    const newEmail = req.body;
    console.log(newEmail);
    await sgMail.send({
        to: 'gbhattarai55@gmail.com',
        from: 'gbhattarai55@gmail.com',
        subject: newEmail.fullName,
        text: newEmail.email + '\n\n' + newEmail.message
    })
    res.status(200).json({'status':'Email sent successfully!'})

}