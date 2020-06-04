import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class CompleteButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
        };
    }

    renderCompleteButton() {
        if (this.state.completed == "true") {
            return (
                <TouchableOpacity
                    style={{}}
                    onLongPress={() => {
                        this.props.onUnCompletePressed()
                        this.setState({ completed: "false", finishedDate: "null", percentageDone: 0 })

                    }}>
                    <Text style={{ fontFamily: colorsProvider.fontFamily }}>Done
                    {/* <Text style={{ fontSize: 14, }}>(finished on: {Moment(new Date(this.state.finishedDate.toString())).format(dateDisplayFormat)})</Text> */}
                    </Text>
                </TouchableOpacity>
            )
        }
        else
            return (
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        backgroundColor: colorsProvider.finishedBackgroundColor
                    }}
                    onLongPress={() => {
                        this.props.onUnCompletePressed()
                        this.setState({ completed: "false", finishedDate: "null", percentageDone: 0 })
                    }}
                    onPress={() => {
                        this.setState({ completed: "true", finishedDate: new Date(Date.now()).toString(), percentageDone: 10 })
                        this.props.onCompletePressed()
                    }}>
                    <Text style={{
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        fontSize: colorsProvider.fontSizeMain,
                        fontFamily: colorsProvider.fontFamily,
                        color: colorsProvider.topBarColor
                    }}>Complete</Text>
                </TouchableOpacity >)
    }

    render() {
        return this.renderCompleteButton()
    }
}