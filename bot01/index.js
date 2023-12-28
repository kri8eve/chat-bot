const express = require('express')
const cors = require('cors')
const {Server} = require('socket.io')
const bodyParser = require('body-parser')
const {createServer} = require('http')

const app = express()
const server = createServer(app)
const port = 3000

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})

app.use(cors())
app.use(bodyParser.json())

var result = []
io.on('connection',socket=>{
    
    socket.emit('message','Connected')
    socket.emit('new-question','How can i help you ?')
    socket.on('new-message',(data)=>{
        result.push(data)
        socket.emit('new-question','Lorem ipsum')
    })
})

app.get('/',(req,res)=>{
    return res.send(result)
})

server.listen(port,()=>{
    console.log('Server listening on port',port)
})