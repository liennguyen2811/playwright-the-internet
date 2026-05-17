import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class SliderPage extends BasePage {
  readonly slider: Locator = this.page.locator('input[type="range"]');
  readonly rangeValue: Locator = this.page.locator('#range');

  async navigate() {
    await this.goto('/horizontal_slider');
  }

  async moveRight() {
    await this.slider.focus();
    await this.slider.press('ArrowRight');
  }

  async getRangeValue(): Promise<string | null> {
    return this.rangeValue.textContent();
  }
}
