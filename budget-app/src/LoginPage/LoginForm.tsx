import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast(); // Initialize the useToast hook

  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill in both fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home");
      } else {
        const errorData = await response.json();
        toast({
          title: "Invalid email or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
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
      <HStack spacing={2}>
        <Button
          mt={5}
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={isLoading} // Shows a loading spinner while submitting
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
