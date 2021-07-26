import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Button from "../../Button/GoogleButton";

function GoogleSignin({ onError, onSuccess }) {
  const { setUser, setToken } = useContext(UserContext);

  const postUserSignin = async (body) => {
    try {
      const response = await axios.post(
        "https://pokelandbackend.herokuapp.com/user/signin/google",
        body
      );
      const token = response.data.token;
      setUser(response.data.user);
      setToken(token);
      onSuccess({
        message: "Vous êtes connecté.",
        success: true,
      });
      onError({ message: "", error: false });
      localStorage.setItem("token", token);
    } catch (err) {
      onError({
        message: "La connexion à votre compte a échoué, veuillez recommencer.",
        error: true,
      });
      onSuccess({ message: "", success: false });
    }
  };

  const responseGoogle = (response) => {
    const { email } = response.profileObj;
    const body = {
      email: email,
    };

    postUserSignin(body);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLEID}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Connexion via Google
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleSignin;
