// notifications.js - التحكم في التحذيرات المنبثقة

// التحذيرات المنبثقة
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

// تعريف خيارات الوجبات المتاحة (combos)
const validCombos = [
    { soup: true, main: true, salad: true, drink: true },      // الخيار 1
    { soup: true, main: true, drink: true },                   // الخيار 2
    { soup: true, salad: true, drink: true },                  // الخيار 3
    { main: true, salad: true, drink: true },                  // الخيار 4