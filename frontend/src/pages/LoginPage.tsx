import { FlexBox } from "@ui5/webcomponents-react";
import LoginForm from "../components/login/LoginForm";

export default function Login() {
  return (
    <>
    <style>
        {`
          @media (max-width: 899px) {
            .hide-on-small {
              display: none;
            }
          }
        `}
    </style>
    <FlexBox
      style={{
        height: "100%",
        width: "100%",
        minHeight: "550px",
      }}
      justifyContent={"Center"}
    >
      {/* Panel izquierdo logo */}
      <FlexBox
        style={{
          backgroundColor: "#124E98",
          width: "45%",
          height: "100%",
          color: "white",
        }}
        alignItems={"Center"}
        justifyContent={"Center"}
        className="hide-on-small"
      >
        <img src="img/logo-white.png" width={300}/>
      </FlexBox>

      {/* Panel derecho centrado */}
      <FlexBox
        style={{
          width: "55%",
          height: "100%",
        }}
        justifyContent={"Center"}
        alignItems={"Center"}
      >
        <LoginForm />
      </FlexBox>

    </FlexBox>
    </>
  );
}
