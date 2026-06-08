// // import axios from "axios";

// // const API = axios.create({

// //     baseURL: "http://localhost:8080"
// // });

// // /* ADD JWT TOKEN */

// // API.interceptors.request.use(

// //     (config) => {

// //         const token =

// //                 localStorage.getItem(
// //                         "token"
// //                 );

// //         if (

// //                 token

// //                 &&

// //                 !config.url.includes(
// //                         "/login"
// //                 )

// //                 &&

// //                 !config.url.includes(
// //                         "/register"
// //                 )

// //         ) {

// //             config.headers.Authorization =

// //                     `Bearer ${token}`;
// //         }

// //         return config;
// //     }
// // );

// // export default API;
import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:8080"
});

/* ADD JWT TOKEN */

API.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);

export default API;

