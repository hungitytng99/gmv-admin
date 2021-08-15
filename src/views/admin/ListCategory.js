import React, { useEffect } from "react";

// components
import { mainCategoryService } from "data-services/category";
import { useState } from "react/cjs/react.development";
import CardMainSubCategory from "components/Cards/CardMainSubCategory";

export default function ListCategory() {
    const [mainSubCategory, setMainSubCategory] = useState([])
    useEffect(() => {
        const getMainSubCategory = async () => {
            const mainSubCategory = await mainCategoryService.listCategoryWithSubCategory();
            setMainSubCategory(mainSubCategory.data);
        }
        getMainSubCategory();
    }, [])
    return (
        <>
            <div className="flex flex-wrap">
                <div className="relative w-full rounded-t px-4 mb-2 border-0 ">
                    <div className="px-8 py-3 rounded-t flex flex-wrap justify-between items-center bg-white">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className="font-semibold text-lg text-blueGray-700"
                            >
                                List category
                            </h3>
                        </div>
                        <button
                            onClick={() => window.location.href = '/admin/add-category'}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add category
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-12/12">
                    <div
                        className="relative flex flex-wrap"
                    >
                        {mainSubCategory.map((subMain) => {
                            return (
                                <CardMainSubCategory key={subMain.id} subMain={subMain} />
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    );
}