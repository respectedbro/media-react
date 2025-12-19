import UserProfile from '@/profile/screens/UserProfile.tsx';
import {Navigate, Route, Routes} from "react-router-dom";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Navigate to={"/profile"}/> }/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/profile/:uid" element={<UserProfile/>}/>
      </Routes>

  )
}

export default App
