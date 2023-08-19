let Vshift=false;
let Vctrl=false;
let Vwin=false;
let Valt=false;
let showKeybord = false
let keyboard_en_values = Object.values(keybord_en)
let keyboard_keys = document.querySelector(".keyboard_keys");
let keyboard_data_keys=Object.keys(keybord_ar)
let keyboard_ar_value=Object.values(keybord_ar)
let lang = "ar"
const showKeybordBtnhandler = ()=>{
  if(showKeybord === false){
    showKeybord=true;
    document.getElementById("act-keyboard").style.display = "block"
  }else{
    showKeybord=false;
    document.getElementById("act-keyboard").style.display = "none"
  }

}
const loadKeys = (i,shift,keysValues)=>{
  let keys=''
  if (!shift) {
    for (let key in keysValues[i]) {
      if(keysValues[i][key].length === 2){
        keys+= `  <button value_data= "${key}" key_data = "${i}" id = "${keysValues[i][key][0]}" onclick="KeyClickhandler(this)" class="keys ${keysValues[i][key][0]}_key" >${keysValues[i][key][0]}</button>`
      }else{
        keys+= `  <button value_data= "${key}" key_data = "${i}" id = "${keysValues[i][key][0]}"onclick="KeyClickhandler(this)" class="keys ${keysValues[i][key]}_key">${keysValues[i][key]}</button>`
      }
         
    }
  }else{
    for (let key in keyboard_ar_value[i]) {
      if(keysValues[i][key].length === 2){
        keys+= `  <button value_data= "${key}" key_data = "${i}" id = "${keysValues[i][key][0]}" onclick="KeyClickhandler(this)" class="keys ${keysValues[i][key][0]}_key" >${keysValues[i][key][1].toUpperCase()}</button>`
      }else{
        keys+= `  <button value_data= "${key}" key_data = "${i}" id = "${keysValues[i][key][0]}" onclick="KeyClickhandler(this)" class="keys ${keysValues[i][key]}_key">${keysValues[i][key].toUpperCase()}</button>`
      }
         
    }
  }

  return keys
}
const mainKeyboardhandler =(shift)=>{

  let KeysHtm = ""
if (lang === "ar") {
  for (let i = 0; i < keyboard_data_keys.length; i++) {
    KeysHtm +=  `<div class="row"> ${loadKeys(i,shift,keyboard_ar_value)}</div>`
      
     }

     var obj = { "room": room ,"lang":lang};
     socket.emit("lang-type", JSON.stringify(obj));
} else if(lang === "en") {
  for (let i = 0; i < keyboard_data_keys.length; i++) {
    KeysHtm +=  `<div class="row"> ${loadKeys(i,shift,keyboard_en_values)}</div>`
      
     }
     var obj = { "room": room ,"lang":lang};
     socket.emit("lang-type", JSON.stringify(obj));
}

  keyboard_keys.innerHTML =KeysHtm
}

const KeyClickhandler = (e)=>{

const inp = e.innerText;

switch(inp){

  case  "Shift"  :
    case "Shift".toUpperCase():
   
    Shifthandler(e)
  break;
  case "Ctrl":
    case "Ctrl".toUpperCase():
    Ctrlhandler(e)
  break;
  case "Alt":
    case "Alt".toUpperCase():
      Althandler(e)
  break;
  default:
    mainkeyshandler(e)
}


}



const KeyControlerhandler = async (e)=>{
 
  let keyControler = e.attributes.key_data.value;
  let valueControler = e.attributes.value_data.value;
 keyControler=parseInt(keyControler)
 valueControler=parseInt(valueControler)
  
return keyboard_en_values[keyControler][valueControler]
}
////////////////////////////////////////////////////////////////////////////////////
const Shifthandler = (e)=>{
  
  KeyControlerhandler(e).then((inp)=>{
    if (!Vshift) {
      Vshift = true ;
      mainKeyboardhandler(Vshift)
    var obj = { "room": room ,"UpDown":2,"inp":inp};
    socket.emit("type", JSON.stringify(obj));
    const Shiftkey = document.querySelector(".Shift_key")
    Shiftkey.style = "background-color:black;color:#fff"
      }else{
      Vshift = false ;
      mainKeyboardhandler(Vshift)
    var obj = { "room": room ,"UpDown":3,"inp":inp};
    socket.emit("type", JSON.stringify(obj));
    const Shiftkey = document.querySelector(".Shift_key")
    Shiftkey.style = "background-color:#fff;color:black"
    }

  })

}
////////////////////////////////////////////////////////////////////////////////////////////
const Ctrlhandler = (e)=>{
KeyControlerhandler(e).then((inp)=>{
  if (!Vctrl) {
    Vctrl = true ;
  var obj = { "room": room ,"UpDown":2,"inp":inp};
  socket.emit("type", JSON.stringify(obj));
    }else{
    Vctrl = false ;
  var obj = { "room": room ,"UpDown":3,"inp":inp};
  socket.emit("type", JSON.stringify(obj));
  }

})
}
/////////////////////////////////////////////////////////////////////////////////////////////
const Althandler = (e)=>{
  KeyControlerhandler(e).then((inp)=>{
  if (!Valt) {
    Valt = true ;
  var obj = { "room": room ,"UpDown":2,"inp":inp};
  socket.emit("type", JSON.stringify(obj));
  if(Vshift){
    if(lang === "ar"){
      lang = "en"
      mainKeyboardhandler(Vshift)
    }else{
      lang = "ar"
      mainKeyboardhandler(Vshift)
    }
  }
    }else{
      Valt = false ;
  var obj = { "room": room ,"UpDown":3,"inp":inp};
  socket.emit("type", JSON.stringify(obj));
  }
  
})

}
//////////////////////////////////////////////////////////////////////////////////////////
const mainkeyshandler =(e)=>{
 KeyControlerhandler(e).then((inp)=>{ 
   var obj = { "room": room ,"UpDown":1,"inp":inp};
 socket.emit("type", JSON.stringify(obj));
 })
 

}
  
mainKeyboardhandler(Vshift)
showKeybordBtnhandler()