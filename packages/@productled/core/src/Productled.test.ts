import Productled from './Productled';
import HookStore from './HookStore';
import ConfigStore from './ConfigStore';
import PluginStore from './PluginStore';
import DocumentService from './DocumentService';
import HookExecuter from './HookExecuter';
import Plugin from './Plugin';

jest.mock('./HookStore');
jest.mock('./ConfigStore');
jest.mock('./PluginStore');
jest.mock('./DocumentService');
jest.mock('./HookExecuter');

describe('Productled', () => {
  let config: any = {
    "spotlights": [{
      "title": "New Click Me Feature",
      "description": "You can now send emails directly from here",
      "link": "http://myblog.com/new_feature_intro",

      "trigger": {
        "url": "/page/subpage",
        "selector": ".spot-me",

        "frequency": "always",
        "schedule": {
          "start": { "year": "2024", "month": "04", "date": "01", "time": "09:00" },
          "end": { "year": "2024", "month": "12", "date": "01", "time": "09:00" }
        }
      },
      "positioning": {
        "alignment": "right-center",
        "left": "75",
        "top": "15"
      }
    }]
  };

  beforeEach(() => {
    (HookStore as any).mockClear();
    (ConfigStore as any).mockClear();
    (PluginStore as any).mockClear();
    (DocumentService as any).mockClear();
    (HookExecuter as any).mockClear();
  });

  it('should return the singleton instance', () => {
    const instance1 = Productled.getInstance();
    const instance2 = Productled.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should call routeChanged and execute hooks', async () => {
    const instance = Productled.getInstance();
    instance.loadConfig(config);
    const mockHooks = ['hook1', 'hook2'];
    const mockGetHooks = jest.fn().mockReturnValue(mockHooks);
    const mockExecuteHooks = jest.fn();

    HookStore.prototype.getHooks = mockGetHooks;
    HookExecuter.prototype.executeHooks = mockExecuteHooks;

    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/test-route'
      },
      writable: true
    });

    await instance.routeChanged();

    expect(mockGetHooks).toHaveBeenCalledWith('/test-route');
    expect(mockExecuteHooks).toHaveBeenCalledWith(mockHooks);
  });

  it('should register a plugin and add hooks', () => {
    const instance = Productled.getInstance();
    instance.loadConfig(config);

    const mockPlugin = {
      getName: jest.fn().mockReturnValue('testPlugin')
    } as unknown as Plugin;
    const mockHooks = ['hook1', 'hook2'];
    const mockGetHooks = jest.fn().mockReturnValue(mockHooks);
    const mockAddPlugin = jest.fn();
    const mockAddHooks = jest.fn();

    ConfigStore.prototype.getHooks = mockGetHooks;
    PluginStore.prototype.addPlugin = mockAddPlugin;
    HookStore.prototype.addHooks = mockAddHooks;

    instance.registerPlugin(mockPlugin);

    expect(mockPlugin.Name).toHaveBeenCalled();
    expect(mockAddPlugin).toHaveBeenCalledWith(mockPlugin);
    expect(mockGetHooks).toHaveBeenCalledWith('testPlugin');
    expect(mockAddHooks).toHaveBeenCalledWith(mockHooks, 'testPlugin');
  });
});