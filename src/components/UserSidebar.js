import { Box, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserSidebar({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/chitchat/users');
      setUsers(response.data);
    };
    getUsers();
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (user) => {
    console.log(`Selected user: ${user.username}`);
    alert(`Selected user: ${user.username}`);
  };

  return (
    <Box bg="gray.100" p="4">
      <Input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearchTermChange}
        mb="4"
      />
      {filteredUsers.map((user) => (
        <Flex
          key={user._id}
          cursor="pointer"
          bg="white"
          borderRadius="md"
          p="2"
          _hover={{ bg: 'gray.200' }}
          onClick={() => handleSelectUser(user)}
        >
          <Box mr="2">
            <img
             src={`/api/chitchat/${user.avatar}`}
              alt={`Avatar for ${user.username}`}
              width="40"
              height="40"
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{user.username}</Text>
            <Text fontSize="sm" color="gray.500">{user.email}</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}

export default UserSidebar;