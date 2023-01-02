import {
    View,
    ScrollView,
    Text
} from 'react-native'
import ProductBox from './productBox'

const ProductsBoxs = (props) => {
    console.log('ProductsBoxs re-render')

    return (
        <View style={{ flex: 1 }}>
            {
                props.data != null &&
                props.data.map((product, index) => {
                    return (
                        <ProductBox key={product.id} product={product} horizontal={props.horizontal} handlePressEdit={props.handlePressEdit} handlePressRemove={props.handlePressRemove}></ProductBox>
                    )
                })
            }
        </View>
    )
};

export default ProductsBoxs;