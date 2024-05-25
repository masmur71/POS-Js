// Data Produk yang ada didalam Array
const products = [
    { code: "001", name: "Beras Serbaguna", price: 70000 },
    { code: "002", name: "Indomie Goreng", price: 2400 },
    { code: "003", name: "Kecap Sedap", price: 30000 },
    { code: "004", name: "Telum Negeri 10 pcs", price: 10000 },
    { code: "005", name: "Susu Frisian Flag", price: 16000 },
    { code: "006", name: "Saus Tomat Delmonte", price: 32000 },
    { code: "007", name: "Sabun lifeBuoy", price: 69000 },
    { code: "008", name: "Shampo Head & Shoulder", price: 80000 },
    { code: "009", name: "Pasta Gigi Pepsodent", price: 25000 },
    { code: "010", name: "Sabun Muka Kahf", price: 43000 }
];

let cart = [];

document.getElementById("tambahProduk").addEventListener("click", addItem);

function addItem() {
    const productCode = document.getElementById("kodeProduk").value;
    const quantity = parseInt(document.getElementById("jumlah").value);

    // Memvalidasi Kode Produk
    const product = products.find(p => p.code === productCode);
    if (!product) {
        alert("Produk Tidak Ditemukan!");
        return;
    }

    // Memvalidasi Jumlah Barang
    if (isNaN(quantity) || quantity <= 0) {
        alert("Masukan Jumlah yang Valid!");
        return;
    }

    // Mengecek ketersediaan item didalam cart
    const existingItemIndex = cart.findIndex(item => item.product.code === productCode);
    if (existingItemIndex !== -1) {
        // jika item/produk sudah ada makan lakukan update
        cart[existingItemIndex].quantity += quantity;
    } else {
        // jika item/produk belum ada maka menambahkan item/produk
        cart.push({ product, quantity });
    }

    // Melakukan pembersihan inputan
    document.getElementById("kodeProduk").value = "";
    document.getElementById("jumlah").value = "";

    // Mendisplay cart
    displayCart();
}

function displayCart() {
    const cartBody = document.getElementById("keranjang");
    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const { name, price } = item.product;
        const subtotal = price * item.quantity;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${item.quantity}</td>
            <td>Rp${price.toFixed()}</td>
            <td>Rp${subtotal.toFixed()}</td>
            <td>
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>

            </td>
        `;
        cartBody.appendChild(row);
    });



    // Menampikan Total Belanja
    const simpleReceipt = document.getElementById("totalBelanja");
    simpleReceipt.innerHTML = `<h2>Total Belanja</h2>`;
    cart.forEach(item => {
        simpleReceipt.innerHTML += `<p>${item.product.name}: ${item.quantity}</p>`;
    });
    simpleReceipt.innerHTML += `<h3>Total: Rp${total.toFixed()}</h3>`;
}

function editItem(index) {
    const item = cart[index];
    const newQuantity = parseInt(prompt("Masukkan Jumlah Baru:", item.quantity));
    if (!isNaN(newQuantity) && newQuantity > 0) {
        cart[index].quantity = newQuantity;
        displayCart();
    } else {
        alert("Masukkan Jumlah yang Valid!");
    }
}

function deleteItem(index) {
    cart.splice(index, 1);
    displayCart();
}
