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
/*socket.on("screen-size", (data) => {
    var ServScreen = data.mainScreen
    console.log(ServScreen);
    let box = document.querySelector('#remote-video');
    let width = box.offsetWidth;
    let height = box.offsetHeight;
    console.log({ width, height });
})

*/


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





