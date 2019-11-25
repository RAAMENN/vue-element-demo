import { services } from "@/assets/services/service"

const postCalcService = {
  URL: {
    calc: "excel/landPrice/cal"
  },
  async postCalc(payload = {}) {
    return await services.post(this.URL.calc, payload)
  }
}
export default postCalcService
