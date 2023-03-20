import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Textarea,
  Badge,
} from "@chakra-ui/react";
import { ChatIcon, AttachmentIcon } from "@chakra-ui/icons";

function Chat({ socket, username, room }) {
  const { id } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [Room, setRoom] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/rooms/${id}`).then((response) => {
      setRoom(response.data);
      setIsPrivate(response.data.isPrivate);
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket, id]);

  const sendMessage = async () => {
    if (!isAuthorized && isPrivate) {
      alert("Please enter the password to join this room");
      return;
    }

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (password === Room.password) {
      setIsAuthorized(true);
      setPassword("");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <Box bg="white" borderRadius="md" boxShadow="md" p={4} w="100%" maxW="xl" mx="auto">
      <Flex align="center" justify="center" mb={4}>
        <ChatIcon mr={2} />
        <Text fontWeight="bold" fontSize="lg">
          Live Chat
        </Text>
        {isPrivate && (
          <Badge colorScheme="gray" ml={2}>
            Private
          </Badge>
        )}
      </Flex>
      <Box bg="gray.100" borderRadius="md" p={2} overflowY="scroll" maxH="400px">
        {isPrivate && !isAuthorized ? (
          <form onSubmit={handlePasswordSubmit}>
            <FormControl id="password">
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormErrorMessage>
                Incorrect password. Please try again.
              </FormErrorMessage>
              <Button type="submit" mt={4} colorScheme="green">
                Submit
              </Button>
            </FormControl>
          </form>
        ) : (
          <>
            {messageList.map((messageContent) => {
              return (
                <Box
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                  key={messageContent.time}
                  mb={2}
                >
                  <Flex align="flex-start">
                    <Box
                      bg={
                        username === messageContent.author
                          ? "blue.500"
                          : "gray.500"
                      }
                      borderRadius="full"
                      p={2}
                      color="white"
                      mr={2}
                    >
                      <Text fontSize="12px">{messageContent.author}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm">{messageContent.message}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {messageContent.time}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
            <Box mb={2}>
              <Flex align="center">
                <Textarea
                  value={currentMessage}
                  placeholder="Type a message..."
                  onChange={(event) => {
                    setCurrentMessage(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                  }}
                />
                <Button
                  onClick={sendMessage}
                  ml={2}
                  colorScheme="green"
                  size="md"
                  leftIcon={<ChatIcon />}
                >
                  Send
                </Button>

                <Button
                  ml={2}
                  colorScheme="green"
                  size="md"
                  leftIcon={<AttachmentIcon />}
                >
                  Attach
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );

}

export default Chat;