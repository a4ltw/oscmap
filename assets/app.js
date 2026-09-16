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

function formatDateShort(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
}

function monthKey(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key) {
  const [year, month] = key.split('-');
  return `${year} 年 ${Number(month)} 月`;
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

function groupByMonth(features) {
  const groups = new Map();
  const sorted = [...features].sort(
    (a, b) => new Date(a.properties.start) - new Date(b.properties.start)
  );
  for (const feature of sorted) {
    const key = monthKey(feature.properties.start);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(feature);
  }
  return groups;
}

function renderTimeline(features, markersById) {
  const container = document.getElementById('timeline-list');
  container.innerHTML = '';

  const groups = groupByMonth(features);

  for (const [key, monthFeatures] of groups) {
    const section = document.createElement('div');
    section.className = 'timeline-month';

    const heading = document.createElement('h2');
    heading.textContent = monthLabel(key);
    section.appendChild(heading);

    for (const feature of monthFeatures) {
      const p = feature.properties;
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'timeline-item';
      item.innerHTML = `
        <span class="date">${escapeHtml(formatDateShort(p.start))}</span>
        <span class="name">${escapeHtml(p.name)}</span>
      `;
      item.addEventListener('click', () => {
        const marker = markersById.get(p.id);
        if (!marker) return;
        map.flyTo(marker.getLatLng(), 13);
        marker.openPopup();

        document
          .querySelectorAll('.timeline-item.active')
          .forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
      });
      section.appendChild(item);
    }

    container.appendChild(section);
  }
}

fetch('data/events.geojson')
  .then((res) => res.json())
  .then((geojson) => {
    const markersById = new Map();

    L.geoJSON(geojson, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(popupContent(feature.properties));
        markersById.set(feature.properties.id, layer);
      }
    }).addTo(map);

    renderTimeline(geojson.features, markersById);
  })
  .catch((err) => {
    console.error('讀取活動資料失敗', err);
  });
