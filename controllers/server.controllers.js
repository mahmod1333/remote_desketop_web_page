const path = require('path')
const ServerPage = (req,res)=>{
    res.sendFile(path.resolve("Pages","server","ServerPage","ServerPage.html"))
     }
     const ServerOnActivePage = (req,res)=>{
        res.sendFile(path.resolve("Pages","server","ServerOnActive","ServerOnActivePage.html"))
       }

       module.exports={ServerPage,ServerOnActivePage}