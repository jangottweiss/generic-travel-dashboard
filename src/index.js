import DashboardConfigProvider from './config/localConfigProvider';

import Map from './components/Map/MultiLayerMap';

import Chart from './components/Chart/Chart';


import Intro from './components/Intro/Intro';

import './styles/app.scss';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const DashboardConfig = new DashboardConfigProvider();
const config = DashboardConfig.getConfig();

const intro = new Intro();

// Navigation
const navBox = document.getElementById("navBox");

// Sections - Page Content
const sectionsEle = document.getElementById("sections");

config.sections.forEach((section, idx) => {
    // Add NavBox Element
    navBox.innerHTML += createNavItem(section.nav, idx, idx == 0).outerHTML;

    // Add Section depending on the section type
    switch (section.type) {
        case "Intro":
            sectionsEle.innerHTML += createIntroSection(section).outerHTML;
            break;
        case "Map":
            sectionsEle.innerHTML += createMapSection(section).outerHTML;
            // Wait for the next loop so the required html element is rendered
            window.setTimeout(_ => {
                const map = new Map(section.mapData.general);
                const sources = [{
                    name: "geo",
                    src: {
                        "type": "geojson",
                        "data": DashboardConfig.getData(section.mapData.dataId)
                    }
                }];
                map.createLayerMap(sources, section.mapData.layers);
            }, 0)

            break;
        case "Chart":
            sectionsEle.innerHTML += createChartSection(section).outerHTML;
            // Wait for the next loop so the required html element is rendered
            window.setTimeout(_ => {
                const chart = new Chart(section.chartData.container);
                chart.createChart(DashboardConfig.getData(section.chartData.dataId));
            })
            break;
        case "Image":
            sectionsEle.innerHTML += createImageSection(section).outerHTML;
            break;
        default:
            break;
    }
})

function createNavItem(text, idx, active) {
    const div = document.createElement("div");
    div.setAttribute("data-index", idx);

    div.classList.add("nav-item");
    if (active) div.classList.add("nav-item-active");

    const t = document.createTextNode("- " + text + " -");
    div.appendChild(t);
    return div;
}

function createIntroSection(section) {
    return intro.createIntroSection(section.title, section.subtitle, true);
}

function createMapSection(section) {
    const mapSection = document.createElement("section");
    const wrapper = document.createElement("div");
    const mapTitle = document.createElement("h1");
    mapTitle.appendChild(document.createTextNode(section.title));

    const mapContainer = document.createElement("div");
    mapContainer.setAttribute("id", section.mapData.general.container);

    wrapper.appendChild(mapTitle);
    wrapper.appendChild(mapContainer);
    mapSection.appendChild(wrapper);

    return mapSection;
}

function createChartSection(section) {
    const chartSection = document.createElement("section");
    const chartWrapper = document.createElement("div");
    const chartTitle = document.createElement("h1");
    chartTitle.appendChild(document.createTextNode(section.title));

    const chartContainer = document.createElement("div");
    chartContainer.setAttribute("id", section.chartData.container);
    chartContainer.classList.add("chart-container");

    chartSection.appendChild(chartWrapper);
    chartWrapper.appendChild(chartTitle);
    chartWrapper.appendChild(chartContainer);

    return chartSection;
}

function createImageSection(section) {
    const imgsection = document.createElement("section");
    const wrapper = document.createElement("div");
    wrapper.classList.add("content");
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("image");

    const img = document.createElement("img");
    img.classList.add("section-image");
    img.classList.add("object-fit_contain");
    img.setAttribute("src", section.image);

    const title = document.createElement("h1");
    title.appendChild(document.createTextNode(section.title));

    imgWrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(imgWrapper);
    imgsection.appendChild(wrapper);

    return imgsection;
}



/*
 *  Keyboard scrolling logic
 *  Scrolling is done via javascript and not via anchors
 *  the reason for that is keyboard navigation and smooth
 *  scrolling animations.
 */
const sections = document.querySelectorAll('section');
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const currentSection = Math.floor(window.scrollY / window.innerHeight);

    if (keyName === 'j') {
        if (currentSection === sections.length - 1) return;
        sections[currentSection + 1].scrollIntoView({
            behavior: "smooth"
        });
    }
    if (keyName === 'k') {
        if (currentSection === 0) return;
        sections[currentSection - 1].scrollIntoView({
            behavior: "smooth"
        });
    }
}, false);

/*
 * Navigation bar scrolling logic
 */
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((ele) => {
    ele.addEventListener('click', (event) => {
        sections[event.srcElement.dataset.index].scrollIntoView({
            behavior: "smooth"
        })
        console.log(event);
    });
})

var last_known_scroll_position = 0;
var ticking = false;

function updateNavBar(scroll_pos) {
    const currentSection = Math.floor(scroll_pos / window.innerHeight);
    window.location.hash = '#' + currentSection;
    // Clear active item
    navItems.forEach(item => item.classList.remove('nav-item-active'));
    // Set active item depending on the current scroll position
    navItems[currentSection].classList.add('nav-item-active');
}

// Scroll Event Listener
window.addEventListener('scroll', function (e) {
    // Throttle scroll event since it is fired very often
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            updateNavBar(last_known_scroll_position);
            ticking = false;
        });
        ticking = true;
    }
});


// /*
//  * MAP - All images mapped
//  */

//  // General map settings
// const imageMapSettings = {
//     container: 'map-container-1',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: [-73.98938, 40.73061],
//     zoom: 12,
//     scrollZoom: false
// }

// // Convert timestamp
// geoData.features = geoData.features.map((e) => {
//     e.properties.unix = new Date(e.properties.date).getTime()
//     return e;
// })

// // Create new Map Object
// const ImageMapAll = new Map(imageMapSettings);

// // Specific data driven map config
// const sources = [{
//     name: "geo",
//     src: {
//         "type": "geojson",
//         "data": geoData
//     }
// }];
// const layers = [{
//     name: "imagePointLayer",
//     layer: {
//         "id": "point",
//         "source": "geo",
//         "type": "circle",
//         "paint": {
//             "circle-radius": 3,
//             "circle-color": {
//                 property: "unix",
//                 colorSpace: "rgb",
//                 type: "exponential",
//                 stops: [
//                     [1530218767000, "#63a3c1"],
//                     [1530876656610, "#0f1f27"]
//                 ]
//             }
//         }
//     }
// }];

// // Create layer based on the created map object
// ImageMapAll.createLayerMap(sources, layers);


// /*
//  * CHART 
//  */

//  // Create a new Chart object
// const StepChart = new Chart("chart-container-1");

// // Create a new chart with config
// StepChart.createChart(chartConfig.stepChart)