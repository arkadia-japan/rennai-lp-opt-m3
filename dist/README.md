# メルマガ獲得LP - THE ONLY ONE

## 概要

「令和の恋愛法則」メルマガ獲得用ランディングページ。参照デザインに基づき、ピクセル単位で再現した高速・レスポンシブLPです。

## ディレクトリ構成

```
dist/
├── index.html          # メインLP
├── thanks.html         # サンクスページ
├── css/
│   └── style.css       # スタイルシート
├── js/
│   └── main.js         # フォーム処理・計測タグ
├── img/                # 画像資産
└── README.md           # このファイル
```

## 特徴

### ✅ 実装済み機能

- **ビルド不要**: 素のHTML/CSS/JavaScriptで構成
- **レスポンシブ対応**: 360px〜デスクトップまで最適化
- **フォームバリデーション**: RFC準拠のメールバリデーション
- **計測タグ**: Google Analytics & Meta Pixel 実装済み
- **カスタムイベント**: CTA クリック、フォーム送信、コンバージョン追跡
- **アクセシビリティ**: ARIA属性、キーボード操作、コントラスト基準対応
- **パフォーマンス最適化**:
  - 遅延読み込み準備
  - Web フォント最適化
  - CSS/JS 最小化準備済み
- **固定フッターCTA**: スクロール連動の固定CTA
- **カウントダウンタイマー**: 24時間限定表示

### 🎨 デザイン仕様

- **配色**:
  - メイン: `#1a3a52` (濃紺)
  - アクセント: `#b79f6e` (ゴールド)
  - CTA: `#c22c0e` (レッド)
- **タイポグラフィ**: Noto Sans JP (Google Fonts)
- **レイアウト**:
  - コンテナ最大幅: 1200px
  - セクション padding: 100px (デスクトップ) / 60px (モバイル)

## セットアップ

### 1. 計測タグの設定

`index.html` と `thanks.html` の `<body>` タグに計測IDを設定:

```html
<body data-gtm-id="GTM-XXXXXXX" data-fb-pixel-id="XXXXXXXXXX">
```

### 2. API エンドポイントの設定

`dist/js/main.js` の API エンドポイントを実際のエンドポイントに変更:

```javascript
const response = await fetch('https://example.com/api/subscribe', {
    method: 'POST',
    // ...
});
```

### 3. 画像の追加

`dist/img/` ディレクトリに以下の画像を追加（オプション）:

- ロゴ画像
- プロフィール画像
- セクション背景画像

### 4. ローカルテスト

シンプルなHTTPサーバーで起動:

```bash
cd dist
python3 -m http.server 8000
# または
npx serve
```

ブラウザで `http://localhost:8000` を開く。

## フォーム仕様

### 必須フィールド

- **email**: RFC準拠のメールアドレス

### 任意フィールド

- **name**: ユーザー名

### Hidden フィールド (URLパラメータから自動取得)

- campaign_id
- ad_set
- gclid (Google広告)
- fbclid (Meta広告)
- utm_source
- utm_medium
- utm_campaign

### 送信処理

1. クライアントサイドバリデーション
2. API POST リクエスト (JSON形式)
3. 成功時: `/thanks.html` に遷移
4. エラー時: インラインエラー表示

## 計測イベント

### 自動トラッキング

- `PageLoad`: ページ表示時
- `PageView`: Meta Pixel標準イベント

### カスタムイベント

- `CTAClick`: CTAボタンクリック時
  - location: `hero`, `middle`, `fixed-footer`
- `FormSubmit`: フォーム送信時
- `Conversion`: コンバージョン成功時
- `FormError`: フォーム送信エラー時
- `ThankYouPage`: サンクスページ表示時

## レスポンシブブレークポイント

- **デスクトップ**: 1200px以上
- **タブレット**: 768px〜1199px
- **スマートフォン**: 360px〜767px

## パフォーマンス最適化

### 推奨事項

1. **画像最適化**:
   - WebP形式に変換
   - 適切なサイズにリサイズ
   - `loading="lazy"` 属性を追加

2. **CSS/JS 最小化**:
   ```bash
   # CSS minify
   npx clean-css-cli -o style.min.css style.css

   # JS minify
   npx terser main.js -o main.min.js
   ```

3. **HTTP/2 & Gzip圧縮**: サーバー側で有効化

4. **CDN配信**: 静的アセットをCDNで配信

### Lighthouse スコア目標

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## アクセシビリティ

- セマンティックHTML
- ARIA属性
- キーボードナビゲーション対応
- コントラスト比準拠 (WCAG AA)
- フォーカス表示
- スクリーンリーダー対応

## ブラウザ対応

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari (iOS 14+)
- Android Chrome (Android 10+)

## デプロイ

### 静的ホスティング

以下のサービスで簡単にデプロイ可能:

- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

### デプロイ手順 (Netlify例)

1. Netlify にログイン
2. `dist` フォルダをドラッグ&ドロップ
3. カスタムドメイン設定
4. SSL証明書自動発行

## カスタマイズ

### 配色変更

`dist/css/style.css` のカラー変数を変更:

```css
/* メインカラー */
#1a3a52 → 任意の色

/* アクセントカラー */
#b79f6e → 任意の色

/* CTAカラー */
#c22c0e → 任意の色
```

### コンテンツ編集

`dist/index.html` のテキストを直接編集。

### レイアウト変更

`dist/css/style.css` の該当セクションを編集。

## トラブルシューティング

### フォームが送信できない

1. API エンドポイントが正しいか確認
2. CORS設定を確認
3. ブラウザのコンソールでエラーチェック

### 計測タグが動作しない

1. GTM ID / FB Pixel ID が正しく設定されているか確認
2. 広告ブロッカーを無効化して再テスト
3. Network タブで gtag.js / fbevents.js の読み込みを確認

### レイアウトが崩れる

1. ブラウザのキャッシュをクリア
2. CSS ファイルが正しく読み込まれているか確認
3. 異なるブラウザでテスト

## ライセンス

このプロジェクトは許諾済みデザインに基づいて構築されています。

## サポート

問題が発生した場合は、開発チームまでお問い合わせください。

---

**最終更新日**: 2025年9月30日