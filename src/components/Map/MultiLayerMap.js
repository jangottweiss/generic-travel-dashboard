import Map from './Map';


// The MultiLayerMap extends the base map and allows us to add multiple layers to the map
// The definition is based on the mapbox gl js data driven config objects

class MultiLayerMap extends Map {
    constructor(settings) {
        super(settings);
    }

    createLayerMap(sources, layers) {
        this.createMap().then((map) => {

            this.mapSources = {};
            this.mapLayers = {};

            if (sources && sources.length > 0) {
                for (let i = 0, len = sources.length; i < len; i++) {
                    let src = sources[i];
                    this.mapSources[src.name] = map.addSource(src.name, src.src);
                }
            }

            if(layers && layers.length > 0) {
                for (let i = 0, len = layers.length; i < len; i++) {
                    let layer = layers[i];
                    this.mapLayers[layer.name] = map.addLayer(layer.layer);
                }
            }
            
        });
    }
}

export default MultiLayerMap;