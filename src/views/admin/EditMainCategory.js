import React, { useEffect, useState } from "react";

// components

import { mainCategoryService } from "data-services/category";
import CardEditMainCategory from "components/Cards/CardEditMainCategory";

export default function EditMainCategory(props) {
    const mainCategoryId = props.match.params.id;
    const [mainCategory, setMainCategory] = useState({});
    useEffect(() => {
        const getDetailMainCategory = async () => {
            const detailSubCategory = await mainCategoryService.detailMainCategoryAsync(mainCategoryId);
            setMainCategory(detailSubCategory)
        }
        getDetailMainCategory();
    }, [])
    console.log(mainCategory);
    const submitEditMainCategory = async (values) => {
        const response = await mainCategoryService.updateMainCategory(mainCategoryId, values);
        console.log(response);
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Edit category</h6>
                    </div>
                </div>
                {/* ff */}
                <CardEditMainCategory
                    detailMainCategory={mainCategory}
                    submitEditMainCategory={submitEditMainCategory}
                />
            </div>
        </>
    );
}
