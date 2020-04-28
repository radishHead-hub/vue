<template> 
<div class="order">
    <div class="order-card-body">
      <div class="order-card-wrap">
        <img :src="orderDetail.shop.shopImg" alt>
        <div class="order-card-content">
          <div class="order-card-head">
            <div class="title">
              <a>
                <span>{{orderDetail.shop.shopName}}</span>
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
            <p class="date-time">{{orderDetail.arrTime}}</p>
          </div>
          <div class="order-card-detail">
            <p class="detail">{{orderDetail.foods[0].foodName}}</p>
            <p class="price">¥{{orderDetail.totalPrice}}</p>
          </div>
          <div>
            <Rating :rating="rating"/>
            <div>
              <button @click="rating=1"> 1</button>
              <button @click="rating=2"> 2</button>
              <button @click="rating=3"> 3</button>
              <button @click="rating=4"> 4</button>
              <button @click="rating=5"> 5</button>
            </div>
          </div>
          <mt-field placeholder="您对商家/菜品满意吗?" type="textarea" rows="2" v-model="remarkText"></mt-field>
           <!-- 确定按钮 -->
        <div class="order-card-bottom">
        <button class="cardbutton" @click="handleRemark(rating)">确定</button>
        </div>
      </div>
       
      </div>
    </div>
</div> 
</template>
<script>
import Rating from "../../components/Rating";
export default {
    data() {
    return {
      rating:5,
      remarkText:null,
      orderDetail: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.orderDetail = to.params;
      // console.log(vm.orderDetail);
    });
  },
  components: {
    Rating
  },
  methods: {
    handleRemark(rating){
      this.$axios.post('http://192.168.1.7:8229/remark/add',{
          account_id:localStorage.ele_login,
          orderList_id:this.orderDetail._id,
          shop_id:this.orderDetail.shop_id,
          shop_name:this.orderDetail.shop.shopName,
          remarkText:this.remarkText,
          rating:rating
        }).then(res => {
        this.$router.push("/order");
      });
    }
  }
}
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