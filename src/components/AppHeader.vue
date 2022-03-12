<template>

    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-end me-3 rotate-caret ps ps__rtl ps--active-y bg-gradient-primary" id="sidenav-main">
      <div class="sidenav-header">
        <a class="navbar-brand m-0 text-center" href="#">
          <img :src="img" class="navbar-brand-img" width="80" alt="main_logo">
        </a>
      </div>

        <hr class="horizontal dark mt-0">
      <div class="collapse navbar-collapse px-0 w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
        <ul id="nav" class="navbar-nav">

          <router-link to="/" tag="li" class="nav-item" exact>
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-home text-dark" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text me-1">الرئيسية</span>
            </a>
          </router-link>

          <router-link to="/users" tag="li" class="nav-item">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-users text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">المستخدمين</span>
            </a>
          </router-link>

          <router-link to="/orders" tag="li" class="nav-item">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-shopping-bag text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">طلبات الشراء</span>
            </a>
          </router-link>


          <router-link to="/products" tag="li" class="nav-item">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-list text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">المنتجات</span>
            </a>
          </router-link>



          <router-link to="/bills" tag="li" class="nav-item">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-money-bill text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">الفواتير</span>
            </a>
          </router-link>


          <router-link to="/support" tag="li" class="nav-item">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-headset text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">الدعم الفني</span>
            </a>
          </router-link>


          <router-link to="/profile" tag="li" class="nav-item">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-user text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">حسابي</span>
            </a>
          </router-link>


          <li @click="logout()" class="nav-item logout">
          <a class="nav-link">
            <div class="icon icon-shape icon-sm border-radius-sm bg-white text-center ms-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-sign-out-alt text-dark" aria-hidden="true"></i>
                </div>
            <span class="nav-link-text me-1">تسجيل خروج</span>
            </a>
          </li>
        </ul>
        
    </div>
    </aside>

</template>


<script>
import img from "../assets/logoHeader.svg"
import firebase from "../components/FirebaseInit";
import router from '../router';

export default {
  data: function(){
    return {
      img : img
    }
  },
  methods:{
    logout(){
      firebase.auth.signOut().then(()=>{
        firebase.auth.onAuthStateChanged(()=>{
          this.$session.destroy()
          router.push({
            name: "Login"
          })
        })
      })
    }
  },
  name: "AppHeader",
};
</script>

<style scoped>
.navbar-nav li a span {
  color: #fff;
}
.nav-link {
  margin: 0 !important;
}
.logout{
  cursor: pointer;
}
</style>