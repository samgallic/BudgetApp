import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

const SignupForm: React.FC = () => {
  return (
    <Box p={6}>
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
      <Button
        mt={5}
        colorScheme="green"
        onClick={() => {
          console.log("Add functionality");
        }}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default SignupForm;
