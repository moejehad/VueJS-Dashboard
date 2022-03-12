<template>
    <div >
        <main class="main-content position-relative max-height-vh-100 h-100 mt-7 border-radius-lg">
                <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-4 mx-auto ">
                        <div class="card">
                            <div class="card-header text-center mt-3">
                                <h4>تسجيل دخول</h4>
                            </div>
                        <div class="card-body p-3 col-10 mx-auto mt-0 mb-2">
                                <form @submit.prevent="onSubmit">
                                <div class="mb-3">
                                    <label for="email">البريد الإلكتروني</label>
                                    <input type="email" class="form-control" id="email" v-model="admin.email">
                                </div>
                                <div class="mb-3">
                                    <label for="password">كلمة المرور</label>
                                    <input type="password" class="form-control" id="password" v-model="admin.password">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn bg-gradient-primary w-100">دخول</button>
                                </div>
                                </form>
                            <p v-show="this.error" class="error alert alert-danger text-white">{{ this.error }}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </main>

    </div>
</template>

<script>

import firebase from "../components/FirebaseInit";
import router from '../router';

export default {
    name: "Login",
    data(){
        return{
            admin:{},
            error:null
        }
    },
    methods:{
        onSubmit(){
            firebase.auth.signInWithEmailAndPassword(this.admin.email,this.admin.password)
            .then(()=>{
                firebase.firestore.collection("Admins")
                .get()
                .then((querySnapshot) =>{
                    querySnapshot.forEach((doc)=>{
                    if (doc.data().email == this.admin.email) {
                        this.$session.start()
                        this.$session.set('AdminID', doc.data().id)
                        router.push({
                            name:"Home"
                        })
                    }
                    })
                }).catch(()=>{
                    this.error = 'هذا الأدمن غير مسجل'
                })
            }).catch(()=>{
                this.error = 'يرجى التأكد من بريدك الإلكتروني أو كلمة المرور'
            })
        }
    },
}
</script>

<style scoped>
.error {
    font-size: 13px !important;
}
</style>