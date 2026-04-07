import "../../components/charts/chartConfig";
import {Doughnut} from "react-chartjs-2";

export default function DeviceChart({data}){

const chart={
labels:["Mobile","Desktop"],
datasets:[
{
data:[
data?.mobile || 0,
data?.desktop || 0
],
backgroundColor:[
"#5c6ac4",
"#47c1bf"
]
}
]
};

return <Doughnut redraw data={chart}/>;
}