var uuid = require('react-native-uuid');

export class Habits {
    constructor(props) {
        this.id = uuid.v4
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
        this.routineName = props.routineName
        this.properties = props.properties
        this.notes = props.notes
    }

    static get TABLE_CREATE() {
        return `${Habits.TABLE_NAME} (` +
            'id text not null primary key unique, ' +
            'name text NOT NULL, ' +
            'created_date text NOT NULL, ' +
            'finished_date text, ' +
            'start_time text, ' +
            'end_time text, ' +
            'importance text, ' +
            'percentage_done text, ' +
            'completed text, ' +
            'time_to_spend text, ' +
            'time_spent text, ' +
            'notification_time text, ' +
            'days_to_do text, ' +
            'routine text, ' +
            'routineName text, ' +
            'properties text, ' +
            'notes text ' +
            ')'
    }

    static get TABLE_NAME() {
        return 'habits'
    }
}