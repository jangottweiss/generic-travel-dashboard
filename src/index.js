import Map from './components/Map/MultiLayerMap';

import Chart from './components/Chart/Chart';
import chartConfig from './components/Chart/ChartConfig';

import geoData from './data/ImagesTakenAll.json';
import './styles/app.scss';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
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


/*
 * MAP - All images mapped
 */

 // General map settings
const imageMapSettings = {
    container: 'map-container-1',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-73.98938, 40.73061],
    zoom: 12,
    scrollZoom: false
}

// Convert timestamp
geoData.features = geoData.features.map((e) => {
    e.properties.unix = new Date(e.properties.date).getTime()
    return e;
})

// Create new Map Object
const ImageMapAll = new Map(imageMapSettings);

// Specific data driven map config
const sources = [{
    name: "geo",
    src: {
        "type": "geojson",
        "data": geoData
    }
}];
const layers = [{
    name: "imagePointLayer",
    layer: {
        "id": "point",
        "source": "geo",
        "type": "circle",
        "paint": {
            "circle-radius": 3,
            "circle-color": {
                property: "unix",
                colorSpace: "rgb",
                type: "exponential",
                stops: [
                    [1530218767000, "#63a3c1"],
                    [1530876656610, "#0f1f27"]
                ]
            }
        }
    }
}];

// Create layer based on the created map object
ImageMapAll.createLayerMap(sources, layers);


/*
 * CHART 
 */

 // Create a new Chart object
const StepChart = new Chart("chart-container-1");

// Create a new chart with config
StepChart.createChart(chartConfig.stepChart)
