export declare abstract class Component {
    protected props: Record<string, any>;
    protected state: Record<string, any>;
    private selector;
    constructor(props?: Record<string, any>);
    onInit(): void;
    onDestroy(): void;
    setState(newState: Record<string, any>): void;
    private compileTemplate;
    mount(selector: string): void;
    unmount(): void;
    abstract render(): string;
}
