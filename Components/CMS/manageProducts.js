import {
    View,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Text
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as productActions from './Slice/productsSlice'
import { selectorListProducts } from '../../Redux/selectors'
import ModalAdd from './modalAdd'
import ModalEdit from './modalEdit'
import { TitleHeader } from '../Shared/index'
import ProductBoxs from '../Products/productBoxs'
import ProductBox from '../Products/productBox'
const ManageProducts = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    // const [numberProduct, setNumberProduct] = useState(lstProduct.length);
    const [objectEditing, setObjectEditing] = useState({});
    const scrollViewRef = useRef();

    const lstProduct = useSelector(selectorListProducts)
    const dispatch = useDispatch()

    console.log('testData');
    console.log('testData', lstProduct);

    useEffect(() => {
        console.log('testData', lstProduct);
    }, [lstProduct])

    // const getCurrentNumberProduct = () => {
    //     let current = numberProduct + 1
    //     setNumberProduct(current)
    //     return current
    // }

    const getCurrentNumberProduct = () => {
        return lstProduct.length + 1
    }

    const handlePressAdd = () => {
        setShowAddModal(true)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
    }

    const handleSubmitAdd = (productAdd) => {
        dispatch(productActions.addProduct(productAdd))
        setShowAddModal(false)

        //scroll to bottom
        scrollViewRef.current.scrollToEnd({ duration: 350, animated: true })
    }

    const handlePressEdit = (id) => {
        if (id === null || id === '') {
            Alert.alert('Sản phẩm lỗi, vui lòng edit sau')
            return
        }

        let objectEdit = lstProduct.find(f => f.id == id)
        setObjectEditing(objectEdit)
        setShowEditModal(true)

        console.log('ObjectEditing' + objectEdit)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    const handlePressRemove = (id) => {
        if (id === null || id === '') {
            Alert.alert('Sản phẩm lỗi, xoá không thành công')
            return
        }

        dispatch(productActions.removeProduct(id))
    }

    const handleSubmitEdit = (objectEdit) => {
        dispatch(productActions.editProduct(objectEdit))
        setShowEditModal(false)
    }

    console.log('magagerProducts re-render')

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View>
                <TitleHeader style={styles.title} >Danh sách quản lý</TitleHeader>
                <TouchableOpacity style={styles.OpenAddModal} onPress={handlePressAdd}>
                    <Image source={require('../../Assets/Images/add-icon.png')} style={{ width: 20, height: 20 }}></Image>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{ flex: 1, paddingHorizontal: 1 }}
                keyboardShouldPersistTaps='handled'
                ref={scrollViewRef}
            >
                <ProductBoxs style={styles.productView} data={lstProduct} horizontal={true} handlePressEdit={handlePressEdit} handlePressRemove={handlePressRemove}></ProductBoxs>
            </ScrollView>
            {/* <View style={{ flex: 1, position: 'relative' }}>
                <TitleHeader style={styles.title} >Danh sách quản lý</TitleHeader>
                <TouchableOpacity style={styles.OpenAddModal} onPress={handlePressAdd}>
                    <Image source={require('../../Assets/Images/add-icon.png')} style={{ width: 20, height: 20 }}></Image>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={lstProduct}
                renderItem={
                    ({ item }) => {
                        return (<ProductBox product={item} horizontal={true}></ProductBox>)
                    }
                }
                keyExtractor={item => item.id}
            >
            </FlatList> */}
            <ModalAdd
                visibleModal={showAddModal}
                handleClose={handleCloseAddModal}
                handleSubmitAdd={handleSubmitAdd}
                getCurrentNumberProduct={getCurrentNumberProduct}
            >
            </ModalAdd>
            <ModalEdit
                visibleModal={showEditModal}
                objectEditing={objectEditing}
                handleClose={handleCloseEditModal}
                handleSubmitEdit={handleSubmitEdit}
            >
            </ModalEdit>
        </View >
    )
};

const styles = StyleSheet.create({
    title: {
        flex: 1,
        height: 60,
        backgroundColor: 'cadetblue',
        marginBottom: 10,
    },
    OpenAddModal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: 'white',
        position: 'absolute',
        top: 13,
        right: 20,
    },
    productView: {
        flex: 5,
        backgroundColor: 'black',
    }
})

export default ManageProducts;