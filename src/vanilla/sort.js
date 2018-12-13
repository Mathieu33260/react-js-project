import moment from 'moment';

export default tweets => {
    return tweets.sort(function (a, b) {
        return moment(a.created_at).unix() - moment(b.created_at).unix();
    });
};