import React, { useEffect, useState } from "react";

// components

import { mainCategoryService } from "data-services/category";
import CardAddSubCategory from "components/Cards/CardAddSubCategory";
import CardAddMainCategory from "components/Cards/CardAddMainCategory";

export default function AddCategory(props) {
    const [listProducts, setListProducts] = useState({});

    const addMainCategory = async (values) => {
        const result = await mainCategoryService.createMainCategory(values);
        console.log(result);
    }

    const addSubCategory = async (values) => {
        const result = await mainCategoryService.createSubCategory(values);
        console.log(result);
    }

    useEffect(() => {
    }, [])
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Add category</h6>
                    </div>
                </div>
                {/* ff */}
                <div className="mb-6">
                    <CardAddMainCategory addMainCategory={addMainCategory} />
                </div>
                <CardAddSubCategory addSubCategory={addSubCategory} />
            </div>
        </>
    );
}
