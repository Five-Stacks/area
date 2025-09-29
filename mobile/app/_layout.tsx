import { Stack } from "expo-router";

export default function RootLayout() {
  var isConnected:boolean = true;
  return <Stack>
    {isConnected ?
      (<Stack.Screen name="(tabs)" />)
      : (<Stack.Screen name="(auth)" />)}
  </Stack>;
}
