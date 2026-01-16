/* BUILT-IN LOCATORS

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).


Example Locator (with accessible name)
<button>	button	page.getByRole('button', { name: 'Submit' })

<input type="checkbox">	checkbox	page.getByRole('checkbox', { name: 'Subscribe' })

<a>, <link>	link	page.getByRole('link', { name: 'Read more' })

<h1> to <h6>	heading	page.getByRole('heading', { name: 'Sign up', level: 3 })

<ul>, <ol>	list	page.getByRole('list')

<li>	listitem	page.getByRole('listitem', { name: 'Item Text 1' })

<input type="radio">	radio	page.getByRole('radio', { name: 'Option A' })

<input type="textbox">, <textarea>	textbox	page.getByRole('textbox', { name: 'Username' })

<table>	table	page.getByRole('table', { name: 'User data' })

<form>	form	page.getByRole('form', { name: 'Login form' })

<aside>, <nav>, <main>	region	page.getByRole('region', { name: 'Main content' })



*/
import{test, expect, Locator} from "@playwright/test"
import { link } from "node:fs"
test("Built-In locators", async({page})=>{

    await page.goto("https://demo.nopcommerce.com/")

    // 1. get.getByAltText():
    // identifies images (and similar elements) based on the alt attribute.
    // use this locator when your element supports alt text such as img and area elements.

    const logo:Locator =  page.getByAltText("nopCommerce demo store")
    await expect(logo).toBeVisible()


    // 2. get.getByText():
    // Find an element by the text it contains. you can match by a substring, exact string or regular expession.
    // Locate by Visible Text
    // Use this locator to find non interactive elements like div, span, p, etc.
    // For interctive elements like button, a, inut, etc. use role button.

    const welcomeNote:Locator =  page.getByText("Welcome to our store") // full string
    await expect(welcomeNote).toBeEnabled()

    await expect(page.getByText("Welcome to")).toBeVisible() // sub string

    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible() // regular expession start with / end with /

//3. page.getByRole() - Locating by role - Interactive elements
// Role locators include buttons, checkboxes, headings, links, lists, tables and many more and follow w3s specificators for 

await page.getByRole("link",{name:'Register'}).click();
const headerRegister:Locator = page.getByRole("heading",{name:'Register'})
// await expect(headerRegister).toBeVisible();
// await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();

await page.getByLabel("FirstName").fill("Jala")
await page.getByLabel("LastName").fill("Kala")
await page.getByLabel('Email').fill("jp@gmail.com")


//4. page.getByPlaceholder()
// Find an element with a given placeholder text
// Best for inputs without a label but having a placeholder

await page.getByPlaceholder("Search store").fill("apple")

// await page.locator()



})