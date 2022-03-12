<template>
    <div>
    <AppHeader/>
        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar :title="'اضافة منتج'"/>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <a @click="backToUsers()" class="btn btn-dark back-icon">
                            <i class="fa fa-arrow-right"></i> رجوع</a>
                        </div>
                        <div class="card-body p-3 col-md-8 col-sm-12 mx-auto mb-3 row">
                            <form @submit.prevent="onSubmit">
                                <div class="form-group">
                                    <label for="ProductImage">صورة المنتج</label>
                                    <input @change="uploadImage" type="file" class="form-control" id="ProductImage">
                                </div>
                                <div class="form-group">
                                    <label for="ProductName">اسم المنتج</label>
                                    <input type="text" class="form-control" v-model="product.name" id="ProductName">
                                </div>
                                <div class="form-group">
                                    <label for="ProductPrice">السعر</label>
                                    <input type="text" class="form-control" v-model="product.price" id="ProductPrice">
                                </div>
                                <div class="form-group">
                                    <label for="ProductDescription">وصف صغير</label>
                                    <input type="text" class="form-control" v-model="product.description" id="ProductDescription">
                                </div>
                                <div class="form-group">
                                    <label for="productType">نوع المنتج</label>
                                    <select v-model="product.productType" class="form-control">
                                        <option value="0">خاتم</option>
                                        <option value="1">بطاقة</option>
                                        <option value="2">تاج</option>
                                    </select>
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
    </div>
</template>

<script>

import AppHeader from "../components/AppHeader.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router"

export default {
    name: "AddProduct",
    components: {
        Navbar,
        Footer,
        AppHeader
    },
    data(){
        return{
            product: {}
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
        backToUsers(){
            router.push({
                name:"Products"
            })
        },
        uploadImage(e){
            let image = e.target.files[0];

            const storageRef = firebase.storage.ref();
            const uploadTask = storageRef.child("Products/"+ image.name).put(image);

            uploadTask.on('state_changed',() =>{
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                    this.product.image = downloadURL
                });
            });
        },
        onSubmit(){
            var productId = firebase.firestore.collection("Products").doc().id
            var FinalProfuct = {
                id: productId,
                image: this.product.image,
                name: this.product.name,
                price: this.product.price,
                description: this.product.description,
                productType: this.product.productType
            }
            firebase.firestore.collection("Products").doc(productId).set(FinalProfuct).then(()=>{
                router.push({
                    name: "Products"
                })
            }).catch((e)=>{
                console.log('Error' + e)
            })
        }
    }
}
</script>