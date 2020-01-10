import React from 'react';
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
        };
    }


    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={styles.outerView}>
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
                                placeholderTextColor="#B0B0B0"
                                placeholder={this.props.placeholder}
                                style={styles.notesTextInput}>
                            </TextInput>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomButtonContainer}
                            onPress={() => {
                                this.setDate(null, this.state.times)
                                this.props.closeModal()
                            }}>
                            <Text style={styles.bottomButtonText}>Close</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}