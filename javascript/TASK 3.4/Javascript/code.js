window.onload = function () {

    //Declare constants

    const productSel = document.getElementById("productSel");
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const discount = document.getElementById('discount');
    const finalPrice = document.getElementById('finalPrice');
    const checkUserButton = document.getElementById('checkUserButton');
    const buyButton = document.getElementById('buyButton');
    let purchasedProduct;


    // user object constructor

    class Users {
        constructor(firstName, lastName) {
            this.firstName = firstName,
                this.lastName = lastName
            this.id = firstName + lastName,
                this.purchasesHistory = []
        }
    }

    class Purchase {
        constructor(name, brand, price, discount, finalPrice) {
            this.name = name,
                this.brand = brand,
                this.price = price,
                this.discount = discount,
                this.finalPrice = finalPrice
        }
    }

    usersArray = [] // this is where we store all our users objects

    const products = {
        'Aegis Carbon Fiber': {
            name: 'Aegis Carbon Fiber',
            brand: 'Aegis',
            price: 500
        },
        'BMC Teammachine ALR01 FOUR': {
            name: 'BMC Teammachine ALR01 FOUR',
            brand: 'BMC',
            price: 1000
        }
    }

    // Object with functions

    functions = {
        updateProductDropDown: function () {
            for (let product in products) {
                productSel.options[productSel.options.length] = new Option(product, product);
            }
        },
        getPrice: function () {
            productSel.addEventListener('change', function () {

                let selectedIndex = productSel.selectedIndex
                let productSelected = productSel.options[productSel.selectedIndex]

                // if nothing selected - clear price and do nothing

                if (selectedIndex === 0) {
                    price.innerHTML = ''
                    return;
                }

                //otherwise find price in the product object and put it into html

                price.innerHTML = '<b>' + '&nbsp;' + products[productSelected.text].price + ' USD' + '</b>'

                function getDiscount() {

                    let nameInput = document.getElementById('user_name');
                    let lastNameInput = document.getElementById('user_lastname');
                    let id = nameInput.value + lastNameInput.value

                    // if purchases more then 1 - discount 10% otherwise 0

                    for (let i = 0; i < usersArray.length; i++) {
                        if (usersArray[i].id === id && usersArray[i].purchasesHistory.length > 0) {
                            discount.innerHTML = '<b>' + '&nbsp;' + 10 + '%' + '</b>';
                            finalPrice.innerHTML = '<b>' + '&nbsp;' + products[productSelected.text].price * 0.9 + '</b>';
                            return;
                        }
                    }

                    discount.innerHTML = '<b>' + '&nbsp;' + 0 + '%' + '</b>';
                    finalPrice.innerHTML = '<b>' + '&nbsp;' + products[productSelected.text].price + ' USD' + '</b>';
                    return;
                }

                getDiscount()

            })
        },
        checkUser: function () {
            checkUserButton.addEventListener('click', function () {

                let nameInput = document.getElementById('user_name');
                let lastNameInput = document.getElementById('user_lastname');
                let id = nameInput.value + lastNameInput.value

                function getQuantity() {
                    for (let i = 0; i < usersArray.length; i++) {
                        if (usersArray[i].id === id) {
                            quantity.innerHTML = '<b>' + '&nbsp;' + usersArray[i].purchasesHistory.length + '</b>'
                        }
                    }
                }

                function showProductForm() {
                    let productForm = document.querySelector('.productForm')
                    productForm.style.display = 'block';
                }

                //Check if empty alert fill in the forms

                if (nameInput.value === '' || lastNameInput.value === '') {
                    alert("Please, fill in the name and last name")
                    return;
                }

                //If array is empty - create User Object

                if (usersArray == undefined || usersArray.length == 0) {
                    usersArray.push(new Users(nameInput.value, lastNameInput.value))
                    showProductForm()
                    getQuantity()
                    return;
                }

                // Check if there is such user. If so do nothing

                for (let i = 0; i < usersArray.length; i++) {
                    if (usersArray[i].id === id) {
                        getQuantity()
                        return;
                    }
                }

                // Otherwise Create new User Object

                usersArray.push(new Users(nameInput.value, lastNameInput.value))
                getQuantity()


                console.log(usersArray);

                //Get quantity of purchases from user object with this ID

            })
        },
        makePurchase: function () {
            buyButton.addEventListener('click', function () {

                // define purchased product
                let selectedIndex = productSel.selectedIndex;
                let productSelected = productSel.options[productSel.selectedIndex]
                purchasedProduct = products[productSelected.value];

                // find user, update purchase history and clear inputs

                let nameInput = document.getElementById('user_name');
                let lastNameInput = document.getElementById('user_lastname');
                let id = nameInput.value + lastNameInput.value

                if (selectedIndex == 0) {
                    alert("Please choose product to buy")
                    return;
                }

                for (i = 0; i < usersArray.length; i++) {
                    if (usersArray[i].id === id) {
                        usersArray[i].purchasesHistory.push(new Purchase(purchasedProduct.name, purchasedProduct.brand, purchasedProduct.price, discount.innerText, finalPrice.innerText));

                        quantity.innerHTML = '<b>' + '&nbsp;' + usersArray[i].purchasesHistory.length + '</b>';

                        productSel.selectedIndex = 0

                        price.innerHTML = '';

                        discount.innerHTML = '';

                        finalPrice.innerHTML = '';
                        return;
                    };
                };
            });

        }
    };

    // Product dropdown list

    functions.updateProductDropDown();

    // Check for user

    functions.checkUser();

    // Get price

    functions.getPrice();

    // Make purchase

    functions.makePurchase();

} // end window onload