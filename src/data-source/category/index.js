// Data Flow: Step 1

import { REQUEST_STATE } from "app-configs";
import { PUT } from "data-source/fetch";
import { DELETE } from "data-source/fetch";
import { POST } from "data-source/fetch";
import { GET } from "data-source/fetch";

export const apiListSubCategory = async (params) => {
    try {
        const response = await GET("/category", params, { isFullPath: false });
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

export const apiListMainCategory = async (params) => {
    try {
        const response = await GET("/main-category", params, { isFullPath: false });
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

export const apiDetailMainCategory = async (categoryId) => {
    try {
        const response = await GET("/main-category/" + categoryId);
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

export const apiDetailSubCategory = async (categoryId) => {
    try {
        const response = await GET("/category/" + categoryId);
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

export const apiCreateSubCategory = async (requestParams) => {
    try {
        const response = await POST("/category/", requestParams);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiUpdateSubCategory = async (subCategoryId, requestParams) => {
    try {
        const response = await PUT("/category/" + subCategoryId, requestParams);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDeleteSubCategory = async (subCategoryId) => {
    try {
        const response = await DELETE("/category/" + subCategoryId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};



export const apiCreateMainCategory = async (requestParams) => {
    try {
        const response = await POST("/main-category/", requestParams);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};


export const apiUpdateMainCategory = async (mainCategoryId, requestParams) => {
    try {
        const response = await PUT("/main-category/" + mainCategoryId, requestParams);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};


export const apiDeleteMainCategory = async (mainCategoryId) => {
    try {
        const response = await DELETE("/main-category/" + mainCategoryId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };
    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};