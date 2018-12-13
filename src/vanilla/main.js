import createTrackingButton from './createTrackingButton.js';
import createTweetsOl from './createTweetsOl.js';
import jsonGet from './jsonGet.js';
import { isTweetFr } from './utils';

document.addEventListener('DOMContentLoaded', function (e) {
    let url1 = 'https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets.json';
    let url2 = 'https://raw.githubusercontent.com/iOiurson/formation/correction/data/tweets2.json';
    Promise.all([url1, url2].map(jsonGet)).then((result) => {
        let tweets = result[0].concat(result[1]);
        let bouton = document.createElement('button');
        let clicked = false;
        let div = document.createElement('div');
        document.body.append(div);

        console.log(tweets);

        bouton.textContent = 'Click';
        document.body.append(bouton);

        bouton.addEventListener('click', () => {
            clicked = !clicked;
            let newUl = createTweetsOl(tweets.filter(filtre));
            ul.replaceWith(newUl);
            ul = newUl;
        });
        createTrackingButton();

        let ul = createTweetsOl(tweets);

        div.append(ul);

        let filtre = (tweet) => {
            if (clicked && isTweetFr(tweet)) {
                return true;
            } else if (!clicked) {
                return true;
            }
        };
    });
}, { once: true });