(function () {

    //dropdown
    let toggleDropDown = () => {
        let dropdownBtns = document.querySelectorAll('.dropdownBtn');

        let applyListeners = () => {
            dropdownBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    let dropdownContent = btn.nextElementSibling;
                    toggleClass(dropdownContent, 'dropdown-active');
                    closeOtherDropdowns(btn);
                });
            });
        };

        let toggleClass = (element, stringClass) => {
            if (element.classList.contains(stringClass)) element.classList.remove(stringClass);
            else element.classList.add(stringClass);
        };

        let closeOtherDropdowns = (clickedBtn) => {
            dropdownBtns.forEach((btn) => {
                if (btn !== clickedBtn) {
                    let otherDropdownContent = btn.nextElementSibling;
                    otherDropdownContent.classList.remove('dropdown-active');
                }
            });
        };

        applyListeners();
    };

    toggleDropDown();


    //single accordion
    const toggleCnt = document.querySelector('.toggle-cnt');
    const innerCnt = document.querySelector('.inner-container__holder')
    const arrowUpIcon = document.querySelector('.arrow-up-icon')
    const arrowDownIcon = document.querySelector('.arrow-down-icon')

    toggleCnt.addEventListener("click", () => {
        if (innerCnt.classList.contains("showInnerCnt")) {
            innerCnt.classList.remove("showInnerCnt");
            arrowDownIcon.style.display = "none";
            arrowUpIcon.style.display = "block";
        }else {
            innerCnt.classList.add("showInnerCnt")
            arrowDownIcon.style.display = "block";
            arrowUpIcon.style.display = "none";
        }
    })

    const accHolders = document.querySelectorAll('.acc-holder');
    const svgContainers = document.querySelectorAll('.svg-container');
    const loader = document.querySelector('.loader');
    const countElement = document.querySelector('.count');
    const progressBar = document.querySelector('.progress');

    let clickCount = 0;
    let openAccordionIndex = null;

    showAccordion(0);

    svgContainers.forEach((svgContainer, index) => {
        let isChecked = false;

        svgContainer.addEventListener("click", (event) => {

            if (!isChecked) {
                isChecked = true;
                svgContainer.classList.add('clicked', 'rotating', 'checked');
                hideOpenAccordion();
                showAccordion(index);
                clickCount++;
            } else {
                isChecked = false;
                svgContainer.classList.remove('checked');
                hideAccordion(index);
                clickCount--;
            }
            updateCount();
            updateProgressBar();
        });
    });

    function showAccordion(index) {
        const accordion = accHolders[index];
        if (accordion) {
            accordion.classList.add('active');
            openAccordionIndex = index;
        }
    }

    function hideAccordion(index) {
        const accordion = accHolders[index];
        if (accordion) {
            accordion.classList.remove('active');
            openAccordionIndex = null;
        }
    }

    function hideOpenAccordion() {
        if (openAccordionIndex !== null) {
            hideAccordion(openAccordionIndex);
        }
    }

    accHolders.forEach((accHolder, index) => {
        const btn = accHolder.querySelector('.acc-content .btn');

        btn.addEventListener("click", (event) => {

            if (index !== openAccordionIndex) {
                hideOpenAccordion();
                showAccordion(index);
            }
        });
    });

    function updateCount() {
        countElement.textContent = `${clickCount}/5`;
    }

    function updateProgressBar() {
        const progressWidth = (clickCount / 5) * 100;
        progressBar.style.width = `${progressWidth}%`;
    }
}());