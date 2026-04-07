import "../../components/charts/chartConfig";
import {Line} from "react-chartjs-2";

export default function RevenueChart({data}){

const chart={
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[
{
label:"Revenue",
data:data || [],
borderColor:"#5c6ac4",
backgroundColor:"#5c6ac4"
}
]
};

return <Line redraw data={chart}/>;

}