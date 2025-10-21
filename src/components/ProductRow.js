export default function ProductRow({ product, onDelete }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
      <td className="deleteCell">
        <button className="deleteButton" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
