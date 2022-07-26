import express from "express";
import { Server } from "socket.io";

const app = express()
const server = app.listen(3001)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User With ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnect ", socket.id)
    })
})
