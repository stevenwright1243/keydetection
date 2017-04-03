KeyDetection = function() {
  this.fullInputEntered = [];

  backspaceHandler = (detectionArea) => {
    // check if they are trying to delete everything
    if (window.getSelection().toString() === detectionArea.value) {
      this.fullInputEntered = [];
      detectionArea.value = '';
      console.log(detectionArea.value);
    } else {
      // single backspaces
      this.fullInputEntered.pop();
      // empty the array if the user deletes all of input with single backspaces
      if (detectionArea.value.length === 0) {
        detectionArea.fullInputEntered = [];
      }
      console.log(this.fullInputEntered);
    }
  }

  // FIXME If a user presses ctrl then a, then it will be counted into the array
  // using arrow functions allows me to use this as I go deeper into functions
  this.getSingleInput = (detectionArea) => {
    detectionArea.addEventListener('keydown', (e) => {
      if (e.key.length === 1) {
        this.fullInputEntered.push(e.key);
        console.log(this.fullInputEntered);
      } else if (e.key === 'Backspace') { // consider also checking 'Delete'
        backspaceHandler(detectionArea);
      } else {
        console.error('Key is longer than 1 character');
      }
    });
  };

  // pass 'true' to automatically log the key pressed
  // set detectionArea to 'document' to detect globally
  this.getAnyKey = (detectionArea, log = false) => {
    detectionArea.addEventListener('keydown', (e) => {
      if (log) {
        return console.log(e.key);
      }
      return e.key;
    });
  };

  // Detects if konami code has been entered and calls a callback function if so
  this.konamiCode = (detectionArea = document, cbfunction = null) => {
    code = [];
    detectionArea.addEventListener('keydown', (e) => {

      // reset timeout if user presses a key
      if (typeof konamiTimeout === 'number') {
        clearTimeout(konamiTimeout);
      }

      // add pressed key to array
      code.push(e.key);

      // check if code array is indeed the konami code
      if (code.join(' ') === 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a') {
        console.log('Konami Code engaged');

        // callback function
        if (cbfunction !== null) {
          cbfunction();
        }
      }

      // reset the code array after 5 seconds of no typing
      konamiTimeout = setTimeout(() => {
        code = [];
        // console.log(code);
      }, 5000)
    });
  }
};
