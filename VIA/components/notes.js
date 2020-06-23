import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, Keyboard } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import { NotesModal } from '../modals/notesModal/notesModal';
import KeyboardListener from 'react-native-keyboard-listener';


import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: this.props.notes,
            notesModalVisible: false,
        };
    }

    setNotesModalVisibility(visible) {
        this.setState({ notesModalVisible: visible });
    }

    renderNotesModal() {
        if (this.state.notesModalVisible) {
            return (
                <NotesModal
                    animationType="slide"
                    transparent={true}
                    existingNotes={this.state.notes}
                    backgroundColor={colorsProvider.tasksMainColor}
                    buttonContainerNotChangedColor={colorsProvider.tasksPlaceholderColor}
                    buttonContainerTextNotChangedColor={colorsProvider.tasksMainColor}
                    textPlaceholderColor={colorsProvider.tasksPlaceholderColor}
                    textChangedColor={colorsProvider.tasksComplimentaryColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    buttonTextPlaceholderColor={colorsProvider.whiteColor}
                    placeholder={'Notes...'}
                    setNotes={item => {
                        this.setState({ notes: item })
                        this.props.editNotes(item)
                    }}
                    closeModal={() => {
                        this.setNotesModalVisibility(false);
                    }}
                ></NotesModal>
            );
        }
        return null;
    }

    renderNotes() {
        if (this.state.notes) {
            return (
                <TouchableOpacity
                onPress={() => {
                    if (this.state.keyboardOpen)
                    {
                        Keyboard.dismiss()
                    } else {
                        this.setNotesModalVisibility(true);
                        Keyboard.dismiss()
                    }
                    
                }}
                    style={{
                        // flex: 2,
                        flexDirection: 'column',
                        height: "58%",
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        // marginBottom: 10,
                        backgroundColor: colorsProvider.topBarColor,
                        borderRadius: 20
                    }}>
                    <Text style={{
                        marginLeft: 10,
                        marginTop: 10,
                        fontFamily: colorsProvider.font,
                        fontSize: colorsProvider.fontSizeSmall,
                        color: colorsProvider.whiteColor
                    }}>{this.state.notes}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (this.state.keyboardOpen)
                        {
                            Keyboard.dismiss()
                        } else {
                            this.setNotesModalVisibility(true);
                            Keyboard.dismiss()
                        }
                        
                    }}
                    style={{
                        // flex: 2,
                        flexDirection: 'column',
                        height: "58%",
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        // marginBottom: 10,
                        backgroundColor: colorsProvider.topBarColor,
                        borderRadius: 20
                    }}>
                    <Text style={{
                        marginLeft: 10,
                        marginTop: 10,
                        fontFamily: colorsProvider.font,
                        fontSize: colorsProvider.fontSizeSmall,
                        color: colorsProvider.whiteColor
                    }}>No Notes...</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return <View style={{ flex: 1, marginBottom: 10, }}>
            <KeyboardListener
                onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                onWillHide={() => { this.setState({ keyboardOpen: false }); }}
            />
            {this.renderNotesModal()}
            {this.renderNotes()}
        </View>
    }
}