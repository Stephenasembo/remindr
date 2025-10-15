require('dotenv').config()
const Resend = require('resend').Resend;

const resend = new Resend(process.env.RESEND_API);

async function sendEmail(){
  try {
    const data = await resend.emails.send({
      from: 'Remindr <notifications@remindr.stephenasembo.com>',
      to: 'stephenasembo524@gmail.com',
      subject: 'Test Email',
      text: 'Congrats! You can now receive emails from Remindr'
    })
  } catch(err) {
    console.log(err)
  }
}

sendEmail()