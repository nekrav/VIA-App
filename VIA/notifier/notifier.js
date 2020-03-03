import React from 'react';
import { Database, Habits, Routines, Projects, Tasks, Random } from '../db'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Controller } from '../screens/controller'

var PushNotification = require("react-native-push-notification");

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
    getAllObjectNotificationTimes(tableName) {
        return new Promise((resolve, reject) => {
            Database.getAll(tableName)
                .then((res) => {
                    const len = res.rows.length;
                    let item = {}
                    let itemsWithNotifications = []
                    for (let i = 0; i < len; i++) {
                        let notificationTimes = [];
                        item = res.rows.item(i)
                        if (item.notification_time != '') {
                            nt = JSON.parse('[' + item.notification_time + ']')
                            for (let j = 0; j < nt.length; j++) {
                                if (nt[j].checked == true) {
                                    dayWithTimes = nt[j]
                                    ntTimes = nt[j].times
                                    for (let k = 0; k < ntTimes.length; k++) {
                                        let day = dayWithTimes.key
                                        let hour = ntTimes[k].split(':')[0]
                                        let minute = ntTimes[k].split(':')[1]
                                        let ampm = minute.slice(-2);
                                        if (ampm == 'PM') {
                                            hour = parseInt(hour) + 12;
                                        }
                                        var date = new Date();

                                        var currentDay = date.getDay();

                                        var distance = parseInt(day) - currentDay;

                                        date.setDate(date.getDate() + distance);
                                        date.setHours(parseInt(hour))
                                        date.setMinutes(parseInt(minute))
                                        date.setSeconds(0)

                                        // if (date < new Date()) {
                                        //     date.setDate(date.getDate() + 7)
                                        // }
                                        notificationTimes.push(date.toString())

                                    }
                                    let it = { name: item.name, notificationTimes: notificationTimes }
                                }
                            }
                            if (notificationTimes.length > 0) {
                                itemsWithNotifications.push({ item: item, notificationTimes: notificationTimes })
                            }

                        }
                    }
                    resolve(itemsWithNotifications)
                })
        })
    }

    scheduleProjectNotifications() {
        this.getAllObjectNotificationTimes(Projects.TABLE_NAME).then((res) => {
            for (let i = 0; i < res.length; i++) {

                let title = "Time to start your project: " + res[i].item.name
                let message = "This project is " + Math.trunc(res[i].item.percentage_done) + "%% done"
                for (let j = 0; j < res[i].notificationTimes.length; j++) {
                    PushNotification.localNotificationSchedule({
                        title: title,
                        date: new Date(res[i].notificationTimes[j]),
                        message: message,
                        playSound: true,
                        soundName: 'default',
                        repeatType: 'week',
                    });
                }
            }
        })
    }

    scheduleTaskNotifications() {
        this.getAllObjectNotificationTimes(Tasks.TABLE_NAME).then((res) => {
            for (let i = 0; i < res.length; i++) {

                let title = "Time to start your task: " + res[i].item.name
                let message = "This task is " + Math.trunc(res[i].item.percentage_done) + "%% done"
                for (let j = 0; j < res[i].notificationTimes.length; j++) {
                    PushNotification.localNotificationSchedule({
                        title: title,
                        date: new Date(res[i].notificationTimes[j]),
                        message: message,
                        playSound: true,
                        soundName: 'default',
                        repeatType: 'week',
                    });
                }
            }
        })
    }

    scheduleRoutineNotifications() {
        this.getAllObjectNotificationTimes(Routines.TABLE_NAME).then((res) => {
            for (let i = 0; i < res.length; i++) {

                let title = "Time to start your routine: " + res[i].item.name
                let message = "You can do it!"
                for (let j = 0; j < res[i].notificationTimes.length; j++) {
                    PushNotification.localNotificationSchedule({
                        title: title,
                        date: new Date(res[i].notificationTimes[j]),
                        message: message,
                        playSound: true,
                        soundName: 'default',
                        repeatType: 'week',
                    });
                }
            }
        })
    }

    scheduleHabitsNotifications() {
        this.getAllObjectNotificationTimes(Habits.TABLE_NAME).then((res) => {
            for (let i = 0; i < res.length; i++) {

                let title = "Time to start your habit: " + res[i].item.name
                let message = "Good habits are the foundation to success!"

                for (let j = 0; j < res[i].notificationTimes.length; j++) {
                    PushNotification.localNotificationSchedule({
                        title: title,
                        date: new Date(res[i].notificationTimes[j]),
                        message: message,
                        playSound: true,
                        soundName: 'default',
                        repeatType: 'week',
                    });
                }
            }
        })
    }

    scheduleRandomNotifications() {
        this.getAllObjectNotificationTimes(Random.TABLE_NAME).then((res) => {
            for (let i = 0; i < res.length; i++) {

                let title = "Time to start your popup task: " + res[i].item.name
                let message = "Things pop up!"

                for (let j = 0; j < res[i].notificationTimes.length; j++) {
                    PushNotification.localNotificationSchedule({
                        title: title,
                        date: new Date(res[i].notificationTimes[j]),
                        message: message,
                        playSound: true,
                        soundName: 'default',
                        repeatType: 'week',
                    });
                }
            }
        })
    }

    scheduleAllNotifications() {
        this.cancelAllNotifications();
        this.scheduleHabitsNotifications();
        this.scheduleTaskNotifications();
        this.scheduleRoutineNotifications();
        this.scheduleProjectNotifications();
        this.scheduleRandomNotifications();
    }


    launchNotification() {
        this.getAllProjectTimes()
        PushNotification.localNotificationSchedule({
            title: "My Notification Title", // (optional)
            date: new Date(Date.now() + 5 * 1000), //in 5 seconds
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