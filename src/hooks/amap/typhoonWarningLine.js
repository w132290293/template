/**
 * 绘制台风警戒线
 * @param {*} map 
 * @param {*} AMap 
 */
export default function typhoonWarningLine(map, AMap) {

    //  台风警戒线坐标数据
    const tfWarnLine = [
        {
            key: 24,
            name: '小时警戒线',
            color: 'red',
            list: [
                [105, 0],
                [113, 4.5],
                [119, 11],
                [119, 18],
                [127, 22],
                [127, 34]
            ]
        },
        {
            key: 48,
            name: '小时警戒线',
            color: 'yellow',
            list: [
                [105, 0],
                [120, 0],
                [132, 15],
                [132, 34]
            ]
        }
    ];

    let polyline24 = new AMap.Polyline({
        path: tfWarnLine[0].list,
        isOutline: false,
        outlineColor: '#ffeeff',
        borderWeight: 0,
        strokeColor: "#ff0000",
        strokeOpacity: 1,
        strokeWeight: 2,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
    });
    let polyline48 = new AMap.Polyline({
        path: tfWarnLine[1].list,
        isOutline: false,
        outlineColor: '#ffeeff',
        borderWeight: 0,
        strokeColor: "#ffff00",
        strokeOpacity: 1,
        strokeWeight: 2,
        // 折线样式还支持 'dashed'
        strokeStyle: "dashed",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
    });


    // 创建纯文本标记
    const text24 = new AMap.Text({
        text: '24小时警戒线',
        anchor: 'center', // 设置文本标记锚点
        draggable: false,
        cursor: 'pointer',
        // angle: 10,
        position: [127, 27],
        style: {
            'border-width': 0,
            'font-size': '14px',
            'color': 'red',
            'word-break': 'normal',
            'white-space': 'normal',
            'overflow': 'normal',
            'text-overflow': 'normal',
            'background': 'none',
            'padding': '0',
            'border': 'none',
            'border-radius': 'none',
        },
    });
    const text48 = new AMap.Text({
        text: '48小时警戒线',
        anchor: 'center', // 设置文本标记锚点
        draggable: false,
        cursor: 'pointer',
        // angle: 10,
        position: [132, 24],
        style: {
            'border-width': 0,
            'font-size': '14px',
            'color': 'yellow',
            'word-break': 'normal',
            'white-space': 'normal',
            'overflow': 'normal',
            'text-overflow': 'normal',
            'background': 'none',
            'padding': '0',
            'border': 'none',
            'border-radius': 'none',
        },
    });

    function addLine() {
        map.add([polyline24, polyline48, text24, text48]);
        map.setFitView(); //重置视角
    }

    function removeLine() {
        map.remove([polyline24, polyline48, text24, text48]);
        map.setFitView();
    }

    return {
        addLine,
        removeLine
    }
};

