(
    function() {
    var currentInput = [];
    var currentCalculated = null;
    var previousInput = [];
    var numberInputs = getElement(".input:not(.c)");
    var operatorInputs = getElement(".operator");
    var equalsButton = getElement("#equals");
    var resetButton = getElement("#reset");
    var previousViewer = getElement(".previous")[0];
    var currentViewer = getElement(".current")[0];
  
    function onNumberClicked() {
      let value = this.getAttribute("id");
      currentInput.push(value);
      render();
    }
  
    function onOperatorClicked() {
      let value = this.getAttribute("id");
      if (previousInput.length > 0 && currentInput.length < 1)
        currentInput = currentInput.concat(
          roundNum(eval(previousInput.join("")))
        );
      currentInput.push(value);
      render();
    }
  
    function roundNum(num) {
      return Math.round(num * 100) / 100;
    }
    function onEqualClicked() {
      currentCalculated = eval(currentInput.join(""));
      currentCalculated = roundNum(currentCalculated);
  
      previousInput = currentInput.splice(0);
      currentInput = [];
      render();
    }
  
    function onResetClicked() {
      currentInput = [];
      previousInput = [];
      render();
    }
  
    function getElement(element) {
      return element.charAt(0) === "#"
        ? document.querySelector(element)
        : document.querySelectorAll(element);
    }
  
    function render() {
      function renderPrevious() {
        previousViewer.innerHTML = previousInput.join("");
      }
      function renderCurrent() {
        const inputMapping = {
          "/": "÷",
          "*": "×"
        };
        currentViewer.innerHTML = "";
        if (currentCalculated==null) {
          currentInput.forEach(e => {
            if (["/", "*", "-", "+"].includes(e)) {
              let spanNumber = document.createElement("span");
              spanNumber.className = "sign";
              spanNumber.innerHTML = inputMapping[e] || e;
              currentViewer.appendChild(spanNumber);
            } else {
              let spanNumber = document.createElement("span");
              spanNumber.innerHTML = inputMapping[e] || e;
              currentViewer.appendChild(spanNumber);
            }
          });
        } else {
          currentViewer.innerHTML = currentCalculated;
          currentCalculated = null;
        }
      }
      renderPrevious();
      renderCurrent();
    }
  
    numberInputs.forEach(e => {
      e.onclick = onNumberClicked;
    });
  
    operatorInputs.forEach(e => {
      e.onclick = onOperatorClicked;
    });
  
    equalsButton.onclick = onEqualClicked;
    resetButton.onclick = onResetClicked;
  })
();
  