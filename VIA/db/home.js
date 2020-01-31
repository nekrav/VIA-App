var uuid = require('react-native-uuid');

export class Home {
    constructor(props) {
        this.id = uuid.v4
        this.three_main_goals = props.three_main_goals
        this.main_goal = props.main_goal
        this.quote = props.quote
        this.notes = props.notes
    }

    static get TABLE_CREATE() {
        return `${Home.TABLE_NAME} (` +
            'id text not null primary key unique, ' +
            'three_main_goals text, ' +
            'main_goal text, ' +
            'quote text, ' +
            'notes text ' +
            // ' text, ' +
            // 'percentage_done text, ' +
            // 'completed text, ' +
            // 'time_spent text, ' +
            // 'notes text,' + 
            // 'notification_time ' +
            ')'
    }

    static get TABLE_NAME() {
        return 'home'
    }
}