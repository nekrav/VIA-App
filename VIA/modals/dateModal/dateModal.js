import React from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = require('./styles');

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
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
            itemDate: this.props.itemDate ? new Date(this.props.itemDate) : dateInDate
        };
    }

    setDate = (event, date) => {
        this.props.setDate(date.toString())
        this.setState({
            itemDate: date
        });
    }

    renderSetAndCloseButton(itemDate) {
        if (this.props.fromNotificationTimesModal) {
            return (
                <View style={styles.bottomButtonExtraButtonContainer}>
                    <TouchableOpacity style={[styles.bottomButtonExtraButton, { backgroundColor: itemDate ? this.props.disabledSaveButtonBackgroundColor : this.props.saveButtonBackgroundColor }]}
                        onPress={() => { this.props.onSubmit(this.state.itemDate); this.props.closeModal() }}>
                        <Text style={[styles.bottomButtonText, { color: itemDate ? this.props.saveButtonTextColor : this.props.disabledSaveButtonTextColor }]}>Select And Close</Text>
                    </TouchableOpacity>
                </View>
            )
        }
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
                    {this.props.children}
                    <View style={styles.datePickerView}>
                        <DateTimePicker
                            value={itemDate}
                            mode={this.props.pickerMode}
                            is24Hour={true}
                            minimumDate={dateInDate}
                            display="spinner"
                            onChange={this.setDate}
                        /></View>
                    <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity style={styles.bottomButtonRight}
                            onPress={
                                this.props.closeModal}>
                            <Text style={styles.bottomButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.bottomButtonLeft, { backgroundColor: itemDate ? this.props.disabledSaveButtonBackgroundColor : this.props.saveButtonBackgroundColor }]}
                            onPress={() => this.props.onSubmit(this.state.itemDate)}>
                            <Text style={[styles.bottomButtonText, { color: itemDate ? this.props.saveButtonTextColor : this.props.disabledSaveButtonTextColor }]}>Select</Text>
                        </TouchableOpacity>

                      
                    </View>
                    {this.renderSetAndCloseButton(itemDate)}
                    {/* <View>
                   <TouchableOpacity style={[styles.bottomButtonLeft, {backgroundColor: itemDate ? this.props.disabledSaveButtonBackgroundColor : this.props.saveButtonBackgroundColor}]} 
                    onPress={() => this.props.onSubmit(this.state.itemDate)}>
                        <Text style={[styles.bottomButtonText,{color: itemDate ? this.props.saveButtonTextColor : this.props.disabledSaveButtonTextColor}]}>Select</Text>
                    </TouchableOpacity>
                   </View> */}
                </View>
            </Modal>
        );
    }
}