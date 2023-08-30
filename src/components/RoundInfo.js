function RoundInfo({ rounds }) {

    return (
        rounds.map((round) => (
            <div key={round.roundId}>
                    <p>{round.date} {round.time}</p>
                    <h3>{round.golfcNm}</h3>
                    <p>날씨정보</p>
            </div>
        ))
    );
}

export default RoundInfo;