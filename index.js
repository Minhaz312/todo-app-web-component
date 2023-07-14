class CsButton extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        const comp = document.createElement("button")
        comp.innerHTML = this.innerHTML
        this.shadow.append(this.#createStyle())
        this.shadow.append(comp)
    }
    #createStyle() {
        const style = document.createElement("style");
        style.innerText = `
        button {
            display: inline-block;
            padding: 14px 24px;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border: none;
            background-color: #2955A8;
            color: #FFF;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor:pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #092A6A;
          }          
        `
        return style;
    }
}

const template = document.createElement("template")
template.innerHTML = `
        <style>
            div {
                font-family:arial;
                display:flex;
                align-items:center;
                margin-bottom:1rem;
                padding:1.25rem;
                justify-content:between;
                background:rgb(250,250,250);
                border:1px solid transparent;
                transition: 0.33s;
                font-family: 'Poppins', sans-serif;
            }
            div:hover {
                border:10px solid #287098 90%;
                box-shadow: 0.1px 0.1px 10px rgb(180,200,200);
            }
            span{
                width:15%;
            }
            span:nth-child(1){
                width:300px;
            }
            span:nth-child(2){
                width:150px;
            }
            span:nth-child(3){
                width:100px;
            }          
        </style>
        <div>
            <span>
                <slot name="t-name"></slot>
            </span>
            <span>
                <slot name="t-date"></slot>
            </span>
            <span>
                <slot name="t-status"></slot>
            </span>
            <span>
                <slot name="t-action"></slot>
            </span>
        </div>
    `
class TodoItem extends HTMLElement {
    constructor () {
        super()
        this.shadow = this.attachShadow({mode:"open"})
        this.shadow.append(template.content.cloneNode(true))
        this.done = this.shadow.querySelector("div");
    }
    connectedCallback(){
        // this.shadow.append(this.#createStyle())
        // console.log(this.done)
    }
    static get observedAttributes() {
        return ["done"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
          //   console.log(name,oldValue,newValue)
          if(name==="done"&&newValue=="true"){
              console.log(newValue)
            this.done.style.background = 'rgb(232,232,232)'
            this.done.style.margin = "10px 0"
            this.done.style.border = "2px solid rgb(0,0,0,0.1)"
        }
      }
    #createStyle(){
        const style = document.createElement("style")
        style.innerHTML = `
            div{
                display:flex;
                justify-content:between;
            }
        `
        return style;
    }
}

customElements.define("cs-button",CsButton)
customElements.define("todo-item",TodoItem)