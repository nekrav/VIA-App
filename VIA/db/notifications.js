var uuid = require('react-native-uuid');

export class Notifications {
    constructor(props) {
        this.id = props.id
        this.name = props.name
        this.created_date = props.created_date
        this.end_time = props.end_time
        this.importance = props.importance
        this.percentage_done = props.percentage_done
        this.completed = props.completed
        this.finished_date = props.finished_date
        this.time_to_spend = props.time_to_spend
        this.time_spent = props.time_spent
        this.notification_time = props.notification_time
        this.days_to_do = props.days_to_do
        this.routine = props.routine
        this.properties = props.properties
        this.notes = props.notes
    }

    static get TABLE_CREATE() {
        return `${Notifications.TABLE_NAME} (` +
            'id not null primary key unique, ' +
            'userInfo text, ' +
            'title text NOT NULL, ' +
            'date text NOT NULL,' +
            'message text NOT NULL, ' +
            'playSound text,  ' +
            'soundName text, ' +
            'number text, ' +
            'data text, ' +
            'repeatType text' +
            ')'
    }

    static get TABLE_NAME() {
        return 'notifications'
    }
}