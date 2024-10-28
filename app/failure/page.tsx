import { Result } from "antd"
import "./page.css"
const FailurePage = () => {
  return (
    <Result
      className="custom-result"
      title="Houve um erro no seu pagamento"
      subTitle="Por favor, tente novamente mais tarde"
      status={"error"}
    ></Result>
  )
}

export default FailurePage
