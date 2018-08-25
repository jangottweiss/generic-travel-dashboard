import mapboxgl from 'mapbox-gl';
import {
    resolve
} from 'url';

const accessToken = 'pk.eyJ1IjoiamFuMTE4NSIsImEiOiJjajdleWoxd20wNmJhMnF0NWt1NzZ6ZGRlIn0.r6axAv2C3P7GZZvGs968YA';

// A generic map class. This is a class wrapper for the Mapbox gl js library. 
// This Base class will be used for further classes with different functionality 

class Map {
    constructor(settings) {
        this.mapboxgl = mapboxgl;
        mapboxgl.accessToken = accessToken;
        this.settings = settings;
    }

    createMap() {
        return new Promise((resolve, reject) => {
            const map = new mapboxgl.Map(this.settings);

            map.on('load', function () {            
                map.addControl(new mapboxgl.NavigationControl());
                resolve(map);
            });
        })
    }
}

export default Map;