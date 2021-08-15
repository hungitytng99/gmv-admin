import { Configs } from "app-configs";
import { ACTION_TYPE } from "app-configs";
import axios from "axios";

let token = "";

export const getOptions = (options) => {
    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTYyODk2NzQyNSwiZXhwIjoxNjI5MDUzODI1fQ.LZl4lEHupnwE7auHH_MHdz-H4jF4iW1okir325ToCvc',
        },
        ...options
    };
    
    // if (!token) {
    //     const source = sessionStorage.getItem("token");

    //     if (source) {
    //         token = JSON.parse(source).value;
    //     }
    // }

    if (token) {
        opts.headers.Authorization = "Bearer " + token;
    }

    return opts;
};

export const getTokenSource = ()  => {
    return axios.CancelToken.source();
};

export const cancelRequest = (source) => {
    source && source.cancel && source.cancel(ACTION_TYPE.UNMOUNT);
};

export const GET = (path, params, options = {}) => {
    const _params = params ? Object.keys(params).map(key => {
        let valueParam = params[key];
        let adjustParam = "";
        if (Array.isArray(valueParam)) {
            // TODO with "all" value;
            adjustParam = valueParam.map(paramDetail => `${key}=${encodeURIComponent(paramDetail != "all" ? paramDetail : "")}`).join("&")
        } else {
            // TODO with "all" value;
            valueParam = valueParam != "all" ? valueParam : "";
            adjustParam = `${key}=${encodeURIComponent(valueParam)}`;
        }
        return adjustParam;
    }).join("&") : "";

    const _url = (options.isFullPath ? path : Configs.BASE_API + path) + (_params === "" ? "" : "?" + _params);

    const _options = getOptions(options);

    return axios.get(_url, _options).then(response => response.data);
};

export const POST = (path, params, options = {}) => {
    const _url = options.isFullPath ? path : Configs.BASE_API + path;
    const _options = getOptions(options);
    
    return axios.post(_url, params, _options).then(response => response.data);
};

export const PUT = (path, params, options = {}) => {
    const _url = options.isFullPath ? path : Configs.BASE_API + path;
    const _options = getOptions(options);
    return axios.put(_url, params, _options).then(response => response.data);
};

export const DELETE = (path, params, options = {}) => {
    const _url = options.isFullPath ? path : Configs.BASE_API + path;
    const _options = getOptions(options);
    
    // delete with params;
    
    if (params) {
        _options.data = params;
    }

    return axios.delete(_url, _options).then(response => response.data);
};

// export const UPLOAD = (file, options, url, onProgress = () => { }) => {
//     const _url = options.isFullPath ? path : Configs.BASE_API + path;

//     const _form = new FormData();
//     _form.append("type", file.type);
//     _form.append("file", file);

//     const _options = getOptions(options);
//     _options.headers["Content-Type"] = "multipart/form-data";
//     _options.onUploadProgress = onProgress;

//     return axios.post(_url, _form, _options).then(response => response.data);
// };


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});