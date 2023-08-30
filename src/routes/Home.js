import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoundInfo from "../components/RoundInfo";
import {Button} from "@mui/material";
import axios from "axios";

//const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://3.36.163.39:8080";

const Home = ({userObj}) => {

    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        // TODO : 예정된 라운드 목록 조회
        axios.get(`${BASE_URL}/round?userId=${userObj.userId}`)
            .then(response => setRounds(response.data))
            .catch(error => console.log(error));

    }, []);

    return (
        <div>
            <p> {userObj.nickname} 님의 다가오는 라운드</p>
            {/* TODO : 라운드 예약 정보 + 일기에보 */}
            {rounds ? (<RoundInfo rounds={rounds}/>) :
                (<p>예정된 라운드가 없습니다.</p>)
            }
            <Link to="/roundInput">다음 라운드를 입력하세요</Link>
        </div>
    );
}

export default Home;