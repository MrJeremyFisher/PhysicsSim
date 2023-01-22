$(function() {

    var MQ = MathQuill.getInterface(2);
    var mathquill = MQ.MathField(document.getElementById('mathInput'));
  
    var specialKeys = {
        right: "Right",
        left: "Left",
        Down: "Down",
        Up: "Up",
        bksp: "Backspace",
        tab: "Tab"
    }
  
    // add special keys, but don't override previous keyaction definitions
    Object.keys(specialKeys).forEach(function(key){
        if (!$.keyboard.keyaction[key]) {
          $.keyboard.keyaction[key] = specialKeys[key];
      }
    });
  
      $('#mathInput').click(function(){
        $('#keyboard').getkeyboard().reveal();
    })
  
    $('#keyboard')
      .on('keyboardChange', function(e, keyboard, el) {
        console.log(e.action);
        if (specialKeys[e.action]) {
            mathquill.keystroke(specialKeys[e.action]);
        } else {
            mathquill.cmd(e.action);      
        }
        // $('#mathquill').focus();      
      })
      .keyboard({
        usePreview: false,
        lockInput: true,
        noFocus: true,
        layout: 'custom',
        display: {
            "Down": "&darr;",
          "Up": "&uarr;"
        },
        customLayout: {
          'default': [
            'sin cos tan \u03c0 {b}',
            '7 8 9 + -',
            '4 5 6 * frac',
            '1 2 3 ^ {Up} sqrt',
            '0 . , {left} {Down} {right}',
            '< > = {clear} {a}'
          ]
        },
        useCombos: false
      })
      // activate the typing extension
      .addTyping({
        showTyping: true,
        delay: 250
      });
  
  });
  