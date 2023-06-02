let IP
var StringOfUrl = window.location.search;
IP = StringOfUrl.slice(1).split("IP=")[1];
if(IP){
    joinRoomWithoutCamShareScreen(IP);

}
