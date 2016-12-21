'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){function e(a){return new RegExp("\\b("+a.join("|")+")\\b","i")}function d(a){return new RegExp("("+a.join("|")+")","i")}function f(){return{inComment:!1,inString:!1,inAttributeList:!1,inScript:!1}}function g(a){return{inComment:a.inComment,inString:a.inString,inAttributeList:a.inAttributeList,
inScript:a.inScript}}function h(a){return function(b,c){if(b.match(d(a.brackets),!0,!0))return"bracket";if(!c.inComment){if(b.match(/\/\*[^\*\/]*/,!0,!0))return c.inComment=!0,"comment";if(b.match(d(a.singlecomment),!0,!0))return b.skipToEnd(),"comment"}if(c.inComment)return b.match(/[^\*\/]*\*\//,!0,!0)?c.inComment=!1:b.skipToEnd(),"comment";if(!c.inString&&b.match(/\"(\\\"|[^\"])*/,!0,!0))return c.inString=!0,"string";if(c.inString)return b.match(/[^\"]*\"/,!0,!0)?c.inString=!1:b.skipToEnd(),"string";
if(a.keywords&&b.match(e(a.keywords),!0,!0)||b.match(e(a.options),!0,!0)||b.match(e(a.arcsWords),!0,!0)||b.match(d(a.arcsOthers),!0,!0))return"keyword";if(a.operators&&b.match(d(a.operators),!0,!0))return"operator";if(a.constants&&b.match(d(a.constants),!0,!0))return"variable";if(!a.inAttributeList&&a.attributes&&b.match(/\[/,!0,!0))return a.inAttributeList=!0,"bracket";if(a.inAttributeList){if(null!==a.attributes&&b.match(e(a.attributes),!0,!0))return"attribute";if(b.match(/]/,!0,!0))return a.inAttributeList=
!1,"bracket"}b.next();return"base"}}var k={mscgen:{keywords:["msc"],options:["hscale","width","arcgradient","wordwraparcs"],constants:["true","false","on","off"],attributes:"label idurl id url linecolor linecolour textcolor textcolour textbgcolor textbgcolour arclinecolor arclinecolour arctextcolor arctextcolour arctextbgcolor arctextbgcolour arcskip".split(" "),brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box"],arcsOthers:"\\|\\|\\| \\.\\.\\. --- -- <-> == <<=>> <=> \\.\\. <<>> :: <:> -> =>> => >> :> <- <<= <= << <: x- -x".split(" "),
singlecomment:["//","#"],operators:["="]},xu:{keywords:["msc","xu"],options:["hscale","width","arcgradient","wordwraparcs","watermark"],constants:["true","false","on","off","auto"],attributes:"label idurl id url linecolor linecolour textcolor textcolour textbgcolor textbgcolour arclinecolor arclinecolour arctextcolor arctextcolour arctextbgcolor arctextbgcolour arcskip".split(" "),brackets:["\\{","\\}"],arcsWords:"note abox rbox box alt else opt break par seq strict neg critical ignore consider assert loop ref exc".split(" "),
arcsOthers:"\\|\\|\\| \\.\\.\\. --- -- <-> == <<=>> <=> \\.\\. <<>> :: <:> -> =>> => >> :> <- <<= <= << <: x- -x".split(" "),singlecomment:["//","#"],operators:["="]},msgenny:{keywords:null,options:["hscale","width","arcgradient","wordwraparcs","watermark"],constants:["true","false","on","off","auto"],attributes:null,brackets:["\\{","\\}"],arcsWords:"note abox rbox box alt else opt break par seq strict neg critical ignore consider assert loop ref exc".split(" "),arcsOthers:"\\|\\|\\| \\.\\.\\. --- -- <-> == <<=>> <=> \\.\\. <<>> :: <:> -> =>> => >> :> <- <<= <= << <: x- -x".split(" "),
singlecomment:["//","#"],operators:["="]}};c.defineMode("mscgen",function(a,b){return{startState:f,copyState:g,token:h(k[b&&b.language||"mscgen"]),lineComment:"#",blockCommentStart:"/*",blockCommentEnd:"*/"}});c.defineMIME("text/x-mscgen","mscgen");c.defineMIME("text/x-xu",{name:"mscgen",language:"xu"});c.defineMIME("text/x-msgenny",{name:"mscgen",language:"msgenny"})});
