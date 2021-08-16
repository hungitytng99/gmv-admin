
// Data Flow: Step 2

import { apiGetCustomerInquiry } from "data-source/inquiry";
import { apiSendCustomerInquiry } from "data-source/inquiry";

// transform data to fit with UI;
export const inquiryService = {
    sendCustomerInquiry: function (params) {
        return apiSendCustomerInquiry(params).then(response => {
            return response;
        });
    },

    getCustomerInquiry: function(params) {
        return apiGetCustomerInquiry(params).then(response => {
            return response;
        })
    }
   
}
