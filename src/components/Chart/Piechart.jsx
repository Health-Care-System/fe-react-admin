import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

// Example data yang ditaruh di props
// export const dataChart = [
//   {
//     disease: 'Demam',
//     patient: 35
//   },
//   {
//     disease: 'Tipes',
//     patient: 20
//   },
//   {
//     disease: 'Asam Lambung',
//     patient: 65
//   },
// ]

export const PieChart = ({ dataChart }) => {

  if (!dataChart) return null;
  const labelData = dataChart.map((item) => item.name)
  const patientData = dataChart.map((item) => item.patient)

  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Pasien',
        data: patientData,
        backgroundColor: [
          'rgba(251, 179, 167)',
          'rgba(161, 209, 250)',
          'rgba(167, 172, 229)',

        ],
      },
    ],
  };

  return (
    <Pie data={data} />
  )
}
