"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { InputRightElement } from "@chakra-ui/react";
import { FormHelperText } from "@chakra-ui/react";
import { loginReducer, userLogin } from "../app/features/LoginSlice";
import { Navigate } from "react-router-dom";

export default function Login({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to={"/"} replace />;
  const { loading, data, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // email check
    if (!user.identifier) {
      setIsEmail(true);
    } else if (user.identifier) {
      setIsEmail(false);
    }
    //password check
    if (!user.password) {
      setIsPassword(true);
    } else if (user.password) {
      setIsPassword(false);
    }
    dispatch(userLogin(user));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          as={"form"}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="identifier"
                value={user.identifier}
                onChange={onChangeHandler}
                isInvalid={isEmail}
              />
              {isEmail ? (
                <FormHelperText color={"red.500"}>
                  Email is required
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  isInvalid={isPassword}
                  value={user.password}
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    size="16"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? (
                <FormHelperText color={"red.500"}>
                  Password is required
                </FormHelperText>
              ) : null}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
