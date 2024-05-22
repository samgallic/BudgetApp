import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

const Login: React.FC = () => {
  return (
    <Box p={6}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button
        mt={5}
        colorScheme="green"
        onClick={() => {
          console.log("Add functionality");
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
