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
- **活動資料**：先以靜態 [GeoJSON](https://geojson.org/) 檔案管理，之後視需求再擴充
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

## 貢獻者

詳見 [CONTRIBUTORS.md](./CONTRIBUTORS.md)。

## 授權

本專案採用 [MIT License](./LICENSE)。
