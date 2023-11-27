import React, { useEffect, useState } from "react";
import fetch from "./Fetch";
import IsMemberView from "./IsMemberView";
import IsNotMemberView from "./IsNotMemberView";
import { Spinner } from "reactstrap";

interface Props {
  ismemberEndpoint: string;
  signUpEndpoint: string;
}

function MemberClient({ ismemberEndpoint, signUpEndpoint }: Props) {
  const [member, setMember] = useState({ member: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetch(ismemberEndpoint, setMember)]).then(() =>
      setLoading(false)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5">
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="dark" />
        </div>
      )}
      {!loading &&
        (member.member ? (
          <IsMemberView />
        ) : (
          <IsNotMemberView
            signUpEndpoint={signUpEndpoint}
            memberSetter={setMember}
            memberEndpoint={ismemberEndpoint}
          />
        ))}
    </div>
  );
}

export default MemberClient;
