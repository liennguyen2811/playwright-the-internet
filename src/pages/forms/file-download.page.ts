import { Download, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class FileDownloadPage extends BasePage {
  readonly links: Locator = this.page.locator('a');

  async navigate() {
    await this.goto('/download');
  }

  async downloadFirstFile(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.links.first().click(),
    ]);
    return download;
  }
}
