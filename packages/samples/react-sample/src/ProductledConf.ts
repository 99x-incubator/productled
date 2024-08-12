import { Flow } from '@productled/activation';

const spotlights: Flow[] = [{
    trigger: {
        url: '/page/subpage',
        element: '.spot-me'
    },
    frequency: 'everytime',
    schedule: {
        start: { date: '31/06/2024', time: '09:00' },
        end: { date: '31/07/2024', time: '09:00' }
    },
    content: {
        title: 'New Feature',
        body: 'You can now send emails directly from here',
        link: 'http://myblog.com/new_feature_intro'
    },
    design: {
        icon: 'new-feature',
        color: 'blue'
    },
    positioning: {
        alignment: 'right-center',
        left: '75',
        top: '15'
    }
}];

export { spotlights };