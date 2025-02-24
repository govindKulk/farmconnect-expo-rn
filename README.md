
  # 🌾 FarmConnect


<p align="center">
  <img src="https://github.com/user-attachments/assets/c225542b-99a0-4d87-9e6d-a1ef257e38b7" alt="Example Image" height="600"  />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/6b8b7fb5-8de1-4ef2-9454-c37b91c9b6fc" alt="Example Image" height="600"  />
</p>


  *Empowering Farmers, Enriching Lives*  




FarmConnect is a mobile application designed to create a seamless online marketplace for farmers to sell their produce directly to buyers. The app aims to revolutionize agricultural trade by eliminating middlemen, promoting fair trade practices, and fostering direct communication between farmers and buyers.

---

## 📱 Screenshots

### Farmer Features




<div align="center">
  <img src="https://github.com/user-attachments/assets/abfe781d-d6b2-4d29-956a-d15ca557da5e" alt="IMG-20241212-WA0006"  width="400" />
  <img src="https://github.com/user-attachments/assets/5f6092e8-ea3d-405d-8c7c-f6a5ded79654" alt="IMG-20241212-WA0009"  width="400" />
  <img src="https://github.com/user-attachments/assets/bcda3035-8cd6-4c48-aa77-dcdf6aaa5145" alt="IMG-20241212-WA0013" width="400" />
  <img src="https://github.com/user-attachments/assets/c7e90745-ef37-4429-b7e5-fc7863f77745" alt="IMG-20241212-WA0013" width="400" />
</div>


![pika-1738073160756-1x]()
![pika-1738072901483-1x](https://github.com/user-attachments/assets/5a999ab2-1a86-4252-b5d2-f1a3e576a610)="https://github.com/user-attachments/assets/f1e791ab-5376-4450-8653-ee4bccb7d2e5


### Buyer Features
<div align="center">
  <img src="https://github.com/user-attachments/assets/99e01a4c-8f24-4e90-ac8c-aac088aedd59" alt="IMG-20241212-WA0007" height="400" />
  <img src="https://github.com/user-attachments/assets/40ef5f89-7e3c-4a1c-99e7-63fd2dc49b22" alt="IMG-20241212-WA0015" height="400" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/ac60a191-efa7-46e4-a22d-a58e8f6c35a6" alt="IMG-20241212-WA0006" height="400" />
  <img src="https://github.com/user-attachments/assets/039ee961-f200-497f-bb8b-502a3f98ab3b" alt="IMG-20241212-WA0012" height="400" />
</div>



---

## ✨ Features

### 👨‍🌾 **Farmer Features**
- **Login/Signup**: Secure authentication for farmers.
- **Post a Product**: Add details of crops or produce, including price and quantity.
- **Incoming Requests**: View and manage requests from buyers.
- **Chat with Buyers**: Real-time chat to negotiate and finalize deals.
- **Profile Update**: Manage and update personal information.

### 🛒 **Buyer Features**
- **Login/Signup**: Secure authentication for buyers.
- **Browse Products**: View all available products with advanced filtering options.
- **Apply Bid**: Submit bids for desired products.
- **View Applied Bids**: Keep track of bids submitted.
- **Chat with Farmers**: Real-time chat for better deal-making.
- **Profile Update**: Manage and update personal information.

### 🚀 ****
- **Real-Time Updates**: Chat functionality powered by Supabase real-time database
---

## 🛠️ Technology Stack

| **Technology** | **Purpose** |
|-----------------|-------------|
| **TypeScript**  | Strongly-typed development |
| **React Native**| Cross-platform mobile app development |
| **Expo**        | Fast prototyping and deployment |
| **Supabase**    | Backend as a Service (BaaS) with real-time capabilities |
| **PostgreSQL**  | Relational database for structured data |

---

## 🗃️ Database Schema

FarmConnect's database schema is designed to handle farmer and buyer interactions efficiently.

```mermaid
graph TD
  A[Users] -->|One-to-Many| B[Conversations]
  B -->|One-to-Many| C[Messages]
  A -->|One-to-Many| D[Products]
  D -->|Belongs-to| E[Crops]
  D -->|Belongs-to| F[Categories]
  G[Bids] -->|One-to-Many| D
```

### **Tables Overview**
- **Users**: Stores details of farmers and buyers.
- **Products**: Details about the crops/products being sold.
- **Crops**: Master table for crop categories.
- **Categories**: Subcategories for produce.
- **Bids**: Buyer bids on products.
- **Conversations**: Stores chat sessions.
- **Messages**: Handles individual chat messages.

---

## 📥 Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v16 or later)
- Expo CLI
- Supabase account with database setup

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/govindKulk/farmconnect-expo-rn.git
   cd FarmConnect
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run the Development Server**
   ```bash
   npm start
   ```

5. **Open the App**
   - Scan the QR code with the **Expo Go** app on your phone.

---

## 🚧 Future Enhancements
- **Payment Gateway Integration**: Secure online payments for transactions.
- **Analytics Dashboard**: Insights for both farmers and buyers.
- **Multi-Language Support**: Expand accessibility to regional users.
- **Crop Price Prediction**: Use AI to predict optimal prices.

---

## 👨‍💻 Author
- **Name**: Govind Kulkarni
- **Email**: [kulkarnigovind2003@gmail.com]
- **LinkedIn**: [LinkedIn: Govind Kulkarni](https://www.linkedin.com/in/govind-kulkarni-44aa71228/)

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/govindKulk/farmconnect-expo-rn/issues).

---

