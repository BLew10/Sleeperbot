import axios from 'axios';

export class SleeperAPI {
     api =  axios.create({
                baseURL: 'https://api.sleeper.app/v1',
            });;

    getWeek = async () => {
        try {
            const response = await this.api.get('/state/nfl');
            if(response.data) {
                const nflState = response.data;
                return nflState.week.toString();
            }
            else
                return null;
        } catch (error) {
            console.error(error);
        }
    }
     getLeagueTransactions = async (leagueId) => {
        try {
            const nflState = await this.getNflState();
            nflState.week = nflState.week > 0 ? nflState.week : 1;
            const response = await this.api.get(`/league/${leagueId}/transactions/${nflState.week}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return 'Error getting league transactions';
        }
    }

        getPlayers = async (leagueId) => {
        try {
            const response = await this.api.get(`/league/${leagueId}/rosters`);
            return response.data;
        } catch (error) {
            console.error(error);
            return 'Error getting league rosters';
        }

    }


}