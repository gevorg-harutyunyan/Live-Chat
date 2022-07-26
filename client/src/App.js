import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = (event) => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <form className='joinChatContainer' onSubmit={(event) => {
          event.preventDefault()
          joinRoom()
        }}>
          <h3>Chat</h3>
          <input type="text"
            placeholder='John...'
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <input type="text"
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value)
            }}
          />
          <button type='submit'>Join</button>
        </form>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;