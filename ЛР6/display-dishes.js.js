// display-dishes.js - عرض الأطباق مع الفلاتر

document.addEventListener('DOMContentLoaded', function() {
    // تعريف جميع الفئات
    const categories = [
        { id: 'soups-container', category: 'soup', title: 'Выберите суп' },
        { id: 'mains-container', category: 'main', title: 'Выберите главное блюдо' },
        { id: 'salads-container', category: 'salad', title: 'Выберите салат или стартер' },
        { id: 'drinks-container', category: 'drink', title: 'Выберите напиток' },
        { id: 'desserts-container', category: 'dessert', title: 'Выберите десерт' }
    ];
    
    // تعريف الفلاتر لكل فئة
    const filters = {
        soup: ['fish', 'meat', 'veg'],
        main: ['fish', 'meat', 'veg'],
        salad: ['fish', 'meat', 'veg'],
        drink: ['cold', 'hot'],
        dessert: ['small', 'medium', 'large']
    };
    
    // أسماء الفلاتر للعرض
    const filterNames = {
        fish: 'рыбный',
        meat: 'мясной',
        veg: 'вегетарианский',
        cold: 'холодный',
        hot: 'горячий',
        small: 'маленькая порция',
        medium: 'средняя порция',
        large: 'большая порция'
    };
    
    // إنشاء كل قسم
    categories.forEach(cat => {
        createCategorySection(cat.id, cat.category, cat.title, filters[cat.category]);
    });
    
    // عرض جميع الأطباق
    displayAllDishes();
    
    // تفعيل أزرار الفلاتر
    setupFilters();
});

function createCategorySection(containerId, category, title, filterList) {
    const mainElement = document.querySelector('main');
    
    // البحث إذا القسم موجود مسبقًا
    let section = document.getElementById(`section-${category}`);
    
    if (!section) {
        // إنشاء قسم جديد
        section = document.createElement('section');
        section.id = `section-${category}`;
        section.className = 'dishes-section';
        
        // إضافة العنوان
        const heading = document.createElement('h2');
        heading.textContent = title;
        section.appendChild(heading);
        
        // إضافة أزرار الفلاتر
        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'filters-container';
        filtersDiv.id = `filters-${category}`;
        
        // زر "Все" لعرض الكل
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active';
        allBtn.dataset.filter = 'all';
        allBtn.dataset.category = category;
        allBtn.textContent = 'все';
        filtersDiv.appendChild(allBtn);
        
        // أزرار الفلاتر حسب الفئة
        filterList.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = filter;
            btn.dataset.category = category;
            btn.textContent = filterNames[filter] || filter;
            filtersDiv.appendChild(btn);
        });
        
        section.appendChild(filtersDiv);
        
        // إضافة حاوية الأطباق
        const container = document.createElement('div');
        container.id = containerId;
        container.className = 'dishes-grid';
        section.appendChild(container);
        
        // إضافة القسم إلى الصفحة قبل نموذج الطلب
        const orderForm = document.querySelector('.order-form');
        mainElement.insertBefore(section, orderForm);
    }
}

function displayAllDishes() {
    // ترتيب الأطباق أبجديًا لكل فئة
    const categories = {
        soup: dishes.filter(d => d.category === 'soup').sort((a, b) => a.name.localeCompare(b.name)),
        main: dishes.filter(d => d.category === 'main').sort((a, b) => a.name.localeCompare(b.name)),
        salad: dishes.filter(d => d.category === 'salad').sort((a, b) => a.name.localeCompare(b.name)),
        drink: dishes.filter(d => d.category === 'drink').sort((a, b) => a.name.localeCompare(b.name)),
        dessert: dishes.filter(d => d.category === 'dessert').sort((a, b) => a.name.localeCompare(b.name))
    };
    
    // عرض كل فئة
    displayDishes('soups-container', categories.soup);
    displayDishes('mains-container', categories.main);
    displayDishes('salads-container', categories.salad);
    displayDishes('drinks-container', categories.drink);
    displayDishes('desserts-container', categories.dessert);
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
            <p class="weight">${dish.weight}</p>
            <button class="add-btn" data-keyword="${dish.keyword}">Добавить</button>
        `;
        
        container.appendChild(dishCard);
    });
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const filter = this.dataset.filter;
            const container = document.getElementById(`${category}s-container`); // soups-container, mains-container, etc.
            
            if (!container) return;
            
            // إزالة active من جميع الأزرار في نفس الفئة
            document.querySelectorAll(`.filter-btn[data-category="${category}"]`).forEach(b => {
                b.classList.remove('active');
            });
            
            // إضافة active للزر الحالي
            this.classList.add('active');
            
            // تصفية الأطباق
            let filteredDishes;
            
            if (filter === 'all') {
                filteredDishes = dishes.filter(d => d.category === category);
            } else {
                filteredDishes = dishes.filter(d => d.category === category && d.kind === filter);
            }
            
            // ترتيب أبجدي
            filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
            
            // عرض الأطباق المصفاة
            displayDishes(container.id, filteredDishes);
        });
    });
}