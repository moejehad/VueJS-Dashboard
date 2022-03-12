<template>
    <section>
    <AppHeader/>
    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
    <Navbar :title="'البحث'" />
    <div class="container-fluid py-4">
        <div class="row my-2">
        <div class="col-12 mb-4">
            <div class="card">
            <div class="card-body">
                
                <div class="type-users mb-3 mt-2">
                <div class="form-check form-check-inline">
                    <label class="form-check-label" for="accountSearch">بحث عن حساب</label>
                    <input @click="accountSearch()" checked class="form-check-input" type="radio" name="inlineRadioOptions" id="all" value="all">
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label" for="billSearch">بحث عن فاتورة</label>
                    <input @click="billSearch()" class="form-check-input" type="radio" name="inlineRadioOptions" id="personal">
                </div>
                </div>

                <div class="border-0 p-4 mb-2 bg-gray-100 border-radius-lg">
                    <div v-show="account">
                        <form @submit.prevent="accountSubmit" class="col-md-4 mx-auto mb-5">
                            <div class="mb-3">
                                <label for="email">البريد الإلكتروني</label>
                                <input type="email" id="email" v-model.trim="email" class="form-control" >
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn bg-gradient-primary w-100 mt-2 mb-2">بحث</button>
                            </div>
                        </form>

                        <table v-if="user.id != null" class="table text-right">
                            <thead>
                                <tr>
                                <th class="text-secondary text-xxs font-weight-bolder">المستخدم</th>
                                <th class="text-secondary text-xxs font-weight-bolder">نوع الحساب</th>
                                <th class="text-secondary text-xxs font-weight-bolder">نبذة</th>
                                <th class="text-secondary text-xxs font-weight-bolder">تاريخ الميلاد</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-bind:key="user.id">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                        <img v-bind:src="user.image" class="avatar avatar-sm" alt="user">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center me-3">
                                        <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                                        <p class="text-xs text-secondary mb-0">{{ user.email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="align-middle text-sm">
                                    <h6 class="text-sm font-weight-bold mb-0">حساب</h6>
                                    <h6 v-if="user.userType == 'PERSONAL' " class="text-sm text-secondary mb-0">شخصي</h6>
                                    <h6 v-else-if="user.userType == 'COMPANY' " class="text-sm text-secondary mb-0">شركة</h6>
                                    <h6 v-else-if="user.userType == 'STORE' " class="text-sm text-secondary mb-0">متجر</h6>
                                    </div>
                                </td>
                                <td class="align-middle text-sm">
                                    <h6 class="mb-0 text-sm">{{ user.bio }}</h6>
                                </td>
                                <td class="align-middle text-sm">
                                    <h6 class="mb-0 text-sm">{{ user.dateOfBirth }}</h6>
                                </td>
                                <td class="text-center">
                                    <a @click="ShowUser(user.id)" class="btn btn-success font-weight-bold text-xs" data-target="#EditUser">
                                    <i class="fa fa-eye"></i>
                                    </a>
                                    <a @click="DeleteUser(user.id)" class="btn btn-danger font-weight-bold text-xs me-1">
                                    <i class="fa fa-trash"></i>
                                    </a>
                                </td>
                                </tr>

                            </tbody>
                            </table>

                    </div>

                    <div v-show="bill">
                    <form @submit.prevent="billSubmit" v-show="bill" class="col-md-4 mx-auto">
                        <div class="mb-3">
                            <label for="billNumber">رقم الفاتورة</label>
                            <input type="text" v-model.trim="billNumber" id="billNumber" class="form-control" >
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn bg-gradient-primary w-100 mt-2 mb-2">بحث</button>
                        </div>
                    </form>

                    <table v-if="Bill.id != null" class="table text-right">
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

                      <tr v-bind:key="Bill.key">
                        <td>
                          <div class="align-middle text-sm">
                              <h6 class="mb-0 text-sm">{{ Bill.billNumber }}</h6>
                          </div>
                        </td>
                        <td>
                          <div class="align-middle text-sm">
                              <h6 class="mb-0 text-sm">{{ Bill.clientName }}</h6>
                          </div>
                        </td>
                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ Bill.productName }} </h6>
                        </td>
                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ Bill.ProductQuantity }}</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ Bill.ProductPrice }} شيكل</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ Bill.totalPrice }} شيكل</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 v-if="Bill.remainingAmount <= 0" class="mb-0 text-sm">مدفوعة</h6>
                          <h6 v-else class="mb-0 text-sm">{{ Bill.remainingAmount }} شيكل</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ Bill.date }}</h6>
                        </td>

                        <td class="text-center">
                          <a @click="ShowBill(Bill.id)" class="font-weight-bold text-xs text-success billDetails">
                            <i class="fa fa-eye"></i>
                            تفاصيل
                          </a>
                          <a @click="EditBill(Bill.id)" class="font-weight-bold text-danger text-xs me-2 billDetails">
                            <i class="fa fa-edit"></i>
                            تعديل
                          </a>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                    
                    </div>
                <p v-show="this.error" class="error alert alert-danger text-white col-md-4 mx-auto">{{ this.error }}</p>
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
    name: "Search",
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
      return{
          account:true,
          bill:false,
          user:{},
          email:'',
          error:'',
          Bill:{},
          billNumber:''
      }
  },
  methods:{
      accountSearch(){
        this.account = true
        this.bill = false
      },
      billSearch(){
        this.bill = true
        this.account = false
      },
      accountSubmit(){
          firebase.firestore
            .collection("Users")
            .where("email","==",this.email)
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc) => {
                    if(doc.exists){
                        this.user = doc.data()
                    }else{
                        this.error = 'عذراً , هذا المستخدم غير موجود'
                    }
                });
            })
      },
      billSubmit(){
          firebase.firestore
            .collection("Bills")
            .where("billNumber","==", parseInt(this.billNumber))
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc) => {
                    if(doc.exists){
                        this.Bill = doc.data()
                    }else{
                        this.error = 'عذراً , هذه الفاتورة غير موجودة'
                    }
                });
            })
      },
      DeleteUser(id) {
            if (confirm("هل أنت متأكد ؟")) {
                firebase.firestore
                    .collection("Users")
                    .doc(id)
                    .delete().then(()=>{
                      router.push({
                        name:"Users"
                      })
                    })
            }
        },
        ShowUser(userID){
          router.push({
            name:"ShowUser", params:{id:userID}
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
.billDetails {
    cursor: pointer;
}
</style>