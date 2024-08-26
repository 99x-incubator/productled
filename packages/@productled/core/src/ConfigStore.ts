class ConfigStore {
    private config: any;

    public set Configuration(config: any) {
        this.config = config;
    }

    public getHooks(pluginName: string): any {
        return this.config[pluginName] ?? [];
    }

}

export default ConfigStore;