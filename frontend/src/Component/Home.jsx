import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ".././App.css";
import axios from "axios";
import { MainUrl } from "../constants";
import ProductCard from "./ProductCard";

function Home() {
  const [isloading, setisloading] = useState(true);
  const [products, setproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const FetchProduct = async (search, filter, page = currentPage) => {
    setisloading(true);
    try {
      const url = `${MainUrl}?search=${search}&sort=price&order=${filter}&page=${page}&limit=20`;
      const response = await axios.get(url);
      setproducts(response.data.Products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page); // Update current page state
      setisloading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setisloading(false);
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  const debouncedFetchProduct = useCallback(debounce(FetchProduct, 500), []);

  useEffect(() => {
    debouncedFetchProduct(search, filter, currentPage);
  }, [search, filter, currentPage, debouncedFetchProduct]);

  const DeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${MainUrl}/${id}`);
      // console.log(response);
      FetchProduct(search, filter, currentPage);
      alert("Product Deleted Sucessfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // const updateProduct = async (productId, updatedProduct) => {
  //   try {
  //     // Assuming your backend expects a PUT request to update the product
  //     const url = `http://localhost:3000/products/${productId}`;
  //     await axios.put(url, updatedProduct);
  //     // Refresh the product list or update the state directly
  //     FetchProduct(search, filter); // if FetchProduct is capable of refreshing the products list
  //   } catch (error) {
  //     console.error("Failed to update product:", error);
  //   }
  // };

  return (
    <>
      <div className="op">
        <h1> ALL Products</h1>
        <Link to="/products/add">
          <button>Add Product</button>
        </Link>

        <form>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <h1> Filter By Price</h1>
        <form>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option> Select </option>
            <option value="asc"> Low to High </option>
            <option value="desc"> High to Low </option>
          </select>
        </form>
      </div>

      <div className="main">
        {isloading ? (
          <img
            className="imgload"
            src="https://cdn.pixabay.com/animation/2023/04/23/14/42/14-42-50-293_512.gif"
          />
        ) : (
          ""
        )}
        {products?.map((product, index) => {
          // console.log(product);
          return (
            <div key={index}>
              <ProductCard product={product} DeleteProduct={DeleteProduct} />
              {/* <button onClick={() => setSelectedProduct(product)}>Edit</button>
              {selectedProduct?.id === product.id && (
                <UpdateForm
                  product={selectedProduct}
                  onUpdate={updateProduct}
                />
              )} */}
            </div>
          );
        })}

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
