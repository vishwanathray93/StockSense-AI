import {useEffect,useState} from "react";

import {
Page,
Layout,
Card,
Text,
InlineGrid,
BlockStack,
Divider
} from "@shopify/polaris";

import OverviewChart from "../components/charts/OverviewChart";
import VisitorsRadar from "../components/charts/VisitorsRadar";
import DeviceChart from "../components/charts/DeviceChart";
import FunnelChart from "../components/charts/FunnelChart";
import AIAnalytics from "../components/AIAnalytics";
export default function Dashboard(){

const[stats,setStats]=useState({});
const[visited,setVisited]=useState([]);
const[cart,setCart]=useState([]);
const[clicked,setClicked]=useState([]);
const[overview,setOverview]=useState({});
const[devices,setDevices]=useState({});
const[weeklyVisitors,setWeeklyVisitors]=useState([]);
const [funnel,setFunnel]=useState({});
async function load(){

try{

const res=await fetch("/api/analytics");
const data=await res.json();

setStats(data?.stats||{});
setVisited(data?.mostVisited||[]);
setCart(data?.mostCart||[]);
setClicked(data?.mostClicks||[]);
setOverview(data?.overview||{});
setDevices(data?.devices||{});
setWeeklyVisitors(data?.weeklyVisitors||[]);
setFunnel(data?.funnel||{});
}catch(err){

console.log(err);

}

}

useEffect(()=>{

load();

const timer=setInterval(load,15000);

return()=>clearInterval(timer);

},[]);

return(

<Page title="TrackOrbit Analytics">

<Layout>

{/* ================= TOP STATS ================= */}

<Layout.Section>

<InlineGrid columns={5} gap="400">

<Card>
<BlockStack gap="100">
<Text tone="subdued">Views</Text>
<Text variant="heading2xl">{stats?.views||0}</Text>
</BlockStack>
</Card>

<Card>
<BlockStack gap="100">
<Text tone="subdued">Clicks</Text>
<Text variant="heading2xl">{stats?.clicks||0}</Text>
</BlockStack>
</Card>

<Card>
<BlockStack gap="100">
<Text tone="subdued">Add To Cart</Text>
<Text variant="heading2xl">{stats?.cart||0}</Text>
</BlockStack>
</Card>

<Card>
<BlockStack gap="100">
<Text tone="subdued">Orders</Text>
<Text variant="heading2xl">{stats?.orders||0}</Text>
</BlockStack>
</Card>

<Card>
<BlockStack gap="100">
<Text tone="subdued">Revenue</Text>
<Text variant="heading2xl">${stats?.revenue||0}</Text>
</BlockStack>
</Card>

</InlineGrid>

</Layout.Section>

{/* ================= OVERVIEW GRAPH ================= */}

<Layout.Section>

<Card>

<BlockStack gap="300">

<Text variant="headingMd">Traffic Overview</Text>

<div style={{height:350}}>
<OverviewChart data={overview}/>
</div>

</BlockStack>

</Card>

</Layout.Section>

{/* ================= CONVERSION FUNNEL ================= */}

<Layout.Section>

<Card>

<BlockStack gap="300">

<Text variant="headingMd">
Conversion Funnel
</Text>

<div style={{height:300}}>
<FunnelChart data={funnel}/>
</div>

</BlockStack>

</Card>

</Layout.Section>

{/* ================= DEVICE + WEEKLY ================= */}

<Layout.Section>

<InlineGrid columns={2} gap="400">

<Card>

<BlockStack gap="300">

<Text variant="headingMd">Visits by Device</Text>

<div style={{height:250}}>
<DeviceChart data={devices}/>
</div>

</BlockStack>

</Card>

<Card>

<BlockStack gap="300">

<Text variant="headingMd">Weekly Visitors</Text>

<div style={{height:250}}>
<VisitorsRadar data={weeklyVisitors}/>
</div>

</BlockStack>

</Card>

</InlineGrid>

</Layout.Section>

{/* ================= TOP PRODUCTS ================= */}

<Layout.Section>

<Card>

<BlockStack gap="300">

<Text variant="headingMd">Top Performing Products</Text>

{visited.length===0 && (
<Text tone="subdued">No product data yet</Text>
)}

{visited.map(product=>(

<Card key={product.product_id}>

<div style={{
display:"flex",
alignItems:"center",
gap:20
}}>

<img
src={
product.image||
"https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png"
}
width="60"
height="60"
style={{
borderRadius:8,
objectFit:"cover"
}}
/>

<div style={{flex:1}}>

<BlockStack gap="100">

<Text variant="headingSm">
{product.title||"Unknown product"}
</Text>

<Text tone="subdued">
SKU: {product.product_id}
</Text>

<Text tone="subdued">
Collection: {product.collection||"Unknown"}
</Text>

</BlockStack>

</div>

<Text variant="headingMd">
{product.views||0}
</Text>

</div>

</Card>

))}

</BlockStack>

</Card>

</Layout.Section>

{/* ================= MOST ADDED TO CART ================= */}

<Layout.Section>

<Card>

<BlockStack gap="300">

<Text variant="headingMd">Most Added To Cart</Text>

<InlineGrid columns={3} gap="400">

{cart.map(product=>(

<Card key={product.product_id}>

<BlockStack gap="200">

<Text variant="headingSm">
{product.title||"Product"}
</Text>

<Text tone="subdued">
SKU: {product.product_id}
</Text>

<Divider/>

<Text variant="headingLg">
{product.adds||0} Adds
</Text>

</BlockStack>

</Card>

))}

</InlineGrid>

</BlockStack>

</Card>

</Layout.Section>

{/* ================= MOST CLICKED ================= */}

<Layout.Section>

<Card>

<BlockStack gap="300">

<Text variant="headingMd">Most Clicked Elements</Text>

<InlineGrid columns={3} gap="400">

{clicked.map(item=>(

<Card key={item.element_text}>

<BlockStack gap="200">

<Text variant="headingSm">
{item.element_text||"Unknown"}
</Text>

<Divider/>

<Text variant="headingLg">
{item.clicks||0}
</Text>

<Text tone="subdued">
Clicks
</Text>

</BlockStack>

</Card>

))}

</InlineGrid>

</BlockStack>

</Card>

</Layout.Section>

</Layout>

</Page>

);

}