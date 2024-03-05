import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MonthlyData } from '../../../types/MonthlyData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Plot({ monthlyData }: { monthlyData: MonthlyData }) {

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true
                }
            },
            title: {
                display: true,
                text: 'Analysis'
            }
        }
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: monthlyData.income,
                borderColor: '#A78BFA',
                backgroundColor: '#A78BFA',
            },
            {
                label: 'Expense',
                data: monthlyData.expense,
                borderColor: '#E5659F',
                backgroundColor: '#E5659F',
            },
            {
                label: 'Budget',
                data: monthlyData.budget,
                borderColor: '#D0E9DC',
                backgroundColor: '#D0E9DC',
            },
        ]
    };

    return (
        <div className="lg:h-[400px] lg:w-auto justify-center flex items-center">
            <Line
                height={"280px"}
                options={chartOptions}
                data={chartData}
            />
        </div>
    );
}
