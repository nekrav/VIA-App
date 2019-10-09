var uuid = require('react-native-uuid');

export class Habits {
    constructor(props) {
        this.id = uuid.v4
        this.name = props.name
        this.created_date = props.created_date
        this.due_time = props.due_time
        this.importance = props.importance
        this.percentage_done = props.percentage_done
        this.completed = props.completed
        this.time_to_spend = props.time_to_spend
        this.notification_time = props.notification_time
        this.days_to_do = props.days_to_do
    }

    static get TABLE_CREATE() {
        return `${Habits.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'created_date text NOT NULL, ' +
        'due_time text, ' +
        'importance text, ' +
        'percentage_done text, ' +
        'completed text, ' +
        'time_to_spend text, ' +
        'notification_time text, ' +
        'days_to_do text' +
        ')'
    }

    static get TABLE_NAME() {
        return 'habits'
    }
}