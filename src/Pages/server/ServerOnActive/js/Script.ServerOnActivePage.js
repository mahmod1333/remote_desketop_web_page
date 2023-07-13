let IP
var StringOfUrl = window.location.search;
const closeBtn = document.getElementById("act-close")
IP = StringOfUrl.slice(1).split("IP=")[1];
if(IP){
    joinRoomWithoutCamShareScreen(IP);

}
closeBtn.addEventListener("click",()=>{
    window.close()
})