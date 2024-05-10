require('dotenv').config();

function send_sms(title, url) {
  const auth = Buffer.from(process.env.API_CREDENTIALS).toString("base64");

  let data = {
    from: "News",
    to: process.env.PHONE_NUMBER,
    message: title + "\n" + url
  };

  data = new URLSearchParams(data);
  data = data.toString();
  
  fetch("https://api.46elks.com/a1/sms", {
    method: "post",
    body: data,
    headers: {"Authorization": "Basic "  + auth}
  }).then(res => res.json()).catch(err => console.log(err));
}

module.exports = {
  send_sms,
};