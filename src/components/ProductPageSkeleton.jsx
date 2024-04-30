import {  SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const ProductPageSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="gray.600" rounded="lg">
      <SkeletonCircle mx="auto" size="40" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" mx="auto" w={20} />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <Flex justifyContent={"space-between"}>
        <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" />
        <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" />
      </Flex>
      <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" />
      <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
    </Box>
  );
};

export default ProductPageSkeleton;
