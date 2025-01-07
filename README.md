# React Custom Table & T-Shirt Customizer

## Description

This project consists of two main features:

1. **Custom Table**:

   - A dynamic table built in React without using external libraries or packages.
   - Fetches data from a provided API with support for pagination and search.
   - The table is displayed below a reference image.

2. **T-Shirt Customizer**:
   - Enables users to upload a logo and position it dynamically on a predefined t-shirt image.
   - Users can drag, drop, and resize the logo while maintaining its aspect ratio.
   - Generates a final image combining the t-shirt and logo.

## Features

### Custom Table

- **API Integration**: Fetches data from [https://api.razzakfashion.com](https://api.razzakfashion.com).
- **Parameters**: Supports `paginate` and `search` query parameters for data filtering.
- **Dynamic Table**: Displays data dynamically based on the API response.
- **Pagination**: Allows navigation through paginated data.
- **Search**: Provides a search bar for filtering results by a keyword.

### T-Shirt Customizer

- **Predefined T-Shirt Image**: A base t-shirt image is used for customization.
- **Drag-and-Drop**: Users can drag and position the uploaded logo anywhere on the t-shirt.
- **Resizable Logo**: Users can resize the logo while maintaining its aspect ratio.
- **Final Image Generation**: Combines the t-shirt and logo into a final image for download or preview.

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/shamsad-alam-meraj/print-manzil-task.git
```

2. Navigate to the project directory:

```bash
cd print-manzil-task
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
 npm run dev
```

5. Open your browser and navigate to:

```bash
http://localhost:5173/
```

### Live Site

Access the live demo here: [Live Site Link](https://print-manzil-assignment.netlify.app/)
