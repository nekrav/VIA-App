import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList } from 'react-native'; // Version can be specified in package.json
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'

const styles = require('./styles');

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds


const todaysDate = year + '-' + month + '-' + date;
const dateInDate = new Date(year, month, date);


export class DateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemDate: dateInDate
        };
    }

    setDate = (event, date) => {
        this.props.setDate(date.toString())
        this.setState({
            itemDate: date
        });
    }

    render() {
        const {itemDate} = this.state
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={styles.outerView}>
                    {this.props.children}
                    <View style={styles.title}>
                        <Text>Select {this.props.itemName} </Text>
                    </View>
                    <DateTimePicker
                        value={itemDate}
                        mode='date'
                        is24Hour={true}
                        minimumDate={dateInDate}
                        display="default"
                        onChange={this.setDate}
                    />
                    <View>
                        <TouchableOpacity onPress={this.props.closeModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

}