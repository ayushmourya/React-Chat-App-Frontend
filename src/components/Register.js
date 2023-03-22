

import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

   const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

       // perform client-side validation
    if (!username || !email || !password ) {
      console.log("All fields are required");
      return;
    }
  
    setShowModal(true);
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
      const response = await fetch('/api/chitchat/api/chitchat/register', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      toast({
        title: 'User created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
      setShowModal(false);
    }
  };


  

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, #3f51b5, #3f51b5)"
      bgColor="gray.100"
    >
      <Center
        w="400px"
        p="4"
        borderRadius="30px"
        // boxShadow="10px 10px 40px #3f9596, -20px -20px 60px #ffffff"
        bgColor="#6574C4"
        bg="gray.100"
      >
        <VStack
          as="form"
          onSubmit={handleSubmit}
          w="100%"
          spacing={4}
          align="center"
        >
          <Heading as="h1" size="lg">
            Register
          </Heading>
          <FormControl id="username" isRequired>
            <FormLabel>Username:</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <FormControl id="avatar">
            <FormLabel>Avatar:</FormLabel>
            <Input
              type="file"
              onChange={handleAvatarChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </VStack>

      </Center>
     

    </Box>
    
  );
};

export default Register;
