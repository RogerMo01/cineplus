import React from "react";
import MemberSignUpForm from "./MemberSignUpForm";

interface Props {
  memberEndpoint: string;
  signUpEndpoint: string;
  memberSetter: React.Dispatch<React.SetStateAction<{ member: boolean }>>;
}

function IsNotMemberView({
  signUpEndpoint,
  memberSetter,
  memberEndpoint,
}: Props) {
  return (
    <div>
      <MemberSignUpForm
        endpoint={signUpEndpoint}
        header="Asociarse"
        setter={memberSetter}
        setterEndpoint={memberEndpoint}
      />
    </div>
  );
}

export default IsNotMemberView;
