const API_KEY = "ab818e5ef62443d197f3903307d3ba11";
// This proxy is required for GitHub Pages to work with Donut SMP
const PROXY = "https://corsproxy.io/?";
const API_URL = "https://api.donutsmp.net/v1/auction/recent";

async function fetchAH() {
    try {
        const response = await fetch(PROXY + encodeURIComponent(API_URL), {
            headers: { 'X-API-Key': API_KEY }
        });

        if (!response.ok) throw new Error("API Limit");

        const data = await response.json();
        const table = document.getElementById('live-table'); // Ensure this ID matches your HTML
        table.innerHTML = ""; 

        data.items.forEach(item => {
            const row = `<tr>
                <td>${item.name}</td>
                <td style="color:#00ffcc">$${item.price.toLocaleString()}</td>
                <td>${item.seller}</td>
            </tr>`;
            table.innerHTML += row;
        });
        console.log("Data updated!");
    } catch (err) {
        console.error("Connection failed: ", err);
    }
}

setInterval(fetchAH, 15000); // Refresh every 15 seconds
fetchAH();
