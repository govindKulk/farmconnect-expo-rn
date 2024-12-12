import { Colors } from "@/constants/Colors";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import { theme } from "@/constants";
import { hp } from "@/helpers";


export default function LogoHeader() {

    const colorScheme = useColorScheme();
    const bgColor = useThemeColor({light: "#ececec", dark: theme.colors.primary}, "background");
    const textColor = useThemeColor({dark: "white", light: theme.colors.primary}, "text");
    return (
        <ThemedView
        style={{
          backgroundColor: bgColor,
          elevation: 5,
          paddingVertical: hp(1.5),
          flexDirection: 'row',
          justifyContent: "center"
        }}
      >
        <ThemedText type='subtitle'
        style={{
          color: textColor,
            fontWeight: "bold",
            fontSize: hp(2.5)
        }}
        >
          FarmConnect
        </ThemedText>
      </ThemedView>
    )
}