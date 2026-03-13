import { test, expect, request } from '@playwright/test';
import { APiUtils } from '../Utils/APiUtils';

const loginPayLoad = { userEmail: "jkala1@gmail.com", userPassword: "Jkala@1234" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

let response;
const fakePayloadOrders = { orders: [], message: "No Orders" }

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})

//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,

                }
            )
            // intercepting the request - API response ->{fake response} browser -> render data on front end
        }
    )

    await page.locator("button[routerlink*='myorders']").click();
    const text1 = await page.locator('.mt-4');
    await page.waitForResponse(text1 => text1.url().includes("/get-orders-for-customer/*"))
    console.log(text1.textContent());
    // await page.pause();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");





});
