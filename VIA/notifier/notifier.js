import React from 'react';
import { Database, Habits, Routines, Projects, Tasks } from '../db'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Controller } from '../screens/controller'

var PushNotification = require("react-native-push-notification");
const controller = new Controller;

export class Notifier extends React.Component {


    registerNotificationService() {
        var PushNotification = require("react-native-push-notification");

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM (OR FCM) SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true
        });
    }

    getAllProjectTimes() {
        Database.getAll(Projects.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}

                let projectsWithNotifications = []
                for (let i = 0; i < len; i++) {
                    let notificationTimes = [];
                    item = res.rows.item(i)
                    if (item.notification_time != '') {
                        nt = JSON.parse('[' + item.notification_time + ']')
                        for (let i = 0; i < nt.length; i++) {
                            if (nt[i].checked == true) {
                                notificationTimes.push(nt[i])
                            }
                            
                        }
                        let proj = { name: item.name, notificationTimes: notificationTimes }
                        projectsWithNotifications.push(proj)
                    }
                }
                console.warn(projectsWithNotifications)
            })
    }
    getAllTaskTimes() {

    }
    getAllRoutineTimes() {

    }
    getAllHabitTimes() {

    }


    launchNotification() {
        this.getAllProjectTimes()
        PushNotification.localNotificationSchedule({
            title: "My Notification Title", // (optional)
            date: new Date(Date.now() + 5 * 1000),
            message: "My Notification Message", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
    }

    cancelAllNotifications() {
        PushNotification.cancelAllLocalNotifications()
    }

}