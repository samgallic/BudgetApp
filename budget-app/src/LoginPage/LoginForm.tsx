import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const LoginForm: React.FC = () => {
  return (
    <Box p={6}>
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl isRequired>
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

export default LoginForm;
