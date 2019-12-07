import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList } from 'react-native'; // Version can be specified in package.json
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = require('./styles');

const todaysDate = new Date().getDate();

export class DateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.date,

        };
    }

    render() {
        if (this.state.items != null) {
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
                            value={todaysDate}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate} />
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
}