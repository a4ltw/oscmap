const TAIWAN_CENTER = [23.6978, 120.9605];

const map = L.map('map').setView(TAIWAN_CENTER, 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('zh-TW', { dateStyle: 'medium', timeStyle: 'short' });
}

function popupContent(properties) {
  const p = properties;
  const community = (p.community || []).join('、');
  const timeRange = p.end
    ? `${formatDateTime(p.start)} - ${formatDateTime(p.end)}`
    : formatDateTime(p.start);

  return `
    <div class="event-popup">
      <strong>${escapeHtml(p.name)}</strong><br>
      社群：${escapeHtml(community)}<br>
      時間：${escapeHtml(timeRange)}<br>
      地點：${escapeHtml(p.location_name)}<br>
      ${p.url ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer">活動連結</a>` : ''}
    </div>
  `;
}

fetch('data/events.geojson')
  .then((res) => res.json())
  .then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(popupContent(feature.properties));
      }
    }).addTo(map);
  })
  .catch((err) => {
    console.error('讀取活動資料失敗', err);
  });
