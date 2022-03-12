<template>
  <div>
    <AppHeader/>
    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
      <Navbar :title="'الفواتير'" />
      <div class="container-fluid py-4">
        <div class="row my-2">
          <div class="col-12 mb-4">
            <div class="card">
              <div class="card-body">
                
                <div class="row mb-3 mt-2">
                  <div class="col-md-8 col-sm-12 add">
                  <router-link to="/addBill">
                  <a class="btn bg-gradient-primary">
                    <i class="fa fa-plus"></i>
                      اضافة فاتورة
                  </a>
                  </router-link>
                </div>

                </div>
                
                <div class="table-responsive">

                  <div class="type-Bills mb-3 mt-2">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="all">جميع الفواتير</label>
                    <input @click="AllBills()" checked class="form-check-input" type="radio" name="inlineRadioOptions" id="all" value="all">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="unpaid">فواتير غير مدفوعة</label>
                    <input @click="unpaidBills()" class="form-check-input" type="radio" name="inlineRadioOptions" id="unpaid">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="read">فواتير مدفوعة</label>
                    <input @click="paidBills()" class="form-check-input" type="radio" name="inlineRadioOptions" id="read">
                  </div>
                </div>

                  <table class="table text-right">
                    <thead>
                      <tr>
                          <th class="text-secondary text-xxs font-weight-bolder">رقم الفاتورة</th>
                          <th class="text-secondary text-xxs font-weight-bolder">المشتري</th>
                          <th class="text-secondary text-xxs font-weight-bolder">المنتج</th>
                          <th class="text-secondary text-xxs font-weight-bolder">الكمية</th>
                          <th class="text-secondary text-xxs font-weight-bolder">السعر</th>
                          <th class="text-secondary text-xxs font-weight-bolder">الإجمالي</th>
                          <th class="text-secondary text-xxs font-weight-bolder">المتبقي</th>
                          <th class="text-secondary text-xxs font-weight-bolder">التاريخ</th>
                          <th></th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-for="bill in BillsList" v-bind:key="bill.key">
                        <td>
                          <div class="align-middle text-sm">
                              <h6 class="mb-0 text-sm">{{ bill.billNumber }}</h6>
                          </div>
                        </td>
                        <td>
                          <div class="align-middle text-sm">
                              <h6 class="mb-0 text-sm">{{ bill.clientName }}</h6>
                          </div>
                        </td>
                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ bill.productName }} </h6>
                        </td>
                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ bill.ProductQuantity }}</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ bill.ProductPrice }} شيكل</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ bill.totalPrice }} شيكل</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 v-if="bill.remainingAmount <= 0" class="mb-0 text-sm">مدفوعة</h6>
                          <h6 v-else class="mb-0 text-sm">{{ bill.remainingAmount }} شيكل</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ bill.date }}</h6>
                        </td>

                        <td class="text-center">
                          <a @click="ShowBill(bill.key)" class="font-weight-bold text-xs text-success billDetails">
                            <i class="fa fa-eye"></i>
                            تفاصيل
                          </a>
                          <a @click="EditBill(bill.key)" class="font-weight-bold text-danger text-xs me-2 billDetails">
                            <i class="fa fa-edit"></i>
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
  name: "Bills",
  components: {
    Navbar,
    Footer,
    AppHeader
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      router.push({
        name:"Login"
      })
    }
  },
  data(){
    return {
      BillsList: []
    }
  },
  created(){
    firebase.firestore
          .collection("Bills")
          .orderBy("date",'desc')
          .onSnapshot((querySnapshot)=>{
              this.BillsList = [],
              querySnapshot.forEach((doc) =>{
                this.BillsList.push({
                  key: doc.data().id,
                  billNumber:doc.data().billNumber,
                  clientName: doc.data().clientName,
                  adminID: doc.data().adminID,
                  ProductPrice: doc.data().ProductPrice,
                  ProductQuantity: doc.data().ProductQuantity,
                  productName: doc.data().productName,
                  receivedAmount: doc.data().receivedAmount,
                  remainingAmount: doc.data().remainingAmount,
                  totalPrice: doc.data().totalPrice,
                  date: doc.data().date
              })
          })
      })
  },
  methods:{
    unpaidBills(){
      firebase.firestore
          .collection("Bills")
          .where("remainingAmount","!=",0)
          .onSnapshot((querySnapshot)=>{
              this.BillsList = [],
              querySnapshot.forEach((doc) =>{
                this.BillsList.push({
                  key: doc.data().id,
                  billNumber:doc.data().billNumber,
                  clientName: doc.data().clientName,
                  adminID: doc.data().adminID,
                  ProductPrice: doc.data().ProductPrice,
                  ProductQuantity: doc.data().ProductQuantity,
                  productName: doc.data().productName,
                  receivedAmount: doc.data().receivedAmount,
                  remainingAmount: doc.data().remainingAmount,
                  totalPrice: doc.data().totalPrice,
                  date: doc.data().date
              })
          })
      })
  },
  paidBills(){
    firebase.firestore
          .collection("Bills")
          .where("remainingAmount","==",0)
          .orderBy("date",'desc')
          .onSnapshot((querySnapshot)=>{
              this.BillsList = [],
              querySnapshot.forEach((doc) =>{
                this.BillsList.push({
                  key: doc.data().id,
                  billNumber:doc.data().billNumber,
                  clientName: doc.data().clientName,
                  adminID: doc.data().adminID,
                  ProductPrice: doc.data().ProductPrice,
                  ProductQuantity: doc.data().ProductQuantity,
                  productName: doc.data().productName,
                  receivedAmount: doc.data().receivedAmount,
                  remainingAmount: doc.data().remainingAmount,
                  totalPrice: doc.data().totalPrice,
                  date: doc.data().date
              })
          })
      })
  },
  AllBills(){
    firebase.firestore
          .collection("Bills")
          .orderBy("date",'desc')
          .onSnapshot((querySnapshot)=>{
              this.BillsList = [],
              querySnapshot.forEach((doc) =>{
                this.BillsList.push({
                  key: doc.data().id,
                  billNumber:doc.data().billNumber,
                  clientName: doc.data().clientName,
                  adminID: doc.data().adminID,
                  ProductPrice: doc.data().ProductPrice,
                  ProductQuantity: doc.data().ProductQuantity,
                  productName: doc.data().productName,
                  receivedAmount: doc.data().receivedAmount,
                  remainingAmount: doc.data().remainingAmount,
                  totalPrice: doc.data().totalPrice,
                  date: doc.data().date
              })
          })
      })
  },
  ShowBill(id){
    router.push({
      name:"ShowBill", params:{id:id}
    })
  },
  EditBill(id){
    router.push({
      name:"EditBill", params:{id:id}
    })
  },
  }
}
</script>

<style scoped>
.billDetails{
  cursor: pointer;
}
.unpaid {
    align-items: center;
    display: flex;
}
</style>