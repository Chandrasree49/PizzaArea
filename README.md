1. Project Name
PizzaArea

2. Short Description
PizzaArea is a modern, full-stack pizza ordering and delivery platform connecting food lovers with local artisanal pizzerias. Customers can browse, search, and order fresh stone-baked pizzas with customized delivery details, while restaurant vendors manage menus and process incoming orders. Powered by Next.js, Express, MongoDB, Better Auth, and Stripe Checkout, PizzaHub features role-based access control, menu approval workflows, and premium subscriptions.

3. Technologies Used
Next.js 16 (App Router)
React 19 & TypeScript
Tailwind CSS
JWT
Node.js & Express.js
MongoDB & MongoDB Atlas
SweetAlert2 & React Hot Toast
Lucide React Icons
Stripe
4. 5 Key Features of PizzaArea
. Role-Based Authentication & Server-Side Security
Secure Multi-Role Access: Implements robust authentication using Better Auth and JWT for Customers, Restaurant Vendors, and Platform Administrators.
Server-Side Authorization: Every protected API route enforces strict token verification and role-based middleware (admin, vendor, customer), preventing unauthorized route access even if a user manually changes the URL.
Account Security: Protects the platform with password complexity rules, account suspension checks (isBlocked), and sanitized user data.
. Advanced Menu Search, Filtering & Dynamic Sorting
Instant Keyword Search: Real-time search across menu item titles and descriptions.
Category & Location Filtering: Browse by curated pizza categories (Classic, Vegetarian, Meat Lovers, Gourmet, Sides, and Desserts) and restaurant locations/cities.
Flexible Sorting (Challenge Feature): Dynamic sorting by price (Ascending / Descending) and newest arrivals, returning only approved and active menu items.
. End-to-End Order Management System
Seamless Customer Ordering: Customers can place orders with custom delivery dates, delivery addresses, and special culinary instructions.
Vendor Order Processing: Restaurant owners can inspect customer orders in their dashboard and accept or reject pending orders with a single click.
Real-Time Lifecycle Tracking: Full order status lifecycle (Pending, Accepted, Rejected, Cancelled) with built-in rules allowing customers to cancel pending orders while preventing modifications to accepted orders.
. Vendor Portal & ImgBB Cloud Image Upload
Full Menu CRUD Management: Vendors can create, update, delete, and manage the availability of their menu items.
ImgBB Cloud Integration: Seamless file upload for menu item photos directly through the ImgBB API.
Quality Control & Approval Workflow: Newly created menu items are placed in a Pending state until reviewed and approved by an Administrator, guaranteeing high menu standards.
5. Stripe Checkout & Premium Subscription with Webhook Verification
Vendor Monetization: Free-tier vendors are restricted to a maximum of 3 active items. Vendors can upgrade to Premium ($19.99/mo) to unlock unlimited item publishing.
Automated Webhook Verification: Subscriptions and transactions are securely confirmed and activated only upon verified Stripe Webhook events, ensuring zero frontend-tampering.
Promotional Benefits: Premium vendors receive featured priority placement on the homepage banner/sections and a verified "PRO / Premium" badge on their pizzas.