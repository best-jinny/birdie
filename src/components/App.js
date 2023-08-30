import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        // TODO : 유저 정보 가져오기
        setUserObj({
            userId: 1,
            nickname: "스미",
        });
        setInit(true);
    }, []);

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          {init ? (
               <AppRouter userObj={userObj} />
              ) : (
                  "Initializing..."
              )}
      </LocalizationProvider>
  );
}


export default App;
