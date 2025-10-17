"use client";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Timeframe = "1D" | "1W" | "1M" | "1Y";

const ChartBTC: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>("1D");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getInterval = (tf: Timeframe): { interval: string; limit: number } => {
    switch (tf) {
      case "1D":
        return { interval: "5m", limit: 288 };
      case "1W":
        return { interval: "1h", limit: 168 };
      case "1M":
        return { interval: "4h", limit: 180 };
      case "1Y":
        return { interval: "1d", limit: 365 };
      default:
        return { interval: "5m", limit: 288 };
    }
  };

  const fetchBitcoinData = async (timeRange: Timeframe) => {
    try {
      setLoading(true);
      const { interval, limit } = getInterval(timeRange);

      const response = await axios.get<
        [
          number,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ][]
      >("https://api.binance.com/api/v3/klines", {
        params: { symbol: "BTCUSDT", interval, limit },
      });

      const labels = response.data.map((d) => {
        const date = new Date(d[0]);
        if (timeRange === "1D") {
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
        } else {
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }
      });

      const prices = response.data.map((d) => parseFloat(d[4]));

      const newData: ChartData<"line"> = {
        labels,
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: prices,
            borderColor: "#555555",
            backgroundColor: "rgba(246, 240, 117, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      };

      setChartData(newData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching Bitcoin data:", err);
      setError("Failed to load Bitcoin data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitcoinData(timeframe);

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data) as { p: string };
      const price = parseFloat(msg.p);

      setChartData((prev) => {
        if (!prev) return prev;
        const updated: ChartData<"line"> = { ...prev };
        const lastDataset = { ...updated.datasets[0] };

        lastDataset.data = [...(lastDataset.data as number[])];
        lastDataset.data[lastDataset.data.length - 1] = price;

        updated.datasets = [lastDataset];
        return updated;
      });
    };

    return () => ws.close();
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe);
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#555555",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#888" },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#888",
          callback: (value) => "$" + value.toLocaleString(),
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  const getButtonClass = (btnTimeframe: Timeframe): string => {
    return `w-[33px] h-[33px] cursor-pointer flex items-center justify-center rounded-xl ${
      timeframe === btnTimeframe
        ? "text-white bg-gray-400"
        : "text-white bg-[#555555] hover:bg-[#c9c9c9]"
    } transition-colors duration-200`;
  };

  return (
    <section>
      <div className=" w-full max-w-[630px] bg-[#d9d9d9] rounded-xl">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[16px] font-medium leading-none text-black">
            BTC/USD Live Chart{" "}
          </h1>
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-1">
            <button
              className={getButtonClass("1D")}
              onClick={() => handleTimeframeChange("1D")}
            >
              1D
            </button>
            <button
              className={getButtonClass("1W")}
              onClick={() => handleTimeframeChange("1W")}
            >
              1W
            </button>
            <button
              className={getButtonClass("1M")}
              onClick={() => handleTimeframeChange("1M")}
            >
              1M
            </button>
            <button
              className={getButtonClass("1Y")}
              onClick={() => handleTimeframeChange("1Y")}
            >
              1Y
            </button>
          </div>
        </div>

        <div className="h-64 md:h-83 mb-4">
          {loading ? (
            <div className="h-full flex items-center justify-center text-white">
              Loading chart...
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-400">
              {error}
            </div>
          ) : chartData ? (
            <Line data={chartData} options={chartOptions} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ChartBTC;
