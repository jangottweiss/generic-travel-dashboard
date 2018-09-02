import config from './dashboard1.json';
import ImagesTakenAll from '../data/ImagesTakenAll.json'
import chartConfig from '../components/Chart/ChartConfig';

class DashboardConfigProvider {
    constructor() {
        this.data = {
            mapone: ImagesTakenAll,
            chartone: chartConfig.stepChart
        }
    }
    getConfig() {
        return config;
    }
    
    getData(id) {
        return this.data[id];
    }
}

export default DashboardConfigProvider;
