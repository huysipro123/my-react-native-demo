import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'

const BoxVertical = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={ styles.boxImage }>
                <Image source={props.img}></Image>
                <View style={styles.promotionLabel}>
                    <Text style={{ color: 'white', fontSize: 12 }}></Text>
                </View>
            </View>
            <View style={styles.colPrice}>
                <Text style={{ color: '#000', fontSize: 14 }}>{props.name}</Text>
                <Text  style={{ color: '#000', fontSize: 13 }}>{props.listedPrice}</Text>
                <Text style={{ color: '#000', fontSize: 13 }}>{props.salePrice}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    boxImage: {
        flex: 35, 
        position: 'relative',
        height: '100%'
    },
    promotionLabel: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        width: 20,
        height: 10,
    },
    colPrice: {
        flex: 65, 
        flexDirection: 'column',
    }
  });

export default BoxVertical;