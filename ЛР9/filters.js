document.addEventListener('DOMContentLoaded', function() {
    setupFilters();
});

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const filter = this.dataset.filter;
            
            let containerId;
            switch(category) {
                case 'soup': containerId = 'soups-container'; break;
                case 'main': containerId = 'mains-container'; break;
                case 'salad': containerId = 'salads-container'; break;
                case 'drink': containerId = 'drinks-container'; break;
                case 'dessert': containerId = 'desserts-container'; break;
                default: return;
            }
            
            const container = document.getElementById(containerId);
            if (!container) return;
            
            document.querySelectorAll(`.filter-btn[data-category="${category}"]`).forEach(b => {
                b.classList.remove('active');
            });
            
            this.classList.add('active');
            
            let filteredDishes;
            
            if (filter === 'all') {
                filteredDishes = dishes.filter(d => d.category === category);
            } else {
                filteredDishes = dishes.filter(d => d.category === category && d.kind === filter);
            }
            
            filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
            
            displayDishes(containerId, filteredDishes);
            
            setupAddButtons();
            
            if (typeof highlightSelectedDishes === 'function') {
                highlightSelectedDishes();
            }
        });
    });
}

function setupAddButtons() {
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.removeEventListener('click', handleAddButtonClick);
        btn.addEventListener('click', handleAddButtonClick);
    });
}

function handleAddButtonClick(e) {
    const keyword = e.target.dataset.keyword;
    if (typeof selectDish === 'function') {
        selectDish(keyword);
    }
}