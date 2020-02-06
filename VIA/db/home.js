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
            'main_goal_1 text, ' +
            'main_goal_1_date text, ' +
            'main_goal_2 text, ' +
            'main_goal_2_date text, ' +
            'main_goal_3 text, ' +
            'main_goal_3_date text, ' +
            'main_goal text, ' +
            'main_goal_date text, ' +
            'quote text, ' +
            'notes text ' +
            ')'
    }

    static get TABLE_NAME() {
        return 'home'
    }
} //Main goal 1//0101010.23r::Main goal 2//91939429::