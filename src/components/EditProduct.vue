<template>
    <div>
        <AppHeader/>

        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'تعديل '+ product.name"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <a @click="backToProducts()" class="btn btn-dark back-icon">
                            <i class="fa fa-arrow-right"></i> رجوع</a>
                        </div>
                        <div class="card-body p-3 col-12 mx-auto mt-3 mb-3 row">
                            <div class="col-md-6 col-sm-12">
                                <form @submit.prevent="onSubmit">
                                    <div class="form-group">
                                        <label for="ProductName">اسم المنتج</label>
                                        <input type="text" v-model="product.name" class="form-control"  id="ProductName">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductPrice">السعر</label>
                                        <input type="text" v-model="product.price" class="form-control"  id="ProductPrice">
                                    </div>
                                    <div class="form-group">
                                        <label for="ProductDescription">وصف صغير</label>
                                        <input type="text" v-model="product.description" class="form-control"  id="ProductDescription">
                                    </div>
                                    <button type="submit" class="btn bg-gradient-primary">حفظ</button>
                            </form>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div class="productName mb-4">
                                    <img v-bind:src="product.image" width="100" class="rounded d-block">
                                </div>
                                <div class="productName mb-4">
                                    <span class="text-muted">
                                        اسم المنتج :
                                    </span>
                                    <span class="bio_details ml-10 text-bold">{{ product.name }}</span>
                                </div>
                                <div class="productPrice mb-4">
                                    <span class="text-muted">
                                        سعر المنتج :
                                    </span>
                                    <span class="bio_details ml-10 text-bold">{{ product.price }}</span>
                                </div>
                                <div class="productDescription mb-4">
                                    <span class="text-muted">
                                        وصف المنتج :
                                    </span>
                                    <span class="bio_details ml-10 text-bold">{{ product.description }}</span>
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
    name: "EditProduct",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    methods:{
        backToProducts(){
            router.push({
                name:"Products"
            })
        },
        onSubmit(){
            firebase.firestore.collection("Products")
            .doc(this.$route.params.id)
            .update({
                name:this.product.name,
                price:this.product.price,
                description:this.product.description
            }).then(()=>{
                router.push({
                    name: "Products"
                })
            })
        }
    },
    data(){
        return{
            key: "",
            product: {}
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            router.push({
                name:"Login"
            })
        }
        firebase.firestore
            .collection("Products")
            .doc(this.$route.params.id)
            .get()
            .then((doc)=>{
                if (doc.exists) {
                    this.key = doc.id,
                    this.product = doc.data()
                } else {
                    console.log("هذا المنتج غير متوفر")
                }
        })
    },
}
</script>