import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

type RouteName = "find" | "matches" | "profile";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const icons = {
    find: (props: any) => <SimpleLineIcons size={28} name="ghost" {...props} />,
    matches: (props: any) => (
      <Ionicons size={28} name="chatbubbles-outline" {...props} />
    ),
    profile: (props: any) => (
      <View
        style={{
          backgroundColor: props.color,
          width: 28,
          height: 28,
          borderRadius: 9999,
        }}
      />
    ),
  };

  return (
    <View className="absolute bottom-[15px] right-0 left-0  mx-5 bg-gray-900 px-8 flex flex-row items-center justify-between py-3 rounded-full shadow-xl shadow-black/30">
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //     ? options.title
        //     : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const routeName = route.name as RouteName;

        return (
          <TouchableOpacity
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="py-2 px-1"
          >
            {icons[routeName]({
              color: isFocused ? "#C084FC" : "white",
            })}
            {/* <Text
              className={`${isFocused ? "text-purple-950" : "text-gray-800"}`}
            >
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
