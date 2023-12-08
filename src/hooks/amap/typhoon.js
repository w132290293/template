import * as turf from '@turf/turf';
import dayjs from 'dayjs';

const colorDict = {
    '热带低压(TD)': '#30fc31',
    '热带风暴(TS)': '#307efa',
    '强热带风暴(STS)': '#fffc00',
    '台风(TY)': '#ff9c00',
    '强台风(STY)': '#fb7cff',
    '超强台风(SuperTY)': '#fa3030'
};
const forcColorDict = {
    中国: '#ff0000',
    日本: '#0000ff',
    美国: '#000000',
    韩国: '#41c1f6',
    英国: '#E1DB1A'
};
let infoBox; //信息窗口
let windCenter; //风眼
let dashedArr; //预测线数组
let predictionMarkArr; //预测点数组
let customLayers = [];
let canvas1 = document.createElement('canvas');
let canvas2 = document.createElement('canvas');
let canvas3 = document.createElement('canvas');
let canvass = [canvas1, canvas2, canvas3];

//信息窗口
function setInfo(data, item) {
    const content = `
    <dl class="typhoonInfoBox">
            <dt style="display:${data.sets ? 'none' : 'block'};">
                ${data.tfbh + data.name + '(' + data.ename + ')'}
            </dt>
            <dt style="display:${data.sets ? 'block' : 'none'};">
                预测来自（${data.sets}）
            </dt>
            <dd>
                <li>
                    <strong>时间：</strong>
                    <span>${dayjs(item.time).format('YYYY-MM-DD HH: mm')}</span>
                </li>
                <li>
                    <strong>当前位置：</strong>
                    <span>${item.lng + '°E/' + item.lat + '°N'}</span>
                </li>
                <li>
                    <strong>中心气压：</strong>
                    <span>${item.pressure}百帕</span>
                </li>
                <li>
                    <strong>最大风速：</strong>
                    <span>${item.speed}米/秒</span>
                </li>
                <li>
                    <strong>风力：</strong>
                    <span>${item.power ? item.power + '级' : ''}</span>
                </li>
                <li>
                    <strong>等级：</strong>
                    <span>${item.strong}</span>
                </li>
                <li>
                    <strong>移动速度：</strong>
                    <span>${item.move_speed ? item.move_speed + '公里/时' : ''}</span>
                </li>
                <li>
                    <strong>移动方向：</strong>
                    <span>${item.move_dir}</span>
                </li>
                <li>
                    <strong>七级半径：</strong>
                    <span>${item.radius7 ? item.radius7 + '公里' : ''}</span>
                </li>
                <li>
                    <strong>十级半径：</strong>
                    <span>${item.radius10 ? item.radius10 + '公里' : ''}</span>
                </li>
                <li>
                    <strong>十二级半径：</strong>
                    <span>${item.radius12 ? item.radius12 + '公里' : ''}</span>
                </li>
            </dd>
        </dl>
    `;
    const normalMarker = new AMap.Marker({
        position: [item.lng, item.lat],
        anchor: 'top-left',
        zIndex: 400,
        bubble: true,//冒泡
        content
    });

    return normalMarker
};


//画风眼
function setWindCenter(item) {
    const content = `
    <div class="windCenter" style="width:.55rem;height:.55rem;">
        <img src="/state/tf1.gif" style="width:.55rem;height:.55rem;"/>
    </div>
    `
    const normalMarker = new AMap.Marker({
        position: [item.lng, item.lat],
        anchor: 'center',
        zIndex: 250,
        bubble: true,//冒泡
        content
    });

    return normalMarker
}




//画点
function setMark(data, map) {
    let newArr = [];
    data.points.forEach(item => {
        const content = `<div style="border:.0125rem solid #0007;border-radius:50%;width:.25rem;height:.25rem;background:${colorDict[item.strong]}"></div>`;
        const marker = new AMap.Marker({
            position: [item.lng, item.lat], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: data.name,
            anchor: 'center',
            zIndex: 120,
            content,
        });
        newArr.push(marker);

        //给marker绑定事件
        marker.on('mouseover', (e) => {
            infoBox = setInfo(data, item);
            map.add(infoBox); //画信息窗
        });
        marker.on('mouseout', function () {
            map.remove(infoBox);
        });
        marker.on('click', (e) => { init(data, item, map) });
    });

    return newArr;
};
function init(data, item, map) {
    windCenter && map.remove(windCenter);
    windCenter = setWindCenter(item);
    map.add(windCenter); //画风眼


    //画预测
    const { setPredictionDashed, setPredictionMark } = setPrediction(item, map);

    dashedArr && map.remove(dashedArr);
    dashedArr = setPredictionDashed();
    map.add(dashedArr); //画预测线

    predictionMarkArr && map.remove(predictionMarkArr);
    predictionMarkArr = setPredictionMark();
    map.add(predictionMarkArr); //添加预测点


    //画风圈
    customLayers && map.remove(customLayers);
    customLayers = [];
    const is7 = item.radius7_quad && JSON.parse(item.radius7_quad);
    const is10 = item.radius10_quad && JSON.parse(item.radius10_quad);
    const is12 = item.radius12_quad && JSON.parse(item.radius12_quad);
    const arr7 = is7 && [is7.se, is7.sw, is7.nw, is7.ne];
    const arr10 = is10 && [is10.se, is10.sw, is10.nw, is10.ne];
    const arr12 = is12 && [is12.se, is12.sw, is12.nw, is12.ne];
    const all = [arr7, arr10, arr12]
    all.forEach((i, idx) => {
        let { customLayer, canvas, ctx } = setCircle(item, i, map, canvass[idx])
        customLayers.push(customLayer);
    })
};

//画线
function setLine(data) {
    let newArr = [];
    for (let index = 0; index < data.points.length; index++) {
        const item = data.points[index];
        if (index >= data.points.length - 1) return newArr;
        const polyline = new AMap.Polyline({
            path: [
                [item.lng, item.lat],
                [data.points[index + 1].lng, data.points[index + 1].lat]
            ],
            strokeColor: colorDict[item.strong],
            strokeOpacity: 1,
            strokeWeight: 2,
            strokeStyle: "solid", // 折线样式还支持 'dashed'
            zIndex: 50,
        });
        newArr.push(polyline);
    };
};


//画预测
function setPrediction(data, map) {
    const forecasts = JSON.parse(data.forecast || '{}');
    const forecast = forecasts[0];
    console.log(forecasts);

    //预测线
    function setPredictionDashed() {
        if (!forecast) return [];
        const polyline = new AMap.Polyline({
            path: [[data.lng, data.lat], ...forecast.points.map(item => [item.lng, item.lat])],
            strokeColor: forcColorDict[forecast.sets],
            strokeOpacity: 1,
            strokeWeight: 2,
            strokeStyle: "dashed", // 折线样式还支持 'dashed'
            zIndex: 50,
        });

        return polyline;
    };

    //预测点
    function setPredictionMark() {
        let newArr = [];
        if (!forecast) return [];
        forecast.points.forEach(item => {
            const content = `<div style="border:.0125rem solid #0007;border-radius:50%;width:.2rem;height:.2rem;background:${colorDict[item.strong] || forcColorDict[forecast.sets]}"></div>`;
            const marker = new AMap.Marker({
                position: [item.lng, item.lat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: forecast.sets,
                anchor: 'center',
                zIndex: 100,
                content,
            });
            newArr.push(marker);

            //给marker绑定事件
            marker.on('mouseover', (e) => {
                infoBox = setInfo(forecast, item);
                map.add(infoBox); //画信息窗
            });
            marker.on('mouseout', function () {
                map.remove(infoBox);
            });
        });

        return newArr;
    };

    return {
        setPredictionDashed,
        setPredictionMark
    }
};



//台风名
function setText(data) {
    //锚点计算
    let x = data.points.pop().lng > data.points[data.points.length - 2].lng ? 'top' : 'bottom'
    let y = data.points.pop().lat > data.points[data.points.length - 2].lat ? 'right' : 'left'
    const anchor = x + '-' + y;

    const name = new AMap.Text({
        text: data.name,
        anchor, // 设置文本标记锚点
        draggable: false,
        cursor: 'pointer',
        zIndex: 10,
        position: [data.points.pop().lng, data.points.pop().lat],
        style: {
            'font-size': '.4rem',
            'color': 'white',
            'background': '#0009',
            'border': 'none',
            'padding': '0 .15rem'
        },
        topWhenClick: true,
    });

    return name
};

//画圆
function setCircle(data, level, map, canvas) {
    const ORIGIN_LONGLAT = [data.lng, data.lat];
    const point = turf.point(ORIGIN_LONGLAT);
    const distance = 50;
    const bearing = 90;
    const options = { units: 'kilometers' };

    const ctx = canvas.getContext('2d');
    const customLayer = new AMap.CustomLayer(canvas, {
        zooms: [0, 20],
        alwaysRender: false,//缩放过程中是否重绘，复杂绘制建议设为false
        zIndex: 22,
        opacity: 0.3
    });

    const onRender = function () {
        const size = map.getSize();//resize
        const width = size.width * 2;
        const height = size.height * 2;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
        const deg = Math.PI / 180;
        // ctx.fillStyle = '#08549a';
        // ctx.strokeStyle = 'blue';
        ctx.fillStyle = '#aa6622';
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 2;

        const pos = map.lngLatToContainer(ORIGIN_LONGLAT);
        ctx.beginPath();
        let p = 0;  //动态设置需要旋转多少度

        for (let i = 0; i < level?.length; i++) {
            const { geometry: { coordinates: ORIGIN_LONGLAT2 } } = turf.destination(point, level[i], bearing, options);
            const pos2 = map.lngLatToContainer(ORIGIN_LONGLAT2);
            //半径，这个可以根据中心点计算出例如50米外的经纬度然后传进来。
            const radius = Math.sqrt((pos.x - pos2.x) * (pos.x - pos2.x) + (pos.y - pos2.y) * (pos.y - pos2.y));

            ctx.moveTo(pos.x, pos.y);
            ctx.arc(pos.x, pos.y, radius, Math.PI / 180 * p, Math.PI / 180 * p + Math.PI / 2);
            ctx.lineTo(pos.x, pos.y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            p += 90;
            p >= 360 && (p = 0);
        }
    };
    customLayer.render = onRender;
    customLayer.setMap(map);

    return {
        customLayer,
        canvas,
        ctx
    }
};


export default function _typhoon(map, AMap) {
    let name = '';
    let markArr = [];
    let lineArr = [];

    //添加台风
    function add(data) {
        // console.log(data);
        //视角移动
        map.setZoomAndCenter(4.5, [data.points[0].lng, data.points[0].lat]);

        //台风名
        name = setText(data);
        map.add(name);

        // 点数组
        markArr = setMark(data, map);
        map.add(markArr);

        // 线数组
        lineArr = setLine(data);
        map.add(lineArr);


        // 风圈等 初始化 默认选中最后时间的台风信息
        let item = data.points[0];
        init(data, item, map)

    };

    function removeAll() {
        infoBox && map.remove(infoBox);
        windCenter && map.remove(windCenter);
        dashedArr && map.remove(dashedArr);
        predictionMarkArr && map.remove(predictionMarkArr);
        map.remove(name);
        map.remove(markArr);
        map.remove(lineArr);

        for (let index = 0; index < 3; index++) {
            setCircle({ lng: 1, lat: 1 }, {}, map, canvass[index])
        }
    };


    return {
        add,
        removeAll,
    }
}
