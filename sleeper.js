import axios from 'axios';

class SleeperAPI {
     api =  axios.create({
                baseURL: 'https://api.sleeper.app/v1',
            });;

     getNflState = async () => {
        try {
            const response = await api.get('/state/nfl');
            if(response.data) {
                const nflState = JSON.parse(response.data);
                return nflState;
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
            const response = await api.get(`/league/${leagueId}/transactions/${nflState.week}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return 'Error getting league transactions';
        }
    }

        getPlayers = async (leagueId) => {
        try {
            const response = await api.get(`/league/${leagueId}/rosters`);
            return response.data;
        } catch (error) {
            console.error(error);
            return 'Error getting league rosters';
        }

    }


}

export default SleeperAPI;