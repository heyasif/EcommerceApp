import { useParams } from "react-router-dom";
import { getSingleProduct, UpdateProduct } from "../API/apiService";
import { useEffect, useState } from "react";
function SingleProduct() {
  const [product, setProduct] = useState({});
  let { id } = useParams();

  const getproduct = async () => {
    try {
      const response = await getSingleProduct(id);
      console.log(response);
      setProduct(response.Product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getproduct(); // Check for id and then call getproduct
  }, [id]); // Depend on id so it re-fetches when id changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newProduct = { ...product, [name]: value };
    console.log(newProduct);

    setProduct(newProduct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Uproduct(id, product);
  };

  const Uproduct = async (id, product) => {
    try {
      console.log("In Uproduct", id);
      const response = await UpdateProduct(id, product);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Check for product before trying to access its properties
  return (
    <>
      <pre> {JSON.stringify({ product }, null, 2)}</pre>
      {product && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "400px" }}
        >
          <input
            type="text"
            name="name" // Add name attribute to match the key in your product object
            value={product?.name || ""}
            placeholder="Name"
            onChange={handleInputChange} // Simplify the onChange handler
          />
          <input
            type="text"
            name="description" // Add name attribute to match the key in your product object
            value={product?.description || ""}
            placeholder="Description"
            onChange={handleInputChange} // Simplify the onChange handler
          />
          <input
            type="number"
            name="price" // Add name attribute to match the key in your product object
            value={product?.price || ""}
            placeholder="Price"
            onChange={handleInputChange} // Simplify the onChange handler
          />
          <input type="submit" value="Update Product" />
        </form>
      )}
    </>
  );
}
export default SingleProduct;
