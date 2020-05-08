'use strict';(function(g){"object"==typeof exports&&"object"==typeof module?g(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],g):g(CodeMirror)})(function(g){function q(a,b){this.cm=a;this.options=b;this.widget=null;this.tick=this.debounce=0;this.startPos=this.cm.getCursor("start");this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length;var c=this;a.on("cursorActivity",this.activityFunc=function(){c.cursorActivity()})}
function C(a,b){function c(a,c){var e="string"!=typeof c?function(a){return c(a,b)}:d.hasOwnProperty(c)?d[c]:c;g[a]=e}var d={Up:function(){b.moveFocus(-1)},Down:function(){b.moveFocus(1)},PageUp:function(){b.moveFocus(-b.menuSize()+1,!0)},PageDown:function(){b.moveFocus(b.menuSize()-1,!0)},Home:function(){b.setFocus(0)},End:function(){b.setFocus(b.length-1)},Enter:b.pick,Tab:b.pick,Esc:b.close};/Mac/.test(navigator.platform)&&(d["Ctrl-P"]=function(){b.moveFocus(-1)},d["Ctrl-N"]=function(){b.moveFocus(1)});
var e=a.options.customKeys,g=e?{}:d;if(e)for(var f in e)e.hasOwnProperty(f)&&c(f,e[f]);if(a=a.options.extraKeys)for(f in a)a.hasOwnProperty(f)&&c(f,a[f]);return g}function A(a,b){for(;b&&b!=a;){if("LI"===b.nodeName.toUpperCase()&&b.parentNode==a)return b;b=b.parentNode}}function r(a,b){this.completion=a;this.data=b;this.picked=!1;var c=this,d=a.cm,e=d.getInputField().ownerDocument,p=e.defaultView||e.parentWindow,f=this.hints=e.createElement("ul");f.className="CodeMirror-hints "+a.cm.options.theme;
this.selectedHint=b.selectedHint||0;for(var v=b.list,h=0;h<v.length;++h){var n=f.appendChild(e.createElement("li")),l=v[h],k="CodeMirror-hint"+(h!=this.selectedHint?"":" CodeMirror-hint-active");null!=l.className&&(k=l.className+" "+k);n.className=k;l.render?l.render(n,b,l):n.appendChild(e.createTextNode(l.displayText||("string"==typeof l?l:l.text)));n.hintId=h}k=a.options.container||e.body;h=d.cursorCoords(a.options.alignWithWord?b.from:null);var w=h.left,x=h.bottom,q=!0,m=n=0;if(k!==e.body){l=-1!==
["absolute","relative","fixed"].indexOf(p.getComputedStyle(k).position)?k:k.offsetParent;var y=l.getBoundingClientRect();m=e.body.getBoundingClientRect();n=y.left-m.left-l.scrollLeft;m=y.top-m.top-l.scrollTop}f.style.left=w-n+"px";f.style.top=x-m+"px";l=p.innerWidth||Math.max(e.body.offsetWidth,e.documentElement.offsetWidth);var z=p.innerHeight||Math.max(e.body.offsetHeight,e.documentElement.offsetHeight);k.appendChild(f);k=f.getBoundingClientRect();var t=k.bottom-z;y=f.scrollHeight>f.clientHeight+
1;var r=d.getScrollInfo();0<t&&(t=k.bottom-k.top,0<h.top-(h.bottom-k.top)-t?(f.style.top=(x=h.top-t-m)+"px",q=!1):t>z&&(f.style.height=z-5+"px",f.style.top=(x=h.bottom-k.top-m)+"px",m=d.getCursor(),b.from.ch!=m.ch&&(h=d.cursorCoords(m),f.style.left=(w=h.left-n)+"px",k=f.getBoundingClientRect())));m=k.right-l;0<m&&(k.right-k.left>l&&(f.style.width=l-5+"px",m-=k.right-k.left-l),f.style.left=(w=h.left-m-n)+"px");if(y)for(h=f.firstChild;h;h=h.nextSibling)h.style.paddingRight=d.display.nativeBarWidth+
"px";d.addKeyMap(this.keyMap=C(a,{moveFocus:function(a,b){c.changeActive(c.selectedHint+a,b)},setFocus:function(a){c.changeActive(a)},menuSize:function(){return c.screenAmount()},length:v.length,close:function(){a.close()},pick:function(){c.pick()},data:b}));if(a.options.closeOnUnfocus){var u;d.on("blur",this.onBlur=function(){u=setTimeout(function(){a.close()},100)});d.on("focus",this.onFocus=function(){clearTimeout(u)})}d.on("scroll",this.onScroll=function(){var b=d.getScrollInfo(),c=d.getWrapperElement().getBoundingClientRect(),
g=x+r.top-b.top,h=g-(p.pageYOffset||(e.documentElement||e.body).scrollTop);q||(h+=f.offsetHeight);if(h<=c.top||h>=c.bottom)return a.close();f.style.top=g+"px";f.style.left=w+r.left-b.left+"px"});g.on(f,"dblclick",function(a){(a=A(f,a.target||a.srcElement))&&null!=a.hintId&&(c.changeActive(a.hintId),c.pick())});g.on(f,"click",function(b){(b=A(f,b.target||b.srcElement))&&null!=b.hintId&&(c.changeActive(b.hintId),a.options.completeOnSingleClick&&c.pick())});g.on(f,"mousedown",function(){setTimeout(function(){d.focus()},
20)});this.scrollToActive();g.signal(b,"select",v[this.selectedHint],f.childNodes[this.selectedHint]);return!0}function D(a,b){if(!a.somethingSelected())return b;a=[];for(var c=0;c<b.length;c++)b[c].supportsSelection&&a.push(b[c]);return a}function u(a,b,c,d){a.async?a(b,d,c):(a=a(b,c))&&a.then?a.then(d):d(a)}g.showHint=function(a,b,c){if(!b)return a.showHint(c);c&&c.async&&(b.async=!0);b={hint:b};if(c)for(var d in c)b[d]=c[d];return a.showHint(b)};g.defineExtension("showHint",function(a){var b=this.getCursor("start"),
c=this.options.hintOptions,d={},e;for(e in B)d[e]=B[e];if(c)for(e in c)void 0!==c[e]&&(d[e]=c[e]);if(a)for(e in a)void 0!==a[e]&&(d[e]=a[e]);d.hint.resolve&&(d.hint=d.hint.resolve(this,b));a=d;b=this.listSelections();if(!(1<b.length)){if(this.somethingSelected()){if(!a.hint.supportsSelection)return;for(e=0;e<b.length;e++)if(b[e].head.line!=b[e].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();b=this.state.completionActive=new q(this,a);b.options.hint&&(g.signal(this,
"startCompletion",this),b.update(!0))}});g.defineExtension("closeHint",function(){this.state.completionActive&&this.state.completionActive.close()});var E=window.requestAnimationFrame||function(a){return setTimeout(a,1E3/60)},F=window.cancelAnimationFrame||clearTimeout;q.prototype={close:function(){this.active()&&(this.tick=this.cm.state.completionActive=null,this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.data&&g.signal(this.data,"close"),this.widget&&this.widget.close(),g.signal(this.cm,
"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(a,b){var c=a.list[b],d=this;this.cm.operation(function(){c.hint?c.hint(d.cm,a,c):d.cm.replaceRange("string"==typeof c?c:c.text,c.from||a.from,c.to||a.to,"complete");g.signal(a,"pick",c);d.cm.scrollIntoView()});this.close()},cursorActivity:function(){this.debounce&&(F(this.debounce),this.debounce=0);var a=this.startPos;this.data&&(a=this.data.from);var b=this.cm.getCursor(),c=this.cm.getLine(b.line);
if(b.line!=this.startPos.line||c.length-b.ch!=this.startLen-this.startPos.ch||b.ch<a.ch||this.cm.somethingSelected()||!b.ch||this.options.closeCharacters.test(c.charAt(b.ch-1)))this.close();else{var d=this;this.debounce=E(function(){d.update()});this.widget&&this.widget.disable()}},update:function(a){if(null!=this.tick){var b=this,c=++this.tick;u(this.options.hint,this.cm,this.options,function(d){b.tick==c&&b.finishUpdate(d,a)})}},finishUpdate:function(a,b){this.data&&g.signal(this.data,"update");
b=this.widget&&this.widget.picked||b&&this.options.completeSingle;this.widget&&this.widget.close();(this.data=a)&&a.list.length&&(b&&1==a.list.length?this.pick(a,0):(this.widget=new r(this,a),g.signal(a,"shown")))}};r.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null;this.hints.parentNode.removeChild(this.hints);this.completion.cm.removeKeyMap(this.keyMap);var a=this.completion.cm;this.completion.options.closeOnUnfocus&&(a.off("blur",this.onBlur),a.off("focus",
this.onFocus));a.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var a=this;this.keyMap={Enter:function(){a.picked=!0}};this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(a,b){a>=this.data.list.length?a=b?this.data.list.length-1:0:0>a&&(a=b?0:this.data.list.length-1);if(this.selectedHint!=a){if(b=this.hints.childNodes[this.selectedHint])b.className=b.className.replace(" CodeMirror-hint-active",
"");b=this.hints.childNodes[this.selectedHint=a];b.className+=" CodeMirror-hint-active";this.scrollToActive();g.signal(this.data,"select",this.data.list[this.selectedHint],b)}},scrollToActive:function(){var a=this.hints.childNodes[this.selectedHint],b=this.hints.firstChild;a.offsetTop<this.hints.scrollTop?this.hints.scrollTop=a.offsetTop-b.offsetTop:a.offsetTop+a.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=a.offsetTop+a.offsetHeight-this.hints.clientHeight+b.offsetTop)},
screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}};g.registerHelper("hint","auto",{resolve:function(a,b){var c=a.getHelpers(b,"hint"),d;return c.length?(a=function(a,b,d){function e(c){if(c==f.length)return b(null);u(f[c],a,d,function(a){a&&0<a.list.length?b(a):e(c+1)})}var f=D(a,c);e(0)},a.async=!0,a.supportsSelection=!0,a):(d=a.getHelper(a.getCursor(),"hintWords"))?function(a){return g.hint.fromList(a,{words:d})}:g.hint.anyword?function(a,
b){return g.hint.anyword(a,b)}:function(){}}});g.registerHelper("hint","fromList",function(a,b){var c=a.getCursor(),d=a.getTokenAt(c);a=g.Pos(c.line,d.start);d.start<c.ch&&/\w/.test(d.string.charAt(c.ch-d.start-1))?d=d.string.substr(0,c.ch-d.start):(d="",a=c);for(var e=[],p=0;p<b.words.length;p++){var f=b.words[p];f.slice(0,d.length)==d&&e.push(f)}if(e.length)return{list:e,from:a,to:c}});g.commands.autocomplete=g.showHint;var B={hint:g.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,
closeOnUnfocus:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null};g.defineOption("hintOptions",null)});
