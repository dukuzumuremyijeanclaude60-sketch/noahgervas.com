// PASSWORD Y'IBANGA YA ADMIN (Ushobora kuyihindura hano)
const ADMIN_PASSWORD = "NoahGervais2026"; 
let isAdmin = false;

// 1. IBITEKEREZO (COMMENT SECTION)
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('client-name').value;
    const message = document.getElementById('client-message').value;
    
    if(name.trim() === "" || message.trim() === "") return;

    const commentDisplay = document.getElementById('comments-display');
    
    const commentHTML = `
        <div class="single-comment">
            <strong>${name}:</strong>
            <p>${message}</p>
        </div>
    `;
    
    commentDisplay.insertAdjacentHTML('afterbegin', commentHTML);
    
    // Gusiba ibyo baje gushiramo
    document.getElementById('client-name').value = '';
    document.getElementById('client-message').value = '';
});

// 2. MODAL FUNCTIONS (ADMIN LOGIN)
function openAdminModal() {
    document.getElementById('admin-modal').style.display = 'flex';
}

function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

function checkAdminPassword() {
    const enteredPassword = document.getElementById('admin-password').value;
    if(enteredPassword === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('admin-panel').classList.remove('hidden');
        document.body.classList.add('admin-mode');
        closeAdminModal();
        alert("Wemerewe kwinjira nka Admin! Shira ikintu gishya hano cyangwa ukande kabiri (Double Click) ku gakarita kugira ngo uyisibe.");
        activateDeleteListeners();
    } else {
        alert("Password si yo! Gerageza kandi.");
    }
}

function logoutAdmin() {
    isAdmin = false;
    document.getElementById('admin-panel').classList.add('hidden');
    document.body.classList.remove('admin-mode');
    document.getElementById('admin-password').value = '';
    alert("Uvuye mu mwanya wa Admin.");
}

// 3. ADMIN: KONGERAHO IKINTU GISHYA (ADD ITEM)
function addNewItem() {
    if(!isAdmin) return;

    const category = document.getElementById('item-category').value;
    const title = document.getElementById('new-item-title').value;
    const desc = document.getElementById('new-item-desc').value;

    if(title.trim() === "") {
        alert("Andika izina ry'igikoresho!");
        return;
    }

    let targetListId = '';
    if(category === 'product') targetListId = 'product-list';
    else if(category === 'repair') targetListId = 'repair-list';
    else if(category === 'software') targetListId = 'software-list';

    const targetList = document.getElementById(targetListId);
    
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-id', 'custom-' + Date.now());
    newCard.innerHTML = `<h3>${title}</h3>${desc ? `<p>${desc}</p>` : ''}`;
    
    targetList.appendChild(newCard);

    // Gusiba form
    document.getElementById('new-item-title').value = '';
    document.getElementById('new-item-desc').value = '';

    // Kuvugurura uburyo bwo gusiba
    activateDeleteListeners();
}

// 4. ADMIN: GUKURAHO IKINTU (DELETE ITEM)
function activateDeleteListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeAttribute('ondblclick'); // Kwirinda kwirundanyiriza
        card.addEventListener('dblclick', function() {
            if(isAdmin) {
                if(confirm(`Ese urashaka gukuraho "${this.querySelector('h3').innerText}" ku rubuga?`)) {
                    this.remove();
                }
            }
        });
    });
}