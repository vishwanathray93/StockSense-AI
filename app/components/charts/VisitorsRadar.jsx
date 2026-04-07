import "../../components/charts/chartConfig";
import {Radar} from "react-chartjs-2";

export default function VisitorsRadar({data}){

const chart={
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
label:"Visitors",
data:data || [],
backgroundColor:"rgba(92,106,196,0.2)",
borderColor:"#5c6ac4"
}
]
};

return <Radar redraw data={chart}/>;
}