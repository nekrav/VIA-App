import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, PixelRatio, FlatList, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'; // Version can be specified in package.json
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import { TabView, SceneMap } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { DateModal } from '../dateModal/dateModal'


const styles = require('./styles');
const BOTTOM_MARGIN = PixelRatio.get() < 3 ? 100 : 100

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds

const timeFormat = 'hh:mm'

const currentTime = hours + ":" + min


export class NotesModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mondayChecked: false,
            mondayNotificationTimes: [],
            notificationTimeSelectionModalVisibility: false,
            selectedDayToAddTimeTo: '',
            notes: this.props.existingNotes ? this.props.existingNotes : '',
            startingNotes: this.props.existingNotes ? this.props.existingNotes : ''
        };
    }

    getButtonContainerStyles() {
        if (this.state.notes != this.state.startingNotes) {
            return {
                marginLeft: 50,
                paddingLeft: 35,
                paddingRight: 35,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 20,
                marginRight: 50,
                borderColor: "#045CB1",
                marginBotton: BOTTOM_MARGIN,
                backgroundColor: colorsProvider.setButtonColor
            }
        }
        return {
            marginLeft: 50,
            paddingLeft: 35,
            paddingRight: 35,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 20,
            marginRight: 50,
            marginBotton: 10,
            backgroundColor: colorsProvider.closeButtonColor
        }
    }

    getButtonTextStyles() {
        if (this.state.notes != this.state.startingNotes) {
            return [{
                fontSize: 18,
                textAlign: 'center',
                fontFamily: colorsProvider.font,
                color: colorsProvider.whiteColor,
            }, { color: colorsProvider.whiteColor }]
        } else {
            return [{
                fontSize: 18,
                textAlign: 'center',
                fontFamily: colorsProvider.font,
                color: colorsProvider.homeTextColor,
            }, { color: colorsProvider.whiteColor }]
        }
    }


    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={[styles.outerView, { backgroundColor: this.props.color }]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.notesTextInput.isFocused) {
                                    Keyboard.dismiss()
                                }
                                this.notesTextInput.focus();
                            }}
                            style={styles.notesContainer}>
                            <TextInput ref={(input) => { this.notesTextInput = input; }}
                                multiline={true}
                                placeholderTextColor={colorsProvider.whiteColor}
                                placeholder={this.props.placeholder}
                                style={[styles.notesTextInput, { color: colorsProvider.whiteColor }]}
                                value={this.state.notes}
                                onChangeText={value => {
                                    this.setState({ notes: value })
                                    this.props.setNotes(value)
                                }}>
                            </TextInput>
                        </TouchableOpacity>
                        <View style={PixelRatio.get() < 3 ? {marginBottom: 10,} : {marginBottom: 0,}}>
                        <TouchableOpacity style={this.getButtonContainerStyles()}
                            onPress={() => {
                                this.props.closeModal()
                            }}>
                            <Text style={this.getButtonTextStyles()}>{this.state.notes != this.state.startingNotes ? "Save" : "Close"}</Text>
                        </TouchableOpacity></View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}