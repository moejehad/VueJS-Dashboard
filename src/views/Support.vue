<template>
    <div>

    <AppHeader/>

    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
      <Navbar :title="'الدعم الفني'"/>
      <div class="container-fluid py-4">
      <div class="row my-2">
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">

                <div class="type-msg mb-3 mt-2">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="all">جميع الرسائل</label>
                    <input @click="AllMsg()" checked class="form-check-input" type="radio" name="inlineRadioOptions" id="all" value="all">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="unread">غير مقروءة</label>
                    <input @click="ShowMsgType('0')" class="form-check-input" type="radio" name="inlineRadioOptions" id="unread">
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="read">مقروءة</label>
                    <input @click="ShowMsgType('1')" class="form-check-input" type="radio" name="inlineRadioOptions" id="read">
                  </div>
                </div>

                <table class="table text-right">
                  <thead>
                    <tr>
                        <th class="text-secondary text-xxs font-weight-bolder">المستخدم</th>
                        <th class="text-secondary text-xxs font-weight-bolder">الموضوع</th>
                        <th class="text-secondary text-xxs font-weight-bolder">التاريخ</th>
                        <th class="text-secondary text-xxs font-weight-bolder">حالة الرسالة</th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="msg in SupportList" v-bind:key="msg.key">
                      <td>
                        <div class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">{{ msg.userName }}</h6>
                        </div>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 class="mb-0 text-sm">{{ msg.subject }}</h6>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 class="mb-0 text-sm">{{ msg.messageDate }}</h6>
                      </td>
                      <td class="align-middle text-sm">
                        <h6 v-if="msg.messageStatus == '0'" class="mb-0 text-sm text-danger">غير مقروءة</h6>
                        <h6 v-else-if="msg.messageStatus == '1'" class="mb-0 text-sm text-success">مقروءة</h6>
                      </td>
                      <td class="text-center">
                        <a @click="ShowMessage(msg.key)" class="btn btn-success font-weight-bold text-xs">
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
  name: "Support",
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
      SupportList: []
    }
  },
  created(){
    firebase.firestore
          .collection("TechnicalSupportMessages")
          .orderBy("messageDate",'desc')
          .onSnapshot((querySnapshot)=>{
              this.SupportList = [],
              querySnapshot.forEach((doc) =>{
                this.SupportList.push({
                  key: doc.data().id,
                  userName : doc.data().userName,
                  subject: doc.data().subject,
                  messageDate: doc.data().messageDate,
                  messageStatus : doc.data().messageStatus,
              }) 
          }) 
      })
  },
  methods:{
      ShowMessage(msgID){
          router.push({
            name:"ShowMessage", params:{id:msgID}
          })
        },

        ShowMsgType(type){
          firebase.firestore
          .collection("TechnicalSupportMessages")
          .where("messageStatus","==",type)
          .orderBy("messageDate",'desc')
          .onSnapshot((querySnapshot)=>{
              this.SupportList = [],
              querySnapshot.forEach((doc) =>{
                this.SupportList.push({
                  key: doc.data().id,
                  userName : doc.data().userName,
                  subject: doc.data().subject,
                  messageDate: doc.data().messageDate,
                  messageStatus : doc.data().messageStatus,
              })
          })
      })
    },

    AllMsg(){
        firebase.firestore
          .collection("TechnicalSupportMessages")
          .orderBy("messageDate",'desc')
          .onSnapshot((querySnapshot)=>{
              this.SupportList = [],
              querySnapshot.forEach((doc) =>{
                this.SupportList.push({
                  key: doc.data().id,
                  userName : doc.data().userName,
                  subject: doc.data().subject,
                  messageDate: doc.data().messageDate,
                  messageStatus : doc.data().messageStatus,
              }) 
          }) 
      })
    }
  }

};
</script>
