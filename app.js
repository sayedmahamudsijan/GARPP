import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X, Star, Truck, RotateCcw, Shield, ChevronRight, Plus, Minus, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const ShohozBazar = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample products data
  const products = [
    { id: 1, name: 'Premium Basmati Rice 5kg', category: 'groceries', price: 850, oldPrice: 950, rating: 4.5, reviews: 234, image: '🌾', discount: 11, stock: 45, delivery: '1-2 days' },
    { id: 2, name: 'Cotton T-Shirt - Blue', category: 'fashion', price: 599, oldPrice: 799, rating: 4.3, reviews: 156, image: '👕', discount: 25, stock: 23, delivery: '2-3 days' },
    { id: 3, name: 'Wireless Earbuds', category: 'electronics', price: 2499, oldPrice: 3499, rating: 4.7, reviews: 891, image: '🎧', discount: 29, stock: 12, delivery: '1-2 days' },
    { id: 4, name: 'Face Cream SPF 50', category: 'beauty', price: 450, oldPrice: 600, rating: 4.6, reviews: 445, image: '🧴', discount: 25, stock: 67, delivery: '1-2 days' },
    { id: 5, name: 'Non-Stick Cookware Set', category: 'home', price: 3200, oldPrice: 4500, rating: 4.4, reviews: 203, image: '🍳', discount: 29, stock: 18, delivery: '2-3 days' },
    { id: 6, name: 'Baby Diapers Pack of 48', category: 'baby', price: 890, oldPrice: 1050, rating: 4.8, reviews: 672, image: '👶', discount: 15, stock: 89, delivery: '1-2 days' },
    { id: 7, name: 'Notebook Set - 6 Pack', category: 'stationery', price: 280, oldPrice: 350, rating: 4.2, reviews: 89, image: '📓', discount: 20, stock: 156, delivery: '1-2 days' },
    { id: 8, name: 'Vitamin C Tablets', category: 'health', price: 650, oldPrice: 800, rating: 4.5, reviews: 321, image: '💊', discount: 19, stock: 94, delivery: '1-2 days' },
    { id: 9, name: 'Premium Green Tea 100g', category: 'groceries', price: 420, oldPrice: 500, rating: 4.6, reviews: 287, image: '🍵', discount: 16, stock: 73, delivery: '1-2 days' },
    { id: 10, name: 'Smart Watch Pro', category: 'electronics', price: 4999, oldPrice: 6999, rating: 4.4, reviews: 567, image: '⌚', discount: 29, stock: 8, delivery: '2-3 days' },
    { id: 11, name: 'Lipstick Set - 5 Colors', category: 'beauty', price: 899, oldPrice: 1200, rating: 4.7, reviews: 445, image: '💄', discount: 25, stock: 34, delivery: '1-2 days' },
    { id: 12, name: 'LED Desk Lamp', category: 'home', price: 1250, oldPrice: 1800, rating: 4.3, reviews: 178, image: '💡', discount: 31, stock: 21, delivery: '2-3 days' },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🛍️' },
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'beauty', name: 'Beauty', icon: '💅' },
    { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
    { id: 'baby', name: 'Baby & Kids', icon: '🧸' },
    { id: 'stationery', name: 'Stationery', icon: '✏️' },
    { id: 'health', name: 'Health', icon: '🏥' },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Header Component
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-emerald-600 text-white py-2 px-4 text-sm text-center">
        🎉 Flash Sale! Up to 50% OFF on selected items | Free Delivery on orders above ৳500
      </div>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                S
              </div>
              <div>
                <div className="font-bold text-lg text-emerald-600">Shohoz Bazar</div>
                <div className="text-xs text-gray-500 hidden sm:block">Shop Easy, Live Easy</div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 hover:text-emerald-600">
              <User className="w-5 h-5" />
              <span className="text-sm">Account</span>
            </button>
            
            <button 
              className="relative hover:text-emerald-600"
              onClick={() => setCurrentPage('wishlist')}
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button 
              className="relative hover:text-emerald-600"
              onClick={() => setCurrentPage('cart')}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="border-t overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 py-3 whitespace-nowrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage('shop');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );

  // Home Page
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Shohoz Bazar</h1>
          <p className="text-xl mb-8">সবকিছু এক জায়গায়, সহজে</p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Truck className="w-12 h-12 mx-auto mb-3 text-emerald-600" />
            <h3 className="font-semibold mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-600">1-2 days delivery</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <RotateCcw className="w-12 h-12 mx-auto mb-3 text-emerald-600" />
            <h3 className="font-semibold mb-1">Easy Returns</h3>
            <p className="text-sm text-gray-600">7 days return policy</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Shield className="w-12 h-12 mx-auto mb-3 text-emerald-600" />
            <h3 className="font-semibold mb-1">100% Authentic</h3>
            <p className="text-sm text-gray-600">Original products</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 text-4xl">💵</div>
            <h3 className="font-semibold mb-1">Cash on Delivery</h3>
            <p className="text-sm text-gray-600">Pay when you receive</p>
          </div>
        </div>
      </div>

      {/* Flash Sale */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-8 px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">⚡ Flash Sale</h2>
            <div className="bg-white text-red-500 px-4 py-2 rounded-lg font-bold">
              Ends in: 5h 23m
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.filter(p => p.discount >= 25).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Deals */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6">🔥 Top Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">⭐ Bestsellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.filter(p => p.rating >= 4.5).slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">❤️ Customers Love Shohoz Bazar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Rahim Ahmed', rating: 5, text: 'Amazing service! Got my order within 24 hours.' },
            { name: 'Sadia Khan', rating: 5, text: 'Best prices and authentic products. Highly recommend!' },
            { name: 'Karim Hassan', rating: 5, text: 'Easy returns and great customer support. Love it!' },
          ].map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-3">"{review.text}"</p>
              <p className="font-semibold">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center text-6xl cursor-pointer"
           onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}>
        {product.image}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <Heart 
            className={`w-5 h-5 ${wishlist.find(item => item.id === product.id) ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-emerald-600"
            onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-emerald-600">৳{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">৳{product.oldPrice}</span>
          )}
        </div>
        
        <div className="text-xs text-gray-600 mb-3">
          <Truck className="w-3 h-3 inline mr-1" />
          Delivery: {product.delivery}
        </div>
        
        {product.stock < 20 && (
          <div className="text-xs text-red-600 mb-2">⚠️ Only {product.stock} left!</div>
        )}
        
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
        </h1>
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  // Product Detail Page
  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-2 text-emerald-600 mb-6 hover:underline"
        >
          ← Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-9xl">
              {selectedProduct.image}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-semibold">{selectedProduct.rating}</span>
              <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-emerald-600">৳{selectedProduct.price}</span>
              {selectedProduct.oldPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">৳{selectedProduct.oldPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                    -{selectedProduct.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Delivery: {selectedProduct.delivery}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="w-5 h-5 text-emerald-600" />
                <span>7 days easy return policy</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>100% Authentic product</span>
              </div>
            </div>

            {selectedProduct.stock < 20 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-600 font-semibold">⚠️ Hurry! Only {selectedProduct.stock} left in stock</p>
              </div>
            )}

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => { addToCart(selectedProduct); setCurrentPage('cart'); }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 transition-colors"
              >
                <Heart 
                  className={`w-6 h-6 ${wishlist.find(item => item.id === selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </button>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Product Description</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• High quality and authentic product</li>
                <li>• Perfect for daily use</li>
                <li>• Great value for money</li>
                <li>• Fast delivery across Bangladesh</li>
                <li>• Cash on Delivery available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cart Page
  const CartPage = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                  {item.image}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-emerald-600">৳{item.price}</span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">৳{item.oldPrice}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Delivery: {item.delivery}</div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-2 border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">৳{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold">{cartTotal >= 500 ? 'FREE' : '৳60'}</span>
                </div>
                {cartTotal < 500 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm">
                    💰 Add ৳{500 - cartTotal} more for FREE delivery!
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-600">৳{cartTotal < 500 ? cartTotal + 60 : cartTotal}</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-lg transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => setCurrentPage('shop')}
                className="w-full border-2 border-gray-300 hover:border-emerald-600 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Checkout Page
  const CheckoutPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      address: '',
      area: '',
      paymentMethod: 'cod'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (step < 3) {
        setStep(step + 1);
      } else {
        setCurrentPage('confirmation');
        setCart([]);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map(num => (
                  <div key={num} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= num ? 'bg-emerald-600 text-white' : 'bg-gray-200'
                    }`}>
                      {num}
                    </div>
                    {num < 3 && (
                      <div className={`w-16 md:w-32 h-1 mx-2 ${
                        step > num ? 'bg-emerald-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border rounded-lg focus:border-emerald-500 focus:outline-none"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border rounded-lg focus:border-emerald-500 focus:outline-none"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Full Address *</label>
                        <textarea
                          required
                          rows="3"
                          className="w-full px-4 py-3 border rounded-lg focus:border-emerald-500 focus:outline-none"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Area/City *</label>
                        <select
                          required
                          className="w-full px-4 py-3 border rounded-lg focus:border-emerald-500 focus:outline-none"
                          value={formData.area}
                          onChange={(e) => setFormData({...formData, area: e.target.value})}
                        >
                          <option value="">Select Area</option>
                          <option value="dhaka">Dhaka</option>
                          <option value="chattogram">Chattogram</option>
                          <option value="sylhet">Sylhet</option>
                          <option value="rajshahi">Rajshahi</option>
                          <option value="khulna">Khulna</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    <div className="space-y-3">
                      {[
                        { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
                        { id: 'bkash', name: 'bKash', icon: '📱' },
                        { id: 'nagad', name: 'Nagad', icon: '📱' },
                        { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                      ].map(method => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.paymentMethod === method.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                            className="w-5 h-5"
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-semibold">{method.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h3 className="font-semibold mb-2">Delivery Information</h3>
                        <p>{formData.name}</p>
                        <p>{formData.phone}</p>
                        <p>{formData.address}</p>
                        <p>{formData.area}</p>
                      </div>
                      <div className="border-b pb-4">
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <p className="capitalize">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition-colors"
                  >
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{cartTotal >= 500 ? 'FREE' : '৳60'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-emerald-600">৳{cartTotal < 500 ? cartTotal + 60 : cartTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Order Confirmation Page
  const ConfirmationPage = () => (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="text-5xl">✓</div>
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-2">Thank you for shopping with Shohoz Bazar</p>
        <p className="text-gray-600 mb-8">Order ID: #SB{Math.floor(Math.random() * 100000)}</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="font-bold mb-4">What's Next?</h2>
          <div className="space-y-3 text-left">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
              <p>We'll send you a confirmation SMS shortly</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
              <p>Your order will be packed within 24 hours</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
              <p>Delivery within 1-3 business days</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-semibold"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );

  // Wishlist Page
  const WishlistPage = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length} items)</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite items here!</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Shohoz Bazar</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted online marketplace for quality products at the best prices.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-6 h-6 cursor-pointer hover:text-emerald-400" />
              <Instagram className="w-6 h-6 cursor-pointer hover:text-emerald-400" />
              <Twitter className="w-6 h-6 cursor-pointer hover:text-emerald-400" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Track Order</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Return & Refund</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Shipping Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +880 1234-567890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@shohozbazar.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Shohoz Bazar. All rights reserved.</p>
          <p className="mt-2">💳 We Accept: bKash | Nagad | Rocket | Cards | Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
      <div className="grid grid-cols-5 gap-1 p-2">
        {[
          { icon: '🏠', label: 'Home', page: 'home' },
          { icon: '🛍️', label: 'Shop', page: 'shop' },
          { icon: '🔍', label: 'Search', action: () => document.querySelector('input[type="text"]').focus() },
          { icon: '❤️', label: 'Wishlist', page: 'wishlist', badge: wishlist.length },
          { icon: '🛒', label: 'Cart', page: 'cart', badge: cartCount },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => item.page ? setCurrentPage(item.page) : item.action?.()}
            className="flex flex-col items-center gap-1 py-2 relative"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute top-1 right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header />
      
      <main className="min-h-screen">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'confirmation' && <ConfirmationPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ShohozBazar;
