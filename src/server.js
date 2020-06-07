const express = require("express")
const server = express()

//pegar db
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar req.body na aplicação
server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da aplicação
//pagina inicial
//req : requisição
//res : resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo" })
})

server.get("/create-point", (req, res) => {
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body : corpo do formulaio
    console.log(req.body)

    //inserir dados no banco

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastro com sucesso")
        console.log(this)

        return res.send("create-point.html",{saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total : 0}) 
    }
    //pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        //mostrar pagina html com dados do db
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//ligar servidor
server.listen(3000)