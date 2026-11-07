/* Skilleaze website first-party analytics -> Supabase (sk_track). Read on skilleaze.com/admin. */
(function(){
if(window.skTrack||/^\/admin/.test(location.pathname))return;
var U='https://ojshkwpvkzrkiwannqkk.supabase.co/rest/v1/rpc/sk_track',K='sb_publishable_m8RvHOepsDfqbMQxLDH_NA_qfv6Vc5G';
var H={'Content-Type':'application/json',apikey:K,Authorization:'Bearer '+K};
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v);}catch(e){return null;}}
var sid=ss('sk_sid');if(!sid){sid=Math.random().toString(36).slice(2)+Date.now().toString(36);ss('sk_sid',sid);}
var q=new URLSearchParams(location.search);
if(q.get('utm_source')||q.get('gclid')||q.get('fbclid')){ss('sk_src',JSON.stringify({src:q.get('utm_source')||(q.get('gclid')?'google':'facebook'),med:q.get('utm_medium')||'cpc',camp:q.get('utm_campaign')||''}));}
var first=ss('sk_ref');if(first===null){first=document.referrer&&!/skilleaze\.com/i.test(document.referrer)?document.referrer:'';ss('sk_ref',first);}
var S={};try{S=JSON.parse(ss('sk_src')||'{}')}catch(e){}
var ua=navigator.userAgent,dev=/iPad|Tablet/i.test(ua)?'tablet':/Mobi|Android|iPhone/i.test(ua)?'mobile':'desktop';
var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
var G=null;try{G=JSON.parse(ss('sk_geo')||'null')}catch(e){}
function send(ev,o){o=o||{};var g=G||{};var body=JSON.stringify({p:{sid:sid,ev:ev,lat:g.lat!=null?String(g.lat):'',lon:g.lon!=null?String(g.lon):'',city:g.city||'',country:g.country||'',path:location.pathname,ref:first,src:S.src||'',med:S.med||'',camp:S.camp||'',dev:dev,tz:tz,tags:o.tags||null,meta:o.meta||null}});
 try{fetch(U,{method:'POST',headers:H,body:body,keepalive:true}).catch(function(){});}catch(e){}}
window.skTrack=send;
var geo=G?Promise.resolve():Promise.race([fetch('https://get.geojs.io/v1/ip/geo.json').then(function(r){return r.json();}).then(function(j){if(j&&j.latitude){G={lat:+(+j.latitude).toFixed(2),lon:+(+j.longitude).toFixed(2),city:j.city||'',country:j.country||''};ss('sk_geo',JSON.stringify(G));}}).catch(function(){}),new Promise(function(r){setTimeout(r,2500);})]);
geo.then(function(){send('page_view');});
setInterval(function(){if(document.visibilityState==='visible')send('ping');},60000);
if(!ss('sk_tagchk')){setTimeout(function(){ss('sk_tagchk','1');var R=(performance.getEntriesByType&&performance.getEntriesByType('resource')||[]).map(function(e){return e.name;});var has=function(re){return R.some(function(n){return re.test(n);});};send('tags',{tags:{ga:has(/google-analytics\.com\/(g\/)?collect|analytics\.google\.com\/g\/collect/),clarity:has(/clarity\.ms\/collect/)}});},9000);}
function kind(h){h=String(h||'');if(/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(h))return 'whatsapp';if(/cvbuilder\.skilleaze\.com/i.test(h))return 'free_cv';if(/^tel:/i.test(h))return 'call';if(/^mailto:/i.test(h))return 'email';if(/instagram\.com|linkedin\.com|facebook\.com/i.test(h))return 'social';return '';}
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var k=kind(a.getAttribute('href'));if(k)send(k);},true);
var wo=window.open;window.open=function(u){try{var k=kind(u);if(k)send(k);}catch(e){}return wo.apply(window,arguments);};
})();
