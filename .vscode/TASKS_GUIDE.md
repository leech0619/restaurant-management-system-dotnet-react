# ?? VS Code Tasks & Launch Configuration Guide

## ?? What Was Configured

Your workspace now has powerful VS Code tasks that make development easier!

---

## ?? How to Use VS Code Tasks

### Method 1: Using Command Palette (Recommended)

1. **Open Command Palette:**
- Press **`Ctrl + Shift + P`** (Windows/Linux)
   - Or **`Cmd + Shift + P`** (Mac)

2. **Type:** `Tasks: Run Task`

3. **Select from these options:**

   - **?? Start Minion Cafe (Full Stack)** ? **MOST USEFUL!**
     - Starts both backend AND frontend simultaneously
     - Opens 2 split terminal panels
     - Backend: Port 7000
     - Frontend: Port 5173
   
   - **?? Start Backend API**
     - Starts only the .NET backend
     - Port 7000 (HTTPS) and 5000 (HTTP)
   
   - **?? Start Frontend React**
     - Starts only the React frontend
     - Port 5173
   
 - **??? Update Database**
     - Runs `dotnet ef database update`
     - Updates your SQL Server database
   
   - **?? Build Backend**
     - Builds the .NET project
   
   - **?? Build Frontend**
     - Builds the React project for production
   
   - **??? Build Full Stack**
 - Builds both projects

---

### Method 2: Using Menu

1. Click **Terminal** in the top menu
2. Select **Run Task...**
3. Choose your desired task

---

### Method 3: Using Keyboard Shortcut

1. Press **`Ctrl + Shift + B`** (default build task)
2. Or configure custom shortcuts in **Keyboard Shortcuts** (`Ctrl + K, Ctrl + S`)

---

## ?? How to Use Launch Configurations (Debugging)

### Start with Debugging

1. **Open Debug Panel:**
 - Press **`Ctrl + Shift + D`**
   - Or click the Debug icon in the sidebar

2. **Select Configuration:**
   - Click the dropdown at the top
   - Choose: **?? Launch Minion Cafe (Full Stack)**

3. **Start Debugging:**
   - Press **`F5`**
   - Or click the green play button

4. **What Happens:**
   - ? Both backend and frontend start
   - ? Browser opens automatically to `http://localhost:5173`
   - ? You can set breakpoints in C# code
   - ? Debug panel shows variables and call stack

---

## ?? Quick Start Workflows

### Workflow 1: Daily Development (Most Common)

**Goal:** Start both backend and frontend for full-stack development

**Steps:**
1. Press **`Ctrl + Shift + P`**
2. Type: `run task`
3. Select: **?? Start Minion Cafe (Full Stack)**
4. Wait 10 seconds for both to start
5. Browser automatically opens to `http://localhost:5173`

**Result:**
- ? Backend running on port 7000
- ? Frontend running on port 5173
- ? 2 terminal panels open (one for each)
- ? Ready to code!

---

### Workflow 2: Backend-Only Development

**Goal:** Work only on API endpoints

**Steps:**
1. Press **`Ctrl + Shift + P`**
2. Type: `run task`
3. Select: **?? Start Backend API**
4. Open: `https://localhost:7000/swagger`

---

### Workflow 3: Frontend-Only Development

**Goal:** Work only on React UI

**Steps:**
1. Make sure backend is already running (or use mock data)
2. Press **`Ctrl + Shift + P`**
3. Type: `run task`
4. Select: **?? Start Frontend React**
5. Open: `http://localhost:5173`

---

### Workflow 4: Database Update

**Goal:** Apply EF Core migrations

**Steps:**
1. Press **`Ctrl + Shift + P`**
2. Type: `run task`
3. Select: **??? Update Database**
4. Watch output for success

---

### Workflow 5: Production Build

**Goal:** Create production-ready builds

**Steps:**
1. Press **`Ctrl + Shift + P`**
2. Type: `run task`
3. Select: **??? Build Full Stack**
4. Both projects build sequentially

---

## ?? Terminal Panel Features

When you run **?? Start Minion Cafe (Full Stack)**, you'll see:

```
??????????????????????????????????????????
? Terminal Panel (Split View)   ?
??????????????????????????????????????????
? Left: ?? Backend API    ?
? ? dotnet run  ?
? ? Now listening on: https://...7000   ?
??????????????????????????????????????????
? Right: ?? Frontend React       ?
? ? npm run dev    ?
? ? Local: http://localhost:5173/ ?
??????????????????????????????????????????
```

### Terminal Benefits:
- **Split View:** See both logs simultaneously
- **Color-coded:** Easy to distinguish backend from frontend
- **Persistent:** Terminals stay open until you close them
- **Dedicated Panels:** Each task gets its own space

---

## ?? How to Stop Servers

### Method 1: Terminal Panel
1. Click on the terminal panel
2. Press **`Ctrl + C`**
3. Repeat for each panel (backend and frontend)

### Method 2: Close All Terminals
1. Right-click on terminal panel
2. Select **"Kill All Terminals"**

### Method 3: VS Code Command
1. Press **`Ctrl + Shift + P`**
2. Type: `Terminal: Kill All Terminals`
3. Press Enter

---

## ?? Customization Tips

### Change Ports

**Backend:**
Edit: `.vscode/tasks.json`
```json
"args": ["run", "--urls", "https://localhost:8000"]
```

**Frontend:**
Edit: `restaurantmanagementsystem.client/vite.config.js`
```javascript
server: {
  port: 3000
}
```

### Add Pre-Launch Tasks

Example: Install npm packages before starting frontend

```json
{
  "label": "npm install",
"type": "shell",
  "command": "npm install",
  "options": {
    "cwd": "${workspaceFolder}/restaurantmanagementsystem.client"
  }
}
```

Then update the frontend task:
```json
"dependsOn": ["npm install"]
```

---

## ?? Keyboard Shortcuts (Recommended Setup)

Add these to your `keybindings.json`:

1. Press **`Ctrl + K, Ctrl + S`** to open Keyboard Shortcuts
2. Click the file icon in the top right
3. Add:

```json
[
  {
    "key": "ctrl+alt+s",
    "command": "workbench.action.tasks.runTask",
    "args": "?? Start Minion Cafe (Full Stack)"
  },
  {
    "key": "ctrl+alt+k",
    "command": "workbench.action.tasks.terminate",
    "args": "terminateAll"
  }
]
```

Now:
- **`Ctrl + Alt + S`** = Start Minion Cafe
- **`Ctrl + Alt + K`** = Kill all terminals

---

## ?? Task Status Indicators

VS Code shows task status in the status bar:

| Icon | Meaning |
|------|---------|
| ? Running | Task is currently executing |
| ? Success | Task completed successfully |
| ? Failed | Task encountered an error |
| ?? Background | Task running in background |

---

## ?? Debugging Features

### Set Breakpoints in C# Code

1. Open any `.cs` file
2. Click left margin next to line number
3. Red dot appears = breakpoint set
4. Start debug mode with **`F5`**
5. Code pauses when breakpoint is hit

### Debug Panel Features

- **Variables:** See all variable values
- **Call Stack:** See function call hierarchy
- **Watch:** Monitor specific expressions
- **Debug Console:** Execute code in context

---

## ?? Pro Tips

### Tip 1: Auto-Start on Workspace Open

Add to `.vscode/settings.json`:
```json
{
  "tasks.autoRun": "on"
}
```

### Tip 2: Custom Terminal Names

Tasks automatically get icon names for easy identification:
- ?? = Backend
- ?? = Frontend
- ?? = Full Stack

### Tip 3: Output Panel

View all task output:
1. Press **`Ctrl + Shift + U`**
2. Select **"Tasks"** from dropdown

### Tip 4: Task History

Recently run tasks appear at the top of the task list for quick access.

---

## ?? Troubleshooting Tasks

### Task Won't Start

**Check:**
1. Are ports already in use?
   ```powershell
   netstat -ano | findstr ":7000"
   netstat -ano | findstr ":5173"
   ```

2. Is dotnet/npm in PATH?
   ```powershell
   dotnet --version
   npm --version
   ```

3. Are you in the correct workspace?
   - Open folder: `D:\dotnet\RestaurantManagementSystem`

### Task Hangs

**Solution:**
1. Press **`Ctrl + C`** in terminal
2. Kill terminal: Right-click ? Kill Terminal
3. Try again

### Background Task Won't Complete

**This is normal!** Background tasks (like `Start Backend API`) are meant to run continuously until you stop them.

---

## ?? Additional Resources

### VS Code Tasks Documentation
https://code.visualstudio.com/docs/editor/tasks

### VS Code Debugging
https://code.visualstudio.com/docs/editor/debugging

### Workspace Settings
https://code.visualstudio.com/docs/getstarted/settings

---

## ? Quick Reference

| Shortcut | Action |
|----------|--------|
| **`Ctrl + Shift + P`** | Command Palette |
| **`Ctrl + Shift + B`** | Run Build Task |
| **`F5`** | Start Debugging |
| **`Ctrl + Shift + D`** | Open Debug Panel |
| **`Ctrl + C`** | Stop Task in Terminal |
| **`Ctrl + `` ` ``** | Toggle Terminal |

---

## ?? You're All Set!

Your VS Code is now configured with powerful tasks!

**To start Minion Cafe:**
1. Press **`Ctrl + Shift + P`**
2. Type: **run task**
3. Select: **?? Start Minion Cafe (Full Stack)**
4. Wait 10 seconds
5. Code! ??

---

**Happy Coding! Ba-ba-ba-ba-ba-nana! ???**
