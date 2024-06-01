import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Container,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const styles = {
    homePage: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center" as "center",
      padding: "20px",
    },
    navbar: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      borderRadius: "md",
      shadow: "md",
    },
    mainContent: {
      marginTop: "20px",
    },
    feature: {
      margin: "20px 0",
    },
    featureHeading: {
      color: "#333",
    },
    featureText: {
      color: "#666",
    },
    button: {
      fontSize: "16px",
      color: "#FFF",
      backgroundColor: "transparent",
      border: "2px solid white",
      borderRadius: "5px",
      cursor: "pointer",
      _hover: {
        bg: "white",
        color: "#4CAF50",
      },
    },
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container centerContent maxW="container.xl">
      <Flex as="nav" align="center" style={styles.navbar}>
        <Heading pr="1" pl="0.0001" m="4" size="lg">
          Budgeting App{" "}
        </Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button style={styles.button} onClick={handleLogin}>
            Log In
          </Button>
          <Button style={styles.button} onClick={handleSignUp}>
            Sign Up
          </Button>
        </HStack>
      </Flex>
      <Box mt={8}>
        <VStack spacing={4}>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">Track Your Spending</Heading>
            <Text mt={4}>Queencard!</Text>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">Set Budget Goals</Heading>
            <Text mt={4}>I'm hot!!</Text>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">Generate Reports</Heading>
            <Text mt={4}>My boob and booty hot!!!!</Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default HomePage;
