import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
  useCreateDashboardProductMutation,
} from "../app/services/products";
import { Link } from "react-router-dom";

import CustomAlertDialog from "../shared/AlertDialog";
import CustomModal from "../shared/Modal";
import CreateModal from "../shared/CreateModal";

const DashboardProductsTable = () => {
  const [prodId, setProdId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductMutation();

  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductMutation();

  const [
    createProduct,
    { isLoading: isCreating, isSuccess: isCreatingSuccess },
  ] = useCreateDashboardProductMutation();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
  };

  const onChangePriceHandler = (value) => {
    setProductToEdit({ ...productToEdit, price: +value });
  };

  const onSubmitHandler = (e) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );
    formData.append("files.thumbnails", thumbnail);

    updateProduct({ id: prodId, body: formData });
  };

  const onChangeThumbnailHandler = (val) => {
    setThumbnail(val);
  };

  const onCreateHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        price: productToEdit.price,
      })
    );
    formData.append("files.thumbnails", thumbnail);

    createProduct({ id: prodId, body: formData });

    // If creation is successful, reset form and close modal
    setProductToEdit(null);
    setThumbnail(null);
    onCreateModalClose();
    createProduct();
  };

  useEffect(() => {
    if (isSuccess) {
      setProdId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setProdId(null);
      onModalClose();
    }
  }, [isUpdatingSuccess]);

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={() => {
          onCreateModalOpen();
        }}
        m={5}
      >
        Create Product
      </Button>
      <TableContainer maxW={"100%"} mx={"auto"}>
        <Table variant="simple">
          {/* <TableCaption>tota</TableCaption> */}
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product) => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>{product?.attributes?.title}</Td>
                <Td>
                  {product?.attributes?.category?.data?.attributes?.title}
                </Td>
                <Td>
                  <Image
                    borderRadius="full"
                    objectFit={"cover"}
                    boxSize="40px"
                    src={`${product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}`}
                    alt={product?.attributes?.title}
                  />
                </Td>
                <Td isNumeric>{product?.attributes?.price}</Td>
                <Td isNumeric>{product?.attributes?.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme="purple"
                    variant="solid"
                    mr={2}
                    onClick={() => {}}
                  >
                    Go
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    mr={2}
                    onClick={() => {
                      setProdId(product.id);
                      onOpen();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    mr={2}
                    onClick={() => {
                      setProdId(product.id);
                      setProductToEdit(product?.attributes);
                      onModalOpen();
                    }}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={""}
        description={
          "Do you really want to destroy this product? This product will be deleted"
        }
        onText={"Destroy"}
        onHandler={() => {
          destroyProduct(prodId);
        }}
        isLoading={isDestroying}
      />
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title={"Create Product"}
        onClick={onCreateHandler}
        isLoading={isCreating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            onChange={onChangeHandler}
            name="title"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description..."
            onChange={onChangeHandler}
            name="description"
          />
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Price</FormLabel>
          <NumberInput onChange={onChangePriceHandler} precision={2} step={0.2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={4}>
          <FormLabel>Stock</FormLabel>
          <NumberInput onChange={onChangePriceHandler} precision={2} step={0.2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            placeholder="thumbnail"
            h={"full"}
            p={2}
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={onChangeThumbnailHandler}
            name="thumbnail"
          />
        </FormControl>
      </CreateModal>
      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"Update Product"}
        onClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            onChange={onChangeHandler}
            name="title"
            value={productToEdit?.title}
          />
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.price}
            onChange={onChangePriceHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            placeholder="thumbnail"
            h={"full"}
            p={2}
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={onChangeThumbnailHandler}
            name="thumbnail"
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
