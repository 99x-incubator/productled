type RouteListenerFunc = (url: string) => void;

class RouteListener {
    private listening: boolean = false;
    private listeners: Array<RouteListenerFunc> = [];

    addListener(listener: RouteListenerFunc): void {
        this.listeners.push(listener);

        if (!this.listening) {
            this.listening = true;
            this.startListen();

            setTimeout(() => this.notifyListeners(window.location.pathname)) // Initial notification
        }
    }

    private startListen() {
        // Overriding the pushState method to notify listeners
        const pushState = window.history.pushState;
        window.history.pushState = (...args): void => {
            pushState.apply(window.history, args);

            const url = args[2];
            if (!url) {
                return;
            } else if (url instanceof URL) {
                this.notifyListeners(url.toString());
            } else {
                this.notifyListeners(url);
            }
        };
    }

    private notifyListeners(url: string): void {
        for (const listener of this.listeners) {
            // Scheduled for the next event loop
            setTimeout(() => listener(url));
        }
    }

    removeListener(listener: Function): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
}

export { RouteListener, RouteListenerFunc };