// ==UserScript==
// @name         OGame Hidden Colony
// @description  Shows the update timestamp of your planet APIs, helping you to make a hidden colony to hide your activity.
// @namespace    https://github.com/EliasGrande/
// @downloadURL  https://github.com/EliasGrande/OGameHiddenColony/raw/master/dist/releases/latest.user.js
// @updateURL    https://github.com/EliasGrande/OGameHiddenColony/raw/master/dist/releases/latest.meta.js
// @version      1.0.0
// @include      *://*.ogame.*/game/index.php?*page=*
// ==/UserScript==
/*! OGame Hidden Colony (C) 2014 Elías Grande Cásedas | MIT | opensource.org/licenses/MIT */
(function(){var h=window,t;try{if(unsafeWindow){h=unsafeWindow}}catch(r){}t=h.document;const q="o_hidden_colony_";const m=10;var u={UNIVERSE:[{NAME:"AntigameOrigin",URL:"antigame.de"},{NAME:"Ogniter",URL:"www.ogniter.org"}],PLAYER_DATA:[{NAME:"GalaxyInfo",URL:"userscripts-mirror.org/scripts/show/136509"}]};var j={UNIVERSE:"{uni}/api/universe.xml",PLAYER_DATA:"{uni}/api/playerData.xml?id={pid}"};var p=function(w,v){for(var e in v){if(!v.hasOwnProperty(e)){continue}if(v[e].constructor==Object){if(!w.hasOwnProperty(e)){w[e]={}}w[e]=p(w[e],v[e])}else{w[e]=v[e]}}return w};var l=function(e){return Math.round((new Date(e)).getTime()/1000)};var n=function(){this._universe=this.getMeta("universe").trim();this._playerId=parseInt(this.getMeta("player-id"));this._timestamp=parseInt(this.getMeta("timestamp"));this._language=this.getMeta("language").trim();var v=this.query(".OGameClock span").childNodes[0].nodeValue;v=v.replace(/^\D+/,"").replace(/\D+$/,"").split(/\D/);v=parseInt(v[0])*3600+parseInt(v[1])*60+parseInt(v[2]);var w=this._timestamp;w=w/86400;w=Math.round((w-Math.floor(w))*86400);var e=Math.round((v-w)/60);if(e<(-720)){e=e+1440}else{if(e>720){e=e-1440}}this._gmtOffset=e};n.prototype={query:function(e){return t.querySelector(e)},getMeta:function(e){return this.query('meta[name="ogame-'+e+'"]').getAttribute("content")},getUniverse:function(){return this._universe},getPlayerId:function(){return this._playerId},getTimestamp:function(){return this._timestamp},getLanguage:function(){return this._language},getGmtOffset:function(){return this._gmtOffset}};var d=function(v){var e=new Date();this._offset=(v+e.getTimezoneOffset())*60};d.prototype={timestampToLocaleString:function(x){var v=new Date(x*1000);var e=v.getHours();if(e<10){e="0"+e.toString()}var w=v.getMinutes();if(w<10){w="0"+w.toString()}var y=v.getSeconds();if(y<10){y="0"+y.toString()}return v.toLocaleDateString()+" "+e+":"+w+":"+y},timestampToOgameString:function(e){return this.timestampToLocaleString(e+this._offset)},countdownCompleted:"00:00:00",timestampToCountdownString:function(x){var v=Math.round((x*1000-(new Date()).getTime())/1000);if(v<0){return this.countdownCompleted}var e=Math.floor(v/3600);v=v-e*3600;var w=Math.floor(v/60);var y=v-w*60;return((e<10)?"0":"")+e.toString()+":"+((w<10)?"0":"")+w.toString()+":"+((y<10)?"0":"")+y.toString()},initCountdown:function(A,y){var x=A;var z=y;var e=this;var v;var w=function(){x.nodeValue=e.timestampToCountdownString(z);if(x.nodeValue==e.countdownCompleted){clearInterval(v)}};v=setInterval(w,1000)}};var a=function(e){this._prefix=q+e.getUniverse()+"_"};a.prototype={_obj:h.localStorage,get:function(v){var e=this._obj.getItem(this._prefix+v);return(e==null)?null:JSON.parse(e)},set:function(v,e){return this._obj.setItem(this._prefix+v,JSON.stringify(e))},remove:function(e){return this._obj.removeItem(this._prefix+e)}};var s=function(e,v){this._headers=e.get(v)};s.prototype={getHeaders:function(e){e(this._headers)},needUpdate:function(w){try{if(this._headers==null){return true}var v=this._headers.expires;var y=this._headers.date;return((v<w)&&(y+m<w))?true:false}catch(x){return true}}};var g=function(x,w,v,e){this._url=e;this._storage=x;this._id=w;this._domDao=v;this._headers=null};g.prototype={getHeaders:function(w){if(this._headers!=null){w(this._headers);return}var v=this;var e=new XMLHttpRequest();e.open("HEAD","http://"+v._url);e.onreadystatechange=function(){if(this.readyState==this.DONE){v._headers={expires:l(this.getResponseHeader("Expires")),lastModified:l(this.getResponseHeader("Last-Modified")),date:v._domDao.getTimestamp()};v._storage.set(v._id,v._headers);w(v._headers)}};e.send()}};var i=function(v,w){this._universeUrl=j.UNIVERSE.replace("{uni}",v.getUniverse());this._playerDataUrl=j.PLAYER_DATA.replace("{uni}",v.getUniverse()).replace("{pid}",v.getPlayerId());this._universeDao=new s(w,"universe");this._playerDataDao=new s(w,"playerData");var e=v.getTimestamp();if(this._universeDao.needUpdate(e)){this._universeDao=new g(w,"universe",v,this.getUniverseUrl())}if(this._playerDataDao.needUpdate(e)){this._playerDataDao=new g(w,"playerData",v,this.getPlayerDataUrl())}};i.prototype={getUniverseUrl:function(){return this._universeUrl},getPlayerDataUrl:function(){return this._playerDataUrl},getUniverseHeaders:function(e){this._universeDao.getHeaders(e)},getPlayerDataHeaders:function(e){this._playerDataDao.getHeaders(e)}};var o=function(e){
/*! [i18n=en] */
;p(this,{TITLE:"HiddenColony",API:"API",USED_BY:"Used by",LAS_MOD:"Last update",EXPIRES:"Next update",SER_TIM:"Server time",LOC_TIM:"Local time",REM_TIM:"Remaining time"});
/*! [i18n=es] */
;if(/es|ar|mx/.test(e)){p(this,{USED_BY:"Usado por",LAS_MOD:"Última actualización",EXPIRES:"Próxima actualización",SER_TIM:"Hora del servidor",LOC_TIM:"Hora local",REM_TIM:"Tiempo restante"})}
/*! [/i18n] */
};var k=function(A,z,w){var y,v,e,x;y=t.createElement("li");v=t.createElement("a");v.setAttribute("href","javascript:void(0)");v.setAttribute("class","menubutton");v.addEventListener("click",w,false);e=t.createElement("span");e.setAttribute("class","textlabel");x=t.createTextNode(z);A.appendChild(y);y.appendChild(v);v.appendChild(e);e.appendChild(x)};var c=function(w,e,v){this._i18n=w;this._dateFormat=e;this._apiDao=v;var x=this;this._menuButton=new k(t.querySelector("#menuTableTools"),w.TITLE,function(){x.toggleWindow()});this._universe=null;this._playerData=null};c.prototype={toggleWindow:function(){var x=this._universe;var e=this._playerData;var w=this._dateFormat;var v=this._i18n;alert(v.API+": "+x.url+"\n"+v.USED_BY+": "+u.UNIVERSE[0].NAME+"\n\n"+v.EXPIRES+":\n\t"+w.timestampToOgameString(x.expires)+" ("+v.SER_TIM+")\n\t"+w.timestampToLocaleString(x.expires)+" ("+v.LOC_TIM+")\n"+v.REM_TIM+":\n\t"+w.timestampToCountdownString(x.expires)+"\n\n\n"+v.API+": "+e.url+"\n"+v.USED_BY+": "+u.PLAYER_DATA[0].NAME+"\n\n"+v.EXPIRES+":\n\t"+w.timestampToOgameString(e.expires)+" ("+v.SER_TIM+")\n\t"+w.timestampToLocaleString(e.expires)+" ("+v.LOC_TIM+")\n"+v.REM_TIM+":\n\t"+w.timestampToCountdownString(e.expires)+"\n")},setInfo:function(w,e,v){this["_"+w]=p({url:e},v)},setUniverse:function(e,v){this.setInfo("universe",e,v)},setPlayerData:function(e,v){this.setInfo("playerData",e,v)}};var f=function(){var z=new n();var x=new a(z);var w=new i(z,x);var y=new o(z.getLanguage());var v=new d(z.getGmtOffset());var e=new c(y,v,w);w.getUniverseHeaders(function(A){e.setUniverse(w.getUniverseUrl(),A)});w.getPlayerDataHeaders(function(A){e.setPlayerData(w.getPlayerDataUrl(),A)})};var b=function(){
/*! [onDOMContentLoaded] by Dean Edwards & Matthias Miller & John Resig */
;var e;var v=function(){if(arguments.callee.done){return}arguments.callee.done=true;if(e){clearInterval(e)}f()};if(t.addEventListener){t.addEventListener("DOMContentLoaded",v,false)}if(/WebKit/i.test(h.navigator.userAgent)){e=setInterval(function(){if(/loaded|complete/.test(t.readyState)){v()}},10)}h.onload=v};b()})();