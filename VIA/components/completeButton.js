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
                        Keyboard.dismiss()
                        this.setState({ percentVal: 0 })
                        this.props.editCompleted("false")
                        this.props.editPercentageDone(0)
                        this.props.editFinishedDate("");
                    }}
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setState({ percentVal: 100 })
                        this.props.editPercentageDone(100)
                        this.props.editCompleted("true")
                        this.props.editFinishedDate(new Date(Date.now()));
                    }}>
                    <Text style={{fontFamily: colorsProvider.fontFamily}}>Done <Text style={{ fontSize: 14, }}>(finished on: {Moment(new Date(this.state.selectedItem.finished_date.toString())).format(dateDisplayFormat)})</Text></Text>
                </TouchableOpacity>
            )
        }
        else
            return (
                <TouchableOpacity
                    style={{}}
                    onLongPress={() => {
                        this.setState({ percentVal: 0 })
                        this.props.editCompleted("false")
                        this.props.editPercentageDone(0)
                    }
                    }
                    onPress={() => {
                        this.setState({ percentVal: 100 })
                        this.props.editPercentageDone(100)
                        this.props.editCompleted("true")
                        this.props.editFinishedDate(dateToday.toString());
                    }
                    }>
                    <Text style={{fontSize: colorsProvider.fontSizeMain, fontFamily: colorsProvider.fontFamily, color: colorsProvider.whiteColor}}>Complete</Text>
                </TouchableOpacity >
            )
    }

    render() {
        return this.renderCompleteButton()
    }
}