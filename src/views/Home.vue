<template>
  <div class="home">
    <h1>招拍挂类地价计算器（V2.3）</h1>
    <p style="textAlign: left">
      <strong>【免责声明】</strong
      >本计算器为制作人根据政府最新政策个人理解制作，地价计算结果供使用者参考。实际地价缴交数额以政府的地价缴交通知文件为准，本计算器制作人对计算结果不负责任何法律责任，本计算器使用者使用本计算器进行地价测算表明同意上述声明！
      时间：2019-11-12
    </p>
    <p><strong>【注意】</strong>面积单位默认为平方米，金额单位默认为元</p>
    <h3>地价计算结果：{{ result }}元</h3>
    <el-button plain size="mini" class="btn">开始计算</el-button>
    <el-row :gutter="10">
      <el-col :span="13">
        <table name="result" class="table-style">
          <tr>
            <th colspan="4">标定地价系统查询结果</th>
          </tr>
          <tr>
            <td>住宅</td>
            <td>商业</td>
            <td>办公</td>
            <td>工业</td>
          </tr>
          <tr>
            <td>
              <el-input-number
                size="mini"
                v-model="form.resident"
                clearable
                type="number"
                :controls="false"
                :min="0"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.business"
                clearable
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.office"
                clearable
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.industry"
                clearable
                :controls="false"
              ></el-input-number>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="11">
        <table name="type" class="table-style">
          <tr>
            <th colspan="3">产业发展导向/项目类型</th>
          </tr>
          <tr>
            <td>战略型新兴产业</td>
            <td>重点产业项目</td>
            <td>重点产业项目申请单位</td>
          </tr>
          <tr>
            <td>
              <el-select size="mini" v-model="form.isNew" clearable>
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.isImportant" clearable>
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.unit" clearable>
                <el-option
                  v-for="item in unitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <table name="year" class="table-style">
          <tr>
            <th colspan="5">年期</th>
          </tr>
          <tr>
            <td>普通住房年期</td>
            <td>商业年期</td>
            <td>办公年期</td>
            <td>工业年期</td>
            <td>工厂宿舍年期</td>
          </tr>
          <tr>
            <td>
              <el-select size="mini" v-model="form.residentYear" clearable>
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.businessYear" clearable>
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.officeYear" clearable>
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.industryYear" clearable>
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select
                size="mini"
                v-model="form.industryResidentYear"
                clearable
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <table name="details1" class="table-style">
          <tr>
            <th colspan="10">各功能/产权形式建筑面积(产权归开发主体部分）</th>
          </tr>
          <tr>
            <td rowspan="2"></td>
            <td colspan="6">
              <b>工业</b>
            </td>
            <td colspan="2">
              <b>住宅</b>
            </td>
          </tr>
          <tr>
            <td>厂房（含新型产业用地中的厂房）</td>
            <td>仓库（含物流用地中的仓库）</td>
            <td>公用/市政设施及施工配套</td>
            <td>交通设施/综合管廊</td>
            <td>交通设施/综合管廊地下</td>
            <td>研发用房/物流建筑</td>
            <td>普通商品房</td>
            <td>宿舍</td>
          </tr>
          <tr>
            <td>自持</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfWorkshop"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfWarehouse"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfPublic"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfTransport"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfTransportDown"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfLogistic"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfHouse"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfDorm"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>整售</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalWorkshop"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalWarehouse"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalPublic"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalTransport"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalTransportDown"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalLogistic"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalHouse"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalDorm"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>分割</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideWorkshop"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideWarehouse"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.dividePublic"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideTransport"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideTransportDown"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideLogistic"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideHouse"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideDorm"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <table name="details2" class="table-style">
          <tr>
            <td rowspan="2"></td>
            <td colspan="2">
              <b>住宅</b>
            </td>
            <td colspan="5">
              <b>办公</b>
            </td>
            <td colspan="1">
              <b>商业</b>
            </td>
          </tr>
          <tr>
            <td>人才住房</td>
            <td>公共租赁住房/安居型商品房</td>
            <td>办公</td>
            <td>商务公寓</td>
            <td>旅馆业建筑、会议中心</td>
            <td>文化、医疗、教育设施/科研用房</td>
            <td>
              体育/社会福利设施/幼儿园/特殊建筑/社会停车场库/邮政网点/文化遗产/宗教建筑
            </td>
            <td>商业首层</td>
          </tr>
          <tr>
            <td>自持</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfTalented"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfPublicRent"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfOffice"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfBusniessApt"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfHotel"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfCulture"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfSport"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfBusiness1"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>整售</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalTalented"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalPublicRent"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalOffice"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalBusniessApt"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalHotel"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalCulture"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalSport"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalBusiness1"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>分割</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideTalented"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.dividePublicRent"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideOffice"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideBusniessApt"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideHotel"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideCulture"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideSport"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideBusiness1"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <table name="details3" class="table-style">
          <tr>
            <td rowspan="2"></td>
            <td colspan="7">
              <b>商业</b>
            </td>
            <td colspan="2" rowspan="2">
              <b>合计</b>
            </td>
          </tr>
          <tr>
            <td>商业二层</td>
            <td>商业三层</td>
            <td>商业四层以上</td>
            <td>商业地下</td>
            <td>加油站</td>
            <td>游乐设施</td>
            <td>加气站、肉菜市场</td>
          </tr>
          <tr>
            <td>自持</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfBusiness2"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfBusiness3"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfBusiness4"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfBusinessUnder"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfGas"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfAmusement"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfMarket"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.selfTotal"
                :controls="false"
                disabled
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>整售</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalBusiness2"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalBusiness3"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalBusiness4"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalBusinessUnder"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalGas"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalAmusement"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalMarket"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.totalTotal"
                :controls="false"
                disabled
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>分割</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideBusiness2"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideBusiness3"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideBusiness4"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideBusinessUnder"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideGas"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideAmusement"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideMarket"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.divideTotal"
                :controls="false"
                disabled
              ></el-input-number>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <table name="gov" class="table-style">
          <tr>
            <th rowspan="2">公共配套设施（免地价）</th>
            <th rowspan="2">建设用地面积</th>
            <th colspan="3">"产权归政府部分 (免地价）"</th>
          </tr>
          <tr>
            <td>保障房\人才住房</td>
            <td>人才公寓</td>
            <td>创新型产业用房</td>
          </tr>
          <tr>
            <td>
              <el-input-number
                size="mini"
                v-model="form.publicFree"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.buildSquare"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.protectFree"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.talentApt"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.innovativeApt"
                :controls="false"
                clearable
              ></el-input-number>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      result: 8000,
      // activeNames: ["1", "2", "3", "4"],
      form: {
        resident: 0,
        business: 0,
        office: 0,
        industry: 0,
        isNew: "",
        isImportant: "",
        unit: "",
        residentYear: "",
        businessYear: "",
        officeYear: "",
        industryYear: "",
        industryResidentYear: ""
      },
      boolOptions: [
        { label: "是", value: true },
        { label: "否", value: false }
      ],
      unitOptions: [
        { label: "单一", value: "single" },
        { label: "两个及以上", value: "double" }
      ],
      yearOptions: [30, 40, 50, 70]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.home {
  width: 85%;
  margin: 0 auto 20px;
  .btn {
    margin-bottom: 20px;
  }
  .table-style {
    box-shadow: 2px 2px 2px 2px rgba(180, 180, 180, 0.2);
    padding: 10px;
    border-radius: 3px;
    width: 100%;
    th {
      padding-bottom: 20px;
    }
    td {
      width: 160px;
    }
  }
}
</style>
<style lang="less">
.home {
  .el-form-item {
    display: inline-block;
  }
  .wideLabel {
    .el-form-item__label {
      width: 160px !important;
    }
    .el-form-item__content {
      margin-left: 160px !important;
    }
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
  }
  .el-input-number--mini,
  .el-input-number {
    width: 100% !important;
  }
  .el-row + .el-row {
    margin-top: 30px;
  }
}
</style>
