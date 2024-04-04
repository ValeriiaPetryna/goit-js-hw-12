import{a as p,S as w,i as c}from"./assets/vendor-2cfd16ce.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const b="43195893-e6aecd5c5261fd0c345764808";p.defaults.baseURL="https://pixabay.com/api/";function h(r,t,a){const o=new URLSearchParams({key:b,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:a,page:t,q:r});return p.get("?"+o).then(e=>e.data)}function g(r=[]){return r.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,views:s,comments:i,downloads:L})=>`<a href="${a}"><div class="card">
        <div class="card-wrapper-img">
          <img
            src="${t}"
            alt="${o}"
          />
        </div>
        <div class="card-info">
          <div class="card-info-colum">
            <p class="card-info-title">likes</p>
            <p class="card-info-value">${e}</p>
          </div>
          <div class="card-info-colum">
            <p class="card-info-title">views</p>
            <p class="card-info-value">${s}</p>
          </div>
          <div class="card-info-colum">
            <p class="card-info-title">comments</p>
            <p class="card-info-value">${i}</p>
          </div>
          <div class="card-info-colum">
            <p class="card-info-title">downloads</p>
            <p class="card-info-value">${L}</p>
          </div>
        </div>
      </div></a>`).join("")}const y=new w(".gallery a",{});let n=1,l="";const u=15,E=document.querySelector(".form"),m=document.querySelector(".gallery");let f=document.querySelector(".preloader"),d=document.querySelector(".btn");E.addEventListener("submit",async r=>{try{if(r.preventDefault(),l=Object.fromEntries(new FormData(r.target)).message,l==="")return;n=1,f.classList.add("show"),d.classList.remove("show");const{totalHits:a,hits:o}=await h(l,n,u);if(o.length===0){c.info({message:"Sorry, there are no images matching your search query. Please try again!"});return}a>u?d.classList.add("show"):c.info({message:"We're sorry, but you've reached the end of search results."});const e=g(o);S(e),y.refresh(),v()}catch(t){c.error({message:"Error!!! "+t.message})}finally{f.classList.remove("show")}});d.addEventListener("click",async()=>{try{n+=1;const{totalHits:r,hits:t}=await h(l,n,u),a=g(t);n*t.length>=r&&(d.classList.remove("show"),c.info({message:"We're sorry, but you've reached the end of search results."})),P(a),y.refresh(),v()}catch(r){c.error({message:"Error!!! "+r.message})}finally{f.classList.remove("show")}});function S(r){m.innerHTML=r}function P(r){m.insertAdjacentHTML("beforeend",r)}function v(){let{height:r}=m.children[0].getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
