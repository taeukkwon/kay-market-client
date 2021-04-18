import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { Button, message } from "antd";
import { API_URL } from "../config/constants.js";
import ProductCard from "../components/productCard";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRecommendations = () => {
    axios
      .get(`${API_URL}/products/${id}/recommendation`)
      .then((result) => {
        setProducts(result.data.products);
        console.log(result.data.products, "테스트");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(
    function () {
      getProduct();
      getRecommendations();
    },
    [id]
  );

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        getProduct();
        message.info("구매가 완료되었습니다");
      })
      .catch((error) => {
        message.error("에러 발생");
      });
  };

  const onClickCancelPurchase = () => {
    axios
      .post(`${API_URL}/cancel/${id}`)
      .then((result) => {
        getProduct();
        message.info("구매가 취소되었습니다");
      })
      .catch((error) => {
        message.error("에러 발생");
      });
  };

  console.log(product);

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>

      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt"></div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          재빨리 구매하기
        </Button>

        <Button
          id="cancel-button"
          size="large"
          type="primary"
          danger
          onClick={onClickCancelPurchase}
          disabled={product.soldout === 0}
        >
          구매를 취소할래요
        </Button>
        <div id="description-box">
          <div id="description">{product.description}</div>
        </div>
        <div>
          <h1>추천 상품</h1>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
