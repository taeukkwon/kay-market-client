import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  return <h1>제품 상세 페이지 {id} 상품</h1>;
}

export default ProductPage;
