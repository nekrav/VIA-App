import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import { NotesModal } from '../modals/notesModal/notesModal';

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
                        this.setState({notes: item})
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
                    style={{
                        height: "58%",
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: colorsProvider.topBarColor,
                        borderRadius: 20
                    }}
                    onPress={() => {
                        this.setNotesModalVisibility(true);
                    }}>
                    <View style={{ margin: 10, flexDirection: 'column' }}>
                        <Text style={{
                            marginLeft: 5,
                            marginTop: 5,
                            fontFamily: colorsProvider.font,
                            fontSize: colorsProvider.fontSizeSmall,
                            color: colorsProvider.whiteColor
                        }}>{this.state.notes}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        height: "58%",
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: colorsProvider.topBarColor,
                        borderRadius: 20
                    }}
                    onPress={() => {
                        this.setNotesModalVisibility(true);
                    }}>
                    <View style={{ margin: 10, flexDirection: 'column' }}>
                        <Text style={{
                            marginLeft: 5,
                            marginTop: 5,
                            fontFamily: colorsProvider.font,
                            fontSize: colorsProvider.fontSizeSmall,
                            color: colorsProvider.whiteColor
                        }}>No Notes...</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return <View>
            {this.renderNotesModal()}
            {this.renderNotes()}
        </View>
    }
}