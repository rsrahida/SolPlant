import React, { useRef, useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { supabase } from "../../lib/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);
import styles from "./DashboardChart.module.css";

const DashboardChart = () => {
  const chartRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("bar");
  const ChartComponent = { bar: Bar, line: Line, pie: Pie }[type];

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("products")
        .select("title, price");
      if (error) console.error("Error fetching products:", error.message);
      else setProducts(data);
    }
    fetchData();
  }, []);

  const labels = products.map((p) => p.title);
  const dataValues = products.map((p) => p.price);

  const data = {
    labels,
    datasets: [
      {
        label: "Product Price",
        data: dataValues,
        backgroundColor: "rgba(76, 175, 80, 0.6)",
        borderColor: "#4caf50",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} $` } },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { display: false } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.2)" } },
    },
  };

  return (
    <div className={styles.generalContainer}>
      <div className={styles.chartContainer}>
        <div className={styles.controlRow}>
          <label htmlFor="chartType" className={styles.controlLabel}>
            Chart Type:
          </label>
          <select
            id="chartType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.chartSelect}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>
        <h3 className={styles.title}>Product Prices</h3>
        <ChartComponent ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardChart;
