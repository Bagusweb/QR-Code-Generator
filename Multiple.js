// Fungsi untuk menambahkan input field baru
document.getElementById("addInputBtn").addEventListener("click", () => {
    let inputContainer = document.getElementById("input-container");
    let inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "input_text";
    newInput.className = "qr-input";
    newInput.placeholder = "Enter text or URL";
    newInput.autocomplete = "off";

    let removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("onclick", "removeInput(this)");

    inputGroup.appendChild(newInput);
    inputGroup.appendChild(removeBtn);
    inputContainer.appendChild(inputGroup);
});

// Fungsi untuk menghapus input field
function removeInput(element) {
    element.parentElement.remove();
}

// Fungsi untuk menghasilkan QR Codes
document.getElementById("generateBtn").addEventListener("click", () => {
    let inputElements = document.querySelectorAll(".qr-input");
    let qrCodesContainer = document.getElementById("qr-codes-container");
    qrCodesContainer.innerHTML = ""; // Menghapus QR Codes yang sudah ada

    inputElements.forEach((inputElement, index) => {
        if (inputElement.value.trim() !== "") {
            let qrDiv = document.createElement("div");
            qrDiv.className = "qr-code";
            qrCodesContainer.appendChild(qrDiv);

            let qrCode = new QRCode(qrDiv, {
                text: inputElement.value.trim(),
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#FFFFFF",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Menambahkan tautan unduh untuk setiap QR Code
            setTimeout(() => {
                let qrImage = qrDiv.querySelector("img");
                let downloadLink = document.createElement("a");
                downloadLink.className = "download-link";
                downloadLink.href = qrImage.src;
                downloadLink.download = `qrcode_${index + 1}.png`;
                downloadLink.textContent = `Download QR Code ${index + 1}`;
                qrDiv.appendChild(downloadLink);
            }, 300);
        }
    });
});

// Fungsi untuk mengunduh semua QR Codes sebagai gambar terpisah
document.getElementById("downloadAllBtn").addEventListener("click", () => {
    let qrDivs = document.querySelectorAll(".qr-code img");
    qrDivs.forEach((qrImg, index) => {
        let link = document.createElement("a");
        link.href = qrImg.src;
        link.download = `qrcode_${index + 1}.png`;
        link.click();
    });
});
