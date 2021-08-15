import React, { useEffect } from "react";

// components

import CardEditProduct from "components/Cards/CardEditProduct";
import { useState } from "react/cjs/react.development";
import { productService } from "data-services/product";

export default function EditProduct(props) {
  const productId = props.match.params.id;
  const [detailProductState, setDetailProductState] = useState({});

  useEffect(() => {
    const getDetailProduct = async () => {
      const detailProduct = await productService.detailProductByIdAsync(productId);
      setDetailProductState(detailProduct);
    }
    getDetailProduct();
  }, [])

  const submitEditMainCategory = async (params) => {
    const response = await productService.updateProduct(productId, params)
    console.log(response);
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardEditProduct
            detailProduct={detailProductState}
            productId={productId} 
            submitEditMainCategory={submitEditMainCategory}
            />
        </div>
      </div>
    </>
  );
}