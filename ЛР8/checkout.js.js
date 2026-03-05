document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadSelectedDishes === 'function') {
        loadSelectedDishes();
    }
    
    displaySelectedDishes();
    updateOrderSummary();
    setupCheckoutForm();
});

function displaySelectedDishes() {
    const container = document.getElementById('selected-dishes-container');
    const emptyMessage = document.getElementById('empty-message');
    
    if (!container) return;
    
    const selectedItems = Object.values(selectedDishes).filter(dish => dish !== null);
    
    if (selectedItems.length === 0) {
        container.style.display = 'none';
        if (emptyMessage) emptyMessage.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    if (emptyMessage) emptyMessage.style.display = 'none';
    
    container.innerHTML = '';
    
    selectedItems.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.dataset.keyword = dish.keyword;
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}₽</p>
            <p class="dish-name">${dish.name}</p>
            <p class="weight">${dish.weight || dish.count || ''}</p>
            <button class="remove-btn" data-category="${dish.category}">Удалить</button>
        `;
        
        container.appendChild(dishCard);
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            if (typeof removeSelectedDish === 'function') {
                removeSelectedDish(category);
            }
            displaySelectedDishes();
            updateOrderSummary();
        });
    });
}

function updateOrderSummary() {
    if (typeof updateCategoryDisplay === 'function') {
        updateCategoryDisplay('soup', 'Суп');
        updateCategoryDisplay('main', 'Главное блюдо');
        updateCategoryDisplay('salad', 'Салат или стартер');
        updateCategoryDisplay('drink', 'Напиток');
        updateCategoryDisplay('dessert', 'Десерт');
    }
    
    if (typeof calculateTotal === 'function') calculateTotal();
}

function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!isValidCombo()) {
            showNotification('Внимание!', 'Состав заказа не соответствует ни одному доступному комбо');
            return;
        }
        
        const formData = new FormData(form);
        const orderData = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            subscribe: formData.get('subscribe') ? 1 : 0,
            phone: formData.get('phone'),
            delivery_address: formData.get('delivery_address'),
            delivery_type: formData.get('delivery_type'),
            comment: formData.get('comment') || ''
        };
        
        if (orderData.delivery_type === 'by_time') {
            const deliveryTime = formData.get('delivery_time');
            if (!deliveryTime) {
                showNotification('Ошибка', 'Укажите время доставки');
                return;
            }
            orderData.delivery_time = deliveryTime;
        }
        
        if (typeof getSelectedDishIds === 'function') {
            const dishIds = getSelectedDishIds();
            Object.assign(orderData, dishIds);
        }
        
        if (typeof submitOrderToAPI === 'function') {
            const result = await submitOrderToAPI(orderData);
            
            if (result.success) {
                showNotification('Успешно!', 'Заказ успешно оформлен!', 'success');
                
                if (typeof clearSelectedDishes === 'function') {
                    clearSelectedDishes();
                }
                
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showNotification('Ошибка!', result.error || 'Не удалось оформить заказ');
            }
        }
    });
    
    const deliveryNow = document.getElementById('delivery_now');
    const deliveryByTime = document.getElementById('delivery_by_time');
    const deliveryTimeInput = document.getElementById('delivery_time');
    
    if (deliveryNow && deliveryByTime && deliveryTimeInput) {
        deliveryNow.addEventListener('change', function() {
            deliveryTimeInput.disabled = true;
            deliveryTimeInput.required = false;
        });
        
        deliveryByTime.addEventListener('change', function() {
            deliveryTimeInput.disabled = false;
            deliveryTimeInput.required = true;
        });
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

function showNotification(title, message, type = 'error') {
    const overlay = document.getElementById('notification');
    const titleEl = document.querySelector('.notification-title');
    const messageEl = document.getElementById('notificationMessage');
    const iconEl = document.querySelector('.notification-icon');
    
    if (overlay && titleEl && messageEl) {
        titleEl.textContent = title;
        messageEl.textContent = message;
        iconEl.textContent = type === 'success' ? '✅' : '⚠️';
        overlay.style.display = 'flex';
    } else {
        alert(message);
    }
}

window.hideNotification = function() {
    const overlay = document.getElementById('notification');
    if (overlay) overlay.style.display = 'none';
};