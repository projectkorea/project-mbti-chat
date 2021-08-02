import Loading from "components/Loading";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { useHistory } from "react-router-dom";

if (!window.Kakao.isInitialized()) {
  window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY_WEB);
  window.Kakao.isInitialized();
}

const Kakaotalk = () => {
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const kakaoAuthCode = params.code;
  if (kakaoAuthCode) {
    // this.token = kakaoAuthCode;
    // 카카오 로그인 토큰을 파이어베이스 함수에 전달합니다.
    var kakaoAuth = firebase.functions().httpsCallable("KakaoAuth");
    kakaoAuth({ code: kakaoAuthCode })
      .then(function (result) {
        console.log(result);
        // Read result of the Cloud Function.
        var kakaoToken = result.data.kakao_token;
        var fireToken = result.data.firebase_token;
        // 토근이 정상적으로 처리될 경우 로그인 처리합니다.
        firebase
          .auth()
          .signInWithCustomToken(fireToken)
          .then(function (result) {
            // token = kakaoToken;
            window.Kakao.Auth.setAccessToken(kakaoToken);
            const user = result.user;
            console.log("User : ", user);
            history.push("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return <Loading />;
};

export default Kakaotalk;