// display-dishes.js - عرض الأطباق ديناميكيًا

document.addEventListener('DOMContentLoaded', function() {
    // ترتيب الأطباق أبجديًا لكل فئة
    const categories = {
        soup: dishes.filter(d => d.category === 'soup').sort((a, b) => a.name.localeCompare(b.name)),
        main: dishes.filter(d => d.category === 'main').sort((a, b) => a.name.localeCompare(b.name)),
        drink: dishes.filter(d => d.category === 'drink').sort((a, b) => a.name.localeCompare(b.name))
    };
    
    // عرض الحساء
    displayDishes('soups-container', categories.soup);
    
    // عرض الأطباق الرئيسية
    displayDishes('mains-container', categories.main);
    
    // عرض المشروبات
    displayDishes('drinks-container', categories.drink);
});

function displayDishes(containerId, dishesArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    dishesArray.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.dataset.dish = dish.keyword;
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}₽</p>
            <p class="dish-name">${dish.name}</p>
            <p class="weight">${dish.weight}</p>
            <button class="add-btn" data-keyword="${dish.keyword}">Добавить</button>
        `;
        
        container.appendChild(dishCard);
    });
}