import { View, TouchableOpacity } from 'react-native'

const RadioButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {
                    props.status === 'checked' ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
        </TouchableOpacity>
    )
}

export default RadioButton