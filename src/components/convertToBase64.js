const getBase64 = (file) => {

    // Returns a promise which gets resolved or rejected based on the reader events
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Sets up even listeners BEFORE you call reader.readAsDataURL
      reader.onload = function () {
        const result = reader.result
        return resolve(result);
      };

      reader.onerror = function (error) {
        return reject(error);
      };
      // Calls reader function
      reader.readAsDataURL(file);
    })
  }
  export default getBase64