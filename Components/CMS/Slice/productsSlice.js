import { createSlice } from '@reduxjs/toolkit'
import { initialStateCMSProduct } from '../../../Constant/initialStates'

const productsSlice = createSlice({
    name: 'products',
    initialState: initialStateCMSProduct,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        },
        editProduct: (state, action) => {
            // let id = action.payload.id
            let objectEdit = action.payload
            if (objectEdit == null || typeof objectEdit == 'undefined') {
                Alert.alert('Lỗi! không thể sửa sản phẩm')
                return state
            }

            let id = objectEdit.id
            let index = state.findIndex(el => el.id === id);
            if (index <= - 1) {
                Alert.alert('Không tìm thấy sản phẩm')
                return state
            }

            return state[index] = objectEdit
        },
        removeProduct: (state, action) => {
            let id = action.payload
            return state.filter(function (f) {
                return f.id !== id
            })
        }
    }
})

export const { addProduct, editProduct, removeProduct } = productsSlice.actions
export default productsSlice.reducer