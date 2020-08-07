const discord = require('discord.js'); 
const client = new discord.Client();
const { post } = require('axios');


const regex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/| \/|)discord(app.com\/gifts\/|.gift\/)([^\s]+)/;
const token = ''


client.on('ready', () => {
  console.log('Sniping on user ' + client.user)
})

client.on('message', () => {

  if (regex.test(msg.content)) {

    let giftkey = regex.exec(msg.content)[3];
    var today = new Date()
    var time = today.getHours() + ":" + today.getMinutes();
    let authoravatar = msg.author.avatarURL
    let authorguy = msg.author.tag
    let authorserver = msg.guild

    post(
      `https://discordapp.com/api/v6/entitlements/gift-codes/${giftkey}/redeem`,
      {
        channel_id: '688181971729383471'
      },
      {
        headers: {
          'Authorization': token,
          'content-type': 'application/json',
          'payment_source_id': 'null'
        }
      }
    )
      .then(response => {
        switch (response.status) {
          case 200:
            console.log(`[+] Code Claimed: ${giftkey} | Server: ${authorserver} | Author: ${authorguy} | Time: ${time}`);
            confirmedsnipes = confirmedsnipes+1
            request.post(webhookurl, {
              json: {
                "embeds": [
                  {
                  "title": `Nitro Sniped! on account: ${client.user.tag}`,
                  "color": 123455,
                  "footer": {
                    "icon_url": "https://cdn.discordapp.com/attachments/688183560137474084/690572021364555867/Untitled.png",
                    "text": "Tyris's JS Nitro Sniper"
                  },
                  "image": {
                    "url": "https://cdn.discordapp.com/app-assets/521842831262875670/store/633877574094684160.png?size=1024"
                  },
                  "author": {
                    "name": `${authorguy} -> ${authorserver}`,
                    "icon_url": `${authoravatar}`
                  },
                  "fields": [
                    {
                      "name": "Nitro code successfully sniped!",
                      "value": "```nitrocode```".replace("nitrocode", `${giftkey}`)
                      }
                    ]
                  }
                ]
              }
            })
            break;

          default:
            break;
        }
      })
      .catch(error => {
        switch (error.response.status) {
          case 404:
            console.log(`[-] Invalid Code: ${giftkey} | Server: ${authorserver} | Author: ${authorguy} | Time: ${time}`);
            break
          case 400:
            console.log(`[-] Used Code: ${giftkey} | Server: ${authorserver} | Author: ${authorguy} | Time: ${time}`);
            request.post(webhookurl, {
              json: {
                "embeds": [
                  {
                  "title": "Nitro Sniper",
                  "color": 16711680,
                  "footer": {
                    "icon_url": "https://cdn.discordapp.com/attachments/688183560137474084/690572021364555867/Untitled.png",
                    "text": "Tyris's JS Nitro Sniper"
                  },
                  "image": {
                    "url": "https://cdn.discordapp.com/app-assets/521842831262875670/store/633877574094684160.png?size=1024"
                  },
                  "author": {
                    "name": `${authorguy} -> ${authorserver}`,
                    "icon_url": `${authoravatar}`
                  },
                  "fields": [
                    {
                      "name": "Tried to snipe nitro code but code was already redeemed",
                      "value": "```nitrocode```".replace("nitrocode", `${giftkey}`)
                      }
                    ]
                  }
                ]
              }
            })
            break;

          default:
            break;
        }
      });  
    }
})