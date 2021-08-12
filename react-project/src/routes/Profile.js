import React, { useState } from "react";
import { mbtiArray } from "contents";
import MbtiBlock from "components/MbtiBlock";
import Auth from "components/Auth";
import MbtiBadge from "components/MbtiBadge";

function Profile({ userObj, typeChoose, setTypeChoose }) {
  //페이지 내 타입을 골랐는지 확인하는 state
  const [typeInput, setTypeInput] = useState(false);

  return (
    <>
      <div className="profile">
        <div className="profile-head">
          <h1 className="profile-font--title">프로필</h1>
          {typeChoose || typeInput ? (
            <div
              className="profile--item"
              src="default-profile.svg"
              alt="profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "70%",
                backgroundImage: `url(/char/${userObj.displayName}.svg)`,
                backgroundColor: "rgb(200,200,200)",
                backgroundSize: "150%",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            />
          ) : (
            <img
              className="profile--item"
              src="default-profile.svg"
              alt="profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "gray",
              }}
            />
          )}
        </div>
        <div className="profile-body">
          {(typeChoose || typeInput) && (
            <>
              <div style={{ margin: "-20px 0px 10px" }}>
                <MbtiBadge mbtiType={userObj.displayName} />
              </div>
              <div className="profile-font">{userObj.photoURL}</div>
            </>
          )}

          {/* {!(typeChoose || typeInput) && ( */}
          {true && (
            <>
              <div className="profile-small">나의 MBTI유형은?</div>
              <div className="mbti-block--container">
                {mbtiArray.map((element) => (
                  <MbtiBlock
                    key={element.type}
                    mbtiType={element.type}
                    forProfile="true"
                    userObj={userObj}
                    setTypeInput={setTypeInput}
                    setTypeChoose={setTypeChoose}
                  />
                ))}
              </div>
            </>
          )}
          <Auth userObj={userObj} />
        </div>
      </div>
    </>
  );
}

export default Profile;
