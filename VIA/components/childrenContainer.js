import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        console.warn(this.state.allChildren)
        if (this.state.allChildren.length > 0) {
            return (
                <ScrollView style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, marginBottom: 10, }}>
                {/* <TouchableWithoutFeedback onPress={() => { }}> */}
                    <View style={{}}>
                    <FlatList
                        horizontal={false}
                        scrollEnabled={true}
                        data={this.state.allChildren}
                        style={{flex: 1}}
                        // contentContainerStyle={{ backgroundColor: colorsProvider.habitsComplimentaryColor, borderWidth: 1, borderColor: colorsProvider.habitsMainColor, borderRadius: 10,  marginLeft: 2, marginRight: 2, marginBottom: 3, marginTop: 10, }}
                        renderItem={({ item }) => { return <TouchableOpacity style={{flex: 2, backgroundColor: colorsProvider.habitsMainColor, margin: 10, }}><Text>{item.value.name}</Text></TouchableOpacity> }}
                    /></View>
                 </ScrollView>
                //  {/* </TouchableWithoutFeedback> */}
            )
        } else {
            return(<Text>No Children</Text>)
            // return (
            //     // <ScrollView style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, }}>
            //     <TouchableWithoutFeedback onPress={() => { }}>

            //         <FlatList
            //             horizontal={false}
            //             scrollEnabled={true}
            //             data={this.state.allChildren}
            //             contentContainerStyle={{  borderWidth: 1, borderColor: colorsProvider.habitsMainColor, borderRadius: 10,  marginLeft: 2, marginRight: 2, marginBottom: 3, marginTop: 10, }}
            //             renderItem={({ item }) => { return <TouchableOpacity style={{flex: 1, backgroundColor: colorsProvider.habitsMainColor, margin: 10, }}><Text>{item.value.name}</Text></TouchableOpacity> }}
            //         />
            //     {/* // </ScrollView> */}
            //     </TouchableWithoutFeedback>
            // )
        }

    }
}