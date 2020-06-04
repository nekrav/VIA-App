import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class TrashButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
        };
    }

    renderTrashButton() {
        return (
            <TouchableOpacity
                style={{
                    flex: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                    // backgroundColor: colorsProvider.incompleteColor
                }}
                onLongPress={() => {
                    this.props.onUnCompletePressed()
                    this.setState({ completed: "false", finishedDate: "null", percentageDone: 0 })
                }}
                onPress={() => {
                    this.setState({ completed: "true", finishedDate: new Date(Date.now()).toString(), percentageDone: 10 })
                    this.props.onCompletePressed()
                }}>
                <SIcon name={colorsProvider.trash} style={{}} size={40} color={colorsProvider.incompleteColor} />
            </TouchableOpacity >)
    }

    render() {
        return this.renderTrashButton()
    }
}