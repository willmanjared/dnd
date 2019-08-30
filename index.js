const mysql = require('mysql');
const Discord = require('discord.js');
const lodash = require('lodash');
const bot = new Discord.Client();
let usr; // defined when user interacts with server
let champs; // defined when user interacts with server
//let usr_session; 

const token = 'NTkyMDY2MDEzMTM5NDM1NTUw.XWBzCQ.TZKQxconSbLVoRZGDrrWMXbew94';

// bot.on('',);
const PREFIX = '/';


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
  database: "eden",
  multipleStatements: true
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!");
});



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
      
      //console.log("msg event");
  
  
      //console.log(msag.author);
  //return;
  
      if (msag.author.bot) return;
  
  
      
  
      usr = null;
      champs = null;

      con.query('SELECT id,discord_id,selected_champ,discord_username FROM eden_users WHERE discord_id=' + msag.author.id + ';', function (error, results, fields) {
      if (error) throw error;
        
        
        
        
        //check if results has user
        
        
            // if not found, connect user to character
        
        
                //if can not be found respond with cannot be found
        
        
        
        
      results = JSON.parse(JSON.stringify(results));
      usr = results[0];

      let args = msag.content.substring(PREFIX.length).split(' ');
                    
                    
      con.query('SELECT * FROM champs WHERE user_id='+ usr.id, function (error, results, fields) {
          if (error) throw error;
          let i = 0;
          champs = JSON.parse(JSON.stringify(results));
          
          let c = champs.length;
    
          champs.forEach(champ => {
            
              con.query('SELECT * FROM classes WHERE champ_id='+champ.id+'; SELECT * FROM attributes WHERE champ_id='+champ.id+'; SELECT * FROM throws WHERE champ_id='+champ.id+'; SELECT * FROM wallets WHERE champ_id='+champ.id+';SELECT * FROM equipment WHERE champ_id='+champ.id+';' , function (error, results, fields) {
                if (error) throw error;
                let attr = JSON.parse(JSON.stringify(results));
                champs[i].class = attr[0][0];
                champs[i].attributes = attr[1][0];
                champs[i].throw = attr[2][0];
                champs[i].wallet = attr[3][0];
                champs[i].equipment = attr[4][0];
                //console.log(champs[i]);
                
                i++;
                
                if (i == c) {

                  bot_response(args, usr, msag);
                  
                  
                }
                
        });

      });
        
    });
          
  });
  
});


function bot_response(args,user,msg) {
  
  const patt = '/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/';
  let ini_val = args[0];

    switch(ini_val) {
        
      case 'wallet':
        
        if (args[1]) {
        
          switch(args[1]) {
             
            /*case 'balance':
                msg.reply("\n Wallet \n ============= \n Balance: "+ champ.wallet.coin);
              break;*/
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
           //msg.reply("Coin: " + champ.wallet.coin + "\n" +"Renown: "+ champ.wallet.renown +" \n" + "Experience: "+ champ.wallet.exp);
          //console.log(usr,champs);
           //console.log(champs);
          
          let a = lodash.filter(champs,{ 'id': usr.selected_champ });
          console.log(a);
          console.log(usr);
          let b = "\n Discord User: ("+ usr.discord_username +"#0000) \n Meta Points: ("+ a[0].wallet.meta_points +")\n GM Notes: notes... \n\n Character Name: ("+ a[0].class.name +")\n Currency: "+ a[0].wallet.coin +"\n Renown: "+ a[0].wallet.renown +"\n Experience: "+ a[0].class.experience +"\n Player Notes: notes...";
          msg.reply(b);
          //console.log(a[0].wallet.coin);
              
          
        }
        break;
     case 'equipment':
        //msg.reply("This is your EQUIPMENT!");
        switch(args[1]) {
          case 'list':
            msg.reply('list all equipment a character has');
            let a = lodash.filter(champs,{ 'id': usr.selected_champ });
            console.log(champs);
            console.log(a[0].equipment);
            /*
            a[0].equipment.forEach(x => {
              console.log(x.item_id);  
            });
            */
            
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
     //console.log(mes);
     msg.reply(mes);
     
   }
    
  });
  
}


bot.login(token);
