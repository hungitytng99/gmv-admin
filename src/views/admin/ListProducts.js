import React, { useEffect, useState } from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import CardListProducts from "components/Cards/CardListProducts";
import { productService } from "data-services/product/index.js";
import { mainCategoryService } from "data-services/category";

export default function Tables(props) {
    const [listProducts, setListProducts] = useState({});
    useEffect(() => {
        const getListProduct = async () => {
            const listResult = await productService.listProductAsync();
            console.log("RRR", listResult);
            for (let i = 0; i < listResult.data.length; i++) {
                const subCategory = await mainCategoryService.detailSubCategoryAsync(listResult.data[i].category_id);
                listResult.data[i].category_name = subCategory.data.name;
                listResult.data[i].main_category_name = subCategory.data.main_category_name;

            }
            setListProducts(listResult);
        }
        getListProduct();
    }, [])
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardListProducts listProducts={listProducts.data} />
                </div>
            </div>
        </>
    );
}
