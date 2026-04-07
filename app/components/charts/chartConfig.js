import {
Chart,
CategoryScale,
LinearScale,
PointElement,
LineElement,
ArcElement,
RadialLinearScale,
BarElement,
Tooltip,
Legend
} from "chart.js";

Chart.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
ArcElement,
RadialLinearScale,
BarElement,
Tooltip,
Legend
);

export default Chart;