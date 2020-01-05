import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList } from 'react-native'; // Version can be specified in package.json
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import { TabView, SceneMap } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';

const styles = require('./styles');

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds


const todaysDate = year + '-' + month + '-' + date;
const dateInDate = new Date(year, month, date);


export class NotificationTimesModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemDate: this.props.itemDate ? new Date(this.props.itemDate) : dateInDate,
            mondayChecked: false,
        };
    }

    setDate = (event, date) => {
        this.props.setDate(date.toString())
        this.setState({
            itemDate: date
        });
    }

    render() {

        const { itemDate } = this.state
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={styles.outerView}>
                    <View style={styles.weekdayNotificationContainer}>
                        <CheckBox
                            center
                            title='Monday'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'

                            checked={this.state.mondayChecked}
                            textStyle={styles.checkboxText}
                            containerStyle={styles.weekSelectionContainer}
                            onPress={() => this.setState({ mondayChecked: !this.state.mondayChecked })}
                        />
                        <TouchableOpacity style={styles.addTimeButtonContainer}><SIcon name="plus" size={16} color="#000" /><Text style={styles.addTimeButtonText}>Add Time</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.bottomButtonRight}
                        onPress={
                            this.props.closeModal}>
                        <Text style={styles.bottomButtonText}>Close</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        );
    }
}