var socket = io("http://192.168.1.10:9000");
let room
let hide_show = false;
var StringOfUrl = window.location.search;
const videoRemote = document.getElementById("remote-video")
let x
let y
let w
let h
// click variabls DB  //////////////
let doubletouch = false
let checkD = false;
// click variabls LR ///////////////
let clickLR = "left"
let checkClickLR = false;
let  timer;
///////////////////////////////////
room = StringOfUrl.slice(1).split("room=")[1];
function togglePopup(message) {

    $(".message").html(message);
    $(".message").toggle();
}

if (room) {
    togglePopup("<p>Wait to get the PC</p>")
    createRoom(room);
    socket.emit("join-message", room);
    socket.emit("start-conn", room);
    togglePopup("done")
}
socket.on("screen-size", (data) => {
    var ServScreen = data.mainScreen
    console.log(ServScreen);
    let box = document.querySelector('#remote-video');
    let width = box.offsetWidth;
    let height = box.offsetHeight;
    console.log({ width, height });
})




document.getElementById('show-hide').addEventListener("click", () => {
    if (!hide_show) {
        hide_show = true;
        document.querySelector(".c-act-header").style.margin= "-60px 0px"
        document.querySelector("#show-hide-img").src="../../src/img/down.png"
    } else {
        hide_show = false;
        document.querySelector(".c-act-header").style.margin= "0px 0px"
        document.querySelector("#show-hide-img").src= "../../src/img/upload.png"
    }
})







$("#remote-video").mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    var posX = $(this).offset().left;
    var posy = $(this).offset().top;
    e.pageX - posX;
    e.pageY - posy;
    var obj = { "x": x, "y": y, "room": room }

    socket.emit("mouse-move", JSON.stringify(obj));
});



$("remote-video").click(function (e) {
    var obj = { "room": room };
    socket.emit("mouse-click", JSON.stringify(obj));
});

const handelTouchStart = (e) => {


    w = videoRemote.clientWidth
    h = videoRemote.clientHeight

    // x & y are relative to the clicked element
    x = e.touches[0].clientX - videoRemote.getBoundingClientRect().left;
    y = e.touches[0].clientY - videoRemote.getBoundingClientRect().top;

    // action of  left click //////////////////////////////////////////////////////////////////////////////////
    timer = setInterval(() => {
        clickLR = "right";
        checkClickLR = true;
    }, 5000);



    //action on double tap goes below/////////////////////////////////////////////////////////////////////////
    if (!checkD) {
        if (!doubletouch) {
            checkD = true;
            setTimeout(() => {
                checkD = false;
                doubletouch = false
                console.log("hi")
            }, 500);

        }
    } else {
        doubletouch = true
    }
    //action on double tap goes below/////////////////////////////////////////////////////////////////////////////


    var obj = { "x": x, "y": y, "room": room, "w": w, "h": h, "doubletouch": doubletouch, "clickLR": clickLR }

    socket.emit("touch", JSON.stringify(obj));

}


const handelTouchMove = (e) => {

     w = videoRemote.clientWidth
     h = videoRemote.clientHeight

    // x & y are relative to the clicked element
    x = e.touches[0].clientX - videoRemote.getBoundingClientRect().left;
    y = e.touches[0].clientY - videoRemote.getBoundingClientRect().top;
    var obj = { "x": x, "y": y, "room": room, "w": w, "h": h }

    socket.emit("touch-move", JSON.stringify(obj));
}


const handelTouchEnd = (e) => {
    if (checkClickLR) {
        checkClickLR = false
        var obj = { "x": x, "y": y, "room": room, "w": w, "h": h, "doubletouch": doubletouch, "clickLR": clickLR }
        socket.emit("touch", JSON.stringify(obj));
        clearInterval(timer)

    }else{
        clearInterval(timer);
        clickLR = "left";
        checkClickLR = false;
    }
  
}
videoRemote.addEventListener("touchstart", (e) => handelTouchStart(e));
videoRemote.addEventListener("touchmove", (e) =>handelTouchMove(e))
videoRemote.addEventListener("touchend",(e) =>handelTouchEnd(e))