import "../../components/charts/chartConfig";
import {Bar} from "react-chartjs-2";

export default function FunnelChart({data}){

const chartData={

labels:[
"Product Views",
"Add To Cart",
"Checkout",
"Purchase"
],

datasets:[
{
label:"Conversion Funnel",

data:[
data?.views||0,
data?.cart||0,
data?.checkout||0,
data?.orders||0
],

backgroundColor:[
"#5c6ac4",
"#f49342",
"#ffc453",
"#47c1bf"
]
}
]

};

return <Bar redraw data={chartData}/>;

}