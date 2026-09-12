

const API = import.meta.env.VITE_API_URL;

const apis = {
   "prod":`${API}/api/v1/products`,
   "auth":`${API}/api/v1/users`,
   "order":`${API}/api/v1/orders`,
   "review": `${API}/api/v1/reviews`
}

export default apis;