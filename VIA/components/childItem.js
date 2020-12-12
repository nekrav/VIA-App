import React from 'react';
import * as colorsProvider from './colorsProvider';
import {
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import FIcon from 'react-native-vector-icons/dist/FontAwesome';
import { CheckBox } from 'react-native-elements';
import { Controller } from '../screens/controller';

const controller = new Controller();

const styles = require('./styles');

export class ChildItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            item: this.props.item,
            importance: this.props.importance,
            completed: this.props.completed,
        };
    }

    getImportanceColor(importance) {
        switch (parseInt(importance)) {
            case 1:
                return colorsProvider.notINotUColor;
            case 2:
                return colorsProvider.notIUColor;
            case 3:
                return colorsProvider.iNotUColor;
            case 4:
                return colorsProvider.iUColor;
            default:
                return colorsProvider.whiteColor;
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => { }}>
                <View
                    style={[
                        styles.childItemOuterContainer,
                        { borderColor: this.props.childMainColor },
                    ]}
                >
                    <View style={styles.childItemInnerContainer}>
                        <FIcon
                            name="exclamation-circle"
                            size={20}
                            color={this.getImportanceColor(this.props.item.importance)}
                            style={styles.childItemImportanceIcon}
                        />
                        <CheckBox
                            center
                            checkedIcon={colorsProvider.checkboxIcon}
                            uncheckedIcon={colorsProvider.checkboxIcon}
                            checkedColor={colorsProvider.finishedBackgroundColor}
                            uncheckedColor={colorsProvider.routinesComplimentaryColor}
                            containerStyle={colorsProvider.checkboxContainerStyle}
                            size={colorsProvider.checkboxIconSize}
                            checked={controller.getChecked(this.props.item.completed)}
                            onPress={() => {
                                var newItem = this.state.item;
                                newItem.completed = !controller.getChecked(this.state.completed);
                                this.setState({ item: newItem, completed: newItem.completed });
                                this.props.childUpdateCompleted(newItem);

                                if (this.state.item.completed == true) {
                                    newItem.finished_date = new Date(Date.now());
                                } else {
                                    newItem.finished_date == '';
                                }
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.childItemTextContainer}
                        onPress={(item) => {
                            this.props.goToItem(this.state.item);
                        }}>
                        <Text
                            numberOfLines={1}
                            style={[styles.childItemText, { color: this.props.childMainColor }]}>
                            {this.props.name}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.childItemTextContainer}
                        onPress={(item) => {
                            this.props.deleteItem(this.state.item);
                        }}>
                       <IIcon
                            size={20}
                            style={styles.childItemArrowIcon}
                            color={this.props.childMainColor}
                            name="trash"
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.childItemArrowIconContainer}>
                        <IIcon
                            size={20}
                            style={styles.childItemArrowIcon}
                            color={this.props.childMainColor}
                            name="ios-arrow-forward"
                        />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
