// filters.js - التحكم في فلاتر الأطباق

document.addEventListener('DOMContentLoaded', function() {
    setupFilters();
});

function setupFilters() {
    // اختيار كل أزرار الفلاتر
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const filter = this.dataset.filter;
            
            // تحديد الحاوية المناسبة
            let containerId;
            switch(category) {
                case 'soup':
                    containerId = 'soups-container';
                    break;
                case 'main':
                    containerId = 'mains-container';
                    break;
                case 'salad':
                    containerId = 'salads-container';
                    break;
                case 'drink':
                    containerId = 'drinks-container';
                    break;
                case 'dessert':
                    containerId = 'desserts-container';
                    break;
                default:
                    return;
            }
            
            const container = document.getElementById(containerId);
            if (!container) return;
            
            // إزالة active من جميع الأزرار في نفس الفئة
            document.querySelectorAll(`.filter-btn[data-category="${category}"]`).forEach(b => {
                b.classList.remove('active');
            });
            
            // إضافة active للزر الحالي
            this.classList.add('active');
            
            // تصفية الأطباق حسب الفئة والفلتر
            let filteredDishes;
            
            if (filter === 'all') {
                filteredDishes = dishes.filter(d => d.category === category);
            } else {
                filteredDishes = dishes.filter(d => d.category === category && d.kind === filter);
            }
            
            // ترتيب الأطباق أبجديًا
            filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
            
            // عرض الأطباق المصفاة
            displayDishes(containerId, filteredDishes);
            
            // إعادة تفعيل أزرار الإضافة للأطباق الجديدة
            setupAddButtons();
            
            // إعادة تفعيل خاصية التحديد (إذا كان الطبق مختار مسبقًا)
            highlightSelectedDishes();
        });
    });
}

// تفعيل أزرار الإضافة
function setupAddButtons() {
    document.querySelectorAll('.add-btn').forEach(btn => {
        // إزالة المستمع القديم إذا وجد (لتجنب التكرار)
        btn.removeEventListener('click', handleAddButtonClick);
        // إضافة مستمع جديد
        btn.addEventListener('click', handleAddButtonClick);
    });
}

// معالج الضغط على زر الإضافة
function handleAddButtonClick(e) {
    const keyword = e.target.dataset.keyword;
    selectDish(keyword);
}

// إعادة تفعيل التحديد البصري للأطباق المختارة
function highlightSelectedDishes() {
    // إزالة كل التحديدات السابقة
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // إضافة التحديد للأطباق المختارة في selectedDishes
    Object.values(selectedDishes).forEach(dish => {
        if (dish) {
            const selectedCard = document.querySelector(`[data-dish="${dish.keyword}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        }
    });
}

// دالة عرض الأطباق (مشتركة مع display-dishes.js)
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
            <p class="weight">${dish.weight}</p>
            <button class="add-btn" data-keyword="${dish.keyword}">Добавить</button>
        `;
        
        container.appendChild(dishCard);
    });
}

// دالة مساعدة لإعادة ضبط الفلاتر (اختياري)
function resetFilters() {
    document.querySelectorAll('.filter-btn[data-filter="all"]').forEach(btn => {
        btn.click();
    });
}

// دالة لتفعيل فلتر معين (اختياري)
function activateFilter(category, filterValue) {
    const btn = document.querySelector(`.filter-btn[data-category="${category}"][data-filter="${filterValue}"]`);
    if (btn) {
        btn.click();
    }
}