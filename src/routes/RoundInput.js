import { DateTimePicker } from "@mui/x-date-pickers";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

//const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://3.36.163.39:8080";

function formatDate(value) {
    const arrDayStr = ['일','월','화','수','목','금','토'];
    const date = new Date(value);

    return (date.getMonth()+1)+'월 '+date.getDate()+'일 ('+arrDayStr[date.getDay()]+')';
}

function formatTime(value) {
    const teeTime = new Date(value);
    const hour = teeTime.getHours();
    const minute = teeTime.getMinutes();

    return hour + ":" + minute;
}

const RoundInput = () => {

    const navigate = useNavigate();

    const [roundDateTime, setRoundDateTime] = useState();
    const [userInput, setUserInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [golfcId, setGolfcId] = useState();

    console.log(formatDate(roundDateTime));

    const onChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchGolfc();
        }
    }

    const searchGolfc = () => {
        axios.get(`${BASE_URL}/golfc/search-golfc?searchValue=${userInput}`)
            .then(response => setSearchResult(response.data))
            .catch(error => console.log(error));
    }

    const selectGolfc = (e) => {
       setGolfcId(e.target.value);
    }

    const insertRoundInfo = () => {
        const data = {
            "date" : formatDate(roundDateTime),
            "time" : formatTime(roundDateTime),
            "golfcId" : golfcId,
            "userId" : 1
        };

        axios.post(`${BASE_URL}/round`, data)
            .then( response => { console.log(response) })
            .catch( error => { console.log(error) })

        navigate(-1);

    }



    return (
        <>
        <DateTimePicker onChange={(newValue) => {setRoundDateTime(newValue)}}></DateTimePicker>
        <input type="text" placeholder="골프장을 입력하세요" value={userInput} onChange={onChange} onKeyDown={handleKeyDown} maxLength={20} />
        <button type="button" onClick={searchGolfc}>검색</button>
        {searchResult && (
            searchResult.map((golfc) => {
                return (
                    <li key={golfc.golfcId}> {golfc.golfcNm} <button value={golfc.golfcId} onClick={selectGolfc}>선택</button></li>

                )
            })
        )}
        <button type="button" onClick={insertRoundInfo} disabled={!roundDateTime || !golfcId}>라운드 일정 등록</button>

        </>
    )

}

export default RoundInput;