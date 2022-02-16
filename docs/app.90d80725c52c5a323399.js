"use strict";(window.webpackChunk_miscreants_copywork=window.webpackChunk_miscreants_copywork||[]).push([[143],{443:(e,o,t)=>{t.r(o),t.d(o,{default:()=>T});var r=t(311),n=t(748),i=t(804),d=t(793),c=(t(462),t(563)),a=t(802);function s(e,{theme_mode:o}){return{theme_mode:o}}let l=()=>{};l=t(224).D;const u=(0,c.M)([function(e){e.on("@init",v)},function(e){!function(e){e.on("theme_mode.set",s)}(e)},(0,a.x)(["theme_mode"]),l]),p=u;function v(){return{}}function h(e){return"dark"===e?w:f}const f={bodyBackground:"#F5F5F5",bodyForeground:"#4E565C",color1:"#203449",color2:"#708594",color3:"#070C10",color4:"#00A4FA"},w={bodyBackground:"#162736",bodyForeground:"#F5F5F5",headerBackground:"#203449",headerForeground:"#F5F5F5",headerAccountBackground:"#708594",color0:"#162736",color1:"#203449",color2:"#708594",color3:"#070C10",color4:"#00A4FA"},g=(0,n.X$)((function(){return(0,r.tZ)(m,{viewBox:"0 0 32 32",children:(0,r.tZ)("path",{d:"M 16 6 C 14.894531 6 14 6.894531 14 8 C 14 9.105469 14.894531 10 16 10 C 17.105469 10 18 9.105469 18 8 C 18 6.894531 17.105469 6 16 6 Z M 16 14 C 14.894531 14 14 14.894531 14 16 C 14 17.105469 14.894531 18 16 18 C 17.105469 18 18 17.105469 18 16 C 18 14.894531 17.105469 14 16 14 Z M 16 22 C 14.894531 22 14 22.894531 14 24 C 14 25.105469 14.894531 26 16 26 C 17.105469 26 18 25.105469 18 24 C 18 22.894531 17.105469 22 16 22 Z"},void 0)},void 0)})),m=i.ZP.svg`
	cursor: pointer;
	height: 32px;
	width: 32px;

	& path {
		fill: currentColor;
	}

	&:hover {
		background: currentColor;
		border-radius: 32px;

		& path {
			fill: #eee;
		}
	}
`,Z=(0,n.X$)((function({onStartOver:e}){return(0,r.BX)(b,{children:[(0,r.tZ)(k,{children:"copywork"},void 0),(0,r.tZ)(x,{},void 0),(0,r.BX)(C,{children:[(0,r.tZ)(g,{},void 0),(0,r.BX)(y,{children:[(0,r.tZ)(E,{onClick:e,style:{cursor:"pointer"},children:"Clear screen"},void 0),(0,r.BX)(E,{children:["by ",(0,r.tZ)(P,{href:"https://miscreants.co",children:"miscreants"},void 0)]},void 0)]},void 0)]},void 0)]},void 0)})),b=i.ZP.div`
	align-items: center;
	color: #666;
	display: flex;
	padding: 1vw;
	position: relative;
	user-select: none;
`,k=i.ZP.div`
	font-size: 1.25rem;
`,x=i.ZP.div`
	flex-grow: 1;
`,C=i.ZP.div`
	position: relative;
	width: 32px;
`,y=i.ZP.div`
	background: #eee;
	border-radius: 4px;
	display: none;
	filter: drop-shadow(0 1px 1px #000);
	flex-direction: column;
	position: absolute;
	right: 0;
	top: 34px;
	z-index: 100;

	${C}:hover &, ${C}:focus & {
		display: flex;
	}
`,E=i.ZP.div`
	padding: 8px;
	white-space: pre;
`,P=i.ZP.a`
	color: #66f;
`,F=(0,n.X$)((function(){const e=(0,n.sO)(),o=(0,n.sO)(),[t,i]=(0,n.eJ)(void 0);(0,n.d4)(function(e,o,t,r){return()=>{const n=e?e=>{if(!e.target.dataset.editor){const e=document.createRange();e.selectNodeContents(t.current),e.collapse(!1);const o=window.getSelection();o.removeAllRanges(),o.addRange(e)}}:void 0,i=e?B:e=>{B(e);const r=(e.clipboardData||window.clipboardData).getData("Text").replace(/\r/g,"").replace(/\n{1,}/g,"\n\n").trim();r.length<1||(o(r),setTimeout((()=>t.current.focus()),100))},d=e?function(e,o,t){return()=>{const r=o.current.innerText;let n;const i=[];for(let o=0;o<r.length;o++){r[o]!==e[o]?void 0===n&&(n=[o],i.push(n)):void 0!==n&&(n.push(o),n=void 0)}n&&n.push(r.length);const d=Array.from(r);i.forEach((([e,o])=>{d[e]=`<span spellcheck="false">${d[e]}`,d[o-1]=`${d[o-1]||""}</span>`})),t.current.innerHTML=d.join("")}}(e,t,r):void 0;return window.addEventListener("paste",i),window.addEventListener("click",n),window.addEventListener("keyup",d),()=>{window.removeEventListener("paste",i),window.removeEventListener("click",n),window.removeEventListener("keyup",d)}}}(t,i,e,o),[t]);const d=function(e,o){return e?()=>o(void 0):void 0}(t,i);return(0,r.BX)(z,{children:[(0,r.tZ)(Z,{onStartOver:d},void 0),t?(0,r.BX)(X,{children:[(0,r.tZ)(D,{contentEditable:!0,spellCheck:"false",ref:e,"data-editor":!0},void 0),(0,r.tZ)(L,{ref:o},void 0),(0,r.tZ)(_,{children:t},void 0)]},void 0):(0,r.tZ)(A,{children:"Paste something..."},void 0)]},void 0)}));function B(e){e.stopPropagation(),e.preventDefault()}const z=i.ZP.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 8.5in;
	position: relative;
	width: 100%;
`,A=i.ZP.div`
	color: #666;
	flex-grow: 1;
	font-size: 1.5rem;
	padding: 5vw 1vw;
	user-select: none;
	display: flex;
	justify-content: center;
`,X=i.ZP.div`
	height: 100%;
	min-height: 100%;
	position: relative;
`,_=i.ZP.div`
	font-size: 1.5rem;
	left: 0;
	opacity: 0.33;
	padding: 1vw 1vw 25vw 1vw;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	user-select: none;
	white-space: pre-wrap;
	word-break: break-word;
	z-index: 1;
`,D=i.ZP.div`
	font-size: 1.5rem;
	outline: 0;
	padding: 1vw;
	white-space: pre-wrap;
	word-break: break-word;
	left: 0;
	top: 0;
	right: 0;
	position: absolute;
	z-index: 3;
`,L=i.ZP.div`
	color: transparent;
	font-size: 1.5rem;
	left: 0;
	padding: 1vw;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	user-select: none;
	white-space: pre-wrap;
	word-break: break-word;
	z-index: 2;

	& span {
		background: pink;
	}
`;class S extends n.wA{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,o){this.setState({hasError:!0})}render(){const{children:e}=this.props,{hasError:o}=this.state;return t=o,n=(0,r.tZ)($,{},void 0),i=e,t?n:i;var t,n,i}}function $(){return(0,r.tZ)("div",{children:"There was an error loading part of the website"},void 0)}const M=i.vJ`
	* {
		box-sizing: border-box;
		font-family: 'Copse', serif;
	}

  html, body {
	  background: #EEE;
	  height: 100%;
	  margin: 0;
  }`;function T(){(0,n.sY)((0,r.tZ)(O,{},void 0),document.body);const e=document.querySelectorAll('[data-preloader="true"]');[].forEach.call(e,(e=>e.parentNode.removeChild(e)))}function O(){const e=function(){const{theme_mode:e}=p.get();return h(e||(document.querySelector("html").getAttribute("data-preferred-theme")||"light"))}();return(0,r.BX)(i.f6,{theme:e,children:[(0,r.tZ)(M,{},void 0),(0,r.tZ)(d.xf.Provider,{value:p,children:(0,r.tZ)(S,{children:(0,r.tZ)(F,{},void 0)},void 0)},void 0)]},void 0)}}}]);
//# sourceMappingURL=app.90d80725c52c5a323399.js.map