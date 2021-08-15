
// Data Flow: Step 2

import { apiSendCustomerInquiry } from "src/data-source/inquiry";

// transform data to fit with UI;
export const inquiryService = {
    sendCustomerInquiry: function (params) {
        return apiSendCustomerInquiry(params).then(response => {
            return response;
        });
    },
   
}
