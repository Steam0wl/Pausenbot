const Canvas = require("canvas");
const Discord = require("discord.js");
// const background = "./wichtiges/2725560.jpg";
// const background = "https://icedrive.net/s/vQufaQW8yfV5TY2Gtu4S2Ab9tARF";
const background = "https://i.imgur.com/nq8b1DW.jpg";

const dim ={
  height: 675,
  width: 1200,
  margin: 50
}

const av = {
  size: 256,
  x: 480,
  y: 170
}

const generateImage = async (member) => {
  let username = member.user.username;
  let discrim = member.user.discriminator;
  let avatarURL = member.user.displayAvatarURL({format: "jpg", dynamic:false, size: av.size});
  
  const canvas = Canvas.createCanvas(dim.width, dim.height);
  const ctx = canvas.getContext("2d");

  //draw in the background
  const backimg = await Canvas.loadImage(background);
  ctx.drawImage(backimg, 0, 0);

  //draw black tinted box
  ctx.fillStyle = "rgba(0,0,0,0.8)"
  ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin);

  const avimg = await Canvas.loadImage(avatarURL);
  ctx.save();

  //draw selection fir av Img
  ctx.beginPath();
  ctx.arc(av.x + av.size/2, av.y + av.size/2, av.size/2, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avimg, av.x, av.y);
  ctx.restore();

  //write in img
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  //draw in Text
  ctx.font = "50px Arial";
  ctx.fillText("Welcome", dim.width/2, dim.margin + 70);
  
  //draw in username
  ctx.font = "60px Arial";
  ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 125);
  
  //draw "to the server"
  ctx.font = "40px Arial";
  ctx.fillText("to the server", dim.width/2, dim.height - dim.margin - 50);

  //convert to attachment
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

  return attachment;
}

module.exports = generateImage;