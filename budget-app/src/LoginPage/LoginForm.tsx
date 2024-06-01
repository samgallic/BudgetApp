import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
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
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
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
          Login
        </Button>
        <Button
          mt={5}
          colorScheme="green"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Need to make an account?
        </Button>
      </HStack>
    </Box>
  );
};

export default LoginForm;
