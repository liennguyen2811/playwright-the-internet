import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class DragDropPage extends BasePage {
  readonly columnA: Locator = this.page.locator('#column-a');
  readonly columnB: Locator = this.page.locator('#column-b');

  async navigate() {
    await this.goto('/drag_and_drop');
  }

  async dragAtoB() {
    const boxA = await this.columnA.boundingBox();
    const boxB = await this.columnB.boundingBox();
    if (!boxA || !boxB) throw new Error('Could not get bounding boxes');

    await this.page.mouse.move(boxA.x + boxA.width / 2, boxA.y + boxA.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(boxB.x + boxB.width / 2, boxB.y + boxB.height / 2, { steps: 10 });
    await this.page.mouse.up();
  }
}
