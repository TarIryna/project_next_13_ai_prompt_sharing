import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { fetchProduct } from "@helpers/useFetchProduct";
import { useProduct } from "@store/selectors";
import Sizes from "./Sizes";
import { loginUserAction } from "@store/actions/user";

const Product = () => {
  const { data: session } = useSession();
  if (session) loginUserAction(session);
  const params = useParams();
  const id = params?.id;
  const product = useProduct();
  const sizes = product?.sizes?.split(" ");

  useEffect(() => {
    fetchProduct({ id });
  }, [id]);

  return (
    <>
      {product && (
        <div style={{ padding: "10px 10px 20px 10px" }}>
          <h2>{product.name}</h2>
          <img src={product.image1}></img>
          <Sizes sizes={sizes} item={product} />
        </div>
      )}
    </>
  );
};

export default Product;
