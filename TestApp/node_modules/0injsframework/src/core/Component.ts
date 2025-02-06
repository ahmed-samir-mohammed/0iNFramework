export abstract class Component {
  protected state: Record<string, any> = {};
  private selector: string = '';

  constructor(protected props: Record<string, any> = {}) {}

  onInit(): void {}
  onDestroy(): void {}

  setState(newState: Record<string, any>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  private compileTemplate(template: string): string {
    return template.replace(
      /\{\{(.*?)\}\}/g,
      (_, key) => this.state[key.trim()] || ''
    );
  }

  mount(selector: string): void {
    this.selector = selector;
    this.onInit();
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = this.compileTemplate(this.render());
    }
  }

  unmount(): void {
    this.onDestroy();
    const element = document.querySelector(this.selector);
    if (element) {
      element.innerHTML = '';
    }
  }

  abstract render(): string;
}
