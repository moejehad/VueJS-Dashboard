<template>
    <div>
      <AppHeader/>
      <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
          <Navbar :title="'المنتجات'"/>
          <div class="container-fluid py-4">
          <div class="row my-2">
            <div class="col-12 mb-4">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">

                    <div class="add mb-3 mt-2">
                        <a @click="goToaddProduct()" class="btn bg-gradient-primary">
                          <i class="fa fa-plus"></i>
                          اضافة منتج
                        </a>
                      </div>

                    <table class="table text-right">
                      <thead>
                        <tr>
                            <th class="text-secondary text-xxs font-weight-bolder">اسم المنتج</th>
                            <th class="text-secondary text-xxs font-weight-bolder">الصورة</th>
                            <th class="text-secondary text-xxs font-weight-bolder">السعر</th>
                            <th class="text-secondary text-xxs font-weight-bolder">وصف</th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr v-for="product in productList" v-bind:key="product.id">
                          <td>
                            <div class="align-middle text-sm">
                                <h6 class="mb-0 text-sm">{{ product.name }}</h6>
                            </div>
                          </td>
                          <td>
                            <div class="align-middle text-sm">
                                <img v-bind:src="product.image" class="avatar avatar-md">
                            </div>
                          </td>
                          <td class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">{{ product.price }}</h6>
                          </td>
                          <td class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">{{ product.description }}</h6>
                          </td>

                        <td class="text-center">
                            <a @click="EditProduct(product.key)" class="btn btn-success font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                              <i class="fa fa-edit"></i>
                            </a>
                            <a @click="DeleteProduct(product.key)" class="btn btn-danger font-weight-bold text-xs me-3" data-original-title="delete user">
                              <i class="fa fa-trash"></i>
                            </a>
                          </td>

                        </tr>

                      </tbody>
                    </table>
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

import AppHeader from "../components/AppHeader.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router"

export default {
  name: "Products",
  data(){
    return {
      productList: []
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
          .collection("Products")
          .onSnapshot((querySnapshot)=>{
              this.productList = [],
              querySnapshot.forEach((doc) =>{
                this.productList.push({
                  key: doc.data().id,
                  image: doc.data().image,
                  name: doc.data().name,
                  price: doc.data().price,
                  description: doc.data().description,
              })
          })
      })
  },
  components: {
    Navbar,
    Footer,
    AppHeader
  },
  methods:{
        goToaddProduct(){
            router.push({
                name:"AddProduct"
            })
        },
        DeleteProduct(id) {
          if (confirm("هل أنت متأكد ؟")) {
            firebase.firestore
                .collection("Products")
                .doc(id)
                .delete().then(()=>{
                    router.push({
                      name:"Products"
                    });
            })
        }
        },
        EditProduct(id){
           router.push({
            name:"EditProduct", params:{id:id}
          })
        }
    }
};
</script>


<style scoped>
.add a i {
  margin-left: 10px;
}
</style>