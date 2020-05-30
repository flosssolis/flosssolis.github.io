
let button = calc.getElementsByClassName("button");
let display = document.getElementById("display");
let str = "";

for (var i = 0; i < button.length; i++) {
    addEvent(button[i]);               
  }

  function addEvent(button) {
    button.addEventListener('click', event);
    function event() {
      let type = button.getAttribute('data-type');  
      if (type == '=') {
        str = eval(str);
        display.value = str;
        return;
      } else if (type == 'C') {
        str = '';
      } else {
        str += type;
      }
      display.value = str;
    }
  }