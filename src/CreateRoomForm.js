import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  useToast,
  extendTheme,
  ChakraProvider,
  Center,
} from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/color-mode';
import { createIcon } from '@chakra-ui/icon';
import axios from 'axios';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  colors: {
    primary: {
      500: '#0069D9',
    },
  },
});

const CreateRoomIllustration = createIcon({
  displayName: 'CreateRoomIllustration',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
    />
  ),
});

const CreateRoomForm = () => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [roomId, setRoomId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('/api/chitchat/api/chitchat/rooms', {
        name,
        description,
        password,
        owner: user.username,
      });

      setRoomId(response.data._id);
      setShowSuccessMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToRoom = () => {
    window.location.href = `/room/${roomId}`;
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Center h="100vh">
        {showSuccessMessage ? (
          <VStack spacing={6} p={6} bg="white" borderRadius="lg" boxShadow="md">
            <Text fontSize="2xl" fontWeight="bold">Room created successfully!</Text>
            <Button onClick={handleGoToRoom} colorScheme="primary">
              Go to Room
            </Button>
          </VStack>
        ) : (
          <VStack spacing={6} p={6} bg="white" borderRadius="lg" boxShadow="md">
            <CreateRoomIllustration boxSize="100px" />
            <Text fontSize="2xl">Create a New Room</Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password (optional)</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="primary">
                Create Room
              </Button>
            </form>
          </VStack>
        )}
      </Center>
    </ChakraProvider>
  );
};

export default CreateRoomForm;

