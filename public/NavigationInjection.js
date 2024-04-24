const Navigations = [
    {"kanbas-navigation": "/Kanbas-old/Navigations/kanbas_navigation.html"},
    {"course-navigation": "/Kanbas-old/Navigations/course_navigation.html"},
    {"account-navigation": "/Kanbas-old/Navigations/account_navigation.html"},
]

const KanbasNavigationPathList = [
    {"Account": "/Kanbas-old/Account/Profile"},
    {"Dashboard": "/Kanbas-old/Dashboard"},
    {"Courses": "/Kanbas-old/Courses"},
]

const CoursesNavigationPathList = [
    {"Home": "/Kanbas-old/Courses/Home"},
    {"Assignments": "/Kanbas-old/Courses/Assignments"},
    {"Grades": "/Kanbas-old/Courses/Grades"},
    {"Settings": "/Kanbas-old/Courses/Settings"},
]

/**
 * Injects the HTML content into the target element.
 * @param {string} htmlContent The HTML content to inject.
 * @param {string} targetElementId The ID of the target element.
 */
async function injectHTML(htmlContent, targetElementId) {
    if (!targetElementId || targetElementId.length === 0) {
        console.error('Target element ID is required.');
        return;
    }

    return new Promise((resolve) => {
        let targetElement = document.getElementById(targetElementId);

        if (targetElement) {
            targetElement.innerHTML = htmlContent;
            console.log("Injected navigation into " + targetElementId)
        }
        else {
            console.error(`Target element with ID '${targetElementId}' not found.`);
        }

        resolve();
    });
}

/**
 * Injects the navigation sidebars into the target elements.
 * @param {Array} navigationList The list of navigations to inject.
 */
async function injectNavigationSidebars(navigationList) {
    return new Promise(async (resolve) => {

        for (let index = 0; index < navigationList.length; index++) {

            let navigation = navigationList[index];
            let key = Object.keys(navigation)[0];
            let value = navigation[key];

            try {
                let response = await fetch(value);
                let data = await response.text();

                // Inject the HTML of the navigation into the target element.
                await injectHTML(data, key);

                // Resolve the promise when the last navigation is injected.
                if (index === navigationList.length - 1) {
                    console.log("All navigations injected.");
                    resolve();
                }

            }
            catch (error) {
                console.error(`Failed to fetch ${key}: ${error}`);
            }

        }

    });
}

/**
 * Sets the active class for the current navigation item in the given navigation sidebar.
 * @param {Array} navigationPathList The list of navigation paths.
 * @param {string} activeClassName The name of the active class.
 * @param {string} parentElementId The ID of the element containing the navigation items.
 */
function setActiveNavigationItem(navigationPathList, activeClassName, parentElementId) {
    let currentPath = window.location.pathname;
    let pathWithoutFilename = currentPath.replace(/\/[^\/]*$/, '');

    for (let i = 0; i < navigationPathList.length; i++) {

        let pathName = Object.keys(navigationPathList[i])[0];
        let path = navigationPathList[i][pathName];

        if (pathWithoutFilename.toLowerCase().includes(path.toLowerCase())) {

            let element = document.querySelector(`#${parentElementId} a.nav-link[href*="${path}"]`);
            element && element.classList.add(activeClassName);

            return;
        }
    }
}

// Inject the navigations into the target elements.
injectNavigationSidebars(Navigations)
    .then(() => {
        console.log("Setting the appropriate class for active navigation items...")
        // Add active class to the current navigation items
        setActiveNavigationItem(KanbasNavigationPathList, "nav-active", "kanbas-navigation");
        setActiveNavigationItem(CoursesNavigationPathList, "active", "course-navigation");
    })