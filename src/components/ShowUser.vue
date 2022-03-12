<template>
      <div>
        <AppHeader/>

        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'بيانات المستخدم'"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <a @click="backToUsers()" class="btn btn-dark back-icon">
                            <i class="fa fa-arrow-right"></i> رجوع</a>
                        </div>
                        <div class="card-body p-3 col-12 mx-auto mt-3 mb-3 row">
                            <div class="col-md-4 col-sm-12 text-center user_avatar">
                                <img v-bind:src="user.image" width="100" class="rounded mx-auto d-block">
                                <h6 class="mt-2 mb-2">{{ user.name }}</h6>
                                <p>
                                    <span v-if="user.gender == 0" class="user-gender text-muted text-muted-small">
                                    ذكر
                                    </span>
                                    <span v-else-if="user.gender == 1" class="user-gender text-muted text-muted-small">
                                    أنثى
                                    </span>
                                    -
                                    <span class="user-birthdate text-muted text-muted-small">
                                    {{ user.dateOfBirth }}
                                    </span>
                                </p>
                            </div>
                            <div class="col-md-8 col-sm-12">
                                <div class="user_type mb-2">
                                    <span v-if="user.userType == 'PERSONAL'" class="btn bg-gradient-primary">حساب شخصي</span>
                                    <span v-else-if="user.userType == 'COMPANY'" class="btn bg-gradient-primary">حساب شركة</span>
                                    <span v-else-if="user.userType == 'STORE'" class="btn bg-gradient-primary">حساب متجر</span>
                                </div>

                                <div class="location">
                                    <span class="text-muted">
                                        نبذة :
                                    </span>
                                    <span class="bio_details ml-10">{{ user.bio }}</span>
                                </div>
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
    name:"ShowUser",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    data(){
        return{
            key: "",
            user: {}
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            router.push({
                name:"Login"
            })
        }
        
        firebase.firestore
            .collection("Users")
            .doc(this.$route.params.id)
            .get()
            .then((doc)=>{
                if (doc.exists) {
                    this.key = doc.id,
                    this.user = doc.data()
                } else {
                    console.log("user not found")
                }
        })
    },
    methods:{
        backToUsers(){
            router.push({
                name:"Users"
            })
        }
    }
}
</script>

<style scoped>
.user_avatar{
    border-left: 2px solid #eee;
}
.bio_details {
    display: block;
    margin-top: 10px;
}
</style>