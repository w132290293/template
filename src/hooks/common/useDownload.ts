/**
 * @description file下载
 * 
 * @param {Function} file 文件(必传)
 * @param {String} fileType 导出的文件格式
 * @return void
 * */
export const useDownload = async (
    file: File,
    fileType: string
) => {
    const link = document.createElement("a");
    const blob = new Blob([file], {
        type: fileType,
    });
    link.setAttribute('download', '');
    link.href = window.URL.createObjectURL(blob);
    link.click();
    //释放内存
    window.URL.revokeObjectURL(link.href);
};