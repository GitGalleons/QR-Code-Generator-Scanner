// script.js
// QR Code Generator Functionality
const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const qrCodeDiv = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');

generateBtn.addEventListener('click', () => {
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
        downloadBtn.style.display = 'block';
    } else {
        alert('দয়া করে কিছু টেক্সট বা URL লিখুন!');
    }
});

// Download QR Code as Image
downloadBtn.addEventListener('click', () => {
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
    }
});

// QR Code Scanner Functionality
const scanBtn = document.getElementById('scan-btn');
const video = document.getElementById('video');
const qrResult = document.getElementById('qr-result');
const copyBtn = document.getElementById('copy-btn');

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
                        // Optionally stop scanning here if one-time scan is preferred
                        // stopScanning();
                    }
                }
                requestAnimationFrame(scanFrame);
            };
            
            scanFrame();
        } catch (error) {
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