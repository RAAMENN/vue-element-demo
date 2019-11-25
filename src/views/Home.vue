<template>
  <div class="home">
    <h1>招拍挂类地价计算器（V2.3）</h1>
    <p style="textAlign: left">
      <strong>【免责声明】</strong
      >本计算器为制作人根据政府最新政策个人理解制作，地价计算结果供使用者参考。实际地价缴交数额以政府的地价缴交通知文件为准，本计算器制作人对计算结果不负责任何法律责任，本计算器使用者使用本计算器进行地价测算表明同意上述声明！
      时间：2019-11-12
    </p>
    <p><strong>【注意】</strong>面积单位默认为平方米，金额单位默认为元</p>
    <h2>地价计算结果：{{ result || "暂无" }}元</h2>
    <el-button plain size="small" class="btn" @click="postCalcHandler"
      >开始计算</el-button
    >
    <el-row :gutter="10">
      <el-col :span="13">
        <table name="result" class="table-style">
          <tr>
            <th colspan="4">输入：标定地价系统查询结果</th>
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
                v-model="form.stdLandInfo.residentialLandPrice"
                :controls="false"
                :min="0"
                :max="maxNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.stdLandInfo.commercialLandPrice"
                :controls="false"
                :min="0"
                :max="maxNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.stdLandInfo.officialLandPrice"
                :controls="false"
                :min="0"
                :max="maxNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.stdLandInfo.industrialLandPrice"
                :min="0"
                :max="maxNum"
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
            <el-tooltip
              effect="dark"
              placement="top-start"
              content="战略性新兴产业（新一代信息技术、高端装备制造、绿色低碳、生物医药、数字经济、新材料、海洋经济等）、优势传统产业、生产性现代服务业"
            >
              <td>
                战略型新兴产业
              </td></el-tooltip
            >
            <el-tooltip
              effect="dark"
              placement="top-start"
              content="产业项目分类以《深圳市工业及其它产业用地供应管理办法》（深府规【2019】4号）规定为准"
            >
              <td>重点产业项目</td>
            </el-tooltip>
            <td>重点产业项目申请单位</td>
          </tr>
          <tr>
            <td>
              <el-select
                size="mini"
                v-model="form.stdLandInfo.isEmergingIndustry"
              >
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.stdLandInfo.isKeyIndustry">
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.stdLandInfo.keyIndustryUnit">
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
              <el-select
                size="mini"
                v-model="form.stdLandInfo.residentialPeriod"
              >
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
                v-model="form.stdLandInfo.commercialPeriod"
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.stdLandInfo.officialPeriod">
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
                v-model="form.stdLandInfo.industrialPeriod"
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="form.stdLandInfo.dormitoryPeriod">
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
            <th colspan="10">
              输入：各功能/产权形式建筑面积(产权归开发主体部分）
            </th>
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
                v-model="form.floorageInfoSelfHold.factoryBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.warehouse"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.municipalFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.transportationFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="
                  form.floorageInfoSelfHold.transportationFacilityUnderground
                "
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.logisticsConstruction"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.ordinaryHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.dormitory"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>整售</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.factoryBuilding"
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.warehouse"
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.municipalFacility"
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.transportationFacility"
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="
                  form.floorageInfoWholeSale.transportationFacilityUnderground
                "
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.logisticsConstruction"
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.ordinaryHousing"
                :controls="false"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.dormitory"
                :controls="false"
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>分割</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.factoryBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.warehouse"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.municipalFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.transportationFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="
                  form.floorageInfoCarveUp.transportationFacilityUnderground
                "
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.logisticsConstruction"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.ordinaryHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.dormitory"
                :controls="false"
                :max="maxNum"
                :min="minNum"
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
                v-model="form.floorageInfoSelfHold.talentHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.publicRentalHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.office"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.commercialHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.hotelBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.researchBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.socialWelfareFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.commercialFirstFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>整持</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.talentHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.publicRentalHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.office"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.commercialHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.hotelBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.researchBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.socialWelfareFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.commercialFirstFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>分割</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.talentHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.publicRentalHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.office"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.commercialHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.hotelBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.researchBuilding"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.socialWelfareFacility"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.commercialFirstFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
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
                v-model="form.floorageInfoSelfHold.commercialSecondFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.commercialThirdFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.commercialFourAboveFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.commercialUnderground"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.gasStation"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.amusementFacilities"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoSelfHold.foodMarket"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="selfTotal"
                :controls="false"
                disabled
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>整售</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.commercialSecondFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.commercialThirdFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.commercialFourAboveFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.commercialUnderground"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.gasStation"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.amusementFacilities"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoWholeSale.foodMarket"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="wholeSaleTotal"
                :controls="false"
                disabled
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
          </tr>
          <tr>
            <td>分割</td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.commercialSecondFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.commercialThirdFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.commercialFourAboveFloor"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.commercialUnderground"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.gasStation"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.amusementFacilities"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoCarveUp.foodMarket"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="seprateTotal"
                :controls="false"
                disabled
                :max="maxNum"
                :min="minNum"
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
                v-model="form.floorageInfoFree.municipalFacilityFree"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoFree.constructionLandArea"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoFree.affordableHousingFree"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoFree.talentHousingFree"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="form.floorageInfoFree.innovativeIndustrialHousing"
                :controls="false"
                :max="maxNum"
                :min="minNum"
              ></el-input-number>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postCalcService from "@/assets/services/postCalcService"
export default {
  name: "home",
  data() {
    return {
      result: 0,
      form: {
        stdLandInfo: {
          residentialLandPrice: 0,
          // --住宅（整数）
          commercialLandPrice: 0,
          // --商业（整数）
          officialLandPrice: 0,
          // --办公（整数）
          industrialLandPrice: 0,
          // --工业（整数）
          isEmergingIndustry: "否",
          // --是否战略新兴产业（字符串）
          isKeyIndustry: "否",
          // --是否重点产业项目（字符串）
          keyIndustryUnit: "单一",
          // --重点产业项目申请单位（字符串）
          residentialPeriod: 70,
          // --普通住房年期（整数）
          commercialPeriod: 40,
          // --商业年期（整数）
          officialPeriod: 40,
          // --办公年期（整数）
          industrialPeriod: 50,
          // --工业年期（整数）
          dormitoryPeriod: 50
        },
        floorageInfoSelfHold: {
          // --建筑面积-自持（对象，属性都为整数）
          factoryBuilding: 0,
          // --厂房（含新型产业用地中的厂房）
          warehouse: 0,
          // --仓库（含物流用地中的仓库）
          municipalFacility: 0,
          // --公用/市政设施及施工配套
          transportationFacility: 0,
          // --交通设施/综合管廊
          transportationFacilityUnderground: 0,
          // --交通设施/综合管廊地下
          logisticsConstruction: 0,
          // --研发用房/物流建筑
          ordinaryHousing: 0,
          // --普通商品房
          dormitory: 0,
          // --宿舍
          talentHousing: 0,
          // --人才住房
          publicRentalHousing: 0,
          // --公共租赁住房/安居型商品房
          office: 0,
          // --办公
          commercialHousing: 0,
          // --商务公寓
          hotelBuilding: 0,
          // --旅馆业建筑、会议中心
          researchBuilding: 0,
          // --文化、医疗、教育设施/科研用房
          socialWelfareFacility: 0,
          // --体育/社会福利设施/幼儿园/特殊建筑/社会停车场库/邮政网点/文化遗产/宗教建筑
          commercialFirstFloor: 0,
          // --商业首层
          commercialSecondFloor: 0,
          // --商业二层
          commercialThirdFloor: 0,
          // --商业三层
          commercialFourAboveFloor: 0,
          // --商业四层以上
          commercialUnderground: 0,
          // --商业地下
          gasStation: 0,
          // --加油站
          amusementFacilities: 0,
          // --游乐设施
          foodMarket: 0
          // --加气站、肉菜市场
        },
        floorageInfoWholeSale: {
          // --建筑面积-整售（对象，属性都为整数）
          factoryBuilding: 0,
          // --厂房（含新型产业用地中的厂房）
          warehouse: 0,
          // --仓库（含物流用地中的仓库）
          municipalFacility: 0,
          // --公用/市政设施及施工配套
          transportationFacility: 0,
          // --交通设施/综合管廊
          transportationFacilityUnderground: 0,
          // --交通设施/综合管廊地下
          logisticsConstruction: 0,
          // --研发用房/物流建筑
          ordinaryHousing: 0,
          // --普通商品房
          dormitory: 0,
          // --宿舍
          talentHousing: 0,
          // --人才住房
          publicRentalHousing: 0,
          // --公共租赁住房/安居型商品房
          office: 0,
          // --办公
          commercialHousing: 0,
          // --商务公寓
          hotelBuilding: 0,
          // --旅馆业建筑、会议中心
          researchBuilding: 0,
          // --文化、医疗、教育设施/科研用房
          socialWelfareFacility: 0,
          // --体育/社会福利设施/幼儿园/特殊建筑/社会停车场库/邮政网点/文化遗产/宗教建筑
          commercialFirstFloor: 0,
          // --商业首层
          commercialSecondFloor: 0,
          // --商业二层
          commercialThirdFloor: 0,
          // --商业三层
          commercialFourAboveFloor: 0,
          // --商业四层以上
          commercialUnderground: 0,
          // --商业地下
          gasStation: 0,
          // --加油站
          amusementFacilities: 0,
          // --游乐设施
          foodMarket: 0
          // --加气站、肉菜市场
        },
        floorageInfoCarveUp: {
          // --建筑面积-分割（对象，属性都为整数）
          factoryBuilding: 0,
          // --厂房（含新型产业用地中的厂房）
          warehouse: 0,
          // --仓库（含物流用地中的仓库）
          municipalFacility: 0,
          // --公用/市政设施及施工配套
          transportationFacility: 0,
          // --交通设施/综合管廊
          transportationFacilityUnderground: 0,
          // --交通设施/综合管廊地下
          logisticsConstruction: 0,
          // --研发用房/物流建筑
          ordinaryHousing: 0,
          // --普通商品房
          dormitory: 0,
          // --宿舍
          talentHousing: 0,
          // --人才住房
          publicRentalHousing: 0,
          // --公共租赁住房/安居型商品房
          office: 0,
          // --办公
          commercialHousing: 0,
          // --商务公寓
          hotelBuilding: 0,
          // --旅馆业建筑、会议中心
          researchBuilding: 0,
          // --文化、医疗、教育设施/科研用房
          socialWelfareFacility: 0,
          // --体育/社会福利设施/幼儿园/特殊建筑/社会停车场库/邮政网点/文化遗产/宗教建筑
          commercialFirstFloor: 0,
          // --商业首层
          commercialSecondFloor: 0,
          // --商业二层
          commercialThirdFloor: 0,
          // --商业三层
          commercialFourAboveFloor: 0,
          // --商业四层以上
          commercialUnderground: 0,
          // --商业地下
          gasStation: 0,
          // --加油站
          amusementFacilities: 0,
          // --游乐设施
          foodMarket: 0
          // --加气站、肉菜市场
        },
        floorageInfoFree: {
          // --建筑面积-免地价（对象，属性都为整数）
          municipalFacilityFree: 0,
          // --公共配套设施（免地价）
          affordableHousingFree: 0,
          // --保障房\人才住房
          talentHousingFree: 0,
          // --人才公寓
          innovativeIndustrialHousing: 0,
          // --创新型产业用房
          constructionLandArea: 0
          // --建筑用地面积
        }
      },
      boolOptions: [{ label: "是", value: "是" }, { label: "否", value: "否" }],
      unitOptions: [
        { label: "单一", value: "单一" },
        { label: "两个及以上", value: "两个及以上" }
      ],
      yearOptions: [30, 40, 50, 70],
      maxNum: 99999999,
      minNum: 0
    }
  },
  mounted() {},
  methods: {
    async postCalcHandler() {
      let res = await postCalcService.postCalc(this.form)
      if (res.data.code === 200) {
        this.result = res.data.data.landPriceCalResult
      } else {
        this.$message.error(res.data.message)
      }
    }
  },
  computed: {
    // 自持总和
    selfTotal: {
      get() {
        const self = this.form.floorageInfoSelfHold
        return (
          self.factoryBuilding +
          self.warehouse +
          self.municipalFacility +
          self.transportationFacility +
          self.transportationFacilityUnderground +
          self.logisticsConstruction +
          self.ordinaryHousing +
          self.dormitory +
          self.talentHousing +
          self.publicRentalHousing +
          self.office +
          self.commercialHousing +
          self.hotelBuilding +
          self.researchBuilding +
          self.socialWelfareFacility +
          self.commercialFirstFloor +
          self.commercialSecondFloor +
          self.commercialThirdFloor +
          self.commercialFourAboveFloor +
          self.commercialUnderground +
          self.gasStation +
          self.amusementFacilities +
          self.foodMarket
        )
      },
      set(val) {
        return val
      }
    },
    // 整售总和
    wholeSaleTotal: {
      get() {
        const wholesSale = this.form.floorageInfoWholeSale
        return (
          wholesSale.factoryBuilding +
          wholesSale.warehouse +
          wholesSale.municipalFacility +
          wholesSale.transportationFacility +
          wholesSale.transportationFacilityUnderground +
          wholesSale.logisticsConstruction +
          wholesSale.ordinaryHousing +
          wholesSale.dormitory +
          wholesSale.talentHousing +
          wholesSale.publicRentalHousing +
          wholesSale.office +
          wholesSale.commercialHousing +
          wholesSale.hotelBuilding +
          wholesSale.researchBuilding +
          wholesSale.socialWelfareFacility +
          wholesSale.commercialFirstFloor +
          wholesSale.commercialSecondFloor +
          wholesSale.commercialThirdFloor +
          wholesSale.commercialFourAboveFloor +
          wholesSale.commercialUnderground +
          wholesSale.gasStation +
          wholesSale.amusementFacilities +
          wholesSale.foodMarket
        )
      },
      set(val) {
        return val
      }
    },
    // 分割总和
    seprateTotal: {
      get() {
        const seprate = this.form.floorageInfoCarveUp
        return (
          seprate.factoryBuilding +
          seprate.warehouse +
          seprate.municipalFacility +
          seprate.transportationFacility +
          seprate.transportationFacilityUnderground +
          seprate.logisticsConstruction +
          seprate.ordinaryHousing +
          seprate.dormitory +
          seprate.talentHousing +
          seprate.publicRentalHousing +
          seprate.office +
          seprate.commercialHousing +
          seprate.hotelBuilding +
          seprate.researchBuilding +
          seprate.socialWelfareFacility +
          seprate.commercialFirstFloor +
          seprate.commercialSecondFloor +
          seprate.commercialThirdFloor +
          seprate.commercialFourAboveFloor +
          seprate.commercialUnderground +
          seprate.gasStation +
          seprate.amusementFacilities +
          seprate.foodMarket
        )
      },
      set(val) {
        return val
      }
    }
  }
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
      cursor: default;
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
