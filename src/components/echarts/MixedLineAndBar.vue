<!-- 折柱混合 -->
<template>
    <div :id="id" class="MixedLineAndBar"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
const id = new Date().getTime().toString();

let myChart: any;
nextTick(() => {
    const chartDom = document.getElementById(id);
    myChart = echarts.init(chartDom);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            // feature: {
            //     dataView: { show: true, readOnly: false },
            //     magicType: { show: true, type: ['line', 'bar'] },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            // }
        },
        grid: {
            top: '10%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
        legend: {
            data: ['Evaporation', 'Temperature']
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Precipitation',
                // min: 0,
                // max: 250,
                // interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: 'Temperature',
                // min: 0,
                // max: 25,
                // interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name: 'Evaporation',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ml';
                    }
                },
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ]
            },
            {
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' °C';
                    }
                },
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', function () {
        myChart.resize();
    });

});


onUnmounted(() => {
    //清除myChart
    echarts.dispose(myChart);
    myChart = null;
});

</script>

<style scoped>
.MixedLineAndBar {
    width: 100%;
    height: 100%;
}
</style>