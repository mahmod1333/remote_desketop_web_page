var socket = io("http://192.168.1.105:9000");
let room
let hide_show =false;
var StringOfUrl = window.location.search;
let x 
let y 
// click variabls DB  //////////////
let doubletouch = false 
let checkD = false;
// click variabls LR ///////////////
let clickLR = "left"
let checkClickLR = false;
///////////////////////////////////
room = StringOfUrl.slice(1).split("room=")[1];
function togglePopup(message) {
   
    $(".message").html(message);
    $(".message").toggle();
}

if(room){
    togglePopup("<p>Wait to get the PC</p>")
     createRoom(room);
    socket.emit("join-message",room);
     socket.emit("start-conn",room);
     togglePopup("done")
}
socket.on("screen-size",(data)=>{
    var ServScreen = data.mainScreen
    console.log(ServScreen);
    let box = document.querySelector('#remote-video');
        let width = box.offsetWidth;
        let height = box.offsetHeight;
        console.log({ width, height });
})

document.getElementById('show-hide').addEventListener('click',()=>{
if (!hide_show) {
hide_show=true;
$(".controls").css("margin-top", -60)
    $("#show-hide-img").attr("src","../../src/img/down.png")
}else{
    hide_show=false;
    $(".controls").css("margin-top", 0);
    $("#show-hide-img").attr("src","../../src/img/upload.png")
}
})

$("#remote-video").mousemove(function (e) { 
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    var posX = $(this).offset().left; 
    var posy=$(this).offset().top;
     e.pageX  - posX;
     e.pageY - posy;
    var obj = {"x":x,"y":y,"room":room}
   
    socket.emit("mouse-move",JSON.stringify(obj));
});
$("remote-video").click(function(e){
    var obj = {"room" : room};
    socket.emit("mouse-click", JSON.stringify(obj));
});
document.getElementById("remote-video").addEventListener("touchstart",
function clicked(e) {
    var br = document.getElementById("remote-video");
  
   var w =br.clientWidth
   var h =br.clientHeight

    // x & y are relative to the clicked element
   x = e.touches[0].clientX - br.getBoundingClientRect().left;
  y = e.touches[0].clientY - br.getBoundingClientRect().top;
  
       // action of  left click //////////////////////////////////////////////////////////////////////////////////
   var timer = setInterval(() => {
    clickLR = "right";
   checkClickLR = true;
    }, 1000);
    br.addEventListener("touchend",()=>{
if(checkClickLR){
    checkClickLR= false
        var obj = {"x":x,"y":y,"room":room,"w":w ,"h":h , "doubletouch":doubletouch,"clickLR":clickLR}
        socket.emit("touch",JSON.stringify(obj));
        clearInterval(timer)
      
    }
    clickLR = "left";
    });

    // action of  left click //////////////////////////////////////////////////////////////////////////////////




     //action on double tap goes below/////////////////////////////////////////////////////////////////////////
    if(!checkD){
        if(!doubletouch){
            checkD = true;
            setTimeout(() => {
                checkD = false;
                doubletouch=false
                console.log("hi")
            }, 500);
            
                }
    }else{
        doubletouch=true
    }
  //action on double tap goes below/////////////////////////////////////////////////////////////////////////////
  

    var obj = {"x":x,"y":y,"room":room,"w":w ,"h":h , "doubletouch":doubletouch,"clickLR":clickLR ="left" }
 
    socket.emit("touch",JSON.stringify(obj));
});

