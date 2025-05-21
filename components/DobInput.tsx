import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function DobInput() {
  const [day, setDay] = useState(Array(2).fill(""));
  const [month, setMonth] = useState(Array(2).fill(""));
  const [year, setYear] = useState(Array(4).fill(""));
  const dayRef = useRef<(TextInput | null)[]>([]);
  const monthRef = useRef<(TextInput | null)[]>([]);
  const yearRef = useRef<(TextInput | null)[]>([]);

  const handleChangeDay = (text: string, i: number) => {
    if (text) {
      const date = [...day];
      date[i] = text;
      setDay(date);

      if (i < 2) {
        dayRef.current[i + 1]?.focus();
      }
    } else if (text === "") {
      const date = [...day];
      date[i] = "";
      setDay(date);
    }
  };

  const handleChangeMonth = (text: string, i: number) => {
    if (text) {
      const date = [...month];
      date[i] = text;
      setMonth(date);
      if (i < 2) {
        monthRef.current[i + 1]?.focus();
      }
    } else if (text === "") {
      const date = [...month];
      date[i] = "";
      setMonth(date);
    }
  };

  const handleChangeYear = (text: string, i: number) => {
    if (text) {
      const date = [...year];
      date[i] = text;
      setYear(date);
      if (i < 4) {
        yearRef.current[i + 1]?.focus();
      }
    } else if (text === "") {
      const date = [...year];
      date[i] = "";
      setYear(date);
    }
  };

  return (
    <View className="w-screen  ">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        What&apos; your date of birth?
      </Text>
      <View className=" mt-[4rem] flex flex-row w-screen gap-[2rem] items-center justify-center">
        <View className=" flex flex-row gap-[1.5rem] ">
          {day.map((el, i: number) => (
            <TextInput
              key={i}
              //@ts-ignore
              ref={(r) => (dayRef.current[i] = r)}
              keyboardType="numeric"
              value={el}
              maxLength={1}
              onChangeText={(text) => handleChangeDay(text, i)}
              className="border-b-2 text-center text-xl font-cinzelBold w-[25px] border-gray-800 placeholder:text-gray-500"
              placeholder="D"
            />
          ))}
        </View>
        <View className="flex flex-row gap-[1rem] ">
          {month.map((el, i: number) => (
            <TextInput
              key={i}
              //@ts-ignore
              ref={(r) => (monthRef.current[i] = r)}
              keyboardType="numeric"
              value={el}
              maxLength={1}
              onChangeText={(text) => handleChangeMonth(text, i)}
              className="border-b-2 text-center text-xl font-cinzelBold w-[25px] border-gray-800"
              placeholder="M"
            />
          ))}
        </View>
        <View className="flex flex-row gap-[1.5rem] text-center">
          {year.map((el, i: number) => (
            <TextInput
              key={i}
              //@ts-ignore
              ref={(r) => (yearRef.current[i] = r)}
              keyboardType="numeric"
              value={el}
              maxLength={1}
              onChangeText={(text) => handleChangeYear(text, i)}
              className="border-b-2 text-center  text-xl font-cinzelBold w-[25px] border-gray-800"
              placeholder="Y"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
