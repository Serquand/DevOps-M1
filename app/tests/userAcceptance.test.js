const dotenv = require("dotenv");
dotenv.config();

const { JSDOM } = require('jsdom');

describe('User Acceptance Test', () => {
    let website;

    beforeAll(async () => {
        website = await fetch(`http://${process.env.HOST_IP}:3000`);
    });

    it('Is the website reachable', () => expect(website.status).toBe(200))

    it('Does the website have the main titles', async () => {
        const htmlContent = await website.text();
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;

        const mainTitle = document.querySelector('h1').textContent
        const toDoTitle = document.querySelector('#todo-container h2').textContent
        const doneTitle = document.querySelector('#done-container h2').textContent

        expect(mainTitle).toBe("DevOps M1 | Project")
        expect(toDoTitle).toBe("To Do List")
        expect(doneTitle).toBe("Done List")
    })
});