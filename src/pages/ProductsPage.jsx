import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ProductPageSkeleton from "../components/ProductPageSkeleton";

const ProductsPage = () => {
  //   const [productList, setProductList] = useState(null);

  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery("products", () =>
    getProductList()
  );

  //   useEffect(() => {
  //     (() => {
  //       axios
  //         .get(
  //           `${
  //             import.meta.env.VITE_SERVER_URL
  //           }/api/products?populate=thumbnail,category`
  //         )
  //         .then((res) => {
  //           setProductList(res?.data.data);
  //         })
  //         .catch((err) => console.log(err));
  //     })();
  //   }, []);

  if (isLoading)
    return (
      <div>
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductPageSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div>
      <Grid
        margin={30}
        templateColumns={"repeat(auto-fill,minmax(300px, 1fr))"}
        gap={6}
      >
        {data?.data?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    </div>
  );
};

export default ProductsPage;
