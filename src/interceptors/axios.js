// import axios from 'axios'

// axios.interceptors.response.use(resp=>resp,async error =>{
//     if(error.response.status == 401){
//         const token=localStorage.getItem('token')
//         const response=await axios.post("https://hiring-test-task.vercel.app/api/refresh-token" ,{
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//         console.log(response.data.newToken);
//         if(response.status==200){
//             axios.defaults.headers.common['Authorization']=`Bearer ${response.data.newToken}`;

//             return axios(error.config);
//         }
//     }
//     return error;
// })