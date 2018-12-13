import { isTweetFr} from "../utils";

describe('isTweetFr', () => {

    it('doit renvoyer true pour un tweet en francais', () => {
        var tweet = {
            lang : "fr"
        };
        var maValeur = isTweetFr(tweet);

        expect(maValeur).toBe(true);

    });

    it('doit renvoyer false pour un tweet en anglais ou sans langue', () => {
        var tweet = {
            lang : "en"
        };
        var tweet2 = {
            lang : ""
        };
        var maValeur = isTweetFr(tweet);
        var maValeur2 = isTweetFr(tweet2);


        expect(maValeur).toBe(false);
        expect(maValeur2).toBe(false);
    });

    it('doit renvoyer true pour le francais canadien', () => {
        var tweet = {
            lang : "fr-ca"
        };
        var maValeur = isTweetFr(tweet);

        expect(maValeur).toBe(true);
    });

    it('doit renvoyer une exception pour un tweet undefined', () => {

        var maValeur = isTweetFr;

        expect(maValeur).toThrow();
    });
});