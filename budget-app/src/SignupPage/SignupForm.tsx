import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={6}>
      <Button
        mt={5}
        colorScheme="green"
        onClick={() => {
          navigate("/home");
        }}
      >
        Budgeting App
      </Button>
      <SimpleGrid columns={2} spacing={10}>
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input />
        </FormControl>
      </SimpleGrid>
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Re-enter Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <HStack spacing={2}>
        <Button
          mt={5}
          colorScheme="green"
          onClick={() => {
            console.log("Add functionality");
          }}
        >
          Sign up
        </Button>
        <Button
          mt={5}
          colorScheme="green"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account?
        </Button>
      </HStack>
    </Box>
  );
};

export default SignupForm;
