

// Data Flow: Step 2

import { mainCategoryService } from "data-services/category";
import { apiListProduct } from "data-source/product";
import { apiListMaterial } from "data-source/product";
import { apiListProductByMainCategoryName } from "data-source/product";
import { apiCreateProducts } from "data-source/product";
import { apiDeleteProducts } from "data-source/product";
import { apiUnSetHotProduct } from "data-source/product";
import { apiSetHotProduct } from "data-source/product";
import { apiUpdateProducts } from "data-source/product";
import { apiListProductByCategoryAndMaterial } from "data-source/product";
import { apiListProductBySubCategoryName } from "data-source/product";
import { apiListProductByCategoryId } from "data-source/product";
import { apiListHotProduct } from "data-source/product";
import { apiDetailProductById } from "data-source/product";
import { apiDetailProductBySlug } from "data-source/product";

// transform data to fit with UI;
export const productService = {
    detailProductBySlugAsync: function (productSlug) {
        return apiDetailProductBySlug(productSlug).then(async (response) => {
            const mainCategory = await mainCategoryService.detailMainCategoryAsync(response.data.main_category_id);
            const subCategory = await mainCategoryService.detailSubCategoryAsync(response.data.category_id);
            const listImages = [response.data?.main_image_url, ...response.data?.list_product_images];
            response.data = {
                id: response.data?.id,
                title: response.data?.title,
                model: response.data?.model_number,
                description: response.data?.description,
                image: filterImageField(listImages, response.data?.title),
                price: response.data?.price,
                material: response.data?.material,
                main_category: mainCategory?.data.name,
                sub_category: subCategory?.data.name,
                slug: response.data?.slug
            }
            return response;
        });
    },

    detailProductByIdAsync: function (productId) {
        return apiDetailProductById(productId).then(async (response) => {
            const mainCategory = await mainCategoryService.detailMainCategoryAsync(response.data.main_category_id);
            const subCategory = await mainCategoryService.detailSubCategoryAsync(response.data.category_id);
            const listImages = [response.data?.main_image_url, ...response.data?.list_product_images];
            response.data = {
                id: response.data?.id,
                title: response.data?.title,
                model: response.data?.model_number,
                description: response.data?.description,
                image: listImages,
                price: response.data?.price,
                material: response.data?.material,
                main_category: mainCategory?.data.name,
                sub_category: subCategory?.data.name,
                sub_category_id: response?.data.category_id,
                slug: response.data?.slug
            }
            return response;
        });
    },

    listProductAsync: function (requestParams) {
        return apiListProduct(requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    title: item?.title,
                    image: [item?.main_image_url, ...item?.list_product_images],
                    price: item?.price,
                    slug: "product/" + item?.slug,
                    category_id: item?.category_id,
                    model: item?.model_number,
                    material: item?.material
                }
            });
            return response;
        });
    },

    listHotProductAsync: function (requestParams) {
        return apiListHotProduct(requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    title: item?.title,
                    image: [item?.main_image_url],
                    price: item?.price,
                    slug: "product/" + item?.slug,
                    category_id: item?.category_id,
                    model: item?.model_number,
                    material: item?.material
                }
            });
            return response;
            // return filterSplitHotProduct(response);
        });
    },

    listAllMaterial: function (requestParams) {
        return apiListMaterial(requestParams).then(response => {
            response.data = response.data.map((material) => {
                return {
                    value: material.material,
                    label: material.material,
                }
            })
            return response.data;
        });
    },

    listProductByCategoryId: function (categoryId, requestParams) {
        return apiListProductByCategoryId(categoryId, requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    title: item?.title,
                    main_image: item?.main_image_url,
                    price: item?.price,
                    slug: "product/" + item?.slug
                }
            });
            return response;
        })
    },
    listProductByMainCategoryName: function (categoryName, requestParams) {
        return apiListProductByMainCategoryName(categoryName, requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    title: item?.title,
                    main_image: item?.main_image_url,
                    price: item?.price,
                    slug: "product/" + item?.slug
                }
            });
            return response;
        })
    },
    listProductBySubCategoryName: function (requestParams) {
        return apiListProductBySubCategoryName(requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    title: item?.title,
                    main_image: item?.main_image_url,
                    price: item?.price,
                    slug: "product/" + item?.slug
                }
            });
            return response;
        })
    },
    listAllCategoryWithProduct: function (productParams) {
        return mainCategoryService.listMainCategoryAsync().then(async (response) => {
            let listProductByMainCategory = []
            for (let i = 0; i < response.data.length; i++) {

                let itemProductByCategory = {
                    id: response.data[i].id,
                    name: response.data[i].name,
                    href: "/category/" + response.data[i].id,
                    sub_category: [],
                    listProduct: []
                }

                const listProduct = await productService.listProductByCategoryId(response.data[i].id, productParams);
                const listSubCategory = await mainCategoryService.detailMainCategoryAsync(response.data[i].id)

                itemProductByCategory.sub_category = listSubCategory.data.sub_category;
                itemProductByCategory.listProduct = listProduct.data;

                listProductByMainCategory.push(itemProductByCategory);
            }
            response.data = listProductByMainCategory;
            return response;
        })
    },
    listProductWithCategoryMaterial: function (requestParams) {
        return apiListProductByCategoryAndMaterial(requestParams).then(response => {
            response.data = response.data.map(item => {
                return {
                    id: item?.id,
                    title: item?.title,
                    main_image: item?.main_image_url,
                    price: item?.price,
                    slug: "product/" + item?.slug
                }
            });
            return response;
        });
    },

    createProduct: function (requestParams) {
        return apiCreateProducts(requestParams).then(response => {
            return response;
        })
    },

    updateProduct: function (id, requestParams) {
        return apiUpdateProducts(id, requestParams).then(response => {
            return response;
        })
    },

    deleteProduct: function (id) {
        return apiDeleteProducts(id).then(response => {
            return response;
        })
    },

    setHotProduct: function (id) {
        return apiSetHotProduct(id).then(response => {
            return response;
        })
    },

    unSetHotProduct: function (id) {
        return apiUnSetHotProduct(id).then(response => {
            return response;
        })
    },


}

export const filterSplitHotProduct = (listHotProduct) => {
    // format hot product ve dang
    // [
    //  [ {id: xxx, data: 4 phan tu product }],
    //  [ {id: xxx, data: 4 phan tu product }],
    //  ...
    // ]

    let result = [];
    let i, j, temporary, chunk = 4;
    for (i = 0, j = listHotProduct.length; i < j; i += chunk) {
        let templateResult = {
            key: i,
            data: [],
        }
        temporary = listHotProduct.slice(i, i + chunk);
        templateResult.data = temporary;
        result.push(templateResult)
    }
    return result;
}

export const filterImageField = (listImage, alt) => {
    // [ imgSrc1 , imgSrc2, ... ]
    // => 
    // [ { src: imgSrc1, alt: imgAlt1} , { src: imgSrc2, alt: imgAlt2}, ... ]

    return listImage.map((image) => {
        return {
            src: image,
            alt: alt + "_" + String(Math.floor(Math.random() * 1000)),
        }
    })
}