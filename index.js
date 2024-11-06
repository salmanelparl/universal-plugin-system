class Framework {
    constructor() {
        this.plugins = [];
    }

    use(plugin) {
        this.plugins.push(plugin);
        plugin(this);
    }

    run() {
        this.plugins.forEach((plugin) => plugin.run && plugin.run());
    }
}

const framework = new Framework();
export default framework;
