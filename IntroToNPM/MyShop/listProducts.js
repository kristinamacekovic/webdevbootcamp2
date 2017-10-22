var faker = require("faker");
for (var i = 0; i < 10; i++) {
    var randomProduct = faker.commerce.productName();
    var randomPrice = faker.commerce.price();    
    console.log(i + "th Fake product: " + randomProduct);
    console.log(i + "th Fake price: " + randomPrice);
}