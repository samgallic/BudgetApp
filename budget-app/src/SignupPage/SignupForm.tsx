import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 201) {
        toast({
          title: "Account created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error creating account",
          description: errorData.message || "Unknown error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Network or server error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

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
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormControl>
      </SimpleGrid>
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Re-enter Password</FormLabel>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </FormControl>
      <HStack spacing={2}>
        <Button mt={5} colorScheme="green" onClick={handleSubmit}>
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
