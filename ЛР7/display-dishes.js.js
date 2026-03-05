// display-dishes.js - عرض الأطباق (محدث)

// استدعاء loadDishes من dishes.js عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadDishes === 'function') {
        loadDishes();
    }
});

// باقي الدوال كما هي...
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
}

// باقي الدوال (displayDishes) كما هي