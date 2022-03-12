<template>
    <section>
        <AppHeader/>

        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'بيانات الطلب'"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <router-link to="/orders" class="btn btn-dark back-icon">
                            <i class="fa fa-arrow-right"></i> رجوع </router-link>
                        </div>
                        <div class="card-body p-3 col-12 mx-auto mt-3 mb-3 row">
                            <div class="col-md-4 col-sm-12 text-center user_avatar">
                                <img v-bind:src="order.items.image" width="100" class="rounded mx-auto d-block">
                                <h6 class="mt-2 mb-2">{{ order.items.name }}</h6>
                                <span class="text-muted text-muted-small">{{ order.items.description }} </span> <br>
                                <span class="text-muted text-muted-small">{{ order.items.price }} شيكل</span>
                            </div>

                            <div class="col-md-8 col-sm-12">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="mb-2">
                                            <h6 class="mt-2 mb-2">بيانات التسليم : </h6>
                                            <p class="ml-10">اسم المستلم : {{ order.receiverName }}</p>
                                            <p class="ml-10">رقم المستلم : {{ order.receiverPhone }}</p>
                                            <p class="ml-10">عنوان التسليم : {{ order.address }}</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12">
                                        <div class="mb-2">
                                            <h6 class="mt-2 mb-2">الطلب : </h6>
                                            <p class="ml-10">تاريخ التوصيل : {{ order.dateToDeliver }}</p>
                                            <p class="ml-10">الكمية : {{ order.quantity }}</p>
                                            <p class="ml-10">السعر الاجمالي : {{ order.totalPrice }} شيكل</p>
                                            <p class="ml-10">تاريخ الطلب : {{ order.dateOfOrder }}</p>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-2">
                                            <h6 v-if="order.orderStatus == 'UNDER_REVIEW'" class="mt-2 mb-2">حالة الطلب : قيد المراجعة</h6>
                                            <h6 v-if="order.orderStatus == 'APPROVED'" class="mt-2 mb-2">حالة الطلب : تم الموافقة </h6>
                                            <h6 v-if="order.orderStatus == 'DELIVERY_IN_PROGRESS'" class="mt-2 mb-2">حالة الطلب : جاري التوصيل</h6>
                                            <h6 v-if="order.orderStatus == 'RECEIPT'" class="mt-2 mb-2">حالة الطلب : تم الاستلام </h6>
                                            <h6 v-if="order.orderStatus == 'CANCELED'" class="mt-2 mb-2">حالة الطلب : ملغى</h6>
                                            
                                            <div class="form-group">
                                                <label for="productType">تغيير الحالة</label>
                                                <select v-model="order.orderStatus" class="form-control">
                                                    <option value="APPROVED">تم الموافقة</option>
                                                    <option value="DELIVERY_IN_PROGRESS">جاري التوصيل</option>
                                                    <option value="RECEIPT">تم الاستلام</option>
                                                    <option value="CANCELED">ملغى</option>
                                                </select>
                                            </div>
                                            <a @click.prevent="onClick()" class="btn bg-gradient-primary">تغيير</a>
                                        </div>
                                    </div>
                                </div>
                                
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
    name: "ShowOrder",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    data(){
        return{
            order: {}
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            router.push({
                name:"Login"
            })
        }

        firebase.firestore
            .collectionGroup("Orders")
            .where("id", "==", this.$route.params.id)
            .get()
            .then((doc)=>{
                doc.forEach((data)=>{
                    this.order = data.data()
                })
        })
    },
    methods:{
        onClick(){
            firebase.firestore.collectionGroup("Orders")
            .where("id", "==", this.$route.params.id)
            .get()
            .then((doc)=>{
                doc.docs.forEach((snapshot)=>{
                    snapshot.ref.update({orderStatus:this.order.orderStatus})
                })
            }).then(()=>{
                    router.push({
                        name: "Orders"
                    })
                })

        }
    }
}
</script>