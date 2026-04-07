import db from "../db.server";

export async function loader(){

const collections=await db.products.groupBy({

by:["collection"],

_count:{
collection:true
},

orderBy:{
_count:{
collection:"desc"
}
},

take:5

});

return Response.json(collections);

}