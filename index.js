const inputElement = document.getElementById("inputId");
const buttonElement = document.getElementById("buttonId");
const selectElement = document.getElementById("selectId");
const idElement = document.getElementById("id");
const downloadBtn = document.getElementById("downloadBtn");

buttonElement.addEventListener("click", () => {
  const url = inputElement.value.trim();

  if (url !== "") {
    const size = parseInt(selectElement.value);
    generateQrCode(url, size);
  } else {
    alert("Please enter a valid URL.");
  }
});

function generateQrCode(url, size) {
  idElement.innerHTML = ""; // Clear previous QR code

  const qr = new QRCode(idElement, {
    text: url,
    width: size,
    height: size,
    colorDark: "#ffffff",
    colorLight: "#1d1f20",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Delay to ensure canvas is created
  setTimeout(() => {
    const canvas = idElement.querySelector("canvas");
    if (canvas) {
      downloadBtn.style.display = "block";
      downloadBtn.onclick = () => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
      };
    }
  }, 300);
}