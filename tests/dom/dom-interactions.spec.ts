import { test, expect } from '../../src/fixtures';

test.describe('Add/Remove Elements (/add_remove_elements/)', () => {
  test.beforeEach(async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.navigate();
  });

  test('should add an element', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElement();
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(1);
  });

  test('should add multiple elements', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElement();
    await addRemoveElementsPage.addElement();
    await addRemoveElementsPage.addElement();
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(3);
  });

  test('should remove an added element', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElement();
    await addRemoveElementsPage.removeElement();
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
  });
});

test.describe('Checkboxes (/checkboxes)', () => {
  test.beforeEach(async ({ checkboxesPage }) => {
    await checkboxesPage.navigate();
  });

  test('checkbox 1 is unchecked by default, checkbox 2 is checked', async ({ checkboxesPage }) => {
    await expect(checkboxesPage.checkbox1).not.toBeChecked();
    await expect(checkboxesPage.checkbox2).toBeChecked();
  });

  test('should check checkbox 1', async ({ checkboxesPage }) => {
    await checkboxesPage.checkbox1.check();
    await expect(checkboxesPage.checkbox1).toBeChecked();
  });

  test('should uncheck checkbox 2', async ({ checkboxesPage }) => {
    await checkboxesPage.checkbox2.uncheck();
    await expect(checkboxesPage.checkbox2).not.toBeChecked();
  });
});

test.describe('Dropdown (/dropdown)', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.navigate();
  });

  test('should show placeholder option by default', async ({ dropdownPage }) => {
    await expect(dropdownPage.dropdown).toHaveValue('');
  });

  test('should select Option 1', async ({ dropdownPage }) => {
    await dropdownPage.selectOption('1');
    await expect(dropdownPage.dropdown).toHaveValue('1');
  });

  test('should select Option 2', async ({ dropdownPage }) => {
    await dropdownPage.selectOption('2');
    await expect(dropdownPage.dropdown).toHaveValue('2');
  });
});

test.describe('Hovers (/hovers)', () => {
  test.beforeEach(async ({ hoversPage }) => {
    await hoversPage.navigate();
  });

  test('should reveal info on hover over each figure', async ({ hoversPage }) => {
    for (let i = 0; i < 3; i++) {
      await hoversPage.hoverFigure(i);
      await expect(hoversPage.getFigureCaption(i)).toBeVisible();
    }
  });
});

test.describe('Context Menu (/context_menu)', () => {
  test('should show browser alert on right-click in the hot spot', async ({ contextMenuPage }) => {
    await contextMenuPage.navigate();
    await contextMenuPage.rightClickHotSpot();
  });
});

test.describe('Disappearing Elements (/disappearing_elements)', () => {
  test('should have at least 4 nav items', async ({ disappearingElementsPage }) => {
    await disappearingElementsPage.navigate();
    const count = await disappearingElementsPage.navItems.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

test.describe('Challenging DOM (/challenging_dom)', () => {
  test.beforeEach(async ({ challengingDomPage }) => {
    await challengingDomPage.navigate();
  });

  test('should render table with 10 rows', async ({ challengingDomPage }) => {
    await expect(challengingDomPage.tableRows).toHaveCount(10);
  });

  test('each row should have an edit link', async ({ challengingDomPage }) => {
    await expect(challengingDomPage.editLinks).toHaveCount(10);
  });
});

test.describe('Notification Messages (/notification_message)', () => {
  test('should show a flash notification after clicking the link', async ({ notificationPage }) => {
    await notificationPage.navigate();
    await notificationPage.triggerNotification();
    await expect(notificationPage.flash).toBeVisible();
  });
});
