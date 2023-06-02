var socket = io("http://192.168.1.105:9000");
let room
let hide_show =false;
var StringOfUrl = window.location.search;
room = StringOfUrl.slice(1).split("room=")[1];
if(room){
     createRoom(room);
    socket.emit("join-message",room);
     socket.emit("start-conn",room);

}
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
    var x = e.pageX  - posX;
    var y = e.pageY - posy;
    var obj = {"x":x,"y":y,"room":room}
   
    socket.emit("mouse-move",JSON.stringify(obj));
});
$("remote-video").click(function(e){
    var obj = {"room" : room};
    socket.emit("mouse-click", JSON.stringify(obj));
});
document.getElementById("remote-video").addEventListener("touchstart",
function clicked(e) {
    var br = document.getElementById("remote-video").getBoundingClientRect();
    // x & y are relative to the clicked element
    var x = e.touches[0].clientX - br.left;
    var y = e.touches[0].clientY - br.top;
    
    var obj = {"x":x,"y":y,"room":room}
 
    socket.emit("touch",JSON.stringify(obj));
});