function createStyleElement(cssCode: string): HTMLStyleElement {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = cssCode;
  return styleElement;
}

const cssCode = `
  .beacon{
    position:absolute;
    border-color: rgba(219, 40, 40, .75);
    border-style: solid;
    border-width: 1px;
    height:1em;
    width:1em;
    border-radius:50%;
    -webkit-animation: grow .4s 1 linear;
    animation: grow .4s 1 linear;
  }
  .beacon:before{
    position:absolute;
    content:"";
    height:1em;
    width:1em;
    left:0;
    top:0;
    background-color:transparent;
    border-radius:50%;
    box-shadow:0px 0px 2px 2px #DB2828;
    -webkit-animation:active 2s infinite linear;
    animation:active 2s infinite linear;
  }

  @-webkit-keyframes grow {
    0% {
      -webkit-transform: scale(.1);
    }
    
    100% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes grow {
    0% {
      transform: scale(.1);
    }
    
    100% {
      transform: scale(1);
    }
  }

  @-webkit-keyframes active{
    0%{
      -webkit-transform:scale(.1);
      opacity:1;
    }
    70%{
      -webkit-transform:scale(2.5);
      opacity:0;
    }
    100%{
      opacity:0;
    }
  }

  @keyframes active{
    0%{
      transform:scale(.1);
      opacity:1;
    }
    70%{
      transform:scale(2.5);
      opacity:0;
    }
    100%{
      opacity:0;
    }
  }
`;


const styleElement = createStyleElement(cssCode);
export default styleElement;