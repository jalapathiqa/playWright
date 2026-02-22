import {test,expect, request} from '@playwright/test'

const loginPayload = {    userEmail: "jkala1@gmail.com",    userPassword: "Jkala@1234"};

test.beforeAll(async ()=>
{

const apiContext = await request.newContext();
const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
    data: loginPayload
    } )

expect(loginResponse.ok()).toBeTruthy()
const loginResponseJson = await loginResponse.json()
const token = loginResponseJson.token
console.log(token)

});


