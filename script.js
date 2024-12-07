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
        } else if (currentDownloadUrl.includes('level-design-template')) {
            currentImageUrl = 'images/level-design-preview.jpg';  // Example image
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

// YouTube API Key and Channel ID
const apiKey = 'AIzaSyBtK9RQ99LY_FyM_hol3XIWjk9WfU1dAfM'; // Replace with your API key
const channelId = "UCzmtKpQQyZ-9ZNY_bbFtVHw"; // Replace with your YouTube Channel ID

document.addEventListener('DOMContentLoaded', () => {
    // Define the API URL for fetching the latest video from the YouTube channel
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=1`;

    // Make the API call to get the latest video
    fetch(apiUrl)
        .then(response => {
            // Check if the API request was successful
            if (!response.ok) {
                throw new Error(`YouTube API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Ensure there is at least one video
            if (data.items && data.items.length > 0) {
                const latestVideo = data.items[0];
                const videoId = latestVideo.id.videoId;
                const videoTitle = latestVideo.snippet.title;
                const videoDescription = latestVideo.snippet.description;

                // Create HTML to embed the YouTube video dynamically
                const videoHtml = `
                    <h4>${videoTitle}</h4>
                    <p>${videoDescription}</p>
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        title="${videoTitle}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;

                // Insert the video HTML into the container
                document.getElementById('youtube-video-container').innerHTML = videoHtml;
            } else {
                // If no videos are found, display a message
                document.getElementById('youtube-video-container').innerText = 'No recent video found.';
            }
        })
        .catch(error => {
            // Log the error and display a message if something goes wrong
            console.error('Error fetching YouTube data:', error);
            document.getElementById('youtube-video-container').innerText = 'Error loading video.';
        });
});
