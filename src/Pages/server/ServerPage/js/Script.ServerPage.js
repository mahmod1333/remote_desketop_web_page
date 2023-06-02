var StringOfUrl = window.location.search;
let IP = StringOfUrl.slice(1).split("IP=")[1];

let room_input=document.getElementById('room-input');
room_input.value = IP