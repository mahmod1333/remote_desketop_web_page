import keybord_ar from '../../../../JSON/keybord_ar.json' assert { type: 'json' };
import keybord_en from '../../../../JSON/keybord_en.json' assert { type: 'json' };
let keyboard_keys = document.querySelector(".keyboard_keys");
let keyboard_data_keys=Object.keys(keybord_ar)
let keyboard_data_value=Object.values(keybord_ar)
console.log(keyboard_data_keys);


































const loadKeys = (i)=>{
  let keys=''
  for (let key in keyboard_data_value[i]) {
    switch(keyboard_data_value[i][key]) {
      case "Backspace":
      keys+= `  <div class="keys backspace_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Tab":
        keys+= `  <div class="keys tab_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Caps Lock":
        keys+= `  <div class="keys caps_lock_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Enter":
        keys+= `  <div class="keys enter_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Shift":
        keys+= `  <div class="keys shift_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Ctrl":
        keys+= `  <div class="keys ctrl_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Win":
        keys+= `  <div class="keys win_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "Alt":
        keys+= `  <div class="keys alt_key">${keyboard_data_value[i][key]}</div>`
        break;
        case "":
        keys+= `  <div class="keys space_key">${keyboard_data_value[i][key]}</div>`
        break;
      default:
        keys+= `  <div class="keys">${keyboard_data_value[i][key]}</div>`
    }
       
  }
  return keys
}
for (let i = 0; i < keyboard_data_keys.length; i++) {
  keyboard_keys.innerHTML += `<div class="row"> ${loadKeys(i)}</div>`
}