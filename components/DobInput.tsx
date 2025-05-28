import { addDob } from "@/store/createUserSlice";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export default function DobInput() {
  const [day, setDay] = useState(Array(2).fill(""));
  const [month, setMonth] = useState(Array(2).fill(""));
  const [year, setYear] = useState(Array(4).fill(""));

  const [error, setError] = useState("");

  const dayRef = useRef<(TextInput | null)[]>([]);
  const monthRef = useRef<(TextInput | null)[]>([]);
  const yearRef = useRef<(TextInput | null)[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      day.every((d) => d !== "") &&
      month.every((m) => m !== "") &&
      year.every((y) => y !== "")
    ) {
      const dayNum = parseInt(day.join(""), 10);
      const monthNum = parseInt(month.join(""), 10);
      const yearNum = parseInt(year.join(""), 10);
      const currentYear = new Date().getFullYear();

      if (monthNum < 1 || monthNum > 12) {
        setError("Month must be between 1 and 12.");
        return;
      }

      const maxDay = new Date(yearNum, monthNum, 0).getDate();
      if (dayNum < 1 || dayNum > maxDay) {
        setError(`Day must be between 1 and ${maxDay} for month ${monthNum}.`);
        return;
      }

      if (yearNum < 1900 || yearNum > currentYear) {
        setError(`Year must be between 1900 and ${currentYear}.`);
        return;
      }

      setError("");
      dispatch(addDob(`${day.join("")}/${month.join("")}/${year.join("")}`));
    }
  }, [day, month, year, dispatch]);

  const handleChangeDay = (text: string, i: number) => {
    const updatedDay = [...day];
    updatedDay[i] = text;
    setDay(updatedDay);

    if (text && i < day.length - 1) {
      dayRef.current[i + 1]?.focus();
    }
  };

  const handleChangeMonth = (text: string, i: number) => {
    const updatedMonth = [...month];
    updatedMonth[i] = text;
    setMonth(updatedMonth);

    if (text && i < month.length - 1) {
      monthRef.current[i + 1]?.focus();
    }
  };

  const handleChangeYear = (text: string, i: number) => {
    const updatedYear = [...year];
    updatedYear[i] = text;
    setYear(updatedYear);

    if (text && i < year.length - 1) {
      yearRef.current[i + 1]?.focus();
    }
  };

  return (
    <View className="w-screen">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        What&apos;s your date of birth?
      </Text>

      {error ? (
        <Text className="text-red-600 text-center mt-2">{error}</Text>
      ) : null}

      <View className="mt-[4rem] flex flex-row w-screen gap-[2rem] items-center justify-center">
        {/* Day Input */}
        <View className="flex flex-row gap-[1.5rem]">
          {day.map((el, i: number) => (
            <TextInput
              key={i}
              //@ts-ignore
              ref={(r) => (dayRef.current[i] = r)}
              keyboardType="numeric"
              value={el}
              maxLength={1}
              onChangeText={(text) => handleChangeDay(text, i)}
              className="border-b-2 text-center text-xl font-cinzelBold w-[25px] border-gray-800 text-gray-800 placeholder:text-gray-500"
              placeholder="D"
            />
          ))}
        </View>

        <View className="flex flex-row gap-[1rem]">
          {month.map((el, i: number) => (
            <TextInput
              key={i}
              //@ts-ignore
              ref={(r) => (monthRef.current[i] = r)}
              keyboardType="numeric"
              value={el}
              maxLength={1}
              onChangeText={(text) => handleChangeMonth(text, i)}
              className="border-b-2 text-center text-gray-800 placeholder:text-gray-500 text-xl font-cinzelBold w-[25px] border-gray-800"
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
              className="border-b-2 text-center text-gray-800 placeholder:text-gray-500 text-xl font-cinzelBold w-[25px] border-gray-800"
              placeholder="Y"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
