import React from 'react';
import * as colorsProvider from './colorsProvider';
import { TouchableOpacity, View, Text, TouchableWithoutFeedback } from "react-native";
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import FIcon from 'react-native-vector-icons/dist/FontAwesome';
import { CheckBox } from 'react-native-elements'
import { Controller } from '../screens/controller'

const controller = new Controller;

export class ChildItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            item: this.props.item,
            importance: this.props.importance,
            completed: this.props.completed,
        };
    }

    getImportanceColor(importance) {
        switch (parseInt(importance)) {
            case 1:
                return colorsProvider.notINotUColor
            case 2:
                return colorsProvider.notIUColor
            case 3:
                return colorsProvider.iNotUColor
            case 4:
                return colorsProvider.iUColor
            default:
                return colorsProvider.whiteColor
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => { }}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, borderColor: this.props.childMainColor, margin: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FIcon name="exclamation-circle" size={20} color={this.getImportanceColor(this.props.item.importance)} style={{ margin: 3 }} />
                        <CheckBox
                            center
                            checkedIcon={colorsProvider.checkboxIcon}
                            uncheckedIcon={colorsProvider.checkboxIcon}
                            checkedColor={colorsProvider.finishedBackgroundColor}
                            uncheckedColor={colorsProvider.routinesComplimentaryColor}
                            containerStyle={colorsProvider.checkboxContainerStyle}
                            size={colorsProvider.checkboxIconSize}
                            checked={controller.getChecked(this.props.item.completed)}
                            onPress={() => {
                                var newItem = this.state.item;
                                newItem.completed = !controller.getChecked(this.state.completed)
                                this.setState({ item: newItem, completed: newItem.completed })
                                this.props.childUpdateCompleted(newItem)
                                if (this.state.item.completed == true) {
                                    newItem.finished_date = new Date(Date.now())
                                } else {
                                    newItem.finished_date == ""
                                }
                            }} /></View>
                    <TouchableOpacity style={{width: '70%'}} onPress={(item) => {
                        this.props.goToItem(this.state.item)
                    }}>
                        <Text  numberOfLines={1} style={{ fontFamily: colorsProvider.font, color: this.props.childMainColor, fontSize: 18, marginLeft: 5, }}>{this.props.name}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', }}>
                            <IIcon size={20} style={{ marginLeft: 10, marginRight: 10, }} color={this.props.childMainColor} name="ios-arrow-forward" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}