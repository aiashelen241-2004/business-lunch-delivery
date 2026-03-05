const STORAGE_KEY = 'selectedDishes';

let selectedDishes = loadSelectedDishes() || {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function saveSelectedDishes() {
    try {
        const dataToSave = {};
        
        for (const [category, dish] of Object.entries(selectedDishes)) {
            if (dish && dish.keyword) {
                dataToSave[category] = dish.keyword;
            } else {
                dataToSave[category] = null;
            }
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
    }
}

function loadSelectedDishes() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;
        
        const keywords = JSON.parse(saved);
        const loadedDishes = {};
        
        for (const [category, keyword] of Object.entries(keywords)) {
            if (keyword && dishes && dishes.length > 0) {
                const dish = dishes.find(d => d.keyword === keyword);
                loadedDishes[category] = dish || null;
            } else {
                loadedDishes[category] = null;
            }
        }
        
        return loadedDishes;
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        return null;
    }
}

function clearSelectedDishes() {
    selectedDishes = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };
    localStorage.removeItem(STORAGE_KEY);
    if (typeof updateOrderDisplay === 'function') updateOrderDisplay();
    if (typeof updateTotalBar === 'function') updateTotalBar();
}

function selectDish(keyword) {
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    
    selectedDishes[dish.category] = dish;
    
    saveSelectedDishes();
    
    if (typeof updateOrderDisplay === 'function') updateOrderDisplay();
    if (typeof updateTotalBar === 'function') updateTotalBar();
    if (typeof highlightSelectedDish === 'function') highlightSelectedDish(keyword);
}

function removeSelectedDish(category) {
    selectedDishes[category] = null;
    saveSelectedDishes();
    if (typeof updateOrderDisplay === 'function') updateOrderDisplay();
    if (typeof updateTotalBar === 'function') updateTotalBar();
}

function getSelectedDishIds() {
    const ids = {};
    
    for (const [category, dish] of Object.entries(selectedDishes)) {
        if (dish && dish.id) {
            ids[`${category}_id`] = dish.id;
        }
    }
    
    return ids;
}

function updateOrderDisplay() {
    if (typeof updateCategoryDisplay === 'function') {
        updateCategoryDisplay('soup', 'Суп');
        updateCategoryDisplay('main', 'Главное блюдо');
        updateCategoryDisplay('salad', 'Салат или стартер');
        updateCategoryDisplay('drink', 'Напиток');
        updateCategoryDisplay('dessert', 'Десерт');
    }
    
    if (typeof calculateTotal === 'function') calculateTotal();
}

function updateCategoryDisplay(category, categoryName) {
    const container = document.getElementById(`selected-${category}`);
    if (!container) return;
    
    const dish = selectedDishes[category];
    
    if (dish) {
        container.innerHTML = `
            <div class="selected-dish">
                <span class="dish-name">${dish.name}</span>
                <span class="dish-price">${dish.price}₽</span>
            </div>
        `;
    } else {
        let notSelectedText = categoryName + ' не выбран';
        if (category === 'main') notSelectedText = 'Главное блюдо не выбрано';
        else if (category === 'salad') notSelectedText = 'Салат или стартер не выбран';
        
        container.innerHTML = `
            <div class="selected-dish empty">
                <span class="dish-name">${notSelectedText}</span>
            </div>
        `;
    }
}

function calculateTotal() {
    const total = Object.values(selectedDishes).reduce((sum, dish) => {
        return sum + (dish ? dish.price : 0);
    }, 0);
    
    const totalContainer = document.getElementById('total-price');
    const barTotalContainer = document.getElementById('bar-total-price');
    
    if (totalContainer) totalContainer.textContent = `${total}₽`;
    if (barTotalContainer) barTotalContainer.textContent = `${total}₽`;
}

function updateTotalBar() {
    const bar = document.getElementById('checkout-bar');
    const checkoutLink = document.getElementById('checkout-link');
    
    if (!bar || !checkoutLink) return;
    
    const total = Object.values(selectedDishes).reduce((sum, dish) => {
        return sum + (dish ? dish.price : 0);
    }, 0);
    
    if (total > 0) {
        bar.style.display = 'block';
        
        if (isValidCombo()) {
            checkoutLink.classList.remove('disabled');
        } else {
            checkoutLink.classList.add('disabled');
        }
    } else {
        bar.style.display = 'none';
    }
}

function isValidCombo() {
    const hasSoup = !!selectedDishes.soup;
    const hasMain = !!selectedDishes.main;
    const hasSalad = !!selectedDishes.salad;
    const hasDrink = !!selectedDishes.drink;
    
    if (hasDrink) {
        if (hasSoup && hasMain && hasSalad) return true;
        if (hasSoup && hasMain) return true;
        if (hasSoup && hasSalad) return true;
        if (hasMain && hasSalad) return true;
        if (hasMain) return true;
    }
    
    return false;
}

function highlightSelectedDish(keyword) {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`[data-dish="${keyword}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}