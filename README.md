# oscmap

以地圖方式整合台灣（及其他地區）開源社群活動資訊的 side project。

## 專案目標

用地圖呈現各地開源社群的活動資訊（聚會、工作坊、年會等），讓大家可以直覺地找到「附近最近有什麼開源活動」。

- 地圖呈現方式參考 [OpenStreetMap](https://www.openstreetmap.org/)
- 所有使用的工具與資源以**開源**為原則
- 專案會持續在這裡聲明使用了哪些工具、資源，以及貢獻者名單（見下方）

## 技術棧（初版規劃）

- **地圖前端**：[Leaflet.js](https://leafletjs.com/)
- **地圖底圖資料**：[OpenStreetMap](https://www.openstreetmap.org/)
- **活動資料**：先以靜態 [GeoJSON](https://geojson.org/) 檔案管理，格式詳見 [`data/SCHEMA.md`](./data/SCHEMA.md)，資料放在 [`data/events.geojson`](./data/events.geojson)，之後視需求再擴充
- **部署**：GitHub Pages（純靜態、免開源授權疑慮）

## 使用的工具與資源（Attribution）

本專案是開源專案，也建立在其他開源工具與資料之上，特此聲明：

| 名稱 | 用途 | 授權 |
|---|---|---|
| [OpenStreetMap](https://www.openstreetmap.org/) | 地圖底圖資料 | [ODbL](https://opendatacommons.org/licenses/odbl/) |
| [Leaflet.js](https://leafletjs.com/) | 地圖前端函式庫 | BSD-2-Clause |
| [GitHub Pages](https://pages.github.com/) | 靜態網站部署 | — |

> 使用 OpenStreetMap 底圖時，頁面上會依規定顯示 `© OpenStreetMap contributors` 版權標示。

隨著專案發展新增其他工具或資料來源時，會持續更新這份清單。

## 本機執行

純靜態網頁，不需要建置工具，但因為頁面用 `fetch` 讀取 `data/events.geojson`，瀏覽器會擋 `file://` 的請求，所以要透過本機伺服器打開：

```bash
python3 -m http.server 8765
```

然後瀏覽器開 `http://localhost:8765` 即可看到地圖。

## 參考資料來源（Reference）

開工前有先搜尋過是否已有類似專案，目前還沒看到「用地圖整合台灣開源社群活動」的網站。以下是調查過程中找到的相關社群名單、目錄與活動平台，之後會作為蒐集社群活動資料的參考來源，在此一併聲明出處：

| 名稱 | 說明 |
|---|---|
| [開源社群推廣目錄 - SITCON (HackMD)](https://hackmd.io/@SITCON/floss-community-list) | 文字形式的開源社群目錄 |
| [臺灣自由/開源軟硬體社群列表 - MindMeister](https://www.mindmeister.com/zh/303031964/open-source-community-map-in-taiwan) | 以心智圖整理的台灣開源社群列表 |
| [社群夥伴 - 開放文化基金會 (OCF)](https://ocf.tw/p/community) | OCF 支持的開源社群清單 |
| [COSCUP 官網 - 社群](https://coscup.org/2026/community/) | 台灣開源人年會，社群串連頁面 |
| [COSCUP - Wikipedia](https://en.wikipedia.org/wiki/COSCUP) | COSCUP 背景介紹 |
| [OpenStreetMap Taiwan 開放街圖台灣](https://osm.tw/) | OSM 在台灣的社群與資料 |
| [OpenStreetMap US - Events](https://openstreetmap.us/events/) | 國外 OSM 社群的活動整理方式，可作為參考範例 |

## 貢獻者

詳見 [CONTRIBUTORS.md](./CONTRIBUTORS.md)。

## 授權

本專案採用 [MIT License](./LICENSE)。
