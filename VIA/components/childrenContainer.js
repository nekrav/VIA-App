import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ChildrenContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
            allChildren: this.props.allChildren
        };
    }

    render() {
        return (
            <ScrollView style={{flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5,}}>
                <FlatList 
                data={this.state.allChildren}/>
            </ScrollView>
        )
    }
}