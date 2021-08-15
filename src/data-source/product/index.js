// Data Flow: Step 1

import { REQUEST_STATE } from "app-configs";
import { DELETE } from "data-source/fetch";
import { PUT } from "data-source/fetch";
import { POST } from "data-source/fetch";
import { GET } from "data-source/fetch";

export const apiDetailProductBySlug = async (productSlug) => {
    try {
        const response = await GET("/product/get-by-slug/" + productSlug);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDetailProductById = async (productId) => {
    try {
        const response = await GET("/product/" + productId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProduct = async (params) => {
    try {
        const response = await GET("/product", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByCategoryId = async (categoryId, params) => {
    try {
        const response = await GET("/product/get-by-main-category-id/" + categoryId, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByMainCategoryName = async (categoryName, params) => {
    try {
        const response = await GET("/product/get-by-main-category-name/" + categoryName, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductBySubCategoryName = async (params) => {
    try {
        const response = await GET("/product/get-by-category-name/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListMaterial = async (params) => {
    try {
        const response = await GET("/product/get-all-material/list/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByCategoryAndMaterial = async (params) => {
    try {
        const response = await GET("/product/get-by-category-and-material/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiCreateProducts = async (params) => {
    try {
        const response = await POST("/product/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiUpdateProducts = async (productId, params) => {
    try {
        const response = await PUT("/product/" + productId, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDeleteProducts = async (productId) => {
    try {
        const response = await DELETE("/product/" + productId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListHotProduct = async (params) => {
    try {
        const response = await GET("/hot-product", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiSetHotProduct = async (productId) => {
    try {
        const response = await GET("/hot-product/set/" + productId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiUnSetHotProduct = async (productId) => {
    try {
        const response = await GET("/hot-product/unset/" + productId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};
