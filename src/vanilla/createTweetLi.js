import moment from 'moment';

export default tweet => {
    let li = document.createElement('li');
    let date = moment(tweet.created_at);
    let fromNow = date.fromNow();
    li.textContent = fromNow + ' : ' + tweet.text;
    if (localStorage.getItem('favs')) {
        if (JSON.parse(localStorage.getItem('favs')).includes(tweet.id_str)) {
            li.classList.add('fav');
            li.style.backgroundColor = 'aqua';
        }
    }
    let isFav = true;
    let bouton = document.createElement('button');
    bouton.textContent = 'Fav';
    bouton.addEventListener('click', function () {
        if (isFav) {
            li.classList.add('fav');
            li.style.backgroundColor = 'aqua';
            let favs = new Set();
            if (localStorage.getItem('favs')) {
                favs = new Set(JSON.parse(localStorage.getItem('favs')));
            }
            favs.add(tweet.id_str);
            localStorage.setItem('favs', JSON.stringify(Array.from(favs)));
        } else {
            li.classList.remove('fav');
            li.style.backgroundColor = '';
            let favs = [];
            if (localStorage.getItem('favs')) {
                favs = JSON.parse(localStorage.getItem('favs'));
            }
            let index = favs.indexOf(tweet.id_str);
            if (index > -1) {
                favs.splice(index, 1);
            }
            localStorage.setItem('favs', JSON.stringify(favs));
        }
        isFav = !isFav;
    });
    li.append(bouton);
    return li;
};