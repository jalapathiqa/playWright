const base = require('@playwright/test')

exports.DashBoardCustomFixture = base.test.extend(
    {
        Zara: {
            username: "jkala1@gmail.com",
            password: "Jkala@1234",
            productName: "ZARA"
        },

        AdidasOriginal: {
            username: "jkala1@gmail.com",
            password: "Jkala@1234",
            productName: "ADIDAS ORIGINAL"
        }
    }
)