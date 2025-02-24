import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Stack} from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: 'White',
        tabBarStyle: { backgroundColor: '#1976D2' }, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color='white' />, 
        }}
      />
      <Tabs.Screen
        name="view"
        options={{
          title: 'View',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="info" color='white' />, 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color='white' />, 
        }}
      />
      
    </Tabs>
  );
}
