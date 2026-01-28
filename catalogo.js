// Logic for pagination and brand filtering
const perfumes = Array.from(document.querySelectorAll(".perfume-card"));
const perfumesPerPage = 6;
let currentPage = 1;
let filteredPerfumes = [...perfumes];

// Elements
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

/**
 * Filter perfumes by brand and reset pagination
 * Exposed globally for onclick handlers in HTML
 */
window.filterPerfumes = function (brand) {
    const buttons = document.querySelectorAll('.brand-btn');

    // Update active button state
    buttons.forEach(btn => {
        const btnText = btn.innerText.trim();
        const isMatch = (brand === 'all' && btnText === 'Todas') || btnText === brand;
        btn.classList.toggle('active', isMatch);
    });

    // Filter the internal list
    filteredPerfumes = perfumes.filter(p => {
        const cardBrand = p.getAttribute('data-brand');
        return brand === 'all' || cardBrand === brand;
    });

    // Reset to first page and render
    currentPage = 1;
    render();
};

/**
 * Render current page of active perfumes
 */
function render() {
    // Hide all perfumes first
    perfumes.forEach(p => p.style.display = "none");

    // Calculate slice
    const start = (currentPage - 1) * perfumesPerPage;
    const end = start + perfumesPerPage;

    // Show only the ones on current page
    filteredPerfumes.slice(start, end).forEach(p => {
        p.style.display = "block";
    });

    renderPagination();
}

/**
 * Generate pagination buttons
 */
function renderPagination() {
    if (!pageNumbers) return;

    pageNumbers.innerHTML = "";
    const totalPages = Math.ceil(filteredPerfumes.length / perfumesPerPage);

    // Don't show numeric buttons if only 1 page
    if (totalPages <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    if (prevBtn) prevBtn.style.display = 'inline-block';
    if (nextBtn) nextBtn.style.display = 'inline-block';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");

        btn.addEventListener("click", () => {
            currentPage = i;
            render();
            // Optional: scroll to top of catalog
            document.querySelector('.catalog-section').scrollIntoView({ behavior: 'smooth' });
        });

        pageNumbers.appendChild(btn);
    }

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// Event Listeners for Prev/Next
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            render();
            document.querySelector('.catalog-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredPerfumes.length / perfumesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            render();
            document.querySelector('.catalog-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    render();
});


// ---------- MOSTRAR PERFUMES ----------
function showPage(page) {
    const start = (page - 1) * perfumesPerPage;
    const end = start + perfumesPerPage;

    perfumes.forEach((perfume, index) => {
        perfume.style.display =
            index >= start && index < end ? "block" : "none";
    });

    updatePagination();
}

// ---------- BOTONES ----------
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");

function updatePagination() {
    pageNumbers.innerHTML = "6";

    const totalPages = Math.ceil(perfumes.length / perfumesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            showPage(currentPage);
        };

        pageNumbers.appendChild(btn);
    }

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
}

prevPage.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
};

nextPage.onclick = () => {
    const totalPages = Math.ceil(perfumes.length / perfumesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
};

// INICIO
showPage(currentPage);

