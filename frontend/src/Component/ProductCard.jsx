import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, DeleteProduct }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="singleProduct">
        <p>Name : {product.name}</p>
        <p style={{ height: "150px", overflow: "hidden", padding: "10px" }}>
          Description : {product.description}
        </p>
        <p>
          <img
            src={product.image}
            style={{ width: "150px", height: "150px" }}
          />
        </p>
        <p>Price : {product.price}</p>
        <button onClick={() => DeleteProduct(product._id)}> Delete</button>
        <button onClick={() => navigate(`/products/${product._id}`)}>
          {" "}
          Update
        </button>
      </div>
      <div></div>
    </div>
  );
}
