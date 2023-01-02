import {
    View,
    Text,
    TextInput,
    Modal,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { useEffect, useState } from 'react'
import { RadioButton } from '../Shared/index';
import * as Ext from '../../Common/extension';
import * as productHelper from '../../Helper/productHelper'

const widthScreen = Dimensions.get('window').width; //full width
const heightScreen = Dimensions.get('window').height; //full height

const ModalEdit = (props) => {
    const [nameText, setNameText] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [promoType, setPromoType] = useState('price-value')
    const [promoValue, setPromoValue] = useState(0)

    console.log('ModalEdit re-render')

    useEffect(() => {
        setNameText(props.objectEditing.name == '' ? '' : props.objectEditing.name)
        setPrice(props.objectEditing.listedPrice > 0 ? props.objectEditing.listedPrice.toString() : '')
        setImageUrl(props.objectEditing.img == '' ? '' : props.objectEditing.img)
        setPromoType(props.objectEditing.promoType === '' ? 'price-value' : props.objectEditing.promoType)
        setPromoValue(props.objectEditing.promoValue > 0 ? props.objectEditing.promoValue.toString() : '')
    }, [props]);

    const handlePromoTypeChange = (type) => {
        if (type === promoType)
            return

        switch (type) {
            case 'price-value': {
                setPromoType(type)
                return
            }
            case 'percent': {
                setPromoType(type)

                if (promoValue > 100)
                    setPromoValue(0)
                return
            }
            default: setPromoType('price-value')
        }
    }

    const handleSubmitEdit = () => {
        if (Ext.IsNullOrEmpty(price) || isNaN(price)) {
            Alert.alert('Lỗi, giá không đúng định dạng')
            return
        }

        if (Ext.IsNullOrEmpty(promoValue) || isNaN(promoValue)) {
            Alert.alert('Lỗi, khuyến mãi không đúng định dạng')
            return
        }

        let priceTmp = parseInt(price)
        let promoValueTmp = parseInt(promoValue)
        let productEdit = {
            ...props.objectEditing,
            img: imageUrl,
            name: nameText,
            listedPrice: priceTmp,
            promoType: promoType,
            promoValue: promoValueTmp,
            salePrice: productHelper.calcSalePrice(priceTmp, promoType, promoValueTmp),
            promoPercentValue: productHelper.calcPromoPercent(priceTmp, promoType, promoValueTmp),
        }
        props.handleSubmitEdit(productEdit)
    }

    if (!props.visibleModal)
        return null

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.viewContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.visibleModal}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                        props.handleClose()
                    }}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={props.handleClose} style={[styles.btnClose, { flex: 1 }]}>
                                    <Image source={require('../../Assets/Images/icon-close.png')} style={styles.iconClose}></Image>
                                </TouchableOpacity>
                                <Text style={[styles.modalTitle, { flex: 2 }]}>Sửa sản phẩm</Text>
                                <View style={[styles.row, { flex: 2 }]}>
                                    <Text style={styles.rowLabel}>Name: </Text>
                                    <TextInput
                                        style={styles.rowInput}
                                        placeholder='Nhập tên sản phẩm'
                                        onChangeText={(text) => {
                                            setNameText(text)
                                        }}
                                        value={nameText}
                                        cursorColor='#222b45'
                                    />
                                </View>
                                <View style={[styles.row, { flex: 2 }]}>
                                    <Text style={styles.rowLabel}>Price: </Text>
                                    <TextInput
                                        style={styles.rowInput}
                                        placeholder='Nhập giá sản phẩm'
                                        onChangeText={(text) => {
                                            if(isNaN(text))
                                                return

                                            setPrice(text)
                                        }}
                                        value={price}
                                        // defaultValue={price.toString()}
                                        cursorColor='#222b45'
                                        keyboardType='numeric'
                                    ></TextInput>
                                </View>
                                <View style={[styles.row, { flex: 3 }]}>
                                    <Text style={styles.rowLabel}>Promoton Type: </Text>
                                    <View style={styles.radioArea}>
                                        <View style={styles.radio}>
                                            <Text style={{ marginBottom: 3 }}>Giảm tiền</Text>
                                            <RadioButton
                                                value="price-value"
                                                status={promoType === 'price-value' ? 'checked' : 'unchecked'}
                                                onPress={() => handlePromoTypeChange('price-value')}
                                            />
                                        </View>
                                        <View style={styles.radio}>
                                            <Text style={{ marginBottom: 3 }}>Giảm %</Text>
                                            <RadioButton
                                                value="percent"
                                                status={promoType === 'percent' ? 'checked' : 'unchecked'}
                                                onPress={() => handlePromoTypeChange('percent')}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.row, { flex: 2 }]}>
                                    <Text style={styles.rowLabel}>Promoton: </Text>
                                    <TextInput
                                        style={styles.rowInput}
                                        placeholder='Nhập khuyến mãi'
                                        onChangeText={(text) => {
                                            if(isNaN(text))
                                                return

                                            setPromoValue(text)
                                        }}
                                        value={promoValue}
                                        // defaultValue={promoValue.toString()}
                                        cursorColor='#222b45'
                                        keyboardType='numeric'
                                    ></TextInput>
                                </View>
                                <View style={[styles.row, { flex: 2 }]}>
                                    <Text style={styles.rowLabel}>Image Url: </Text>
                                    <TextInput
                                        style={styles.rowInput}
                                        placeholder='Nhập hình sản phẩm'
                                        onChangeText={(text) => {
                                            setImageUrl(text)
                                        }}
                                        onBlur={() => { console.log('blurrrrrrrrrrrrrrr') }}
                                        onPressOut={() => Keyboard.dismiss}
                                        value={imageUrl}
                                        cursorColor='#222b45'
                                    ></TextInput>

                                </View>
                                <Image source={{ uri: imageUrl }} style={{ flex: 5, width: 100, height: 100, resizeMode: 'cover', marginVertical: 15, borderRadius: 10 }}></Image>
                                <TouchableOpacity style={[styles.btnSubmit, { flex: 2 }]} onPress={handleSubmitEdit}>
                                    <Text style={{ textTransform: 'uppercase' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
    },
    viewContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: 'white',
        backgroundColor: 'rgba(10, 10, 10, .5)',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        // flex: 1,
        margin: 20,
        // backgroundColor: 'darkcyan',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 45,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: widthScreen - 100,
        height: heightScreen - 100,
        position: 'relative',
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    btnClose: {
        position: 'absolute',
        width: 25,
        height: 25,
        top: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconClose: {
        width: 20,
        height: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'back',
        marginBottom: 15,
    },
    rowLabel: {
        width: 90,
        color: "#222b45",
        marginRight: 10,
        fontSize: 18,
    },
    rowInput: {
        flex: 8,
        color: "#222b45",
        borderWidth: 1,
        borderColor: '#222b45',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    radioArea: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: "#222b45",
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    radio: {
        width: '50%',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle: {
        marginBottom: 20,
        textAlign: "center",
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    btnSubmit: {
        backgroundColor: 'chartreuse',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        maxHeight: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 5,
    }
})

export default ModalEdit;