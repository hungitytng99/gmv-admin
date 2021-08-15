// import { apiGetListProductByCategoryId, apiListProduct } from "src/data-source/product";

import { apiListMainCategory } from "data-source/category";
import { apiCreateMainCategory } from "data-source/category";
import { apiUpdateMainCategory } from "data-source/category";
import { apiDeleteSubCategory } from "data-source/category";
import { apiUpdateSubCategory } from "data-source/category";
import { apiCreateSubCategory } from "data-source/category";
import { apiListSubCategory } from "data-source/category";
import { apiDetailMainCategory } from "data-source/category";
import { apiDetailSubCategory } from "data-source/category";

// Data Flow: Step 2
// transform data to fit with UI;
export const mainCategoryService = {

    detailSubCategoryAsync: function (subCategoryId) {
        return apiDetailSubCategory(subCategoryId).then(response => {
            response.data = {
                id: response.data?.id,
                name: response.data?.name,
                main_category_name: response.data?.main_category_name,
                href: "/category/" + String(response.data?.main_category_id) + String(response.data?.id),
                main_category_id: response.data?.main_category_id,
            }
            return response;
        });
    },

    detailMainCategoryByIdAsync: function (categoryId) {
        return apiDetailMainCategory(categoryId).then(response => {
            response.data = {
                id: response.data?.id,
                name: response.data?.name,
                image: response.data?.url_image,
                description: response.data?.description,
                href: "/category/" + response.data?.id,
                sub_category: response.data?.sub_category
            }
            return response;
        });
    },

    // detail with filter, use for component
    detailMainCategoryAsync: function (categoryId) {
        return apiDetailMainCategory(categoryId).then(response => {
            response.data = {
                id: response.data?.id,
                name: response.data?.name,
                image: response.data?.url_image,
                description: response.data?.description,
                href: "/category/" + response.data?.id,
                sub_category: response.data?.sub_category
            }
            return response;
        });
    },

    listMainCategoryAsync: function (requestParams) {
        return apiListMainCategory(requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    name: item?.name,
                    image: item?.url_image,
                    href: "/category/" + item?.id
                }
            });
            return response;
        });
    },
    listSubCategoryAsync: function (requestParams) {
        return apiListSubCategory(requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    main_category_id: item.id,
                }
            })
            return response;
        })
    },
    listCategoryWithSubCategory: function () {
        return this.listMainCategoryAsync().then(async (response) => {
            let listCategoryWithSub = []
            for (let i = 0; i < response.data.length; i++) {
                let itemProductByCategory = {
                    id: response.data[i].id,
                    name: response.data[i].name,
                    sub_category: [],
                }
                const listSubCategory = await this.detailMainCategoryAsync(response.data[i].id)
                itemProductByCategory.sub_category = listSubCategory.data.sub_category;

                listCategoryWithSub.push(itemProductByCategory);
            }
            response.data = listCategoryWithSub;
            return response;
        })
    },

    createMainCategory: function (requestParams) {
        return apiCreateMainCategory(requestParams).then(response => {
            return response;
        })
    },

    updateMainCategory: function (id, requestParams) {
        return apiUpdateMainCategory(id, requestParams).then(response => {
            return response;
        })
    },

    delteteMainCategory: function (id) {
        return apiDetailMainCategory(id).then(response => {
            return response;
        })
    },

    createSubCategory: function (requestParams) {
        return apiCreateSubCategory(requestParams).then(response => {
            return response;
        })
    },
    updateSubCategory: function (id, requestParams) {
        return apiUpdateSubCategory(id, requestParams).then(response => {
            return response;
        })
    },
    deleteSubCategory: function (id) {
        return apiDeleteSubCategory(id).then(response => {
            return response;
        })
    },
}

export const filterSubCategory = (listSubCategory, idMainCategory) => {
    listSubCategory = listSubCategory.map((subCategory) => {
        return {
            id: subCategory.id,
            name: subCategory.name,
            href: "category/" + idMainCategory + "/" + subCategory.id,
            isSelected: false,
        }
    })
    listSubCategory = {
        currentSelected: "all",
        pageNumber: 2,
        hasMoreProducts: true,
        data: [
            {
                id: "all",
                name: "All",
                isSelected: true,
            },
            ...listSubCategory
        ]
    }
    return listSubCategory;
}
