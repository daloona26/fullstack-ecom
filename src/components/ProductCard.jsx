import { Card, CardBody } from "@chakra-ui/react";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import React from "react";

const ProductCard = ({ attributes, id }) => {
  //   <\ColorModeScript initialColorMode={theme.config.initialColorMode} />;
  const { colorMode } = useColorMode();

  return (
    <Card border={"1px solid #a8b5c8"} bg="none">
      <CardBody>
        <Image
          src={`${attributes?.thumbnail?.data?.attributes?.formats?.small?.url}`}
          alt="Green double couch with wooden legs"
          //   borderRadius="50%"
          // width={200}
          // height={200}
          boxSize={"200"}
          borderRadius="full"
          mx="auto"
          objectFit="cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center" mb="2">
            {attributes.title}
          </Heading>
          <Text fontSize={"sm"} textAlign="center">
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign="center">
            ${attributes.price}
          </Text>
          <Button
            as={Link}
            to={`products/${id}`}
            href={`products/${id}`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            size="xl"
            variant="outline"
            border="none"
            py="5"
            overflow="hidden"
            w="full"
            hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
