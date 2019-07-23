/*const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/


/* MYSQL STARTER CODE
*****************************


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

*****************************

*/


const mysql = require('mysql');
const Discord = require('discord.js');
const bot = new Discord.Client();
let usr; // defined when user interacts with server
let champs; // defined when user interacts with server
//let usr_session; 

const token = 'NTkyMDY2MDEzMTM5NDM1NTUw.XQ6BYw.29KJxHNavYwIiC_2Jkl-OF5NJrE';

// bot.on('',);
const PREFIX = '/';



/*
let wallet = {
  coin: 5.55,
  exp: 270,
  renown: 6
};
*/

let champ = {
  class: {
    class: 'rogue',
    level: 1,
    race: 'variant human',
    background: 'soldier',
    alignment: 'C/N',
    name: 'romulen'
    //player_name: 'steve#1234'
  },
  attributes: {
    str: 10,
    dex: 10,
    con: 12,
    int: 14,
    wis: 9,
    cha: 10
  },
  throws: {
    str: 0,
    dex: 2,
    con: 1,
    int: 2,
    wis: -1,
    cha: 0
  },
  skills: {
    acro: 4,
    athl: 0,
    decept: 0,
    intim: 0,
    percept: -1,
    persua: 0,
    hist: 4,
    stealth: 0,
    insight: -1,
    arcana: 4,
    soh: 2,
    perf: 0,
    handle: 0,
    medicine: -1,
    nature: 0,
    religion: 0,
    investigation: 0
  },
  wallet: {
    coin: 5.55,
    exp: 270,
    renown: 6
  },
  equipment: {
    longsword: {
      weight: 3,
      value: 15,
      desc: "Versitile (1d10)"
    }
  },
  profinciencies: {
    prof: ['light-weapons', 'thieves-tools', 'elven'],
    skills: ['acro'],
    throws: ['dex']
  },
  features: {
    sneakAtt: {
      desc: "Description",
      feature: "class"
    },
    elvenAcc: {
      desc: "triple advantage",
      feature: 'bonus'
    }
  }
};


let champ2 = {
  class: {
    class: 'rogue',
    level: 1,
    race: 'variant human',
    background: 'criminal',
    alignment: 'C/N',
    char_name: 'romulen',
    player_name: 'steve#1234'
  },
  attributes: {
    str: 10,
    dex: 10,
    con: 12,
    int: 14,
    wis: 9,
    cha: 10
  },
  throws: {
    str: 0,
    dex: 2,
    con: 1,
    int: 2,
    wis: -1,
    cha: 0
  },
  skills: {
    acro: 4,
    athl: 0,
    decept: 0,
    intim: 0,
    percept: -1,
    persua: 0,
    hist: 4,
    stealth: 0,
    insight: -1,
    arcana: 4,
    soh: 2,
    perf: 0,
    handle: 0,
    medicine: -1,
    nature: 0,
    religion: 0,
    investigation: 0
  },
  wallet: {
    coin: 5.55,
    exp: 270,
    renown: 6
  },
  equipment: {
    longsword: {
      weight: 3,
      value: 15,
      desc: "Versitile (1d10)"
    }
  },
  profinciencies: {
    prof: ['light-weapons', 'thieves-tools', 'elven'],
    skills: ['acro'],
    throws: ['dex']
  },
  features: {
    sneakAtt: {
      desc: "Description",
      feature: "class"
    },
    elvenAcc: {
      desc: "triple advantage",
      feature: 'bonus'
    }
  }
};


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dnd",
  multipleStatements: true
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!");
});



/*

function run() {

    con.query('SELECT * FROM champ WHERE user_id=1', function (error, results, fields) {
          if (error) throw error;
          let i = 0;
          champs = JSON.parse(JSON.stringify(results));
          
          const c = champs.length;
    
          console.log(c);
    
          champs.forEach(champ => {
              con.query('SELECT * FROM attributes WHERE champ_id='+champ.id+'; SELECT * FROM throws WHERE champ_id='+champ.id, function (error, results, fields) {
                if (error) throw error;
                let attr = JSON.parse(JSON.stringify(results));
                champs[i].attr = attr[0][0];
                champs[i].throw = attr[1][0];

                
                i++;
                
                if (i == c) {
                  console.log(champs);
                  console.log("bot response");
                }
            });

          });
    
        });
}

run();



*/



bot.on('ready', () => {
  console.log("Bot is online");
});


bot.on('guildMemberAdd', member => {

  console.log("New guild member has joined");
  console.log(member.user.id);

});

bot.on('guildMemberRemove', member => {
  
  console.log("Guild member has been Removed");
  console.log(member.user.id);
  
});

bot.on('presenceUpdate', member => {
 console.log('Presence Updated: ' + member.id);
});


bot.on('message', msag => {
      
      if (msag.author.bot) return;
  
      usr = null;
      champs = null;

      con.query('SELECT id,discord_id FROM user WHERE discord_id=' + msag.author.id + ';', function (error, results, fields) {
      if (error) throw error;

      
        //console.log(results);
        
        
      results = JSON.parse(JSON.stringify(results));
      usr = results[0];
        
        //console.log(usr.id);

      let args = msag.content.substring(PREFIX.length).split(' ');
                    
                    
      con.query('SELECT * FROM champ WHERE user_id='+ usr.id, function (error, results, fields) {
          if (error) throw error;
          let i = 0;
          champs = JSON.parse(JSON.stringify(results));
          
          let c = champs.length;
    
          //console.log(c);
    
          champs.forEach(champ => {
            
              con.query('SELECT * FROM class WHERE champ_id='+champ.id+'; SELECT * FROM attributes WHERE champ_id='+champ.id+'; SELECT * FROM throws WHERE champ_id='+champ.id+'; SELECT * FROM wallet WHERE champ_id='+champ.id+';', function (error, results, fields) {
                if (error) throw error;
                let attr = JSON.parse(JSON.stringify(results));
                champs[i].class = attr[0][0];
                champs[i].attributes = attr[1][0];
                champs[i].throw = attr[2][0];
                champs[i].wallet = attr[3][0];

                
                i++;
                
                if (i == c) {
                  
                  //console.log(champs);

                  bot_response(args, usr, msag);
                  
                  
                }
                
        });

      });
        
    });
          
  });
  
});

  /*
bot.on('message', msag=> {

  con.query('SELECT id,discord_id FROM user WHERE discord_id=' + msag.author.id + '', function (error, results, fields) {
          if (error) throw error;
          // connected!
          //console.log(results);
          results = JSON.parse(JSON.stringify(results));
          usr = results[0];
    
          let args = msag.content.substring(PREFIX.length).split(' ');
          //console.log(usr);
          //console.log(usr.id);
          bot_response(args, usr, msag);
        });

  
  
  // WRITE QUERIES TO DEFINE USER AND CHAMPS
  // THEN THROW THE VARIABLES IN AS PARAMETERS FOR THE BOT_RESPONSE FUNCTION
});
  */

function bot_response(args,user,msg) {
  
  const patt = '/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/';
  let ini_val = args[0];
  
  //msg.reply('bot response');
  console.log("bot response");

    switch(ini_val) {
        
      case 'wallet':
        
        if (args[1]) {
        
          switch(args[1]) {
             
            case 'balance':
                msg.reply("\n Wallet \n ============= \n Balance: "+ champ.wallet.coin);
              break;
            case 'sendTo':
              msg.reply("\n Wallet \n ============= \n Balance: "+ champ.wallet.coin);
              break;
            case 'subtract':
              if(!!args[2].match(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/)) {
                let newb = parseFloat(champ.wallet.coin) - parseFloat(args[2]);
                msg.reply("\n Wallet \n ============= \n Balance: "+ newb );
                champ.wallet.coin = Math.round(newb * 100) / 100;
                        } else {
                          msg.reply("That is not a valid currency.");
                        }
              break;
            case 'add':
              if(!!args[2].match(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/)) {
                let newb = parseFloat(champ.wallet.coin) + parseFloat(args[2]);
                msg.reply("\n Wallet \n ============= \n Balance: "+ newb );
                champ.wallet.coin = Math.round(newb * 100) / 100;
                        } else {
                          msg.reply("That is not a valid currency.");
                        }
              break;
          }
          
        } else {
           msg.reply("Coin: " + champ.wallet.coin + "\n" +"Renown: "+ champ.wallet.renown +" \n" + "Experience: "+ champ.wallet.exp);
        }
        break;
     case 'equipment':
        //msg.reply("This is your EQUIPMENT!");
        switch(args[1]) {
          case 'list':
            msg.reply('list all equipment a character has');
            break;
          case 'sell':
            msg.reply('remove equipment from player and add coin to wallet');
            break;

          case 'buy':
            msg.reply('add equipment to character and remove equipment');
            break;
          case 'give':
            msg.reply('add equipment to specified player');
            break;
          case 'look':
            msg.reply('details of equipment');
            break;
        }
        break;
     case 'characters':
        //let c = JSON.stringify(champs); msg.reply(c);
        //msg.reply("something");
        list_all_char_stats(champs,msg);
        break;
     case 'character':
        msg.reply("list selected character");
        if(args[1]) {
          switch(args[1]) {
              case 'create':
                msg.reply("start creating a character");
              break;
          }
        }
        
        break;

    }

  
}

function list_all_char_stats(chars,msg) {
  
  let c = chars.length;
  let i = 0;
  let mes = "\n";
  
  chars.forEach(char => {
    
    i++;
     
     Object.keys(char).forEach(function(key,index) {

       if(typeof char[key] === 'object') {

         mes += key.toUpperCase() + "\n";
         
         Object.keys(char[key]).forEach(function(k,ind) {
           if (k !== "id" && k !== "champ_id") {
            mes += "    "+ k + ": " + char[key][k] + "\n";
           }
           
         });
         
       }
       
    });
    
   if(c == i) {
     
     //console.log(c,i);
     msg.reply(mes);
     
   }
    
  });
  
}

bot.login(token);
