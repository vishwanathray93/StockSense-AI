import db from "../db.server";

export async function loader(){

const views=await db.product_views.groupBy({
by:["product_id"],
_count:true,
orderBy:{_count:{product_id:"desc"}},
take:10
});

const products=await db.products.findMany({
where:{
product_id:{
in:views.map(v=>v.product_id)
}
}
});

const result=views.map(v=>{

const product=products.find(p=>p.product_id===v.product_id);

return{
product_id:v.product_id,
views:v._count.product_id,
title:product?.title,
image:product?.image,
collection:product?.collection
};

});

return Response.json(result);

}