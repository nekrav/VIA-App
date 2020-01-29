import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Animated, TouchableOpacity, View, Image, Text } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
const SIZE = 80;

const backgroundColor = "#ffffff"
const blueColor = "#068ae8"
const textColor = "#2d3142"
const finishedBackgroundColor = "#4DFF87"
const grayColor = "#ededed"
const placeholderColor = "#ABABAB"
const homeColorButton = "#48A2F8"
const fontFamily = Platform.OS == "ios" ? "Roboto-Medium" : "Roboto-Medium"

// const navigate = this.props.navigation;
class TabButton extends React.Component {
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
                marginTop: "25%", alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity 
                 onPress={() => 
                    {
                        console.warn(this.props.nav.state.routeName == this.props.elementName)
                    this.props.nav.navigate(this.props.elementName)
                }
                }
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <SIcon name={this.props.iconName} size={30} color={this.props.nav.state.routeName == this.props.elementName ? blueColor : placeholderColor} />
                </TouchableOpacity>
                <Text style={{
                    color: this.props.nav.state.routeName == this.props.elementName ? blueColor : placeholderColor,
                    fontFamily: fontFamily, alignItems: 'center',
                    justifyContent: 'center',
                }}>{this.props.elementName}</Text>
                {/* <TouchableHighlight
                    onPress={() => this.props.nav.navigate('Home')}
                    underlayColor="#2882D8"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        // width: SIZE,
                        // height: SIZE,
                        // borderRadius: SIZE / 2,
                        // backgroundColor: '#48A2F8'
                    }}
                > */}
                {/* </TouchableHighlight> */}
            </View>
        );
    }
}
export { TabButton };