import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';



const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class TrashButton extends React.Component {

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
                }}
                onPress={this.props.delete}>
                <SIcon name={colorsProvider.trash} style={{}} size={40} color={colorsProvider.incompleteColor} />
            </TouchableOpacity >)
    }

    render() {
        return this.renderTrashButton()
    }
}