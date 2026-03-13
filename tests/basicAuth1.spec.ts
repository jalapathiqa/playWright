import{test,expect} from '@playwright/test'
test('Basic Auth Test',async({page})=>{ 
const username='admin' 
const password='admin' 
// await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth')

const authHeader='Basic ' + btoa(username+':'+password)
//page.setExtraHTTPHeaders({'Authorization':authHeader})
page.setExtraHTTPHeaders({'Authorization':createAuthHeader(username,password)})
await page.goto('https://the-internet.herokuapp.com/basic_auth')
})
function createAuthHeader(username:any, password:any){
return 'Basic ' + btoa(username+':'+password)
}