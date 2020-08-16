import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import SwipeableItem from 'react-native-swipeable-item'
import { Database } from '../db'
import Moment from 'moment';
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/FontAwesome';
import { CheckBox } from 'react-native-elements'

const isAndroid = Platform.OS === "android";

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const todayDate = new Date();
const PlatformTouchable = isAndroid ? TouchableOpacity : TouchableOpacity;

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font
itemRefs = new Map();
export class ChildItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            importance: this.props.importance,
            completed: this.props.completed,
            name: this.props.name,
            item: this.props.item,
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

    goToItem() {

    }

    getChecked(item) {
        if (item != null)
            var checked = false
        return checked = item === "true"
    }

    render() {
        console.warn(this.props.item)

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
                            checked={this.getChecked(this.props.item.completed)}
                            onPress={() => {
                                var newItem = this.state.item;
                                newItem.completed = !this.getChecked(this.state.completed)
                                this.setState({ item: newItem, completed: newItem.completed })
                                this.props.childUpdateCompleted(newItem)
                                if (this.state.item.completed == true) {
                                    newItem.finished_date = new Date(Date.now())
                                } else {
                                    newItem.finished_date == ""
                                }
                            }}/></View>
                    <TouchableOpacity onPress={(item) => {
                        this.props.goToItem(this.state.item)
                    }}>
                        <Text style={{ fontFamily: colorsProvider.font, color: this.props.childMainColor, fontSize: 18, marginLeft: 5, }}>{this.props.name}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', }}>
                            <IIcon size={20} style={{ marginLeft: 10, marginRight: 10, }} color={this.props.childMainColor} name="ios-arrow-forward" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <SwipeableItem
        key={this.props.itemKey}
        item={{ item, drag }}
        // ref={ref => {
        //   if (ref && !this.itemRefs.get(item.key)) {
        //     this.itemRefs.set(item.key, ref);
        //   }
        // }}
        // onChange={({ open }) => {
        //   if (open) {
        //     // Close all other open items
        //     [...this.itemRefs.entries()].forEach(([key, ref]) => {
        //       if (key !== this.props.item.key && ref) ref.close();
        //     });
        //   }
        // }}
        overSwipe={50}
        renderUnderlayLeft={this.renderUnderlayLeft}
        // snapPointsLeft={item.hasLeft ? [100] : undefined}
        renderUnderlayRight={this.renderUnderlayRight}
        // snapPointsRight={item.hasRight ? [100, width] : undefined}
        renderOverlay={item => {
            <View><Text>awoefua</Text></View>
        }}
      /> */}
            </TouchableWithoutFeedback>
        )
    }
}