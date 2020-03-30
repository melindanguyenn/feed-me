// import axios from "axios";
// import { connect } from "react-redux";


// // LocalstorageService


// // Add a request interceptor
// axios.interceptors.request.use(
//     config => {
     
//         console.log('config',config);
        
      
//         if (config.url !== 'api/User/Login') {
//             console.log('adding auth token');
//             const token = this.props.userContext.token??"";
//            config.headers['Authorization'] = 'Bearer ' + token;
//        }
//        // config.headers['Content-Type'] = 'application/json';
//        return config;
//    },
//    error => {
//        Promise.reject(error)
//    });



// //Add a response interceptor

// axios.interceptors.response.use((response) => {
//     console.log('response', response);
    
//    return response
// }, function (error) {
//    const originalRequest = error.config;
// console.log('error',error);

//    if (error.response.status === 401 && originalRequest.url === 
// 'https://5001/api/user/token') {
//        this.props.history.push('/account');
//        return Promise.reject(error);
//    }

//    if (error.response.status === 401 && !originalRequest._retry) {

//        originalRequest._retry = true;
//        const refreshToken = this.props.userContext.refreshToken;
//        const user = this.props.userContext.id;
//        return axios.post(`/user/token/${user}`,
//            {
//                "refresh_token": refreshToken
//            })
//            .then(res => {
//                if (res.status === 201) {
//                 this.props.dispatch({type: "LOGIN", payload: res.data})
//                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.userContext.token;
//                    return axios(originalRequest);
//                }
//            })
//    }
//    return Promise.reject(error);
// });

// const getStore = reduxState => ({
//     userContext: reduxState.userContext,
//   }); //accessing stores in index.js to get back search results, creating shortcut for accessing store
  
//   export default connect(getStore)