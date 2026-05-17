import { test as base } from '@playwright/test';

import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/auth/login.page';
import { SecurePage } from '../pages/auth/secure.page';
import { AlertsPage } from '../pages/alerts/alerts.page';
import { AddRemoveElementsPage } from '../pages/dom/add-remove-elements.page';
import { CheckboxesPage } from '../pages/dom/checkboxes.page';
import { DropdownPage } from '../pages/dom/dropdown.page';
import { HoversPage } from '../pages/dom/hovers.page';
import {
  ContextMenuPage,
  DisappearingElementsPage,
  ChallengingDomPage,
  NotificationPage,
} from '../pages/dom/misc.page';
import { DynamicLoadingPage } from '../pages/dynamic/dynamic-loading.page';
import { DynamicControlsPage } from '../pages/dynamic/dynamic-controls.page';
import { DynamicContentPage } from '../pages/dynamic/dynamic-content.page';
import {
  AbTestPage,
  RedirectPage,
  EntryAdPage,
  ExitIntentPage,
} from '../pages/dynamic/misc.page';
import { InputsPage } from '../pages/forms/inputs.page';
import { KeyPressesPage } from '../pages/forms/key-presses.page';
import { ForgotPasswordPage } from '../pages/forms/forgot-password.page';
import { FileUploadPage } from '../pages/forms/file-upload.page';
import { FileDownloadPage } from '../pages/forms/file-download.page';
import { WysiwygPage } from '../pages/forms/wysiwyg.page';
import { DragDropPage } from '../pages/interactions/drag-drop.page';
import { SliderPage } from '../pages/interactions/slider.page';
import { TablesPage } from '../pages/interactions/tables.page';
import { StatusCodesPage } from '../pages/interactions/status-codes.page';
import {
  JQueryMenuPage,
  TyposPage,
  LargeDomPage,
  BrokenImagesPage,
  SlowPage,
  ShiftingContentPage,
} from '../pages/interactions/misc.page';
import { WindowsPage } from '../pages/windows/windows.page';
import { NestedFramesPage, IFramePage } from '../pages/windows/frames.page';
import {
  GeolocationPage,
  ShadowDomPage,
  InfiniteScrollPage,
  FloatingMenuPage,
} from '../pages/windows/misc.page';

type Pages = {
  // home
  homePage: HomePage;
  // auth
  loginPage: LoginPage;
  securePage: SecurePage;
  // alerts
  alertsPage: AlertsPage;
  // dom
  addRemoveElementsPage: AddRemoveElementsPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  hoversPage: HoversPage;
  contextMenuPage: ContextMenuPage;
  disappearingElementsPage: DisappearingElementsPage;
  challengingDomPage: ChallengingDomPage;
  notificationPage: NotificationPage;
  // dynamic
  dynamicLoadingPage: DynamicLoadingPage;
  dynamicControlsPage: DynamicControlsPage;
  dynamicContentPage: DynamicContentPage;
  abTestPage: AbTestPage;
  redirectPage: RedirectPage;
  entryAdPage: EntryAdPage;
  exitIntentPage: ExitIntentPage;
  // forms
  inputsPage: InputsPage;
  keyPressesPage: KeyPressesPage;
  forgotPasswordPage: ForgotPasswordPage;
  fileUploadPage: FileUploadPage;
  fileDownloadPage: FileDownloadPage;
  wysiwygPage: WysiwygPage;
  // interactions
  dragDropPage: DragDropPage;
  sliderPage: SliderPage;
  tablesPage: TablesPage;
  statusCodesPage: StatusCodesPage;
  jQueryMenuPage: JQueryMenuPage;
  typosPage: TyposPage;
  largeDomPage: LargeDomPage;
  brokenImagesPage: BrokenImagesPage;
  slowPage: SlowPage;
  shiftingContentPage: ShiftingContentPage;
  // windows & frames
  windowsPage: WindowsPage;
  nestedFramesPage: NestedFramesPage;
  iFramePage: IFramePage;
  geolocationPage: GeolocationPage;
  shadowDomPage: ShadowDomPage;
  infiniteScrollPage: InfiniteScrollPage;
  floatingMenuPage: FloatingMenuPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  securePage: async ({ page }, use) => use(new SecurePage(page)),
  alertsPage: async ({ page }, use) => use(new AlertsPage(page)),
  addRemoveElementsPage: async ({ page }, use) => use(new AddRemoveElementsPage(page)),
  checkboxesPage: async ({ page }, use) => use(new CheckboxesPage(page)),
  dropdownPage: async ({ page }, use) => use(new DropdownPage(page)),
  hoversPage: async ({ page }, use) => use(new HoversPage(page)),
  contextMenuPage: async ({ page }, use) => use(new ContextMenuPage(page)),
  disappearingElementsPage: async ({ page }, use) => use(new DisappearingElementsPage(page)),
  challengingDomPage: async ({ page }, use) => use(new ChallengingDomPage(page)),
  notificationPage: async ({ page }, use) => use(new NotificationPage(page)),
  dynamicLoadingPage: async ({ page }, use) => use(new DynamicLoadingPage(page)),
  dynamicControlsPage: async ({ page }, use) => use(new DynamicControlsPage(page)),
  dynamicContentPage: async ({ page }, use) => use(new DynamicContentPage(page)),
  abTestPage: async ({ page }, use) => use(new AbTestPage(page)),
  redirectPage: async ({ page }, use) => use(new RedirectPage(page)),
  entryAdPage: async ({ page }, use) => use(new EntryAdPage(page)),
  exitIntentPage: async ({ page }, use) => use(new ExitIntentPage(page)),
  inputsPage: async ({ page }, use) => use(new InputsPage(page)),
  keyPressesPage: async ({ page }, use) => use(new KeyPressesPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  fileUploadPage: async ({ page }, use) => use(new FileUploadPage(page)),
  fileDownloadPage: async ({ page }, use) => use(new FileDownloadPage(page)),
  wysiwygPage: async ({ page }, use) => use(new WysiwygPage(page)),
  dragDropPage: async ({ page }, use) => use(new DragDropPage(page)),
  sliderPage: async ({ page }, use) => use(new SliderPage(page)),
  tablesPage: async ({ page }, use) => use(new TablesPage(page)),
  statusCodesPage: async ({ page }, use) => use(new StatusCodesPage(page)),
  jQueryMenuPage: async ({ page }, use) => use(new JQueryMenuPage(page)),
  typosPage: async ({ page }, use) => use(new TyposPage(page)),
  largeDomPage: async ({ page }, use) => use(new LargeDomPage(page)),
  brokenImagesPage: async ({ page }, use) => use(new BrokenImagesPage(page)),
  slowPage: async ({ page }, use) => use(new SlowPage(page)),
  shiftingContentPage: async ({ page }, use) => use(new ShiftingContentPage(page)),
  windowsPage: async ({ page }, use) => use(new WindowsPage(page)),
  nestedFramesPage: async ({ page }, use) => use(new NestedFramesPage(page)),
  iFramePage: async ({ page }, use) => use(new IFramePage(page)),
  geolocationPage: async ({ page }, use) => use(new GeolocationPage(page)),
  shadowDomPage: async ({ page }, use) => use(new ShadowDomPage(page)),
  infiniteScrollPage: async ({ page }, use) => use(new InfiniteScrollPage(page)),
  floatingMenuPage: async ({ page }, use) => use(new FloatingMenuPage(page)),
});

export { expect } from '@playwright/test';
