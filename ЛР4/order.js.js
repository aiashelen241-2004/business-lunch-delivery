// order.js - إدارة اختيار الأطباق وحساب السعر

let selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل أزرار الإضافة
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-btn')) {
            const keyword = e.target.dataset.keyword;
            selectDish(keyword);
        }
    });
    
    // تحديث العرض الأولي
    updateOrderDisplay();
});

function selectDish(keyword) {
    // البحث عن الطبق في المصفوفة
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    
    // تحديث الطبق المختار حسب الفئة
    selectedDishes[dish.category] = dish;
    
    // تحديث واجهة المستخدم
    updateOrderDisplay();
    highlightSelectedDish(keyword);
    calculateTotal();
}

function updateOrderDisplay() {
    // تحديث عرض الحساء
    updateCategoryDisplay('soup', 'Суп');
    
    // تحديث عرض الطبق الرئيسي
    updateCategoryDisplay('main', 'Главное блюдо');
    
    // تحديث عرض المشروب
    updateCategoryDisplay('drink', 'Напиток');
    
    // تحديث السعر الإجمالي
    calculateTotal();
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
        container.innerHTML = `
            <div class="selected-dish empty">
                <span class="dish-name">${categoryName} не выбран</span>
            </div>
        `;
    }
}

function highlightSelectedDish(keyword) {
    // إزالة التحديد السابق
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // إضافة التحديد للطبق المختار
    const selectedCard = document.querySelector(`[data-dish="${keyword}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

function calculateTotal() {
    const total = Object.values(selectedDishes).reduce((sum, dish) => {
        return sum + (dish ? dish.price : 0);
    }, 0);
    
    const totalContainer = document.getElementById('total-price');
    if (totalContainer) {
        if (total > 0) {
            totalContainer.textContent = `${total}₽`;
            document.getElementById('total-section').style.display = 'block';
        } else {
            document.getElementById('total-section').style.display = 'none';
        }
    }
}