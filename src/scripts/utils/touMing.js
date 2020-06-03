// 处理图片背景，将bmp格式的图片中的白色背景进行透明处理，同时转化为png的格式
// 还未用到
export const touMing = function (dataImg, callback) {
  let self = this;
  var base64Img = document.createElement("base64Img"),
    canvas = document.createElement("canvas"),
    context = canvas.getContext("2d");
  // 创建新图片
  var img = new Image();
  img.src = "data:image/bmp;base64," + dataImg;
  img.addEventListener(
    "load",
    function() {
      // 绘制图片到canvas上
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      // 将canvas的透明背景设置成白色
      var imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      for (var i = 0; i < imageData.data.length; i += 4) {
        //rgb大于250的透明度y均设置成0
        if (
          imageData.data[i] > 250 &&
          imageData.data[i + 1] > 250 &&
          imageData.data[i + 2] > 250
        ) {
          imageData.data[i + 3] = 0;
        }
      }
      context.putImageData(imageData, 0, 0);
      self.baseImg = canvas.toDataURL("image/png").slice(22);//返回base64
      if (typeof callback !== undefined) {
        if (callback) callback(self.baseImg);
      }
    },
    false
  );
}