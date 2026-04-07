// import { useRef, useEffect } from "react";
// import { Chart } from "chart.js/auto";

// export default function PieChart({ data }) {

//   const canvasRef = useRef(null);
//   const chartRef = useRef(null);

//   useEffect(() => {

//     if (!canvasRef.current) return;

//     if (chartRef.current) {
//       chartRef.current.destroy();
//     }

//     chartRef.current = new Chart(canvasRef.current, {
//       type: "pie",
//       data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: "bottom"
//           }
//         }
//       }
//     });

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };

//   }, [data]);

//   return (
//     <div style={{ width: "350px", height: "350px", margin: "auto" }}>
//       <canvas ref={canvasRef}></canvas>
//     </div>
//   );

// }