
export default () => {
    let boutonTarck = document.createElement('button');
    boutonTarck.textContent = 'Track';
    document.body.append(boutonTarck);
    let tracked = false;
    function trackListener (event) {
        console.log(event.clientX + '  ' + event.clientY);
    };
    boutonTarck.addEventListener('click', function () {
        tracked = !tracked;
        if (tracked) {
            document.body.addEventListener('mousemove', trackListener);
        } else {
            document.body.removeEventListener('mousemove', trackListener);
        }
    });
};