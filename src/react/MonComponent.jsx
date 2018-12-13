import React from 'react';
import jsonGet from "../vanilla/jsonGet";
import FilterBtn from './FilterBtn.jsx';
import FilterAuthor from './FilterAuthor.jsx';
import Liste from './Liste.jsx';
import {isTweetFr} from '../vanilla/utils.js'
import HashtagList from "./HashtagList.jsx";

export default class MonComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            isFr: true,
            tweets: [],
            author: '',
            hashtags: [],
            hashtag: ''
        };
        this.setLangue = this.setLangue.bind(this);
        this.setAuthor = this.setAuthor.bind(this);
        this.setHashtag = this.setHashtag.bind(this);
        this.filterAutor = this.filterAutor.bind(this);
        this.filterHashtag = this.filterHashtag.bind(this);
        this.getHashtags = this.getHashtags.bind(this);
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
        this.setState({
            hashtag: e.target.value
        });
    }

    getHashtags(tweet) {
        return tweet.entities.hashtags.map(hash => hash.text);
    }

    filterAutor(tweet) {
        return tweet.user.name.includes(this.state.author)
    }

    // filterHashtag(tweet) {
    //     return this.state.tweets.filter((tweet) => {
    //         return tweet.entities.hashtags.some(t => (t.text.includes(this.state.hashtag)))
    //     })
    // }

    filterHashtag(tweet) {
        return tweet.entities.hashtags.some(t => (t.text.includes(this.state.hashtag)))
    }

    componentDidMount() {
        let url1 = 'https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets.json';
        let url2 = 'https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets2.json';
        Promise.all([url1, url2].map(jsonGet)).then((result) => {
            let tweets = result[0].concat(result[1]);
            this.setState({tweets});
        }, { once: true });
    }

    render() {
        let tweets = this.state.isFr ? this.state.tweets.filter(isTweetFr) : this.state.tweets;
        tweets = tweets.filter(this.filterAutor);
        tweets = this.state.hashtag !== '' ? tweets.filter(this.filterHashtag) : tweets;
        let hashtags = this.state.hashtags;
        if (tweets.length > 0) {
            hashtags = tweets.map(this.getHashtags).reduce((a,b) => a.concat(b));
        }
        console.log(this.state.hashtag);
        return (
            <div>
                <FilterBtn filter={this.setLangue}/>
                <FilterAuthor filter={this.setAuthor}/>
                <Liste tweetList={tweets}/>
                <HashtagList filter={this.setHashtag} hashtagList={hashtags}/>
            </div>
        )
    }
}