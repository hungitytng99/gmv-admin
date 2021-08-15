import React from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import CategoryDropdown from "components/Dropdowns/CategoryDropdown";
import { useState } from "react/cjs/react.development";
import { mainCategoryService } from "data-services/category";

export default function CardMainSubCategory(props) {
    const { subMain } = props;
    const [subMainState, setMainState] = useState(subMain);
    const handleDeleteSubCategory = async (id) => {
        const result = await mainCategoryService.deleteSubCategory(id);
        if (result.data.status == 200) {
            let subMainTemp = { ...subMainState };
            subMainTemp.sub_category = subMainTemp.sub_category.filter(item => {
                if (item.id != id) {
                    return item;

                }
            })
            setMainState(subMainTemp);
        }
    }
    return (
        <>
            <div
                className="w-full lg:w-6/12 mb-6 px-4 "
            >
                <div className="shadow-lg rounded bg-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className="font-semibold text-lg text-blueGray-700"
                                >
                                    {subMainState.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                {subMainState.sub_category.length != 0 &&
                                    <tr>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            ID
                                        </th>

                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Name
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                        </th>
                                    </tr>
                                }

                            </thead>
                            <tbody>
                                {subMainState.sub_category.length == 0 &&
                                    <tr>
                                        <td
                                            className="px-6 text-center align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            No subcategory
                                        </td>

                                    </tr>
                                }
                                {subMainState.sub_category.map((item) => {
                                    return (
                                        <tr key={item.id} >
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {item.id}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {item.name}
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                <CategoryDropdown
                                                    handleDeleteSubCategory={handleDeleteSubCategory}
                                                    subCategoryId={item.id}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}