# QR Code & Barcode Generator and Scanner

A modern, responsive web application for generating and scanning QR codes, as well as generating barcodes, with support for Bengali language labels. Built using HTML, CSS, and JavaScript, this app is designed to be deployed on GitHub Pages and works seamlessly on both mobile and desktop devices.

## Features

### QR Code Generator
- **Input**: Enter text, URLs, or other data in a user-friendly input field.
- **Generate**: Create a QR code instantly with a single click.
- **Display**: View the generated QR code on the screen.
- **Download**: Save the QR code as a PNG image.

### Barcode Generator
- **Input**: Enter text for barcode generation (supports Code 128 format).
- **Generate**: Create a barcode instantly.
- **Display**: View the generated barcode on the screen.
- **Download**: Save the barcode as a PNG image.

### QR Code Scanner
- **Camera Access**: Uses WebRTC to access the device camera for real-time QR code scanning.
- **Real-Time Decoding**: Displays the decoded QR code content (text or URL) instantly.
- **Copy**: Copy the scanned content to the clipboard with a single click.

### User Interface
- **Responsive Design**: Optimized for both mobile and desktop devices.
- **Bengali Language Support**: Labels in Bengali, such as "QR কোড জেনারেট করুন" (Generate QR Code), "বারকোড জেনারেট করুন" (Generate Barcode), "QR কোড স্ক্যান করুন" (Scan QR Code), "ডাউনলোড করুন" (Download), and "কপি করুন" (Copy).
- **Modern Styling**: Clean, colorful design with CSS animations for smooth interactions.
- **Usability**: Intuitive layout with clear visual cues and icons.

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.) with camera access for the QR scanner.
- No additional software or dependencies are required, as external libraries are loaded via CDN.

### Deployment on GitHub Pages
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GitGalleons/QR-Code-Generator-Scanner.git
   cd QR-Code-Generator-Scanner
   ```
2. **Add Files**: Ensure the repository contains:
   - `index.html`
   - `style.css`
   - `script.js`
3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
4. **Enable GitHub Pages**:
   - Go to the repository on GitHub.
   - Navigate to **Settings > Pages**.
   - Under "Source", select "Deploy from a branch" and choose the `main` branch.
   - Save, and GitHub will provide a URL (e.g., `https://gitgalleons.github.io/QR-Code-Generator-Scanner/`).
5. **Access the App**: Visit the provided GitHub Pages URL. Ensure HTTPS is used for camera access.

## Usage
1. **Generate a QR Code**:
   - Enter text or a URL in the "QR কোড জেনারেট করুন" section.
   - Click the "QR কোড জেনারেট করুন" button.
   - Download the QR code using the "ডাউনলোড করুন" button.
2. **Generate a Barcode**:
   - Enter text in the "বারকোড জেনারেট করুন" section.
   - Click the "বারকোড জেনারেট করুন" button.
   - Download the barcode using the "ডাউনলোড করুন" button.
3. **Scan a QR Code**:
   - Click the "QR কোড স্ক্যান করুন" button to start the camera.
   - Grant camera permissions when prompted.
   - Point the camera at a QR code to decode it in real-time.
   - Copy the decoded content using the "কপি করুন" button.

## Technologies Used
- **HTML5**: Semantic markup for structure.
- **CSS3**: Responsive design with animations and gradient backgrounds.
- **JavaScript**: Core logic for QR code and barcode generation/scanning.
- **External Libraries**:
  - [qrcode.js](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) for QR code generation.
  - [JsBarcode](https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js) for barcode generation (Code 128 format).
  - [jsQR](https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js) for QR code scanning.
- **WebRTC**: For accessing the device camera in the browser.

## Troubleshooting
- **Camera Access Issues**: Ensure the site is served over HTTPS (GitHub Pages provides this) and grant camera permissions.
- **Barcode Generation Errors**: Verify the input is valid for Code 128 (alphanumeric strings work best). Check the browser console for errors if the barcode fails to render.
- **DOM Errors**: Ensure all element IDs in `index.html` match those in `script.js`. Clear browser cache or test in incognito mode.
- **Library Loading**: Confirm that CDN links for qrcode.js, JsBarcode, and jsQR are accessible and not blocked by network policies.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

Please ensure your code follows the existing structure and includes Bengali labels where applicable.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For issues or suggestions, open an issue on the [GitHub repository](https://github.com/GitGalleons/QR-Code-Generator-Scanner) or contact the maintainers.

© 2025 GitGalleons