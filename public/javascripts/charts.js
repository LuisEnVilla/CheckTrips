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
    $('#container').highcharts({
        title: {
            text: 'Combination chart'
        },
        xAxis: {
            categories: ['01/05/2014 - 02/06/2014']
        },
        labels: {
            items: [{
                html: ' consumption',
                style: {
                    left: '50px',
                    top: '18px',
                    color:'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'Jane',
            data: [3],
            color:'#03a9f4'
        }, {
            type: 'column',
            name: 'John',
            data: [2]
        }, {
            type: 'column',
            name: 'Joe',
            data: [4]
        }, {
            type: 'spline',
            name: 'Total por viaje',
            data: [5],
            marker: {
                lineWidth: 2,
                lineColor:'orange',
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'Jane',
                y: 13,
                color:'#03a9f4' // Jane's color
            }, {
                name: 'John',
                y: 23,
                color: Highcharts.getOptions().colors[1] // John's color
            }, {
                name: 'Joe',
                y: 19,
                color:'rgba(0,0,0,0.6)' // Joe's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
});