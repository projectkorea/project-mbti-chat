import React, { useState } from "react";

const Auth = ({ userObj }) => {
  const [timerDisplay, setTimerDisplay] = useState(false);
  const [newVerification, setNewVerification] = useState(true);
  const [verifiedBtn, setVerifiedBtn] = useState(false);

  //이메일 가입으로 들어왔는지 확인하기: 포함되지 않았으면 -1로 반환, 즉 -1과 같지 않으면 포함되었다는 뜻
  const isSignInEmail = userObj.providerData[0]["uid"].indexOf("@");

  //timer

  const countDownTimer = () => {
    let timerInterval;
    let dateObj = new Date();
    dateObj.setMinutes(dateObj.getMinutes() + 5);
    const newDateObj = new Date(dateObj);

    const showRemaining = async () => {
      await userObj.reload();
      var now = new Date();
      var distDt = newDateObj - now;
      if (distDt < 0 || userObj.emailVerified) {
        setTimerDisplay("시간이 초과했습니다. 다시 인증해주세요.");
        setVerifiedBtn("false");
        clearInterval(timerInterval);
        return;
      }
      var minutes = Math.floor(distDt / 60000);
      var seconds = Math.floor((distDt % 60000) / 1000);
      setTimerDisplay(`${minutes}분 ${seconds}초`);
    };

    timerInterval = setInterval(showRemaining, 1000);
  };

  const onCheckVerification = async () => {
    if (verifiedBtn) {
      if (!userObj.emailVerified) {
        await userObj.reload();
        // await window.location.reload();
        if (!userObj.emailVerified) {
          alert("인증 실패. 메일을 확인해주세요.");
        }
      }
    } else {
      alert("인증메일을 먼저 보내세요.");
    }
  };

  const onSendVerifiation = () => {
    setNewVerification((prev) => !prev);
    setVerifiedBtn(true);
    if (!verifiedBtn) {
      countDownTimer(); //타이머 함수 실행하기
      userObj.sendEmailVerification(); //인증 메일 보내기
      alert(`${userObj.email} 주소로 인증 코드를 발송했습니다.`);
    } else {
      alert(`이미 발송했습니다. ${userObj.email} 주소를 확인해주세요.`);
    }
  };

  const onVerification = () => {
    if (newVerification) {
      onSendVerifiation();
    } else {
      onCheckVerification();
    }
  };

  return (
    <>
      {!(isSignInEmail !== -1 && userObj.emailVerified === false) ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt="success"
            src="/svg/green-check.svg"
            style={{
              width: "20px",
              margin: "0px 5px 0px 0px",
            }}
          />
          <h1>계정인증 완료</h1>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            alt="failure"
            src="/svg/red-x.svg"
            style={{
              display: "inline-block",
              width: "20px",
              marginRight: "5px",
            }}
          />
          <div>
            <h1 className="profile-font--small">채팅 기능을 이용하려면,</h1>
            <h1 className="profile-font--small">이메일 인증을 해야합니다.</h1>
          </div>
          <br></br>
          <button className="auth--email-btn" onClick={onVerification}>
            {newVerification ? "인증 코드 전송" : "인증 확인하기"}
          </button>
          {timerDisplay && (
            <h1 className="profile-font--small">남은시간: {timerDisplay}</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
