import { View, Text } from 'react-native'

const TitleHeader = (props) => {
    const {style, ...rest} = props;
    return (
        <View style={{ height: 70 }}>
            <Text style={[style, { justifyContent: 'center', textAlignVertical: 'center', paddingLeft: 20, color: 'white', fontSize: 20, fontWeights: 'bold'}]}>
                {props.children}
            </Text>
        </View>
    )
}

export default TitleHeader