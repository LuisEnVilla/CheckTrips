$(function () { 
    $('#chart1').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Gastos de viáticos',
            align: 'center',
            verticalAlign: 'top',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: '$',
            innerSize: '50%',
            data: [
                {
                    name: 'Juan Pérez',
                    y: 50.0,
                    color: '#FFD54F'
                },
                {
                    name: 'Gabriela Castillo',
                    y: 50.0
                }
            ]
        }]
    });
    $('#chart2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Gastos de Transporte',
            align: 'center',
            verticalAlign: 'top',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: '$',
            innerSize: '50%',
            data: [
                {
                    name: 'Juan Pérez',
                    y: 50.0,
                    color: '#FFD54F'
                },
                {
                    name: 'Gabriela Castillo',
                    y: 50.0,
                    color: '#4fc3f7'
                }
            ]
        }]
    });
});