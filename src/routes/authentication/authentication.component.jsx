import SignUpForm from "../../components/sign-up-form/sign-up.component";
import SignInForm from "../../components/sign-in-form/sign-in.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <section className="auth-section">
      <div className="forms">
        <SignInForm></SignInForm>
        <SignUpForm></SignUpForm>
      </div>
    </section>
  );
};

export default Authentication;
