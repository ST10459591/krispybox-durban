# KRISPY BOX DURBAN
### Web-Based Food Ordering and Management System

Krispy Box Durban is a web-based food ordering application that allows customers to browse meals, create accounts, place orders and choose a payment method. The system also provides administrators with tools to manage products and inventory.

The project was developed to make food ordering easier for customers and help Krispy Box manage its daily business operations.

**GitHub Repository:** https://github.com/ST10459591/krispybox-durban.git

## 1. Project Overview

Krispy Box Durban is a fast-food ordering system designed for customers in Durban, South Africa.

Customers can browse the menu, view meal prices, add products to their shopping carts and place orders online. The website also supports customer registration, login and profile management.

Administrators can manage products, upload product images, activate or deactivate menu items and monitor stock levels.

The application combines frontend development, backend services and cloud technologies to provide a more complete ordering system.

## 2. Purpose of the Application

The main purpose of Krispy Box Durban is to improve the food ordering process by providing customers with a simple online platform.

The system aims to:

- Allow customers to browse and order food conveniently.
- Reduce the need for manual order-taking.
- Provide a simple checkout process.
- Help administrators manage food products and prices.
- Improve stock monitoring and inventory management.
- Support the daily operations of the business.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Website design and styling |
| JavaScript | Website functionality |
| Node.js | Backend server |
| Express.js | Backend API development |
| Firebase Authentication | Customer registration and login |
| Cloud Firestore | Storing application data |
| Firebase Admin SDK | Backend database operations |
| Cloudinary | Uploading and storing product images |
| PayFast | Sandbox payment integration |
| GitHub | Source code management |
| GitHub Actions | Automated workflow checks |

## 4. Application Features

### 4.1 Homepage

The homepage introduces Krispy Box Durban and provides navigation to the menu, shopping cart and login page.

It includes an Order Now button that allows customers to begin ordering.

<img width="950" height="479" alt="Screenshot 2026-11-16 180003" src="https://github.com/user-attachments/assets/55371aab-33e0-4be3-8b9c-c00e5ad34b35" />


### 4.2 Customer Registration

New customers can create an account by entering their name, email address and password.

Firebase Authentication is used to manage customer registration.

<img width="959" height="474" alt="Screenshot 2026-11-16 180307" src="https://github.com/user-attachments/assets/a6ac667f-46d1-4335-b35f-3a60f8601790" />


### 4.3 Customer Login

Registered customers can log in using their email address and password.

The login system allows customers to access their accounts and use the ordering features.

<img width="953" height="481" alt="Screenshot 2026-11-16 180328" src="https://github.com/user-attachments/assets/d5cdde78-7e91-43b8-87d2-86bc53902e35" />


### 4.4 Food Menu

The food menu displays available meals, product images, descriptions and prices.

Customers can browse different food products and select items they want to purchase.

<img width="954" height="479" alt="Screenshot 2026-11-16 180412" src="https://github.com/user-attachments/assets/f70f3147-5bd4-4e61-85c5-5f0fd764e395" />
<img width="940" height="428" alt="Screenshot 2026-11-16 180451" src="https://github.com/user-attachments/assets/8168b714-77c8-4ece-acd5-61e630d04d92" />


### 4.5 Add to Cart Notification

When customers select Add to Cart, the website displays a notification confirming that the selected product has been added.

This provides immediate feedback without interrupting the shopping experience.

<img width="959" height="468" alt="Screenshot 2026-11-16 180518" src="https://github.com/user-attachments/assets/2b65ccf2-116e-4f6c-89e6-9b39f9839588" />


### 4.6 Shopping Cart

The shopping cart displays the selected products, quantities, individual prices and total order amount.

Customers can increase or decrease quantities, remove items and proceed to checkout.

<img width="955" height="473" alt="Screenshot 2026-11-16 180543" src="https://github.com/user-attachments/assets/60f16241-b8cb-4ef2-ac14-8fd2db315e96" />


### 4.7 Checkout – Cash Collection

The checkout page displays the total order amount and allows customers to select a payment method.

Customers choosing Cash Collection can submit their orders and pay when collecting their food.

<img width="957" height="458" alt="Screenshot 2026-11-16 180942" src="https://github.com/user-attachments/assets/ad6090bc-3e29-46f7-9e22-94baf0c692cc" />


### 4.8 Order Confirmation

After a successful cash collection order submission, the website displays a confirmation message.

This informs the customer that the order has been received and is being processed.

<img width="959" height="472" alt="Screenshot 2026-11-16 180955" src="https://github.com/user-attachments/assets/2ddfa609-42b0-4cca-ab5b-c84b21638266" />


### 4.9 Checkout – Card Payment

Customers can also select Card Payment.

The website integrates with PayFast's sandbox environment to test the online payment process without processing real payments.

<img width="950" height="461" alt="Screenshot 2026-11-16 181121" src="https://github.com/user-attachments/assets/15e178d0-d43f-469a-9854-99857e05eb8c" />


### 4.10 PayFast Sandbox Payment

PayFast is integrated into the application to support online payment testing.

The sandbox environment allows test payments to be simulated.

A successful sandbox payment was demonstrated during testing. 

<img width="944" height="494" alt="Screenshot 2026-11-16 181238" src="https://github.com/user-attachments/assets/77f828fe-3595-476f-afc1-af10c89aca77" />


### 4.11 Customer Profile

Customers can access their profile information, including their name, phone number, email address and communication preferences.

The profile page helps customers manage their personal information.

<img width="959" height="476" alt="Screenshot 2026-11-16 181302" src="https://github.com/user-attachments/assets/b3a31607-d3c9-45ca-8369-ae6946099492" />


### 4.12 Administrator Dashboard

The administrator dashboard provides access to product management and inventory features.

Administrators can view products and activate or deactivate items depending on their availability.

This helps control which products are displayed as available to customers.

<img width="959" height="499" alt="Screenshot 2026-11-16 181347" src="https://github.com/user-attachments/assets/f07afc30-287f-41dd-b9a6-d492eecfc461" />


### 4.13 Product Management

Administrators can manage the products displayed on the website.

The dashboard shows product names, descriptions, prices and availability status.

Administrators can activate or deactivate products.

<img width="950" height="465" alt="Screenshot 2026-11-16 181408" src="https://github.com/user-attachments/assets/8d4c8645-cc09-42a0-b361-2abf31bca3d9" />


### 4.14 Add Product

Administrators can add new products by entering the product name, description and price.

They can also upload an image of the product.

Cloudinary is used to store uploaded product images.

<img width="959" height="470" alt="Screenshot 2026-11-16 182135" src="https://github.com/user-attachments/assets/56125288-acc2-49f2-91a6-9180ef337a2b" />


### 4.15 Inventory Management

The inventory management feature allows administrators to monitor ingredients, supplies and finished products.

The dashboard displays the total number of stock items, low-stock items and out-of-stock items.

<img width="958" height="464" alt="Screenshot 2026-11-16 182232" src="https://github.com/user-attachments/assets/bc0542cb-3cfc-4931-88a3-4c1a0dc3d15e" />


### 4.16 Inventory Stock Tracking

Administrators can view stock quantities, minimum stock levels and availability status.

They can also manually update stock quantities when stock is received or used.

This helps the business keep track of available ingredients and finished products.

<img width="956" height="476" alt="Screenshot 2026-11-16 182242" src="https://github.com/user-attachments/assets/6f78d0f4-f25d-4330-948c-d947b36bdc30" />



## 5. Application Design Considerations

The website was designed with usability, simplicity and consistency in mind.

### User-Friendly Navigation

The website includes clear navigation links that allow customers to move between the homepage, menu, shopping cart and their accounts.

### Consistent Design

Krispy Box uses a black, white and bright pink colour scheme throughout the website.

The same colours, buttons and layout styles are used across different pages to maintain a consistent appearance.

### Simple Ordering Process

Customers can select meals, manage their carts and complete checkout without unnecessary steps.

### User Roles

The system includes separate customer and administrator sections to organise different responsibilities.

### Cloud Integration

Firebase and Cloudinary were selected to support authentication, data storage and product image management.

## 6. System Architecture

The application consists of a frontend, backend and cloud services.

**Frontend**

The frontend was developed using HTML, CSS and JavaScript. It provides the pages and features customers interact with.

**Backend**

Node.js and Express.js are used to handle API requests, process orders and communicate with external services.

**Database and Authentication**

Firebase Authentication manages user accounts, while Cloud Firestore stores application data such as products, orders and inventory records.

**Image Storage**

Cloudinary is used to upload and store product images.

**Payment Integration**

PayFast is used for sandbox payment testing. Cash collection orders are also supported.

## 7. GitHub and Version Control

GitHub was used to store and manage the source code throughout development.

The repository provides a central location for project files and allows changes to be recorded through commits.

The project also uses Git for version control, making it easier to track updates and improvements.

GitHub Actions can be used to automate build and testing checks when changes are uploaded to the repository.

**Repository Link:**

https://github.com/ST10459591/krispybox-durban.git

## 8. Running the Application

### Requirements

- Node.js and npm
- Visual Studio Code
- Firebase project configuration
- Cloudinary configuration
- Backend environment variables
- PayFast sandbox credentials for payment testing


## 9. Testing

Testing was carried out during development to check the main website features.

The following areas were tested:

- Customer registration and login.
- Product display and navigation.
- Adding products to the shopping cart.
- Updating and removing cart items.
- Calculating order totals.
- Cash collection checkout.
- Order confirmation.
- PayFast sandbox payment simulation.
- Administrator product management.
- Product image uploads.
- Inventory display and stock management.

Cash collection order processing and the main customer ordering features were tested successfully during development.

PayFast sandbox payment simulation was also tested, although backend notification verification still needs improvement.

## 10. Release Notes

### Version 1.0 – Initial Prototype

The first version focused on the basic structure and appearance of the Krispy Box Durban website.

The prototype included the homepage, food menu, shopping cart and basic navigation.

### Version 2.0 – Final WIL Development

The application was improved with additional functionality, including:

- Customer registration and login using Firebase.
- Firestore database integration.
- Improved shopping cart management.
- Cart confirmation notifications.
- Checkout and cash collection orders.
- PayFast sandbox payment integration.
- Customer profile management.
- Administrator dashboard.
- Product activation and deactivation.
- Cloudinary product image uploads.
- Inventory management.
- Backend development using Node.js and Express.js.

These features improved the original prototype and made the website more useful for customers and administrators.

## 11. Innovative Features

### Cloud-Based Product Management

Administrators can add products and manage product information using Firebase and Cloudinary.

### Interactive Shopping Cart

Customers can add products, adjust quantities and view updated order totals.

### Product Availability Management

Administrators can activate or deactivate products to control their availability on the menu.

### Inventory Tracking

The inventory system helps administrators monitor stock quantities and identify low-stock or out-of-stock items.

### Multiple Payment Options

Customers can select cash collection or use the PayFast sandbox payment process for testing card payments.

## 12. Challenges Experienced

Several challenges were experienced during development.

These included connecting the frontend to the backend, integrating Firebase, managing product images, implementing payment functionality and setting up GitHub.

The PayFast integration required additional testing because successful sandbox payments did not always result in verified payment updates in the backend.

These challenges provided practical experience in debugging, cloud integration and software development.

## 13. Demonstration Video

A video demonstration of the Krispy Box Durban web application will be provided as part of the final submission.

**Video Link:** 
Google Drive WIL Project Report Web Application Link
https://drive.google.com/file/d/1OJnXDrNJ98MNFeJ5LomemC5MEDiGiE-M/view?usp=drivesdk

The demonstration will show the main customer features, ordering process, administrator dashboard and inventory management.

## 14. Future Improvements

Future improvements may include:

- Completing PayFast payment notification verification.
- Automatically updating inventory when orders are completed.
- Adding more detailed order tracking.
- Adding employee management features.
- Adding automated tests using GitHub Actions.
- Improving the website for smaller mobile screens.

## 15. Conclusion

Krispy Box Durban is a web-based food ordering and management system that allows customers to browse products, manage shopping carts and place orders online.

The project also provides administrators with product and inventory management features.

Through the use of HTML, CSS, JavaScript, Node.js, Firebase, Cloudinary and PayFast, the application demonstrates the integration of frontend development, backend services and cloud technologies.

The final version includes several improvements over the original prototype, while providing opportunities for further development.
