import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Button from "../../Button/GoogleButton";

function GoogleSignup({ onError, onSuccess }) {
  const { setUser, setToken } = useContext(UserContext);

  const postUserSignup = async (body) => {
    try {
      const response = await axios.post(
        "https://pokelandbackend-server.herokuapp.com/user/signup/google",
        body
      );
      const token = response.data.token;
      setUser(response.data.userSet);
      setToken(token);
      onError({ message: "", error: false });
      onSuccess({
        message: "L'utilisateur a bien été enregistré.",
        success: true,
      });
      localStorage.setItem("token", token);
    } catch (err) {
      onError({
        message:
          "L'enregistrement de votre compte a échoué, veuillez recommencer.",
        error: true,
      });
      onSuccess({ message: "", success: false });
    }
  };

  const responseGoogle = (response) => {
    const { name, email, imageUrl } = response.profileObj;
    const body = {
      name: name,
      email: email,
      profilePicture: imageUrl,
    };

    postUserSignup(body);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLEID}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Inscription via Google
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleSignup;
