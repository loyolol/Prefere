function updateHeaderLayout() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    const headerMiddle = document.querySelector('.header-middle');
    const headerSearch = document.querySelector('.header-search');

    //Скрываем или показываем header-middle
    if (headerMiddle) {
        headerMiddle.style.display = window.innerWidth <= 865 ? 'none' : 'flex';
    }

    //Добавляем или удаляем кнопку меню
    if (window.innerWidth <= 865) {
        if (!document.querySelector('.header-menu-button')) {
            const button = document.createElement('button');
            button.classList.add('header-menu-button');
            button.style.background = 'none';
            button.style.border = 'none';
            button.style.cursor = 'pointer';

            const img = document.createElement('img');
            img.src = 'photo/menu.svg';
            img.alt = 'Menu Icon';
            img.classList.add('header-menu-icon');
            img.style.width = '32px';
            img.style.height = '30px';
            img.style.marginRight = '30px';

            button.appendChild(img);
            headerRight.appendChild(button);

            button.addEventListener('click', () => {
                // Здесь можно добавить логику для открытия меню
                alert('Menu button clicked!'); // Пример действия
            });
        }
    } else {
        const menuButton = document.querySelector('.header-menu-button');
        if (menuButton) {
            menuButton.remove();
        }
    }

    //Устанавливаем отступ
    if (headerSearch) {
        headerSearch.style.marginLeft = (window.innerWidth <= 700) ? '15px' : '20px';
    }
}

function addFilterButtons() {
    const actionsSection = document.querySelector('.actions-section');
    const newProductsSection = document.querySelector('.new-products-section');

    if (actionsSection) addFilterButton(actionsSection);
    if (newProductsSection) addFilterButton(newProductsSection);
}

function addFilterButton(section) {
    const sectionTitle = section.querySelector('.section-title');

    if (!sectionTitle) return;

    if (sectionTitle.parentNode.classList.contains('section-title-container')) return;

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('section-title-container');

    sectionTitle.parentNode.insertBefore(titleContainer, sectionTitle);
    titleContainer.appendChild(sectionTitle);

    const filterButton = document.createElement('button');
    filterButton.classList.add('filter-button');
    titleContainer.appendChild(filterButton);
}

function updateLayout() {
    updateHeaderLayout();

    if (window.innerWidth <= 900) {
        addFilterButtons();
    } else {
        removeFilterButtons();
    }
}

function removeFilterButtons() {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(sectionTitle => {
        const titleContainer = sectionTitle.parentNode;
        if (titleContainer.classList.contains('section-title-container')) {
            const filterButton = titleContainer.querySelector('.filter-button');

            if (filterButton) {
                titleContainer.parentNode.insertBefore(sectionTitle, titleContainer);
                titleContainer.remove();
            }
        }
    });
}

window.addEventListener('load', updateLayout);
window.addEventListener('resize', updateLayout);
