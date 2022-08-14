const { Telegraf } = require('telegraf');
const path = require('path');
const Userdb = require('./model/model');
const dotenv = require('dotenv');
const connectDB = require('./database/connection');

const bot = new Telegraf('5414779792:AAEE0CWnpiMIwKHAUnUw8i_mWQsv6IxSbL4');
dotenv.config( { path : 'config.env'} )
const helpMssg = `
    Command list :
    /list - See List user
    /exp  - Melihat expired user
    /address - Melihat address user
    /add  - Add user
` 


connectDB();
function dbconn(){
    Userdb.find(function(err, result) {
        if (err) {
            console.log(err);
        }
        
        // console.log(result)
        result.forEach(user => {
            // console.log(user.name)
            
            listData.push({
                id: user.id,
                name: user.name,
                address: user.address,
                expired: user.expired
            })
            
        })
        console.log("Data berhasil di dapatkan");
    });
}
dbconn();
const listData = []
function clearData(){
    listData.length = 0;
}


bot.help(ctx =>{
   ctx.reply(helpMssg); 
});
bot.command('list', ctx =>{
    
    let listMsg = `List User Bot Neko : \n`;
    
    listData.forEach((user, index) => {
        
        listMsg += `${index + 1}. ${user.name}\n`
    })
    ctx.reply(listMsg);
})
bot.command('address', ctx =>{
    let input  = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Input Nama User untuk mendapatkan address");
        return;
    }
    let userInput = input[1];
    listData.forEach(user => {
        if(user.name.includes(userInput)){
            ctx.reply("Address dari user = " +user.address);
            return;
        }
    })
})
bot.command('exp', ctx =>{
    let input  = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Input Nama User untuk mendapatkan expired dari user");
        return;
    }
    let userInput = input[1];
    listData.forEach(user => {
        if(user.name.includes(userInput)){
            ctx.reply("Langganan berakhir pada, " +user.expired);
            return;
        }
    })
})
bot.command('add', ctx =>{
    let input  = ctx.message.text.split(" ");
    if(input.length != 4){
        ctx.reply("Input Nama User,Address,Expired");
        return;
    }
    // console.log(input[1]);
    // console.log(input[2]);
    // console.log(input[3]);
    let nameUser = input[1];
    let addressUser = input[2];
    let expUser = input[3];

   var userNeko = Userdb;

   var add = new userNeko({ name: `${nameUser}`, address: `${addressUser}`, expired: `${expUser}`});
   add.save(function (err, user) {
    if (err) return console.error(err);
    ctx.reply("Data Telah Disimpan");
    clearData();
    dbconn();
  });
  
})
bot.launch();