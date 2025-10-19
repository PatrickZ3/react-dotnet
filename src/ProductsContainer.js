import FilterableProductTable from "./components/FilterableProductTable";

export async function getProducts(){
    try{
        const response = await fetch("http://localhost:5201/api/product")
        const data = await response.json();
        console.log("Retrieved data:", data)
        return data;
    }catch(error){
        console.log("Error fetching Products", error);
        return [];
    }

}

export default function ProductsContainer({ initialProducts }){
    return <FilterableProductTable products = {initialProducts}/>
}
