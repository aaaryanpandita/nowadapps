import React, { useEffect, useState } from "react";
import ParentRefModal from "./parent-modal";
import SocialModal from "./social-modal";
import DailyTaskModal from "./daily-task-modal";
import { useAccount } from "wagmi";

const Tasker = () => {
  const { address, isConnected } = useAccount();
  const [modalState, setModalState] = useState({
    parentRefModal: false,
    socialModal: false,
    dailyTaskModal: false,
  });

  return (
    <div>
      {modalState?.parentRefModal && (
        <ParentRefModal
          open={modalState.parentRefModal}
          close={() => {
            setModalState((p) => {
              return { ...p, parentRefModal: false };
            });
          }}
        />
      )}
      {modalState?.socialModal && <SocialModal open={modalState.socialModal} />}
      {modalState?.dailyTaskModal && (
        <DailyTaskModal open={modalState.dailyTaskModal} />
      )}
    </div>
  );
};

export default Tasker;
