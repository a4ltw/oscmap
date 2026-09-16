# 活動資料格式（GeoJSON Schema）

`data/events.geojson` 是一個標準 [GeoJSON `FeatureCollection`](https://geojson.org/)，每一筆活動是一個 `Feature`。

## 檔案結構

```json
{
  "type": "FeatureCollection",
  "features": [ /* 一個個活動 Feature */ ]
}
```

## 單一活動 Feature 格式

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [121.6167, 25.0553]
  },
  "properties": {
    "id": "coscup-2026",
    "name": "COSCUP 2026 x UbuCon Asia",
    "community": ["COSCUP", "UbuCon Asia"],
    "description": "台灣開源人年會，開放原始碼開發者、使用者與推廣者的年度盛會。",
    "start": "2026-08-08T09:00:00+08:00",
    "end": "2026-08-09T18:00:00+08:00",
    "location_name": "台北南港展覽館",
    "address": "台北市南港區經貿二路 1 號",
    "url": "https://coscup.org/2026/",
    "tags": ["conference", "open-source"],
    "source": "https://coscup.org/2026/community/"
  }
}
```

## 欄位說明

**`geometry.coordinates`**

⚠️ GeoJSON 規範座標順序是 **`[經度, 緯度]`**（`[longitude, latitude]`），跟一般口語習慣的「緯度在前」相反，寫資料時要特別注意，不然地圖上的點會跑到錯的地方。

**`properties`**

| 欄位 | 必填 | 型別 | 說明 |
|---|---|---|---|
| `id` | ✅ | string | 唯一識別碼，建議用 `社群縮寫-年份` 或 `社群縮寫-YYYYMMDD` 格式 |
| `name` | ✅ | string | 活動名稱 |
| `community` | ✅ | string[] | 主辦/協辦社群，可多個 |
| `description` | | string | 活動簡介 |
| `start` | ✅ | string (ISO 8601) | 開始時間，含時區，例：`2026-08-08T09:00:00+08:00` |
| `end` | | string (ISO 8601) | 結束時間；單一時間點活動可省略 |
| `location_name` | ✅ | string | 地點名稱（例：台北南港展覽館） |
| `address` | | string | 詳細地址 |
| `url` | | string | 活動官方連結（報名頁、官網等） |
| `tags` | | string[] | 分類標籤，例：`conference`、`meetup`、`hackathon`、`workshop` |
| `source` | ✅ | string | 這筆資料的來源連結，方便回頭核對／更新 |

## 命名與資料原則

- 每筆資料都要能追溯到 `source`，不憑印象填資料
- 座標盡量用實際場地的經緯度（可從 Google Maps 或 [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) 查詢），避免用縣市中心點隨便代替
- 已結束的活動先保留在資料裡（之後可以在前端依日期篩選未來/歷史活動），不要直接刪除
