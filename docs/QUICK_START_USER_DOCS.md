# 🎯 Quick Start - Accessing the User Documentation

## For End Users

### Online (when deployed)
Visit: **https://five-stacks.github.io/area/user-guide/overview**

### Local Development

1. Navigate to docs folder:
```bash
cd docs
```

2. Install dependencies (first time only):
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Open in browser:
```
http://localhost:3000/user-guide/overview
```

## Documentation Structure

```
📚 User Guide
├── 📖 Overview - Start here!
├── 🎯 Creating AREAs - Step-by-step creation guide
├── ⚙️ Managing AREAs - Edit, delete, monitor
├── 🖥️ Web Application - Complete web guide
├── 📱 Mobile Application - iOS & Android guide
├── 🔌 Available Services - Service catalog
├── 💡 Example Workflows - 18 real examples
└── ❓ FAQ - 60+ common questions
```

## Quick Links

- **New User?** → Start with [Overview](/user-guide/overview)
- **Create First AREA?** → Go to [Creating AREAs](/user-guide/creating-areas)
- **Need Help?** → Check [FAQ](/user-guide/faq)
- **Looking for Examples?** → See [Example Workflows](/user-guide/examples)
- **Service Info?** → Browse [Available Services](/user-guide/services)

## Navigation Tips

### In Docusaurus:
1. **Top navbar** → Select "User Guide"
2. **Left sidebar** → Browse all 8 guides
3. **Search (Ctrl/Cmd+K)** → Find anything quickly
4. **Right sidebar** → Jump to sections within page

### Direct URLs:
- `/user-guide/overview` - Main entry
- `/user-guide/creating-areas` - Creation guide
- `/user-guide/managing-areas` - Management guide
- `/user-guide/web-app` - Web platform
- `/user-guide/mobile-app` - Mobile apps
- `/user-guide/services` - Service catalog
- `/user-guide/examples` - Workflow examples
- `/user-guide/faq` - FAQ

## For Developers

### Testing Documentation

```bash
# Start dev server
cd docs && npm start

# Build for production
cd docs && npm run build

# Serve production build
cd docs && npm run serve
```

### Adding Screenshots

1. Read `/docs/static/img/user-guide/README.md`
2. Take screenshots per specifications
3. Save in `/docs/static/img/user-guide/`
4. Verify paths in documentation match

### Contributing

See `/docs/docs/user-guide/README.md` for:
- Writing style guide
- Contribution guidelines
- Maintenance procedures

## Support

- 📖 Documentation: `/docs/docs/user-guide/`
- 🐛 Issues: GitHub Issues
- 💬 Questions: Discord community
- 🔧 API Docs: `/api/overview`

---

**Happy documenting! 📚✨**
