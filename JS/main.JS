let productNameInput = document.getElementById('productNameInput');
let productPriceInput = document.getElementById('productPriceInput');
let productCategoryInput = document.getElementById('productCategoryInput');
let productDescriptionInput = document.getElementById('productDescriptionInput');
let elements = document.querySelectorAll('input')
let products;
let tmp;


document.getElementById("addProduct").addEventListener("click", addProduct)
document.getElementById("clearForm").addEventListener("click", clearForm)
document.getElementById("updateProduct").addEventListener("click", updateProduct)

if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    display(products)
} else {
    products = [];
}

function addProduct() {
    if ((validationName() && validationPrice() && validationCategory())== true) {
        let product = {
            productName: productNameInput.value,
            productPrice: productPriceInput.value,
            productCategory: productCategoryInput.value,
            productDescription: productDescriptionInput.value
        };
        products.push(product)
        localStorage.setItem("products", JSON.stringify(products))
        display(products)
        clearForm()
    }
}

function clearForm() {
    productNameInput.value = " ";
    productPriceInput.value = " ";
    productCategoryInput.value = " ";
    productDescriptionInput.value = " ";
    for(i=0; i < elements.length; i++){
        elements[i].classList.replace("is-valid", "none")
    }
};

function display(productsList) {
    var cartona = ``;
    for (i = 0; i < productsList.length; i++) {
        cartona +=
            `
        <tr>
            <td> ${i} </td>
            <td class="text-capitalize" > ${productsList[i].productName}</td>
            <td>${productsList[i].productPrice}</td>
            <td class="text-capitalize" > ${productsList[i].productCategory}</td>
            <td class="text-capitalize" >${productsList[i].productDescription}</td>
            <td><button class="btn btn-sm btn-info" onclick="update(${i})" >Update</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})" >Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function searchProduct(text) {
    let searchProductDisplay = [];
    for (i = 0; i < products?.length; i++) {
        if (products[i].productName.toLowerCase().includes(text.toLowerCase()) == true) {
            searchProductDisplay.push(products[i])
        }
    }
    display(searchProductDisplay)
}


function deleteProduct(index) {
    products.splice(index, 1)
    display(products)
    localStorage.setItem("products", JSON.stringify(products))
}


function update(index) {
    tmp = index;
    productNameInput.value = products[index].productName;
    productPriceInput.value = products[index].productPrice;
    productCategoryInput.value = products[index].productCategory;
    productDescriptionInput.value = products[index].productDescription
    document.getElementById("updateProduct").classList.replace("d-none", "d-inline-block")
    document.getElementById("addProduct").classList.add("d-none")

};

function updateProduct() {
    products[tmp].productName = productNameInput.value;
    products[tmp].productPrice = productPriceInput.value;
    products[tmp].productCategory = productCategoryInput.value;
    products[tmp].productDescription = productDescriptionInput.value;
    display(products)
    document.getElementById("updateProduct").classList.add("d-none")
    document.getElementById("addProduct").classList.replace("d-none", "d-inline-block")
    clearForm()
}


// /* على الكل  validation لازم ارجع هنا تانى ان شاء الله واعمل فنكشن تعمل  */
// // let x = document.getElementsByClassName("form-control").addEventListener("click" , function(e){
// //     console.log(e)
// // })
// let elementInput = document.querySelectorAll("input")

// for (i = 0; i < elementInput.length; i++) {
//     elementInput[i].addEventListener('focus', function (e) {
//         let name = e.target.id

//         let regexName = /^[A-Z][a-z]{3,8} {0,1}[A-Z]{0,2}[0-9]{0,4}$/;
//         let regexPrice = /^[1-9][0-9]{1,5}$/;
//         let regexCategory = /^[A-Z][a-z]{3,8}$/;

//         function validation() {
//             if (productNameInput.id == name) {
//                 if (regexName.test(productNameInput.value) == true) {
//                     document.getElementById(name).classList.replace("is-invalid", "is-valid");
//                     return true;
//                 } else {
//                     document.getElementById(name).classList.add("is-invalid");
//                     return false;
//                 }
//             } else if (productPriceInput.id == name) {
//                 if (regexPrice.test(productPriceInput.value) == true) {
//                     document.getElementById(name).classList.replace("is-invalid", "is-valid");
//                     return true;
//                 } else {
//                     document.getElementById(name).classList.add("is-invalid");
//                     return false;
//                 }
//             } else if (productCategoryInput.id == name) {
//                 if (regexCategory.test(productCategoryInput.value) == true) {
//                     document.getElementById(name).classList.replace("is-invalid", "is-valid");
//                     return true;
//                 } else {
//                     document.getElementById(name).classList.add("is-invalid");
//                     return false;
//                 }
//             }
//         }
//         document.getElementById(name).addEventListener('input', function () {
//             let valid = validation()
//             if ((regexPrice.test(productPriceInput.value) && regexName.test(productNameInput.value) && regexCategory.test(productCategoryInput.value)) == true)
//                document.getElementById('addProduct').addEventListener('click' , addProduct)
//         })

//     })

// }


for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener('focus', function (e) {
        if (productNameInput.id == e.target.id) {
            document.getElementById(e.target.id).addEventListener('input', validationName)
        } else if (productPriceInput.id == e.target.id) {
            document.getElementById(e.target.id).addEventListener('input', validationPrice)
        } else if (productCategoryInput.id == e.target.id) {
            document.getElementById(e.target.id).addEventListener('input', validationCategory)
        }
    })
}
function validationName() {
    let regexName = /^[A-Z][a-z]{3,8} {0,1}[A-Z]{0,2}[0-9]{0,4}$/;
    if (regexName.test(productNameInput.value) == true) {
        document.getElementById("productNameInput").classList.replace("is-invalid", "is-valid");
        return true
    } else {
        document.getElementById("productNameInput").classList.add("is-invalid");
        return false
    }
}
function validationPrice() {
    let regexPrice = /^[1-9][0-9]{1,5}$/;
    if (regexPrice.test(productPriceInput.value) == true) {
        document.getElementById("productPriceInput").classList.replace("is-invalid", "is-valid");
        return true
    } else {
        document.getElementById("productPriceInput").classList.add("is-invalid");
        return false
    }
}
function validationCategory() {
    let regexCategory = /^[A-Z][a-z]{3,8}$/;
    if (regexCategory.test(productCategoryInput.value) == true) {
        document.getElementById("productCategoryInput").classList.replace("is-invalid", "is-valid");
        return true
    } else {
        document.getElementById("productCategoryInput").classList.add("is-invalid");
        return false
    }
}





