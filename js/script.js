
function drawChart(container,score){

    (function (H) {
        var defaultPlotOptions = H.getOptions().plotOptions,
            columnType = H.seriesTypes.column,
            wrap = H.wrap,
            each = H.each;

        defaultPlotOptions.lineargauge = H.merge(defaultPlotOptions.column, {});
        H.seriesTypes.lineargauge = H.extendClass(columnType, {
            type: 'lineargauge',
            //inverted: true,
            setVisible: function () {
                columnType.prototype.setVisible.apply(this, arguments);
                if (this.markLine) {
                    this.markLine[this.visible ? 'show' : 'hide']();
                }
            },
            drawPoints: function () {
                // Draw the Column like always
                columnType.prototype.drawPoints.apply(this, arguments);

                // Add a Marker
                var series = this,
                    chart = this.chart,
                    inverted = chart.inverted,
                    xAxis = this.xAxis,
                    yAxis = this.yAxis,
                    point = this.points[0], // we know there is only 1 point
                    markLine = this.markLine,
                    ani = markLine ? 'animate' : 'attr';

                // Hide column
                point.graphic.hide();

                if (!markLine) {
                    var path = inverted ? ['M', 0, 0, 'L', -10, -10, 'L', 10, -10, 'L', 0, 0, 'L', 0, 0 + xAxis.len] : ['M', 0, 0, 'L', -10, -10, 'L', -10, 10,'L', 0, 0, 'L', xAxis.len, 0];                
                    markLine = this.markLine = chart.renderer.path(path)
                        .attr({
                        fill: series.color,
                        stroke: series.color,
                            'stroke-width': 2
                    }).add();
                }
                markLine[ani]({
                    translateX: inverted ? xAxis.left + yAxis.translate(point.y) : xAxis.left,
                    translateY: inverted ? xAxis.top : yAxis.top + yAxis.len -  yAxis.translate(point.y)
                });
            }
        });
    })(Highcharts);
    var i=-1.9;
    $(container).highcharts({
            chart: {
                type: 'lineargauge',            
                margin: [10, 20, 40, 20],
                inverted: true,
                height:100,
                borderRadius:10,
                borderWidth:2,
                borderColor:'#1d2455'
            },
            credits: {
              enabled: false
            },
            exporting: false,
            title: {
                text: '',
                color: '#C0C0C0'
            },
            xAxis: {
                lineColor: '#C0C0C0',
                labels: {
                    enabled: false
                },
                tickLength: 0,            
            },
            yAxis: {
                min: 0,
                max: 100,
                tickPositions: [0, 8, 24, 100],
                tickLength: 1,
                tickWidth: 1,
                tickColor: '#C0C0C0',
                gridLineColor: '#C0C0C0',
                gridLineWidth: 1,
                minorTickInterval: 5,
                minorTickWidth: 1,
                minorTickLength: 5,
                minorGridLineWidth: 0,
                startOnTick: true,
                endOnTick: true,

                title: null,
                /*
                labels: {
                    format: '{value}%'
                },
                */
                plotBands: [{
                    from: 0,
                    to: 24,
                    color: {
                      linearGradient:  { x1: 0, x2: 1, y1: 0, y2: 0 },
                      stops: [
                        [0, '#ff10fb'],
                        [0.8, '#5997f0'],
                        [1, '#5997f0'],
                      ]
                    },
                }, {
                    from: 24,
                    to: 100,
                    color: {
                      linearGradient:  { x1: 0, x2: 1, y1: 0, y2: 0 },
                      stops: [
                        [0, '#5997f0'],
                        [0.2, '#00d9c8'],
                        [1, '#00d9c8'],
                      ]
                    },
                }]
            },
            legend: {
                enabled: false
            },
            series: [{
                data: [score],
                color: '#000000',
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    style: {
                        fontWeight: 'bold'
                    },
                    shape: 'circle',
                    padding: 10,
                    align: 'center',
    //                format: '{point.y:,.0f}%',
                    y: 0,
                }
            }]

        }, // Add some life
    );
}

function setUserInfo(userInfo){
    $('#u_name').text(userInfo.name);
    $('#u_age').text(userInfo.age);
    $('#u_sex').text(userInfo.sex);
    $('#u_dob').text(userInfo.dateOfBirth);
    $('#exm_time').text(userInfo.examTime);
}

function placeExamScoreCard(){

}