// Mendapatkan elemen tombol dengan kelas ".qr-button"
let btn = document.querySelector(".qr-button");

// Mendapatkan elemen yang akan menampilkan QR Code dengan kelas ".qr-code"
let qr_code_element = document.querySelector(".qr-code");

// Mendapatkan elemen link untuk mengunduh QR Code dengan ID "downloadLink"
let downloadLink = document.getElementById("downloadLink");

// Menambahkan event listener untuk tombol ketika diklik
btn.addEventListener("click", () => {
  // Mendapatkan input pengguna dari elemen dengan ID "#input_text"
  let user_input = document.querySelector("#input_text");

  // Mengecek apakah input pengguna tidak kosong
  if (user_input.value !== "") {
    // Jika belum ada QR Code, buat QR Code baru
    if (qr_code_element.childElementCount === 0) {
      generate(user_input);
    } else {
      // Jika sudah ada QR Code, hapus yang lama dan buat yang baru
      qr_code_element.innerHTML = "";
      generate(user_input);
    }
  } else {
    // Jika input kosong, tampilkan pesan kesalahan dan sembunyikan QR Code serta link download
    console.log("Input tidak valid");
    qr_code_element.style.display = "none";
    downloadLink.style.display = "none"; 
  }
});

// Fungsi untuk menghasilkan QR Code
function generate(user_input) {
  qr_code_element.style.display = "";
  qr_code_element.style.marginTop = "20px";
  qr_code_element.style.marginBottom = "20px";

  // Membuat QR Code dengan teks dari input pengguna
  var qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`, // Teks untuk QR Code diambil dari input pengguna
    width: 180,  // Lebar QR Code
    height: 180, // Tinggi QR Code
    colorDark: "#000000",  // Warna hitam untuk QR Code
    colorLight: "#FFFFFF",  // Warna putih untuk background QR Code
    correctLevel: QRCode.CorrectLevel.H,  // Level koreksi kesalahan tertinggi
  });

  setTimeout(() => {
    let qr_code_canvas = qr_code_element.querySelector("canvas"); 
    let paddedCanvas = addPaddingToQRCode(qr_code_canvas, 20); // Menambahkan padding 20px

    downloadLink.style.display = "block";
    downloadLink.href = paddedCanvas.toDataURL("image/png"); // Mengubah canvas menjadi data URL
    downloadLink.download = "qrcode.png"; // Nama file yang diunduh
  }, 300);
}

// Fungsi untuk menambahkan padding ke QR Code
function addPaddingToQRCode(originalCanvas, padding) {
  let canvas = document.createElement("canvas");
  canvas.width = originalCanvas.width + padding * 2;
  canvas.height = originalCanvas.height + padding * 2;

  let context = canvas.getContext("2d");
  context.fillStyle = "#FFFFFF"; // Warna padding (putih)
  context.fillRect(0, 0, canvas.width, canvas.height); // Mengisi canvas dengan warna putih

  // Menggambar QR Code di tengah canvas dengan padding
  context.drawImage(originalCanvas, padding, padding);

  return canvas;
}

// Menggunakan Tippy.js untuk membuat tooltip pada elemen dengan ID "#About"
tippy('#About', {
  arrow: true, // Menampilkan panah pada tooltip
  content: 'Created By bagus', // Konten teks dari tooltip
  animation: 'fade', // Animasi yang digunakan untuk menampilkan tooltip
});