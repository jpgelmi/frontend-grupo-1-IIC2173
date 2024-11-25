export const mockStats = {
    winRate: 65,
    lossRate: 30,
    pendingBets: 5,
    totalEarnings: 12500,
  };
  
  export const mockBets = [
    {
      id: '1',
      fixture: {
        teams: {
          home: { name: 'Real Madrid' },
          away: { name: 'Barcelona' }
        },
        date: '2024-03-10',
        odds: [{
          values: [
            { value: 'home', odd: 1.75 },
            { value: 'draw', odd: 3.50 },
            { value: 'away', odd: 4.25 }
          ]
        }]
      },
      request: {
        betType: 'home',
        quantity: 2,
        price: 100,
        status: 'won'
      },
      ticketLink: 'https://example.com/ticket/1'
    },
    {
      id: '2',
      fixture: {
        teams: {
          home: { name: 'Manchester City' },
          away: { name: 'Liverpool' }
        },
        date: '2024-03-09',
        odds: [{
          values: [
            { value: 'home', odd: 2.10 },
            { value: 'draw', odd: 3.25 },
            { value: 'away', odd: 3.50 }
          ]
        }]
      },
      request: {
        betType: 'away',
        quantity: 1,
        price: 150,
        status: 'lost'
      },
      ticketLink: 'https://example.com/ticket/2'
    },
    {
      id: '3',
      fixture: {
        teams: {
          home: { name: 'PSG' },
          away: { name: 'Bayern Munich' }
        },
        date: '2024-03-15',
        odds: [{
          values: [
            { value: 'home', odd: 2.50 },
            { value: 'draw', odd: 3.40 },
            { value: 'away', odd: 2.80 }
          ]
        }]
      },
      request: {
        betType: 'home',
        quantity: 3,
        price: 200,
        status: 'pending'
      },
      ticketLink: 'https://example.com/ticket/3'
    },
    {
      id: '4',
      fixture: {
        teams: {
          home: { name: 'AC Milan' },
          away: { name: 'Inter Milan' }
        },
        date: '2024-03-08',
        odds: [{
          values: [
            { value: 'home', odd: 2.90 },
            { value: 'draw', odd: 3.20 },
            { value: 'away', odd: 2.45 }
          ]
        }]
      },
      request: {
        betType: 'home',
        quantity: 1,
        price: 120,
        status: 'rejected'
      },
      ticketLink: 'https://example.com/ticket/4'
    }
  ];