import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from '../Components/CMS/Slice/index'

const store = configureStore({
    reducer: {
        products: productsSlice
    }
})

export default store