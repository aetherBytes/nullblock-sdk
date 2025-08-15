# Nullblock Documentation

This directory contains the Jekyll-based documentation for Nullblock, which will be hosted on GitHub Pages.

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7+ and Bundler
- Jekyll 4.3+

### Local Development
```bash
# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### GitHub Pages Deployment
1. Push this `docs/` directory to your repository
2. Enable GitHub Pages in repository settings
3. Set source to "Deploy from a branch" and select `main` branch
4. Set folder to `/docs`

## 📁 Structure

```
docs/
├── _config.yml          # Jekyll configuration
├── index.md             # Homepage
├── getting-started.md   # Getting started guide
├── api.md              # API documentation
├── architecture.md     # System architecture
├── agents.md           # Agent development
├── trading.md          # Trading systems
├── development.md      # Development guide
└── assets/             # Images, CSS, JS
```

## 🎨 Customization

### Theme
The documentation uses the Cayman theme by default. You can customize it by:

1. Creating a `_layouts/` directory
2. Overriding theme layouts
3. Adding custom CSS in `assets/css/`

### Navigation
Update the navigation in `_config.yml` under the `nav` section.

## 🔗 Links

- **Live Site**: https://aetherbytes.github.io/nullblock/docs/
- **Repository**: https://github.com/aetherBytes/nullblock
- **Issues**: https://github.com/aetherBytes/nullblock/issues

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `bundle exec jekyll serve`
5. Submit a pull request

## 🚨 Troubleshooting

### Common Issues

**Jekyll not found**
```bash
gem install jekyll bundler
```

**Port already in use**
```bash
bundle exec jekyll serve --port 4001
```

**Build errors**
```bash
bundle exec jekyll build --verbose
```

For more help, check the [Jekyll documentation](https://jekyllrb.com/docs/).
