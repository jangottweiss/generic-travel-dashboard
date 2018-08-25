import Highcharts from 'highcharts/js/highcharts';


// Wrapper class for the Highcharts library
class Chart {
    constructor(container) {
        this.container = container;
    }
    createChart(config) {
        Highcharts.chart(this.container, config);
    }
}

export default Chart;
