import { useState } from "react";
import { CreateProduct } from "../API/apiService";

function AddProduct() {
  const [product, setProduct] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newProduct = { ...product, [name]: value };
    console.log(newProduct);

    setProduct(newProduct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    CreateP(product);
  };

  const CreateP = async (id, product) => {
    try {
      await CreateProduct(id, product);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <pre> {JSON.stringify({ product }, null, 2)}</pre>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <input
          type="text"
          name="name" // Add name attribute to match the key in your product object
          value={product.name}
          placeholder="Name"
          onChange={handleInputChange} // Simplify the onChange handler
        />
        <input
          type="text"
          name="description" // Add name attribute to match the key in your product object
          value={product.description}
          placeholder="Description"
          onChange={handleInputChange} // Simplify the onChange handler
        />
        <input
          type="number"
          name="price" // Add name attribute to match the key in your product object
          value={product.price}
          placeholder="Price"
          onChange={handleInputChange} // Simplify the onChange handler
        />
        <input type="submit" value="Add Product" />
      </form>
    </>
  );
}

export default AddProduct;
