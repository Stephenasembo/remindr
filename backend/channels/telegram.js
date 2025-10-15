require('dotenv').config();

const endpoint = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT}/`;

async function sendTelegram(chatId, message) {
  try {
    const res = await fetch(`${endpoint}sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
    if (!res.ok) {
      console.log('Message could not be sent.');
    }
  } catch (err) {
    console.error(err);
  }
}

const id = process.env.TEST_CHAT;

sendTelegram(id, 'Hello, again from Remindr!');
