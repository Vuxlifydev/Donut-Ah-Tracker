const KEY = "ab818e5ef62443d197f3903307d3ba11";
// We use a proxy to bypass browser security errors (CORS)
const PROXY = "https://corsproxy.io/?";
const API_URL = "https://api.donutsmp.net/v1/auction/transactions/0";

async function updateAH() {
    const statusText = document.getElementById('status-text');
    const statusLine = document.querySelector('.status-line');

    try {
        // Adding the proxy to the front of the URL fixes the "Error"
        const res = await fetch(PROXY + encodeURIComponent(API_URL), {
            headers: {
                'X-API-Key': KEY,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) throw new Error("API Offline or Key Invalid");

        const data = await res.json();
        const search = document.getElementById('searchInput').value.toLowerCase();
        const body = document.getElementById('live-body');

        body.innerHTML = "";

        // Donut SMP returns 'transactions' or 'items' depending on version
        const items = data.transactions || data.items || [];

        items.forEach(item => {
            const itemName = item.itemName || item.name || "Unknown Item";
            if (itemName.toLowerCase().includes(search)) {
                const row = document.createElement('tr');
                const price = item.price || 0;
                const isExpensive = price > 1000000;

                row.innerHTML = `
                    <td style="color:#555">${new Date().toLocaleTimeString()}</td>
                    <td style="color:#fff">${itemName}</td>
                    <td style="color:${isExpensive ? '#ff4444' : '#00ffcc'}">$${price.toLocaleString()}</td>
                    <td>${item.seller || '---'} <span style="color:#333">-></span> ${item.buyer || '---'}</td>
                `;
                body.appendChild(row);
            }
        });

        statusText.innerText = "ONLINE";
        statusLine.classList.add('online');

    } catch (e) {
        console.error(e);
        statusText.innerText = "ERROR: BROWSER BLOCKED CONNECTION";
        statusText.style.color = "red";
    }
}

// Refresh every 15 seconds
setInterval(updateAH, 15000);
updateAH();