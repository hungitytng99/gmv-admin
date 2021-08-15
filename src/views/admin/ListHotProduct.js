import React, { useEffect, useState } from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import CardListProducts from "components/Cards/CardListProducts";
import { productService } from "data-services/product/index.js";
import { mainCategoryService } from "data-services/category";
import CardListHotProducts from "components/Cards/CardListHotProducts";

export default function Tables(props) {
    const [listProducts, setListProducts] = useState({});
    const [isReload , setIsReload] = useState(false);
    useEffect(() => {
        const getListProduct = async () => {
            const listResult = await productService.listHotProductAsync();
            console.log(listResult);
            for (let i = 0; i < listResult.data.length; i++) {
                const subCategory = await mainCategoryService.detailSubCategoryAsync(listResult.data[i].category_id);
                listResult.data[i].category_name = subCategory.data.name;
                listResult.data[i].main_category_name = subCategory.data.main_category_name;

            }
            setListProducts(listResult);
        }
        getListProduct();
    }, [isReload])
    const handleUnSetHotProduct = async (id) => {
        const response = await productService.unSetHotProduct(id);
        setIsReload(true);
        console.log(response);
    }

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-t bg-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className="font-semibold text-lg text-blueGray-700"
                                    >
                                        List hot products
                                    </h3>
                                </div>
                                <a
                                    href='/admin/list-hot-products'
                                    className="bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                >
                                    Hot product
                                </a>
                                <a
                                    href='/admin/add-products'
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                >
                                    Add product
                                </a>
                                <a
                                    href='/admin/list-products'
                                    className="bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                >
                                    Back
                                </a>

                            </div>
                        </div>
                    </div>
                    <CardListHotProducts
                        handleUnSetHotProduct={handleUnSetHotProduct}
                        listProducts={listProducts.data} 
                    />
                </div>
            </div>
        </>
    );
}
