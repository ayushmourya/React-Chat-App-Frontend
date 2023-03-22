import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";

const socket = io.connect("http://localhost:8900");

function Room({ match }) {
  const { id } = useParams();
  console.log(id);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(id);
  const [showChat, setShowChat] = useState(false);
  const joinButtonRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
    if (username && room) {
      joinButtonRef.current.click();
    }
  }, [username, room, joinButtonRef]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
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
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button ref={joinButtonRef} onClick={joinRoom} disabled={!username || !room}>
            Join A Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Room;