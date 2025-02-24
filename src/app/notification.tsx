import { View } from "react-native"
import { HeaderComponentNot } from "./components/headercomponentnot"
import { Notification } from "./components/notification"

export default function NotificationPage() {
  return (
    <View>
      <HeaderComponentNot />
      <Notification />
    </View>
  )
}