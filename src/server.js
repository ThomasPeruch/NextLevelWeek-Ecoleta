const express = require("express")
const server = express()

//pegar db
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache: true
})


//configurar caminhos da aplicação
//pagina inicial
//req : requisição
//res : resposta
server.get("/", (req, res) => {
    return res.render("index.html",{title: "Um titulo"})
    
    
    
})

server.get("/create-point", (req, res) => {
    console.log(req.query)




    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    //pegar dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length

        //mostrar pagina html com dados do db
        return res.render("search-results.html",{places:rows, total:total})
    })
})

//ligar servidor
server.listen(3000)