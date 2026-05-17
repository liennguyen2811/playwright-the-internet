import { FrameLocator, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class NestedFramesPage extends BasePage {
  async navigate() {
    await this.goto('/nested_frames');
  }

  getTopFrame(): FrameLocator {
    return this.page.frameLocator('[name="frame-top"]');
  }

  getBottomFrame(): FrameLocator {
    return this.page.frameLocator('[name="frame-bottom"]');
  }
}

export class IFramePage extends BasePage {
  readonly editorBody: Locator = this.page.frameLocator('#mce_0_ifr').locator('body');

  async navigate() {
    await this.goto('/iframe');
  }

  async typeInEditor(text: string) {
    await this.editorBody.click();
    await this.editorBody.fill(text);
  }
}
