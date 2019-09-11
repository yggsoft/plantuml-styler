import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  encode64(data) {
    var r = "";
    for (var i = 0; i < data.length; i += 3) {
      if (i + 2 == data.length) {
        r += this.append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
      } else if (i + 1 == data.length) {
        r += this.append3bytes(data.charCodeAt(i), 0, 0);
      } else {
        r += this.append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1),
          data.charCodeAt(i + 2));
      }
    }
    return r;
  }

  append3bytes(b1, b2, b3) {
    var c1 = b1 >> 2;
    var c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    var c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    var c4 = b3 & 0x3F;
    var r = "";
    r += this.encode6bit(c1 & 0x3F);
    r += this.encode6bit(c2 & 0x3F);
    r += this.encode6bit(c3 & 0x3F);
    r += this.encode6bit(c4 & 0x3F);
    return r;
  }

  encode6bit(b) {
    if (b < 10) {
      return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
      return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
      return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b == 0) {
      return '-';
    }
    if (b == 1) {
      return '_';
    }
    return '?';
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  removeStyling(data) {
    data = data.replace('<svg ', '<svg id="svgTag" ')
    data = this.replaceAll(data, 'fill="#FEFECE"', ' ');
    data = this.replaceAll(data, 'fill="#000000"', ' ');
    data = this.replaceAll(data, 'fill="#A80036"', ' ');
    data = this.replaceAll(data, ' style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 5.0,5.0;"', ' class="dashed"');
    data = this.replaceAll(data, ' style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 2.0,2.0;"', ' class="dotted"');
    data = this.replaceAll(data, ' style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 1.0,4.0;"', ' class="skipped"');
    data = this.replaceAll(data, ' style="stroke: #A80036; stroke-width: 1.5;"', ' ');
    data = this.replaceAll(data, ' style="stroke: #A80036; stroke-width: 1.0;"', ' class="note"');
    data = this.replaceAll(data, ' style="stroke: #A80036; stroke-width: 2.0;"', ' class="actor"');
    return data;
  }


}