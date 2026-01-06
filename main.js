/**
 * DexDeveloper - Strategic Form Logic
 */

// 1. Sidebar Dynamic Content Update
function updateSidebar(hasWebsite) {
    const sidebar = document.getElementById('sidebarContent');
    const heading = document.getElementById('dynamicHeading');
    const subtext = document.getElementById('dynamicSubtext');
    const urlBox = document.getElementById('webUrlBox');

    // Sidebar steps IDs
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    if (hasWebsite) {
        // Agar website hai (Audit Mode)
        sidebar.classList.replace('bg-blue-600', 'bg-gray-900');
        urlBox.classList.remove('hidden');
        heading.innerHTML = "Scale Your <br> Digital Revenue.";
        subtext.innerText = "Having a website is not enough. We'll analyze your current data to turn your existing traffic into a high-performance sales machine.";

        step1.innerText = "Revenue Leakage & SEO Audit";
        step2.innerText = "High-Conversion UI Redesign";
        step3.innerText = "Automated Sales Funnel Setup";
    } else {
        // Agar website nahi hai (Build Mode)
        sidebar.classList.replace('bg-gray-900', 'bg-blue-600');
        urlBox.classList.add('hidden');
        heading.innerHTML = "Let's Build Your <br> First Empire.";
        subtext.innerText = "You're just one step away from launching your digital identity. We'll help you build a website that turns strangers into customers.";

        step1.innerText = "Niche & Competitor Research";
        step2.innerText = "Custom UI/UX Blueprint";
        step3.innerText = "Launch & Growth Roadmap";
    }
}

// 2. Google Sheets Submission Logic
const scriptURL = 'https://script.google.com/macros/s/AKfycbwYW9ew_1tNms8tfeq-F8IH9CN_YyRG4yS9djIBfd-OzBc00eqqhzInPbWulFcbq85A/exec'; // Yahan apna URL paste karein
const form = document.forms['google-sheet'];
const submitBtn = document.getElementById('submitBtn');
const successOverlay = document.getElementById('successMessage');

// Check karein ki page par form exist karta hai ya nahi
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Sending Details...</span>`;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                // Show Success Message
                // Check karein successOverlay bhi exist karta ho
                if (successOverlay) {
                    successOverlay.classList.remove('hidden');
                }
                form.reset();
                console.log('Success!', response);
            })
            .catch(error => {
                alert('Something went wrong! Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerText = 'Secure My Free Session →';
                console.error('Error!', error.message);
            });
    });
}


// humburger
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

const openMenu = () => {
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('opacity-100'), 10); // Smooth fade
    mobileMenu.classList.remove('translate-x-full');
};

const closeMenu = () => {
    overlay.classList.remove('opacity-100');
    mobileMenu.classList.add('translate-x-full');
    setTimeout(() => overlay.classList.add('hidden'), 300); // Wait for transition
};

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu); // Overlay click par band ho jaye
