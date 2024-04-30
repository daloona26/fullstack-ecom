import { Card, CardBody } from "@chakra-ui/react";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { useDispatch } from "react-redux";
import { addToCart, cartReducer } from "../app/features/cartSlice";

const ProductPage = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { id } = useParams();
  const dispatch = useDispatch();
  const goBack = () => navigate(-1);

  const getProduct = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,categories`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery(["products", id], () =>
    getProduct()
  );

  const addToCartHandler = () => {
    dispatch(addToCart(data.data));
  };

  useEffect(() => {
    document.title = `product ${data?.data?.attributes?.title} Page`;
  }, [data?.data?.attributes?.title]);
  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <div className="px-4 flex flex-col items-center gap-0">
      <Button
        as={Link}
        onClick={() => goBack()}
        size={"lg"}
        bg="blue.900"
        px="4"
        mt="4"
        mb="0"
        // hover={{
        //   bg: "red.900",
        // }}
      >
        <IoArrowBack />
        Back
      </Button>

      <Card border={"1px solid #a8b5c8"} bg="none" w="xs" top="4" mx="auto">
        <CardBody>
          <Image
            src={`${data?.data?.attributes?.thumbnail?.data?.attributes?.url}`}
            alt="Green double couch with wooden legs"
            //   borderRadius="50%"
            //   width={200}
            //   height={200}
            width={"fit"}
            height={"200"}
            borderRadius="15"
            mx="auto"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="sm" textAlign="center" mb="2">
              {data?.data?.attributes?.title}
            </Heading>
            <Text fontSize={"sm"} textAlign="center">
              {data?.data?.attributes?.description}
            </Text>
            <Text color="blue.300" fontSize="2xl" textAlign="center">
              {data?.data?.attributes?.categories?.data[0]?.attributes?.title}
            </Text>
            <Text color="purple.600" fontSize="2xl" textAlign="center">
              ${data?.data?.attributes?.price}
            </Text>
            <Button
              as={Link}
              // to={`products/${id}`}
              // href={`products/${id}`}
              size="lg"
              variant="outline"
              bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
              color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
              border="none"
              py="4"
              overflow="hidden"
              w="full"
              hover={{
                bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                color: colorMode === "light" ? "white" : "#9f7aea",
                border: "transparent",
              }}
              textTransform="capitalize"
              mt={6}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductPage;
