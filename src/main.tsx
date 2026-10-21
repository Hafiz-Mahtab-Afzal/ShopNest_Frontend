
import { createRoot } from 'react-dom/client'
import TypeScript from './TypeScript'
import './Css/Style.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import './config/refreshInterceptor' // har axios call par token expire hone par khud refresh karta hai


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <TypeScript />
    </Provider>

)
