const notifications = {
    empty: {
        title: 'Внимание!',
        message: 'Ничего не выбрано. Выберите блюда для заказа',
        icon: '⚠️'
    },
    noDrink: {
        title: 'Внимание!',
        message: 'Выберите напиток',
        icon: '🥤'
    },
    noMainOrSalad: {
        title: 'Внимание!',
        message: 'Выберите главное блюдо/салат/стартер',
        icon: '🍽️'
    },
    noSoupOrMain: {
        title: 'Внимание!',
        message: 'Выберите суп или главное блюдо',
        icon: '🍲'
    },
    noMain: {
        title: 'Внимание!',
        message: 'Выберите главное блюдо',
        icon: '🥩'
    }
};

const validCombos = [
    { soup: true, main: true, salad: true, drink: true },
    { soup: true, main: true, drink: true },
    { soup: true, salad: true, drink: true },
    { main: true, salad: true, drink: true },
    { main: true, drink: true }
];

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            checkOrderBeforeSubmit();
        });
    }
});

function checkOrderBeforeSubmit() {
    const hasSoup = !!selectedDishes.soup;
    const hasMain = !!selectedDishes.main;
    const hasSalad = !!selectedDishes.salad;
    const hasDrink = !!selectedDishes.drink;
    
    if (!hasSoup && !hasMain && !hasSalad && !hasDrink) {
        showNotification(notifications.empty);
        return;
    }
    
    if (!hasDrink) {
        showNotification(notifications.noDrink);
        return;
    }
    
    if (!isValidCombo()) {
        if (hasSoup && !hasMain && !hasSalad) {
            showNotification(notifications.noMainOrSalad);
        } else if (!hasSoup && !hasMain && hasSalad) {
            showNotification(notifications.noSoupOrMain);
        } else if (!hasMain && hasDrink) {
            showNotification(notifications.noMain);
        } else {
            showNotification(notifications.noMainOrSalad);
        }
        return;
    }
    
    document.getElementById('orderForm').submit();
}

function showNotification(notification) {
    const overlay = document.getElementById('notification');
    const titleEl = document.querySelector('.notification-title');
    const messageEl = document.getElementById('notificationMessage');
    const iconEl = document.querySelector('.notification-icon');
    
    if (overlay && titleEl && messageEl) {
        titleEl.textContent = notification.title;
        messageEl.textContent = notification.message;
        iconEl.textContent = notification.icon;
        overlay.style.display = 'flex';
    }
}

window.hideNotification = function() {
    const overlay = document.getElementById('notification');
    if (overlay) overlay.style.display = 'none';
};