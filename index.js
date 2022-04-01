const io = require("socket.io")(8900,{
    cors:{
        origin: "http://localhost:3004"
    }
})
let users = []
const addUser = (userId, socketId)=>{
    !users.some((user)=> user.userId === userId)&&
    users.push({userId, socketId})
}

const removeUser = (socketId)=>{
    users.filter((user)=> user.socketId !==socketId)
}

io.on("connection", (socket)=>{
    console.log("connected")
    socket.on("AddUser", (userId)=>{
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })
    socket.on("disconnect", ()=>{
        console.log("disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)

    })
})
