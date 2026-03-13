// import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
const { DashBoardCustomFixture } = require('../Utils/test-base');


DashBoardCustomFixture(`Zara`, async ({ page, Zara }) => {
    const poManager = new POManager(page);
    const dashBoardPO = poManager.getDashBoardPO();
    const loginPO = poManager.getLoginPage();
    await loginPO.goto();
    await loginPO.login(Zara.username, Zara.password);
    await dashBoardPO.searchProduct(Zara.productName);
    await dashBoardPO.addToCart(Zara.productName);
    await dashBoardPO.gotoMyOrders();
    // await dashBoardPO.getProductCount();
    await dashBoardPO.getProductNames();

})


DashBoardCustomFixture(`AdidasOriginal`, async ({ page, AdidasOriginal }) => {
    const poManager = new POManager(page);
    const dashBoardPO = poManager.getDashBoardPO();
    const loginPO = poManager.getLoginPage();
    await loginPO.goto();
    await loginPO.login(AdidasOriginal.username, AdidasOriginal.password);
    await dashBoardPO.searchProduct(AdidasOriginal.productName);
    await dashBoardPO.addToCart(AdidasOriginal.productName);
    await dashBoardPO.gotoMyOrders();
    // await dashBoardPO.getProductCount();
    await dashBoardPO.getProductNames();

})



