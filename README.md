# keydetection

### Usage

```js
keyDetection = new KeyDetection(); // invoke
keyDetection.getSingleInput(area); // get usable keys like abc , and whitespace, etc
keyDetection.getAnyKey(area); // get any key like ctrl or alt as well as the keys from getSingleInput
keyDetection.konamiCode(area, cbfunction); // checks for konami code, supply a function that occurs if konami code is entered
```
