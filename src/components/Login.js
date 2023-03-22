import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Center,
} from '@chakra-ui/react';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/chitchat/login', {
        username,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      window.location.href = '/create-room';
    } catch (error) {
      setError(error.response.data.message);
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        p="6"
        w={['90%', '60%', '40%', '25%']}
        bg="white"
      >
        <VStack as="form" onSubmit={handleSubmit} spacing="6">
          <Heading as="h1" size="2xl" textAlign="center">
            Login
          </Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" size="lg" w="full">
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
