import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

@font-face {font-family: "Digital System"; src: url("//db.onlinewebfonts.com/t/0b410990500bfc45409d16ad0b433a00.eot"); src: url("//db.onlinewebfonts.com/t/0b410990500bfc45409d16ad0b433a00.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/0b410990500bfc45409d16ad0b433a00.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/0b410990500bfc45409d16ad0b433a00.woff") format("woff"), url("//db.onlinewebfonts.com/t/0b410990500bfc45409d16ad0b433a00.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/0b410990500bfc45409d16ad0b433a00.svg#Digital System") format("svg"); }
@font-face {font-family: "Digitalt"; src: url("//db.onlinewebfonts.com/t/8a5d150d70ddee86408dd6a2c693b5c9.eot"); src: url("//db.onlinewebfonts.com/t/8a5d150d70ddee86408dd6a2c693b5c9.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/8a5d150d70ddee86408dd6a2c693b5c9.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/8a5d150d70ddee86408dd6a2c693b5c9.woff") format("woff"), url("//db.onlinewebfonts.com/t/8a5d150d70ddee86408dd6a2c693b5c9.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/8a5d150d70ddee86408dd6a2c693b5c9.svg#Digitalt") format("svg"); }

    #root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    color: white;
    font-family: 'Montserrat', sans-serif;
    }

    html {
        margin: 0;
        padding:0;
    }

    body {
        background-color: black;
        background-size: 100%;
        background-position: center;
    }

    .glow-on-hover {
      height: 50px;
      border: none;
      outline: none;
      cursor: pointer;
      position: relative;
      z-index: 0;
      border-radius: 10px;
  }
  
  .glow-on-hover:before {
      content: '';
      background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
      position: absolute;
      top: -2px;
      left:-2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      border-radius: 10px;
  }
  
  .glow-on-hover:active {
      color: #000
  }
  
  .glow-on-hover:active:after {
      background: transparent;
  }
  
  .glow-on-hover:hover:before {
      opacity: 1;
  }
  
  .glow-on-hover:after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: black;
      left: 0;
      top: 0;
      border-radius: 10px;
  }
  
  @keyframes glowing {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
  }
    `;
