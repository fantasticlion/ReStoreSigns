# ReStore Signs

### Link to Deployed Website
https://fantasticlion.github.io/ReStoreSigns/

### Goal and Value of the Application
The goal of this application is to provide users with an organized and user-friendly interface to browse and filter through various products available at Green Country ReStores. The application aims to enhance the shopping experience by allowing users to easily find and manage their favorite items, view product details, and sort/filter products based on different criteria.

### Usability Principles Considered
- **Simplicity**: The interface is designed to be straightforward and easy to navigate, ensuring users can find what they need without unnecessary complexity.
- **Consistency**: Consistent design elements and interactions are used throughout the application to provide a cohesive user experience.
- **Feedback**: Users receive immediate feedback on their actions, such as adding or removing items from favorites, to ensure they are aware of the changes they make.
- **Accessibility**: Efforts are made to ensure the application is accessible to all users, including those with disabilities, by following best practices in web accessibility.

### Organization of Components
- **App.js**: The main component that manages the state and renders the overall structure of the application, including navigation, product lists, and filters.
- **ProductItem.js**: A component that represents individual products in the ReStore-Tulsa section.
- **ProductBAItem.js**: A component that represents individual products in the ReStore-Broken Arrow section.
- **Filter and Sort Components**: Components responsible for rendering sorting options and filters for product types, release times, and processors.

### How Data is Passed Down Through Components
- **State Management**: The `App` component maintains the state for favorites, sorting, filtering, and total price.
- **Props**: Data is passed down to child components (`ProductItem` and `ProductBAItem`) via props. For example, product details and the state update functions are passed to these components to manage individual product interactions.

### How the User Triggers State Changes
- **Adding/Removing Favorites**: Users can add or remove items from their favorites by clicking on buttons within the `ProductItem` and `ProductBAItem` components. These actions trigger state updates in the `App` component.
- **Sorting and Filtering**: Users can sort and filter products using radio buttons and checkboxes. These inputs update the state in the `App` component, which in turn updates the displayed product list.
- **Toggle Visibility**: Users can toggle the visibility of product sections and the filter menu using buttons, which update the state to show or hide these elements.
- **Resetting Filters**: A reset button allows users to clear all filters and sorting options, resetting the state to its initial values.
