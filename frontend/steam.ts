import type {} from '@steambrew/client';

// @steambrew/client types are not complete and they make it impossible to merge with your own types, so we have to do this

type SB_AppOverview = NonNullable<
  ReturnType<(typeof window)['appStore']['GetAppOverviewByAppID']>
>;

namespace Steam {
  // ===== PopupManager ===== //

  export interface PopupManager {
    GetExistingPopup(name: string): Popup;
    AddPopupCreatedCallback(callback: (popup: Popup) => void): void;
  }

  export const PopupManager: PopupManager = Reflect.get(
    globalThis,
    'g_PopupManager',
  );

  export const MainWindowName = 'SP Desktop_uid0';

  export interface Popup {
    get title(): string;
    set title(title: string);
    get window(): Window | undefined;
    get root_element(): Element;
  }

  // ===== MainWindowBrowser ===== //

  export interface MainWindowBrowserManager {
    m_browser: MainWindowBrowser;
    m_lastActiveTab: 'store' | 'library' | 'community' | (string & {});
    m_lastLocation: MainWindowBrowserLocation;
    m_history: MainWindowBrowserHistory;
  }

  export interface MainWindowBrowserLocation
    extends Pick<URL, 'pathname' | 'search' | 'hash'> {
    key: string;
  }

  export interface MainWindowBrowser {
    on(
      name: 'finished-request',
      listener: (url: string, title: string) => void,
    ): void;
  }

  export interface MainWindowBrowserHistory {
    listen(callback: (location: MainWindowBrowserLocation) => void): void;
  }

  export const MainWindowBrowserManager: MainWindowBrowserManager = undefined!;
  Object.defineProperty(Steam, 'MainWindowBrowserManager', {
    get: () => Reflect.get(globalThis, 'MainWindowBrowserManager'),
    enumerable: true,
    configurable: true,
  });

  // ===== LocalizationManager ===== //

  export interface LocalizationManager {
    m_mapTokens: Map<string, string>;
    LocalizeString(token: `#${string}`): string;
  }

  export const LocalizationManager: LocalizationManager = Reflect.get(
    globalThis,
    'LocalizationManager',
  );

  // ===== AppOverview ===== //

  interface BaseAppOverview extends Omit<SB_AppOverview, 'size_on_disk'> {
    appid: number;
    display_name: string;
    sort_as: string;
  }

  export interface SteamAppOverview extends BaseAppOverview {
    library_id: string;
    size_on_disk: `${number}` | undefined;
  }

  export interface NonSteamAppOverview extends BaseAppOverview {
    library_id: undefined;
    size_on_disk: '0';
  }

  export type AppOverview = SteamAppOverview | NonSteamAppOverview;

  // ===== UIStore ===== //

  export interface UIStore {
    RunningApps: AppOverview[];
  }

  export const UIStore: UIStore = Reflect.get(globalThis, 'SteamUIStore');

  // ===== AppStore ===== //

  export interface AppStore {
    allApps: AppOverview[];
  }

  export const AppStore: AppStore = Reflect.get(globalThis, 'appStore');

  // ===== CollectionStore ===== //

  export interface CollectionStore {
    OnAppOverviewChange(apps: AppOverview[]): void;
  }

  export const CollectionStore: CollectionStore = Reflect.get(
    globalThis,
    'collectionStore',
  );
}
export default Steam;
