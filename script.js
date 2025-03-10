const road = document.getElementById('road');
const totalFrames = 85;  // Number of images

const images = [];

// Preload all the images
for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    img.src = `road/${i + 1}.jpeg`;  // Folder 'roadsmall' with images 1 to 85
    images.push(img);
}

let lastFrame = -1;

window.addEventListener('scroll', function() {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const frameNumber = Math.min(Math.floor(scrollPercentage * totalFrames), totalFrames - 1);

    if (frameNumber !== lastFrame) {
        lastFrame = frameNumber;

        // Immediately switch to the new image without delay
        road.src = images[frameNumber].src;
    }
});

function toggleAnnotation(element) {
    let annotation = element.nextElementSibling; 
    if (annotation.style.display === "none" || annotation.style.display === "") {
        annotation.style.display = "inline"; 
    } else {
        annotation.style.display = "none";
    }
}



// Get the dash image element
const dash = document.getElementById('dash');

// Define the sections and corresponding dash images (using .png files)
const sections = [
    { id: 'abstract', image: 'dash/dash1.png' },
    { id: 'introduction', image: 'dash/dash2.png' },
    { id: 'chapter1', image: 'dash/dash3.png' },
    { id: 'chapter2', image: 'dash/dash4.png' },
    { id: 'chapter3', image: 'dash/dash5.png' },
    { id: 'conclusion', image: 'dash/dash6.png' }
];

// Function to change the dash image based on the section in view
function changeDashImage(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the section id and corresponding image
            const sectionId = entry.target.id;
            const section = sections.find(s => s.id === sectionId);
            
            if (section) {
                dash.src = section.image; // Change the source of the dash image
            }
        }
    });
}

// Set up the IntersectionObserver
const observer = new IntersectionObserver(changeDashImage, {
    threshold: [0, 0.5, 1] // Trigger at any visibility level (0% to 100% of the section)
});

// Observe each section
sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
        observer.observe(element);
    }
});

