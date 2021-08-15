import React, { useEffect, useState } from "react";

// components

import { mainCategoryService } from "data-services/category";
import CardEditSubCategory from "components/Cards/CardEditSubCategory";

export default function EditSubCategory(props) {
    const [detailSubCategory, setSubCategory] = useState({});
    const subCategoryId = props.match.params.id;

    useEffect(() => {
        const getDetailSubCategory = async () => {
            const detailSubCategory = await mainCategoryService.detailSubCategoryAsync(subCategoryId);
            setSubCategory(detailSubCategory)
        }
        getDetailSubCategory();
    }, [])

    const submitEditSubCategory = async (values) => {
        const response = await mainCategoryService.updateSubCategory(subCategoryId, values);
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
                <CardEditSubCategory
                    detailSubCategory={detailSubCategory}
                    submitEditSubCategory={submitEditSubCategory}
                />
            </div>
        </>
    );
}
