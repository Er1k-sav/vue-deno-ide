import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js";

const commandline = {
  template: `
    <input id="terminal" v-on:keyup.enter="command" placeholder="./" className="focus:outline-none h-[80.5%] w-[56%] bg-[#0d0a1b] text-white font-mono rounded absolute top-[14%] left-[28%]" style="padding-left: 1%;
    font: 0.8rem Consolas, monospace;
    text-shadow: 0 0 5px #c8c8c8;
    </input>
  `,
  name: 'terminal',
  data() {
    return {
      commandvalue: ""
    }
  },
  methods: {
    command() {
      const line = document.getElementById("terminal");
      const output = document.getElementById("commandoutput");
      const display = document.getElementById("terminaldisplay");
      const tab = document.getElementById("tab");

      this.commandvalue = line.value;
      line.value = "";
      display.innerHTML = `> ${this.commandvalue}`;

      if (this.commandvalue.slice(0, 11) === "create-file" && this.commandvalue.slice(11, 14) === " ./" && (this.commandvalue.slice(14, this.commandvalue.length).split(".")).length - 1 === 1) {
        const fileName = this.commandvalue.slice(14 , this.commandvalue.length);

        output.innerHTML = `<br>😎Successfully created file!</br> ${this.commandvalue.slice(12, this.commandvalue.length)}`
        fetch(`/create-file/${fileName.split("/").join("-")}`);

        tab.innerHTML = `
          <div id="file1" class="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
            <h1 id="name"> ${fileName} </h1>
          </div>
        `;
      } else if (this.commandvalue.slice(0, 13) === "create-folder" && this.commandvalue.slice(13, 16) === " ./" && (this.commandvalue.slice(16, this.commandvalue.length).split(".")).length - 1 === 0) {
        const folderName = this.commandvalue.slice(16, this.commandvalue.length);

        output.innerHTML = `<br>😎Successfully created folder!</br> ${this.commandvalue.slice(13, this.commandvalue.length)}`
        fetch(`/create-folder/${folderName}`);

        tab.appendChild = `
          <div id="folder1" class="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
            <h1 id="name"> ${folderName} </h1>
          </div>
        `
      } else {  
        output.innerHTML = `<br>❌🧢 Unknown command</br>`
      }
    }
  }
}

const terminal = {
  template: `
    <div className="absolute w-full h-[25%] bottom-[4.9%] bg-[#0d0a1b]">
      <div className="bg-black w-full h-[10%]">
        <div id="dir" className="h-[10%] left-[13%] font-mono text-[1.6vh] absolute text-white w-[40%]"></div>
        <div id="unsaved" className="h-[8%] absolute top-[1%] right-[1%] w-[6%] rounded bg-[#2f4050] text-center font-mono text-[1.6vh] text-white" style="opacity: 0;"></div>
        <div className="absolute w-[3%] h-[10%] left-[1%]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[70%] absolute top-[15%]" style="fill: #2f4050; position: absolute;" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 96V99.56C352 115.3 339.3 128 323.6 128H188.4C172.7 128 159.1 115.3 159.1 99.56V96C159.1 42.98 202.1 0 255.1 0C309 0 352 42.98 352 96zM41.37 105.4C53.87 92.88 74.13 92.88 86.63 105.4L150.6 169.4C151.3 170 151.9 170.7 152.5 171.4C166.8 164.1 182.9 160 199.1 160H312C329.1 160 345.2 164.1 359.5 171.4C360.1 170.7 360.7 170 361.4 169.4L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L406.6 214.6C405.1 215.3 405.3 215.9 404.6 216.5C410.7 228.5 414.6 241.9 415.7 256H480C497.7 256 512 270.3 512 288C512 305.7 497.7 320 480 320H416C416 344.6 410.5 367.8 400.6 388.6C402.7 389.9 404.8 391.5 406.6 393.4L470.6 457.4C483.1 469.9 483.1 490.1 470.6 502.6C458.1 515.1 437.9 515.1 425.4 502.6L362.3 439.6C337.8 461.4 306.5 475.8 272 479.2V240C272 231.2 264.8 224 255.1 224C247.2 224 239.1 231.2 239.1 240V479.2C205.5 475.8 174.2 461.4 149.7 439.6L86.63 502.6C74.13 515.1 53.87 515.1 41.37 502.6C28.88 490.1 28.88 469.9 41.37 457.4L105.4 393.4C107.2 391.5 109.3 389.9 111.4 388.6C101.5 367.8 96 344.6 96 320H32C14.33 320 0 305.7 0 288C0 270.3 14.33 256 32 256H96.3C97.38 241.9 101.3 228.5 107.4 216.5C106.7 215.9 106 215.3 105.4 214.6L41.37 150.6C28.88 138.1 28.88 117.9 41.37 105.4H41.37z"/></svg>
          <h1 className="absolute text-[gray] font-mono text-[2vh] left-[32%] bottom-[-11.8%] left-[40%]">0</h1>
        </div>
        <div className="absolute w-[3%] h-[10%] left-[4%]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-[70%] absolute top-[15%]" style="fill: #2f4050; position: absolute;" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/></svg>
          <h1 className="absolute text-[gray] font-mono text-[2vh] left-[32%] bottom-[-11.8%] left-[40%]">0</h1>
        </div>
        <div id="keylogger" className="absolute font-mono text-white w-[5%] top-0 left-[7%] text-center h-[10%] bg-[#1c1b1b] text-[1.6vh]">null</div>
      </div>
      <div className="w-full h-[90%] absolute top-[10%]">
        <div className="h-[10%] w-full font-mono text-[2vh] text-[gray] pl-[1%]" id="terminaldisplay"> > Command </div>
        <div className="h-[90%] absolute top-[10%] w-full font-mono text-[2vh] text-[gray] pl-[1%]" id="commandoutput">  </div>
      </div>
    </div>
  `
}

const mode = {
  template: `
  <div className="h-[80.5%] w-[3%] bg-[#0d0a1b] text-white font-mono text-center rounded absolute top-[14%] left-[24%]">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="position: absolute; top: 12%; left: 20.5%; height: 73%; fill: #6b7280;"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.372 86.63C-3.124 74.13-3.124 53.87 9.372 41.37C21.87 28.88 42.13 28.88 54.63 41.37L246.6 233.4C259.1 245.9 259.1 266.1 246.6 278.6L54.63 470.6C42.13 483.1 21.87 483.1 9.372 470.6C-3.124 458.1-3.124 437.9 9.372 425.4L178.7 256L9.372 86.63zM544 416C561.7 416 576 430.3 576 448C576 465.7 561.7 480 544 480H256C238.3 480 224 465.7 224 448C224 430.3 238.3 416 256 416H544z"/></svg>
  </div>
  `,
  name: 'mode'
}

const bottom = {
  template: /* html */ `
  <div className="h-8 bg-[#15102D] w-full absolute left-0 bottom-0">
        <mode />
        <commandline />
        <div className="clock h-min-height bg-gray-500 w-min-width absolute right-1 bottom-[3%] text-black font-mono pl-1 pr-1 m-0.5 rounded border-l-8 border-gray-500">
            <div id="clock" className="text-black font-mono pl-1 pr-1"> {{time}} </div>
                <div className="h-full w-1/6 bg-gray-500 origin-top-right skew-x-12 absolute bottom-0 right-full">
            </div>
        </div>
        <div id="selectedfile" className="h-min-height bg-[#5a6d4a] w-min-width absolute right-[7.9%] bottom-[3%] text-black font-mono pl-1 pr-1 m-0.5 rounded border-r-8 border-[#4c4a54]">undefined
            <div className="h-full w-3 bg-[#4c4a54] origin-top-right skew-x-12 absolute bottom-0 left-full"></div>
        </div>
    </div>
`,
  name: 'bottom',
  data() {
    return {
      time: "",
    }
  },
  methods: {
    setTime() {
      this.time = new Date().toLocaleTimeString();
    }
  },
  mounted() {
    setInterval(() => {this.setTime()}, 1000)
  },
  props: {
    msg: String,
  },
  components: {commandline, mode}
};

const editor = {
  template: `
  <div id="map" class="absolute w-[7.5%] h-[75%] right-[0] bg-[#1a1b1a14]">
    <div id="selector" class="absolute hover:bg-[#ffffff2b] bg-[#ffffff08] w-full h-[10%]" style="transition: 300ms;"></div>  
    <div id="content" class="whitespace-pre-line absolute top-[2%] text-[0.2vh] text-white font-mono"></div>
  </div>
  <div className="h-[90%] w-[90%] absolute left-[2.5%] top-[2.5%] bg-transparent text-white font-mono">
    <textarea style="caret-color: coral;" v-on:keyup="save" v-on:keydown.enter="line" id="editor" spellcheck="false" className="h-[75%] pl-[1%] w-[100%] focus:outline-none caret-white z-[2] resize-none bg-transparent text-white font-mono">
      {{this.fileContent}}
    </textarea>
    <div id="currentLine" class="absolute bg-[#13191933] h-[4%] w-full" style="top: 0%;"></div>
    <div id="nums" className="w-[2.5%] z-[2] absolute left-[-2.7%] top-[0] font-verdana text-center text-[#a9a89e]">
      <h1>1</h1>
    </div>
    <div class="bg-[transparent] h-full w-[2.5%] absolute left-[-2.7%] border-r-2 border-[#493a49] top-[-5%]"></div>
  </div>
  <div id="tab" className="h-[23%] w-[70%] absolute top-[71.5%] left-[15%] z-[5] overflow-y-scroll rounded bg-[#8080802b] backdrop-blur-2xl" style="opacity: 0; border: 0.2px solid #302927;">
    <% for (let y = 0; y < files.tree.length; y++) { %>
      <% if (JSON.stringify(files.tree[y].path).replace(/['"]+/g, '').split("-").length == 1) { %>
        <div id="file1" className="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
          <h1 id="name"> <%= JSON.stringify(files.tree[y].path).replace(/['"]+/g, '') %> </h1>
        </div>
      <% } %>
    <% } %>
    <% if (files.tree[0].path.length === 0) { %>
      <div id="file1" className="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
        <h1>No files here <br> <strong>create-file [location][name]</strong> </br> <br> <strong>import a repository localhost:9797/[repo-full-url]</strong></br> <br> <strong> create-folder [location][name] </strong></br>  </br> </h1>
      </div>
    <% } %>
  </div>
  `,
  data() {
    return {
      visible: false,
      file: 0,
      initialContentLength: 0, 
      dir: "",
      lines: 1
    }
  },
  methods: {
    visible() {
      const tab = document.getElementById("tab");
      if (this.visible === true) {
        tab.style.opacity = 0;
      } else {
        tab.style.opacity = 1;
      }
    },
    save() {
      const text = document.getElementById("editor").value.length;
      const unsaved = document.getElementById("unsaved");
      if (this.initialContentLength - text != 0) {
        unsaved.style.opacity = 1;
        unsaved.innerHTML = "UNSAVED";
      } else {
        unsaved.style.opacity = 0;
      }
    },
    line() {
      const nums = document.getElementById("nums");
      this.lines++;
      const h1 = document.createElement("h1");
      h1.id = this.lines;
      h1.innerHTML = this.lines;
      nums.appendChild(h1);
    },
  },
  mounted() {
    
    const CLASSES = {
      marker: '__marker',
      visible: '__marker--visible',
    }
    
    let words = [];
    const xOff = [];

    const createMarker = (content, modifier) => {
      // create a marker for the input
      const marker = document.createElement('div')
      const suggestionContainer = document.createElement("div");
      suggestionContainer.id="suggestionContainer";
      suggestionContainer.className = "bg-[#202420] flex pl-[3%] flex-row w-[94.5%] h-[5%] font-mono text-white";
      suggestionContainer.innerHTML = `
        
      `
      marker.appendChild(suggestionContainer);
      marker.classList.add(CLASSES.marker, `${CLASSES.marker}--${modifier}`);
      return marker;
    }

    /**
     * returns x, y coordinates for absolute positioning of a span within a given text input
     * at a given selection point
     * @param {object} input - the input element to obtain coordinates for
     * @param {number} selectionPoint - the selection point for the input
     */
    const getCursorXY = (input, selectionPoint) => {
      const {
        offsetLeft: inputX,
        offsetTop: inputY,
      } = input
      // create a dummy element that will be a clone of our input
      const div = document.createElement('div')
      // get the computed style of the input and clone it onto the dummy element
      const copyStyle = getComputedStyle(input)
      for (const prop of copyStyle) {
        div.style[prop] = copyStyle[prop]
      }
      // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
      const swap = '.'
      const inputValue = input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value
      // set the div content to that of the textarea up until selection
      const textContent = inputValue.substr(0, selectionPoint)
      // set the text content of the dummy element div
      div.textContent = textContent
      if (input.tagName === 'TEXTAREA') div.style.height = 'auto'
      // if a single line input then the div needs to be single line and not break out like a text area
      if (input.tagName === 'INPUT') div.style.width = 'auto'
      // create a marker element to obtain caret position
      const span = document.createElement('span')
      // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
      span.textContent = inputValue.substr(selectionPoint) || '.'
      // append the span marker to the div
      div.appendChild(span)
      // append the dummy element to the body
      document.body.appendChild(div)
      // get the marker position, this is the caret position top and left relative to the input
      const { offsetLeft: spanX, offsetTop: spanY } = span
      // lastly, remove that dummy element
      // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
      document.body.removeChild(div)
      // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
      return {
        x: inputX + spanX,
        y: inputY + spanY,
      }
    }

    /**
     * shows a position marker that highlights where the caret is
     * @param {object} e - the input or click event that has been fired
     */
    const showPositionMarker = e => {
      // grab the input element
      const { currentTarget: input } = e
      // create a function that will handle clicking off of the input and hide the marker
      const processClick = evt => {
        if (e !== evt && evt.target !== e.target) {
          toggleMarker(e)
        }
      }
      // create a function that will toggle the showing of the marker
      const toggleMarker = (e) => {
        input.__IS_SHOWING_MARKER = !input.__IS_SHOWING_MARKER

        if (input.__IS_SHOWING_MARKER && !input.__MARKER) {
          // assign a created marker to input
          input.__MARKER = createMarker()
          // append it to the body
          document.body.appendChild(input.__MARKER)
          document.addEventListener('click', processClick)
        } else {
          document.body.removeChild(input.__MARKER)
          document.removeEventListener('click', processClick)
          input.__MARKER = null
        }
      }
      // if the marker isn't showing, show it
      if (!input.__IS_SHOWING_MARKER) toggleMarker()
      // if the marker is showing, update its position
      if (input.__IS_SHOWING_MARKER) {
        // grab the properties from the input that we are interested in
        const {
          offsetLeft,
          offsetTop,
          offsetHeight,
          offsetWidth,
          scrollLeft,
          scrollTop,
          selectionEnd,
        } = input
        // get style property values that we are interested in
        const { lineHeight, paddingRight } = getComputedStyle(input)
        // get the caret X and Y from our helper function
        const { x, y } = getCursorXY(input, selectionEnd)
        // set the marker positioning
        // for the left positioning we ensure that the maximum left position is the width of the input minus the right padding using Math.min
        // we also account for current scroll position of the input
        const newLeft = Math.min(
          x - scrollLeft,
          (offsetLeft + offsetWidth) - parseInt(paddingRight, 10)
        )
        // for the top positioning we ensure that the maximum top position is the height of the input minus line height
        // we also account for current scroll position of the input
        const newTop = Math.min(
          y - scrollTop,
          (offsetTop + offsetHeight) - parseInt(lineHeight, 10)
        )
        input.__MARKER.setAttribute('style', `left: ${newLeft + 30}px; top: ${newTop + 60 + 12*words.length}px`);
        xOff.unshift(x);
        console.log(xOff);
        if (e.keyCode === 13) {
          document.getElementById("currentLine").style = `transition: 200ms; top: ${newTop + 21}px`;
        } else if (e.keyCode === 8 && x <= Math.min(...xOff)) {
          document.getElementById("currentLine").style = `transition: 200ms; top: ${newTop - 27.5}px`;
        }
      }
    }

    /**
     * shows a position marker for where a user has selected input content
     * @param {object} e - mouseup event for text selection
     */
    

    /**
     * shows a custom UI based on whether a user has typed a certain character, in this case #(keycode 35 on keypress event)
     * for this demo, just allow user to select from a predetermined list of animals
     * @param {object} e - event fired for keypress, keydown or keyup
     */

    // grab instance of different inputs

    const getPositionTextArea = document.querySelector('#editor')
    // bind event listeners to the different text inputs
    getPositionTextArea.addEventListener('keydown', showPositionMarker)
    getPositionTextArea.addEventListener('keydown', showPositionMarker)
    getPositionTextArea.addEventListener('keydown', (e) => {
      if (e.key === "Backspace" || e.key === "Enter" || "qwertyuioplkjhgfdsazxcvbnm".includes(e.key.toLowerCase()) == false ) {
        document.querySelector(".__marker").style = "opacity: 0; transition: 500ms;";
        words = [];
      } 
    });
    const vocabulary = [
      {
        id: "boolean",
        img: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[6%] top-[8%] fill-[gray]" style="fill: #8feb7e;" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 352C138.1 352 96 309 96 256C96 202.1 138.1 160 192 160C245 160 288 202.1 288 256C288 309 245 352 192 352zM384 448H192C85.96 448 0 362 0 256C0 149.1 85.96 64 192 64H384C490 64 576 149.1 576 256C576 362 490 448 384 448zM384 128H192C121.3 128 64 185.3 64 256C64 326.7 121.3 384 192 384H384C454.7 384 512 326.7 512 256C512 185.3 454.7 128 384 128z"/></svg>',
        words: ["true", "false"]
      }, 
      {
        id: "functions",
        img: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[6%] top-[8%] fill-[gray]" style="fill: #8feb7e;" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M507.6 122.8c-2.904-12.09-18.25-16.13-27.04-7.338l-76.55 76.56l-83.1-.0002l0-83.1l76.55-76.56c8.791-8.789 4.75-24.14-7.336-27.04c-23.69-5.693-49.34-6.111-75.92 .2484c-61.45 14.7-109.4 66.9-119.2 129.3C189.8 160.8 192.3 186.7 200.1 210.1l-178.1 178.1c-28.12 28.12-28.12 73.69 0 101.8C35.16 504.1 53.56 512 71.1 512s36.84-7.031 50.91-21.09l178.1-178.1c23.46 7.736 49.31 10.24 76.17 6.004c62.41-9.84 114.6-57.8 129.3-119.2C513.7 172.1 513.3 146.5 507.6 122.8zM80 456c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24s24 10.74 24 24C104 445.3 93.25 456 80 456z"/></svg>',
        words: ["pop", "push", "sort", "reverse", "shift", "toString", "unshift", "concat", "join", "slice",
                "join", "slice", "splice", "indexOf", "lastIndexOf", "alert", "confirm", "log", "write", "isNaN",
                "Number", "eval", "encodeURI", "decodeURI", "decodeURIComponent", "parseInt", "parseFloat", "isFinite",
                "match", "search", "charAt", "charCodeAt", "split", "substr", "replace", "random", "round", "pow",
                "exp", "max", "min", "abs", "sqrt", "cos", "sin", "tan", "ceil", "getDate", "getDay", "getFullYear", "getHours",
                "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getUTCDate", "setDate",
                "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime",
                "setUTCDate", "appendChild", "removeChild", "replaceChild", "cloneNode", "isEqualNode", "isSameNode",
                "getAttribute", "hasAttribute", "removeAttribute", "setAttribute", "getElementsByTagName", "getElementById",
                "querySelector", ""]
      },
      {
        id: "variables",
        img: `<svg xmlns="http://www.w3.org/2000/svg" class="w-[6%] top-[8%] fill-[gray]" style="fill: #8feb7e;" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M48 192h352c17.69 0 32-14.32 32-32s-14.31-31.1-32-31.1h-352c-17.69 0-32 14.31-32 31.1S30.31 192 48 192zM400 320h-352c-17.69 0-32 14.31-32 31.1s14.31 32 32 32h352c17.69 0 32-14.32 32-32S417.7 320 400 320z"/></svg>`,
        words: ["var", "let", "const"]
      }, 
      {
        id: "impexp", 
        img: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[6%] top-[8%] fill-[gray]" style="fill: #8feb7e;" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M48 192h352c17.69 0 32-14.32 32-32s-14.31-31.1-32-31.1h-352c-17.69 0-32 14.31-32 31.1S30.31 192 48 192zM400 320h-352c-17.69 0-32 14.31-32 31.1s14.31 32 32 32h352c17.69 0 32-14.32 32-32S417.7 320 400 320z"/></svg>',
        words: ["import", "export"]
      }
    ];
    let word = "";
    getPositionTextArea.addEventListener("keyup", (e) => {
      if (e.keyCode == 32 || e.keyCode == 13 || e.key.toUpperCase() == e.key.toLowerCase()) {
        word = "";
        words = [];
      }
      if (e.keyCode == 8 && e.ctrlKey) {
        word = ""; 
        words = [];
      }
      if ("qwertyuioplkjhgfdsazxcvbnm".includes(e.key.toLowerCase()) && e.key.length == 1) {
        word = word + e.key;
      }
      
      for (let i = 0; i < 3; i++) {
        for (let b = 0; b < vocabulary[i].words.length; b++) {
          if (vocabulary[i].words[b].includes(word) && vocabulary[i].words[b].indexOf(word) == 0) {
            if (words.includes(vocabulary[i].words[b] + '$' + vocabulary[i].img) == false && words.length <= 5) {
              words.unshift(vocabulary[i].words[b] + '$' + vocabulary[i].img);
              document.querySelector(".__marker").innerHTML = "";
              for (let k = 0; i < words.length; k++) {
                document.querySelector(".__marker").innerHTML = document.querySelector(".__marker").innerHTML + `
                  <div id="suggestionContainer" class="bg-[#202420] flex pl-[3%] flex-row w-[94.5%] h-[5%] font-mono text-white">
                    ${words[k].split("$")[1]}
                    <div id="suggestion" class="bg-[#202420] w-[90%] relative left-[10%] h-full font-mono text-white">${words[k].split("$")[0]}</div>
                  </div>
                `;
                document.getElementById("suggestionContainer").style = "transition: 0ms;";
              }

            } 
          }
        }
      }
    });

    const tab = document.getElementById("tab");
    const logger = document.getElementById("keylogger");
    const files = tab.children;
    let index = 0;
    this.initialContentLength = document.getElementById("editor").value.length;
    document.addEventListener("keyup", async (e) => {
      if (this.visible === true && e.keyCode === 66 && e.ctrlKey) {
        logger.innerHTML = "Ctrl + B"
        tab.style.opacity = 0;
        this.visible = false;
      } else if (this.visible === false && e.keyCode === 66 && e.ctrlKey) {
        logger.innerHTML = "Ctrl + B"
        tab.style.opacity = 1;
        this.visible = true;
      } else if (e.keyCode === 40 && index < files.length && this.visible === true) {
        logger.innerHTML = "Arrow Down"
        index++;
        files[index].style = "background-color: #646d5c";
        if (index != 0) {
          files[index - 1].style = "background-color: #8080802b";
        }
      } else if (e.keyCode === 38 && index >= 0 && this.visible === true) {
        logger.innerHTML = "Arrow Up"
        index--;
        files[index].style = "background-color: #646d5c";
        files[index + 1].style = "background-color: #8080802b";
        
      } else if (this.visible === true && e.keyCode === 37) {
        logger.innerHTML = "Ctrl + Arrow Left";
        this.dir = this.dir.split(">").slice(0, -1).join(">");
        document.getElementById("dir").innerHTML = this.dir;
        let content = "";
        fetch(`/getfiles`).then(data => data.json()).then(response => {
          for (let i = 0; i < response.tree.length; i++) {
            if (JSON.stringify(response.tree[i].path).replace(/['"]+/g, '').split("-").length == this.dir.split(">").length) {
              content = content + `
              <div id="file1" class="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
                <h1 id="name"> ${JSON.stringify(response.tree[i].path.split("-").slice(this.dir.split(">".length - 1)).join("")).replace(/['"]+/g, '')} </h1>
              </div>
              `
              document.getElementById("tab").innerHTML = content;
            }
            
          }
        });
      } else if (this.visible === true && e.keyCode === 13) {
        logger.innerHTML = "Enter"
        this.dir = this.dir + "> " + files[index].children[0].innerHTML;
        document.getElementById("dir").innerHTML = this.dir;

        if (files[index].children[0].innerHTML.includes(".")) {
          fetch(`/${files[index].children[0].innerHTML.slice(1)}`).then(data => data.json()).then(response => this.fileContent = response.filetext)
          document.getElementById("selectedfile").innerHTML = `${files[index].children[0].innerHTML} <div class="h-full w-3 bg-[#4c4a54] origin-top-right skew-x-12 absolute bottom-0 left-full"></div>` ;
          this.initialContentLength = this.fileContent;
          tab.innerHTML = `
          <div id="file1" class="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
            <h1 id="name"> This is a file. </h1>
          </div>
          `
        } else {
          await fetch(`/openfolder/${files[index].children[0].innerHTML.slice(1)}`).then(data => data.text()).then((response) => {
            const resArr = `${response}`.split(",");
            tab.innerHTML = "";
            for (let i = 0; i < resArr.length; i++) {
              tab.innerHTML = tab.innerHTML + `
                <div id="file1" class="m-[0.5%] rounded font-mono text-white text-center bg-[#8080802b]" style="">
                
                  <h1 id="name"> ${resArr[i].replace(/['"]+/g, '')} </h1>
                </div>
              `;
            }
          })
        }
      } else if (e.keyCode === 81 && e.ctrlKey) {
        logger.innerHTML = "Ctrl + Q"
        fetch(`/save-file/${files[index].children[0].innerHTML.slice(1, -1)}/${btoa(document.getElementById("editor").value)}`)
      }

      document.getElementById("editor").addEventListener("keydown", () => {
        let value = document.getElementById("editor").value;
        document.getElementById("content").innerHTML = value;
      })
      
    })
  }
}

const App = {
  template: /* html */ `
  <div id="app" className="bg-[#34303F] h-[100%] w-[100%] absolute">   
    <editor />
    <tab />
    <terminal />
    <bottom />
  </div>
`,
  name: 'app',
  components: {bottom, editor,terminal},
};

const vno396625 = Vue.createApp(App)
vno396625.component("bottom", bottom)

vno396625.mount("#app")