import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, PixelRatio } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';


const TOP_MARGIN = PixelRatio.get() < 3 ? -10 : 20;

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ImportanceRadio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value3Index: this.props.importance,
        };
    }

    renderB1(val) {
        if (this.state.value3Index == 1)
            return <View style={{
                height: 42,
                width: 42,  //The Width must be the same as the height
                borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
                backgroundColor: colorsProvider.notINotUColor,
            }}></View>
    }
    renderB2() {
        if (this.state.value3Index == 2)
            return <View style={{
                height: 42,
                width: 42,  //The Width must be the same as the height
                borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
                backgroundColor: colorsProvider.notIUColor,
            }}></View>
    }
    renderB3() {
        if (this.state.value3Index == 3)
            return <View style={{
                height: 42,
                width: 42,  //The Width must be the same as the height
                borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
                backgroundColor: colorsProvider.iNotUColor,
            }}></View>
    }
    renderB4() {
        if (this.state.value3Index == 4)
            return <View style={{
                height: 42,
                width: 42,  //The Width must be the same as the height
                borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
                backgroundColor: colorsProvider.iUColor,
            }}></View>
    }


    renderImportance() {
        return (<View style={{ flexDirection: 'row', marginBottom: 10, marginTop: TOP_MARGIN, backgroundColor: this.props.color, justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.setImportanceNN(1)
                        this.setState({ value3Index: 1 })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        height: 50,
                        width: 50,
                        borderRadius: 400,
                        backgroundColor: colorsProvider.whiteColor,
                        marginBottom: 2,
                    }}>
                    {this.renderB1()}
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', alignItems: 'center', color: colorsProvider.whiteColor }}>Not Important {"\n"} Not Urgent</Text></View>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.setImportanceNU(2)
                        this.setState({ value3Index: 2 })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        height: 50,
                        width: 50,
                        borderRadius: 400,
                        backgroundColor: colorsProvider.whiteColor,
                        marginBottom: 2,
                    }}>
                    {this.renderB2()}
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', alignItems: 'center', color: colorsProvider.whiteColor }}>Not Important {"\n"} Urgent</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.setImportanceIN(3)
                        this.setState({ value3Index: 3 })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        height: 50,
                        width: 50,
                        borderRadius: 400,
                        backgroundColor: colorsProvider.whiteColor,
                        marginBottom: 2,
                    }}>
                    {this.renderB3()}
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', alignItems: 'center', color: colorsProvider.whiteColor }}>Important {"\n"} Not Urgent</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.setImportanceIU(4)
                        this.setState({ value3Index: 4 })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        height: 50,
                        width: 50,
                        borderRadius: 400,
                        backgroundColor: colorsProvider.whiteColor,
                        marginBottom: 2,
                    }}>
                    {this.renderB4()}
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', alignItems: 'center', color: colorsProvider.whiteColor }}>Important {"\n"} Urgent</Text>
            </View>
        </View>)
    }

    render() {
        return this.renderImportance()
    }
}