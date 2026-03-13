import { test, expect, request } from '@playwright/test'

const loginPayLoad = { userEmail: "jkala1@gmail.com", userPassword: "Jkala@1234" };
const createOrderPayLoad = { country: "India", productOrderedId: "6262e08219c85f1188f36d16" }
let token;
let orderId;

test('Order API Call', async ({ page }) => {

    const apiContext = await request.newContext();
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayLoad });
    expect(response.ok()).toBeTruthy();
    console.log(response.status());
    console.log(await response.body());
    const loginResponseJson = await response.json();
    token = loginResponseJson.token;
    console.log(token);

    // place order
    // const apiContext1 =  await request.newContext();
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: createOrderPayLoad,
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    });

    // orderResponse.ok();
    console.log(orderResponse.status());
    console.log(await orderResponse.body());

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];  
    console.log(orderId);
})

test('place the order and get the order details', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='cart']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    console.log(rowCount);

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
    const orderIdDetails = await page.locator(".col-text-right").textContent();
    console.log(orderIdDetails);
    expect(orderId.includes(orderIdDetails)).toBe(true);



})