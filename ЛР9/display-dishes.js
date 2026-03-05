document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadDishes === 'function') {
        loadDishes();
    }
});

function displayAllDishes() {
    if (!dishes || dishes.length === 0) return;
    
    const categories = {
        soup: dishes.filter(d => d.category === 'soup').sort((a, b) => a.name.localeCompare(b.name)),
        main: dishes.filter(d => d.category === 'main').sort((a, b) => a.name.localeCompare(b.name)),
        salad: dishes.filter(d => d.category === 'salad').sort((a, b) => a.name.localeCompare(b.name)),
        drink: dishes.filter(d => d.category === 'drink').sort((a, b) => a.name.localeCompare(b.name)),
        dessert: dishes.filter(d => d.category === 'dessert').sort((a, b) => a.name.localeCompare(b.name))
    };
    
    displayDishes('soups-container', categories.soup);
    displayDishes('mains-container', categories.main);
    displayDishes('salads-container', categories.salad);
    displayDishes('drinks-container', categories.drink);
    displayDishes('desserts-container', categories.dessert);
    
    if (typeof loadSelectedDishes === 'function') {
        loadSelectedDishes();
        if (typeof updateOrderDisplay === 'function') updateOrderDisplay();
        if (typeof updateTotalBar === 'function') updateTotalBar();
        if (typeof highlightSelectedDishes === 'function') highlightSelectedDishes();
    }
}

function displayDishes(containerId, dishesArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    dishesArray.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.dataset.dish = dish.keyword;
        dishCard.dataset.kind = dish.kind;
        dishCard.dataset.category = dish.category;
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}₽</p>
            <p class="dish-name">${dish.name}</p>
            <p class="weight">${dish.weight || dish.count || ''}</p>
            <button class="add-btn" data-keyword="${dish.keyword}">Добавить</button>
        `;
        
        container.appendChild(dishCard);
    });
    
    if (typeof highlightSelectedDishes === 'function') {
        highlightSelectedDishes();
    }
}

function highlightSelectedDishes() {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    Object.values(selectedDishes).forEach(dish => {
        if (dish) {
            const selectedCard = document.querySelector(`[data-dish="${dish.keyword}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        }
    });
}