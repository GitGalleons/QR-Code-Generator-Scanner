// script.js
// Wait for the DOM to fully load before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // QR Code Generator Functionality
    const generateQrBtn = document.getElementById('generate-qr-btn');
    const qrInput = document.getElementById('qr-input');
    const qrCodeDiv = document.getElementById('qr-code');
    const downloadQrBtn = document.getElementById('download-qr-btn');

    // Check if QR code elements exist
    if (!generateQrBtn || !qrInput || !qrCodeDiv || !downloadQrBtn) {
        console.error('One or more QR code elements not found in the DOM');
        return;
    }

    generateQrBtn.addEventListener('click', () => {
        // Clear previous QR code
        qrCodeDiv.innerHTML = '';
        
        const inputValue = qrInput.value.trim();
        if (inputValue) {
            // Generate QR code using qrcode.js library
            new QRCode(qrCodeDiv, {
                text: inputValue,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // Show download button
            downloadQrBtn.style.display = 'block';
        } else {
            alert('দয়া করে কিছু টেক্সট বা URL লিখুন!');
        }
    });

    // Download QR Code as Image
    downloadQrBtn.addEventListener('click', () => {
        const canvas = qrCodeDiv.querySelector('canvas');
        if (canvas) {
            // Convert canvas to data URL and trigger download
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'qr_code.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('QR কোড ডাউনলোড করতে সমস্যা হয়েছে।');
        }
    });

    // Barcode Generator Functionality
    const generateBarcodeBtn = document.getElementById('generate-barcode-btn');
    const barcodeInput = document.getElementById('barcode-input');
    const barcodeCanvas = document.getElementById('barcode2');
    const downloadBarcodeBtn = document.getElementById('download-barcode-btn');

    // Check if barcode elements exist and verify barcodeCanvas is a canvas element
    if (!generateBarcodeBtn || !barcodeInput || !barcodeCanvas || !downloadBarcodeBtn) {
        console.error('One or more barcode elements not found in the DOM');
        return;
    }
    if (barcodeCanvas.tagName !== 'CANVAS') {
        console.error('Element with ID "barcode" is not a <canvas> element');
        return;
    }

    generateBarcodeBtn.addEventListener('click', () => {
        const inputValue = barcodeInput.value.trim();
        if (inputValue) {
            try {
                // Clear previous barcode by resetting canvas
                const ctx = barcodeCanvas.getContext('2d');
                ctx.clearRect(0, 0, barcodeCanvas.width, barcodeCanvas.height);

                // Generate Code 128 barcode using JsBarcode
                JsBarcode(barcodeCanvas, inputValue, {
                    format: "CODE128",
                    width: 2,
                    height: 100,
                    displayValue: true,
                    background: "#ffffff",
                    lineColor: "#000000"
                });
                
                // Show download button
                downloadBarcodeBtn.style.display = 'block';
            } catch (error) {
                console.error('Barcode generation error:', error);
                alert('বারকোড তৈরি করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
            }
        } else {
            alert('দয়া করে বারকোডের জন্য কিছু টেক্সট লিখুন!');
        }
    });

    // Download Barcode as Image
    downloadBarcodeBtn.addEventListener('click', () => {
        if (barcodeCanvas && barcodeCanvas.toDataURL) {
            // Convert canvas to data URL and trigger download
            const url = barcodeCanvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'barcode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('বারকোড ডাউনলোড করতে সমস্যা হয়েছে।');
        }
    });

    // QR Code Scanner Functionality
    const scanBtn = document.getElementById('scan-btn');
    const video = document.getElementById('video');
    const qrResult = document.getElementById('qr-result');
    const copyBtn = document.getElementById('copy-btn');

    // Check if scanner elements exist
    if (!scanBtn || !video || !qrResult || !copyBtn) {
        console.error('One or more scanner elements not found in the DOM');
        return;
    }

    let scanning = false;
    let stream = null;

    scanBtn.addEventListener('click', async () => {
        if (!scanning) {
            // Start scanning
            scanning = true;
            scanBtn.textContent = 'স্ক্যান বন্ধ করুন';
            
            try {
                // Request camera access (prefer rear camera on mobile)
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                video.srcObject = stream;
                await video.play();
                
                // Create off-screen canvas for processing frames
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Frame processing loop
                const scanFrame = () => {
                    if (video.readyState === video.HAVE_ENOUGH_DATA && scanning) {
                        canvas.height = video.videoHeight;
                        canvas.width = video.videoWidth;
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        
                        // Use jsQR to decode the frame
                        const code = jsQR(imageData.data, imageData.width, imageData.height);
                        if (code) {
                            qrResult.textContent = code.data;
                            copyBtn.style.display = 'block';
                        }
                    }
                    if (scanning) {
                        requestAnimationFrame(scanFrame);
                    }
                };
                
                scanFrame();
            } catch (error) {
                console.error('Camera access error:', error);
                alert('ক্যামেরা অ্যাক্সেস করতে সমস্যা হয়েছে। দয়া করে অনুমতি দিন বা অন্য ডিভাইস চেষ্টা করুন।');
                stopScanning();
            }
        } else {
            // Stop scanning
            stopScanning();
        }
    });

    // Function to stop scanning
    function stopScanning() {
        scanning = false;
        scanBtn.textContent = 'QR কোড স্ক্যান করুন';
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            stream = null;
        }
        qrResult.textContent = '';
        copyBtn.style.display = 'none';
    }

    // Copy Scanned Content to Clipboard
    copyBtn.addEventListener('click', () => {
        const text = qrResult.textContent;
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => alert('কন্টেন্ট কপি করা হয়েছে!'))
                .catch(() => alert('কপি করতে সমস্যা হয়েছে।'));
        }
    });
});