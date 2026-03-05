// dishes.js - مصفوفة جميع الأطباق (30 طبق)

const dishes = [
    // ========== SOUPS ========== (6 أطباق)
    // рыбные супы (2)
    {
        keyword: 'fish_soup_1',
        name: 'Уха',
        price: 250,
        category: 'soup',
        kind: 'fish',
        weight: '350 г',
        image: 'images/fish-soup-1.jpg'
    },
    {
        keyword: 'fish_soup_2',
        name: 'Суп с фрикадельками из рыбы',
        price: 270,
        category: 'soup',
        kind: 'fish',
        weight: '350 г',
        image: 'images/fish-soup-2.jpg'
    },
    // мясные супы (2)
    {
        keyword: 'meat_soup_1',
        name: 'Борщ',
        price: 230,
        category: 'soup',
        kind: 'meat',
        weight: '350 г',
        image: 'images/borscht.jpg'
    },
    {
        keyword: 'meat_soup_2',
        name: 'Солянка',
        price: 260,
        category: 'soup',
        kind: 'meat',
        weight: '350 г',
        image: 'images/solyanka.jpg'
    },
    // вегетарианские супы (2)
    {
        keyword: 'veg_soup_1',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        kind: 'veg',
        weight: '350 г',
        image: 'images/gazpacho.jpg'
    },
    {
        keyword: 'veg_soup_2',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        kind: 'veg',
        weight: '330 г',
        image: 'images/mushroom-soup.jpg'
    },

    // ========== MAIN DISHES ========== (6 أطباق)
    // рыбные (2)
    {
        keyword: 'fish_main_1',
        name: 'Рыбное филе с овощами',
        price: 390,
        category: 'main',
        kind: 'fish',
        weight: '320 г',
        image: 'images/fish-main-1.jpg'
    },
    {
        keyword: 'fish_main_2',
        name: 'Лосось с рисом',
        price: 450,
        category: 'main',
        kind: 'fish',
        weight: '350 г',
        image: 'images/salmon.jpg'
    },
    // мясные (2)
    {
        keyword: 'meat_main_1',
        name: 'Куриная котлета с пюре',
        price: 320,
        category: 'main',
        kind: 'meat',
        weight: '350 г',
        image: 'images/chicken-cutlet.jpg'
    },
    {
        keyword: 'meat_main_2',
        name: 'Бефстроганов',
        price: 420,
        category: 'main',
        kind: 'meat',
        weight: '330 г',
        image: 'images/beefstroganoff.jpg'
    },
    // вегетарианские (2)
    {
        keyword: 'veg_main_1',
        name: 'Паста Карбонара',
        price: 380,
        category: 'main',
        kind: 'veg',
        weight: '300 г',
        image: 'images/carbonara.jpg'
    },
    {
        keyword: 'veg_main_2',
        name: 'Овощное рагу',
        price: 250,
        category: 'main',
        kind: 'veg',
        weight: '280 г',
        image: 'images/vegetable-stew.jpg'
    },

    // ========== SALADS & STARTERS ========== (6 أطباق)
    // рыбные (1)
    {
        keyword: 'fish_salad_1',
        name: 'Салат с тунцом',
        price: 320,
        category: 'salad',
        kind: 'fish',
        weight: '250 г',
        image: 'images/tuna-salad.jpg'
    },
    // мясные (1)
    {
        keyword: 'meat_salad_1',
        name: 'Цезарь с курицей',
        price: 350,
        category: 'salad',
        kind: 'meat',
        weight: '250 г',
        image: 'images/caesar.jpg'
    },
    // вегетарианские (4)
    {
        keyword: 'veg_salad_1',
        name: 'Греческий салат',
        price: 280,
        category: 'salad',
        kind: 'veg',
        weight: '270 г',
        image: 'images/greek-salad.jpg'
    },
    {
        keyword: 'veg_salad_2',
        name: 'Салат с авокадо',
        price: 310,
        category: 'salad',
        kind: 'veg',
        weight: '240 г',
        image: 'images/avocado-salad.jpg'
    },
    {
        keyword: 'veg_salad_3',
        name: 'Винегрет',
        price: 190,
        category: 'salad',
        kind: 'veg',
        weight: '250 г',
        image: 'images/vinaigrette.jpg'
    },
    {
        keyword: 'veg_salad_4',
        name: 'Овощной салат',
        price: 170,
        category: 'salad',
        kind: 'veg',
        weight: '230 г',
        image: 'images/vegetable-salad.jpg'
    },

    // ========== DRINKS ========== (6 أطباق)
    // холодные (3)
    {
        keyword: 'cold_drink_1',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        kind: 'cold',
        weight: '300 мл',
        image: 'images/orange-juice.jpg'
    },
    {
        keyword: 'cold_drink_2',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        kind: 'cold',
        weight: '300 мл',
        image: 'images/apple-juice.jpg'
    },
    {
        keyword: 'cold_drink_3',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        kind: 'cold',
        weight: '300 мл',
        image: 'images/carrot-juice.jpg'
    },
    // горячие (3)
    {
        keyword: 'hot_drink_1',
        name: 'Чай черный',
        price: 70,
        category: 'drink',
        kind: 'hot',
        weight: '250 мл',
        image: 'images/black-tea.jpg'
    },
    {
        keyword: 'hot_drink_2',
        name: 'Кофе американо',
        price: 120,
        category: 'drink',
        kind: 'hot',
        weight: '200 мл',
        image: 'images/coffee.jpg'
    },
    {
        keyword: 'hot_drink_3',
        name: 'Какао',
        price: 100,
        category: 'drink',
        kind: 'hot',
        weight: '250 мл',
        image: 'images/cocoa.jpg'
    },

    // ========== DESSERTS ========== (6 أطباق)
    // маленькая порция (3)
    {
        keyword: 'small_dessert_1',
        name: 'Чизкейк',
        price: 180,
        category: 'dessert',
        kind: 'small',
        weight: '120 г',
        image: 'images/cheesecake.jpg'
    },
    {
        keyword: 'small_dessert_2',
        name: 'Тирамису',
        price: 200,
        category: 'dessert',
        kind: 'small',
        weight: '130 г',
        image: 'images/tiramisu.jpg'
    },
    {
        keyword: 'small_dessert_3',
        name: 'Эклер',
        price: 90,
        category: 'dessert',
        kind: 'small',
        weight: '80 г',
        image: 'images/eclair.jpg'
    },
    // средняя порция (2)
    {
        keyword: 'medium_dessert_1',
        name: 'Наполеон',
        price: 220,
        category: 'dessert',
        kind: 'medium',
        weight: '180 г',
        image: 'images/napoleon.jpg'
    },
    {
        keyword: 'medium_dessert_2',
        name: 'Медовик',
        price: 210,
        category: 'dessert',
        kind: 'medium',
        weight: '170 г',
        image: 'images/medovik.jpg'
    },
    // большая порция (1)
    {
        keyword: 'large_dessert_1',
        name: 'Фруктовый торт',
        price: 350,
        category: 'dessert',
        kind: 'large',
        weight: '250 г',
        image: 'images/fruit-cake.jpg'
    }
];