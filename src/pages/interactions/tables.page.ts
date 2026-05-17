import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class TablesPage extends BasePage {
  readonly table1Headers: Locator = this.page.locator('#table1 thead th');
  readonly table1Rows: Locator = this.page.locator('#table1 tbody tr');
  readonly table2Rows: Locator = this.page.locator('#table2 tbody tr');

  async navigate() {
    await this.goto('/tables');
  }

  async sortByColumn(columnIndex: number) {
    await this.page.click(`#table1 thead th:nth-child(${columnIndex})`);
  }

  getFirstCellOfFirstRow(): Locator {
    return this.page.locator('#table1 tbody tr:first-child td:first-child');
  }
}
