const path = require('path')
const ClientPage = (req,res)=>{
    res.sendFile(path.resolve("Pages/client/ClientPage/ClientPage.html"))
     }
     const ClientOnActivePage = (req,res)=>{
        res.sendFile(path.resolve("Pages/client/ClientOnActive/ClientOnActivePage.html"))
       } 
       module.exports ={ClientPage,ClientOnActivePage}