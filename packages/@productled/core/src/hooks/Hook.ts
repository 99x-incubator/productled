interface HookTrigger {
  url: string | string[];
  selector: string;
  frequency: 'always' | 'once';  // You can add more frequency types if needed
  schedule?: Schedule;
}

interface Hook {
  plugin: string;
  trigger: HookTrigger;
  config: any;
}

interface Config {
  hooks: Hook[];
}


interface Schedule {
  start: {
    year: string;
    month: string;
    date: string;
    time: string;
  };
  end: {
    year: string;
    month: string;
    date: string;
    time: string;
  };
}

export { HookTrigger, Schedule, Hook, Config };
