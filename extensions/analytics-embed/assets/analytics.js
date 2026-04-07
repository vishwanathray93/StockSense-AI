(function () {

const TRACKING_URL="/apps/proxy/api/track";
const COOKIE_NAME="_shopify_analytics_visitor";

/* UUID */

function uuid(){
return crypto.randomUUID();
}

/* VISITOR */

function getVisitor(){

let id=localStorage.getItem(COOKIE_NAME);

if(!id){
id=uuid();
localStorage.setItem(COOKIE_NAME,id);
}

return id;

}

/* SEND EVENT */

function sendEvent(type,data){

fetch(TRACKING_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
shop:Shopify.shop,
visitor_id:getVisitor(),
type,
timestamp:new Date().toISOString(),
...data
})
});

}

/* PAGE VIEW */

sendEvent("page_view",{
url:window.location.href,
path:window.location.pathname,
title:document.title
});

/* CLICK TRACKING */

document.addEventListener("click",function(e){

const el=e.target;

if(el.tagName==="A"||el.tagName==="BUTTON"){

sendEvent("click",{
page:window.location.pathname,
element_type:el.tagName,
element_text:el.innerText,
element_id:el.id
});

}

});

/* PRODUCT VIEW */

if(window.location.pathname.includes("/products/")){

const productTitle=document.querySelector("h1")?.innerText;

const productId=document.querySelector('[name="id"]')?.value;

const productImage=document.querySelector(".product__media img")?.src
||document.querySelector("img")?.src;

if(productId){

sendEvent("product_view",{
product_id:productId,
title:productTitle,
image:productImage,
collection:""
});

}

}

/* ADD TO CART */

document.addEventListener("submit",function(e){

const form=e.target;

if(form.action.includes("/cart/add")){

const productId=form.querySelector('[name="id"]').value;

const quantity=form.querySelector('[name="quantity"]')?.value||1;

sendEvent("add_to_cart",{
product_id:productId,
quantity
});

}

});

})();