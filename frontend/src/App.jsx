import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Signup, SignIn, NonAuthPage } from './pages/index';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Routes>
        {console.log("from app.jsx")}
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/signin" element={<SignIn></SignIn>} />
        <Route path="/*" element={<NonAuthPage></NonAuthPage>} />
      </Routes>
    </div>
  );
};

export default App;
