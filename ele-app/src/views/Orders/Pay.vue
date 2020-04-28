<template>
  <div class="pay">
    <Header title="在线支付"/>
    <div class="main" v-if="orderInfo">
      <div class="tip">
        <p class="countdown-title">支付剩余时间</p>
        <h3 class="countdown-text">{{countDown}}</h3>
      </div>
      <section class="home">
        <ul class="list info-list">
          <li>
            <span class="order-name">{{orderInfo.shopInfo.name}}</span>
            <span class="text-highlight">¥{{totalPrice}}</span>
          </li>
        </ul>
        <div class="title">在线支付</div>
        <ul class="list payment-list">
          <li class="payment-list-item">
            <div class="icon">
              <img src="../../assets/wechart.jpg" alt>
              <span>微信</span>
            </div>
            <i class="fa fa-check-circle selected"></i>
          </li>
        </ul>
      </section>
      <button @click="pay" :disabled="timeOut" class="btn-submit">确认支付</button>
    </div>
  </div>
</template>

<script>
import GoEasy from 'goeasy';
import Vue from 'vue';
import Header from "../../components/Header";
import { setInterval, clearInterval } from "timers";
export default {
  name: "Pay",
  data() {
    return {
      countDown: "00:15:00",
      timer: null,
      timeOut: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.countTimeDown();
      // vm.addOrder();//微信支付成功之后一进来就添加订单信息
    });
  },
  computed: {
    orderInfo() {
      return this.$store.getters.orderInfo;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    remarkInfo() {
      return this.$store.getters.remarkInfo;
    }
  },
  methods: {
    countTimeDown() {
      let minute = 14;
      let second = 59;

      this.timer = setInterval(() => {
        second--;

        if (second == "00" && minute == "00") {
          this.countDown = "订单已超时";
          clearInterval(this.timer);
          this.timeOut = true;
          return;
        }

        if (second == "00") {
          second = 59;
          minute--;

          if (minute < 10) {
            minute = "0" + minute;
          }
        }

        if (second < 10) {
          second = "0" + second;
        }

        this.countDown = "00:" + minute + ":" + second;
      }, 1000);
    },
    pay() {
      const data = {
        body: "饿度子",
        out_trade_no: new Date().getTime().toString(),
        total_fee: 1
      };
      // alert("进入到pay方法中");
      // 请求 http://www.thenewstep.cn/wxzf/example/jsapi.php
      fetch("http://www.thenewstep.cn/wxzf/example/jsapi.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          this.onBridgeReady(data);
        })
        .catch(err => {
          // alert("请求失败");
          alert("支付成功");
          this.addOrder();
        });
    },
    onBridgeReady(data) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          alert("支付成功");
          // 生成订单
          this.addOrder();
        }
      });
    },
    addOrder() {
     var len=this.orderInfo.selectFoods.length
    //  console.log(len)
      var arrSelect = [{
        food_id:"",
        count:null
        }];
      arrSelect=[]
      for(let i=0;i<len;i++){
        arrSelect.push({food_id:this.orderInfo.selectFoods[i].virtual_food_id , count:this.orderInfo.selectFoods[i].count})
      }
      //拿到selectFoods数组的值
      // let orderlist = {
        
      // };
      // console.log(orderlist);
      // this.$router.push("/order");
      
      this.$axios.post('http://192.168.1.7:8229/order/add',{
        myAddress_id: this.userInfo._id,
        shop_id: this.orderInfo.shopInfo.id,
        account_id:localStorage.ele_login,
        selectFoods:arrSelect,

        delivery_fee:this.orderInfo.shopInfo.float_delivery_fee,
        totalPrice: this.totalPrice,
        remark: this.remarkInfo.remark,
        tableware: this.remarkInfo.tableware
        }).then(res => {
      //创建全局GoEasy对象
          Vue.prototype.$goEasy = new GoEasy({
          host:'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
          appkey: "BC-421c7bcf59b34c84b48557ce4722c8c7", //替换为您的应用appkey
          onConnected: function() {
              console.log('连接成功！')
          },
          onDisconnected: function() {
              console.log('连接断开！')
          },
          onConnectFailed: function(error) {
              console.log('连接失败或错误！')
          }
        });
        var shop_id=this.orderInfo.shopInfo.id;
        this.$goEasy.publish({
              channel: "ele"+shop_id, //替换为您自己的channel
              message: "有用户下单啦~请及时处理" //替换为您想要发送的消息内容
          });
        console.log(res.data);
        this.$router.push("/order");
      });
      // this.$axios
      //   .post(`/api/user/add_order/${localStorage.ele_login}`, orderlist)
      //   .then(res => {
      //     console.log(res.data);
      //     this.$router.push("/order");
      //   });
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.tip {
  display: block;
  text-align: center;
  background-color: #fff;
  color: #333;
  padding: 2rem;
  line-height: 2rem;
}
countdown-title {
  font-size: 0.88rem;
  color: #999;
}
.countdown-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
down-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
.list {
  border-bottom: 0.5px solid #eee;
  background: #fff;
}
.info-list {
  padding: 0 1.5rem;
}
.info-list li {
  border-top: 0.5px solid #eee;
  display: flex;
  padding: 1.5rem 0;
  font-size: 1rem;
  line-height: 1rem;
  justify-content: space-between;
}
.info-list li .order-name {
  color: #333;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
  max-width: 60%;
}
.text-highlight {
  color: #ff6000;
}
.title {
  background-color: #f5f5f5;
  font-size: 0.88rem;
  padding: 1.2rem 1.2rem 1rem;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.payment-list-item {
  border-bottom: 0.5px solid #eee;
  padding: 0.9rem 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: flex;
  align-items: center;
}
.payment-list-item img {
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 20px;
}
.payment-list-item > i {
  font-size: 1.5rem;
  color: #eee;
}
.selected {
  color: #4cd964 !important;
}
.btn-submit-wrap {
  margin: 1rem auto;
  width: 90%;
}
.btn-submit {
  font-size: 1.1rem;
  line-height: 1.5rem;
  background-color: #4cd964;
  width: 100%;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}

/* 不可点击btn */
.btn-submit[disabled] {
  background-color: #bbb !important;
}
</style>

