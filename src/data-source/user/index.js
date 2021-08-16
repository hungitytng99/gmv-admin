import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiSignIn = async (params) => {
    try {
        const response = await POST("/user/login", params, { isFullPath: false });
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
