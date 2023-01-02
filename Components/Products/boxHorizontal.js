import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

const handlePressEdit = () => {
    props.handlePressEdit(props.id)
}

const BoxHorizontal = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.boxImage}>
                <Image source={{ uri: props.img }} style={styles.image}></Image>
                {
                    props.promoPercentValue > 0 && 
                    <View style={styles.promotionLabel}>
                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', textAlignVertical: 'center' }}>-{props.promoPercentValue}%</Text>
                    </View>
                }
            </View>
            <View style={styles.colPrice}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.listedPrice}>{props.listedPrice} VNĐ</Text>
                <Text style={styles.salePrice}>{props.salePrice} VNĐ</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.btnRemove, { backgroundColor: 'skyblue' }]} onPress={() => props.handlePressEdit(props.id)}>
                        <Image source={require('../../Assets/Images/edit-icon.png')} style={styles.iconButton}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnRemove, { backgroundColor: 'tomato' }]} onPress={() => props.handlePressRemove(props.id)}>
                        <Image source={require('../../Assets/Images/remove-icon.png')} style={styles.iconButton}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxImage: {
        width: 120,
        height: 120,
        position: 'relative',
        marginRight: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'darkgreen',
        borderWidth: 2,
    },
    image: {
        resizeMode: 'center',
        width: '100%',
        height: '100%',
        padding: 10,
    },
    promotionLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        // paddingHorizontal: 3,
        // paddingVertical: 3,
        padding: 3,
        width: 40,
        height: 25,
        bordertopRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    colPrice: {
        flex: 60,
        flexDirection: 'column',
        padding: 4,
    },
    name: {
        color: '#222b45',
        fontSize: 17,
        marginBottom: 5,
    },
    listedPrice: {
        color: '#9da7bc',
        fontSize: 12,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    salePrice: {
        color: '#222b45',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    btnRemove: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        width: 20,
        height: 20,
    }
});

export default BoxHorizontal;