"use client";
import CookieService from "../services/CookieService";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { Popover, PopoverTrigger } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as={Link}
      to={children.toLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

const NAV_ITEMS = [
  {
    label: "Products",
    href: "products",
  },
  {
    label: "Dashboard",
    href: "dashboard",
  },
];

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default function NavBar() {
  const { cartProducts } = useSelector(selectCart);
  // const  cartProducts  = useSelector((state) => {
  //   return state.cartProducts;
  // });
  const dispatch = useDispatch();
  const onOpen = () => dispatch(onOpenCartDrawerAction());

  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookieService.get("jwt");

  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex display={{ base: "none", md: "flex" }} ml={0}>
            <Box as="a" href="/" mr={5} color={"orange"}>
              Wow Mobiles
            </Box>
            <DesktopNav />
          </Flex>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FaMoon /> : <IoMdSunny />}
              </Button>
              <Button onClick={onOpen}>Cart ({cartProducts?.length})</Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={"../assets/personal pic.jpg"} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Box as="a" href="login" mt={2}>
                  Login
                </Box>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
