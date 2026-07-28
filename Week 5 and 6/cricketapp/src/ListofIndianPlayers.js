import { IndianPlayers } from "./IndianPlayers";

function ListofIndianPlayers() {
    return (
        <div>
            <h2>Merged Indian Players</h2>
            <ul>
                {IndianPlayers.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListofIndianPlayers;