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

class Trigger {
  public url: string;
  public selector: string;
  public frequency: string;
  public schedule: Schedule;

  constructor(url: string, selector: string, frequency: string, schedule: Schedule) {
    this.url = url;
    this.selector = selector;
    this.frequency = frequency;
    this.schedule = schedule;
  }

  private parseDateTime(dateTime: { year: string; month: string; date: string; time: string }): Date {
    const [hours, minutes] = dateTime.time.split(':').map(Number);
    return new Date(
      Number(dateTime.year),
      Number(dateTime.month) - 1,
      Number(dateTime.date),
      hours,
      minutes
    );
  }

  public isWithinSchedule(): boolean {
    const startDate = this.parseDateTime(this.schedule.start);
    const endDate = this.parseDateTime(this.schedule.end);
    const now = new Date();

    return now >= startDate && now <= endDate;
  }

}

interface Hook {
  pluginName: string;
  trigger: Trigger;
}


export { Trigger, Schedule, Hook as default };
