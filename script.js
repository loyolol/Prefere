function updateHeaderLayout() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    const headerMiddle = document.querySelector('.header-middle');
    const headerSearch = document.querySelector('.header-search');

    //Скрываем или показываем header-middle
    if (headerMiddle) {
        headerMiddle.style.display = window.innerWidth <= 865 ? 'none' : 'flex'; // или 'block'
    }

    //Добавляем или удаляем кнопку меню
    if (window.innerWidth <= 865) {
        if (!document.querySelector('.header-menu-icon')) {
            const img = document.createElement('img');
            img.src = 'photo/menu.png';
            img.alt = 'Menu Icon';
            img.classList.add('header-menu-icon');
            img.style.width = '32px';
            img.style.height = '30px';
            img.style.marginRight = '30px';
            headerRight.appendChild(img);
        }
    } else {
        const menuIcon = document.querySelector('.header-menu-icon');
        if (menuIcon) {
            menuIcon.remove();
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

    if (!sectionTitle) return; // Exit if the title does not exist

    // Check if the container already exists to prevent duplicates
    if (sectionTitle.parentNode.classList.contains('section-title-container')) return;

    // Create the container for title and button
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('section-title-container');

    // Move the title inside the container
    sectionTitle.parentNode.insertBefore(titleContainer, sectionTitle);
    titleContainer.appendChild(sectionTitle);

    // Create the filter button
    const filterButton = document.createElement('button');
    filterButton.classList.add('filter-button');
    titleContainer.appendChild(filterButton);
}

function updateLayout() {
    updateHeaderLayout();

    // Check if the screen width is less than 900px to add the filter buttons
    if (window.innerWidth <= 900) {
        addFilterButtons();
    } else {
        removeFilterButtons();
    }
}

function removeFilterButtons() {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(sectionTitle => {
        // Retrieve the container if it exists
        const titleContainer = sectionTitle.parentNode;
        if (titleContainer.classList.contains('section-title-container')) {
            // Retrieve the filter button
            const filterButton = titleContainer.querySelector('.filter-button');

            // Restore the original structure if the filter button exists
            if (filterButton) {
                titleContainer.parentNode.insertBefore(sectionTitle, titleContainer); // Move the title before the container
                titleContainer.remove(); // Delete the container
            }
        }
    });
}

window.addEventListener('load', updateLayout);
window.addEventListener('resize', updateLayout);