import { Provider } from 'react-redux'
import store from './Redux/store'
import { View, TextInput, Text } from 'react-native'

import {
    ManageProducts,
    Home
} from './Components/index'
import { TitleHeader, RadioButton } from './Components/Shared/index'

export default App = () => {
    return (
        <Provider store={store}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <ManageProducts></ManageProducts>
                {/* <TextInput
                // style={{}}
                placeholder='Nhập hình sản phẩm'
                onChangeText={(text) => {
                    console.log(text)
                }}
                onBlur={() => { console.log('blurrrrrrrrrrrrrrr') }}
                // value={}
                cursorColor='#222b45'
            ></TextInput> */}
                {/* <Text>testtttttttttttttttttt</Text> */}
            </View>
        </Provider>
        // <View style={{ flex: 1, flexDirection: 'row' }}>
        //     {/* <ManageProducts></ManageProducts> */}
        //     {/* <TextInput
        //         // style={{}}
        //         placeholder='Nhập hình sản phẩm'
        //         onChangeText={(text) => {
        //             console.log(text)
        //         }}
        //         onBlur={() => { console.log('blurrrrrrrrrrrrrrr') }}
        //         // value={}
        //         cursorColor='#222b45'
        //     ></TextInput> */}
        //     <Text>testtttttttttttttttttt</Text>
        // </View>
    )
}