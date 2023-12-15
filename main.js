
const BotOwner = {
  ID: '1101044683993522206',
  Username: 'BintangDeveloper',
  Color: parseInt("80C9FE", 16),
  GuildID: '1114130686580903937'
};

const env = process.env;

const Whitelisted = {
  UsersID: ['1101044683993522206'],
  GuildID: ['1114130686580903937', '1123578397906436096']
};

const Emoji =  [ `<:CF_Succes:1174912515646431363> <:CF_Error:1174912572823175218> <:CF_Warn:1174912647754420325>` ];

const Colors = {
    normal: parseInt("FFFFFF", 16),
    inv: parseInt("2B2D31", 16),
    warning: parseInt("FFC107", 16),
    error: parseInt("FF5722", 16),
    log: parseInt("2196F3", 16),
    success: parseInt("4CAF50", 16),
};

function message() {
  return {
    success: function(t) {
      if (t) {
        return "> <:CF_Succes:1174912515646431363> The " + t + " message sent successfully.";
      } else {
        return "> <:CF_Succes:1174912515646431363> The message sent successfully.";
      }
    },
    Error: (t) => {
      
    },
    NeedPermission: (t) => {
      return `> <:CF_Error:1174912572823175218> You don't have permission to use this command.`;
    }
  };
}

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
  BotOwner: BotOwner,
  Whitelisted: Whitelisted,
  Colors: Colors,
  Emoji: Emoji,
  message: message,
  msToTime: msToTime,
};
