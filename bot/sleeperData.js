import SleeperAPI from "./sleeper.js";
import Player from "./player.js";
const sleeper = new SleeperAPI();

class League {
    constructor(leagueId) {
        this.leagueId = leagueId;
        this.transactions = [];
        this.rosters = [];
        this.users = [];
        this.players = Player.find();
    }

    getLeagueTransactions = async () => {
        this.transactions = await sleeper.getLeagueTransactions(this.leagueId);

    }
}

export default League;