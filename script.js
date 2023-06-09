const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 5;
const apiKey = 'IAQ7Qw9e2x-1NBWx3oEnCvmcOJQT7b8Zb4S2x1riEvo';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${"apple"}`;

// Check if all images were loaded
function imageLoaded(){
    console.log('Image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM

function diplayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run fuction for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
        // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
});

}

// Get photes from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        diplayPhotos();

    } catch (error){
        // Catch error here
    }
}

// Checking to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();