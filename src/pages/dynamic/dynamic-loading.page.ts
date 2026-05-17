import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class DynamicLoadingPage extends BasePage {
  readonly startButton: Locator = this.page.locator('#start button');
  readonly finishElement: Locator = this.page.locator('#finish');
  readonly finishHeading: Locator = this.page.locator('#finish h4');

  async navigateToExample(example: 1 | 2) {
    await this.goto(`/dynamic_loading/${example}`);
  }

  async clickStart() {
    await this.startButton.click();
  }
}
