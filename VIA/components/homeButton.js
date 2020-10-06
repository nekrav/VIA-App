import React from 'react';
import * as colorsProvider from './colorsProvider';
import { NavigationActions } from 'react-navigation';
import { Animated, TouchableHighlight, View, Image, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';

import { colors } from 'react-native-elements';
const SIZE = 80;
const activeImage = require('../components/logo_colored_no_background.png');
const inactiveImage = require('../components/logo_colored_no_background_gray.png');

// const navigate = this.props.navigation;
class HomeButton extends React.Component {
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

    getImage() {
        if (this.props.nav.state.routeName == "Home")
            return activeImage
        else
            return i
    }

    render() {
        return (
            <View style={{
                width: '100%', height: '300%',
                marginTop: "25%", alignItems: 'center',
                justifyContent: 'center',
              
                 // backgroundColor:colorsProvider.whiteColor
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.nav.navigate('Home')
                        // Database.init()
                        this.isCurrentRoute(this.props.routeName)
                        this.props.nav.navigate("Home")
                        // this.props.getAllItems();
                    }
                    }
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                  {/* <Animated.View style={{
                    }}> */}
                    <React.Fragment>
                    <Image 
                        // style={{ width: 55, height: 60, [this.isCurrentRoute(this.props.routeName) ? {}}} 
                            style={[this.props.focused ? {
                                width: 75, height: 75, 
                            } : {
                                width: 75, height: 75,  tintColor: 'gray',  
                                }]}
                                source={require('../components/logo_colored_no_background.png')} />
                        <Image 
                        // style={{ width: 55, height: 60, [this.isCurrentRoute(this.props.routeName) ? {}}} 
                            style={[this.isCurrentRoute(this.props.routeName) ? {
                                width: 75, height: 75,  position: 'absolute', opacity: 0.3
                            } : {
                                width: 75, height: 75,  position: 'absolute', opacity: 0.3

        
                                }]}
                        source={activeImage} /></React.Fragment>
                    {/* </Animated.View>                */}
                     </TouchableOpacity>
                {/* <Text style={[this.isCurrentRoute(this.props.routeName) ? {
                    color: this.props.focused ? this.props.activeColor : this.props.inactiveColor,
                    fontFamily: fontFamily, alignItems: 'center',
                    justifyContent: 'center',
                } : {
                        color: colorsProvider.homeComplimentaryColor,
                        fontFamily: fontFamily, alignItems: 'center',
                        justifyContent: 'center',

                    }]}>{this.props.elementName}</Text> */}
            </View>
        );
        // return (
        //     <View style={{
        //         // position: 'absolute',
        //         alignItems: 'center',
        //         backgroundColor: colorsProvider.whiteColor
        //     }}>
        //         <TouchableHighlight
        //             onPress={() => this.props.nav.navigate('Home')}
        //             style={this.props.focused ? {
        //                 width: '100%', height: '300%',
        //                 marginTop: "25%", alignItems: 'center',
        //                 justifyContent: 'center',
        //                 // backgroundColor: colorsProvider.whiteColor
        //                 // alignItems: 'center',
        //                 // justifyContent: 'center',
        //                 // width: SIZE,
        //                 // height: SIZE,
        //                 // borderWidth: 2,
        //                 // borderColor: colorsProvider.homeComplimentaryColor,
        //                 // borderRadius: SIZE / 2,
        //                 // backgroundColor: colorsProvider.homeComplimentaryColor,
        //                 // shadowColor: colorsProvider.shadowColor,
        //                 // shadowOpacity: 0.8,
        //                 // shadowRadius: 2,
        //                 // shadowOffset: {
        //                 //     height: 1,
        //                 //     width: 0
        //                 // }

        //             } : {
        //                 width: '100%', height: '300%',
        //                 marginTop: "25%", 
        //                 alignItems: 'center',
        //                 justifyContent: 'center',
        //                 // alignItems: 'center',
        //                 // justifyContent: 'center',
        //                 // width: SIZE,
        //                 // height: SIZE,
        //                 // borderWidth: 2,
        //                 // borderColor: colorsProvider.homeComplimentaryColor,
        //                 // borderRadius: SIZE / 2,
        //                 // backgroundColor: colorsProvider.homeComplimentaryColor,
        //                 // shadowColor: colorsProvider.shadowColor,
        //                 // shadowOpacity: 0.8,
        //                 // shadowRadius: 2,
        //                 // shadowOffset: {
        //                 //     height: 1,
        //                 //     width: 0
        //                 // }
        //             } }
        //         >
                    // <Animated.View style={{
                    // }}>
                    //     <Image style={{ width: 50, height: 50, }} source={require('../components/logo_colored_no_background.png')} />
                    // </Animated.View>
        //         </TouchableHighlight>
        //     </View>
        // );
    }
}
export { HomeButton };