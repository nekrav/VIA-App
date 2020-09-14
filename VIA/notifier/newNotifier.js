import React from 'react';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import { Database, Habits, Routines, Projects, Tasks, Random } from '../db'

import NotificationHandler from './handler';

export default class NotifService {
    constructor(onRegister, onNotification) {
        this.lastId = 0;
        this.lastChannelCounter = 0;

        NotificationHandler.attachRegister(onRegister);
        NotificationHandler.attachNotification(onNotification);

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber(function (number) {
            if (number > 0) {
                PushNotification.setApplicationIconBadgeNumber(0);
            }
        });

        // PushNotification.getChannels(function (channels) {
        //     console.log(channels);
        // });
    }

    createOrUpdateChannel() {
        this.lastChannelCounter++;
        PushNotification.createChannel(
            {
                channelId: "all-notification-channel", // (required)
                channelName: `All Notifications Channel - Counter: ${this.lastChannelCounter}`, // (required)
                channelDescription: `All notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    popInitialNotification() {
        PushNotification.popInitialNotification((notification) => console.log('InitialNotification:', notification));
    }

    localNotif(soundName) {
        this.lastId++;
        PushNotification.localNotification({
            /* Android Only Properties */
            ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
            subText: 'This is a subText', // (optional) default: none
            color: 'red', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            /* iOS only properties */
            alertAction: 'view', // (optional) default: view
            category: '', // (optional) default: empty string

            /* iOS and Android properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: 'Local Notification', // (optional)
            message: 'My Notification Message', // (required)
            userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: !!soundName, // (optional) default: true
            soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        });
    }

    scheduleNotif(soundName) {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + 30 * 1000), // in 30 secs

            /* Android Only Properties */
            ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
            subText: 'This is a subText', // (optional) default: none
            color: 'blue', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
            invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            /* iOS only properties */
            alertAction: 'view', // (optional) default: view
            category: '', // (optional) default: empty string

            /* iOS and Android properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: 'Scheduled Notification', // (optional)
            message: 'My Notification Message', // (required)
            userInfo: { sceen: "home" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: !!soundName, // (optional) default: true
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }

    checkPermission(cbk) {
        return PushNotification.checkPermissions(cbk);
    }

    requestPermissions() {
        return PushNotification.requestPermissions();
    }

    cancelNotif() {
        PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }

    abandonPermissions() {
        PushNotification.abandonPermissions();
    }

    getScheduledLocalNotifications(callback) {
        PushNotification.getScheduledLocalNotifications(callback);
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
                            nt = JSON.parse(item.notification_time)
                            for (let j = 0; j < nt.length; j++) {
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

                                    // date.setDate(date.getDate() + distance);
                                    date.setDate(date.getDate());
                                    date.setHours(parseInt(hour))
                                    date.setMinutes(parseInt(minute))
                                    date.setSeconds(0)

                                    notificationTimes.push(date.toString())

                                }
                                let it = { name: item.name, notificationTimes: notificationTimes }
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
        console.warn("awieufh")
        this.getAllObjectNotificationTimes(Projects.TABLE_NAME).then((res) => {
            for (let i = 0; i < res.length; i++) {
                console.warn(res)
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
                console.warn("aowieu")
                console.warn(res)
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