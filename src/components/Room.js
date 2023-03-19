import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

const socket = io.connect("http://localhost:4000");

function Room() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { roomid } = useParams();

  const joinRoom = () => {
    if (username !== "" && roomid !== "") {
      socket.emit("join_room", { username: username, room: roomid });
      setShowChat(true);
    }
  };
  

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
  type="text"
  placeholder="John..."
  onChange={(event) => {
    setUsername(event.target.value);
  }}
/>
<button onClick={() => joinRoom({ username, roomid })}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={roomid} />
      )}
    </div>
  );
}

export default Room;
