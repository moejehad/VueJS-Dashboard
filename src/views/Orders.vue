<template>
  <div>
    <AppHeader />
    <main
      class="
        main-content
        position-relative
        max-height-vh-100
        h-100
        mt-1
        border-radius-lg
      "
    >
      <Navbar :title="'طلبات الشراء'" />
      <div class="container-fluid py-4">
        <div class="row my-2">
          <div class="col-12 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <div class="type-Orders mb-3 mt-2">
                    <div class="form-check form-check-inline">
                      <label class="form-check-label" for="all"
                        >جميع الطلبات</label
                      >
                      <input
                        @click="AllOrder()"
                        checked
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="all"
                        value="all"
                      />
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label" for="UNDER_REVIEW"
                        >قيد المراجعة
                      </label>
                      <input
                        @click="ShowOrderType('UNDER_REVIEW')"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="UNDER_REVIEW"
                      />
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label" for="APPROVED"
                        >تم الموافقة</label
                      >
                      <input
                        @click="ShowOrderType('APPROVED')"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="APPROVED"
                      />
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label" for="DELIVERY_IN_PROGRESS"
                        >جاري التوصيل</label
                      >
                      <input
                        @click="ShowOrderType('DELIVERY_IN_PROGRESS')"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="DELIVERY_IN_PROGRESS"
                      />
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label" for="RECEIPT"
                        >تم الاستلام</label
                      >
                      <input
                        @click="ShowOrderType('RECEIPT')"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="RECEIPT"
                      />
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label" for="CANCELED"
                        >ملغى</label
                      >
                      <input
                        @click="ShowOrderType('CANCELED')"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="CANCELED"
                      />
                    </div>
                  </div>

                  <table class="table text-right">
                    <thead>
                      <tr>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          اسم المستلم
                        </th>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          تاريخ التسليم
                        </th>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          الطلب
                        </th>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          الكمية
                        </th>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          اجمالي السعر
                        </th>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          تاريخ الطلب
                        </th>
                        <th class="text-secondary text-xxs font-weight-bolder">
                          حالة الطلب
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="order in OrdersList" v-bind:key="order.id">
                        <td>
                          <div class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">
                              {{ order.receiverName }}
                            </h6>
                          </div>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">
                            {{ order.dateToDeliver }}
                          </h6>
                        </td>

                        <td>
                          <div class="align-middle text-sm">
                            <h6 class="mb-0 text-sm">{{ order.items.name }}</h6>
                          </div>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ order.quantity }}</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">
                            {{ order.totalPrice }} شيكل
                          </h6>
                        </td>

                        <td class="align-middle text-sm">
                          <h6 class="mb-0 text-sm">{{ order.dateOfOrder }}</h6>
                        </td>

                        <td class="align-middle text-sm">
                          <p
                            v-if="order.orderStatus == 'UNDER_REVIEW'"
                            class="mb-0 text-sm text-info"
                          >
                            قيد المراجعة
                          </p>
                          <p
                            v-else-if="order.orderStatus == 'APPROVED'"
                            class="mb-0 text-sm text-primary"
                          >
                            تم الموافقة
                          </p>
                          <p
                            v-else-if="
                              order.orderStatus == 'DELIVERY_IN_PROGRESS'
                            "
                            class="mb-0 text-sm text-warning"
                          >
                            جاري التوصيل
                          </p>
                          <p
                            v-else-if="order.orderStatus == 'RECEIPT'"
                            class="mb-0 text-sm text-success"
                          >
                            تم الاستلام
                          </p>
                          <p
                            v-else-if="order.orderStatus == 'CANCELED'"
                            class="mb-0 text-sm text-danger"
                          >
                            ملغى
                          </p>
                        </td>

                        <td class="align-middle text-sm">
                          <a
                            @click="ShowOrder(order.id)"
                            class="btn btn-success font-weight-bold text-xs"
                          >
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

        <Footer />
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import firebase from "../components/FirebaseInit";
import router from "../router";

export default {
  name: "Orders",
  components: {
    Navbar,
    Footer,
    AppHeader,
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      router.push({
        name: "Login",
      });
    }
  },
  data() {
    return {
      OrdersList: [],
    };
  },
  created() {
    firebase.firestore
      .collectionGroup("Orders")
      .orderBy("dateOfOrder",'desc')
      .onSnapshot((querySnapshotOrders) => {
        querySnapshotOrders.forEach((orderDoc) => {
          this.OrdersList.push({
            id: orderDoc.data().id,
            receiverName: orderDoc.data().receiverName,
            receiverPhone: orderDoc.data().receiverPhone,
            totalPrice: orderDoc.data().totalPrice,
            address: orderDoc.data().address,
            dateToDeliver: orderDoc.data().dateToDeliver,
            dateOfOrder: orderDoc.data().dateOfOrder,
            items: orderDoc.data().items,
            quantity: orderDoc.data().quantity,
            orderStatus: orderDoc.data().orderStatus,
          });
        });
      });
  },
  methods: {
    ShowOrder(id) {
      router.push({
        name: "ShowOrder",
        params: { id: id },
      });
    },
    ShowOrderType(type) {
      firebase.firestore
        .collectionGroup("Orders")
        .where("orderStatus", "==", type)
        .orderBy("dateOfOrder", "desc")
        .onSnapshot((querySnapshotOrders) => {
          this.OrdersList = [],
            querySnapshotOrders.forEach((orderDoc) => {
              this.OrdersList.push({
                id: orderDoc.data().id,
                receiverName: orderDoc.data().receiverName,
                receiverPhone: orderDoc.data().receiverPhone,
                totalPrice: orderDoc.data().totalPrice,
                address: orderDoc.data().address,
                dateToDeliver: orderDoc.data().dateToDeliver,
                dateOfOrder: orderDoc.data().dateOfOrder,
                items: orderDoc.data().items,
                quantity: orderDoc.data().quantity,
                orderStatus: orderDoc.data().orderStatus,
              });
            });
        });

    },
    AllOrder(){
      firebase.firestore
      .collectionGroup("Orders")
      .onSnapshot((querySnapshotOrders) => {
        this.OrdersList = [],
        querySnapshotOrders.forEach((orderDoc) => {
          this.OrdersList.push({
            id: orderDoc.data().id,
            receiverName: orderDoc.data().receiverName,
            receiverPhone: orderDoc.data().receiverPhone,
            totalPrice: orderDoc.data().totalPrice,
            address: orderDoc.data().address,
            dateToDeliver: orderDoc.data().dateToDeliver,
            dateOfOrder: orderDoc.data().dateOfOrder,
            items: orderDoc.data().items,
            quantity: orderDoc.data().quantity,
            orderStatus: orderDoc.data().orderStatus,
          });
        });
      });
    }
  },
};
</script>
