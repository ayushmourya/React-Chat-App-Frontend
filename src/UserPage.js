import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Avatar,
  Heading,
  Text,
  Button,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';

const UserPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('user')).username;
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `/api/chitchat/user/${username}`,
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, [username]);
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    const handleChatClick = () => {
      console.log('Chat with user', user.username);
    };
  
    return (
        
      <Box d="flex" alignItems="center">
        <Avatar name={user.username} src={user.avatar} mr={4} size="xl" />
        <Box>
          <Heading size="xl">{user.username}</Heading>
          <Text fontSize="xl" color="gray.500">
            {user.email}
          </Text>
          {currentUser !== username && (
            <>
              <Tooltip label="Send Email" placement="bottom">
                <IconButton
                  icon={<EmailIcon />}
                  aria-label="Send Email"
                  size="lg"
                  mr={2}
                  onClick={() => window.open(`mailto:${user.email}`)}
                />
              </Tooltip>
              <Tooltip label="Start Chat" placement="bottom">
                <Button
                  leftIcon={<ChatIcon />}
                  colorScheme="blue"
                  size="lg"
                  onClick={handleChatClick}
                >
                  Chat
                </Button>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    );
  };

    export default UserPage;