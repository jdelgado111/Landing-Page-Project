/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let observer;
const navbar = document.getElementById("navbar__list");
const unorderedList = document.getElementById("navbar__list");
let sectionCount = 4;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Callback function for observer
// Adds class 'active' to section when near top of viewport
// Removes the class when out of viewport
// Works automatically  when using scrollTO function
function callback (entries, observer) {
    entries.forEach(entry => {
        let section = entry.target;
        const navItem = document.getElementsByClassName(section.id)[0];
        
        if (entry.isIntersecting) {
            section.classList.add("your-active-class");
            navItem.classList.add("active-list-item");
        }
        else {
            section.classList.remove("your-active-class");
            navItem.classList.remove("active-list-item");
        }
    });
}

function updateNav(elem) {
    // create li element, set its text, add menu__link class
    const listItem = document.createElement("li");
    listItem.textContent = elem.getAttribute("data-nav");
    listItem.className = "menu__link";
        
    //set ID as class for scrolling on click
    //listItem.setAttribute("data-id", elem.id);
    listItem.classList.add(elem.id);

    unorderedList.appendChild(listItem);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    // create an array of the children of the 'main' tag
    const mainChildren = document.getElementsByTagName("main")[0].children;
    const childrenArray = Array.from(mainChildren);

    // iterate through array of children
    for (let i = 0; i < childrenArray.length; i++) {
        const child = childrenArray[i];
    
        //skip the Landing Page header
        if (child.getAttribute("class") == "main__hero") {
            continue;
        }
    
        updateNav(child);
    }
}

// Intersection Observer
// will run callback function when at least 65%
// of target is in/out of viewport
function createObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.65
    }

    observer = new IntersectionObserver(callback, options);
}

// Observer targets
// set which elements for observer to keep track of
// if they are in or out of the viewport (the browser window)
function setTargets() {
    const sections = document.getElementsByTagName("section");
    const sectionsArray = Array.from(sections);

    for (let i = 0; i < sectionsArray.length; i++) {
        observer.observe(sectionsArray[i]);
    }
}

// Scroll to anchor ID using scrollTO event
function scrollIntoView(event) {
    const targetID = event.target.classList[1];
    const target = document.getElementById(targetID);
    
    //offset the scroll position by the height of the navbar
    const yOffset = -navbar.offsetHeight;
    const yPosition = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({top: yPosition, behavior: "smooth"});
    
    // set section as active class
    target.classList.add("your-active-class");
    
    //intersection observer handles removing the added class
    //when the element is no longer in view
}

// Attach event listener to navbar list
function attachListener() {
    navbar.addEventListener("click", scrollIntoView);
}

// Create a new section and append it to 'main'
function addNewSection() {
    const newSection = document.createElement("section");
    sectionCount = sectionCount + 1;
    
    let innHTML = document.getElementById("section1").innerHTML;
    innHTML = innHTML.replace("Section 1", "Section " + sectionCount);
    newSection.innerHTML = innHTML;
    
    const newID = "section" + sectionCount;
    newSection.setAttribute("id", newID);
    
    newSection.setAttribute("data-nav", "Section " + sectionCount);
    
    const elemMain = document.getElementsByTagName("main")[0];
    elemMain.appendChild(newSection);
    
    //update navbar
    updateNav(newSection);
    
    //add new section to observer
    observer.observe(newSection);
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildNav();

// Create intersection observer
createObserver();

// Set observer targets (the sections)
setTargets();

// Scroll to section on link click
attachListener();

// add a new section on keypress
document.body.addEventListener("keydown", addNewSection);
