// دالة لتحميل المنتجات من ملف JSON
function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // مسح المحتوى الحالي
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>السعر: $${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">أضف للسله</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

// دالة لتحميل الأمراض من ملف JSON
function loadDiseases() {
    fetch('diseases.json')
        .then(response => response.json())
        .then(diseases => {
            const diseaseList = document.getElementById('disease-list');
            diseaseList.innerHTML = ''; // مسح المحتوى الحالي
            diseases.forEach(disease => {
                const diseaseBtn = document.createElement('button');
                diseaseBtn.classList.add('disease-btn');
                diseaseBtn.textContent = disease.name;
                diseaseBtn.onclick = () => showDiseaseDetails(disease);
                diseaseList.appendChild(diseaseBtn);
            });
        })
        .catch(error => console.error('Error loading diseases:', error));
}

// دالة لعرض تفاصيل المرض
function showDiseaseDetails(disease) {
    const diseaseDetails = document.getElementById('disease-details');
    diseaseDetails.innerHTML = `
        <h3>${disease.name}</h3>
        <p>${disease.description}</p>
    `;
    diseaseDetails.style.display = 'block';
}

// دالة لتحميل النصائح من ملف JSON
function loadTips() {
    fetch('tips.json')
        .then(response => response.json())
        .then(tips => {
            const tipList = document.getElementById('tip-list');
            tipList.innerHTML = ''; // مسح المحتوى الحالي
            tips.forEach(tip => {
                const tipBtn = document.createElement('button');
                tipBtn.classList.add('tip-btn');
                tipBtn.textContent = tip.title;
                tipBtn.onclick = () => showTipDetails(tip);
                tipList.appendChild(tipBtn);
            });
        })
        .catch(error => console.error('Error loading tips:', error));
}

// دالة لعرض تفاصيل النصيحة
function showTipDetails(tip) {
    const tipDetails = document.getElementById('tip-details');
    tipDetails.innerHTML = `
        <h3>${tip.title}</h3>
        <p>${tip.description}</p>
    `;
    tipDetails.style.display = 'block';
}

// دالة لإضافة منتج إلى العربة
let cart = [];
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice, quantity: 1 };
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    updateCart();
}

// دالة لتحديث محتويات العربة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // مسح المحتوى الحالي
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// دالة لإزالة منتج من العربة
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    updateCart();
}

// دالة للبحث عن المنتجات
function searchProducts() {
    const searchQuery = document.getElementById('product-search').value.toLowerCase();
    const productList = document.getElementById('product-list');
    const products = document.querySelectorAll('.item');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// دالة للبحث عن الأمراض
function searchDiseases() {
    const searchQuery = document.getElementById('disease-search').value.toLowerCase();
    const diseaseList = document.getElementById('disease-list');
    const diseases = diseaseList.querySelectorAll('.disease-btn');
    
    diseases.forEach(disease => {
        const diseaseName = disease.textContent.toLowerCase();
        if (diseaseName.includes(searchQuery)) {
            disease.style.display = 'block';
        } else {
            disease.style.display = 'none';
        }
    });
}

// دالة للبحث عن النصائح
function searchTips() {
    const searchQuery = document.getElementById('tip-search').value.toLowerCase();
    const tipList = document.getElementById('tip-list');
    const tips = tipList.querySelectorAll('.tip-btn');
    
    tips.forEach(tip => {
        const tipTitle = tip.textContent.toLowerCase();
        if (tipTitle.includes(searchQuery)) {
            tip.style.display = 'block';
        } else {
            tip.style.display = 'none';
        }
    });
}

// استدعاء الدوال لتحميل البيانات عند تحميل الصفحة
window.onload = function() {
    loadProducts();
    loadDiseases();
    loadTips();
};




























// دالة لزيادة الكمية
function increaseQuantity(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
        updateCart(); // تحديث العربة بعد تعديل الكمية
    }
}

// دالة لنقصان الكمية
function decreaseQuantity(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1 && cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
        updateCart(); // تحديث العربة بعد تعديل الكمية
    } else if (productIndex > -1 && cart[productIndex].quantity === 1) {
        removeFromCart(productName); // إذا وصلت الكمية إلى 0 يتم حذف المنتج
    }
}

// تعديل دالة updateCart لإضافة أزرار "+" و "-"
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // مسح المحتوى الحالي
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="decreaseQuantity('${item.name}')">-</button>
            <button onclick="increaseQuantity('${item.name}')">+</button>
            <button onclick="removeFromCart('${item.name}')">إزاله</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // حساب وعرض الناتج الكلي
    calculateTotalPrice();
}













function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // مسح المحتوى الحالي
    let total = 0; // متغير لحساب الإجمالي الكلي
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
            <button onclick="increaseQuantity('${item.name}')">+</button>
            <button onclick="decreaseQuantity('${item.name}')">-</button>
             <button onclick="removeFromCart('${item.name}')">إزاله</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity; // حساب الإجمالي الكلي
    });

    // عرض الإجمالي الكلي
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>إجمالي: $${total.toFixed(2)}</h3>`;
    cartItems.appendChild(totalDiv);
}

function increaseQuantity(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
        updateCart(); // تحديث العربة بعد التغيير
    }
}

function decreaseQuantity(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1 && cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
    } else if (productIndex > -1) {
        cart.splice(productIndex, 1); // إزالة المنتج إذا كانت الكمية صفر
    }
    updateCart(); // تحديث العربة بعد التغيير
}