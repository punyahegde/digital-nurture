function ListofPlayers(props) {
    return (
        <ul>
            {props.players.map((item, index) => (
                <li key={index}>
                    Mr. {item.name} {item.score}
                </li>
            ))}
        </ul>
    );
}

export default ListofPlayers;