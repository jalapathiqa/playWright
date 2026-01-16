import { Page, Locator } from '@playwright/test';

export class Register {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly smallSearchtermsInput: Locator;
  readonly nopcommerceDemoStoreImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register', exact: true });
    this.smallSearchtermsInput = page.getByRole('textbox', { name: 'Search store', exact: true });
    this.nopcommerceDemoStoreImage = page.getByRole('img', { name: 'nopCommerce demo store', exact: true });
  }

  async clickRegisterlink(): Promise<void> {
    await this.registerLink.click();
  }

  async fillSmallsearchtermsinput(value: string): Promise<void> {
    await this.smallSearchtermsInput.fill(value);
  }

  async clickNopcommercedemostoreimage(): Promise<void> {
    await this.nopcommerceDemoStoreImage.click();
  }

}
