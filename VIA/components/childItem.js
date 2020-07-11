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

    // renderOverlay = ({ item, openLeft, openRight, openDirection, close }) => {
    //     // const { text, backgroundColor, hasLeft, hasRight } = item.item;
    //     // console.warn(item)
    //     return (
    //       <View style={{}}>
    //         <View style={{}}>
    //           {/* {hasRight && (
    //             <PlatformTouchable
    //               onPressOut={!!openDirection ? close : () => openRight(1)}
    //             >
    //               <Text style={styles.text}>{`<`}</Text>
    //             </PlatformTouchable>
    //           )} */}
    //         </View>
    //         <PlatformTouchable style={{}}
    //         // onLongPress={item.drag}
    //         >
    //           <Text style={{}}>{text}</Text>
    //         </PlatformTouchable>
    //         <View style={{}}>
    //           {/* {hasLeft && (
    //             <PlatformTouchable onPressOut={!!openDirection ? close : openLeft}>
    //               <Text sstyle={{}}>{`>`}</Text>
    //             </PlatformTouchable>
    //           )} */}
    //         </View>
    //       </View>
    //     );
    //   };

    goToItem() {
        console.warn(this.props.item)
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => { }}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, borderColor: colorsProvider.habitsMainColor, margin: 10, borderRadius: 10 }}>


                    <FIcon name="exclamation-circle" size={20} color={this.getImportanceColor(this.props.item.value.importance)} style={{ margin: 3 }} />
                    <TouchableOpacity onPress={() => {
                        this.goToItem();
                    }}>
                        <Text style={{ fontFamily: colorsProvider.font, color: colorsProvider.habitsMainColor, fontSize: 18, marginLeft: 5, }}>{this.props.name}</Text>
                        </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', }}>
                            <SIcon color={colorsProvider.habitsMainColor} style={{ marginLeft: 10, marginRight: 10, }} size={20} name={colorsProvider.trash} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', }}>
                            <IIcon size={20} style={{ marginLeft: 10, marginRight: 10, }} color={colorsProvider.habitsMainColor} name="ios-arrow-forward" />
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