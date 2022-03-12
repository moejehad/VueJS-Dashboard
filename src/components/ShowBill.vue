<template>
    <section>
        <AppHeader/>

        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'بيانات الفاتورة'"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <router-link to="/bills">
                                <a class="btn btn-dark back-icon">
                                <i class="fa fa-arrow-right"></i> رجوع</a>
                            </router-link>
                        </div>
                        <div class="card-body p-3 col-12 mx-auto mb-3 row">
                            <div class="border-0 p-4 mb-2 bg-gray-100 border-radius-lg">
                                <div id="table" class="table-responsive">
                                    <h6 class="text-center mt-2 mb-4">فاتورة </h6>
                                    <table class="table text-right">
                                        <thead>
                                        <tr>
                                            <th class="text-secondary text-xxs font-weight-bolder">رقم الفاتورة</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">المشتري</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">المنتج</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">الكمية</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">السعر</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">المبلغ الإجمالي</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">المبلغ المستلم</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">المبلغ المتبقي</th>
                                            <th class="text-secondary text-xxs font-weight-bolder">تاريخ الفاتورة</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm"> {{ Bill.billNumber }}</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm"> {{ Bill.clientName }}</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm">{{ Bill.productName }}</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm">{{ Bill.ProductQuantity }}</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm">{{ Bill.ProductPrice }} شيكل</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm">{{ Bill.totalPrice }} شيكل</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm">{{ Bill.receivedAmount }} شيكل</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 v-if="Bill.remainingAmount <= 0" class="mb-0 text-sm">مدفوعة</h6>
                                                <h6 v-else class="mb-0 text-sm">{{ Bill.remainingAmount }} شيكل</h6>
                                            </div>
                                            </td>

                                            <td>
                                            <div class="align-middle text-sm">
                                                <h6 class="mb-0 text-sm">{{ Bill.date }}</h6>
                                            </div>
                                            </td>

                                        </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                            <div class="me-auto text-end">
                                <a @click="print()" class="btn btn-link text-dark px-3 mb-0">
                                    <i class="fas fa-print text-dark me-2"></i
                                    > طباعة</a>
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
import router from '../router';

export default {
    name: "ShowBill",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    data(){
        return{
            key: "",
            Bill: {}
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            router.push({
                name:"Login"
            })
        }
        firebase.firestore
            .collection("Bills")
            .doc(this.$route.params.id)
            .get()
            .then((doc)=>{
                if (doc.exists) {
                    this.key = doc.id,
                    this.Bill = doc.data()
                } else {
                    alert("هذه الفاتورة غير متوفرة")
                    router.push({
                        name: "Bills"
                    })
                }
        })
    },
    methods:{
        print () {
            this.$htmlToPaper('table');
        }
    }
}
</script>