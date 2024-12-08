// Get modal elements
const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close-btn');
const confirmDownloadBtn = document.getElementById('confirm-download');
const cancelDownloadBtn = document.getElementById('cancel-download');
const downloadFileInfo = document.getElementById('download-file-info');
const downloadImage = document.getElementById('download-image');

// Store the current download URL
let currentDownloadUrl = '';
let currentImageUrl = '';  // Store image URL

// Open the modal and set file details when the user clicks the download button
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Set the download URL and file info in the modal
        currentDownloadUrl = e.target.getAttribute('href');
        const fileName = currentDownloadUrl.split('/').pop();
        downloadFileInfo.textContent = `You are about to download: ${fileName}`;
        
        // Here, you define the corresponding image for the download file (you can customize this)
        if (currentDownloadUrl.includes('game-assets-pack')) {
            currentImageUrl = 'images/game-assets-preview.jpg';  // Example image
        } else if (currentDownloadUrl.includes('RPGBaseEnvironment')) {
            currentImageUrl = 'images/RPGBaseEnvironment.png';  // Example image
        } else {
            currentImageUrl = '';  // Default case (no image)
        }

        // Set the image in the modal (only if an image URL is provided)
        if (currentImageUrl) {
            downloadImage.src = currentImageUrl;
            document.getElementById('download-image-container').style.display = 'block';
        } else {
            document.getElementById('download-image-container').style.display = 'none'; // Hide the image container if no image
        }

        // Show the modal
        modal.style.display = 'flex';
    });
});

// Close the modal when the user clicks the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when the user clicks the cancel button
cancelDownloadBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Confirm the download when the user clicks "Yes, Download"
confirmDownloadBtn.addEventListener('click', () => {
    window.location.href = currentDownloadUrl;  // Start the download
    modal.style.display = 'none';
});
