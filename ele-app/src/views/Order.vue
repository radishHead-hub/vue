<template>
   <div class="order">
    <div class="order-card-body" v-for="(order,index) in orderlist" :key="index">
      <div
        class="order-card-wrap"
        @click="$router.push({name:'orderInfo',params:order})"
        v-if="order"
      >
        <img :src="order.shop.shopImg" alt>
        <div class="order-card-content">
          <div class="order-card-head">
            <div class="title">
              <a>
                <span>{{order.shop.shopName}}</span>
                <i class="fa fa-angle-right"></i>
              </a>
              <p v-show="order.sure==0">订单未确认收货</p>
              <p v-show="order.sure==1">订单已完成</p>
            </div>
            <p class="date-time">{{order.arrTime}}</p>
          </div>
          <div class="order-card-detail">
            <p class="detail">{{order.foods[0].foodName}}</p>
            <p class="price">¥{{order.totalPrice}}</p>
          </div>
        </div>
      </div>
      <div class="order-card-bottom">
        <button class="card3button" v-show="order.sure==0" @click="handleSure(order._id)">确认收货</button>
        <button class="card2button" v-show="order.sure==1 && order.remarkStatus==0" 
        @click="$router.push({name:'remarkInfo',params:order})"
        v-if="order">评价</button>
        <button class="cardbutton" v-show="order.sure==1" @click="$router.push('/shop')">再来一单</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import GoEasy from 'goeasy';
import Vue from 'vue';
export default {
  name: "order",
  data() {
    return {
      // flag:0,
      orderlist: []
      // _id:"",
      // myAddress_id:"",
      // arrTime:"",
      // shop_id:"",
      // delivery_fee:0,
      // totalPrice:0,
      // tableware:"",
      // remark:"",
      // selectFoods:[],
      // myAddress:[],
      // shop:[]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
    });
  },
  methods: {
    getData() {
      this.$axios.post('http://192.168.1.7:8229/order/selectList',{
          account_id:localStorage.ele_login
        }).then(res => {
        console.log(res.data);
        this.orderlist = res.data;
      });
    },
    handleSure(order_id){
      this.$axios.post('http://192.168.1.7:8229/order/sureOrder',{
          account_id:localStorage.ele_login,
          _id:order_id //订单id
        }).then(res => {
        this.orderlist = res.data;
      });

    }
  }
};
</script>

<style scoped>
.order {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  margin-bottom: 2.666667vw;
}
.order-card-body {
  margin-top: 2.666667vw;
  background-color: #fff;
  padding: 3.733333vw 0 0 4vw;
}
.order-card-wrap {
  display: flex;
}
.order-card-wrap > img {
  height: 8.533333vw;
  border-radius: 0.533333vw;
  border: 1px solid #eee;
  width: 8.533333vw;
  margin-right: 2.666667vw;
}
.order-card-content {
  flex: 1;
}
.order-card-head {
  border-bottom: 1px solid #eee;
  padding-right: 3.466667vw;
  padding-bottom: 2.666667vw;
}
.order-card-head .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-card-head .title > a {
  font-size: 1rem;
  line-height: 1.5em;
  color: #333;
  text-decoration: none;
}
.order-card-head .title > a > span {
  display: inline-block;
  max-width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-card-head .title > a > i {
  margin-left: 1.333333vw;
  color: #ccc;
  vertical-align: super;
}
.order-card-head .title > p {
  font-size: 0.8rem;
  text-align: right;
  color: #333;
  max-width: 14em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.date-time {
  font-size: 0.6rem;
  color: #999;
}
.order-card-detail {
  display: flex;
  justify-content: space-between;
  padding: 4vw 3.466667vw 4vw 0;
  font-size: 0.8rem;
}
.order-card-detail .detail {
  color: #666;
  display: flex;
  align-items: center;
}
.order-card-detail .price {
  flex-basis: 16vw;
  text-align: right;
  color: #333;
  font-weight: 700;
}
.order-card-bottom {
  display: flex;
  border-top: 1px solid #eee;
  padding: 2.666667vw 4.266667vw;
  justify-content: flex-end;
}
.cardbutton {
  padding: 1.333333vw 2.666667vw;
  border: 1px solid #2395ff;
  border-radius: 0.533333vw;
  background-color: transparent;
  outline: none;
  font-size: 0.8rem;
  color: #2395ff;
  margin-left: 2vw;
}
.card2button {
  padding: 1.333333vw 2.666667vw;
  border: 1px solid #FFD700;
  border-radius: 0.533333vw;
  background-color: transparent;
  outline: none;
  font-size: 0.8rem;
  color: #FFD700;
  margin-left: 2vw;
}
.card3button {
  padding: 1.333333vw 2.666667vw;
  border: 1px solid #2E8B57;
  border-radius: 0.533333vw;
  background-color: transparent;
  outline: none;
  font-size: 0.8rem;
  color: #2E8B57;
  margin-left: 2vw;
}
</style>
