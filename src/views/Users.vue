<template>
<div>

  <AppHeader/>

<main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
  <Navbar :title="'المستخدمين'"/>
  <div class="container-fluid py-2">
      <div class="row my-2">
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">

                <div class="type-users mb-3 mt-2">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="all">جميع الحسابات</label>
                    <input @click="AllUsers()" checked class="form-check-input" type="radio" name="inlineRadioOptions" id="all" value="all">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="personal">حسابات شخصية </label>
                    <input @click="ShowUserType('PERSONAL')" class="form-check-input" type="radio" name="inlineRadioOptions" id="personal">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="company">حسابات شركات</label>
                    <input @click="ShowUserType('COMPANY')" class="form-check-input" type="radio" name="inlineRadioOptions" id="company">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="store">حسابات متاجر</label>
                    <input @click="ShowUserType('STORE')" class="form-check-input" type="radio" name="inlineRadioOptions" id="store">
                  </div>
                </div>
              
                <table class="table text-right">
                  <thead>
                    <tr>
                      <th class="text-secondary text-xxs font-weight-bolder">المستخدم</th>
                      <th class="text-secondary text-xxs font-weight-bolder">نوع الحساب</th>
                      <th class="text-secondary text-xxs font-weight-bolder">نبذة</th>
                      <th class="text-secondary text-xxs font-weight-bolder">تاريخ الميلاد</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="user in usersList" v-bind:key="user.id">
                      <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img v-bind:src="user.image" class="avatar avatar-sm" alt="user">
                            </div>
                            <div class="d-flex flex-column justify-content-center me-3">
                              <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                              <p class="text-xs text-secondary mb-0">{{ user.email }}</p>
                            </div>
                          </div>
                      </td>
                      <td>
                        <div class="align-middle text-sm">
                          <h6 class="text-sm font-weight-bold mb-0">حساب</h6>
                          <h6 v-if="user.userType == 'PERSONAL' " class="text-sm text-secondary mb-0">شخصي</h6>
                          <h6 v-else-if="user.userType == 'COMPANY' " class="text-sm text-secondary mb-0">شركة</h6>
                          <h6 v-else-if="user.userType == 'STORE' " class="text-sm text-secondary mb-0">متجر</h6>
                        </div>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 class="mb-0 text-sm">{{ user.bio }}</h6>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 class="mb-0 text-sm">{{ user.dateOfBirth }}</h6>
                      </td>
                      <td class="text-center">
                        <a @click="ShowUser(user.key)" class="btn btn-success font-weight-bold text-xs" data-target="#EditUser">
                          <i class="fa fa-eye"></i>
                        </a>
                        <a @click="DeleteUser(user.key)" class="btn btn-danger font-weight-bold text-xs me-1">
                          <i class="fa fa-trash"></i>
                        </a>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </div>
</main>
</div>
</template>

<script>

import AppHeader from "../components/AppHeader.vue"
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router"

export default {
  name: "Users",
  data(){
    return {
      usersList: []
    }
  },
  beforeCreate() {
    
    if (!this.$session.exists()) {
      router.push({
        name:"Login"
      })
    }

  },
  created(){
    firebase.firestore
          .collection("Users")
          .orderBy("registerDate",'desc')
          .onSnapshot((querySnapshot)=>{
              this.usersList = [],
              querySnapshot.forEach((doc) =>{
                this.usersList.push({
                  key: doc.data().id,
                  name: doc.data().name,
                  email: doc.data().email,
                  password: doc.data().password,
                  userType: doc.data().userType,
                  gender: doc.data().gender,
                  image: doc.data().image,
                  bio: doc.data().bio,
                  dateOfBirth: doc.data().dateOfBirth,
                  qrCode: doc.data().qrCode
              })
          })
      })
  },
  methods: {
        DeleteUser(id) {
            if (confirm("هل أنت متأكد ؟")) {
                firebase.firestore
                    .collection("Users")
                    .doc(id)
                    .delete().then(()=>{
                      router.push({
                        name:"Users"
                      })
                    })
            }
        },
        ShowUser(userID){
          router.push({
            name:"ShowUser", params:{id:userID}
          })
        },
        ShowUserType(type){
          firebase.firestore
          .collection("Users")
          .where("userType","==",type)
          .onSnapshot((querySnapshot)=>{
              this.usersList = [],
              querySnapshot.forEach((doc) =>{
                this.usersList.push({
                  key: doc.data().id,
                  name: doc.data().name,
                  email: doc.data().email,
                  password: doc.data().password,
                  userType: doc.data().userType,
                  gender: doc.data().gender,
                  image: doc.data().image,
                  bio: doc.data().bio,
                  dateOfBirth: doc.data().dateOfBirth,
                  qrCode: doc.data().qrCode
              })
          })
      })
      },
      AllUsers(){
        firebase.firestore
          .collection("Users")
          .orderBy("registerDate",'desc')
          .onSnapshot((querySnapshot)=>{
              this.usersList = [],
              querySnapshot.forEach((doc) =>{
                this.usersList.push({
                  key: doc.data().id,
                  name: doc.data().name,
                  email: doc.data().email,
                  password: doc.data().password,
                  userType: doc.data().userType,
                  gender: doc.data().gender,
                  image: doc.data().image,
                  bio: doc.data().bio,
                  dateOfBirth: doc.data().dateOfBirth,
                  qrCode: doc.data().qrCode
              })
          })
      })
      }
  },
  components: {
    Navbar,
    Footer,
    AppHeader
  },
};
</script>
