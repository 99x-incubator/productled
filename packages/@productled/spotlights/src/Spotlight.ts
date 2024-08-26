

// Define the Trigger interface
interface Trigger {
  url: string;
  selector: string;
}

export interface Positioning {
  alignment: string;
  left: string;
  top: string;
}

// Define the Schedule interface
interface Schedule {
  start: { date: string; time: string };
  end: { date: string; time: string };
}

// Define the Flow interface
export interface SpotlightConf {
  title: String;
  description: String;
  link: String;
  trigger: Trigger;
  frequency: string;
  schedule: Schedule;
  positioning: Positioning;
}


export class Spotlight {
    private targetElement: Element;
    private title: String;
    private description:String;
    private link: String;
    private positioning: Positioning;

    constructor(targetElement: Element, title: String, description: String, link: String, positioning: Positioning) {
        this.targetElement = targetElement;
        this.positioning = positioning;
        this.title = title;
        this.description = description;
        this.link = link;
    }

    create(): void {
        const spotlight = document.createElement('div');
        spotlight.className = 'spotlight';
        spotlight.style.position = 'absolute';
        spotlight.style.left = `${this.positioning.left}px`;
        spotlight.style.top = `${this.positioning.top}px`;

        // Design the spotlight based on the configuration
        spotlight.innerHTML = `
            <div class="productled-spotlight">
            <style>
            .beacon{
                position:absolute;
                top:50%;
                left:50%;
                background-color:#DB2828;
                height:2em;
                width:2em;
                border-radius:50%;
                -webkit-animation: grow .4s 1 linear;
                animation: grow .4s 1 linear;
                -webkit-transform:translateX(-50%) translateY(-50%);
              }
              .beacon:before{
                position:absolute;
                content:"";
                height:2em;
                width:2em;
                left:0;
                top:0;
                background-color:transparent;
                border-radius:50%;
                box-shadow:0px 0px 2px 2px #DB2828;
                -webkit-animation:active 2s infinite linear;
                animation:active 2s infinite linear;
              }
              
              @-webkit-keyframes grow {
                0% {
                  -webkit-transform: scale(.1);
                }
                
                100% {
                  -webkit-transform: scale(1);
                }
              }
              
              @keyframes grow {
                0% {
                  transform: scale(.1);
                }
                
                100% {
                  transform: scale(1);
                }
              }
              
              @-webkit-keyframes active{
                0%{
                  -webkit-transform:scale(.1);
                  opacity:1;
                }
                70%{
                  -webkit-transform:scale(2.5);
                  opacity:0;
                }
                100%{
                  opacity:0;
                }
              }
              
              @keyframes active{
                0%{
                  transform:scale(.1);
                  opacity:1;
                }
                70%{
                  transform:scale(2.5);
                  opacity:0;
                }
                100%{
                  opacity:0;
                }
              }
              
            </style>
            <span class="beacon"></span>
            </div>
        `;

        // Position the spotlight relative to the target element
        (this.targetElement as HTMLElement).style.position = 'relative';
        this.targetElement.appendChild(spotlight);
    }
}
