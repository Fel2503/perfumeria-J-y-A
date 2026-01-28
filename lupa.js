
// Logic for toggling search input visibility
window.toggleSearch = function () {
    const searchContainer = document.querySelector('.header-search');
    const input = document.getElementById('headerSearchInput');
    const resultsContainer = document.getElementById('searchResults');

    if (searchContainer && input) {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            input.focus();
        } else {
            // Hide results when closing
            if (resultsContainer) resultsContainer.style.display = 'none';
        }
    }
};

// Data extraction helper
function getPerfumeData() {
    const cards = document.querySelectorAll('.perfume-card');
    const data = [];
    cards.forEach(card => {
        const name = card.dataset.name;
        const img = card.querySelector('img').getAttribute('src');
        // Extract price number
        const priceText = card.querySelector('.price').textContent; // "COP $80.000"
        const priceClean = priceText.replace(/[^0-9]/g, ''); // "80000"

        if (name) {
            data.push({
                name: name,
                img: img,
                price: priceClean,
                displayPrice: priceText
            });
        }
    });
    return data;
}

// Setup search results container
const headerSearch = document.querySelector('.header-search');
const mainHeader = document.querySelector('header');
if (mainHeader) mainHeader.style.position = 'relative'; // Ensure relative positioning for header

let resultsContainer = document.getElementById('searchResults');

if (headerSearch && !resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'searchResults';

    // Style it to appear on the right side below header
    Object.assign(resultsContainer.style, {
        position: 'absolute',
        top: '100%',
        left: 'auto',
        right: '40px',     // Align with header padding
        margin: '0',
        width: '320px',    // Smaller fixed width
        maxWidth: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
        borderRadius: '0 0 8px 8px',
        display: 'none',
        zIndex: '2000',   // Higher than hero
        maxHeight: '400px',
        overflowY: 'auto',
        borderTop: '1px solid #eee'
    });

    // Append to mainHeader (or fallback to headerSearch)
    if (mainHeader) {
        mainHeader.appendChild(resultsContainer);
    } else {
        headerSearch.appendChild(resultsContainer);
    }
}

const headerInput = document.getElementById('headerSearchInput');

if (headerInput) {
    headerInput.addEventListener('keyup', (e) => {
        const text = e.target.value.toLowerCase();

        if (text.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const allPerfumes = getPerfumeData();
        const matches = allPerfumes.filter(p => p.name.toLowerCase().includes(text));

        if (matches.length > 0) {
            resultsContainer.innerHTML = '';

            // 1. Header Row
            const headerRow = document.createElement('div');
            Object.assign(headerRow.style, {
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 15px',
                borderBottom: '1px solid #f0f0f0',
                marginBottom: '5px',
                fontSize: '13px',
                color: '#333'
            });
            headerRow.innerHTML = `
                <span style="font-weight: bold;">Resultados</span>
                <span style="color: #888;">${matches.length} items encontrados</span>
            `;
            resultsContainer.appendChild(headerRow);

            matches.forEach(p => {
                const item = document.createElement('div');
                Object.assign(item.style, {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Push arrow to right
                    padding: '10px 15px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #f9f9f9'
                });
                item.onmouseover = () => item.style.background = '#f9f9f9';
                item.onmouseout = () => item.style.background = 'transparent';

                // Left side (Img + Text)
                const leftDiv = document.createElement('div');
                leftDiv.style.display = 'flex';
                leftDiv.style.alignItems = 'center';

                // Image
                const img = document.createElement('img');
                img.src = p.img;
                Object.assign(img.style, {
                    width: '50px',
                    height: '50px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    marginRight: '12px',
                    backgroundColor: '#fff'
                });

                // Text block
                const textDiv = document.createElement('div');
                textDiv.innerHTML = `
                    <div style="font-size: 13px; font-weight: bold; color: #222; text-transform: uppercase; margin-bottom: 4px;">${p.name}</div>
                    <div style="font-size: 14px; color: #d4af37; font-weight: bold;">${p.displayPrice}</div>
                `;

                leftDiv.appendChild(img);
                leftDiv.appendChild(textDiv);

                // Right arrow
                const arrow = document.createElement('div');
                arrow.innerHTML = '›';
                Object.assign(arrow.style, {
                    color: '#ccc',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginLeft: '10px'
                });

                item.appendChild(leftDiv);
                item.appendChild(arrow);

                // Click action -> Go to product page
                item.onclick = () => {
                    window.location.href = `producto.html?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`;
                };

                resultsContainer.appendChild(item);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div style="padding:10px; color:#777; font-size:13px; text-align:center;">No se encontraron resultados</div>';
            resultsContainer.style.display = 'block';
        }
    });

    // Hide when clicking outside
    document.addEventListener('click', (e) => {
        // Now check if click is outside BOTH headerSearch AND resultsContainer
        if (!headerSearch.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
}
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const perfumes = [
    {
        name: "KHAMRAH",
        image: "khamrah.png",
        oldPrice: "$85.000",
        price: "$75.650",
        discount: "11% OFF"
    },
    {
        name: "KHAMRAH QAHWA",
        image: "khamrah.png",
        oldPrice: "$175.000",
        price: "$150.500",
        discount: "14% OFF"
    },
    {
        name: "KHAMRAH LATTAFA ORIGINAL",
        image: "img/khamrah-lattafa.jpg",
        oldPrice: "$160.000",
        price: "$152.000",
        discount: "5% OFF"
    }
];

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (value === "") {
        searchResults.style.display = "none";
        return;
    }

    const filtered = perfumes.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    filtered.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("search-item");

        item.innerHTML = `
            <img src="${p.image}">
            <div class="search-info">
                <h4>${p.name}</h4>
                <span class="old-price">${p.oldPrice}</span><br>
                <span class="price">${p.price}</span>
                <span class="discount">${p.discount}</span>
            </div>
        `;

        searchResults.appendChild(item);
    });

    searchResults.style.display = "block";
});

