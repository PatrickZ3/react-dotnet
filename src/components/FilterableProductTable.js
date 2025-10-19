import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
  
    return (
      <div className="main">
        <div
          className={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly}
          />
          <ProductTable
            products={products}
            filterText={filterText}
            inStockOnly={inStockOnly}
          />
        </div>
      </div>
    );
  }