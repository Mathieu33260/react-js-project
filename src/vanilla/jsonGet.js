
export default url => {
    return fetch(url)
        .then((response) => response.json())
        .then((responseJSON) => {
            return responseJSON;
        })
        .catch(function (e) { console.error(e); });
};
