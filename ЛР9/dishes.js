let dishes = [];

async function loadDishes() {
    try {
        const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        dishes = data;
        
        console.log('Блюда успешно загружены:', dishes.length);
        
        if (typeof displayAllDishes === 'function') {
            displayAllDishes();
        }
        
        if (typeof loadSelectedDishes === 'function') {
            loadSelectedDishes();
            if (typeof updateOrderDisplay === 'function') updateOrderDisplay();
            if (typeof updateTotalBar === 'function') updateTotalBar();
        }
        
        return dishes;
        
    } catch (error) {
        console.error('Ошибка загрузки блюд:', error);
        dishes = getLocalDishes();
        console.warn('Используются локальные данные');
        
        if (typeof displayAllDishes === 'function') {
            displayAllDishes();
        }
        
        if (typeof loadSelectedDishes === 'function') {
            loadSelectedDishes();
            if (typeof updateOrderDisplay === 'function') updateOrderDisplay();
            if (typeof updateTotalBar === 'function') updateTotalBar();
        }
        
        return dishes;
    }
}

function getLocalDishes() {
    return [
        { keyword: 'gaspacho', name: 'Гаспачо', price: 195, category: 'soup', kind: 'veg', count: '350 г', image: 'images/gazpacho.jpg' },
        { keyword: 'mushroom_soup', name: 'Грибной суп-пюре', price: 185, category: 'soup', kind: 'veg', count: '330 г', image: 'images/mushroom-soup.jpg' },
        { keyword: 'norwegian_soup', name: 'Норвежский суп', price: 270, category: 'soup', kind: 'fish', count: '330 г', image: 'images/norwegian-soup.jpg' },
        { keyword: 'borscht', name: 'Борщ', price: 230, category: 'soup', kind: 'meat', count: '350 г', image: 'images/borscht.jpg' },
        { keyword: 'solyanka', name: 'Солянка', price: 260, category: 'soup', kind: 'meat', count: '350 г', image: 'images/solyanka.jpg' },
        { keyword: 'fish_soup', name: 'Уха', price: 250, category: 'soup', kind: 'fish', count: '350 г', image: 'images/fish-soup.jpg' },
        
        { keyword: 'caesar', name: 'Цезарь с курицей', price: 350, category: 'main', kind: 'meat', count: '250 г', image: 'images/caesar.jpg' },
        { keyword: 'chicken_cutlet', name: 'Куриная котлета с пюре', price: 320, category: 'main', kind: 'meat', count: '350 г', image: 'images/chicken-cutlet.jpg' },
        { keyword: 'carbonara', name: 'Паста Карбонара', price: 380, category: 'main', kind: 'veg', count: '300 г', image: 'images/carbonara.jpg' },
        { keyword: 'beefstroganoff', name: 'Бефстроганов', price: 420, category: 'main', kind: 'meat', count: '330 г', image: 'images/beefstroganoff.jpg' },
        { keyword: 'fish_fillet', name: 'Рыбное филе с овощами', price: 390, category: 'main', kind: 'fish', count: '320 г', image: 'images/fish-main.jpg' },
        { keyword: 'salmon', name: 'Лосось с рисом', price: 450, category: 'main', kind: 'fish', count: '350 г', image: 'images/salmon.jpg' },
        
        { keyword: 'tuna_salad', name: 'Салат с тунцом', price: 320, category: 'salad', kind: 'fish', count: '250 г', image: 'images/tuna-salad.jpg' },
        { keyword: 'greek_salad', name: 'Греческий салат', price: 280, category: 'salad', kind: 'veg', count: '270 г', image: 'images/greek-salad.jpg' },
        { keyword: 'avocado_salad', name: 'Салат с авокадо', price: 310, category: 'salad', kind: 'veg', count: '240 г', image: 'images/avocado-salad.jpg' },
        { keyword: 'vinaigrette', name: 'Винегрет', price: 190, category: 'salad', kind: 'veg', count: '250 г', image: 'images/vinaigrette.jpg' },
        { keyword: 'vegetable_salad', name: 'Овощной салат', price: 170, category: 'salad', kind: 'veg', count: '230 г', image: 'images/vegetable-salad.jpg' },
        { keyword: 'caesar_salad', name: 'Цезарь с курицей', price: 350, category: 'salad', kind: 'meat', count: '250 г', image: 'images/caesar-salad.jpg' },
        
        { keyword: 'orange_juice', name: 'Апельсиновый сок', price: 120, category: 'drink', kind: 'cold', count: '300 мл', image: 'images/orange-juice.jpg' },
        { keyword: 'apple_juice', name: 'Яблочный сок', price: 90, category: 'drink', kind: 'cold', count: '300 мл', image: 'images/apple-juice.jpg' },
        { keyword: 'carrot_juice', name: 'Морковный сок', price: 110, category: 'drink', kind: 'cold', count: '300 мл', image: 'images/carrot-juice.jpg' },
        { keyword: 'black_tea', name: 'Чай черный', price: 70, category: 'drink', kind: 'hot', count: '250 мл', image: 'images/black-tea.jpg' },
        { keyword: 'coffee', name: 'Кофе американо', price: 120, category: 'drink', kind: 'hot', count: '200 мл', image: 'images/coffee.jpg' },
        { keyword: 'cocoa', name: 'Какао', price: 100, category: 'drink', kind: 'hot', count: '250 мл', image: 'images/cocoa.jpg' },
        
        { keyword: 'cheesecake', name: 'Чизкейк', price: 180, category: 'dessert', kind: 'small', count: '120 г', image: 'images/cheesecake.jpg' },
        { keyword: 'tiramisu', name: 'Тирамису', price: 200, category: 'dessert', kind: 'small', count: '130 г', image: 'images/tiramisu.jpg' },
        { keyword: 'eclair', name: 'Эклер', price: 90, category: 'dessert', kind: 'small', count: '80 г', image: 'images/eclair.jpg' },
        { keyword: 'napoleon', name: 'Наполеон', price: 220, category: 'dessert', kind: 'medium', count: '180 г', image: 'images/napoleon.jpg' },
        { keyword: 'medovik', name: 'Медовик', price: 210, category: 'dessert', kind: 'medium', count: '170 г', image: 'images/medovik.jpg' },
        { keyword: 'fruit_cake', name: 'Фруктовый торт', price: 350, category: 'dessert', kind: 'large', count: '250 г', image: 'images/fruit-cake.jpg' }
    ];
}

document.addEventListener('DOMContentLoaded', loadDishes);