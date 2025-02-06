export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.selector = '';
    }
    onInit() { }
    onDestroy() { }
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.render();
    }
    compileTemplate(template) {
        return template.replace(/\{\{(.*?)\}\}/g, (_, key) => this.state[key.trim()] || '');
    }
    mount(selector) {
        this.selector = selector;
        this.onInit();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.compileTemplate(this.render());
        }
    }
    unmount() {
        this.onDestroy();
        const element = document.querySelector(this.selector);
        if (element) {
            element.innerHTML = '';
        }
    }
}
