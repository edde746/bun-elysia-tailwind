import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import base from './base'
import postcss from 'postcss'
import crypto from 'crypto'

type Page = {
    render: (props: any) => string,
    head?: (props: any) => string,
};

let styles: { css: string, hash: string };
const buildStyles = async () => {
    const css = await postcss([require('tailwindcss'), require('autoprefixer')]).process(await Bun.file('./src/styles.css').text()).async().then((x: any) => x.css);
    const hash = await crypto.createHash('md5').update(css).digest('base64url');
    styles = { css, hash };
};
await buildStyles();

const render = ({ render, head }: Page, data: any) => {
    const body = render(data);
    const headContent = head ? head(data) : '';
    return base(`<link rel="stylesheet" href="/${styles.hash}.css">\n${headContent}`, body);
};

new Elysia()
    .use(html())
    .get(`/${styles!.hash}.css`, async ({ set }) => {
        set.headers['Content-Type'] = 'text/css';
        set.headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        return styles.css;
    })
    .get('/', () => {
        return render(require('./pages/Home'), { some: 'world' })
    })
    .listen(8081);