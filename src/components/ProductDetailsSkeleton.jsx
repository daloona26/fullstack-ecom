import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductDetailsSkeleton = () => {
  return (
    <Box maxW="sm" mt={"5"} mx="auto" bg={"gray.700"} p={5} rounded="">
      <Skeleton height="200px" />
      <SkeletonText mt="4" spacing="4" mx="auto" maxW="200px" />
      <SkeletonText mt="4" spacing="4" />
      <SkeletonText mt="4" spacing="4" maxW="120px" />
      <Skeleton mt="4" height="50px" spacing="4" maxW={"full"} rounded="lg" />
    </Box>
  );
};

export default ProductDetailsSkeleton;
