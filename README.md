# Getting Started with Create React App

Project Structure (Claude)

src/
├── assets/
│ ├── images/
│ ├── icons/
│ └── styles/
│ └── global.css
│
├── features/
│ ├── auth/
│ │ ├── components/
│ │ │ ├── LoginForm.jsx
│ │ │ └── SignupForm.jsx
│ │ ├── hooks/
│ │ │ └── useAuth.js
│ │ ├── services/
│ │ │ └── authService.js
│ │ └── types/
│ │ └── auth.types.ts
│ │
│ ├── products/
│ │ ├── components/
│ │ │ ├── ProductCard.jsx
│ │ │ ├── ProductGrid.jsx
│ │ │ └── ProductDetails.jsx
│ │ ├── hooks/
│ │ │ └── useProducts.js
│ │ ├── services/
│ │ │ └── productService.js
│ │ └── types/
│ │ └── product.types.ts
│ │
│ ├── cart/
│ │ ├── components/
│ │ │ ├── CartDrawer.jsx
│ │ │ └── CartItem.jsx
│ │ ├── hooks/
│ │ │ └── useCart.js
│ │ └── types/
│ │ └── cart.types.ts
│ │
│ ├── wishlist/
│ │ ├── components/
│ │ │ ├── WishlistDrawer.jsx
│ │ │ └── WishlistItem.jsx
│ │ └── hooks/
│ │ └── useWishlist.js
│ │
│ ├── checkout/
│ │ ├── components/
│ │ │ ├── CheckoutForm.jsx
│ │ │ └── PaymentForm.jsx
│ │ └── services/
│ │ └── checkoutService.js
│ │
│ └── profile/
│ ├── components/
│ │ ├── ProfileDrawer.jsx
│ │ └── ProfileForm.jsx
│ └── services/
│ └── profileService.js
│
├── common/
│ ├── components/
│ │ ├── Button/
│ │ │ ├── Button.jsx
│ │ │ └── Button.module.css
│ │ ├── Input/
│ │ ├── Modal/
│ │ ├── Drawer/
│ │ └── Header/
│ │ ├── Header.jsx
│ │ └── Header.module.css
│ │
│ ├── hooks/
│ │ ├── useClickOutside.js
│ │ ├── useDebounce.js
│ │ └── useLocalStorage.js
│ │
│ └── utils/
│ ├── api.js
│ ├── constants.js
│ └── helpers.js
│
├── pages/
│ ├── HomePage.jsx
│ ├── ProductListingPage.jsx
│ ├── ProductDetailPage.jsx
│ └── CheckoutPage.jsx
│
├── store/
│ ├── slices/
│ │ ├── cartSlice.js
│ │ ├── productSlice.js
│ │ └── userSlice.js
│ └── store.js
│
├── types/
│ └── global.types.ts
│
├── App.jsx
└── index.jsx
