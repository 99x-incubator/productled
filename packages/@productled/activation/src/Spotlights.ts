import { Spotlight, Content, Design, Positioning } from './Spotlight';

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
    private static flows: Flow[] = [];

    // Add flows to the Spotlights class
    static add(flows: Flow[]): void {
        // Validate the flow configurations here (optional)
        this.flows.push(...flows);
    }

    // Apply effects to the current page
    static applyEffects(): void {
        removeSpotlights(); // Remove existing spotlights
        const currentURL = window.location.pathname;

        for (const flow of this.flows) {
            const { trigger } = flow;

            if (trigger.url === currentURL) {
                const targetElement = document.querySelector(trigger.element);

                if (targetElement) {
                    const spotlight = new Spotlight(targetElement, flow.content, flow.design, flow.positioning);
                    spotlight.create(); // Create the spotlight
                }
            }
        }
    }
}

// Remove existing spotlights from the page
function removeSpotlights() {
    const spotlights = document.querySelectorAll('.productled-element');
    spotlights.forEach(spotlight => {
        spotlight.remove();
    });
}
