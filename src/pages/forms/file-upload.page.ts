import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class FileUploadPage extends BasePage {
  readonly fileInput: Locator = this.page.locator('#file-upload');
  readonly submitButton: Locator = this.page.locator('#file-submit');
  readonly uploadedFiles: Locator = this.page.locator('#uploaded-files');

  async navigate() {
    await this.goto('/upload');
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.submitButton.click();
  }
}
