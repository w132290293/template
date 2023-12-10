// WebSocket
function WS(url, obj, fn, options = {}) {
    let webSocket;
    let retries = 0; // 重试计数器

    const {
        maxRetries = 5, // 最大重试次数
        retryInterval = 3000, // 重试间隔时间（单位：毫秒）
        connectionTimeout = 10000 // 连接超时时间（单位：毫秒）
    } = options;

    function connect() {
        webSocket = new WebSocket(url); // ws://192...?token=sadfdc

        const connectTimeout = setTimeout(() => {
            console.error('WebSocket连接超时' + url);
            webSocket.close();
            reconnect();
        }, connectionTimeout);

        webSocket.onopen = function () {
            clearTimeout(connectTimeout);
            console.log('WebSocket连接已打开' + url);
            webSocket.send(JSON.stringify(obj));
        };

        webSocket.onmessage = function (event) {
            try {
                fn(JSON.parse(event.data));
            } catch (error) {
                console.log(error);
            }
        };

        webSocket.onclose = function () {
            console.log('WebSocket连接已关闭' + url);
            reconnect();
        };

        webSocket.onerror = function (error) {
            console.error('WebSocket错误:', error);
            reconnect();
        };
    }

    function reconnect() {
        if (retries < maxRetries) {
            retries++;
            console.log(`尝试重新连接... (重试次数: ${retries})`);
            setTimeout(() => {
                connect();
            }, retryInterval);
        } else {
            console.error('达到最大重试次数，连接失败' + url);
        }
    }

    function sendMessage(message = {}) {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) { // 常量WebSocket.OPEN === 1
            webSocket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket连接未建立或已关闭，无法发送消息' + url);
        }
    }

    connect();


    return {
        sendMessage
    };
}

export {
    WS
}