import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import { Controller } from '../screens/controller'
const controller = new Controller;

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

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
                    marginTop: "25%", alignItems: 'center',
                    justifyContent: 'center',
                     // backgroundColor:colorsProvider.whiteColor
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            Database.init()
                            this.isCurrentRoute(this.props.routeName)
                            this.props.nav.navigate(this.props.elementName)
                            this.props.getAllItems();
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
                            color: colorsProvider.homeComplimentaryColor,
                            fontFamily: fontFamily, alignItems: 'center',
                            justifyContent: 'center',

                        }]}>{this.props.elementName}</Text>

                </View>
            );
        }
    }
}
export { TabButton };