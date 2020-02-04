var uuid = require('react-native-uuid');

export class Home {
    constructor(props) {
        this.id =  'homeID1'
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
            ')'
    }

    static get TABLE_NAME() {
        return 'home'
    }
}