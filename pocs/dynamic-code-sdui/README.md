# Dynamic Server-Driven UI App

A mobile application built with React Native and Go backend that demonstrates server-driven UI architecture. The entire user interface is dynamically generated from the backend, allowing for real-time updates without app store deployments.

## Architecture

- **Frontend**: React Native + Expo
- **Backend**: Go + Gin Gonic
- **Pattern**: Server-Driven UI

## Project Structure

```
.
├── app/                    # React Native mobile app
│   ├── components/         # Reusable components
│   │   └── DynamicRenderer.tsx  # Core dynamic UI renderer
│   ├── services/          # API services
│   │   └── api.ts         # Backend communication
│   └── app/(tabs)/        # Navigation screens
│       └── dynamic.tsx    # Main dynamic page
└── backend/               # Go backend server
    ├── main.go           # Server implementation
    └── go.mod            # Go dependencies
```

## Features

- **Dynamic UI Rendering**: All UI components are fetched from the backend
- **Dynamic Code Execution**: JavaScript code is served from backend and executed in React Native
- **Multiple Page Types**: Header, Footer, Calculator, Notes, Info pages
- **Interactive Components**: Calculator with arithmetic operations including power, square root, random numbers
- **Note Taking**: Save and display notes dynamically
- **Real-time Updates**: UI changes without app redeployment
- **Safe Code Evaluation**: Dynamic code runs in controlled context with fallback implementations

## Available Pages

The backend serves the following dynamic pages via `/api/page/{name}`:

- `header` - App header component
- `footer` - App footer component
- `page_calculator` - Interactive calculator page
- `page_note_page` - Note-taking functionality
- `page_info` - App information and features

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Initialize Go modules and install dependencies:
   ```bash
   go mod tidy
   ```

3. Run the backend server:
   ```bash
   go run main.go
   ```

   The server will start on `http://localhost:8080`

4. Test the API endpoints:
   ```bash
   curl http://localhost:8080/api/page/page_calculator
   ```

### Frontend Setup

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Run on your preferred platform:
   - iOS: `npm run ios` or scan QR code with Camera app
   - Android: `npm run android` or scan QR code with Expo Go app
   - Web: `npm run web`

## Usage

1. Start the backend server first (it must be running on localhost:8080)
2. Launch the React Native app
3. Navigate to the "Dynamic" tab
4. Select different page types from the horizontal scroll menu
5. Interact with the dynamic components:
   - **Calculator**: Perform arithmetic operations
   - **Notes**: Create and save notes
   - **Info**: View app information

## How It Works

### Backend (Go + Gin)

The backend defines UI components as structured data:

```go
type Component struct {
    Type       string                 `json:"type"`
    Props      map[string]interface{} `json:"props,omitempty"`
    Children   []Component            `json:"children,omitempty"`
    Text       string                 `json:"text,omitempty"`
    Actions    map[string]string      `json:"actions,omitempty"`
}
```

Each page returns a JSON structure describing the UI layout, styling, and interactions.

### Frontend (React Native)

The `DynamicRenderer` component:

1. Receives component data from the API
2. Recursively renders React Native components
3. Handles user interactions through action mappings
4. Manages component state (calculator results, notes, etc.)

### Component Mapping

- Backend `"View"` → React Native `<View>`
- Backend `"Text"` → React Native `<Text>`
- Backend `"TextInput"` → React Native `<TextInput>`
- Backend `"TouchableOpacity"` → React Native `<TouchableOpacity>`
- Backend `"ScrollView"` → React Native `<ScrollView>`

## API Endpoints

- `GET /api/page/header` - Returns header component
- `GET /api/page/footer` - Returns footer component
- `GET /api/page/page_calculator` - Returns calculator page
- `GET /api/page/page_note_page` - Returns notes page
- `GET /api/page/page_info` - Returns info page

## Customization

### Adding New Pages

1. **Backend**: Add a new case in `getPage()` function in `main.go`
2. **Frontend**: Add the page option to `pageOptions` array in `dynamic.tsx`

### Adding New Component Types

1. **Backend**: Define component structure in page definitions
2. **Frontend**: Add new case in `renderComponent()` method in `DynamicRenderer.tsx`

### Adding New Actions

1. **Backend**: Add action mappings in component definitions
2. **Frontend**: Add action handlers to `actionHandlers` object in `DynamicRenderer.tsx`

## Development Notes

- The backend must be running before starting the frontend
- Changes to backend page definitions are reflected immediately in the app
- The app gracefully handles network errors and displays appropriate messages
- All styling is defined in the backend and converted to React Native styles

## Troubleshooting

- **"Failed to load page"**: Ensure backend server is running on localhost:8080
- **Network errors**: Check that both frontend and backend are on the same network
- **Styling issues**: Verify style objects in backend match React Native style properties