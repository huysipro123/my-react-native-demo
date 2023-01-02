import {
    View
} from 'react-native'
import BoxHorizontal from './boxHorizontal'
import BoxVertical from './boxVertical'

const ProductsBox = (props) => {
    return (
        <View style={{ flex: 1 }}>
            {
                props.product != null && 
                <View style={{ flex: 1 }}>
                    {
                        props.horizontal 
                        ? <BoxHorizontal id={props.product.id} img={props.product.img} name={props.product.name} listedPrice={props.product.listedPrice} salePrice={props.product.salePrice} promoPercentValue={props.product.promoPercentValue} handlePressEdit={props.handlePressEdit} handlePressRemove={props.handlePressRemove}></BoxHorizontal>
                        : <BoxVertical img={props.product.img} name={props.product.name} listedPrice={props.product.listedPrice} salePrice={props.product.salePrice}></BoxVertical>
                    }
                </View>
            }
        </View>
    )
};

export default ProductsBox;