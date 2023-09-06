const handelmousemove =(e) => {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    var posX =videoRemote.getBoundingClientRect().left;
    var posy = videoRemote.getBoundingClientRect().top;
    x = e.pageX - posX;
    y = e.pageY - posy;
    w = videoRemote.clientWidth
    h = videoRemote.clientHeight
    var obj = { "x": x, "y": y, "room": room  ,"w": w, "h": h}
    socket.emit("mouse-move", JSON.stringify(obj));
}

const handelmouseClick = ()=>{
    var obj = { "room": room }
    socket.emit("mouse-click", JSON.stringify(obj));
}
 
videoRemote.addEventListener("mousemove", (e)=>{handelmousemove(e)})
videoRemote.addEventListener("click", handelmouseClick)


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