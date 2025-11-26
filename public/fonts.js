import localFont from 'next/font/local';

export const avenir = localFont({
    src: [
        {
            path: "public/fonts/avenir-roman.ttf",
            weight: '400',
            style: 'normal',
        },
        {
            path: "public/fonts/avenir-medium.ttf",
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/avenir-black.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: "--font-avenir",
});