// components/mypage/TodoChart.tsx

import { TodoTableType } from "@/types/DBType";
import { useMemo, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
} from "victory-native";
import BoxBg from "../common/BoxBg";

interface TodoChartProps {
  todoList: TodoTableType[] | null;
}

const screenWidth = Dimensions.get("window").width;

const TodoChart = ({ todoList }: TodoChartProps) => {
  const [chartWidth, setChartWidth] = useState<number>(screenWidth);

  const weeklyData = useMemo(() => {
    const data = [0, 0, 0, 0, 0, 0, 0];

    const today = new Date();
    const todayDay = today.getDay();
    /* istanbul ignore next */
    const diffToMonday = todayDay === 0 ? -6 : 1 - todayDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    if (todoList) {
      todoList.forEach((todo) => {
        if (!todo.created_at || todo.is_done !== true) return;

        const createdDate = new Date(todo.created_at);
        createdDate.setHours(0, 0, 0, 0);

        if (createdDate >= monday && createdDate <= today) {
          const day = createdDate.getDay();
          const mappedIndex = (day + 6) % 7; // 월 = 0, 일 = 6
          data[mappedIndex]++;
        }
      });
    }

    return data;
  }, [todoList]);

  const chartData = weeklyData.map((y, i) => ({ x: i, y }));

  return (
    <BoxBg>
      <View
        className="justify-between py-2 px-4"
        testID="chart-container"
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setChartWidth(width);
        }}
      >
        <Text className="text-xl font-bold mr-2">주간 완료 횟수</Text>
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: 12,
            marginTop: 8,
          }}
        >
          <VictoryChart
            width={chartWidth - 32}
            height={200}
            padding={{ top: 10, bottom: 30, left: 30, right: 10 }}
            domainPadding={{ x: 30, y: [10, 20] }}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues={[0, 1, 2, 3, 4, 5, 6]}
              tickFormat={["월", "화", "수", "목", "금", "토", "일"]}
              style={{
                tickLabels: { fontSize: 16, fill: "#000" },
                grid: { stroke: "#d9d9d9" },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickValues={[0, 1, 2, 3, 4, 5]}
              style={{
                tickLabels: { fontSize: 14, fill: "#000" },
                grid: { stroke: "#d9d9d9" },
              }}
            />
            <VictoryLine
              interpolation="monotoneX"
              data={chartData}
              animate={{
                duration: 1000,
                easing: "quadInOut",
                onLoad: { duration: 1000 },
              }}
              style={{
                data: {
                  stroke: "#FF5722",
                  strokeWidth: 3,
                },
              }}
            />
            <VictoryScatter
              data={chartData}
              animate={{
                duration: 1000,
                onLoad: { duration: 1000 },
              }}
              size={5}
              labels={({ datum }) => `${datum.y}개 완료`}
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea={true}
                  flyoutStyle={{
                    fill: "#fff",
                    stroke: "#ccc",
                    strokeWidth: 1,
                  }}
                  style={{
                    fontSize: 12,
                    fill: "#000",
                  }}
                  pointerLength={5}
                  cornerRadius={4}
                />
              }
              style={{
                data: {
                  fill: "#FF5722",
                  stroke: "#fff",
                  strokeWidth: 2,
                },
              }}
            />
          </VictoryChart>
        </View>
      </View>
    </BoxBg>
  );
};

export default TodoChart;
