<template>
    <div>
      
    <AppHeader/>

    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
      <Navbar :title="'حسابي'"/>
      <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12">
                <div class="card">
                  <div class="card-body p-3 col-xl-4 col-lg-5 col-md-7 mx-auto mt-5 mb-5">
                        <form @submit.prevent="onSubmit">
                          <div class="mb-3">
                            <label for="name">الاسم</label>
                            <input type="text" id="name" class="form-control" v-model="adminInfo.name" >
                          </div>
                          <div class="mb-3">
                            <label for="email">البريد الإلكتروني</label>
                            <input type="email" id="email" class="form-control" v-model="adminInfo.email" >
                          </div>
                          <div class="text-center">
                            <button type="submit" class="btn bg-gradient-primary w-100 mt-2 mb-2">تحديث</button>
                          </div>
                        </form>
                    <p v-show="this.success" class="alert alert-success text-white">{{ this.success }}</p>
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
  name: "Profile",
  components: {
    Navbar,
    Footer,
    AppHeader
  },
  data(){
    return{
      id: this.$session.get('AdminID'),
      adminInfo: {},
      success:null
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
            .collection("Admins")
            .doc(this.id)
            .get()
            .then((doc)=>{
                if (doc.exists) {
                    this.key = doc.id,
                    this.adminInfo = doc.data()
                } else {
                    console.log("هذا الادمن غير مسجل")
                }
        })
  },
  methods:{
    onSubmit(){
        firebase.firestore.collection("Admins")
            .doc(this.id)
            .update({
                name: this.adminInfo.name,
                email: this.adminInfo.email,
            }).then(()=>{
                this.success = 'تم تحديث البيانات بنجاح'
            })
    }
  }
};
</script>
