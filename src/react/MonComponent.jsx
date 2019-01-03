import React from 'react';
import jsonGet from "../vanilla/jsonGet";
import FilterBtn from './FilterBtn.jsx';
import FilterAuthor from './FilterAuthor.jsx';
import Liste from './Liste.jsx';
import {isTweetFr} from '../vanilla/utils.js'
import HashtagList from "./HashtagList.jsx";
import SortDateBtn from './SortDateBtn.jsx';

export default class MonComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            isFr: true,
            sortDate: false,
            tweets: [],
            author: '',
            hashtags: [],
            hashtagsSelected: []
        };
        this.setLangue = this.setLangue.bind(this);
        this.setAuthor = this.setAuthor.bind(this);
        this.setHashtag = this.setHashtag.bind(this);
        this.filterAutor = this.filterAutor.bind(this);
        this.filterHashtag = this.filterHashtag.bind(this);
        this.getHashtagsTweet = this.getHashtagsTweet.bind(this);
        this.getAllHashtags = this.getAllHashtags.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    setDate() {
        this.setState({
            sortDate: !this.state.sortDate
        });
    }

    setLangue() {
        this.setState({
            isFr: !this.state.isFr
        });
    }

    setAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    setHashtag(e) {
        if (!e.target.value) {
            this.setState({
                hashtagsSelected: []
            });
        } else if (this.state.hashtagsSelected.includes(e.target.value)) {
            let hashtags = this.state.hashtagsSelected.filter(hash => hash !== e.target.value);
            this.setState({
                hashtagsSelected: hashtags
            });
        } else {
            this.setState({
                hashtagsSelected: [...this.state.hashtagsSelected, e.target.value]
            });
        }
    }

    getHashtagsTweet(tweet) {
        return tweet.entities.hashtags.map(hash => hash.text);
    }

    getAllHashtags(tweets) {
        return tweets.map(this.getHashtagsTweet).reduce((a,b) => a.concat(b));
    }

    filterAutor(tweet) {
        return tweet.user.name.includes(this.state.author)
    }

    sortDate(t1, t2) {
        let date1 = new Date(Date.parse(t1.created_at));
        let date2 = new Date(Date.parse(t2.created_at));
        return date1 - date2;
    }

    filterHashtag(tweet) {
        return tweet.entities.hashtags.some(
            t => this.state.hashtagsSelected.some(
                h => t.text.includes(h)
            )
        )
    }

    componentDidMount() {
        let url1 = 'https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets.json';
        let url2 = 'https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets2.json';
        Promise.all([url1, url2].map(jsonGet)).then((result) => {
            let tweets = result[0].concat(result[1]);
            let hashtags = this.getAllHashtags(tweets);
            this.setState({tweets});
            this.setState({hashtags});
        }, { once: true });
    }

    render() {
        let tweets = this.state.isFr ? this.state.tweets.filter(isTweetFr) : this.state.tweets;
        tweets = tweets.filter(this.filterAutor);
        tweets = this.state.hashtagsSelected.length !== 0 ? tweets.filter(this.filterHashtag) : tweets;
        tweets = this.state.sortDate ? tweets.sort(this.sortDate) : tweets;
        return (
            <div>
                <FilterBtn filter={this.setLangue}/>
                <FilterAuthor filter={this.setAuthor}/>
                <Liste tweetList={tweets}/>
                <HashtagList filter={this.setHashtag} hashtagsSelected={this.state.hashtagsSelected}
                             hashtagList={this.state.hashtags}/>
                <SortDateBtn sortDate={this.setDate} />
            </div>
        )
    }
}