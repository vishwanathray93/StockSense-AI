import "../../components/charts/chartConfig";
import {Line} from "react-chartjs-2";

export default function OverviewChart({data}){

const chartData={
labels:data?.labels || [],
datasets:[
{
label:"Views",
data:data?.views || [],
borderColor:"#5c6ac4",
backgroundColor:"#5c6ac4"
},
{
label:"Clicks",
data:data?.clicks || [],
borderColor:"#47c1bf",
backgroundColor:"#47c1bf"
},
{
label:"Cart",
data:data?.cart || [],
borderColor:"#f49342",
backgroundColor:"#f49342"
},
{
label:"Orders",
data:data?.orders || [],
borderColor:"#9c6ade",
backgroundColor:"#9c6ade"
}
]
};

return <Line redraw data={chartData}/>;
}