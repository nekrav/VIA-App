import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Animated, TouchableOpacity, View, Image, Text } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
const SIZE = 80;

const backgroundColor = "#ffffff"
const blueColor = "#00bbb1"
const textColor = "#2d3142"
const finishedBackgroundColor = "#4DFF87"
const grayColor = "#ededed"
const placeholderColor = "#ABABAB"
const homeColorButton = "#48A2F8"
const fontFamily = Platform.OS == "ios" ? "Roboto-Medium" : "Roboto-Medium"

class TabButton extends React.Component {
    mode = new Animated.Value(0);
    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };

    isCurrentRoute(routeName) {
        if (routeName != '') {
            return routeName == this.props.nav.state.routeName
        }
           
    }

    render() {
        if (this.props.routeName && this.props.nav.state.routeName) {
            return (
                <View style={{
                    width: '100%', height: '300%',
                    // backgroundColor: blueColor,
                    marginTop: "25%", alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.isCurrentRoute(this.props.routeName)
                            this.props.nav.navigate(this.props.elementName)
                        }
                        }
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <SIcon name={this.props.iconName} size={30} color={this.props.focused ? this.props.activeColor : this.props.inactiveColor} />
                    </TouchableOpacity>
                    <Text style={[this.isCurrentRoute(this.props.routeName) ? {
                        color: this.props.focused ? this.props.activeColor : this.props.inactiveColor,
                        fontFamily: fontFamily, alignItems: 'center',
                        justifyContent: 'center',
                    } : {
                            color: blueColor,
                            fontFamily: fontFamily, alignItems: 'center',
                            justifyContent: 'center',

                        }]}>{this.props.elementName}</Text>
                
                </View>
            );
        }
    }
}
export { TabButton };