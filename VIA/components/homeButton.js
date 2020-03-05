import React from 'react';
import * as colorsProvider from './colorsProvider';
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
                marginTop: "10%",
                position: 'absolute',
                alignItems: 'center'
            }}>
                <TouchableHighlight
                    onPress={() => this.props.nav.navigate('Home')}
                    style={this.props.focused ? {
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderWidth: 2,
                        borderColor: colorsProvider.homeComplimentaryColor,
                        borderRadius: SIZE / 2,
                        backgroundColor: colorsProvider.homeComplimentaryColor,
                        shadowColor: colorsProvider.shadowColor,
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                            height: 1,
                            width: 0
                        }

                    } : {
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderWidth: 2,
                        borderColor: colorsProvider.homeComplimentaryColor,
                        borderRadius: SIZE / 2,
                        backgroundColor: colorsProvider.homeComplimentaryColor,
                        shadowColor: colorsProvider.shadowColor,
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                            height: 1,
                            width: 0
                        }

                    } }
                >
                    <Animated.View style={{
                    }}>
                        <Image style={{ width: 50, height: 50, tintColor: this.props.focused ? colorsProvider.homePlaceholderColor : colorsProvider.whiteColor }} source={require('../components/via_logo.png')} />
                    </Animated.View>
                </TouchableHighlight>
            </View>
        );
    }
}
export { HomeButton };