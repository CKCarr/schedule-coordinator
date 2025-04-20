# 🗓️ Patient Schedule Coordinator

A visual patient schedule building dashboard using Excel uploads. Built with **React**, **Material Tailwind**, and **Vite**.

## ⚙️ Features

- 📁 Drag-and-drop Excel file upload
- 🧑‍⚕️ Filter patients by Provider
- 🏥 Group patients by ALF (Assisted Living Facility)
- 📊 Metrics per provider and facility
- 📋 Sortable scheduling table
- ✅ Auto-mark "Needs Scheduling" if last seen > 30 days
- ✅ Telehealth eligibility indicators

## Getting Started

```bash
git clone https://github.com/ckcarr/schedule-coordinator.git
cd schedule-coordinator
npm install
npm run dev
```

📦 Build for Production

``` bash

npm run build
📄 Excel Format
To work properly, your uploaded Excel file must include headers like:

Id, Provider, LastName, FirstName, Birthdate

ALF, City, County, Zip, Last Appointment

CanTeleHealth, Needs Scheduling,
```

📁 Folder Structure

``` bash

src/
├── components/        # UI components
├── hooks/             # Custom hooks
├── utilities/         # Helper functions (e.g., markNeedsScheduling)
├── assets/            # Icons, images
├── App.jsx            # Main app
└── main.jsx           # Entry point
```

✨ Live Demo [video](https://youtu.be/cAVCC7kg6ks)
Once deployed:
👉 <https://ckcarr.github.io/schedule-coordinator/>

📄 License
MIT
