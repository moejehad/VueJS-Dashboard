<template>
  <div>
    <AppHeader/>

    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
    <Navbar :title="'لوحة التحكم'"/>
     <div class="container-fluid py-4">
      <div class="row">
        <div class="col-lg-3 col-sm-6 mb-lg-0 mb-4">
          <div class="card">
            <router-link to="/users">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">المستخدمين</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ usersNumber }}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-start">
                  <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i class="fa fa-users text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 mb-lg-0 mb-4">
          <div class="card">
            <router-link to="/orders">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">طلبات الشراء</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ ordersNumber }}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-start">
                  <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i class="fa fa-shopping-bag text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 mb-lg-0 mb-4">
          <div class="card">
            <router-link to="/products">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">المنتجات</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ productsNumber }}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-start">
                  <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i class="fa fa-list text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="card">
            <router-link to="/support">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">الدعم الفني</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ supportNumber }}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-start">
                  <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i class="fa fa-headset text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-7 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
                <h6 class="ms-2 mt-2 mb-3">آخر المنتجات</h6>
                <div class="row">

                  <table class="table text-center">
                      <thead>
                        <tr>
                            <th class="text-secondary text-xxs font-weight-bolder">اسم المنتج</th>
                            <th class="text-secondary text-xxs font-weight-bolder">السعر</th>
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
                          <td class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">{{ product.price }}</h6>
                          </td>

                        <td class="text-center">
                            <a @click="EditProduct(product.key)" class="text-success font-weight-bold text-xs EditProduct">
                              تعديل
                            </a>
                        </td>

                        </tr>

                      </tbody>
                    </table>

                </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <h6 class="ms-2 mt-2 mb-3"> حسابات التطبيق </h6>
                <div class="row">
                  <div class="col-12 row mb-1">
                    <p class="col-md-6">حساب شخصي</p>
                    <h6 class="font-weight-bold col-md-6" dir="ltr">{{ PersonalCounter }}</h6>
                  </div>
                  <div class="col-12 row mb-1">
                    <p class="col-md-6">حساب شركة</p>
                    <h6 class="col-md-6 font-weight-bold" dir="ltr">{{ CompanyCounter }}</h6>
                  </div>
                  <div class="col-12 row mb-1">
                    <p class="col-md-6">حساب متجر</p>
                    <h6 class="col-md-6 font-weight-bold" dir="ltr">{{ StoreCounter }}</h6>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
          <div class="card">
            <div class="card-header pb-0">
              <div class="row mb-3">
                <div class="col-6">
                  <h6>آخر الطلبات</h6>
                </div>
              </div>
            </div>
            <div class="card-body p-0 pb-2">
              <div class="table-responsive">
                <table class="table text-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-secondary text-xxs font-weight-bolder opacity-7">لطلب</th>
                      <th class="text-secondary text-xxs font-weight-bolder opacity-7 ps-2">اسم المستلم</th>
                      <th class="text-secondary text-xxs font-weight-bolder opacity-7">الكمية</th>
                      <th class="text-secondary text-xxs font-weight-bolder opacity-7">تاريخ التسليم</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    
                    <tr v-for="order in OrdersList" v-bind:key="order.id">
                      <td>
                        <div class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">{{ order.items.name }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ order.receiverName }}</h6>
                        </div>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 class="mb-0 text-sm">{{ order.quantity }}</h6>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 class="mb-0 text-sm">{{ order.dateToDeliver }}</h6>
                      </td>
                      <td class="align-middle text-sm">
                        <a @click="ShowOrder(order.id)" class="btn btn-success font-weight-bold text-xs">
                              <i class="fa fa-eye"></i>
                            </a>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-header pb-0">
              <h6>الدعم الفني</h6>
            </div>
            <div class="card-body p-3">
              <div class="timeline timeline-one-side">

                <div class="timeline-block mb-3" v-for="msg in SupportList" v-bind:key="msg.id">
                  <div class="timeline-content">
                    <h6 @click="toMsg(msg.id)" class="text-dark text-sm font-weight-bold mb-0 msgTitle">{{ msg.subject }}</h6>
                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">{{ msg.messageDate }}</p>
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
  </div>
</template>

<script>

import AppHeader from "../components/AppHeader.vue"
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from '../router';

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
    AppHeader
  },
  data(){
    return{
      usersNumber: 0,
      ordersNumber: 0,
      productsNumber: 0,
      supportNumber: 0,
      PersonalCounter: 0,
      CompanyCounter: 0,
      StoreCounter: 0,
      OrdersList: {},
      SupportList: {},
      productList: {}
    }
  },
  beforeCreate(){

    if (!this.$session.exists()) {
      router.push({
        name:"Login"
      })
    }
  
  },
  created(){
    const ref = firebase.firestore.collection("Users");
    const productRef = firebase.firestore.collection("Products");
    const supportRef = firebase.firestore.collection("TechnicalSupportMessages");
    const ordersRef = firebase.firestore.collectionGroup("Orders");

    /*----------------------------------*/
    ref.onSnapshot((querySnapshot)=>{
        this.usersNumber = querySnapshot.size
    })
    productRef.onSnapshot((querySnapshot)=>{
        this.productsNumber = querySnapshot.size
    })
    supportRef.onSnapshot((querySnapshot)=>{
        this.supportNumber = querySnapshot.size
    })

    ordersRef.onSnapshot((querySnapshotOrders) => {
        this.ordersNumber = querySnapshotOrders.size
    })

    /*----------------------------------*/


    /*----------------------------------*/
    ref.where("userType","==","PERSONAL").onSnapshot((querySnapshot)=>{
        this.PersonalCounter = querySnapshot.size
    })

    ref.where("userType","==","COMPANY").onSnapshot((querySnapshot)=>{
        this.CompanyCounter = querySnapshot.size
    })

    ref.where("userType","==","STORE").onSnapshot((querySnapshot)=>{
        this.StoreCounter = querySnapshot.size
    })
    /*----------------------------------*/

    ordersRef.orderBy("dateOfOrder",'desc').limit(4)
          .onSnapshot((querySnapshot)=>{
              this.OrdersList = [],
              querySnapshot.forEach((doc) =>{
                this.OrdersList.push({
                  id: doc.data().id,
                  receiverName:doc.data().receiverName,
                  receiverPhone: doc.data().receiverPhone,
                  totalPrice: doc.data().totalPrice,
                  address: doc.data().address,
                  dateToDeliver: doc.data().dateToDeliver,
                  dateOfOrder: doc.data().dateOfOrder,
                  items: doc.data().items,
                  quantity: doc.data().quantity,
                  orderStatus: doc.data().orderStatus
              })
          })
      })

      supportRef.orderBy("messageDate",'desc').limit(5)
          .onSnapshot((querySnapshot)=>{
              this.SupportList = [],
              querySnapshot.forEach((doc) =>{
                this.SupportList.push({
                  id: doc.data().id,
                  userId:doc.data().userId,
                  subject: doc.data().subject,
                  messageDate: doc.data().messageDate,
              }) 
          }) 
      })

      productRef.limit(2).onSnapshot((querySnapshot)=>{
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
  methods:{
    ShowOrder(id){
      router.push({
          name:"ShowOrder", params:{id:id}
      })
    },
    EditProduct(id){
           router.push({
            name:"EditProduct", params:{id:id}
          })
    },
    toMsg(msgID){
        router.push({
          name:"ShowMessage", params:{id:msgID}
        })
    }
  }
  
};
</script>

<style scoped>
.msgTitle , .EditProduct {
    cursor: pointer;
}
.timeline-one-side:before {
    display: none;
}
.timeline-block {
    position: relative;
    border-bottom: 1px solid #f7f7f7;
    padding: 10px 0;
    margin: 0 !important;
}
.timeline-block:last-child{
  border-bottom: 0 !important;
}
</style>