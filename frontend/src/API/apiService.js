
import axios from "axios";
import { MainUrl } from "../constants";



const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${MainUrl}/${productId}`);
    return response.data; // This returns the response data to the caller
    
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error; // Rethrowing the error allows the caller to handle it
  }
};


const getSingleProduct = async (productId) => {
  try {
    const response = await axios.get(`${MainUrl}/${productId}`);
    return response.data; // This returns the response data to the caller
    
  } catch (error) {
    console.error("Failed to get product:", error);
    throw error; // Rethrowing the error allows the caller to handle it
  }
};



const UpdateProduct = async (productId,product) => {
  console.log(product)
  try {
    const response = await axios({
      method: 'patch',
      url: `${MainUrl}${productId}`,
      data: product
    })
    

    console.log(response)
    
  } catch (error) {
    console.error("Failed to get product:", error);
    throw error; // Rethrowing the error allows the caller to handle it
  }
};


const CreateProduct = async (product) => {
  console.log(product)
  try {
    const response = await axios({
      method: 'post',
      url: `${MainUrl}`,
      data: product
    })
    

    console.log(response)
    
  } catch (error) {
    console.error("Failed to post product:", error);
    throw error; // Rethrowing the error allows the caller to handle it
  }
};


export { deleteProduct , getSingleProduct ,UpdateProduct,CreateProduct};
