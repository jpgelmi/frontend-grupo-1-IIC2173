import { getFixtureById, postSendRequestToBroker } from '../../api/axios.js';

export const formatDateToUTC = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num);
  
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds} UTC`;
  };

export const createBrokerRequest = async (token, request) => {
    console.log('Request to broker', request);
    const fixture = await getFixtureById(token, request.fixtureId);

    const teamName = request.betType === 'Home' ? fixture.teams.home.name : request.betType === 'Away' ? fixture.teams.away.name : '---';
    console.log('teamName', teamName);
    console.log("request", request.requestId    );    
    const params = {
        "request_id": request.requestId,
        "group_id": 1,
        "fixture_id": request.fixtureId,
        "league_name": fixture.league.name,
        "round": fixture.league.round,
        "date": fixture.date,
        "result": teamName,
        "deposit_token": "",
        "datetime": formatDateToUTC(new Date()),
        "quantity": request.numBonds,
        "seller": 0
    }
    await postSendRequestToBroker(token, params);
};
