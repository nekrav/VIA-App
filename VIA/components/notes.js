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
            return (<View><Text>aweilfhaweiuf</Text></View>)
        } else {
            return (
                <TouchableOpacity
                    style={{ backgroundColor: colorsProvider.habitsComplimentaryColor }}
                    onPress={() => {
                        this.setNotesModalVisibility(true);
                    }}>
                    <View style={{ flex: 1, margin: 10, marginBottom: 40, backgroundColor: colorsProvider.topBarColor, flexDirection: 'column' }}>
                        <Text>No Notes</Text>
                        <Text>No Notes</Text>
                        <Text>No Notes</Text></View>
                </TouchableOpacity>
            )
        }
        // if (this.state.notes) {
        //     console.warn("ghrynryh")
        //     return (
        //         <TouchableOpacity
        //             style={{ backgroundColor: colorsProvider.topBarColor }}
        //             onPress={() => {
        //                 this.setNotesModalVisibility(true);
        //             }}
        //         >
        //             <Text
        //                 style={{}}
        //                 multiline={true}
        //                 onChangeText={this.props.notes}>
        //                 {this.state.notes}
        //             </Text>
        //         </TouchableOpacity>
        //     );
        // } else {
        //     console.warn("Aaewf")
        //     return (
        //         <View style={{  flexDirection: 'column', marginBottom: 10, backgroundColor: colorsProvider.topBarColor }}>
        //             <TouchableOpacity
        //                 style={{ backgroundColor: colorsProvider.topBarColor }}
        //                 onPress={() => {
        //                     this.setNotesModalVisibility(true);
        //                 }}>
        //                 {/* <Text
        //                     style={{ color: colorsProvider.topBarColor }}
        //                     multiline={true}
        //                     onChangeText={this.props.notes}>
        //                     Notes ...</Text> */}
        //             </TouchableOpacity>
        //         </View>
        //     );
        // }
    }

    render() {
        return <View>
            {this.renderNotesModal()}
            {this.renderNotes()}
        </View>
    }
}