import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class HoversPage extends BasePage {
  readonly figures: Locator = this.page.locator('.figure');

  async navigate() {
    await this.goto('/hovers');
  }

  async hoverFigure(index: number) {
    await this.figures.nth(index).hover();
  }

  getFigureCaption(index: number): Locator {
    return this.figures.nth(index).locator('.figcaption');
  }

  getFigureLink(index: number): Locator {
    return this.figures.nth(index).locator('a');
  }
}
