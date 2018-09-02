class DashboardConfigProvider {
    constructor(url) {
        this.serviceURL = url;
    }
    getConfig(id) {
        return new Promise((resolve, reject) => {
            fetch(this.serviceURL + '/dashboard/' + id)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    resolve(data.config);
                });
        })

    }

    getData(id) {
        fetch(this.serviceURL + '/data/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data.data;
            });

    }
}

export default DashboardConfigProvider;