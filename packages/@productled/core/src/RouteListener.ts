class RouteListener {
    private listeners: Function[] = [];
  
    constructor() {
      console.log('RouteListener initialized');
      window.addEventListener('popstate', this.notifyListeners.bind(this));
      window.addEventListener('pushstate', this.notifyListeners.bind(this));
      window.addEventListener('replacestate', this.notifyListeners.bind(this));
    }
  
    public addListener(listener: Function) {
      this.listeners.push(listener);
    }
  
    public notifyListeners() {
      console.log('Route changed', window.location.pathname);
      this.listeners.forEach(listener => listener());
    }
  }
  
  export default RouteListener;
  