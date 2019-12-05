import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Animated, TouchableHighlight, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const SIZE = 80;
// const navigate = this.props.navigation;
class HomeButton extends React.Component {
    mode = new Animated.Value(0);
    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };
    render() {
        return (
            <View style={{
                position: 'absolute',
                alignItems: 'center'
            }}>
                <TouchableHighlight
                    onPress={() => this.props.nav.navigate('Habits')}
                    underlayColor="#2882D8"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        backgroundColor: '#48A2F8'
                    }}
                >
                    <Animated.View style={{
                    }}>
                        <Image style={{ width: 50, height: 50, tintColor: "#fff" }} source={require('../components/via_logo.png')} />
                    </Animated.View>
                </TouchableHighlight>
            </View>
        );
    }
}
export { HomeButton };