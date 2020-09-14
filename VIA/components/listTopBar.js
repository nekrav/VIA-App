import React from 'react';
import * as colorsProvider from './colorsProvider';
import { TouchableOpacity, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions, PixelRatio } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import { ImportanceRadio } from './importanceRadio';
import { ParentSelection } from './parentSelection';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker'
import KeyboardListener from 'react-native-keyboard-listener';
import FIcon from 'react-native-vector-icons/dist/Feather';

const TOP_MARGIN = PixelRatio.get() < 3 ? '5%' : '10%';

const todayDate = new Date();
const screenHeight = Math.round(Dimensions.get('window').height);

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ListTopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            importanceValue: this.props.importance,
            parent: this.props.parent,
            parentName: this.props.parentName,
            dateModalVisibility: false,
            dueDate: this.props.dueDate
        };
    }

    componentDidMount() {
        if (this.props.fromCreate) {
            this.nameTextInput.focus()
        }
    }

    render() {
        return (
            // <View style={{}}>
            //     <View style={{}}><Text style={{}}>{this.props.typeOfItem}</Text></View>
            //     <Text style={{}}>{this.props.numberOfItems}</Text>
            //     <TouchableOpacity style={{}}
            //         onPress={() => {
            //             controller.setAddModalVisible(this, true);
            //         }}>
            //         <FIcon style={{}} name="plus" />
            //     </TouchableOpacity>
            // </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flexDirection: 'column', marginBottom: 10, backgroundColor: this.props.color }}>
                    <View style={{ marginBottom: "10%", marginTop: TOP_MARGIN, marginLeft: 10, marginRight: 10, flexDirection: 'row', backgroundColor: this.props.color, alignItems: 'center', justifyContent: 'space-between',  }}>
                        <Text style={{
                            fontFamily: colorsProvider.font,
                            fontSize: colorsProvider.fontSizeMain,
                            color: colorsProvider.whiteColor,
                            // marginLeft: "10%",
                            // marginRight: "10%",
                            alignItems: "center",
                            alignContent: "center",
                        }}>{this.props.typeOfItem}</Text>
                        <Text style={{
                            fontFamily: colorsProvider.font,
                            fontSize: colorsProvider.fontSizeMain,
                            color: colorsProvider.whiteColor,
                        }}>{this.props.numberOfCompletedItems} / {this.props.numberOfItems}</Text>
                        {/* <TouchableOpacity style={{}}
                            onPress={() => {
                                this.props.onAddPress();
                            }}>
                            <FIcon style={{
                                fontFamily: colorsProvider.font,
                                fontSize: colorsProvider.fontSizeAddButton,

                                color: this.props.secondaryColor,
                            }} name="plus" />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}