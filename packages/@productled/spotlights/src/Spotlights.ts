import { Spotlight, Content, Design, Positioning } from './Spotlight';
import { Productled } from '@productled/core';

const productled = Productled.getInstance();

// Define the Trigger interface
interface Trigger {
    url: string;
    element: string;
}

// Define the Schedule interface
interface Schedule {
    start: { date: string; time: string };
    end: { date: string; time: string };
}

// Define the Flow interface
export interface Flow {
    trigger: Trigger;
    frequency: string;
    schedule: Schedule;
    content: Content;
    design: Design;
    positioning: Positioning;
}

// Spotlights class for managing flows
export class Spotlights {

    public init(flows: Flow[]): void {
        for (const flow of flows) {
            const { trigger } = flow;
            productled.registerHook(trigger.url, trigger.element, (element: any) => {
                if (element) {
                    console.log('Element found on', trigger.url, 'with selector', trigger.element);
                    const spotlight = new Spotlight(element, flow.content, flow.design, flow.positioning);
                    spotlight.create(); // Create the spotlight
                }
            });
        }
    }
}

// Remove existing spotlights from the page
function removeSpotlights() {
    const spotlights = document.querySelectorAll('.productled-spotlight');
    spotlights.forEach(spotlight => {
        spotlight.remove();
    });
}
