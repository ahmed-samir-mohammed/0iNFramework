import { Component } from '0injsframework';

export class AppComponent extends Component {
    protected state = {
        title: 'Hello, World!',
        message: 'This is a test app.'
    };
    render(): string {
        return `
            <div>
                <h1>{{ state.title }}</h1>
                <p>{{ state.message }}</p>
            </div>
        `;
    }
 }