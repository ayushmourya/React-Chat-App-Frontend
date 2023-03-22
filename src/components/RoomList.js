import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }

    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/chitchat/rooms');
        setRooms(response.data.filter((room) => !room.isPrivate));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Created At</Th>
          <Th>Join Room</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rooms.map((room) => (
          <Tr key={room._id}>
            <Td>{room.name}</Td>
            <Td>{room.description}</Td>
            <Td>{formatDate(room.createdAt)}</Td>
            <Td>
              <Link to={`/room/${room._id}`}>
                <Button colorScheme="blue" rightIcon={<ChevronRightIcon />}>
                  Join Room
                </Button>
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RoomList;