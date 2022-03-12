<template>
    <section>
        <AppHeader/>
        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'اضافة فاتورة'"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <router-link to="bills">
                            <a class="btn btn-dark back-icon">
                            <i class="fa fa-arrow-right"></i> رجوع</a>
                            </router-link>
                        </div>
                        <div class="card-body p-3 col-md-8 col-sm-12 mx-auto mb-3">
                            <form @submit.prevent="onSubmit" class="row">

                                <div class="col-md-6 col sm-12">
                                    <div class="form-group">
                                    <label for="clientName">اسم الزبون</label>
                                    <input type="text" class="form-control" v-model="product.client" id="clientName">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductName">المنتج</label>
                                        <input type="text" class="form-control" v-model="product.productName" id="ProductName">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductQuantity">الكمية</label>
                                        <input type="number" class="form-control" v-model="product.quantity" id="ProductQuantity">
                                    </div>
                                </div>

                                <div class="col-md-6 col sm-12">
                                    <div class="form-group">
                                    <label for="ProductPrice">السعر</label>
                                    <input type="text" class="form-control" v-model="product.price" id="ProductPrice">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductAmount">المبلغ المستلم</label>
                                        <input type="text" class="form-control" v-model="product.amount" id="ProductAmount">
                                    </div>
                                    <div class="form-group">
                                        <label for="total">المبلغ الإجمالي</label>
                                        <h6 v-if="product.quantity == null || product.quantity == null">0 شيكل </h6>
                                        <h6 v-else>{{ product.total =  product.quantity * product.price }} شيكل </h6>
                                    </div>
                                </div>    
                                <button type="submit" class="btn bg-gradient-primary">اضافة</button>
                            </form>
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

import AppHeader from "../components/AppHeader.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router"

export default {
    name: "AddBill",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    data(){
        return{
            product: {},
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            router.push({
                name:"Login"
            })
        }
    },
    methods:{
        onSubmit(){
            var billID = firebase.firestore.collection("Bills").doc().id
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
            var remaining = this.product.total - this.product.amount
            const billNumber = Math.floor(Math.random() * (100000 - 1 + 10)) + 1
            var FinalBill = {
                id: billID,
                billNumber: billNumber,
                clientName: this.product.client,
                productName: this.product.productName,
                ProductQuantity: this.product.quantity,
                ProductPrice: this.product.price,
                receivedAmount: this.product.amount,
                totalPrice: this.product.total,
                remainingAmount: remaining,
                adminID: this.$session.get('AdminID'),
                date: date
            }
            firebase.firestore.collection("Bills").doc(billID).set(FinalBill).then(()=>{
                router.push({
                    name: "Bills"
                })
            }).catch((e)=>{
                console.log('Error' + e)
            })
        }
    }
}
</script>