//Author: Jalapathi
import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
import testData from '../Utils/TestData.json';
for (const data of testData) {
test(`DashBoard ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const dashBoardPO = poManager.getDashBoardPO();
    const loginPO = poManager.getLoginPage();
    await loginPO.goto();
    await loginPO.login(data.username, data.password);
    await dashBoardPO.searchProduct(data.productName);
    await dashBoardPO.addToCart(data.productName);
    await dashBoardPO.gotoMyOrders();
    // await dashBoardPO.getProductCount();
    await dashBoardPO.getProductNames();

    })


}
