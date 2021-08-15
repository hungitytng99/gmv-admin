import { GET, PUT, POST, DELETE } from "src/data-source/fetch.js";
import { REQUEST_STATE } from "src/app-configs/index.js";
// Data Flow: Step 1

//  SEND CUSTOMER INQUIRY
//  {
//     "customer_name": "string",
//     "email": "string",
//     "phone": "string",
//     "message": "string",
//     "product_id": 0,
//     "quantity": 0
//   }

export const apiSendCustomerInquiry = async (params) => {
    try {
        const response = await POST("/inquiry", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            message: "Thank for your information. We will contact you as soon as possible!"
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            message: "An error occur when send your contact information! Please try again latter!"
        };
    }
};
