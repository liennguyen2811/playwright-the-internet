import { FrameLocator, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class WysiwygPage extends BasePage {
  private readonly editorFrame: FrameLocator = this.page.frameLocator('#mce_0_ifr');
  readonly editorBody: Locator = this.editorFrame.locator('body');

  async navigate() {
    await this.goto('/tinymce');
  }

  async typeInEditor(text: string) {
    await this.editorBody.click();
    await this.editorBody.fill(text);
  }
}
