import { Variable } from "lucide-react";

function transformBetData(buyRequests, fixtures) {
    return buyRequests.map((request) => {
      const fixture = fixtures[request.fixtureId]
      if (!fixture) {
        return null; // O maneja el caso donde no se encuentra el fixture correspondiente
      }
      const finalValue = fixture.odds[0].values.find(value => value.value === request.betType);
      var finalOdd;
      if (!finalValue) {
        finalOdd = 1;
      } else {
        finalOdd = finalValue.odd;
      }
      
      return {
        id: request._id,
        fixture: {
          teams: {
            home: { name: fixture.teams.home.name },
            away: { name: fixture.teams.away.name }
          },
        //   Usamos la fecha solo con día y hora
          date: new Date(fixture.date).toLocaleString(),
          odds: [{
            values: fixture.odds[0].values.map(value => ({
              value: value.value.toLowerCase(),
              odd: parseFloat(value.odd)
            }))
          }]
        },
        request: {
          betType: request.betType.toLowerCase(),
          quantity: request.quantity,
          price: request.price,
          status: request.status,
          date: new Date(request.createdAt).toLocaleString(),
        },
        ticketLink: request.ticketLink || `https://pdf-bucket-unique-name.s3.us-east-2.amazonaws.com/boletas/compra_${request.uuid}.pdf`,
        // buscamos la odd cuyo value es el mismo betType
        odd: finalOdd,
      };
    }).filter(item => item !== null); // Filtra los elementos nulos
  }

  function calculateStats(betData) {
    // console.log("betData: ", betData);
    let correctCount = 0;
    let wrongCount = 0;
    let pendingCount = 0;
    let totalEarnings = 0;
  
    betData.forEach(bet => {
      if (bet.request.status === 'approved') {
        pendingCount++;
      } else if (bet.request.status !== 'approved' && bet.request.status !== 'pending') {
        if (bet.request.status === 'correct') {
          correctCount++;
          totalEarnings += bet.request.price * bet.odd;
        } else if (bet.request.status === 'wrong') {
          wrongCount++;
        }
      }
    });
  
    const totalCompleted = correctCount + wrongCount;
    const winRate = totalCompleted > 0 ? (correctCount / totalCompleted) * 100 : 0;
    const lossRate = totalCompleted > 0 ? (wrongCount / totalCompleted) * 100 : 0;
  
    return {
      winRate: Math.round(winRate),
      lossRate: Math.round(lossRate),
      pendingBets: pendingCount,
      totalEarnings: Math.round(totalEarnings)
    };
  }
  
export { transformBetData, calculateStats };