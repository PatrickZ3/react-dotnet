import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function FilterableProductTable({ products }) {
  const [productList, setProductList] = useState(products)
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stocked, setStocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: name.trim(),
      category: category.trim(),
      price: price.trim(),
      stocked,
    };

    console.log('local object', newProduct);

    try {
      const response = await fetch("http://localhost:5201/api/product", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if(!response.ok){
        throw new Error("Failed to save product");
      }

      const savedProduct = await response.json();
      setProductList((prev) => [...prev, savedProduct]);  
      console.log("Database OBJECT", savedProduct);

      setName("");
      setCategory("");
      setPrice("");
      setStocked(false);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try{
      const response = await fetch(`http://localhost:5201/api/product/${id}`,{
        method: "DELETE",
      })

      if(!response.ok){
        throw new Error("Failed to delete product");
      }

      setProductList((prev) => prev.filter((p) => p.id !== id));
    }catch(error){
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="main">
      <div className="left-main">
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={setFilterText}
          onInStockOnlyChange={setInStockOnly}
        />
        <ProductTable
          products={productList}
          filterText={filterText}
          inStockOnly={inStockOnly}
          onDelete={handleDelete}
        />
      </div>
      <div className="right-main">
        <div>Add New Product</div>
        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            <span>Name: </span>
            <input
              type="text"
              name="name"
              className="textBox"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <span>Category: </span>
            <input
              type="text"
              name="category"
              className="textBox"
              placeholder="e.g. Fruits or Vegetables"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <label>
            <span>Price: </span>
            <input
              type="text"
              name="price"
              className="textBox"
              placeholder="$1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="stocked"
              checked={stocked}
              onChange={(e) => setStocked(e.target.checked)}
            />
            In Stock
          </label>

          <button type="submit" className="saveButton">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
