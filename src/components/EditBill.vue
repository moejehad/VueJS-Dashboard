<template>
    <section>
        <AppHeader/>
        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'تعديل ' + this.Bill.productName"/>
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
                        <div class="card-body p-3 col-md-8 col-sm-12 mx-auto mb-3">
                            <form @submit.prevent="onSubmit" class="row">

                                <div class="col-md-6 col sm-12">
                                    <div class="form-group">
                                    <label for="clientName">اسم الزبون</label>
                                    <input type="text" v-model="Bill.clientName" class="form-control"  id="clientName">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductName">المنتج</label>
                                        <input type="text" v-model="Bill.productName" class="form-control"  id="ProductName">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductQuantity">الكمية</label>
                                        <input type="number" v-model="Bill.ProductQuantity" class="form-control" id="ProductQuantity">
                                    </div>
                                </div>

                                <div class="col-md-6 col sm-12">
                                    <div class="form-group">
                                    <label for="ProductPrice">السعر</label>
                                    <input type="text" v-model="Bill.ProductPrice" class="form-control" id="ProductPrice">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductAmount">المبلغ المستلم</label>
                                        <input type="text" v-model="Bill.receivedAmount" class="form-control" id="ProductAmount">
                                    </div>
                                    <div class="form-group">
                                        <label for="total">المبلغ الإجمالي</label>
                                         <h6 v-if="Bill.ProductQuantity == null || Bill.ProductPrice == null">0 شيكل </h6>
                                        <h6 v-else>{{ Bill.totalPrice =  Bill.ProductQuantity * Bill.ProductPrice }} شيكل </h6>
                                    </div>
                                </div>    
                                <button type="submit" class="btn bg-gradient-primary">تحديث</button>
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
import AppHeader from "../components/AppHeader.vue"
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router"

export default {
    name: "EditBill",
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
        onSubmit(){
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
            var remaining = this.Bill.totalPrice - this.Bill.receivedAmount
            firebase.firestore.collection("Bills")
            .doc(this.$route.params.id)
            .update({
                clientName:this.Bill.clientName,
                productName:this.Bill.productName,
                ProductQuantity:this.Bill.ProductQuantity,
                ProductPrice:this.Bill.ProductPrice,
                receivedAmount:this.Bill.receivedAmount,
                totalPrice:this.Bill.totalPrice,
                adminID:this.$session.get('AdminID'),
                remainingAmount: remaining,
                date: date,
            }).then(()=>{
                router.push({
                    name: "Bills"
                })
            })
        }
    },
}
</script>