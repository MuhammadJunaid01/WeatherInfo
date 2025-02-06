# Daily News A User Guide (Android Only)

### Technical Highlights

#### Frameworks and Libraries Used:

1.  Redux Toolkit Query (RTK Query): For API data fetching, caching, and local data management.
2.  React Native CLI: For building cross-platform mobile applications.
3.  FlatList for optimized list rendering

### **Development Best Practices**

- **Modular Component Structure**

  - Ensured scalability and maintainability of the codebase by dividing functionality into reusable, independent components.

- **Clear Documentation**

  - Added comprehensive comments throughout the code for better readability and understanding, simplifying collaboration and debugging.

- **Consistent Code Formatting**

  - Followed a standardized coding style using ESLint and Prettier to ensure consistency across the entire project.

- **Error Handling**
  - Implemented robust error handling mechanisms to gracefully manage failures and provide meaningful feedback to users and developers.

### **Automation**

1. **GitHub Actions**
   - Utilized GitHub Actions to automate the build process and generate APK files efficiently.

# **Installation Guidelines**

#### Step 1: Download the APK

1. Navigate to the GitHub Repository for the project.
2. Go to the **Actions** tab in the repository.
3. Locate the latest successful build in the workflow runs.
4. Click on the workflow run, then scroll down to the **Artifacts** section.
5. Download the APK file from the artifacts.

#### Step 2: Install the APK on Your Device

1. Open the downloaded APK file.
2. If prompted, allow installations from unknown sources (Settings > Security > Unknown Sources).
3. Complete the installation process and open the app on your device.

### **Screenshots**

Here are additional screenshots of the application showcasing various features:

![Screenshot 1](https://i.ibb.co/N6X2cYvX/Screenshot-20250204-205651.png)  
![Screenshot 2](https://i.ibb.co/V0D11BQ5/Screenshot-20250204-205822.png)  
![Screenshot 3](https://i.ibb.co/G3pZ3Cz4/Screenshot-20250204-210549.png)  
![Screenshot 4](https://i.ibb.co/KcVf8tR0/Screenshot-20250204-210616.png)  
![Screenshot 5](https://i.ibb.co/8ywVVhH/Screenshot-20250204-212736.png)  
![Screenshot 6](https://i.ibb.co/twGS7HmR/Screenshot-20250204-220441.png)  
![Screenshot 7](https://i.ibb.co/kVSqSkK2/Screenshot-20250204-220524.png)  
![Screenshot 8](https://i.ibb.co/kgnLcfcV/Screenshot-20250204-214920.png)  
![Screenshot 9](https://i.ibb.co/0y07WPcj/Screenshot-20250204-214943.png)  
![Screenshot 10](https://i.ibb.co/bMJmpcrZ/Screenshot-20250204-215827.png)  
![Screenshot 11](https://i.ibb.co/HLDwMLmw/Screenshot-20250204-220343.png)  
![Screenshot 12](https://i.ibb.co/wr3BtgM4/Screenshot-20250204-220406.png)  
![Screenshot 13](https://i.ibb.co/Qjkty8FT/Screenshot-20250204-220419.png)

### **Styling**

1. **Tailwind CSS Integration**

   - Leveraged `twrnc` to implement consistent, responsive, and utility-first styling, ensuring a clean and adaptable design system across the application. ### **Key Features Implemented**

1. **Local Data Fetching with RTK Query**

   - Utilizes a custom `baseQuery` to fetch and serve local data directly without external API calls.

1. **Dynamic Query Handling**

   - Supports conditional queries, enabling seamless switching between local data and API-based data fetching.

1. **State Management**

   - Simplified state handling with automatic caching, invalidation, and real-time updates using RTK Query.

1. **Customizable Data Sources**

   - Easily extendable to add additional local or remote data sources for advanced use cases.

1. **Flexible Hook Usage**

   - Hooks like `useGetPostsQuery` return consistent interfaces (`data`, `isLoading`, `error`) for developer-friendly integration.

1. **Optimized Performance**

   - Efficient caching and minimized re-renders to ensure smooth user experiences.

1. **Developer Friendly**
   - Clean, modular code with detailed comments to make onboarding and modifications easy.

### **Key Features Implemented**

**Offline-First Approach**

- Designed the app to work seamlessly offline by fetching and caching data locally using a custom `baseQuery` with Redux Toolkit Query.
- Ensured that users can access and interact with essential features without an active internet connection.

**Design Implementation**

- Recreated the design with pixel-perfect accuracy, ensuring responsiveness and maintaining attention to detail from the provided mockups.
- Followed a modular approach to structure reusable components like headers, tabs, and item lists for scalability and maintainability.

## Update the App

To get the latest version of the app, follow these steps:

1. **Repeat Step 1** to download the latest `.apk` file from GitHub Actions.
2. **Install the new `.apk` file** over the existing version on your device.

   - When prompted, confirm that you want to **replace the existing app** with the new version.
   - The app data and settings should remain intact after the update.

---

### Notes

- Always ensure you have the **latest version** for bug fixes, new features, and improvements.
- If you encounter any issues with the update, try uninstalling the previous version before installing the new one.

### **Performance Optimization and Offline Data Handling**

- **Optimized State Management**

  - Leveraged React's performance hooks such as `React.memo`, `useCallback`, and `useMemo` to minimize unnecessary re-renders and improve overall app performance.

- **Efficient Data Handling**

  - Implemented an offline-first approach using Redux Toolkit Query to serve cached data locally, reducing reliance on network requests and ensuring fast, consistent user experiences.

- **FlatList Optimization for Large Data Sets**

  - **Precomputed Layouts:** Used `getItemLayout` to calculate item dimensions ahead of time, enhancing rendering efficiency.
  - **Memoized Functions:** Utilized `useCallback` for `renderItem` and `keyExtractor` to avoid redundant computations.
  - **FlatList Configuration:**
    - `initialNumToRender`: Set an optimal number of items to render initially.
    - `maxToRenderPerBatch`: Controlled the maximum number of items processed per batch.
    - `windowSize`: Adjusted to display a balanced number of items in and around the viewport.
    - `removeClippedSubviews`: Enabled to unmount off-screen components, saving memory and enhancing performance.

- **Optimized Caching and Data Access**
  - Ensured efficient access to cached data by leveraging RTK Query's built-in caching and automatic state updates.

## Run Locally

Clone the project

```bash
  git clone https://github.com/MuhammadJunaid01/WeatherInfo

```

Go to the project directory

```bash
  cd WeatherInfo
```

Install dependencies

```bash
  yarn install

```

Start the server

```bash
  yarn android

```

## **For Developers: Running and Building the App**

#### If you're a developer and want to modify the app:

Clone the project

```bash
git clone https://github.com/MuhammadJunaid01/WeatherInfo
```

Go to the project directory

```bash
cd WeatherInfo
```

Install dependencies

```bash
yarn install
```

Start the server

```bash
yarn android
```

---

## **Build a Production APK**

##### To generate a signed APK, run the following commands:

```bash
cd android
./gradlew assembleRelease
```

##### Once the build is complete, you'll find the APK in:

`android/app/build/outputs/apk/release`

---

### **Note:**

- Make sure to replace the `newsAPI` key in the project with your own. Each API key has a usage limit, and exceeding it may cause the app to stop fetching data.

## Tech Stack

React Native , Typescript Redux, TailwindCSS
