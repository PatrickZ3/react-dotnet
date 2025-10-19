import ProductRow from "./ProductRow"
import ProductCategoryRow from "./ProductCategoryRow"

export default function ProductTable({ products, filterText, inStockOnly }) {
    // set empty array for the divs
    // set null to last category to keep track the categories
    // go through products
    // <X> if function if its first category (products.category !== lastCategory) then add just the category to the empty array
    // then below that we just add normally the proucts to row
    // set lastcategory to products.caterogyr
    // repeat <X> function because the next products.category will get triggered the moment it is a different products.category
  
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
  
      if (inStockOnly && !product.stocked) {
        return;
      }
  
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
  
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
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