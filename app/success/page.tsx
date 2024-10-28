import { Result } from "antd"
import "./page.css"
const SuccessPage = () => {
  return (
    <Result
      className="custom-result"
      title="Pagamento realizado com sucesso"
      subTitle="Por enquanto, nada"
      status={"success"}
    ></Result>
  )
}

export default SuccessPage
