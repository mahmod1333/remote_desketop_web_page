var ks = require('node-key-sender');
const Typehandler = (data)=>{
    const {UpDown,inp} = JSON.parse(data);
    if(UpDown === 2){
        ks.sendKey(inp);
    }
   
    
}
module.exports= {Typehandler}