import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class ContextMenuPage extends BasePage {
  readonly hotSpot: Locator = this.page.locator('#hot-spot');

  async navigate() {
    await this.goto('/context_menu');
  }

  async rightClickHotSpot() {
    this.page.once('dialog', (d) => d.accept());
    await this.hotSpot.click({ button: 'right' });
  }
}

export class DisappearingElementsPage extends BasePage {
  readonly navItems: Locator = this.page.locator('ul li');

  async navigate() {
    await this.goto('/disappearing_elements');
  }
}

export class ChallengingDomPage extends BasePage {
  readonly tableRows: Locator = this.page.locator('table tbody tr');
  readonly editLinks: Locator = this.page.locator('table tbody tr td a').filter({ hasText: 'edit' });

  async navigate() {
    await this.goto('/challenging_dom');
  }
}

export class NotificationPage extends BasePage {
  readonly triggerLink: Locator = this.page.locator('a[href="/notification_message"]');
  readonly flash: Locator = this.page.locator('#flash');

  async navigate() {
    await this.goto('/notification_message');
  }

  async triggerNotification() {
    await this.triggerLink.click();
  }
}
