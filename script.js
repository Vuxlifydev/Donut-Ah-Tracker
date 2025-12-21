const API_TOKEN = "ab818e5ef62443d197f3903307d3ba11";
const PROXY = "https://corsproxy.io/?";

const apiFetch = async (endpoint) => {
    const url = `${PROXY}${encodeURIComponent("https://api.donutsmp.net/v1" + endpoint)}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    return await response.json();
};

async function updateDashboard() {
    try {
        // 1. Fetch Auction Transactions
        const ahData = await apiFetch("/auction/transactions/0");
        const table = document.getElementById('live-table');
        table.innerHTML = ahData.map(tx => `
            <tr>
                <td style="font-weight:600">${tx.itemName}</td>
                <td style="color:#3b82f6">$${tx.price.toLocaleString()}</td>
                <td style="color:#888">${tx.buyer || 'Unknown'}</td>
            </tr>
        `).join('');

        // 2. Fetch Leaderboard for Player Count (Example)
        // Note: You can replace this with a dedicated server status endpoint if available
        document.getElementById('player-count').innerText = "27,057"; 

    } catch (err) {
        console.error("Dashboard Sync Error:", err);
    }
}

// Initial update and auto-refresh
updateDashboard();
setInterval(updateDashboard, 30000);
