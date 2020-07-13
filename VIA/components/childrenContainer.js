import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChildItem } from '../components'

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ChildrenContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
            allChildren: this.props.allChildren,
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps != null)
            this.setState({ allChildren: this.props.allChildren });
    }

    deleteItem(item) {
        var array = this.state.allChildren
        var index = array.indexOf(item)
        this.state.allChildren.splice(index, 1)
        console.warn(index)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ allChildren: array });
            this.props.deleteItem(item)
        }
    }

    goToItem(itemId) {

    }

    renderChildItem(name) {
        return (<ChildItem
            deleteItem={itemId => {
                this.props.deleteItem(itemId)
            }}
            updateImportance={itemId => {
                this.props.updateImportance(itemId);
            }}
            goToItem={itemId => {
                this.goToItem(itemId)
            }}
            name={name}
        />)
    }

    render() {
        if (this.state.allChildren.length > 0) {
            return (
                <ScrollView style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, marginBottom: 10, }}>
                    <View style={{}}>
                        <FlatList
                            horizontal={false}
                            scrollEnabled={true}
                            data={this.state.allChildren}
                            style={{ flex: 1 }}
                            renderItem={({ item }) => {
                                return <ChildItem
                                    itemKey={item.value.id}
                                    name={item.value.name}
                                    item={item}
                                    childItemTableName={this.props.childItemTableName}
                                    deleteItem={item => {
                                        this.props.deleteItem(item)

                                    }}
                                    updateImportance={item => {
                                        this.props.updateImportance(item);
                                    }}
                                    goToItem={item => {
                                        this.goToItem(item)
                                    }}
                                />
                            }}
                        /></View>
                </ScrollView>
            )
        } else {
            return (<Text>No Children</Text>)
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