import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { Button, message } from "antd";
import { API_URL } from "../config/constants.js";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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
  useEffect(function () {
    message.info("구매가 완료되었습니다");
    getProduct();
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        getProduct();
      })
      .catch((error) => {
        message.error("에러가 발생했습니다");
      });

    console.log(product);

    return (
      <div>
        <div id="image-box">
          <img src={"/" + product.imageUrl} />
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
            onclick={onClickPurchase}
            disabled={product.soldout === 1}
          >
            재빨리 구매하기
          </Button>
          <div id="description">{product.description}</div>
        </div>
      </div>
    );
  };
}

export default ProductPage;
