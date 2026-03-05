let currentOrders = [];
let currentOrderId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    
    const deliveryNow = document.getElementById('edit-delivery-now');
    const deliveryByTime = document.getElementById('edit-delivery-by-time');
    const deliveryTimeInput = document.getElementById('edit-delivery_time');
    
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
});

async function loadOrders() {
    showLoading();
    
    const result = await fetchAllOrdersFromAPI();
    
    if (result && !result.error) {
        currentOrders = result.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );
        displayOrders();
    } else {
        showError('Не удалось загрузить заказы');
    }
}

function displayOrders() {
    hideLoading();
    
    if (currentOrders.length === 0) {
        document.getElementById('orders-content').innerHTML = '<p style="text-align: center; padding: 50px;">У вас пока нет заказов</p>';
        document.getElementById('orders-content').style.display = 'block';
        return;
    }
    
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';
    
    currentOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        
        const date = new Date(order.created_at).toLocaleDateString('ru-RU');
        const dishes = getDishesList(order);
        const deliveryTime = getDeliveryTimeText(order);
        const total = calculateOrderTotal(order);
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${date}</td>
            <td>${dishes}</td>
            <td>${total}₽</td>
            <td>${deliveryTime}</td>
            <td>
                <div class="order-actions">
                    <button class="action-btn view-btn" onclick="viewOrder(${order.id})" title="Подробнее">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editOrder(${order.id})" title="Редактировать">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteOrder(${order.id})" title="Удалить">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    document.getElementById('orders-content').style.display = 'block';
}

function getDishesList(order) {
    const dishes = [];
    if (order.soup) dishes.push(order.soup.name);
    if (order.main_course) dishes.push(order.main_course.name);
    if (order.salad) dishes.push(order.salad.name);
    if (order.drink) dishes.push(order.drink.name);
    if (order.dessert) dishes.push(order.dessert.name);
    
    return dishes.join(', ') || 'Нет блюд';
}

function getDeliveryTimeText(order) {
    if (order.delivery_type === 'now') {
        return 'Как можно скорее';
    } else {
        return order.delivery_time || 'Не указано';
    }
}

function calculateOrderTotal(order) {
    let total = 0;
    if (order.soup) total += order.soup.price;
    if (order.main_course) total += order.main_course.price;
    if (order.salad) total += order.salad.price;
    if (order.drink) total += order.drink.price;
    if (order.dessert) total += order.dessert.price;
    return total;
}

async function viewOrder(orderId) {
    const order = currentOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const content = document.getElementById('view-modal-content');
    
    const dishes = [];
    if (order.soup) dishes.push(`<div class="dish-tag">${order.soup.name} - ${order.soup.price}₽</div>`);
    if (order.main_course) dishes.push(`<div class="dish-tag">${order.main_course.name} - ${order.main_course.price}₽</div>`);
    if (order.salad) dishes.push(`<div class="dish-tag">${order.salad.name} - ${order.salad.price}₽</div>`);
    if (order.drink) dishes.push(`<div class="dish-tag">${order.drink.name} - ${order.drink.price}₽</div>`);
    if (order.dessert) dishes.push(`<div class="dish-tag">${order.dessert.name} - ${order.dessert.price}₽</div>`);
    
    const deliveryText = getDeliveryTimeText(order);
    const total = calculateOrderTotal(order);
    
    content.innerHTML = `
        <div class="order-detail-item">
            <span class="order-detail-label">Имя:</span>
            <span class="order-detail-value">${order.full_name}</span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Email:</span>
            <span class="order-detail-value">${order.email}</span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Телефон:</span>
            <span class="order-detail-value">${order.phone}</span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Адрес:</span>
            <span class="order-detail-value">${order.delivery_address}</span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Время доставки:</span>
            <span class="order-detail-value">${deliveryText}</span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Блюда:</span>
            <span class="order-detail-value"><div class="dishes-list">${dishes.join('')}</div></span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Комментарий:</span>
            <span class="order-detail-value">${order.comment || 'Нет'}</span>
        </div>
        <div class="order-detail-item">
            <span class="order-detail-label">Итого:</span>
            <span class="order-detail-value"><strong>${total}₽</strong></span>
        </div>
    `;
    
    openModal('view-modal');
}

async function editOrder(orderId) {
    const order = currentOrders.find(o => o.id === orderId);
    if (!order) return;
    
    currentOrderId = orderId;
    
    document.getElementById('edit-order-id').value = order.id;
    document.getElementById('edit-full_name').value = order.full_name || '';
    document.getElementById('edit-email').value = order.email || '';
    document.getElementById('edit-phone').value = order.phone || '';
    document.getElementById('edit-delivery_address').value = order.delivery_address || '';
    document.getElementById('edit-comment').value = order.comment || '';
    
    if (order.delivery_type === 'now') {
        document.getElementById('edit-delivery-now').checked = true;
        document.getElementById('edit-delivery_time').disabled = true;
        document.getElementById('edit-delivery_time').required = false;
    } else {
        document.getElementById('edit-delivery-by-time').checked = true;
        document.getElementById('edit-delivery_time').disabled = false;
        document.getElementById('edit-delivery_time').required = true;
        document.getElementById('edit-delivery_time').value = order.delivery_time || '';
    }
    
    document.getElementById('edit-subscribe').checked = order.subscribe === 1;
    
    openModal('edit-modal');
}

async function saveOrder() {
    const orderId = currentOrderId;
    if (!orderId) return;
    
    const form = document.getElementById('edit-form');
    const formData = new FormData(form);
    
    const updatedData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: formData.get('delivery_type'),
        subscribe: formData.get('subscribe') ? 1 : 0,
        comment: formData.get('comment') || ''
    };
    
    if (updatedData.delivery_type === 'by_time') {
        const deliveryTime = formData.get('delivery_time');
        if (!deliveryTime) {
            showNotification('Ошибка', 'Укажите время доставки', '⚠️');
            return;
        }
        updatedData.delivery_time = deliveryTime;
    }
    
    const result = await updateOrderInAPI(orderId, updatedData);
    
    if (result && !result.error) {
        closeModal('edit-modal');
        showNotification('Успешно!', 'Заказ успешно обновлен', '✅');
        await loadOrders();
    } else {
        showNotification('Ошибка!', result.error || 'Не удалось обновить заказ', '❌');
    }
}

function deleteOrder(orderId) {
    currentOrderId = orderId;
    openModal('delete-modal');
}

async function confirmDelete() {
    const orderId = currentOrderId;
    if (!orderId) return;
    
    const result = await deleteOrderFromAPI(orderId);
    
    if (result && !result.error) {
        closeModal('delete-modal');
        showNotification('Успешно!', 'Заказ успешно удален', '✅');
        await loadOrders();
    } else {
        showNotification('Ошибка!', result.error || 'Не удалось удалить заказ', '❌');
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('orders-content').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('orders-content').style.display = 'none';
}

function showNotification(title, message, icon = '✅') {
    const overlay = document.getElementById('notification');
    document.getElementById('notification-title').textContent = title;
    document.getElementById('notification-message').textContent = message;
    document.querySelector('#notification .notification-icon').textContent = icon;
    overlay.style.display = 'flex';
}

function hideNotification() {
    document.getElementById('notification').style.display = 'none';
}