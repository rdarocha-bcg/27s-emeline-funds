# 🎂 Émeline's Birthday Fund

A modern and elegant online fundraising platform for Émeline's birthday, connected to Google Sheets in real-time.

## ✨ Features

- 📊 **Real-time tracking** of contributions via Google Sheets
- 🎨 **Modern design** with animations and visual effects
- 📱 **100% responsive** for all devices
- 🔄 **Auto-refresh** every minute
- 🔒 **Privacy-focused** (names only, no individual amounts displayed)
- 🌙 **Dark mode** support based on system preferences
- 📸 **Personalized** with Émeline's photo as background and avatar

## 📁 Project Structure

```
27s-emeline-funds/
├── index.html          # Main HTML page
├── css/
│   └── styles.css      # Complete CSS styles
├── js/
│   └── script.js       # JavaScript logic
├── images/
│   └── emeline.jpg     # Émeline's photo
└── README.md          # Documentation
```

## 🚀 Deployment

The site is automatically deployed on GitHub Pages:
**https://rdarocha-bcg.github.io/27s-emeline-funds/**

## ⚙️ Google Sheets Configuration

1. **Required columns** in the sheet:
   - `Nom` : Participant name
   - `Montant` : Contribution amount
   - `Date` : Contribution date (filled automatically)

2. **Public access** : The sheet must be publicly accessible to work

3. **Share settings** : Either publish to web or share with "Anyone with the link" 

## 🛠️ Tech Stack

- **HTML5** : Semantic structure
- **CSS3** : Animations, gradients, responsive design
- **JavaScript ES6+** : Modern application logic
- **PapaParse** : Real-time CSV parsing
- **Google Sheets API** : Data source
- **GitHub Pages** : Hosting platform

## 📊 Current Data

- **Total collected** : 115 €
- **Participants** : 4 people
- **Last update** : Real-time

## 🎨 Design Features

- **Animated background** with Émeline's photo
- **Gradient overlays** for better readability
- **Smooth animations** and micro-interactions
- **Glassmorphism** design elements
- **Interactive hover effects**
- **Mobile-first** responsive design

## 🔧 Development

### Local Testing
1. Clone the repository
2. Open `index.html` in a modern browser
3. Ensure Google Sheets is publicly accessible

### Customization
- Modify `SHEET_ID` in `js/script.js` for different sheets
- Update colors in `css/styles.css`
- Replace photo in `images/` folder

## 📱 Social Media Integration

- **Open Graph** meta tags for beautiful link previews
- **Twitter Cards** support
- **Custom preview image** using Émeline's photo

---

Made with ❤️ for Émeline's birthday 🎂 