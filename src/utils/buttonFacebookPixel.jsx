import ReactPixel from 'react-facebook-pixel';

export default function ButtonFacebookPixel(text, object) {
    return ReactPixel.trackCustom(text, object);
}
