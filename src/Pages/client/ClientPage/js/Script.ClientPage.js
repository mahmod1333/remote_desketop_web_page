var socket = io("http://192.168.1.106:9000");
let room
document.getElementById("room-input").addEventListener("change",function(){
  room=this.value
})
 $("#Go").on("click",async ()=>{
    if(room){
        window.location.replace(`/client/ClientOnActivePage?room=${room}`);
    }else{
        alert("input is empty")
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
//////////////////////////////////////client //////////////////////////////////////////////////////////////
