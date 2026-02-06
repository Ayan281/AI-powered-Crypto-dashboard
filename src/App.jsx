import React, { useState } from "react";
import HomePage from "./Components/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import AiPrediction from "./Components/Pages/AiPrediction";
import DashBoard from "./Components/Pages/DashBoard";
import Graph from "./Components/Pages/Graph";
import Captcha from "./Components/Pages/Captcha";
import Community from "./Components/Pages/Community";

const App = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  const [data, setData] = useState([]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isVerified={isVerified}
              setShowCaptcha={setShowCaptcha}
              setPendingRoute={setPendingRoute}
            />
          }
        ></Route>
        <Route path="/aiprediction" element={<AiPrediction />}></Route>
        <Route
          path="/dashboard"
          element={
            <DashBoard
              data={data}
              setData={setData}
              isVerified={isVerified}
              setShowCaptcha={setShowCaptcha}
              setPendingRoute={setPendingRoute}
            />
          }
        ></Route>
        <Route
          path="/dashboard/graph/:id"
          element={<Graph data={data} />}
        ></Route>
        {/* <Route path ="/captcha"  element={<Captcha />}></Route> */}
        <Route path="/community" element={<Community />}></Route>
      </Routes>

      {showCaptcha && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
          <Captcha
            onVerified={() => {
              setIsVerified(true);
              setShowCaptcha(false);
              navigate(pendingRoute || "/dashboard");
            }}
            onClose={() => setShowCaptcha(false)}
          />
        </div>
      )}
    </div>
  );
};

export default App;
