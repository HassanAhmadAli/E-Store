import { useParams } from "react-router";

export const ProductDetailsPage = function () {
  const { id } = useParams();

  return <h1>product details page with id={id} , not implemented</h1>;
};
