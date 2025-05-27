
// Data for the investment opportunity
const investmentData = {
    id: 'sheep-creek-mine',
    name: 'Sheep Creek Mine Rare Earth Project',
    shortDescription: 'Invest in America\'s critical mineral independence. High-grade rare earth elements & gallium.',
    longDescription: 'A strategic partnership to connect patriotic investors with critical mineral production using innovative technology. This project focuses on the Sheep Creek Mine, one of the highest grade rare earth projects in the U.S. and the only economically viable domestic source of gallium.',
    details: {
        'Significance': [
            'Vital for U.S. national security and domestic supply chains.',
            'Addresses critical mineral dependency by establishing a U.S. based source.',
            'The only economically viable domestic source of gallium.'
        ],
        'UCM Partnership': [
            'RealPort and UCM (USA Critical Minerals) have partnered to bring this opportunity to patriotic investors.',
            'UCM brings political support, national security backing, and media attention.',
            'Leverages clean extraction technology developed with INL (Idaho National Laboratory).'
        ],
        'Tokenization': [
            'Example: A $20M mineral deal can be represented by 20 million tokens.',
            'Each token signifies legally-binding, transparent ownership in the underlying asset.',
            'Accessible Investment: Start with as little as $1,000.'
        ],
        'Token Features': [
            'Tradable Digital Asset: Trackable and potentially tradable on approved secondary markets.',
            'Trump Coin Option: Use cryptocurrency for purpose-driven investing.',
            'Real-World Perks: Gallium samples, mine tours, collectibles, and signed gear for token holders.'
        ],
        'Reg A+ Compliance': [
            'Mini-IPO Structure: Allows investment from everyday people, not just accredited investors.',
            'Funding Potential: Up to $75M per year.',
            'SEC Reviewed: Fully legal framework, offering a simplified version of going public.',
            'Operating Company: Qualifies as an operating company, avoiding complex investment company burdens.'
        ],
        'SPV LLC Structure': [
            'A Special Purpose Vehicle (SPV) LLC, jointly owned by RealPort and USCM.',
            'The SPV acts as the official filer for the Reg A+ offering.',
            'Targeted Funds: All investments are strictly dedicated to Sheep Creek mining operations.'
        ],
        'Secondary Market (ATS)': [
            'Potential for token holders to trade on a partner Alternative Trading System (e.g., tZERO).',
            'RealPort may earn 1.5%-3.0% of transaction fees through referral/licensing.',
            'Offers future liquidity, possible buyback programs, and early exit flexibility.'
        ],
        'Timeline & Cost': [
            'Projected Launch: 90-120 days.',
            'Estimated Launch Cost: $175K - $250K.',
            'Key Phases: Legal Setup for SPV (3-4 months, $75K-$125K); Media Campaign (1 month, $100K-$125K).'
        ],
        'Partnership Framework': [
            'USCM: Receives 5% equity in RealPort & 40% of RealPort revenue from Sheep Creek.',
            'RealPort: Receives an equity option in USCM at a $25M valuation.',
            'Mutual Benefits: Enhanced platform credibility, media reach, value alignment via Trump Coin.',
            'National Impact: Joint ownership of one of the first tokenized national security-grade projects.'
        ]
    },
    tokenPrice: 1, // Illustrative price per token
};

// Application State
let currentView = 'dashboard'; // 'dashboard', 'investmentDetail'
let isModalOpen = false;
let investmentAmountTokens = 1000; // Default investment amount
let investmentSuccessMessage = '';

function render() {
    const appRoot = document.getElementById('app');
    if (!appRoot) {
        console.error('App root not found during render. Halting.');
        return;
    }
    appRoot.innerHTML = ''; // Clear previous content

    // Sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.setAttribute('role', 'navigation');
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <a href="#" data-view="dashboard">RealPort</a>
        </div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="#" data-view="dashboard" class="${currentView === 'dashboard' ? 'active' : ''}"><span class="icon">🏠</span> Dashboard</a></li>
                <li><a href="#" class="disabled-link"><span class="icon">📈</span> My Investments</a></li>
                <li><a href="#" class="disabled-link"><span class="icon">🏦</span> Account</a></li>
                <li><a href="#" class="disabled-link"><span class="icon">⚙️</span> Settings</a></li>
            </ul>
        </nav>
    `;
    appRoot.appendChild(sidebar);

    // Main Content
    const mainContent = document.createElement('main');
    mainContent.className = 'main-content';
    mainContent.setAttribute('role', 'main');

    const contentHeader = document.createElement('header');
    contentHeader.className = 'content-header';
    const headerTitle = document.createElement('h1');
    contentHeader.appendChild(headerTitle);
    mainContent.appendChild(contentHeader);

    const contentArea = document.createElement('div');
    contentArea.className = 'content-area';
    mainContent.appendChild(contentArea);


    if (currentView === 'dashboard') {
        headerTitle.textContent = 'Dashboard';
        contentArea.innerHTML = `
            <div class="dashboard-welcome">
                <h2>Welcome, Patriotic Investor!</h2>
                <p>Explore opportunities to invest in America's future.</p>
            </div>
            <div class="featured-investment-card" data-investment-id="${investmentData.id}" role="article" aria-labelledby="featured-title">
                <h3 id="featured-title">${investmentData.name}</h3>
                <p>${investmentData.shortDescription}</p>
                <button class="btn btn-primary" data-investment-id="${investmentData.id}">View Details & Invest</button>
            </div>
            <div class="portfolio-overview-placeholder">
                <h3>My Portfolio Overview</h3>
                <p>(Portfolio summary and performance charts will be displayed here in a future version)</p>
                <img src="https://via.placeholder.com/600x200.png?text=Placeholder+Portfolio+Chart" alt="Placeholder for portfolio chart" style="max-width:100%; height:auto; border-radius: 4px; margin-top:15px;">
            </div>
        `;
    } else if (currentView === 'investmentDetail') {
        headerTitle.textContent = investmentData.name;
        let tabsHTML = '';
        let tabContentsHTML = '';

        Object.keys(investmentData.details).forEach((key, index) => {
            const isActive = index === 0;
            tabsHTML += `<button class="tab-button ${isActive ? 'active' : ''}" data-tab="${key.toLowerCase().replace(/\s/g, '-')}">${key}</button>`;
            const listItems = investmentData.details[key].map((item) => `<li>${item}</li>`).join('');
            tabContentsHTML += `
                <div id="${key.toLowerCase().replace(/\s/g, '-')}" class="tab-content ${isActive ? 'active' : ''}">
                    <ul>${listItems}</ul>
                </div>`;
        });

        contentArea.innerHTML = `
            <div class="investment-detail-container">
                <h2>${investmentData.name}</h2>
                <p>${investmentData.longDescription}</p>
                <div class="investment-detail-tabs">${tabsHTML}</div>
                <div class="tab-content-container">${tabContentsHTML}</div>
                <button class="btn btn-accent btn-invest-now mt-2">Invest Now in ${investmentData.name}</button>
            </div>
        `;
    }

    appRoot.appendChild(mainContent);

    // Modal
    if (isModalOpen) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay visible';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-labelledby', 'modal-title');

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title">Invest in ${investmentData.name}</h2>
                    <button class="modal-close-btn" aria-label="Close modal">&times;</button>
                </div>
                <p>Enter the number of tokens you wish to purchase. (1 Token = $${investmentData.tokenPrice})</p>
                <div class="form-group">
                    <label for="investment-amount">Number of Tokens:</label>
                    <input type="number" id="investment-amount" value="${investmentAmountTokens}" min="1">
                </div>
                <div class="calculated-cost">
                    Estimated Cost: <span>$${investmentAmountTokens * investmentData.tokenPrice}</span>
                </div>
                ${investmentSuccessMessage ? `<div class="success-message">${investmentSuccessMessage}</div>` : ''}
                <div class="modal-actions">
                    <button class="btn btn-secondary modal-cancel-btn">Cancel</button>
                    <button class="btn btn-primary modal-confirm-btn">Confirm Investment</button>
                </div>
            </div>
        `;
        appRoot.appendChild(modalOverlay);

        modalOverlay.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
        modalOverlay.querySelector('.modal-cancel-btn')?.addEventListener('click', closeModal);
        modalOverlay.querySelector('.modal-confirm-btn')?.addEventListener('click', handleConfirmInvestment);
        const amountInput = modalOverlay.querySelector('#investment-amount');
        amountInput?.addEventListener('input', (e) => {
            console.log('Modal input event:', e);
            console.log('Modal input e.target:', e.target);
            if (e.target && typeof e.target.value !== 'undefined') {
                investmentAmountTokens = parseInt(e.target.value) || 0;
                const costDisplay = modalOverlay.querySelector('.calculated-cost span');
                if(costDisplay) costDisplay.textContent = `$${investmentAmountTokens * investmentData.tokenPrice}`;
            } else {
                console.error('e.target or e.target.value is not accessible in modal input.');
            }
            investmentSuccessMessage = '';
            render();
        });
        const modalContentElement = modalOverlay.querySelector('.modal-content');
        if (modalContentElement) {
           modalContentElement.addEventListener('click', (e) => e.stopPropagation());
        }
        modalOverlay.addEventListener('click', closeModal);
    }
    addEventListeners();
}

function navigate(view) {
    currentView = view;
    investmentSuccessMessage = '';
    render();
}

function openInvestmentDetail() {
    currentView = 'investmentDetail';
    render();
}

function openModal() {
    isModalOpen = true;
    investmentAmountTokens = 1000;
    investmentSuccessMessage = '';
    render();
}

function closeModal() {
    isModalOpen = false;
    investmentSuccessMessage = '';
    render();
}

function handleConfirmInvestment() {
    investmentSuccessMessage = `Congratulations! Your investment of ${investmentAmountTokens} tokens in ${investmentData.name} is notionally confirmed for $${investmentAmountTokens * investmentData.tokenPrice}. (This is an MVP demonstration).`;
    render();
}

function handleTabClick(e) {
    const target = e.target;
    if (target && target.classList && target.classList.contains('tab-button')) {
        const tabId = target.dataset.tab;
        if (tabId) {
            const currentAppRoot = document.getElementById('app');
            if (!currentAppRoot) return;
            currentAppRoot.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            currentAppRoot.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            target.classList.add('active');
            const activeContent = currentAppRoot.querySelector(`#${tabId}`); // Use querySelector for IDs too
            if (activeContent) {
                activeContent.classList.add('active');
            }
        }
    }
}


function addEventListeners() {
    const appRoot = document.getElementById('app');
    if (!appRoot) {
        console.error("addEventListeners: App root not found. Listeners not attached.");
        return;
    }

    appRoot.querySelectorAll('.sidebar-nav a[data-view]').forEach(linkElement => {
        linkElement.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Sidebar link clicked. e.currentTarget:', e.currentTarget); // Logging
            const currentLink = e.currentTarget; // Use e.currentTarget
            if (!currentLink) {
                console.error('Clicked sidebar link (e.currentTarget) is null or undefined.');
                return;
            }
            const view = currentLink.dataset.view;
            if (view && currentLink.classList && !currentLink.classList.contains('disabled-link')) {
                navigate(view);
            } else {
                console.warn('Sidebar link click: View is undefined or link is disabled.', 'View:', view, 'Has classList:', !!currentLink.classList);
                 if (currentLink.classList) {
                    console.warn('Is disabled-link:', currentLink.classList.contains('disabled-link'));
                 }
            }
        });
    });

    const sidebarHeaderLink = appRoot.querySelector('.sidebar-header a[data-view]');
    if(sidebarHeaderLink) {
        sidebarHeaderLink.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLink = e.currentTarget;
             if (!currentLink) {
                console.error('Clicked sidebar header link (e.currentTarget) is null or undefined.');
                return;
            }
            const view = currentLink.dataset.view;
            if (view) navigate(view);
        });
    }

    appRoot.querySelectorAll('.featured-investment-card button, .featured-investment-card h3, .featured-investment-card p').forEach(el => {
         el.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.featured-investment-card');
            if (card && card.dataset.investmentId === investmentData.id) {
                 openInvestmentDetail();
            }
        });
    });

    const featuredCard = appRoot.querySelector('.featured-investment-card');
    if(featuredCard) {
        featuredCard.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'button') return;
            if (featuredCard.dataset.investmentId === investmentData.id) {
                openInvestmentDetail();
            }
        });
        if (featuredCard.style) { // Check if style exists
            featuredCard.style.cursor = 'pointer';
        }
    }

    const investNowBtn = appRoot.querySelector('.btn-invest-now');
    investNowBtn?.addEventListener('click', openModal);

    const tabsContainer = appRoot.querySelector('.investment-detail-tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', handleTabClick);
    }
}

document.addEventListener('DOMContentLoaded', render);
