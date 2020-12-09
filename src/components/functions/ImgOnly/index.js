const ImgOnly = (imageInput) => {
  if (imageInput) {
    const file = imageInput;
    var pattern = /image-*/;

    if (!file.type.match(pattern)) {
      return false;
    }

    return true;
  }
};

export default ImgOnly;
