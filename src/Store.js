import { configureStore, createSlice } from "@reduxjs/toolkit";
import Orders from "./Orders";

const prodSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { id: 1, name: "Tomato", price: 25, description: "Fresh red tomatoes rich in vitamins, perfect for curries and salads.",image: "/Tomato.png" },
      { id: 2, name: "Potato", price: 20, description: "Farm-fresh potatoes, a staple for multiple delicious dishes.", image: "/Potato.png"},
      { id: 3, name: "Onion", price: 30, description: "Crisp onions with strong flavor, essential for everyday cooking.",image: "/Onion.png" },
      { id: 4, name: "Spinach", price: 15, description: "Green leafy spinach, full of iron and nutrients for a healthy diet.",image: "/Spinach.png" },
      { id: 5, name: "Carrot", price: 40, description: "Crunchy carrots, naturally sweet, great for salads and juices.",image: "/Carrot.png" },
      { id: 6, name: "Cabbage", price: 35, description: "Fresh cabbage, ideal for stir-fries, salads, and soups.",image: "/Cabbage.png" },
      { id: 7, name: "Cauliflower", price: 50, description: "Tender cauliflower florets, versatile for curries and fry dishes.",image: "/Cauliflower.png" },
      { id: 8, name: "Brinjal", price: 28, description: "Glossy brinjals with rich taste, perfect for curries and fries.",image: "/Brinjal.png" },
      { id: 9, name: "Beans", price: 45, description: "Green beans, fresh and crunchy, packed with fiber and vitamins.",image: "/Beans.png" },
      { id: 10, name: "Capsicum", price: 55, description: "Colorful capsicums with a unique flavor, great for salads and gravies.",image: "/Capsicum.png" },
      { id: 11, name: "Bitter Guard", price: 30, description: "Helps manage blood sugar levels and supports weight loss due to its fiber.", image: "/Bitter.png"},
      { id: 12, name: "Bendi", price: 35, description: "The vegetable is popular in many countries and is used in dishes.", image: "/Bendi.png"},
      { id: 13, name: "Beetroot", price: 55, description: "Known to support heart health and increase stamina.", image: "/Beetroot.png"},
      { id: 14, name: "Broccoli", price: 50, description: "Contains fiber and compounds like sulforaphane.", image: "/Broccoli.png"},
      { id: 15, name: "Cucumber", price: 35, description: "High in water content, making it excellent for hydration.", image: "/Cucumber.png"},
      { id: 16, name: "Sweet Potatos", price: 40, description: "Rich in beta-carotene, Vitamin A, and other essential nutrients", image: "/Sweetpotato.png"},

      
    ],
    nonVeg: [
      { id: 1, name: "Whole Chicken ", price: 300, description: "Whole Chicken which consists of 1.5 to 2.0kgs.",image: "/Whole chicken.png"},
      { id: 2, name: "Chicken Lollipops", price: 220, description: "Chicken Lollipops which are consists of 6 in a pack.",image: "/Lollipops.png" },
      { id: 3, name: "Chicken Wings", price: 180, description: "Chicken Wings which are consists of 5 in a pack.",image: "/Ch Wings.png" },
      { id: 4, name: "Chicken Breast", price: 200, description: "Chicken Breast is Rich in protien and the quantity we get is 500gms.",image: "/Breast.png" },
      { id: 5, name: "Chicken Liver", price: 200, description: "Chicken liver Which is freshly served and the quantity is 500gms.",image: "/Ch liver.png" },
      { id: 6, name: "Mutton", price: 450, description: "Mutton is the meat from an adult domestic sheep, distinct from lamb.",image: "/Raw Mutton.png" },
      { id: 7, name: "Boneless Mutton ", price: 75, description: "Mutton boneless refers to cuts of meat from goats bones was removed.",image: "/Mu Boneless.png"},
      { id: 8, name: "Mutton Brain", price: 240, description: "Mutton brain is rich in protien and good for health.",image: "/Mutton Brain.png"},
      { id: 9, name: "Crab curry", price: 600, description: "Fresh crab meat, tender and flavorful, perfect for seafood lovers.",image: "/Raw fish.png" },
      { id: 10, name: "Fish Biryani", price: 300, description: "Fish Biryani is very good in quality and it is flavourful.",image: "/prawns.png" }
    ],
    drinks: [
      { id: 1, name: "Milk", price: 60, description: "A nutritious liquid rich in calcium, protein, and essential vitamins",image:"/Milk.png" },
      { id: 2, name: "Curd", price: 40, description: "Fermented milk with a creamy texture, packed with probiotics",image:"/Curd.png" },
      { id: 3, name: "Butter", price: 80, description: "A smooth, creamy dairy product made by churning milk or cream",image:"/Butter.png" },
      { id: 4, name: "Cheese", price: 50, description: "A solid dairy product made by coagulating milk proteins",image:"/Cheese.png" },
      { id: 5, name: "Ghee", price: 400, description: "Clarified butter with a rich, nutty flavor, widely used in cooking",image:"/Ghee.png" }
    ]
  },
  reducers: {}
});

// Cart slice
const cardSlice = createSlice({
  name :"Cart",
  initialState:[],
  reducers:{
    addToCart : (state,action)=>{
      const item = action.payload;
      const existingItem = state.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
 incrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // if quantity == 1, remove item
          return state.filter(i => i.id !== action.payload);
        }
      }
      return state;
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});

const OrderSlice = createSlice({
  name : "Orders",
  initialState : [],
  reducers :{
    addOrder:(state,action)=>{
      console.log(action.payload);
      state.push(action.payload);
    },
  },

})
// Step 3: Configure store
const store = configureStore({
  reducer: {
    products: prodSlice.reducer, // ✅ Correct slice name
    Cart: cardSlice.reducer,
    Orders: OrderSlice.reducer,
  }
});

export const {addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cardSlice.actions;
export const  {addOrder} = OrderSlice.actions;

export default store;
