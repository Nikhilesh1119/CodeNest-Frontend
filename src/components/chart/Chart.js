import Chart from "react-apexcharts";

export default function Analysis({ title, count, Tags }) {
  return (
    <Chart
      type="pie"
      width={500}
      height={500}
      series={count}
      options={{
        title: {
          text: title,
        },
        noData: {
          text: "Empty Data",
        },
        // colors:["#f90000","#f0f"],
        labels: Tags,
      }}
    ></Chart>
  );
}
