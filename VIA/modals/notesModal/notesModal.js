import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'; // Version can be specified in package.json
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import { TabView, SceneMap } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { DateModal } from '../dateModal/dateModal'


const styles = require('./styles');

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
            return [styles.modifiedBottomButtonContainer, { borderColor: this.props.textChangedColor, backgroundColor: this.props.textChangedColor }]
        }
        return [styles.modifiedBottomButtonContainer, {  backgroundColor: this.props.buttonContainerNotChangedColor }]

    }

    getButtonTextStyles() {
        if (this.state.notes != this.state.startingNotes) {
            return [styles.modifiedBottomButtonText, { color: this.props.buttonTextPlaceholderColor }]
        } else {
            return [styles.bottomButtonText, { color: this.props.buttonContainerTextNotChangedColor }]
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
                    <SafeAreaView style={[styles.outerView, { backgroundColor: colorsProvider.topBarColor }]}>
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
                                placeholderTextColor={this.props.textPlaceholderColor}
                                placeholder={this.props.placeholder}
                                style={[styles.notesTextInput, { color: colorsProvider.whiteColor }]}
                                value={this.state.notes}
                                onChangeText={value => {
                                    this.setState({ notes: value })
                                    this.props.setNotes(value)
                                }}>
                            </TextInput>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.getButtonContainerStyles()}
                            onPress={() => {
                                this.props.closeModal()
                            }}>
                            <Text style={this.getButtonTextStyles()}>{this.state.notes != this.state.startingNotes ? "Save" : "Close"}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}