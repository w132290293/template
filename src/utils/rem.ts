// 设置基础根文件大小
const baseSize = 80;
// rem 函数
function setRem() {
    // 设计稿一般都是以375的宽度
    const scale = document.documentElement.clientWidth / 1920;
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 6) + 'px';
};
// 调用方法
setRem();
// 监听窗口在变化时重新设置跟文件大小
window.onresize = function () {
    setRem();
};

