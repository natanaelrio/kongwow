'use client'
import ReactPixel from 'react-facebook-pixel';

export default function FacebookPixel() {
    const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
    const options = {
        autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
        debug: false, // enable logs
    };

    return ReactPixel.init('507471651919439', advancedMatching, options);
}
