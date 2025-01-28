'use client'
export const initFacebookPixel = async (pixelId) => {
    if (typeof window !== 'undefined') {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.init(507471651919439);
        // ReactPixel.pageView();
    }
};

export const trackEvent = async (event, data) => {
    if (typeof window !== 'undefined') {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.trackCustom(event, data);
    }
};