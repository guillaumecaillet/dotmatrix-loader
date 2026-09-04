var v=!1;function M(){if(v||typeof document>"u")return;v=!0;let t=document.createElement("style");t.setAttribute("data-dotmatrix-loader",""),t.textContent=`
.dl-loader { display: inline-block; }
.dl-dot {
  animation: dl-blink var(--dl-duration, 1.2s) linear infinite;
}
.dl-loader.dl-paused .dl-dot {
  animation-play-state: paused;
}
@keyframes dl-blink {
  0%, 49% { fill: var(--dl-off); opacity: var(--dl-min-opacity, 1); }
  50%, 99% { fill: var(--dl-on); opacity: 1; }
  100% { fill: var(--dl-off); opacity: var(--dl-min-opacity, 1); }
}
`,document.head.appendChild(t)}var k=(t,e,n)=>{let r=(n-1)/2;return Math.hypot(t-r,e-r)},I=(t,e,n)=>{let r=(n-1)/2;return(Math.atan2(t-r,e-r)+Math.PI)/(2*Math.PI)},L=(t,e,n)=>{let r=Math.sin((t*n+e+1)*12.9898)*43758.5453;return r-Math.floor(r)},m={pulse:(t,e,n)=>k(t,e,n),wave:(t,e)=>t+e,rowSweep:t=>t,columnSweep:(t,e)=>e,orbit:(t,e,n)=>I(t,e,n),checker:(t,e)=>(t+e)%2,heartbeat:(t,e,n)=>k(t,e,n)<.8?0:null,sparkle:(t,e,n)=>L(t,e,n)};var P="http://www.w3.org/2000/svg",q=0;function N(t,e){let n=[];for(let a=0;a<t;a++)for(let d=0;d<t;d++)n.push(e(a,d,t));let r=n.filter(a=>a!=null),l=Math.min(...r),u=Math.max(...r)-l||1;return n.map(a=>a==null?null:(a-l)/u)}function O(t,e={}){M();let{pattern:n="pulse",size:r=5,dotSize:l=6,gap:c=4,duration:u=1.2,colorOn:a="#111111",colorOff:d="#e2e2e2",minOpacity:$=.2,shape:h="circle"}=e,C=`dl-${++q}`,o=document.createElementNS(P,"svg");o.setAttribute("class","dl-loader"),o.dataset.dlId=C;let p=r*l+(r-1)*c;o.setAttribute("viewBox",`0 0 ${p} ${p}`),o.setAttribute("width",String(p)),o.setAttribute("height",String(p)),o.style.setProperty("--dl-on",a),o.style.setProperty("--dl-off",d),o.style.setProperty("--dl-duration",`${u}s`),o.style.setProperty("--dl-min-opacity",String($));function S(s){o.replaceChildren();let b=typeof s=="function"?s:m[s];if(!b)throw new Error(`dotmatrix-loader: unknown pattern "${s}"`);let E=N(r,b),g=0;for(let f=0;f<r;f++)for(let y=0;y<r;y++,g++){let w=y*(l+c)+l/2,x=f*(l+c)+l/2,i=document.createElementNS(P,h==="square"?"rect":"circle");i.setAttribute("class","dl-dot"),h==="square"?(i.setAttribute("x",String(w-l/2)),i.setAttribute("y",String(x-l/2)),i.setAttribute("width",String(l)),i.setAttribute("height",String(l))):(i.setAttribute("cx",String(w)),i.setAttribute("cy",String(x)),i.setAttribute("r",String(l/2)));let A=E[g];A===null?(i.dataset.static="",i.style.animation="none",i.style.fill="var(--dl-off)",i.style.opacity="var(--dl-min-opacity)"):i.style.animationDelay=`${A*u}s`,o.appendChild(i)}}if(S(n),t){let s=typeof t=="string"?document.querySelector(t):t;s&&s.appendChild(o)}return{el:o,start(){o.classList.remove("dl-paused")},stop(){o.classList.add("dl-paused")},setPattern(s){S(s)},destroy(){o.remove()}}}export{O as createLoader,m as patterns};
//# sourceMappingURL=dotmatrix-loader.esm.js.map
