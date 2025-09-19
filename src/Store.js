import { configureStore, createSlice } from "@reduxjs/toolkit";
import Orders from "./Orders";

const prodSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { id: 1, name: "Tomato", price: 25,image: "/Tomato.png" },
      { id: 2, name: "Potato", price: 20,  image: "/Potato.png"},
      { id: 3, name: "Onion", price: 30, image: "/Onion.png" },
      { id: 4, name: "Spinach", price: 15, image: "/Spinach.png" },
      { id: 5, name: "Carrot", price: 40, image: "/Carrot.png" },
      { id: 6, name: "Cabbage", price: 35, image: "/Cabbage.png" },
      { id: 7, name: "Cauliflower", price: 50, image: "/Cauliflower.png" },
      { id: 8, name: "Brinjal", price: 28, image: "/Brinjal.png" },
      { id: 9, name: "Beans", price: 45,image: "/Beans.png" },
      { id: 10, name: "Capsicum", price: 55, image: "/Capsicum.png" },
      { id: 11, name: "Bitter Guard", price: 30,  image: "/Bitter.png"},
      { id: 12, name: "Bendi", price: 35,  image: "/Bendi.png"},
      { id: 13, name: "Beetroot", price: 55,  image: "/Beetroot.png"},
      { id: 14, name: "Broccoli", price: 50,  image: "/Broccoli.png"},
      { id: 15, name: "Cucumber", price: 35,  image: "/Cucumber.png"},
      { id: 16, name: "Sweet Potatos", price: 40,  image: "/Sweetpotato.png"},
      { id: 17, name: "Pumpkin", price: 80,  image: "/Pumpkin.png"},
      { id: 18, name: "Green Peas", price: 50,  image: "/Green Peas.png"},
      { id: 19, name: "Radish", price: 35,  image: "/Radish.png"},
      { id: 20, name: "garlic", price: 100,  image: "/Garlic.png"},
    ],
    nonVeg: [
      { id: 1, name: "Whole Chicken ", price: 300, image: "/Whole chicken.png"},
      { id: 2, name: "Chicken Lollipops", price: 220, image: "/Lollipops.png" },
      { id: 3, name: "Chicken Wings", price: 180, image: "/Ch Wings.png" },
      { id: 4, name: "Chicken Breast", price: 200, image: "/Breast.png" },
      { id: 5, name: "Chicken Liver", price: 200, image: "/Ch liver.png" },
      { id: 6, name: "Mutton", price: 450, image: "/Raw Mutton.png" },
      { id: 7, name: "Boneless Mutton ", price: 75, image: "/Mu Boneless.png"},
      { id: 8, name: "Mutton Brain", price: 240, image: "/Mutton Brain.png"},
      { id: 9, name: "Crab curry", price: 600, image: "/Raw fish.png" },
      { id: 10, name: "Fish Biryani", price: 300, image: "/prawns.png" }
    ],
    drinks: [
      { id: 1, name: "Milk", price: 60, image:"/Milk.png" },
      { id: 2, name: "Curd", price: 40, image:"/Curd.png" },
      { id: 3, name: "Butter", price: 80, image:"/Butter.png" },
      { id: 4, name: "Cheese", price: 50, image:"/Cheese.png" },
      { id: 5, name: "Ghee", price: 400,image:"/Ghee.png" },
      { id: 6, name: "Milk", price: 60, image:"/Milk.png" },
      { id: 7, name: "Curd", price: 40, image:"/Curd.png" },
      { id: 8, name: "Butter", price: 80, image:"/Butter.png" },
      { id: 9, name: "Cheese", price: 50, image:"/Cheese.png" },
      { id: 10, name: "Ghee", price: 400,image:"/Ghee.png" }
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
