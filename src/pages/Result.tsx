import { useLocation, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    emotion: string;
    probabilities: Record<string, number>;
  } | undefined;

  if (!state || !state.emotion || !state.probabilities) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
        <p className="text-red-600 text-lg font-semibold mb-4">Nenhum dado recebido.</p>
        <button
          className="w-72 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          Voltar para a Home
        </button>
      </div>
    );
  }

  const { emotion, probabilities } = state;

  const emotionEmojis: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    fear: "😨",
    surprise: "😲",
    neutral: "😐",
    disgust: "🤢",
  };

  const chartData = {
    labels: Object.keys(probabilities),
    datasets: [
      {
        label: "Probabilidade",
        data: Object.values(probabilities),
        backgroundColor: "#2563EB",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-2 text-gray-800 text-center">Você está sentindo:</h1>
      <div className="text-6xl mb-2">{emotionEmojis[emotion] || "🙂"}</div>
      <p className="text-2xl font-semibold text-gray-700 mb-6 capitalize">{emotion}</p>

      <div className="w-full max-w-xl mb-8 bg-white p-6 rounded-xl shadow-md">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <button
        className="w-72 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
    </div>
  );
}
