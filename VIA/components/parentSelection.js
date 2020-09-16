import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, Dimensions, FlatList, Keyboard } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";



const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font
const screenHeight = Math.round(Dimensions.get('window').height);
var parentTypeCapitalized = ""

export class ParentSelection extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: this.props.parentName,
            selectedParent: this.props.parent,
            allParents: this.props.allParents,
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps != null)
            this.setState({ name: newProps.parentName, allParents: newProps.allParents });
    }

    renderBottomSlidingPane() {

        parentTypeCapitalized = this.props.parentType.charAt(0).toUpperCase() + this.props.parentType.slice(1)

        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={screenHeight / 1.36}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: this.props.color,
                    fontSize: colorsProvider.fontSizeMain
                }}>{parentTypeCapitalized}</Text>
            </View>
            <FlatList
                data={this.state.allParents}
                contentContainerStyle={{ marginLeft: 10, marginRight: 10, alignContent: 'center' }}
                style={{ marginLeft: 10, marginRight: 10 }}
                renderItem={({ item }) =>
                    <View style={{
                        flex: 1,
                        borderRadius: 10,
                        backgroundColor: this.props.color,
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        <TouchableOpacity 
                        onPress={() => {
                            this.props.addParent(item.value.id, item.value.name);
                            this.RBSheet.close()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{
                                marginRight: 5,
                                marginLeft: 10,
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: colorsProvider.fontSizeChildren,
                                fontFamily: colorsProvider.fontFamily,
                                color: colorsProvider.whiteColor
                            }}>{item.value.name}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colorsProvider.redColor,
                        margin: 10,
                        borderRadius: 10,
                        alignContent: 'center',
                    }}
                    onPress={() => {
                        this.props.removeParent();
                        this.RBSheet.close()
                    }}>
                    <Text style={{
                        marginRight: 10,
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: colorsProvider.fontSizeChildren,
                        fontFamily: colorsProvider.fontFamily,
                        color: colorsProvider.whiteColor
                    }}>Remove From {parentTypeCapitalized}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        backgroundColor: colorsProvider.closeButtonColor,
                        margin: 10,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        this.RBSheet.close()
                    }}>
                    <Text style={{
                        marginRight: 10,
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: colorsProvider.fontSizeChildren,
                        fontFamily: colorsProvider.fontFamily,
                        color: colorsProvider.whiteColor
                    }}>Close</Text>
                </TouchableOpacity>

            </View>
        </RBSheet>)
    }

    renderParentText() {
        if (this.state.name == null || this.state.name == "null") {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        Is this part of a bigger {this.props.parentType}?
                    </Text>

                </TouchableOpacity>
            );
        }
        else if (this.state.name != "") {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        {this.state.name}
                    </Text>

                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>Is this part of a bigger {this.props.parentType}?
          </Text>
                </TouchableOpacity>
            );
        }
    }


    render() {
        return (<View>
            {this.renderParentText()}
            {this.renderBottomSlidingPane()}

        </View>)
    }
}