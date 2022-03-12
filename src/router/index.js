import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Orders from "../views/Orders.vue";
import Products from "../views/Products.vue";
import Bills from "../views/Bills.vue";
import Support from "../views/Support.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Search from "../views/Search.vue";
import ShowUser from "../components/ShowUser.vue";
import AddProduct from "../components/AddProduct.vue";
import EditProduct from "../components/EditProduct.vue";
import AddBill from "../components/AddBill.vue";
import ShowBill from "../components/ShowBill.vue";
import EditBill from "../components/EditBill.vue";
import ShowOrder from "../components/ShowOrder.vue";
import ShowMessage from "../components/ShowMessage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/bills",
    name: "Bills",
    component: Bills,
  },
  {
    path: "/support",
    name: "Support",
    component: Support,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/showUser/:id",
    name: "ShowUser",
    component: ShowUser,
  },
  {
    path: "/addProduct",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/editProduct/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/addBill",
    name: "AddBill",
    component: AddBill,
  },
  {
    path: "/showBill/:id",
    name: "ShowBill",
    component: ShowBill,
  },
  {
    path: "/editBill/:id",
    name: "EditBill",
    component: EditBill,
  },
  {
    path: "/showOrder/:id",
    name: "ShowOrder",
    component: ShowOrder,
  },
  {
    path: "/showMessage/:id",
    name: "ShowMessage",
    component: ShowMessage,
  },
  

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
