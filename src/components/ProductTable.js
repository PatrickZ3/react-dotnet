import ProductRow from "./ProductRow"
import ProductCategoryRow from "./ProductCategoryRow"

export default function ProductTable({ products, filterText, inStockOnly, onDelete }) {

    const filteredProducts = products.filter((product) => {
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 ){
        return false;
      }
      if (inStockOnly && !product.stocked){
        return false;
      }
      return true;
    });

    const groupedProducts = {};
    filteredProducts.forEach((product) => {
      if (!groupedProducts[product.category]){
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });
  
    const rows = [];
    
    Object.keys(groupedProducts).forEach((category) => {
      rows.push(<ProductCategoryRow category={category} key={category}/>);
      groupedProducts[category].forEach((product) => {
        rows.push(<ProductRow product={product} key={product.name} onDelete={onDelete}/>)
      });
    });
  
    return (
      <table className="productTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }