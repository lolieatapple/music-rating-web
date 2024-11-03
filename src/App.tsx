import React, { useState } from 'react';
import { Music2 } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const dimensions = [
  { id: 'lyrics', label: '歌词' },
  { id: 'melody', label: '旋律' },
  { id: 'arrangement', label: '编曲' },
  { id: 'vocals', label: '人声' },
  { id: 'emotion', label: '情感' },
  { id: 'quality', label: '音质' },
];

function App() {
  const [songName, setSongName] = useState('');
  const [ratings, setRatings] = useState(
    Object.fromEntries(dimensions.map(d => [d.id, 50]))
  );

  const averageScore = Math.round(
    Object.values(ratings).reduce((a, b) => a + b, 0) / dimensions.length
  );

  const chartData = {
    labels: dimensions.map(d => d.label),
    datasets: [
      {
        label: '评分',
        data: dimensions.map(d => ratings[d.id]),
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: '基准线',
        data: dimensions.map(() => 50),
        fill: true,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderColor: 'rgba(249, 115, 22, 0.6)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 14,
          },
          color: '#666',
        },
        pointLabels: {
          font: {
            size: 16,
            weight: '600',
          },
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        displayColors: false,
      },
    },
  };

  const handleSliderChange = (dimension: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [dimension]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">音乐评分系统</h1>
          </div>
          <p className="text-gray-600">为你喜爱的音乐打分，创建专业的评分图表</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="songName" className="block text-sm font-medium text-gray-700 mb-2">
              歌曲名称
            </label>
            <input
              type="text"
              id="songName"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="输入歌曲名称"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dimensions.map(({ id, label }) => (
              <div key={id} className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <span className="text-sm text-gray-500">{ratings[id]}</span>
                </div>
                <input
                  type="range"
                  id={id}
                  min="0"
                  max="100"
                  value={ratings[id]}
                  onChange={(e) => handleSliderChange(id, Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {songName || '歌曲'}的评分结果
            </h2>
            <p className="text-lg text-gray-600">
              平均分数: <span className="font-semibold text-indigo-600">{averageScore}</span>
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;