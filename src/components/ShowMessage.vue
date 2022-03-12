<template>
    <section>
        <AppHeader/>

        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'تفاصيل الرسالة'"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <router-link to="/support" class="btn btn-dark back-icon">
                            <i class="fa fa-arrow-right"></i> رجوع </router-link>
                        </div>
                        <div class="card-body p-3 col-12 mx-auto mt-1 mb-3 row">
                            <div class="mb-2">
                                <p class="ml-10">اسم المستخدم : {{ Message.userName }}</p>
                                <p class="ml-10">البريد الإلكتروني : {{ Message.userEmail }}</p>
                                <p class="ml-10">الموضوع : {{ Message.subject }}</p>
                                <p class="ml-10">الرسالة : {{ Message.message }}</p>
                                <p class="ml-10">تاريخ الرسالة : {{ Message.messageDate }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <Footer/>
            </div>
        </main>

    </section>
</template>

<script>
import AppHeader from "../components/AppHeader.vue"
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router"

export default {
    name: "ShowMessage",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    data(){
        return{
            Message: {}
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            router.push({
                name:"Login"
            })
        }

        firebase.firestore.collection("TechnicalSupportMessages")
            .doc(this.$route.params.id)
            .update({
                messageStatus:"1"
            })
        
    },
    created(){
        firebase.firestore
            .collection("TechnicalSupportMessages")
            .doc(this.$route.params.id)
            .get()
            .then((doc)=>{
                if (doc.exists) {
                    this.Message = doc.data()
                } else {
                    console.log("هذه الرسالة غير موجودة")
                }
        })
    }
}
</script>