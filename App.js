import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";

const Stack = createStackNavigator();

function App() {
  return (
      <Home/>
  );
}

export default App;