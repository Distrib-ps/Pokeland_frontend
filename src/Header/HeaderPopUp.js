import SigninForm from "../Form/User/SigninForm";
import SignupForm from "../Form/User/SignupForm";

function HeaderPopUp({ signin, signup, closePopUp }) {
  return (
    <div className={`header_popup`}>
      {signin && <SigninForm closePopUp={closePopUp} />}
      {signup && <SignupForm closePopUp={closePopUp} />}
    </div>
  );
}

export default HeaderPopUp;
